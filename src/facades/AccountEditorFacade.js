import axios from '../config/axios.config'

export default new class AccountEditorFacade {
  getAccount = id => {
    return axios.get(`/account/${id}`)
  }
}()
