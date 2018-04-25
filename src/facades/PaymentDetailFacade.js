import axios from '../config/axios.config'

export default new class PaymentDetailFacade {
  fetchData = async (reserveId) => {
    const reserve = await axios.get(`/reserve/${reserveId}`)
    const screening = await axios.get(`/screening/${reserve.data.screening.id}`)
    const movie = screening.data.movie
    return { movie, reserve: reserve.data, screening: screening.data }
  }
}()
