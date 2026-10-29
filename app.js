import { motion } from './motion.js'

const $ = (sel, root = document) => root.querySelector(sel)
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)]
const PAGE = 6

const state = { projects: [], filter: 'All', expanded: false }

const esc = (s = '') => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c])

/* ---------- motion toggle ---------- */
const toggle = $('[data-motion-toggle]')
function syncMotionUi() {
  toggle.setAttribute('aria-pressed', String(motion.paused))
  $('[data-motion-label]').textContent = motion.paused ? 'Play motion' : 'Pause motion'
  document.documentElement.classList.toggle('is-still', motion.paused)
}
toggle.addEventListener('click', () => { motion.set(!motion.paused) })
motion.subscribe(syncMotionUi)
syncMotionUi()

/* ---------- typer: types the headline once, like code going into a prompt, then stays ---------- */
const headline = 'CRAFTING IMMERSIVE REALITIES AND\nENGAGING GAMES THROUGH 8+ YEARS OF\nRAPID, USER-DRIVEN DEVELOPMENT.'
async function startTyper() {
  const el = $('[data-typer]')
  if (motion.paused) { el.textContent = headline; return }
  const wait = (ms) => new Promise((r) => setTimeout(r, ms))
  await wait(400)
  for (let n = 1; n <= headline.length; n++) {
    // Pausing motion mid-type finishes the line instead of freezing it half-written.
    if (motion.paused) break
    el.textContent = headline.slice(0, n)
    const ch = headline[n - 1]
    await wait(ch === '\n' ? 260 : ch === ' ' ? 70 : 28 + Math.random() * 42)
  }
  el.textContent = headline
}

/* ---------- markdown (the subset the CMS produces) ---------- */
function inline(s) {
  return esc(s).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/\*(.+?)\*/g, '<em>$1</em>')
}
function markdown(src) {
  const out = []
  let list = null
  for (const raw of src.split('\n')) {
    const line = raw.trim()
    const li = /^[-*]\s+(.*)$/.exec(line)
    if (li) { (list ??= []).push(`<li>${inline(li[1])}</li>`); continue }
    if (list) { out.push(`<ul>${list.join('')}</ul>`); list = null }
    if (!line) continue
    const h = /^(#{1,4})\s+(.*)$/.exec(line)
    // Sheet already has an h2 title, so content headings start at h3.
    if (h) out.push(`<h${Math.min(h[1].length + 2, 4)}>${inline(h[2])}</h${Math.min(h[1].length + 2, 4)}>`)
    else out.push(`<p>${inline(line)}</p>`)
  }
  if (list) out.push(`<ul>${list.join('')}</ul>`)
  return out.join('')
}

function youtubeId(url) {
  const m = /(?:youtu\.be\/|v=|embed\/)([\w-]{11})/.exec(url || '')
  return m ? m[1] : null
}

/* ---------- grid ---------- */
const grid = $('[data-grid]')
const gridState = $('[data-grid-state]')
const moreBtn = $('[data-more]')

function cardHtml(p, i) {
  const outcome = p.outcome[0] || p.responsibility[0] || ''
  const flags = [p.video && 'video', p.links.length && `${p.links.length} link${p.links.length > 1 ? 's' : ''}`].filter(Boolean)
  return `<article class="card is-entering" style="--i:${i % PAGE}" data-slug="${esc(p.slug)}">
    <div class="card__thumb">
      <span class="card__cat">${esc(p.category)}</span>
      <img src="${esc(p.thumbnail)}" alt="" width="640" height="400" loading="lazy" decoding="async">
    </div>
    <div class="card__body">
      <p class="card__time">${esc(p.timeline)}</p>
      <h3><button type="button" data-open="${esc(p.slug)}">${esc(p.title)}</button></h3>
      <p class="card__role">${esc(p.role)}</p>
      ${outcome ? `<p class="card__outcome">${esc(outcome)}</p>` : ''}
      <div class="tags">${p.tech.slice(0, 4).map((t) => `<span class="tag">${esc(t)}</span>`).join('')}</div>
      ${flags.length ? `<p class="card__flags">${flags.map((f) => `<span>${f}</span>`).join('')}</p>` : ''}
    </div>
  </article>`
}

function visible() {
  return state.projects.filter((p) => state.filter === 'All' || p.category === state.filter)
}

function renderGrid({ from = 0 } = {}) {
  const list = visible()
  const shown = state.expanded ? list : list.slice(0, PAGE)
  grid.setAttribute('aria-busy', 'false')
  gridState.hidden = list.length > 0
  if (!list.length) {
    grid.innerHTML = ''
    gridState.innerHTML = `<strong>Nothing filed under “${esc(state.filter)}” yet.</strong><span>Try another category.</span>
      <button class="btn btn--line" type="button" data-reset-filter>Show all projects</button>`
  } else if (from > 0) {
    grid.insertAdjacentHTML('beforeend', shown.slice(from).map((p, i) => cardHtml(p, i)).join(''))
  } else {
    grid.innerHTML = shown.map(cardHtml).join('')
  }
  const rest = list.length - PAGE
  moreBtn.hidden = rest <= 0
  moreBtn.textContent = state.expanded ? 'Show fewer' : `Show ${rest} more`
  moreBtn.setAttribute('aria-expanded', String(state.expanded))
  $('[data-filter-flag]').textContent = state.filter === 'All' ? '' : `--type ${state.filter.toLowerCase()}`
  bindTilt()
}

function renderLoading() {
  grid.setAttribute('aria-busy', 'true')
  gridState.hidden = true
  grid.innerHTML = Array.from({ length: PAGE }, () => `<div class="card card--ghost" aria-hidden="true"><div class="card__thumb"></div><div class="card__body"><div class="ghost-line"></div><div class="ghost-line"></div><div class="ghost-line"></div></div></div>`).join('')
}

function renderError() {
  grid.innerHTML = ''
  grid.setAttribute('aria-busy', 'false')
  gridState.hidden = false
  gridState.innerHTML = `<strong>The project list didn't load.</strong><span>$ fetch data/projects.json → failed. Check the connection and retry.</span>
    <button class="btn btn--line" type="button" data-retry>Retry</button>`
}

function setFilter(name) {
  state.filter = name
  state.expanded = false
  $$('[data-filter]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.filter === name)))
  const cards = $$('.card', grid)
  if (motion.reduced || !cards.length) return renderGrid()
  cards.forEach((c) => c.classList.add('is-leaving'))
  setTimeout(renderGrid, 220)
}

$('[data-filters]').addEventListener('click', (e) => {
  const b = e.target.closest('[data-filter]')
  if (b) setFilter(b.dataset.filter)
})
moreBtn.addEventListener('click', () => {
  state.expanded = !state.expanded
  if (state.expanded) renderGrid({ from: PAGE })
  else { renderGrid(); $('#projects').scrollIntoView({ block: 'start' }) }
})
gridState.addEventListener('click', (e) => {
  if (e.target.closest('[data-retry]')) load()
  if (e.target.closest('[data-reset-filter]')) setFilter('All')
})
grid.addEventListener('click', (e) => {
  const b = e.target.closest('[data-open]')
  if (b) openSheet(b.dataset.open, b)
})

// Pointer tilt: cards lean toward the cursor, like picking one up off a table.
function bindTilt() {
  if (motion.reduced || matchMedia('(hover: none)').matches) return
  $$('.card:not(.card--ghost)', grid).forEach((card) => {
    if (card.dataset.tilt) return
    card.dataset.tilt = '1'
    card.addEventListener('pointermove', (e) => {
      if (motion.paused) return
      const r = card.getBoundingClientRect()
      const x = (e.clientX - r.left) / r.width - 0.5
      const y = (e.clientY - r.top) / r.height - 0.5
      card.style.setProperty('--ry', `${x * 8}deg`)
      card.style.setProperty('--rx', `${-y * 8}deg`)
    })
    card.addEventListener('pointerleave', () => { card.style.setProperty('--ry', '0deg'); card.style.setProperty('--rx', '0deg') })
  })
}

/* ---------- sheet ---------- */
const sheet = $('[data-sheet]')
let lastOpener = null
export function openSheet(slug, opener) {
  const p = state.projects.find((x) => x.slug === slug)
  if (!p) return
  lastOpener = opener || document.activeElement
  const yt = youtubeId(p.video)
  const media = yt
    ? `<div class="sheet__media"><iframe src="https://www.youtube-nocookie.com/embed/${yt}" title="${esc(p.title)} video" width="1280" height="720" loading="lazy" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen" allowfullscreen></iframe></div>`
    : `<div class="sheet__media"><img src="${esc(p.thumbnail)}" alt="${esc(p.title)} cover image" width="1280" height="720"></div>`
  const listBlock = (title, items) => items.length ? `<div><h3>${title}</h3><ul class="sheet__list">${items.map((t) => `<li>${esc(t)}</li>`).join('')}</ul></div>` : ''
  const links = [...p.links, ...p.videos]
  $('[data-sheet-body]').innerHTML = `
    <h2 class="sheet__title" id="sheet-title">${esc(p.title)}</h2>
    ${media}
    <dl class="sheet__meta">
      <div><dt>role</dt><dd>${esc(p.role)}</dd></div>
      <div><dt>timeline</dt><dd>${esc(p.timeline)}</dd></div>
      <div><dt>type</dt><dd>${esc(p.category)}</dd></div>
    </dl>
    <div class="tags">${p.tech.map((t) => `<span class="tag">${esc(t)}</span>`).join('')}</div>
    ${listBlock('outcome', p.outcome)}
    ${listBlock('responsibility', p.responsibility)}
    ${p.body ? `<div class="prose">${markdown(p.body)}</div>` : ''}
    ${links.length ? `<div class="sheet__links">${links.map((l) => `<a class="btn btn--line" href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.title || 'Link')}</a>`).join('')}</div>` : ''}`
  sheet.showModal()
  sheet.scrollTop = 0
}
$('[data-sheet-close]').addEventListener('click', () => sheet.close())
sheet.addEventListener('click', (e) => { if (e.target === sheet) sheet.close() })
sheet.addEventListener('close', () => {
  $('[data-sheet-body]').innerHTML = '' // stops a playing video
  lastOpener?.focus?.()
})

/* ---------- experience + links ---------- */
function renderProfile(profile) {
  $('[data-creds]').innerHTML = profile.tags.map((t) => `<li>${esc(t)}</li>`).join('')
  $('[data-timeline]').innerHTML = profile.experience.map((job) => `
    <li class="job ${job.current ? 'job--now' : ''} reveal">
      <div class="job__top"><h3>${esc(job.role)}</h3>${job.current ? '<span class="job__now">NOW</span>' : ''}<span class="job__when">${esc(job.duration)}</span></div>
      <p class="job__at">${esc(job.company)}</p>
      <ul>${job.description.map((d) => `<li>${esc(d)}</li>`).join('')}</ul>
    </li>`).join('')
  $('[data-links]').innerHTML = profile.links.map((l) =>
    `<li><a href="${esc(l.url)}" ${l.download ? 'download' : 'target="_blank" rel="noopener"'}>${esc(l.label)}</a></li>`).join('')
  observeReveals()
}

/* ---------- scroll: progress bar, reveals, timeline draw, active nav ---------- */
function onScroll() {
  const max = document.documentElement.scrollHeight - innerHeight
  document.querySelector('.progress').style.setProperty('--p', max > 0 ? (scrollY / max).toFixed(4) : 0)
  // Backup for the observer: an instant jump (hash link, scrollIntoView) can skip its callback.
  $$('.reveal:not(.is-in)').forEach((el) => { if (el.getBoundingClientRect().top < innerHeight * 0.9) el.classList.add('is-in') })
  const tl = $('[data-timeline]')
  if (tl) {
    const r = tl.getBoundingClientRect()
    const t = Math.min(1, Math.max(0, (innerHeight * 0.7 - r.top) / r.height))
    tl.style.setProperty('--draw', t.toFixed(3))
    $$('.job', tl).forEach((j) => j.classList.toggle('is-lit', j.getBoundingClientRect().top < innerHeight * 0.7))
  }
}
addEventListener('scroll', onScroll, { passive: true })

let revealer
function observeReveals() {
  revealer ??= new IntersectionObserver((entries) => {
    entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('is-in'); revealer.unobserve(en.target) } })
  }, { rootMargin: '0px 0px -10% 0px' })
  $$('.reveal:not(.is-in)').forEach((el) => revealer.observe(el))
}

const navLinks = $$('.topbar nav a')
new IntersectionObserver((entries) => {
  entries.forEach((en) => {
    if (!en.isIntersecting) return
    navLinks.forEach((a) => a.setAttribute('aria-current', String(a.getAttribute('href') === `#${en.target.id}`)))
  })
}, { rootMargin: '-45% 0px -50% 0px' }).observe($('#projects'))
$$('#experience, #contact, #top').forEach((s) => {
  new IntersectionObserver((entries) => entries.forEach((en) => {
    if (en.isIntersecting) navLinks.forEach((a) => a.setAttribute('aria-current', String(a.getAttribute('href') === `#${en.target.id}`)))
  }), { rootMargin: '-45% 0px -50% 0px' }).observe(s)
})

/* ---------- boot ---------- */
async function load() {
  renderLoading()
  try {
    const [pr, pf] = await Promise.all([fetch('data/projects.json'), fetch('data/profile.json')])
    if (!pr.ok || !pf.ok) throw new Error('bad response')
    const [{ projects }, profile] = await Promise.all([pr.json(), pf.json()])
    state.projects = projects
    for (const cat of ['All', 'Game', 'App', 'Other']) {
      $(`[data-count="${cat}"]`).textContent = cat === 'All' ? projects.length : projects.filter((p) => p.category === cat).length
    }
    $('[data-all-count]').textContent = `See all ${projects.length} projects`
    renderGrid()
    renderProfile(profile)
    onScroll()
    // The browser tried to jump to the hash before the grid existed; land there now.
    if (location.hash.length > 1) document.getElementById(location.hash.slice(1))?.scrollIntoView({ behavior: 'instant' })
  } catch (err) {
    console.error(err)
    renderError()
    $('[data-deck-status]').textContent = 'Deck unavailable: project data failed to load.'
    return
  }
  const selected = state.projects.slice(0, 5)
  try {
    const { mountDeck } = await import('./deck.js')
    await mountDeck({ projects: state.projects, selected, open: openSheet })
  } catch (err) {
    console.warn('3D deck unavailable, using the text deck', err)
    mountTextDeck(selected)
  }
}

// Without WebGL (or if three.js can't load) the deck still deals: same buttons, no 3D.
function mountTextDeck(selected) {
  const status = $('[data-deck-status]')
  status.textContent = 'The 3D deck needs WebGL. Shuffle still deals a random project.'
  $('[data-picks]').innerHTML = selected.map((p) => `<li><button type="button" data-pick="${esc(p.slug)}">${esc(p.title)}</button></li>`).join('')
  $('[data-picks]').addEventListener('click', (e) => {
    const b = e.target.closest('[data-pick]')
    if (b) openSheet(b.dataset.pick, b)
  })
  const shuffle = $('[data-shuffle]')
  const title = $('[data-dealt-open]')
  shuffle.disabled = false
  shuffle.addEventListener('click', () => {
    const pool = state.projects.filter((p) => p.slug !== title.dataset.slug)
    const p = pool[Math.floor(Math.random() * pool.length)]
    title.textContent = p.title
    title.dataset.slug = p.slug
    $('[data-dealt]').hidden = false
  })
  title.addEventListener('click', () => openSheet(title.dataset.slug, title))
}

// The old Flutter site installed a service worker at this scope; this page doesn't use one.
navigator.serviceWorker?.getRegistrations?.().then((regs) => regs.forEach((r) => r.unregister())).catch(() => {})

$$('.section-head, .experience__head, .contact').forEach((el) => el.classList.add('reveal'))
observeReveals()
startTyper()
load()
