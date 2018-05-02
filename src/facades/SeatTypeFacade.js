import axios from '../config/axios.config'

export default new class SeatTypeFacade {
  getSeatType = () => {
    return axios.get(`/seattype`)
  }
}()
