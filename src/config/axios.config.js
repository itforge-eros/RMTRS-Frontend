import axios from 'axios'

const API_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:8888' : 'http://rmtrs.itforge.io'

export default axios.create({
  baseURL: API_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
})
