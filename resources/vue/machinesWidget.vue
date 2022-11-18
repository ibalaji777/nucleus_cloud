<template>
 <v-select   label="Select Machine" @change="change" return-object item-text="name" :items="$store.state.db.machines"></v-select>
 </template>

<script>
export default {

mounted(){
var $vm=this;
$vm.$store.dispatch('GET_MACHINES')

},
  methods:{
    change(data){
      var $vm=this;
    $vm.$emit("input",data)

    }
  }
}
</script>
<style lang="scss">

</style>
