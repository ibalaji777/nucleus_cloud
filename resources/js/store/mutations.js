import Vue from 'vue'
const mutations={

  dialog(state,payload){

    Vue.set(state.dialog,payload.key,payload.value)
  },
  GET_MACHINES(state,result){
if(Array.isArray(result))
    state.db.machines=result
  },
GET_BRANCHES(state,result){
if(Array.isArray(result))
Vue.set(state.db,'branches',result)
}
,  GET_GROUPS(state,result){
if(Array.isArray(result))
  state.db.groups=result
}
,  GET_BREAK(state,result){
if(Array.isArray(result))
state.db.break=result
},  GET_DOWNTIME(state,result){
if(Array.isArray(result))
state.db.downtime=result
},  GET_SHIFT(state,result){
if(Array.isArray(result))
state.db.shift=result
}
}
export default mutations;
