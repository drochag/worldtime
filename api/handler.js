const axios = require('axios')
const data = require('./data')

const CancelToken = axios.CancelToken
const source = CancelToken.source()

const googleMapsInstance = axios.create({
  baseURL: 'https://maps.googleapis.com/maps/api/',
})

googleMapsInstance.interceptors.request.use(config => ({
  ...config,
  cancelToken: source.token,
  params: {
    key: process.env.GOOGLE_MAPS_API_KEY,
    language: 'en-US',
    ...config.params,
  },
}))

const getAbbreviationAndLanguage = (timezone, country) => {
  const language = `${data.countries[country]}-${country.toLowerCase()}`
  var abbreviation = new Date()
    .toLocaleTimeString('en-us', {
      // TODO: use language
      timeZone: timezone,
      timeZoneName: 'short',
      hour12: true,
    })
    .split(' ')[2]
  return { abbreviation, language }
}

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Origin',
}

module.exports.getPlaces = async event => {
  try {
    const response = await googleMapsInstance.get('/geocode/json', {
      params: {
        address: JSON.parse(event.body).address,
      },
    })

    const { data } = response

    return {
      headers,
      statusCode: 200,
      body: JSON.stringify(data.results),
    }
  } catch (err) {
    console.log(err)
    return {
      headers,
      statusCode: 400,
      body: err.message,
    }
  }
}

module.exports.getExtendedSuggestion = async event => {
  const { lat, lng, country } = JSON.parse(event.body)
  const location = `${lat},${lng}`
  try {
    const { data: timezone } = await googleMapsInstance.get('/timezone/json', {
      params: {
        location,
        timestamp: Math.floor(Date.now() / 1000),
      },
    })

    const { abbreviation, language } = getAbbreviationAndLanguage(timezone.timeZoneId, country)

    return {
      headers,
      statusCode: 200,
      body: JSON.stringify({
        timezone,
        abbreviation,
        language,
      }),
    }
  } catch (err) {
    console.log(err)
    return {
      headers,
      statusCode: 400,
      body: err.message,
    }
  }
}
