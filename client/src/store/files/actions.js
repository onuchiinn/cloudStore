import axios from "axios"

export default {

    async GET_FILES({commit}, body) {
        try {
            commit("SHOW_LOADER")
            let url = `http://localhost:5000/api/files`
            if (body.dir) {
                url = `http://localhost:5000/api/files?parent=${body.dir}`
            }
            if (body.sort) {
                url = `http://localhost:5000/api/files?sort=${body.sort}`
            }
            if (body.dir && body.sort) {
                url = `http://localhost:5000/api/files?parent=${body.dir}&sort=${body.sort}`
            }
            await axios.get(url, {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            })
                .then((response) => {
                    commit("PUT_FILES", response.data)
                })
        } catch (e) {
            console.log(e.response.data.message)
        }
        finally {
            commit("SHOW_LOADER")
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
            if (dirId) {
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

    async DOWNLOAD_FILE(state, file) {
        const response = await fetch(`http://localhost:5000/api/files/download?id=${file._id}`, {
            headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
        })
        if (response.status === 200) {
            const blob = await response.blob()
            const downloadUrl = window.URL.createObjectURL(blob)
            const link = document.createElement("a")
            link.href = downloadUrl
            link.download = file.name
            document.body.appendChild(link)
            link.click()
            link.remove()
        }
    },

    async DELETE_FILE({commit}, file) {
        try {
            await axios.delete(`http://localhost:5000/api/files?id=${file._id}`, {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            }).then((response) => {
                console.log(response.data.message)
            })
            commit("DELETE_FILES", file._id)

        } catch (e) {
            console.log(e.response.data.message)
        }
    },

}
