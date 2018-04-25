import axios from 'axios'

const API_URL = 'http://rmtrs.itforge.io:8888'

export default axios.create({
  baseURL: API_URL,
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json'
  }
})
