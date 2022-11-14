import axios from 'axios'
var api="http://127.0.0.1:3333/api/"
var apiCreateBranch=api+'create_branch';
var apiCreateCompany=api+'create_company';
var apiCreateShift=api+'create_shift';
var apiCreateBreak=api+'create_break';
var apiCreateEmployee=api+'create_employee';
var apiCreateProduct=api+'create_product';
//pending
var apiCreateGroup=api+'create_group';
var apiCreateEmpRole=api+'create_emp_role';
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
  const {
    company_id,
    name
  }=payload;
  return await axios.post(apiCreateBranch,{data:{company_id,name}})
  },

  async CREATE_SHIFT(context,payload){
    const {
      company_id,
      name
    }=payload;
    return await axios.post(apiCreateShift,{data:{company_id,name}})
    },

    async CREATE_BREAK(context,payload){
      const {
        company_id,
        name
      }=payload;
      return await axios.post(apiCreateBreak,{data:{company_id,name}})
      }
      ,
      async CREATE_EMPLOYEE(context,payload){
        const {
          company_id,
          name
        }=payload;
        return await axios.post(apiCreateEmployee,{data:{company_id,name}})
        }
        ,
        async CREATE_BRANCH(context,payload){
          const {
            company_id,
            name
          }=payload;
          return await axios.post(apiCreateBranch,{data:{company_id,name}})
          },

          async CREATE_PRODUCT(context,payload){
            const {
              company_id,
              name
            }=payload;
            return await axios.post(apiCreateProduct,{data:{company_id,name}})
            }
,
//pending.....
async CREATE_GRPOUP(context,payload){
  const {
    company_id,
    name
  }=payload;
  return await axios.post(apiCreateGroup,{data:{company_id,name}})
  },


  async CREATE_EMP_ROLE(context,payload){
    const {
      company_id,
      name
    }=payload;
    return await axios.post(apiCreateEmpRole,{data:{company_id,name}})
    }


            // async CREATE_BRANCH(context,payload){
            //   const {
            //     company_id,
            //     name
            //   }=payload;
            //   return await axios.post(apiCreateBranch,{data:{company_id,name}})
            //   }

            //   async CREATE_BRANCH(context,payload){
            //     const {
            //       company_id,
            //       name
            //     }=payload;
            //     return await axios.post(apiCreateBranch,{data:{company_id,name}})
            //     }


}

export default actions;
