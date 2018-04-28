import axios from '../config/axios.config'

export default new class ScreeningFacade {
  getMovieAvailable = id => {
    return axios.get(`/movie/available/${id}`)
  }

  getMovie = id => {
    return axios.get(`/movie/${id}`)
  }
}()
