import axios from 'axios'

const API_URL = window.location.hostname === 'rmtrs.itforge.io'
  ? 'http://rmtrs.itforge.io:8888' : 'http://localhost:8888'

export default axios.create({
  baseURL: API_URL,
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json'
  }
})
