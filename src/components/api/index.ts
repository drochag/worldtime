import axios, { AxiosError } from 'axios'
import { Suggestion, ExtendedSuggestion, ServerSuggestion } from 'types'
import getCountry from 'utils/getCountry'

const CancelToken = axios.CancelToken
const source = CancelToken.source()

const apiInstance = axios.create({
  baseURL: process.env.REACT_APP_WORLDTIME_API,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
})

apiInstance.interceptors.request.use(config => ({
  ...config,
  cancelToken: source.token,
}))

export const getHello = () => apiInstance.get('/')

export const getPlaces = (() => {
  const cache = {}
  return (address: string): Promise<void | Suggestion[]> => {
    if (cache[address]) {
      return Promise.resolve(cache[address])
    }

    return apiInstance
      .post('/get-places', { address })
      .then(res => res.data as Suggestion[])
      .then(suggestions => {
        cache[address] = suggestions
        return suggestions
      })
      .catch((err: AxiosError) => {
        console.log(err)
      })
  }
})()

export const getExtendedSuggestion = (() => {
  const cache = {}
  return (suggestion: Suggestion): Promise<void | ExtendedSuggestion> => {
    const { lat, lng } = suggestion.geometry.location
    const location = `${lat},${lng}`
    const country = getCountry(suggestion.address_components)

    if (cache[location]) {
      return Promise.resolve(cache[location])
    }

    return apiInstance
      .post('/get-extended-suggestion', { lat, lng, country })
      .then(res => res.data as ServerSuggestion)
      .then(
        extendedSuggestion =>
          ({
            ...suggestion,
            ...extendedSuggestion,
          } as ExtendedSuggestion)
      )
      .then(extendedSuggestion => {
        cache[location] = extendedSuggestion
        return extendedSuggestion
      })
      .catch((err: AxiosError) => {
        console.log(err)
      })
  }
})()
