export function applyThemeColor () {
  const theme = window.sidebar_for_wpb_js && window.sidebar_for_wpb_js.colorTheme
  const root = document.body
  const html = document.documentElement

  function setTheme (themeValue) {
    html.classList.remove('sfw-theme-light', 'sfw-theme-dark', 'sfw-theme-device')
    root.classList.remove('sfw-theme-light', 'sfw-theme-dark', 'sfw-theme-device')

    if (themeValue === 'device') {
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      const themeClass = isDark ? 'sfw-theme-dark' : 'sfw-theme-light'

      root.classList.add(themeClass)
      root.classList.add('sfw-theme-device')

      // Listen for system theme changes
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      const handler = (e) => {
        root.classList.remove('sfw-theme-light', 'sfw-theme-dark')
        root.classList.add(e.matches ? 'sfw-theme-dark' : 'sfw-theme-light')
      }

      // Remove old listener if exists to avoid duplicates
      if (window.sfw_theme_listener) {
        mediaQuery.removeEventListener('change', window.sfw_theme_listener)
      }

      mediaQuery.addEventListener('change', handler)
      window.sfw_theme_listener = handler
    } else {
      root.classList.add('sfw-theme-' + themeValue)
    }
  }

  if (theme) {
    setTheme(theme)
  }
}
