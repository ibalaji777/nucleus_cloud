<template>
<div>

    <v-dialog
      v-model="$store.state.dialog.addDownTimeDialog"
      persistent
      max-width="600px"
    >

      <v-card>
        <v-card-title>
          <span class="text-h5">DOWN TIME</span>
        </v-card-title>
        <v-card-text>
  <v-text-field v-model="downtime.name" label="Name(*)"></v-text-field>
  <v-text-field v-model="downtime.description" label="description"></v-text-field>
  <!-- <v-select
          :items="types"
          item-text="title"
          item-value="value"
          :v-model="downtime.type"
          label="type"
          dense
        ></v-select> -->

          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="$store.commit('dialog',{key:'addDownTimeDialog',value:false})"
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
    types:[
{
  title:'Default',
  value:'default'
},
{
  title:'Break',
  value:'break'
},

],
end_time_modal:'',
start_time_modal:'',


downtime:{
company_id:'',
name:'',
group:'',
description:'',
type:'default'
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
if($vm.downtime.name=='')
{
  $vm.$alert("Please Enter the  Name")
  return ;
}
if($vm.downtime.type=='')
{
  $vm.$alert("Please Select the  Type")
  return ;
}
this.downtime.group=$vm.$route.params.group||"";
var prepare={
...this.downtime,
company_id:$vm.$store.state.setup.selected_company.id
}
var result=await $vm.$store.dispatch('CREATE_DOWN_TIME',prepare)
if(result.data.success){
 this.downtime=initialState(this).downtime
}
$vm.$alert(result.data.msg)

  }
}
}
</script>
<style lang="scss">

</style>
