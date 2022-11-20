<template>
  <div>
    <!-- eslint-disable -->
<div style="display:flex;margin-top:20px">
<div style="width:50vw;display:flex;justify-content:center">
<div class="cardRow" style="padding:15px">
  <add-machine></add-machine>
</div>
</div>
<div style="width:50vw;display:flex;justify-content:center">
<div class="cardRow">
<div style="text-align: center;
    display: flex;
    justify-content: center;margin-top:10px">
    <div style="padding:15px">
    <h4>Machines</h4
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    <v-data-table
    dense
    height="45vh"
  fixed-header
      :headers="$store.state.headers.machines"
      :items="$store.state.db.machines"
      :search="search"
    >
    <template v-slot:item.action="{item}">
      <v-icon @click="removeItem(item)">fa-trash</v-icon>
    </template>

    </v-data-table>
</div>
</div>
</div>
</div>
</div>
  </div>
</template>
<script>
export default {

  data(){
    return {
      search:'',

    }
  },
  methods:{
    removeItem(item){
  var $vm=this;
  $vm.$confirm('Do You Want to Delete?')
  .then(()=>{
   $vm.$store.dispatch("REMOVE_MACHINE",item)
    })
    }
  }
}
</script>
<style lang="scss">
    .cardRow{
min-height: 75vh;width:47vw;background:white;
    box-shadow: 0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%), 0 1px 5px 0 rgb(0 0 0 / 12%);
  }
</style>
