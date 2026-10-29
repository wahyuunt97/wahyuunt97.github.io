// One switch for every looping motion on the page: the OS setting decides the default,
// the header button lets the visitor pause or resume.
const query = matchMedia('(prefers-reduced-motion: reduce)')
const listeners = new Set()

export const motion = {
  reduced: query.matches,
  paused: query.matches,
  set(paused) {
    this.paused = paused
    listeners.forEach((fn) => fn())
  },
  subscribe(fn) {
    listeners.add(fn)
    return () => listeners.delete(fn)
  },
}

query.addEventListener('change', () => {
  motion.reduced = query.matches
  motion.set(query.matches)
})
