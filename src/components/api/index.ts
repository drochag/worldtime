import axios, { AxiosPromise } from 'axios'

const CancelToken = axios.CancelToken
const source = CancelToken.source()

const proxyUrl = 'https://cors-anywhere.herokuapp.com/'
const googleMapsInstance = axios.create({
  baseURL: proxyUrl + 'https://maps.googleapis.com/maps/api/',
})

googleMapsInstance.interceptors.request.use(config => ({
  ...config,
  cancelToken: source.token,
  params: {
    key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    ...config.params,
  },
}))

const handleErr = thrown => {
  if (axios.isCancel(thrown)) {
    console.log('Request canceled', thrown.message)
  } else {
    console.log(thrown)
  }
}

export const getPlaces = (() => {
  const cache = {}
  return (input: string): AxiosPromise => {
    if (cache[input]) {
      return cache[input]
    }

    return (cache[input] = googleMapsInstance
      .get('/place/findplacefromtext/json', {
        params: {
          input,
          inputtype: 'textquery',
          fields: 'formatted_address,name,geometry',
        },
      })
      .then(res => res.data.candidates)
      .catch(handleErr))
  }
})()

export const getTimezone = (() => {
  const cache = {}
  return (location: string): AxiosPromise => {
    if (cache[location]) {
      return cache[location]
    }

    return (cache[location] = googleMapsInstance
      .get('/timezone/json', {
        params: {
          location,
          timestamp: new Date().getTime(),
        },
      })
      .then(res => res.data)
      .catch(handleErr))
  }
})()
