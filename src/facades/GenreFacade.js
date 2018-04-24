import axios from '../config/axios.config'

export default new class GenreFacade {
  getGenre () {
    return axios.get(`/genre`)
  }
}()
