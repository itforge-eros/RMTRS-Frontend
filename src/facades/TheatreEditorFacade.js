import axios from '../config/axios.config'

export default new class TheatreEditorFacade {
  getTheatre = id => {
    return axios.get(`/theatre/${id}`)
  }
}()
