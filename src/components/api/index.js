import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://worldtimeapi.org/api',
})

export const getTimezones = instance.get('/timezone')
