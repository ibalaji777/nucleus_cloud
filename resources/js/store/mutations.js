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
,
  GET_GROUPS(state,result){
if(Array.isArray(result))
  state.db.groups=result
}
,
 GET_BREAK(state,result){
if(Array.isArray(result))
state.db.break=result
},
  GET_DOWNTIME(state,result){
if(Array.isArray(result))
state.db.downtime=result
},
 GET_SHIFT(state,result){
if(Array.isArray(result))
state.db.shift=result
}
,COMPANY_LOGIN(state,result){
  state.setup.selected_company.id=result.id;
  state.setup.selected_company.email=result.email;
  state.setup.selected_company.phone=result.phone;
  state.setup.selected_company.company_name=result.company_name;
}
,
COMPANY_LOGOUT(state,result){
  state.setup.selected_company.id="";
  state.setup.selected_company.email="";
  state.setup.selected_company.phone="";
  state.setup.selected_company.company_name="";
},
GET_EMPLOYEE(state,result){
  if(Array.isArray(result))
  state.db.employees=result;
}
,
GET_EMPROLE(state,result){
  if(Array.isArray(result))
  state.db.emprole=result;
}

}
export default mutations;
