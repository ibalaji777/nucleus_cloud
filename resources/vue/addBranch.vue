<template>
<div>
   <span class="text-h5">Branch</span>
   <v-text-field v-model="branch.name" label="Branch Name(*)"></v-text-field>
 <div style="text-algin:center">
          <v-btn
            color="blue darken-1"
            text
            @click="submit"
          >
            Save
          </v-btn>
</div>
  </div>
</template>
<script>

function initialState(){
  return {
branch:{
   name:''
}
  }
}
export default {
data(){
  return initialState();
},
methods:{
 async submit(){
    var $vm=this;
    console.log("create branch")
var prepare={...$vm.branch}
var result=await $vm.$store.dispatch('CREATE_BRANCH',prepare)

if(result.data.success){
  $vm.branch=initialState().branch
}
$vm.$alert(result.data.msg)

  }
}
}
</script>
<style lang="scss">

</style>
