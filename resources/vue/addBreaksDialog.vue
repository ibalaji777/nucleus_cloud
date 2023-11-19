<template>
<div>
    <v-dialog
      v-model="$store.state.dialog.addBreaksDialog"
      persistent
      max-width="600px"
    >

      <v-card>
        <v-card-title>
          <span class="text-h5">breaks</span>
        </v-card-title>
        <v-card-text>
  <v-text-field v-model="breaks.name" label="Name(*)"></v-text-field>
  <v-text-field v-model="breaks.description" label="Description"></v-text-field>
  <v-text-field type="number" v-model="breaks.minutes" label="Minutes"></v-text-field>


          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="$store.commit('dialog',{key:'addBreaksDialog',value:false})"
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
breaks:{

name:'',
group:'',
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
if($vm.breaks.code=='')
{
  $vm.$alert("Please Enter the Code")
  return ;
}
if($vm.breaks.name=='')
{
  $vm.$alert("Please Enter the  Name")
  return ;
}
if($vm.breaks.hours=='')
{
  $vm.$alert("Please Enter the Hours")
  return ;
}
this.breaks.group=$vm.$route.params.group||'';
var prepare={
...this.breaks,
}
var result=await $vm.$store.dispatch('CREATE_BREAK',prepare)
if(result.data.success){
  this.breaks=initialState(this).breaks
}
$vm.$alert(result.data.msg)

  }
}
}
</script>
<style lang="scss">

</style>
