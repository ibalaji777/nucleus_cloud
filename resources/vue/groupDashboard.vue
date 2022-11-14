<template>
  <div class="bgGradient">
<h3 style="color:white">Group Dashboard</h3>
<!-- {{$route.params.group  }} -->

<div style="display:flex;;flex-wrap:wrap">
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
<div style="display:flex">
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

  </div>
</template>

<script>
import _ from 'lodash'
export default {
data(){
  return{
  group:''

  }
},
mounted(){
var $vm=this;
console.log("params",$vm.$route.params.group)
$vm.group=$vm.$route.params.group||"";
$vm.$store.dispatch('GET_MACHINES')
$vm.$store.dispatch('GET_BRANCHES')
$vm.$store.dispatch('GET_GROUPS')


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
