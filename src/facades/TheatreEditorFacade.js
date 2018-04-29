import axios from '../config/axios.config'

export default new class TheatreEditorFacade {
  getSeatType () {
    return axios.get(`/seattype`)
  }
}()
