import axios from '../config/axios.config'

export default new class MovieEditorFacade {
  getProduction () {
    return axios.get(`/production`)
  }
  getActor () {
    return axios.get(`/actor`)
  }
}()
