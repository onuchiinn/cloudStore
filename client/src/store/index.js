import Vue from "vue"
import Vuex from "vuex"

import auth from "./auth"
import files from "./files"



Vue.use(Vuex);

let store = new Vuex.Store({
    modules: {
      auth,
      files
    },

})

export default store;