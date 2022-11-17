import Vue from 'vue';
import Vuex from 'vuex'
import state from './state.js'
import actions from './actions.js'
import mutations from './mutations.js'
import VuexPersistence from 'vuex-persist'
Vue.use(Vuex)
const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  reducer:(state)=>{
    return{
setup:{
  selected_company:{
    id:state.setup.selected_company.id,
    phone:state.setup.selected_company.id,
    email:state.setup.selected_company.id,
    company_name:state.setup.selected_company.id
  }
}


}
  }
})
const store = new Vuex.Store({
  state,
  mutations,
  actions,
  // modules: {

  // },
  plugins: [vuexLocal.plugin]
})

export default store;
