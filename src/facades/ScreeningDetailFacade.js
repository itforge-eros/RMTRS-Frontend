import axios from '../config/axios.config'
import moment from 'moment'

export default new class ScreeningDetailFacade {
  /**
   * @param {moment()} moment object
   * @return Example
   * [{"theatre":{"id":1,"name":"T1"},"screenings":[{"id":1,"show_date":"2018-04-08","show_time":"2018-04-08T20:00:00","active":true}]},
   * {"theatre":{"id":2,"name":"T2"},"screenings":[{"id":2,"show_date":"2018-04-08","show_time":"2018-04-08T15:00:00","active":true},{"id":3,"show_date":"2018-04-08","show_time":"2018-04-08T12:00:00","active":true}]}]
   */
  getAvailableScreenings = async (date = moment(), movieId) => {
    return axios.get('/screening', {
      params: {
        date: date.format('YYYY-MM-DD'),
        movie: movieId
      }
    })
  }
}()
