#!/usr/bin/env node
// Turns the Decap CMS content (markdown + profile.json) into the JSON the redesign reads.
// Run from the repo root: node scripts/build-data.mjs
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const site = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const root = site
const content = path.join(root, 'assets/assets/content')
const imagesDir = path.join(root, 'assets/assets/images/projects')

// Small YAML subset: scalars, quoted strings, `>-` folded blocks, string lists and lists of maps.
function parseFrontMatter(src) {
  const lines = src.split('\n')
  const out = {}
  let i = 0
  const unquote = (v) => v.trim().replace(/^"(.*)"$/, '$1').replace(/^'(.*)'$/, '$1')
  while (i < lines.length) {
    const m = /^([a-z_]+):\s*(.*)$/.exec(lines[i])
    if (!m) { i++; continue }
    const [, key, rest] = m
    i++
    if (rest === '>-' || rest === '>' || rest === '|') {
      const block = []
      while (i < lines.length && (lines[i].startsWith('  ') || lines[i].trim() === '')) block.push(lines[i++].trim())
      // Folded block: single newlines join, blank lines separate paragraphs.
      out[key] = block.join('\n').replace(/\n{2,}/g, '\u0000').replace(/\n/g, ' ').split('\u0000').map((s) => s.trim()).filter(Boolean)
    } else if (rest === '[]') {
      out[key] = []
    } else if (rest === '') {
      const list = []
      while (i < lines.length && /^\s+-\s|^\s{4,}\S/.test(lines[i])) {
        const item = /^\s+-\s+(.*)$/.exec(lines[i])
        if (item && !/^[a-z_]+:\s/.test(item[1])) { list.push(unquote(item[1])); i++; continue }
        const obj = {}
        let first = true
        while (i < lines.length && (first ? /^\s+-\s/.test(lines[i]) : /^\s{4,}[a-z_]+:/.test(lines[i]))) {
          const kv = /^\s+(?:-\s+)?([a-z_]+):\s*(.*)$/.exec(lines[i])
          if (kv) obj[kv[1]] = unquote(kv[2])
          first = false
          i++
        }
        list.push(obj)
      }
      out[key] = list
    } else {
      out[key] = unquote(rest)
    }
  }
  return out
}

function resolveImage(thumb) {
  const name = path.basename(thumb)
  const candidates = [name, encodeURIComponent(name).replace(/%20/g, '%E2%80%AF'), name.replace(/ /g, '%E2%80%AF')]
  const hit = candidates.find((c) => fs.existsSync(path.join(imagesDir, c)))
  if (!hit) return null
  // A literal `%` in a filename has to be escaped again to survive as a URL.
  return 'assets/assets/images/projects/' + encodeURIComponent(hit)
}

const asList = (v) => (Array.isArray(v) ? v : v ? [v] : [])

const overrides = JSON.parse(fs.readFileSync(path.join(site, 'content/profile.overrides.json'), 'utf8'))

const projects = fs.readdirSync(path.join(content, 'projects'))
  .filter((f) => f.endsWith('.md'))
  .map((file) => {
    const raw = fs.readFileSync(path.join(content, 'projects', file), 'utf8')
    const [, fm, ...bodyParts] = raw.split(/^---\s*$/m)
    const data = parseFrontMatter(fm)
    const body = bodyParts.join('---').trim()
    const slug = file.replace(/\.md$/, '')
    const links = asList(data.other_links).filter((l) => l.url)
    const itch = overrides.itch_links[slug]
    if (itch) links.push({ title: 'itch.io', url: itch })
    const videos = asList(data.other_videos).filter((l) => l.url)
    const outcome = asList(data.outcome)
    const responsibility = asList(data.responsibility)
    const tech = asList(data.tech_stack)
    // "Most complete" ranks how much there is to show: video, links, written detail, stack.
    const completeness =
      (data.header_video ? 4 : 0) + links.length * 1.5 + videos.length +
      Math.min(body.length / 200, 4) + Math.min((outcome.join(' ').length + responsibility.join(' ').length) / 150, 3) +
      Math.min(tech.length, 4) * 0.5
    return {
      slug,
      title: data.title,
      category: data.category || 'Other',
      priority: Number(data.priority) || 0,
      role: data.role || '',
      timeline: data.timeline || '',
      outcome,
      responsibility,
      tech,
      thumbnail: resolveImage(data.thumbnail || ''),
      video: data.header_video || null,
      videos,
      links,
      body,
      completeness: Math.round(completeness * 10) / 10,
    }
  })
  .sort((a, b) => {
    // Hand-picked highlights lead in their listed order; everything else follows by completeness.
    const ha = overrides.highlights.indexOf(a.slug)
    const hb = overrides.highlights.indexOf(b.slug)
    if (ha !== -1 || hb !== -1) return (ha === -1 ? Infinity : ha) - (hb === -1 ? Infinity : hb)
    return b.completeness - a.completeness || b.priority - a.priority
  })

const profile = JSON.parse(fs.readFileSync(path.join(content, 'profile.json'), 'utf8'))
profile.experience = [
  ...overrides.experience_current,
  ...profile.experience.map((e) => ({ ...e, duration: e.duration.trim(), ...overrides.experience_edits[e.company] })),
]
profile.tags = overrides.tags
profile.links = overrides.links

fs.mkdirSync(path.join(site, 'data'), { recursive: true })
fs.writeFileSync(path.join(site, 'data/projects.json'), JSON.stringify({ projects }, null, 1) + '\n')
fs.writeFileSync(path.join(site, 'data/profile.json'), JSON.stringify(profile, null, 1) + '\n')

const missing = projects.filter((p) => !p.thumbnail).map((p) => p.slug)
console.log(`${projects.length} projects written. Missing thumbnails: ${missing.join(', ') || 'none'}`)
console.log('Top 6:', projects.slice(0, 6).map((p) => `${p.slug} (${p.completeness})`).join(', '))
