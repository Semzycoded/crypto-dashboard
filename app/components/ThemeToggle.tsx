'use client'

import { useTheme } from 'next-themes'

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()

  return (
    <button
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      className="px-4 py-2 border rounded-lg text-sm bg-gray-100 dark:bg-gray-800 text-black dark:text-white transition-colors duration-300"
    >
      Toggle Dark Mode
    </button>
  )
}
