import axios from "axios"

export default {

  // eslint-disable-next-line no-unused-vars
  async GET_FILES({ commit }, dirId) {
    try {
      await axios.get(`http://localhost:5000/api/files${dirId ? '?parent=' + dirId : ''}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
        .then((response) => {
          commit("PUT_FILES",response.data)
        })
    } catch (e) {
      console.log(e.response.data.message)
    }
  }

}
