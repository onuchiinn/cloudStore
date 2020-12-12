import axios from "axios"

export default {

  // eslint-disable-next-line no-unused-vars
  async REGISTRATION({ commit }, item) {
    try {
      await axios.post("http://localhost:5000/api/auth/registration", item)
        .then((response) => {
          console.log(response.data.message)
        })
    } catch (e) {
      console.log(e.response.data.message)
    }
  },



  async LOGIN({ commit }, item) {
    try {
      await axios.post("http://localhost:5000/api/auth/login", item)
        .then((response) => {
          commit("PUT_CURRENT_USER", response.data.user)
          commit("CHANGE_AUTH_STATUS", true)
          localStorage.setItem('token', response.data.token)
        })
    } catch (e) {
      console.log(e.response.data.message)
    }
  },


  async AUTH({ commit }) {
    try {
      await axios.get(`http://localhost:5000/api/auth/auth`,
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      )
        .then((response) => {
          commit("PUT_CURRENT_USER", response.data.user)
          commit("CHANGE_AUTH_STATUS", true)
          localStorage.setItem('token', response.data.token)
        })
    } catch (e) {
      console.log(e.response.data.message)
      localStorage.removeItem('token')
    }
  },

  LOGOUT({ commit }) {
    localStorage.removeItem('token')
    commit("PUT_CURRENT_USER", {})
    commit("CHANGE_AUTH_STATUS", false)
  }



}
