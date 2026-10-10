// The search file built by vite.config.ts from the lessons and flashcards.
declare module 'virtual:search-index' {
  const entries: import('./lib/search').SearchEntry[]
  export default entries
}
