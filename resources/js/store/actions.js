import axios from 'axios'
var api="http://127.0.0.1:3333/api/"
var apiCreateBranch=api+'create_branch';

const actions = {

async CREATE_BRANCH(context,payload){
const {
  company_id,
  name
}=payload;
return await axios.post(apiCreateBranch,{data:{company_id,name}})


}

}

export default actions;
