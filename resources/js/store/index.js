import Vue from 'vue';
import Vuex from 'vuex'
import state from './state.js'
import actions from './actions.js'
import mutations from './mutations.js'
import VuexPersistence from 'vuex-persist'
Vue.use(Vuex)
const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})
const store = new Vuex.Store({
  state:state,
  mutations,
  actions,
  modules: {

  },
  // plugins: [vuexLocal.plugin]
})

export default store;
