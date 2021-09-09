const getNavigatorLanguage = () => {
  if (window.navigator.languages && window.navigator.languages.length) {
    return window.navigator.languages[0]
  } else {
    return (
      // tslint:disable-next-line: no-string-literal
      window.navigator['userLanguage'] ||
      window.navigator.language ||
      // tslint:disable-next-line: no-string-literal
      window.navigator['browserLanguage'] ||
      'en'
    )
  }
}

export default getNavigatorLanguage
