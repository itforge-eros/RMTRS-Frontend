import axios from '../config/axios.config'

export default new class SeatFacade {
  getSeatsAndTheatre = screeningId => {
    return axios.get(`/screening/${screeningId}`)
      .then(({data}) => {
        return axios.get(`/theatre/${data.theatre.id}`)
      })
  }
}()
