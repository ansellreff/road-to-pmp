// One set of line icons, all drawn the same way: 20 px box, 1.6 px round strokes,
// in the colour of the text around them.
const paths = {
  search: 'M9 15a6 6 0 1 0 0-12 6 6 0 0 0 0 12Zm4.3-1.7L17 17',
  modules: 'M4 4.5h5v5H4zM11 4.5h5v5h-5zM4 11.5h5v5H4zM11 11.5h5v5h-5z',
  lesson: 'M4 4.5c2-.8 4-.8 6 .5v11c-2-1.3-4-1.3-6-.5zM16 4.5c-2-.8-4-.8-6 .5v11c2-1.3 4-1.3 6-.5z',
  quiz: 'M7.5 8a2.5 2.5 0 1 1 3.6 2.2c-.7.4-1.1.9-1.1 1.8M10 14.6v.4M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z',
  cards: 'M6.5 6.5h9a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-9a1 1 0 0 1-1-1v-8a1 1 0 0 1 1-1ZM3.5 13.5v-9a1 1 0 0 1 1-1h9',
  exam: 'M5 3.5h10a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-11a1 1 0 0 1 1-1ZM7 8l1.5 1.5L11 7M7 12.5h6',
  practice: 'M16 10a6 6 0 1 1-2-4.5M16 3.5v3h-3',
  plan: 'M4.5 5.5h11a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1h-11a1 1 0 0 1-1-1v-9a1 1 0 0 1 1-1ZM3.5 9h13M7 3.5v3M13 3.5v3',
  dashboard: 'M4 16.5V11M8.5 16.5V5M13 16.5V8.5M17 16.5v-4M3 16.5h15',
  formula: 'M15 4.5H6l4.5 5.5L6 15.5h9',
  streak: 'M10 17.5c3 0 5-2 5-4.800 0-2.200-1.500-3.700-2.500-5.700-.500 1.500-1.500 2-2 2 .300-2-.500-4.500-2.500-6 .300 2.500-3 4.700-3 9.200 0 3 2 5.300 5 5.300Z',
  flag: 'M5 17.5v-14M5 4.5h9l-2 3 2 3H5',
  clock: 'M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM10 5.500V10l3 2',
  check: 'M4.5 10.500l3.500 3.500 7.500-8',
  cross: 'M5.5 5.500l9 9M14.500 5.500l-9 9',
  next: 'M4 10h12M11.500 5.500 16 10l-4.500 4.500',
  previous: 'M16 10H4M8.500 5.500 4 10l4.500 4.500',
  down: 'M5.500 8l4.500 4.500L14.500 8',
  target: 'M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM10 14a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM10 10.300v-.600',
  trophy: 'M6.500 3.500h7v4a3.500 3.500 0 0 1-7 0zM6.500 5h-3c0 2.500 1.200 3.800 3.200 4M13.500 5h3c0 2.500-1.200 3.800-3.200 4M10 11v3M7 16.500h6',
  contents: 'M4 5.500h1M8 5.500h8M4 10h1M8 10h8M4 14.500h1M8 14.500h8',
  close: 'M5.500 5.500l9 9M14.500 5.500l-9 9',
}

export type IconName = keyof typeof paths

export default function Icon({ name, size = 20, className = '' }: { name: IconName; size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={`shrink-0 ${className}`}
    >
      <path d={paths[name]} />
    </svg>
  )
}
