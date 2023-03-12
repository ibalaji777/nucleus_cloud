<template>
<div>
  <div style="display:flex;justify-content:flex-end;padding:10px">

          <v-btn
            color="blue darken-1"
            text
@click="updateEmployee"
          >
            Save
          </v-btn>
</div>
   <div style="display:flex">

<div style="width:50vw;padding:10px;">
      <v-card>
        <v-card-title>
          <span class="text-h5">Employee</span>
        </v-card-title>
        <v-card-text>

  <v-text-field dense v-model="employee.name" label="Name(*)"></v-text-field>
  <v-text-field dense v-model="employee.email" label="email(*)"></v-text-field>
  <v-text-field dense v-model="employee.dialcode" label="dialcode(*)"></v-text-field>
  <v-text-field dense v-model="employee.phone" label="phone(*)"></v-text-field>
  <v-text-field dense v-model="employee.password" label="password(*)"></v-text-field>
  <v-select  v-model="employee.role" :items="employeeRole"></v-select>
  <v-text-field dense v-model="employee.idcard" label="idcard"></v-text-field>
  <v-text-field dense v-model="employee.other" label="other"></v-text-field>



          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>

        </v-card-actions>
      </v-card>
      </div>
<div style="width:50vw;padding:10px">
<!-- {{selectedMachine}} -->
<machines-widget v-model="selectedMachine"></machines-widget>
<div>
  <v-btn @click="addMachine" color="primary"
  >ADD</v-btn>
</div>
<div style="text-align: center;
    display: flex;
    justify-content: center;margin-top:10px">
  <v-card style="width:60vw">
    <h4 style="margin:0;padding:0;margin:5px;">MACHINE EVENT</h4>

    <v-card-title>
      <v-text-field dense
        v-model="machineSearch"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headerMachine"
      :items="machines"
      :search="machineSearch"
       ></v-data-table>
  </v-card>
</div>
</div>
</div>

  </div>
</template>

<script>
export default {
data(){
  return {
    machineSearch:'',
    headerMachine:[
{ text: 'Code', value: 'code' },
{ text: 'Name', value: 'name' },
{ text: 'Group', value: 'group' },
{ text: 'Type', value: 'type' },
{ text: 'Description', value: 'description' },
{ text: 'Other', value: 'other' },
],
    machines:[],
    selectedMachine:{},
    data:{},
  employeeRole:['SUPERVISOR','OPERATOR'],
employee:{
  branch:'',
  name:'',
  email:'',
  password:'',
  dialcode:'91',
  phone:'',
  role:'OPERATOR',
  idcard:'',
  other:'',
  config:"{}"
}
  }
},

mounted(){
var $vm=this
if(!_.isEmpty($vm.$route.params.data)){
$vm.employee={...$vm.$route.params.data}
}

$vm.machines=$vm.employee.config.machines||[]
},
methods:{
   async updateEmployee(){
    var $vm=this;
if($vm.employee.name=='')
{
  $vm.$alert("Please Enter the Name")
  return ;
}
if($vm.employee.dialcode=='')
{
  $vm.$alert("Please Enter the dial code")
  return ;
}
if($vm.employee.phone=='')
{
  $vm.$alert("Please Enter the Phone")
  return ;
}
if($vm.employee.email=='')
{
  $vm.$alert("Please Enter the Email")
  return ;
}
if($vm.employee.password=='')
{
  $vm.$alert("Please Enter the Password")
  return ;
}

var prepare={
...this.employee}
prepare['config']["machines"]=$vm.machines

var result=await $vm.$store.dispatch('UPDATE_EMPLOYEE',prepare)

$vm.$alert(result.data.msg)

  },
  addMachine(){
    var $vm=this;
if(!_.isEmpty($vm.selectedMachine))
{
if(!_.some($vm.machines,(e)=>e.code==$vm.selectedMachine.code)){
$vm.machines.push($vm.selectedMachine)
}else{
  $vm.$alert("Already Exist")
}
}else{

  $vm.$alert("Please Select a Machine")
}



  },

}
}
</script>
<style lang="scss">

</style>
