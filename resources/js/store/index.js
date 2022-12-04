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
  selected_branch:state.setup.selected_branch,
  selected_company:{
    id:state.setup.selected_company.id,
    phone:state.setup.selected_company.phone,
    email:state.setup.selected_company.email,
    company_name:state.setup.selected_company.company_name
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
