// The search file built by vite.config.ts from the lessons and flashcards.
declare module 'virtual:search-index' {
  const entries: import('./lib/search').SearchEntry[]
  export default entries
}

// The version log, read from CHANGELOG.md by vite.config.ts.
declare module 'virtual:release' {
  const release: { version: string; date: string; title: string; commit: string; changelog: string }
  export default release
}
