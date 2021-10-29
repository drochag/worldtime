import React from 'react'

type Theme = 'auto' | 'dark' | 'light'
const colorThemes: Theme[] = ['auto', 'dark', 'light']
const colorCodes: Record<string, string> = {
  light: '#FF9D72',
  dark: '#424874',
}

interface WithDarkModeState {
  theme: Theme
  root: HTMLElement
  metaThemeColor: HTMLElement | null
  matchMedia: MediaQueryList
}

export interface WithDarkModeProps {
  toggleNextTheme?: () => void
  theme?: Theme
}

const withDarkMode = <P extends object>(WrappedComponent: React.ComponentType<P>) =>
  class WithDarkMode extends React.Component<P & WithDarkModeProps, WithDarkModeState> {
    state: WithDarkModeState = {
      theme: 'auto',
      root: window.document.documentElement,
      metaThemeColor: window.document.querySelector('meta[name="theme-color"]'),
      matchMedia: window.matchMedia('(prefers-color-scheme: dark)'),
    }

    componentDidMount() {
      const { matchMedia } = this.state
      const theme = (localStorage.getItem('theme') as Theme) || 'auto'
      this.setActiveTheme(theme)
      localStorage.setItem('theme', theme)

      matchMedia.addEventListener('change', this.matchMedia)
    }

    componentWillUnmount() {
      this.state.matchMedia.removeEventListener('change', this.matchMedia)
    }

    matchMedia = () => {
      this.setActiveTheme(this.state.theme)
    }

    removeThemeClassNames = () => {
      ;['dark', 'light'].forEach(className => this.state.root.classList.remove(className))
    }

    setActiveTheme = (force?: Theme) => {
      const { theme, root, metaThemeColor } = this.state
      const metaThemeColorElement =
        metaThemeColor || window.document.querySelector('meta[name="theme-color"]')
      const nextTheme =
        force || colorThemes[colorThemes.indexOf(this.state.theme) + 1] || colorThemes[0]

      if (force !== theme) {
        localStorage.setItem('theme', nextTheme)
        this.setState({ theme: nextTheme })
      }

      if (!metaThemeColor) {
        this.setState({
          metaThemeColor: metaThemeColorElement,
        })
      }

      if (metaThemeColorElement) {
        metaThemeColorElement.setAttribute(
          'content',
          colorCodes[
            nextTheme === 'auto'
              ? window.matchMedia('(prefers-color-scheme: dark)').matches
                ? 'dark'
                : 'light'
              : nextTheme
          ]
        )
      }

      this.removeThemeClassNames()

      root.classList.add(
        nextTheme === 'auto'
          ? window.matchMedia('(prefers-color-scheme: dark)').matches
            ? 'dark'
            : 'light'
          : nextTheme
      )
    }

    render() {
      return (
        <WrappedComponent
          {...(this.props as P)}
          theme={this.state.theme}
          toggleNextTheme={this.setActiveTheme}
        />
      )
    }
  }

export default withDarkMode
