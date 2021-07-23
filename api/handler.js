const axios = require('axios')

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

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Origin'
}

module.exports.getPlaces = async (event) => {
  try {
    const response = await googleMapsInstance
      .get('/geocode/json', {
        params: {
          address: JSON.parse(event.body).address,
        },
      })
    
      const { data } = response
      return {
          headers,
          statusCode: 200,
          body: JSON.stringify(data.results)
      }
  } catch (err) {
    console.log(err)
    return {
      headers,
      statusCode: 400,
      body: err.message
    }
  }
}

module.exports.getExtendedSuggestion = async (event) => {
  const { lat, lng } = JSON.parse(event.body)
  const location = `${lat},${lng}`
  try {
    const { data: timezone } = await googleMapsInstance
      .get('/timezone/json', {
        params: {
          location,
          timestamp: Math.floor(Date.now() / 1000),
        },
      })
      
    const abbreviation = await getAbbreviation(timezone.timeZoneId)
    return {
      headers,
      statusCode: 200,
      body: JSON.stringify({
        timezone,
        abbreviation,
      })
    }
  } catch (err) {
    console.log(err)
    return {
      headers,
      statusCode: 400,
      body: err.message
    }
  }
}

module.exports.hello = async (event) => {
  return {
    statusCode: 200,
    headers,
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
