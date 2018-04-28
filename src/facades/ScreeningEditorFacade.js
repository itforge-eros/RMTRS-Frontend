import axios from '../config/axios.config'

export default new class ScreeningEditorFacade {
  getScreening = id => {
    return axios.get(`/screening/${id}`)
  }
  getTheatre () {
    return axios.get(`/theatre/paged?page=0`)
  }
}()
