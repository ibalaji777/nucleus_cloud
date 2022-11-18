const state={

dialog:{
  addBranchDialog:false,
  addEmployeeDialog:false,
  addShiftDialog:false,
  addBreaksDialog:false,
  addMachineDialog:false,
  addDownTimeDialog:false,
  addGroupDialog:false,
  addProductsDialog:false,
  addEmpRoleDialog:false,
  machinDetailDialog:false,
},

db:{
//ok
  machines:[],
  branches:[],
  groups:[],
  //
  downtime:[],
  break:[],
  shift:[],
  employees:[],
  emprole:[]

},
//while clicked in ui then it display
eventMachineDetail:{
  company_id:'',
  code:'',
  branch:'',
  name:'',
  group:'',
  hours:'',
  description:''

},
setup:{
  uiTimeFormat:"hh:mm a",
  bgTimeFormat:"HH:mm",
  uiDateFormat:"DD-MM-YYYY",
  bgDateFormat:"YYYY-MM-DD",
  selected_company:{
    id:'',
    phone:'88888888',
    email:'admin',
    // password:'admin',
    company_name:'isat software solutions'

  }

}
}

export default state;
