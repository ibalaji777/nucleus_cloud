<template>
<div>
          <span class="text-h5">GROUP</span>
  <v-text-field v-model="group.name" label="Name(*)"></v-text-field>
  <v-text-field v-model="group.description" label="Description"></v-text-field>

          <v-btn
            color="blue darken-1"
            text
@click="submit"
          >
            Save
          </v-btn>

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
