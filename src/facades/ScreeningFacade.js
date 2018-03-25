import axios from '../config/axios.config'
import moment from 'moment'

export default new class {
  /**
   * @param {moment()} moment object
   * @return {List<Movie>} A list of movies with List<Actor>, List<Genre>, List<Production>, List<Rate>
   */
  getAvailableScreenings = async (date = moment(), movieId) => {
    return axios.get('/screening', {
      params: {
        date: date.format('YYYY-MM-DD'),
        movies: movieId
      }
    })
  }
}()
