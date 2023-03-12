<template>
<div>
    <v-dialog
      v-model="$store.state.dialog.addGroupDialog"
      persistent
      max-width="600px"
    >

      <v-card>
        <v-card-title>
          <span class="text-h5">GROUP</span>
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
  </div>
</template>
<script>
import moment  from  'moment'

function initialState($vm){
  return {


group:{

name:'',
description:'',
}
  }
}
export default {
data(){
  return initialState(this)
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

}
var result=await $vm.$store.dispatch('CREATE_GROUP',prepare)
if(result.data.success){
  $vm.group=initialState(this).group
}
$vm.$alert(result.data.msg)

  }
}
}
</script>
<style lang="scss">

</style>
