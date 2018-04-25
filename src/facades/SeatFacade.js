import axios from '../config/axios.config'

export default new class SeatFacade {
  getSeatsAndTheatre = screeningId => {
    return axios.get(`/screening/${screeningId}`)
      .then(({data}) => {
        return axios.get(`/theatre/${data.theatre.id}`)
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
      })
  }

  reserve = (screeningId, selectedSeats) => {
    const ticketsPayload = selectedSeats.map((seat, idx) => {
      return {seat_id: seat.id, item_no: idx + 1}
    })
    const reservePayload = {
      screening_id: screeningId,
      tickets: ticketsPayload
    }
    console.log(reservePayload)
    return axios.post('/reserve', reservePayload)
  }
}()
