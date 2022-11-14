<template>
<v-app>
  <v-row justify="center">
    <v-dialog
      v-model="$store.state.dialog.addGroupDialog"
      persistent
      max-width="600px"
    >

      <v-card>
        <v-card-title>
          <span class="text-h5">group</span>
        </v-card-title>
        <v-card-text>
  <v-text-field v-model="group.name" label="Name(*)"></v-text-field>
  <v-text-field v-model="group.description" label="Description"></v-text-field>

          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="$store.commit('dialog',{key:'addGroupDialog',value:false})"
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
import moment  from  'moment'

export default {
data(){
  return {


group:{
company_id:'',
name:'',
description:'',
}
  }
},
methods:{
 async submit(){
    var $vm=this;
if($vm.group.name=='')
{
  $vm.$alert("Please Enter the Name")
  return ;
}

var prepare={...this.group,
company_id:$vm.$store.state.setup.selected_company.id
}
var result=await $vm.$store.dispatch('CREATE_GROUP',prepare)
 $vm.$alert(result.msg)

  }
}
}
</script>
<style lang="scss">

</style>
