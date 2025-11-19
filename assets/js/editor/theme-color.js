export function applyThemeColor () {
  const theme = window.sidebar_for_wpb_js && window.sidebar_for_wpb_js.colorTheme
  const root = document.body

  function setTheme (themeValue) {
    root.classList.remove('sfw-theme-light', 'sfw-theme-dark', 'sfw-theme-device')
    if (themeValue === 'device') {
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      root.classList.add(isDark ? 'sfw-theme-dark' : 'sfw-theme-light')
      root.classList.add('sfw-theme-device')
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
        setTheme('device')
      })
    } else {
      root.classList.add('sfw-theme-' + themeValue)
    }
  }

  if (theme) {
    setTheme(theme)
  }
}
