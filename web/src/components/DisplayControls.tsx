import { setTextSize, setTheme, TEXT_SIZES, usePrefs, type TextSize } from '../lib/prefs'

const sizeLabel: Record<TextSize, string> = { normal: 'Normal text', large: 'Large text', larger: 'Larger text' }
const sizeStyle: Record<TextSize, string> = { normal: 'text-sm', large: 'text-base', larger: 'text-lg' }

const control = 'press flex h-9 items-center justify-center border border-edge bg-surface hover:border-ink hover:bg-plan-soft'

/** Text size and light or dark theme. Both are remembered in this browser. */
export default function DisplayControls() {
  const { theme, textSize } = usePrefs()
  const dark = theme === 'dark'
  return (
    <div className="flex items-center gap-2">
      <div className="flex" role="group" aria-label="Text size">
        {TEXT_SIZES.map((size, i) => (
          <button
            key={size}
            onClick={() => setTextSize(size)}
            aria-pressed={textSize === size}
            aria-label={sizeLabel[size]}
            title={sizeLabel[size]}
            className={`${control} w-9 font-bold leading-none ${sizeStyle[size]} ${i > 0 ? '-ml-px' : 'rounded-l-md'} ${
              i === TEXT_SIZES.length - 1 ? 'rounded-r-md' : ''
            } ${textSize === size ? 'relative z-10 border-plan bg-plan-soft text-plan' : ''}`}
          >
            A
          </button>
        ))}
      </div>
      <button
        onClick={() => setTheme(dark ? 'light' : 'dark')}
        className={`${control} gap-1.5 rounded-md px-2.5 text-sm font-medium`}
        aria-label={dark ? 'Switch to the light theme' : 'Switch to the dark theme'}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          {dark ? (
            <>
              <circle cx="8" cy="8" r="3" />
              <path d="M8 1.5v1.5M8 13v1.5M1.5 8H3M13 8h1.5M3.4 3.4l1.1 1.1M11.5 11.5l1.1 1.1M3.4 12.6l1.1-1.1M11.5 4.5l1.1-1.1" />
            </>
          ) : (
            <path d="M13.5 9.5A5.5 5.5 0 0 1 6.5 2.5a5.5 5.5 0 1 0 7 7Z" strokeLinejoin="round" />
          )}
        </svg>
        {dark ? 'Light' : 'Dark'}
      </button>
    </div>
  )
}
