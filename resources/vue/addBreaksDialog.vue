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
  <v-text-field v-model="breaks.description" label="description"></v-text-field>
  <v-text-field v-model="breaks.other" label="other"></v-text-field>
<v-dialog
        ref="start_time_dialog"
        v-model="start_time_modal"
        :return-value.sync="breaks.start_time"
        persistent
        width="290px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="breaks.start_time"
            label="Start Time"
            prepend-icon="mdi-clock-time-four-outline"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-time-picker
          v-if="start_time_modal"
          v-model="breaks.start_time"
          full-width
         color="green lighten-1"
      header-color="#1867C0"
        >
          <v-spacer></v-spacer>
          <v-btn
            text
            color="primary"
            @click="start_time_modal = false"
          >
            Cancel
          </v-btn>
          <v-btn
            text
            color="primary"
            @click="$refs.start_time_dialog.save(breaks.start_time)"
          >
            OK
          </v-btn>
        </v-time-picker>
      </v-dialog>
<v-dialog
        ref="end_time_dialog"
        v-model="end_time_modal"
        :return-value.sync="breaks.end_time"
        persistent
        width="290px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="breaks.end_time"
            label="End Time"
            prepend-icon="mdi-clock-time-four-outline"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-time-picker
          v-if="end_time_modal"
          v-model="breaks.end_time"
          full-width
         color="green lighten-1"
      header-color="#1867C0"

        >
          <v-spacer></v-spacer>
          <v-btn
            text
            color="#1867C0"
            @click="end_time_modal = false"
          >
            Cancel
          </v-btn>
          <v-btn
            text
            color="#1867C0"
            @click="$refs.end_time_dialog.save(breaks.end_time)"
          >
            OK
          </v-btn>
        </v-time-picker>
      </v-dialog>


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
end_time_modal:'',
start_time_modal:'',
breaks:{

name:'',
group:'',
description:'',
start_time:moment().format($vm.$store.state.setup.bgTimeFormat),
end_time:moment().format($vm.$store.state.setup.bgTimeFormat)
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
