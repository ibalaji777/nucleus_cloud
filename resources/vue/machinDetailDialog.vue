<template>
<div>
    <v-dialog
      v-model="$store.state.dialog.machinDetailDialog"
      persistent
      max-width="600px"
    >
      <v-card>
        <v-card-title>
          <span class="text-h5">MACHINE DETAIL</span>
        </v-card-title>
        <v-card-text>
          <v-btn color="primary" @click="$router.push({name:'mainMachinePrePlanning'})">Create Pre Planning</v-btn>
          <br>
          <br>
<!-- {{$store.state.eventMachineDetail}} -->
<h2> Login Info</h2> <br>
<!-- <div class="flex"><h4>USERNAME</h4>:<h4>{{$store.state.setup.selected_company.email}}</h4></div> -->
<div class="flex"><h4>MACHINE CODE</h4>:<h4>{{$store.state.eventMachineDetail.code}}</h4></div>


<div class="flex"><h4>USERNAME</h4>:<h4>{{$store.state.eventMachineDetail.username}}</h4></div>
<div class="flex"><h4>PASSWORD</h4>:<h4>{{$store.state.eventMachineDetail.password}}</h4></div>


        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="$store.commit('dialog',{key:'machinDetailDialog',value:false})"
          >
            Close
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
 $vm.$alert(result.data.msg)

  }
}
}
</script>
<style lang="scss">
.flex{
  display:flex
}
</style>
