import axios from 'axios'
var api="http://127.0.0.1:3333/api/"
var apiCreateBranch=api+'create_branch';
var apiCreateMachine=api+'create_machine';

var apiCreateCompany=api+'create_company';
var apiCreateShift=api+'create_shift';
var apiCreateDownTime=api+'create_down_time';
var apiCreateBreak=api+'create_break';
var apiCreateEmployee=api+'create_employee';
var apiCreateProduct=api+'create_product';
var apiCreateGroup=api+'create_group';
var apiCreateEmpRole=api+'create_emprole';

var apiGetMachine=api+'get_machine';
var apiGetBranches=api+'get_branch';
var apiGetGroup=api+'get_group';

var apiGetDownTime=api+'get_downtime';
var apiGetBreak=api+'get_break';
var apiGetShift=api+'get_shift';



// var apiCreateBranch=api+'create_branch';
// var apiCreateBranch=api+'create_branch';
// var apiCreateBranch=api+'create_branch';
// var apiCreateBranch=api+'create_branch';
// var apiCreateBranch=api+'create_branch';

const actions = {

async apiCreateCompany(context,payload){
const {
  company_id,
  name
}=payload;
return await axios.post(apiCreateCompany,{data:{company_id,name}})
},

async CREATE_BRANCH(context,payload){
  var result=await axios.post(apiCreateBranch,{data:payload})
  actions.GET_BRANCHES(context)
  return result;
},

  async CREATE_SHIFT(context,payload){
    var result=await axios.post(apiCreateShift,{data:payload})
    actions.GET_SHIFT(context)

    return result;
    },

    async CREATE_BREAK(context,payload){

    var result=await axios.post(apiCreateBreak,{data:payload})
    actions.GET_BREAK(context)

return result
  }
      ,
      async CREATE_EMPLOYEE(context,payload){
        console.log("employee",payload)
        return await axios.post(apiCreateEmployee,{data:payload})
        }
        ,

          async CREATE_PRODUCT(context,payload){
            return await axios.post(apiCreateProduct,{data:payload})
            }
,
//pending.....
async CREATE_GROUP(context,payload){
  var result= await axios.post(apiCreateGroup,{data:payload})
actions.CREATE_GROUP(context)
  return result;
},


  async CREATE_EMP_ROLE(context,payload){
    return await axios.post(apiCreateEmpRole,{data:payload})
    },
    async CREATE_MACHINE(context,payload){
    var result= await axios.post(apiCreateMachine,{data:payload})
      actions.GET_MACHINES(context)
      return result;
    },
      async CREATE_DOWN_TIME(context,payload){
        var result= await axios.post(apiCreateDownTime,{data:payload})
        actions.GET_DOWNTIME(context)
        return result;
      }
       ,
       GET_MACHINES(context){
        return new Promise((resolve,reject)=>{
        var company_id=context.state.setup.selected_company.id
        return axios.post(apiGetMachine,{data:{company_id}})
        .then((data)=>{
          context.commit('GET_MACHINES',data.data)
          resolve(data.data)
        })
        .catch((data)=>reject(data))
      })

      },

      GET_BRANCHES(context){
        return new Promise((resolve,reject)=>{
        var company_id=context.state.setup.selected_company.id
        return axios.post(apiGetBranches,{data:{company_id}})
        .then((data)=>{
          context.commit('GET_BRANCHES',data.data)
          resolve(data.data)
        })
        .catch((data)=>reject(data))
      })

      }
,
GET_GROUPS(context){
  return new Promise((resolve,reject)=>{
  var company_id=context.state.setup.selected_company.id
  return axios.post(apiGetGroup,{data:{company_id}})
  .then((data)=>{
    context.commit('GET_GROUPS',data.data)
    resolve(data.data)
  })
  .catch((data)=>reject(data))
})

},
GET_BREAK(context){
  return new Promise((resolve,reject)=>{
  var company_id=context.state.setup.selected_company.id
  return axios.post(apiGetBreak,{data:{company_id}})
  .then((data)=>{
    context.commit('GET_BREAK',data.data)
    resolve(data.data)
  })
  .catch((data)=>reject(data))
})

}
,
GET_DOWNTIME(context){
  return new Promise((resolve,reject)=>{
  var company_id=context.state.setup.selected_company.id
  return axios.post(apiGetDownTime,{data:{company_id}})
  .then((data)=>{
    context.commit('GET_DOWNTIME',data.data)
    resolve(data.data)
  })
  .catch((data)=>reject(data))
})

}
,
GET_SHIFT(context){
  return new Promise((resolve,reject)=>{
  var company_id=context.state.setup.selected_company.id
  return axios.post(apiGetShift,{data:{company_id}})
  .then((data)=>{
    context.commit('GET_SHIFT',data.data)
    resolve(data.data)
  })
  .catch((data)=>reject(data))
})

}





}

export default actions;