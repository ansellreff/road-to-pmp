// Shared class strings so every page uses the same buttons, links, headings and panels.

// Buttons are at least 44 px tall, the size a finger or a tired hand can hit.
const button =
  'press inline-flex min-h-11 items-center justify-center rounded-md px-4 py-2 text-base disabled:cursor-not-allowed'
export const btnPrimary = `${button} bg-plan font-semibold text-on-plan hover:bg-plan-strong disabled:bg-line disabled:text-muted`
export const btnQuiet = `${button} border border-edge bg-surface font-medium text-ink hover:border-ink hover:bg-plan-soft disabled:border-line disabled:text-muted disabled:hover:bg-surface`
export const btnDanger = `${button} border border-edge bg-surface font-medium text-critical hover:border-critical hover:bg-critical-soft`
export const btnKnow = `${button} border border-done bg-done-soft font-semibold text-ink hover:bg-surface`
export const btnLearning = `${button} border border-milestone bg-milestone-soft font-semibold text-ink hover:bg-surface`

export const link =
  'press font-medium text-plan underline decoration-plan/40 underline-offset-4 hover:text-plan-strong hover:decoration-plan-strong'

// Headings. One size per level on every page.
export const pageTitle = 'title text-4xl sm:text-5xl'
export const pageTitleLong = 'title text-3xl sm:text-4xl'
export const sectionTitle = 'title text-2xl sm:text-3xl'
export const subTitle = 'title text-xl'
/** A heading with a list or table straight under it. */
export const listTitle = 'title border-b-2 border-ink pb-2 text-2xl'
/** A page section: a full rule above it. */
export const section = 'border-t-2 border-ink pt-6'

export const intro = 'mt-3 max-w-2xl text-lg leading-relaxed text-muted'
export const note = 'text-sm leading-relaxed text-muted'
/** The widest a column of questions or prose should be: about 75 characters a line. */
export const column = 'max-w-3xl'

/** A raised block. Add `lift` when the whole card is the thing to press. */
export const card = 'card'
export const cardLink = 'card lift block'

// The accent colour of each exam domain, in course order. Written out so the styles are generated.
export const domainText = ['text-d1', 'text-d2', 'text-d3', 'text-d4']
export const domainBg = ['bg-d1', 'bg-d2', 'bg-d3', 'bg-d4']
export const domainBorder = ['border-d1', 'border-d2', 'border-d3', 'border-d4']

export const input = 'press min-h-11 rounded-md border border-edge bg-surface px-3 py-2 text-ink hover:border-ink'
