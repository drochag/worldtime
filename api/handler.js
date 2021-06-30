const axios = require('axios')
const querystring = require('querystring');

const CancelToken = axios.CancelToken
const source = CancelToken.source()

const worldTimeInstance = axios.create({
  baseURL: 'https://worldtimeapi.org/api/timezone/',
})

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

const getAbbreviation = timezone =>
  worldTimeInstance(`/${timezone}`).then(res => res.data.abbreviation)

module.exports.getPlaces = (event, context, callback) => {
  googleMapsInstance
    .get('/geocode/json', {
      params: {
        address: querystring.parse(event.body).address,
      },
    })
    .then(res => res.data.results)
    .then(suggestions => {
      callback(null, {
        statusCode: 200,
        body: JSON.stringify(suggestions)
      })
    })
    .catch(err => {
      callback(err)
    })
}

module.exports.getExtendedSuggestion = (event, context, callback) => {
  const { suggestion } = querystring.parse(event.body)
  const location = `${suggestion.geometry.location.lat},${suggestion.geometry.location.lng}`
  googleMapsInstance
    .get('/timezone/json', {
      params: {
        location,
        timestamp: Math.floor(Date.now() / 1000),
      },
    })
    .then(res => res.data)
    .then(timezone =>
      getAbbreviation(timezone.timeZoneId).then(
        abbreviation =>
          ({
            ...suggestion,
            timezone,
            abbreviation,
          })
      )
    )
    .then(extendedSuggestion => {
      callback(null, {
        statusCode: 200,
        body: JSON.stringify(extendedSuggestion)
      })
    })
    .catch(err => {
      callback(err)
    })
}

module.exports.hello = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "Go Serverless v2.0! Your function executed successfully!",
        input: event,
      },
      null,
      2
    ),
  };
};
