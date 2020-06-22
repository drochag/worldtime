import axios from 'axios'
import { Suggestion, ExtendedSuggestion, Timezone } from 'types'

const CancelToken = axios.CancelToken
const source = CancelToken.source()

const proxyUrl = 'https://cors-anywhere.herokuapp.com/'
const googleMapsInstance = axios.create({
  baseURL: proxyUrl + 'https://maps.googleapis.com/maps/api/',
})

const worldTimeInstance = axios.create({
  baseURL: 'http://worldtimeapi.org/api/timezone/',
})

googleMapsInstance.interceptors.request.use(config => ({
  ...config,
  cancelToken: source.token,
  params: {
    key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    language: 'en-US',
    ...config.params,
  },
}))

export const getAbbreviation = timezone =>
  worldTimeInstance(`/${timezone}`).then(res => res.data.abbreviation)

export const getPlaces = (() => {
  const cache = {}
  return (address: string): Promise<Suggestion[]> => {
    if (cache[address]) {
      return cache[address]
    }

    return (cache[address] = googleMapsInstance
      .get('/geocode/json', {
        params: {
          address,
        },
      })
      .then(res => res.data.results as Suggestion[]))
  }
})()

export const getExtendedSuggestion = (() => {
  const cache = {}
  return (suggestion: Suggestion): Promise<ExtendedSuggestion> => {
    const location = `${suggestion.geometry.location.lat},${suggestion.geometry.location.lng}`
    if (cache[location]) {
      return cache[location]
    }

    return (cache[location] = googleMapsInstance
      .get('/timezone/json', {
        params: {
          location,
          timestamp: Math.floor(Date.now() / 1000),
        },
      })
      .then(res => res.data as Timezone)
      .then(timezone =>
        getAbbreviation(timezone.timeZoneId).then(
          abbreviation =>
            ({
              ...suggestion,
              timezone,
              abbreviation,
            } as ExtendedSuggestion)
        )
      ))
  }
})()
