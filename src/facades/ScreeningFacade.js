import axios from '../config/axios.config'

export default new class ScreeningFacade {
  getMovie = id => {
    return axios.get(`/movie/${id}`)
  }
}()
