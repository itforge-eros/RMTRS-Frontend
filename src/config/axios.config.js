import axios from 'axios'
import { API_URL } from './constants'

export default axios.create({
  baseURL: API_URL,
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json'
  }
})
