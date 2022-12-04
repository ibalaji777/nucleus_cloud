<template>
<div>
    <v-dialog
      v-model="$store.state.dialog.addMachineDialog"
      persistent
      max-width="600px"
    >

      <v-card>
        <v-card-title>
          <span class="text-h5">machine</span>
        </v-card-title>
        <v-card-text>
 <v-text-field v-model="machine.code" label="Machine code(*)"></v-text-field>
 <v-text-field v-model="machine.name" label="Name(*)"></v-text-field>
 <v-text-field v-model="machine.username" label="Username(*)"></v-text-field>
 <v-text-field v-model="machine.password" label="Password(*)"></v-text-field>
 <v-text-field v-model="machine.description" label="Description(Optional)"></v-text-field>
 <v-text-field v-model="machine.other" label="Other(Optional)"></v-text-field>


          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="$store.commit('dialog',{key:'addMachineDialog',value:false})"
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
  </div>
</template>
<script>

function initialState(){
return {
company_id:'',
branch:'',
machine:{
code:'',
name:'',
group:'',
hours:8,
description:'',
other:'',
username:'',
password:'',
}
  }
}
export default {
data(){
  return initialState()
},
methods:{
 async submit(){
    var $vm=this;
if($vm.machine.code=='')
{
  $vm.$alert("Please Enter the Code")
  return ;
}
if($vm.machine.name=='')
{
  $vm.$alert("Please Enter the  Name")
  return ;
}
if($vm.machine.username=='')
{
  $vm.$alert("Please Enter the Username")
  return ;
}
if($vm.machine.password=='')
{
  $vm.$alert("Please Enter the Password")
  return ;
}

// this.machine.group=$vm.$route.params.group||"";
var prepare={
...this.machine,
company_id:$vm.$store.state.setup.selected_company.id
}
var result=await $vm.$store.dispatch('CREATE_MACHINE',prepare)
if(result.data.success){
$vm.machine=initialState().machine
}
$vm.$alert(result.data.msg)

  }
}
}
</script>
<style lang="scss">

</style>
