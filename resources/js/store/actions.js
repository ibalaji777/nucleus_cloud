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
//pending
var apiCreateGroup=api+'create_group';
var apiCreateEmpRole=api+'create_emprole';
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
  return await axios.post(apiCreateBranch,{data:payload})
  },

  async CREATE_SHIFT(context,payload){
    return await axios.post(apiCreateShift,{data:payload})
    },

    async CREATE_BREAK(context,payload){

      return await axios.post(apiCreateBreak,{data:payload})
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
  return await axios.post(apiCreateGroup,{data:payload})
  },


  async CREATE_EMP_ROLE(context,payload){
    return await axios.post(apiCreateEmpRole,{data:payload})
    },
    async CREATE_MACHINE(context,payload){
      return await axios.post(apiCreateMachine,{data:payload})
      },
      async CREATE_DOWN_TIME(context,payload){
        return await axios.post(apiCreateDownTime,{data:payload})
        }




}

export default actions;
