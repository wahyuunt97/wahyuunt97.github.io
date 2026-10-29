import * as THREE from 'three'
import { motion } from './motion.js'

const CARD_W = 1.5
const CARD_H = 2.1
const DECK_SIZE = 12
const TEX_W = 512
const TEX_H = Math.round((TEX_W * CARD_H) / CARD_W)
const Y = '#ffd60a'
const C = '#22d3ee'

const ease = {
  out: (t) => 1 - Math.pow(1 - t, 3),
  inOut: (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),
  back: (t) => { const c = 1.6; return 1 + (c + 1) * Math.pow(t - 1, 3) + c * Math.pow(t - 1, 2) },
}

/* ---------- card faces, drawn on canvas ---------- */
function roundRect(g, x, y, w, h, r) {
  g.beginPath()
  g.roundRect(x, y, w, h, r)
}

function wrap(g, text, maxW, maxLines) {
  const words = text.split(/\s+/)
  const lines = []
  let line = ''
  for (const w of words) {
    const test = line ? `${line} ${w}` : w
    if (g.measureText(test).width > maxW && line) { lines.push(line); line = w } else line = test
  }
  if (line) lines.push(line)
  if (lines.length > maxLines) {
    lines.length = maxLines
    lines[maxLines - 1] = lines[maxLines - 1].replace(/\s*\S*$/, '') + '…'
  }
  return lines
}

function canvas() {
  const cv = document.createElement('canvas')
  cv.width = TEX_W
  cv.height = TEX_H
  return cv
}

function toTexture(cv, renderer) {
  const tex = new THREE.CanvasTexture(cv)
  tex.colorSpace = THREE.SRGBColorSpace
  tex.anisotropy = renderer.capabilities.getMaxAnisotropy()
  return tex
}

function drawBack() {
  const cv = canvas()
  const g = cv.getContext('2d')
  roundRect(g, 0, 0, TEX_W, TEX_H, 34)
  g.fillStyle = '#111'
  g.fill()
  g.save()
  g.clip()
  // Diagonal hatch: reads as a card back at a glance and stays in the yellow-on-black palette.
  g.strokeStyle = 'rgba(255,214,10,0.13)'
  g.lineWidth = 3
  for (let i = -TEX_H; i < TEX_W + TEX_H; i += 22) { g.beginPath(); g.moveTo(i, 0); g.lineTo(i - TEX_H, TEX_H); g.stroke() }
  g.restore()
  g.lineWidth = 8
  g.strokeStyle = Y
  roundRect(g, 4, 4, TEX_W - 8, TEX_H - 8, 30)
  g.stroke()
  g.fillStyle = '#111'
  roundRect(g, 70, TEX_H / 2 - 130, TEX_W - 140, 260, 22)
  g.fill()
  g.lineWidth = 3
  g.stroke()
  g.fillStyle = Y
  g.textAlign = 'center'
  g.font = '700 132px "Space Grotesk"'
  g.fillText('W/U', TEX_W / 2, TEX_H / 2 + 26)
  g.font = '400 26px "JetBrains Mono"'
  g.fillStyle = '#d0d0d0'
  g.fillText('wahyuunt97', TEX_W / 2, TEX_H / 2 + 86)
  return cv
}

function drawFront(p, img) {
  const cv = canvas()
  const g = cv.getContext('2d')
  roundRect(g, 0, 0, TEX_W, TEX_H, 34)
  const bg = g.createLinearGradient(0, 0, 0, TEX_H)
  bg.addColorStop(0, '#1a1a1a')
  bg.addColorStop(1, '#101010')
  g.fillStyle = bg
  g.fill()

  const pad = 22
  const imgH = 300
  g.save()
  roundRect(g, pad, pad, TEX_W - pad * 2, imgH, 18)
  g.clip()
  g.fillStyle = '#0b0b0b'
  g.fillRect(pad, pad, TEX_W - pad * 2, imgH)
  if (img) {
    const w = TEX_W - pad * 2
    const s = Math.max(w / img.naturalWidth, imgH / img.naturalHeight)
    const dw = img.naturalWidth * s
    const dh = img.naturalHeight * s
    g.drawImage(img, pad + (w - dw) / 2, pad + (imgH - dh) / 2, dw, dh)
  }
  g.restore()

  g.font = '700 22px "JetBrains Mono"'
  const cat = p.category.toUpperCase()
  const cw = g.measureText(cat).width + 22
  g.fillStyle = Y
  roundRect(g, pad + 14, pad + 14, cw, 36, 6)
  g.fill()
  g.fillStyle = '#000'
  g.fillText(cat, pad + 25, pad + 40)

  let y = pad + imgH + 44
  g.font = '400 21px "JetBrains Mono"'
  g.fillStyle = '#a8a8a8'
  g.fillText(p.timeline, pad + 6, y)
  y += 50
  g.font = '700 42px "Space Grotesk"'
  g.fillStyle = '#f0f0f0'
  for (const line of wrap(g, p.title, TEX_W - pad * 2 - 12, 2)) { g.fillText(line, pad + 6, y); y += 46 }
  y += 4
  g.font = '400 24px "Space Grotesk"'
  g.fillStyle = '#b8b8b8'
  for (const line of wrap(g, p.role, TEX_W - pad * 2 - 12, 2)) { g.fillText(line, pad + 6, y); y += 30 }

  g.font = '400 20px "JetBrains Mono"'
  let x = pad + 6
  const ty = TEX_H - pad - 26
  for (const t of p.tech.slice(0, 3)) {
    const label = `#${t}`
    const w = g.measureText(label).width + 18
    if (x + w > TEX_W - pad) break
    g.strokeStyle = 'rgba(34,211,238,0.55)'
    g.lineWidth = 2
    roundRect(g, x, ty - 24, w, 34, 6)
    g.stroke()
    g.fillStyle = C
    g.fillText(label, x + 9, ty)
    x += w + 8
  }

  g.lineWidth = 6
  g.strokeStyle = Y
  roundRect(g, 3, 3, TEX_W - 6, TEX_H - 6, 31)
  g.stroke()
  return cv
}

function loadImage(src) {
  return new Promise((resolve) => {
    const img = new Image()
    img.decoding = 'async'
    img.onload = () => resolve(img)
    img.onerror = () => resolve(null)
    img.src = src
  })
}

/* ---------- mount ---------- */
export async function mountDeck({ projects, selected, open }) {
  const stage = document.querySelector('[data-deck-stage]')
  const status = document.querySelector('[data-deck-status]')
  const shuffleBtn = document.querySelector('[data-shuffle]')
  const resetBtn = document.querySelector('[data-deck-reset]')
  const dealtBox = document.querySelector('[data-dealt]')
  const dealtTitle = document.querySelector('[data-dealt-open]')
  const picksWrap = document.querySelector('[data-picks-wrap]')
  const picks = document.querySelector('[data-picks]')

  picks.innerHTML = selected.map((p) => `<li><button type="button" data-pick="${p.slug}">${p.title.replace(/[<&]/g, '')}</button></li>`).join('')

  let renderer
  try {
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' })
  } catch {
    throw new Error('webgl')
  }
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2))
  renderer.outputColorSpace = THREE.SRGBColorSpace
  stage.prepend(renderer.domElement)
  renderer.domElement.setAttribute('aria-hidden', 'true')

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100)
  camera.position.set(0, 0, 6.6)
  const table = new THREE.Group()
  scene.add(table)

  // Soft contact shadow under the whole hand, so cards sit on the felt instead of floating.
  const shadowTex = (() => {
    const cv = document.createElement('canvas')
    cv.width = cv.height = 128
    const g = cv.getContext('2d')
    const grad = g.createRadialGradient(64, 64, 4, 64, 64, 64)
    grad.addColorStop(0, 'rgba(0,0,0,0.55)')
    grad.addColorStop(1, 'rgba(0,0,0,0)')
    g.fillStyle = grad
    g.fillRect(0, 0, 128, 128)
    return new THREE.CanvasTexture(cv)
  })()

  await document.fonts.load('700 42px "Space Grotesk"').catch(() => {})
  await document.fonts.load('400 20px "JetBrains Mono"').catch(() => {})

  const backTex = toTexture(drawBack(), renderer)
  const geo = new THREE.PlaneGeometry(CARD_W, CARD_H)
  const faceCache = new Map()
  function faceFor(p) {
    if (faceCache.has(p.slug)) return faceCache.get(p.slug)
    const cv = drawFront(p, null)
    const tex = toTexture(cv, renderer)
    faceCache.set(p.slug, tex)
    loadImage(p.thumbnail).then((img) => {
      if (!img) return
      tex.image = drawFront(p, img)
      tex.needsUpdate = true
      requestFrame()
    })
    return tex
  }

  const cards = Array.from({ length: DECK_SIZE }, (_, i) => {
    const group = new THREE.Group()
    const front = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ map: backTex, transparent: true }))
    const back = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ map: backTex, transparent: true }))
    back.rotation.y = Math.PI
    const shadow = new THREE.Mesh(new THREE.PlaneGeometry(CARD_W * 1.5, CARD_H * 1.4), new THREE.MeshBasicMaterial({ map: shadowTex, transparent: true, depthWrite: false }))
    shadow.position.set(0.12, -0.16, -0.02)
    group.add(shadow, front, back)
    group.userData = { i, front, shadow, project: null, s: { x: 0, y: 0, z: 0, rx: 0, ry: Math.PI, rz: 0, sc: 0 }, lift: 0 }
    table.add(group)
    return group
  })

  function setFace(card, p) {
    card.userData.project = p
    card.userData.front.material.map = p ? faceFor(p) : backTex
    card.userData.front.material.needsUpdate = true
  }

  /* ---------- tweens ---------- */
  const tweens = new Set()
  const speed = () => (motion.reduced ? 0 : 1)
  function to(card, target, { dur = 0.5, delay = 0, e = ease.out, arc = 0 } = {}) {
    const from = { ...card.userData.s }
    const d = dur * speed()
    return new Promise((resolve) => {
      tweens.add({ card, from, target, dur: d, delay: delay * speed(), e, arc, t0: performance.now(), resolve })
      requestFrame()
    })
  }
  function stepTweens(now) {
    for (const tw of tweens) {
      const t = tw.dur === 0 ? 1 : Math.min(1, Math.max(0, (now - tw.t0) / 1000 - tw.delay) / tw.dur)
      if ((now - tw.t0) / 1000 < tw.delay && tw.dur) continue
      const k = tw.e(t)
      const s = tw.card.userData.s
      for (const key of Object.keys(tw.target)) s[key] = tw.from[key] + (tw.target[key] - tw.from[key]) * k
      tw.card.userData.arc = Math.sin(Math.PI * t) * tw.arc
      if (t >= 1) { tw.card.userData.arc = 0; tweens.delete(tw); tw.resolve() }
    }
  }
  const wait = (ms) => new Promise((r) => setTimeout(r, ms * speed()))

  /* ---------- layout ---------- */
  let visW = 6
  // Narrow stages (phones) shrink the hand instead of letting the outer cards fall off the felt.
  const fit = () => Math.min(1, visW / 5.4)
  function fanSlot(i, n) {
    const mid = (n - 1) / 2
    const sc = fit()
    const spread = Math.min(1.12, (visW - CARD_W * sc * 1.6) / Math.max(n - 1, 1))
    const off = i - mid
    return { x: off * spread, y: -Math.abs(off) * Math.abs(off) * 0.07 * sc, z: i * 0.03, rx: 0, ry: 0, rz: -off * 0.09, sc }
  }
  function deckSlot(k, x = 0) {
    // Tiny jitter per slot so the stack reads as real cards, not one thick block.
    const j = Math.sin(k * 12.9898) * 0.5
    return { x: x + j * 0.04, y: k * 0.012 - 0.15, z: k * 0.016, rx: 0, ry: Math.PI, rz: j * 0.05, sc: fit() }
  }
  function dealtLayout() {
    const narrow = visW < 6.4
    const sc = fit()
    return {
      deckX: narrow ? -visW / 2 + CARD_W * sc * 0.78 : -1.55,
      card: { x: narrow ? 0.5 * sc : 1.0, y: 0.05, z: 1.4, rx: 0, ry: 0, rz: -0.04, sc: (narrow ? 1.12 : 1.2) * sc },
    }
  }

  let mode = 'fan' // fan | busy | dealt
  let order = cards.map((_, i) => i) // bottom → top of the stack
  let dealtCard = null
  let lastSlug = null

  function layoutFan(instant = false) {
    cards.forEach((c, i) => {
      if (i < selected.length) {
        setFace(c, selected[i])
        const slot = fanSlot(i, selected.length)
        if (instant) Object.assign(c.userData.s, slot)
        else to(c, slot, { dur: 0.7, delay: i * 0.06, e: ease.back })
      } else {
        Object.assign(c.userData.s, { ...deckSlot(i), sc: 0 })
      }
    })
  }

  /* ---------- sequences ---------- */
  async function gather(x = 0) {
    const moves = order.map((ci, k) => {
      const c = cards[ci]
      const slot = deckSlot(k, x)
      if (c.userData.s.sc < 0.01) Object.assign(c.userData.s, { ...slot, y: slot.y - 0.6, sc: 0.001 })
      return to(c, slot, { dur: 0.45, delay: k * 0.022, e: ease.inOut, arc: c === dealtCard || c.userData.s.ry < 1 ? 0.5 : 0 })
    })
    await Promise.all(moves)
  }

  async function riffle() {
    const half = Math.floor(order.length / 2)
    const left = order.slice(0, half)
    const right = order.slice(half)
    await Promise.all([
      ...left.map((ci, k) => to(cards[ci], { x: -1.05, y: k * 0.012 - 0.2, z: k * 0.016, rz: 0.14 }, { dur: 0.24, e: ease.out })),
      ...right.map((ci, k) => to(cards[ci], { x: 1.05, y: k * 0.012 - 0.2, z: k * 0.016, rz: -0.14 }, { dur: 0.24, e: ease.out })),
    ])
    // Cards fall from alternating halves, bottom first, with a small random clump like a real riffle.
    const next = []
    let a = 0, b = 0
    while (a < left.length || b < right.length) {
      const fromLeft = b >= right.length || (a < left.length && Math.random() < 0.5)
      next.push(fromLeft ? left[a++] : right[b++])
    }
    await Promise.all(next.map((ci, k) => to(cards[ci], deckSlot(k), { dur: 0.2, delay: k * 0.026, e: ease.out, arc: 0.3 })))
    order = next
  }

  async function cut() {
    const half = Math.floor(order.length / 2)
    const bottom = order.slice(0, half)
    const top = order.slice(half)
    await Promise.all(top.map((ci) => to(cards[ci], { y: cards[ci].userData.s.y + 1.5, rz: 0.06 }, { dur: 0.22, e: ease.out })))
    await Promise.all(bottom.map((ci, k) => to(cards[ci], deckSlot(k + top.length), { dur: 0.18, e: ease.inOut })))
    await Promise.all(top.map((ci, k) => to(cards[ci], deckSlot(k), { dur: 0.24, delay: k * 0.012, e: ease.out })))
    order = [...top, ...bottom]
  }

  function pickRandom() {
    const pool = projects.filter((p) => p.slug !== lastSlug)
    return pool[Math.floor(Math.random() * pool.length)]
  }

  async function deal() {
    const p = pickRandom()
    lastSlug = p.slug
    const { deckX, card } = dealtLayout()
    const top = cards[order[order.length - 1]]
    setFace(top, p)
    const rest = order.slice(0, -1)
    rest.forEach((ci, k) => to(cards[ci], deckSlot(k, deckX), { dur: 0.45, delay: k * 0.012, e: ease.inOut }))
    await to(top, card, { dur: 0.85, e: ease.back, arc: 0.9 })
    dealtCard = top
    return p
  }

  function setBusy(b) {
    shuffleBtn.disabled = b
    resetBtn.disabled = b
    stage.setAttribute('aria-busy', String(b))
  }

  shuffleBtn.addEventListener('click', async () => {
    if (mode === 'busy') return
    mode = 'busy'
    setBusy(true)
    dealtBox.hidden = true
    status.textContent = 'Shuffling…'
    await gather()
    await riffle()
    await cut()
    await riffle()
    const p = await deal()
    status.textContent = ''
    dealtTitle.textContent = p.title
    dealtTitle.dataset.slug = p.slug
    dealtBox.hidden = false
    picksWrap.hidden = true
    resetBtn.hidden = false
    mode = 'dealt'
    setBusy(false)
  })

  resetBtn.addEventListener('click', async () => {
    if (mode !== 'dealt') return
    mode = 'busy'
    setBusy(true)
    dealtBox.hidden = true
    await gather()
    await wait(80)
    // Selected cards come off the top of the stack in order and fan out face up.
    const tops = order.slice(-selected.length).reverse()
    const rest = order.filter((ci) => !tops.includes(ci))
    rest.forEach((ci) => to(cards[ci], { sc: 0, y: -0.8 }, { dur: 0.35, e: ease.inOut }))
    await Promise.all(tops.map((ci, i) => { setFace(cards[ci], selected[i]); return to(cards[ci], fanSlot(i, selected.length), { dur: 0.7, delay: i * 0.07, e: ease.back, arc: 0.4 }) }))
    fanCards = tops.map((ci) => cards[ci])
    dealtCard = null
    resetBtn.hidden = true
    picksWrap.hidden = false
    mode = 'fan'
    setBusy(false)
    shuffleBtn.focus()
  })

  dealtTitle.addEventListener('click', () => open(dealtTitle.dataset.slug, dealtTitle))
  picks.addEventListener('click', (e) => {
    const b = e.target.closest('[data-pick]')
    if (b) open(b.dataset.pick, b)
  })

  /* ---------- pointer: hover lift, click to open, parallax ---------- */
  let fanCards = cards.slice(0, selected.length)
  let hovered = null
  const ray = new THREE.Raycaster()
  const ndc = new THREE.Vector2()
  const pointer = { x: 0, y: 0, tx: 0, ty: 0 }

  function hit(e) {
    const r = renderer.domElement.getBoundingClientRect()
    ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1)
    ray.setFromCamera(ndc, camera)
    const targets = mode === 'fan' ? fanCards : mode === 'dealt' && dealtCard ? [dealtCard] : []
    const hits = ray.intersectObjects(targets.map((c) => c.userData.front), false)
    return hits.length ? hits[0].object.parent : null
  }
  function setHover(card) {
    if (card === hovered) return
    hovered = card
    stage.classList.toggle('is-hover', !!card)
    const slug = card?.userData.project?.slug
    picks.querySelectorAll('button').forEach((b) => b.classList.toggle('is-hot', b.dataset.pick === slug))
    requestFrame()
  }
  renderer.domElement.addEventListener('pointermove', (e) => {
    const r = renderer.domElement.getBoundingClientRect()
    pointer.tx = ((e.clientX - r.left) / r.width) * 2 - 1
    pointer.ty = ((e.clientY - r.top) / r.height) * 2 - 1
    if (e.pointerType === 'mouse') setHover(hit(e))
    requestFrame()
  })
  renderer.domElement.addEventListener('pointerleave', () => { pointer.tx = pointer.ty = 0; setHover(null) })
  renderer.domElement.addEventListener('click', (e) => {
    const c = hit(e)
    if (c?.userData.project) open(c.userData.project.slug, shuffleBtn)
  })
  picks.addEventListener('pointerover', (e) => {
    const slug = e.target.closest('[data-pick]')?.dataset.pick
    setHover(fanCards.find((c) => c.userData.project?.slug === slug) || null)
  })
  picks.addEventListener('pointerout', () => setHover(null))
  picks.addEventListener('focusin', (e) => {
    const slug = e.target.closest('[data-pick]')?.dataset.pick
    setHover(fanCards.find((c) => c.userData.project?.slug === slug) || null)
  })
  picks.addEventListener('focusout', () => setHover(null))

  /* ---------- render loop (sleeps when nothing moves) ---------- */
  let onScreen = true
  let raf = 0
  let clock = 0
  function requestFrame() {
    if (!raf && onScreen) raf = requestAnimationFrame(frame)
  }
  function frame(now) {
    raf = 0
    stepTweens(now)
    const idle = !motion.paused
    if (idle) clock = now / 1000
    pointer.x += (pointer.tx - pointer.x) * 0.08
    pointer.y += (pointer.ty - pointer.y) * 0.08
    table.rotation.y = idle ? pointer.x * 0.18 + Math.sin(clock * 0.6) * 0.03 : 0
    table.rotation.x = idle ? pointer.y * 0.1 : 0
    let settling = Math.abs(pointer.tx - pointer.x) + Math.abs(pointer.ty - pointer.y) > 0.002
    for (const c of cards) {
      const u = c.userData
      const target = c === hovered ? 1 : 0
      u.lift += (target - u.lift) * 0.18
      if (Math.abs(target - u.lift) > 0.002) settling = true
      const bob = idle && mode !== 'busy' ? Math.sin(clock * 1.4 + u.i) * 0.03 : 0
      c.position.set(u.s.x, u.s.y + (u.arc || 0) + u.lift * 0.32 + bob, u.s.z + u.lift * 0.5)
      c.rotation.set(u.s.rx, u.s.ry, u.s.rz * (1 - u.lift * 0.6))
      c.scale.setScalar(Math.max(u.s.sc, 0.0001) * (1 + u.lift * 0.06))
      c.visible = u.s.sc > 0.01
      u.shadow.material.opacity = 0.9 - Math.min(0.6, (u.arc || 0) + u.lift * 0.5)
    }
    renderer.render(scene, camera)
    if (tweens.size || settling || idle) requestFrame()
  }

  function resize() {
    const { width, height } = stage.getBoundingClientRect()
    if (!width || !height) return
    renderer.setSize(width, height, false)
    camera.aspect = width / height
    camera.updateProjectionMatrix()
    visW = 2 * camera.position.z * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camera.aspect
    if (mode === 'fan') fanCards.forEach((c, i) => Object.assign(c.userData.s, fanSlot(i, selected.length)))
    if (mode === 'dealt') {
      const { deckX, card } = dealtLayout()
      order.forEach((ci, k) => { if (cards[ci] !== dealtCard) Object.assign(cards[ci].userData.s, deckSlot(k, deckX)) })
      Object.assign(dealtCard.userData.s, card)
    }
    requestFrame()
  }
  new ResizeObserver(resize).observe(stage)
  new IntersectionObserver(([en]) => { onScreen = en.isIntersecting; if (onScreen) requestFrame() }).observe(stage)
  motion.subscribe(requestFrame)

  resize()
  // Entrance: the selected hand slides up out of the stack.
  cards.forEach((c, i) => { if (i < selected.length) { setFace(c, selected[i]); Object.assign(c.userData.s, { ...deckSlot(i), y: -2.6, ry: 0, sc: 1 }) } })
  layoutFan(motion.reduced)
  status.textContent = ''
  shuffleBtn.disabled = false
  requestFrame()
}
