import axios from '../config/axios.config'
import moment from 'moment'

export default new class {
  /**
   * @param {moment()} moment object
   * @return {List<Movie>} A list of movies with List<Actor>, List<Genre>, List<Production>, List<Rate>
   */
  getAvailableMovies = async (day) => {
    if (day === 'undefined') {
      day = moment()
    }
    return axios.get('/movie/available', {
      params: {
        date: day.format('YYYY-MM-DD')
      }
    })
  }
}()
