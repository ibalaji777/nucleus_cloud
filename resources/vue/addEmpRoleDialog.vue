<template>
<div>

    <v-dialog
      v-model="$store.state.dialog.addEmpRoleDialog"
      persistent
      max-width="600px"
    >

      <v-card>
        <v-card-title>
          <span class="text-h5">Employee Role</span>
        </v-card-title>
        <v-card-text>
<v-select
v-model="empRole.type"
  :items="employeeType"
></v-select>

  <v-text-field v-model="empRole.name" label="Name(*)"></v-text-field>
  <v-text-field v-model="empRole.description" label="Description"></v-text-field>

          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="$store.commit('dialog',{key:'addEmpRoleDialog',value:false})"
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
import moment  from  'moment'

export default {
data(){
  return {
employeeType:['OPERATOR','SUPERVISOR'],
empRole:{
company_id:'',
name:'',
description:'',
type:'OPERATOR'
}
  }
},
methods:{
 async submit(){
    var $vm=this;
if($vm.empRole.name=='')
{
  $vm.$alert("Please Enter the Name")
  return ;
}

var prepare={...this.empRole,
company_id:$vm.$store.state.setup.selected_company.id
}
var result=await $vm.$store.dispatch('CREATE_EMP_ROLE',prepare)
 $vm.$alert(result.data.msg)

  }
}
}
</script>
<style lang="scss">

</style>
