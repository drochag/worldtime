import React from 'react'

type Theme = 'auto' | 'dark' | 'light'
const colorThemes: Theme[] = ['auto', 'dark', 'light']

interface WithDarkModeState {
  theme: Theme
  root: HTMLElement
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
      const { theme, root } = this.state
      const nextTheme =
        force || colorThemes[colorThemes.indexOf(this.state.theme) + 1] || colorThemes[0]

      if (force !== theme) {
        localStorage.setItem('theme', nextTheme)
        this.setState({ theme: nextTheme })
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
