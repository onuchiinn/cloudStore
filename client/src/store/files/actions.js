import axios from "axios"

export default {

    async GET_FILES({commit}, dirId) {
        try {
            await axios.get(`http://localhost:5000/api/files${dirId ? '?parent=' + dirId : ''}`, {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            })
                .then((response) => {
                    commit("PUT_FILES", response.data)
                })
        } catch (e) {
            console.log(e.response.data.message)
        }
    },


    async CREATE_DIR({commit}, {dirId, name}) {
        try {
            await axios.post(`http://localhost:5000/api/files`, {
                name,
                parent: dirId,
                type: "dir"
            }, {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            })
                .then((response) => {
                    commit("ADD_NEW_FILE", response.data)
                })
        } catch (e) {
            console.log(e.response.data.message)
        }
    },

    async UPLOAD_FILE({commit}, {file, dirId}) {
        try {
            const formData = new FormData()
            formData.append("file", file)
            if (dirId){
                formData.append("parent", dirId)
            }
            await axios.post(`http://localhost:5000/api/files/upload`, formData, {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}

            })
                .then((response) => {
                    commit("ADD_NEW_FILE", response.data)
                })
        } catch (e) {
            console.log(e.response.data.message)
        }
    },

    CHANGE_CURRENT_DIR({commit}, id) {
        commit("SET_CURRENT_DIR", id)
    },
    ADD_IN_STACK({commit}, el) {
        commit("PUSH_IN_STACK", el)
    },

}
