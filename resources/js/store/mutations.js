import Vue from 'vue'
const mutations={

  dialog(state,payload){

    Vue.set(state.dialog,payload.key,payload.value)
  }
}
export default mutations;
