<template>
  <div class="bgGradient" >
        <!-- eslint-disable -->
<h3 style="display:flex;justify-content:center;color:white">Group Dashboard</h3>
<!-- {{$route.params.group  }} -->

<div style="display:flex;;flex-wrap:wrap;justify-content:center">
<div @click="$store.commit('dialog',{key:'addMachineDialog',value:true})"  class="nucleus_widget">
Machines
</div>
<div @click="$store.commit('dialog',{key:'addBreaksDialog',value:true})"  class="nucleus_widget">
Break Times
</div>
<div @click="$store.commit('dialog',{key:'addDownTimeDialog',value:true})"  class="nucleus_widget">
DownTime
</div>

<div @click="$store.commit('dialog',{key:'addShiftDialog',value:true})"  class="nucleus_widget">
Shifts
</div>
</div>


<!-- {{$store.state.db}} -->
<div style="display:flex;justify-content:center">
<div  class="nucleus_widget">
Breaks {{groupedBreak.length}}
</div>
<div  class="nucleus_widget">
Down Time {{groupedDownTime.length}}
</div>
<div  class="nucleus_widget">
Shifts {{groupedShift.length}}
</div>
<div  class="nucleus_widget">
Machine {{groupedMachine.length}}
</div>
</div>

<div style="text-align: center;
    display: flex;
    justify-content: center;">
  <v-card style="width:60vw">
    <h4>MACHINES</h4>
    <v-card-title>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="$store.state.headers.machines"
      :items="groupedMachine"
      :search="search"
    >
        <template v-slot:item.action="{item}">
      <v-icon @click="removeMachine(item)">fa-trash</v-icon>
    </template>


    </v-data-table>
  </v-card>

</div>


<div style="text-align: center;
    display: flex;
    justify-content: center;margin-top:10px">
  <v-card style="width:60vw">
    <h4>SHIFTS</h4>
    <v-card-title>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="$store.state.headers.shifts"
      :items="groupedShift"
      :search="search"
    >
     <template v-slot:item.start_time="{ item }">
      {{ item.start_time |timeFormat}}
  </template>
 <template v-slot:item.end_time="{ item }">
      {{ item.end_time |timeFormat}}
    </template>
 <template v-slot:item.action="{ item }">
<v-icon @click="removeShift(item)">fa-trash</v-icon>
    </template>
    </v-data-table>
  </v-card>

</div>

<div style="text-align: center;
    display: flex;
    justify-content: center;margin-top:10px">
  <v-card style="width:60vw">
    <h4>BEAKS</h4>
    <v-card-title>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="$store.state.headers.breaks"
      :items="groupedBreak"
      :search="search"
    >

 <template v-slot:item.start_time="{ item }">
      {{ item.start_time |timeFormat}}
  </template>
 <template v-slot:item.end_time="{ item }">
      {{ item.end_time |timeFormat}}
    </template>
 <template v-slot:item.action="{ item }">
<v-icon @click="removeBreak(item)">fa-trash</v-icon>
    </template>


    </v-data-table>
  </v-card>

</div>
<div style="text-align: center;
    display: flex;
    justify-content: center;margin-top:10px">
  <v-card style="width:60vw">
    <h4>DOWNTIME</h4>
    <v-card-title>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="$store.state.headers.downtime"
      :items="groupedDownTime"
      :search="search"
    >
     <template v-slot:item.action="{ item }">
<v-icon @click="removeDowntime(item)">fa-trash</v-icon>
    </template>
    </v-data-table>
  </v-card>

</div>

  </div>
</template>

<script>
import Vue from 'vue';
import moment from 'moment'
Vue.filter('timeFormat', function (value) {
  var $vm=this;
  return moment(value,"HH:mm").format("hh:mm a")
})
import _ from 'lodash'
export default {
data(){
  return{
  group:'',
  search:'',
//   machineHeader:[
// { text: 'Code', value: 'code' },
// { text: 'Name', value: 'name' },
// { text: 'Hours', value: 'hours' },
// { text: 'Description', value: 'description' },
// { text: 'other', value: 'other' },
//   ],
shiftHeader:[
{ text: 'Name', value: 'name' },
{ text: 'Group', value: 'group' },
{ text: 'Start Time', value: 'start_time' },
{ text: 'End Time', value: 'end_time' },
  ],
breakHeader:[
{ text: 'Name', value: 'name' },
{ text: 'Group', value: 'group' },
{ text: 'Description', value: 'description' },
{ text: 'Start Time', value: 'start_time' },
{ text: 'End Time', value: 'end_time' },

  ],
  downtimeHeader:[

{ text: 'Name', value: 'name' },
{ text: 'Group', value: 'group' },
{ text: 'Description', value: 'description' },
{ text: 'type', value: 'type' },
  ]

  }
},
methods:{
   removeDowntime(item){
var $vm=this;
  $vm.$confirm('Do You Want to Delete?')
  .then(()=>{
   $vm.$store.dispatch("REMOVE_DOWNTIME",item)
    })

},
removeBreak(item){
var $vm=this;
  $vm.$confirm('Do You Want to Delete?')
  .then(()=>{
   $vm.$store.dispatch("REMOVE_BREAK",item)
    })

},
  removeShift(item){
var $vm=this;
  $vm.$confirm('Do You Want to Delete?')
  .then(()=>{
   $vm.$store.dispatch("REMOVE_SHIFT",item)
    })

},
removeMachine(item){

    var $vm=this;
  $vm.$confirm('Do You Want to Delete?')
  .then(()=>{
   $vm.$store.dispatch("REMOVE_MACHINE",item)
    })
}
},
mounted(){
var $vm=this;
console.log("params",$vm.$route.params.group)
$vm.group=$vm.$route.params.group||"";
$vm.$store.dispatch('GET_MACHINES')
$vm.$store.dispatch('GET_BRANCHES')
$vm.$store.dispatch('GET_GROUPS')
$vm.$store.dispatch('GET_BREAK')
$vm.$store.dispatch('GET_DOWNTIME')
$vm.$store.dispatch('GET_SHIFT')


},
computed:{
  groupedDownTime(){
var $vm=this;
$vm.group=$vm.$route.params.group||"";

    return _.filter($vm.$store.state.db.downtime,(x)=>x.group==$vm.group)
  },
    groupedBreak(){
var $vm=this;
$vm.group=$vm.$route.params.group||"";

    return _.filter($vm.$store.state.db.break,(x)=>x.group==$vm.group)
  },
      groupedShift(){
var $vm=this;
$vm.group=$vm.$route.params.group||"";

    return _.filter($vm.$store.state.db.shift,(x)=>x.group==$vm.group)
  },groupedMachine(){
    var $vm=this;
        return _.filter($vm.$store.state.db.machines,(x)=>x.group==$vm.group)

  }
}
}
</script>
<style lang="scss">

.nucleus_widget{
  display:flex;
  height:60px;
  min-width:15vw;
  background:white;
  justify-content:center;
  align-items:center;
  margin:2px;
}
</style>
