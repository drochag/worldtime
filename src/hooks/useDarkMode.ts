import { useEffect, useState } from 'react'

export default function useDarkMode(): [string, React.Dispatch<React.SetStateAction<string>>] {
  const [theme, setTheme] = useState('light')
  const colorTheme = theme === 'light' ? 'dark' : 'light'
  useEffect(() => {
    const root = window.document.documentElement
    const storageTheme = localStorage.theme
    if (
      storageTheme === 'dark' ||
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      setTheme(storageTheme)
      root.classList.add('dark')
      root.classList.remove('light')
    } else {
      setTheme('light')
      root.classList.add('light')
      root.classList.remove('dark')
    }
  }, [])

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove(colorTheme)
    root.classList.add(theme)
    localStorage.theme = theme
  }, [theme, colorTheme])

  return [colorTheme, setTheme]
}
