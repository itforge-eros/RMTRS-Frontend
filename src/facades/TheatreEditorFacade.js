import axios from '../config/axios.config'

export default new class TheatreEditorFacade {
  getSeatType = () => {
    return axios.get(`/seattype`)
  }

  getTheatreAndSeats = (theatreId) => {
    return axios.get(`/theatre/${theatreId}`)
      .then(({data}) => {
        const rows = [...new Set(data.seats.map(seat => seat.row))].sort()
        const theatre = data.name
        const seats = data.seats
          .map(seat => {
            seat.mode = 0
            return seat
          })
          .reduce((obj, seat) => { // Convert array to object that has row+number (ex. A1, A3) as akey
            obj[seat.row + seat.number] = seat
            return obj
          }, {})
        return {rows, theatre, seats}
      })
      .catch(console.log)
  }
}()
