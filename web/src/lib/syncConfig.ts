// The Supabase project that holds a copy of your progress, so it can follow you between devices.
//
// Both values are public by design: the "anon" key only lets a browser talk to the project.
// What protects the data is the rule in supabase/setup.sql: a signed-in person can read and
// write their own row and nobody else's.
export const SUPABASE_URL = 'https://xvkdcaafiebmymkuikie.supabase.co'
export const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh2a2RjYWFmaWVibXlta3Vpa2llIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTE2MTQxNDcsImV4cCI6MjEwNzE5MDE0N30.pASniwyNRaidsSRRu4r8itpZGmIbH4QZeMqjNWGAlhs'
