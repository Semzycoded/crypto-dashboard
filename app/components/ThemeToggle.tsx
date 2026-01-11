'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleToggle = () => {
    console.log('Current theme:', theme, 'Resolved:', resolvedTheme)
    const newTheme = resolvedTheme === 'dark' ? 'light' : 'dark'
    console.log('Setting theme to:', newTheme)
    setTheme(newTheme)
  }

  if (!mounted) {
    return (
      <button className="px-3 py-2 rounded-lg bg-gray-300 text-gray-500">
        Loading...
      </button>
    )
  }

  return (
    <button
      onClick={handleToggle}
      className="px-3 py-2 rounded-lg text-sm font-bold bg-amber-400 text-gray-900 hover:bg-amber-500 dark:bg-indigo-500 dark:text-white dark:hover:bg-indigo-600 transition-all duration-200 cursor-pointer shadow-sm"
      title={`Current: ${resolvedTheme}. Click to toggle`}
    >
      {resolvedTheme === 'dark' ? '☀️ Light' : '🌙 Dark'}
    </button>
  )
}
