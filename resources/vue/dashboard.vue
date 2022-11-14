<template>
  <div class="bgGradient">
<!-- {{$store.state.dialog}} -->
<div style="display:flex;;flex-wrap:wrap">

<div @click="$store.commit('dialog',{key:'addBranchDialog',value:true})"  class="nucleus_widget">
Branches
</div>
<div @click="$store.commit('dialog',{key:'addEmployeeDialog',value:true})"  class="nucleus_widget">
Users
</div>
<div @click="$store.commit('dialog',{key:'addMachineDialog',value:true})"  class="nucleus_widget">
Machines
</div>
<div @click="$store.commit('dialog',{key:'addBreaksDialog',value:true})"  class="nucleus_widget">
Break Times
</div>
<div @click="$store.commit('dialog',{key:'addDownTimeDialog',value:true})"  class="nucleus_widget">
DownTime
</div>
<div @click="$store.commit('dialog',{key:'addGroupDialog',value:true})"  class="nucleus_widget">
Group
</div>
<div @click="$store.commit('dialog',{key:'addProductsDialog',value:true})"  class="nucleus_widget">
Products
</div>

<div @click="$store.commit('dialog',{key:'addShiftDialog',value:true})"  class="nucleus_widget">
Shifts
</div>
</div>

<h2 @click="$store.commit('dialog',{key:'addBranchDialog',value:true})" style="color:white;padding:10px"> Branches

  <v-icon style="color:white">fa-plus</v-icon>
</h2>

<div style="display:flex">
<div class="nucleus_widget">
Chennai
</div>

<div class="nucleus_widget">
Bangalore
</div>
</div>

  </div>
</template>

<script>
export default {

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
