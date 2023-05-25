import Vue from 'vue'
import Vuex from 'vuex'

import movies from "./modules/movies"
import community from "./modules/community"
import accounts from "./modules/accounts"

import createPersistedState from "vuex-persistedstate"

Vue.use(Vuex)

export default new Vuex.Store({
  modules: { accounts, community, movies },
  plugins: [
    createPersistedState({
        paths: ["accounts"],
    }),
],
})
