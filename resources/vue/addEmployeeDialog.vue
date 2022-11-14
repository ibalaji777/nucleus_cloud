<template>
<v-app>
  <v-row justify="center">
    <v-dialog
      v-model="$store.state.dialog.addEmployeeDialog"
      persistent
      max-width="600px"
    >

      <v-card>
        <v-card-title>
          <span class="text-h5">Employee</span>
        </v-card-title>
        <v-card-text>

  <v-text-field v-model="employee.name" label="Name(*)"></v-text-field>
  <v-text-field v-model="employee.email" label="email(*)"></v-text-field>
  <v-text-field v-model="employee.dialcode" label="dialcode(*)"></v-text-field>
  <v-text-field v-model="employee.phone" label="phone(*)"></v-text-field>
  <v-text-field v-model="employee.role" label="role"></v-text-field>
  <v-text-field v-model="employee.idcard" label="idcard"></v-text-field>
  <v-text-field v-model="employee.other" label="other"></v-text-field>



          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="$store.commit('dialog',{key:'addEmployeeDialog',value:false})"
          >
            Close
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
@click="submit"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
  </v-app>
</template>
<script>
export default {
data(){
  return {
employee:{
  company_id:'',
  name:'',
  email:'',
  dialcode:'91',
  phone:'',
  role:'',
  idcard:'',
  other:'',
}
  }
},
methods:{
 async submit(){
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
// console.log("prepareww",$vm.employee)

var prepare={
...this.employee,company_id:$vm.$store.state.setup.selected_company.id}
// console.log("prepare",prepare)
var result=await $vm.$store.dispatch('CREATE_EMPLOYEE',prepare)
$vm.$alert(result.data.msg)

  }
}
}
</script>
<style lang="scss">

</style>
