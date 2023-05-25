import Vue from 'vue'
import Vuex from 'vuex'

import movies from "./modules/movies"
import community from "./modules/community"
import accounts from "./modules/accounts"
import worldcup from "./modules/worldcup"

import createPersistedState from "vuex-persistedstate"

Vue.use(Vuex)

export default new Vuex.Store({
  modules: { accounts, community, movies, worldcup },
  plugins: [
    createPersistedState({
        paths: ["accounts"],
    }),
],
})
