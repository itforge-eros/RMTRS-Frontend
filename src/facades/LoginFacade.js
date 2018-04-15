import axios from '../config/axios.config'

export default new class LoginFacade {
  login = (username, password) => {
    return axios.post('/account/login', {
      username,
      password
    }).then(({data}) => {
      localStorage.setItem('currentAccount', JSON.stringify(data))
      return Promise.resolve()
    })
      .catch(err => {
        console.log(err.response)
        return Promise.reject(err)
      })
  }
}()
