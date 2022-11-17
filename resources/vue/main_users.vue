<template>
  <div>

<!-- {{$store.state.dialog}} -->
<div style="display:flex;justify-content:center">
<v-btn @click="$store.commit('dialog',{key:'addEmployeeDialog',value:true})" rounded  color="primary">
<v-icon  >fa-plus</v-icon>
Employee
</v-btn>
<!-- <v-btn @click="$store.commit('dialog',{key:'addEmpRoleDialog',value:true})"  rounded  color="primary">
<v-icon >fa-plus</v-icon>
Role
</v-btn> -->
</div>

<div style="text-align: center;
    display: flex;
    justify-content: center;margin-top:10px">
  <v-card style="width:60vw">
    <h4 style="margin:0;padding:0;margin:5px;">EMPLOYEE</h4>

    <v-card-title>
      <v-text-field
        v-model="employeeSearch"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headerEmployee"
      :items="$store.state.db.employees"
      :search="employeeSearch"
       @click:row="selectRow"
    ></v-data-table>
  </v-card>
</div>
<!--
<div style="text-align: center;
    display: flex;
    justify-content: center;margin-top:10px">
  <v-card style="width:60vw">
    <h4 style="margin:0;padding:0;margin:5px;">EMPLOYEE ROLE</h4>
    <v-card-title>
      <v-text-field
        v-model="empSearch"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headerRole"
      :items="$store.state.db.emprole"
      :search="empSearch"
    ></v-data-table>
  </v-card>
</div> -->

  </div>
</template>
<script>
export default {

data(){
  return{
empSearch:'',
employeeSearch:'',
headerRole:[
{ text: 'Name', value: 'name' },
{ text: 'Type', value: 'type' },
{ text: 'Description', value: 'description' },
],
headerEmployee:[
{ text: 'Name', value: 'name' },
{ text: 'Email', value: 'email' },
{ text: 'Phone', value: 'phone' },
{ text: 'Password', value: 'password' },
{ text: 'Role', value: 'role' },
{ text: 'Id Card', value: 'idcard' },
],


  }
},
mounted(){
  var $vm=this;
  $vm.$store.dispatch('GET_EMPLOYEE')
  // $vm.$store.dispatch('GET_EMPROLE')
},
methods:{
  selectRow(data){
var $vm=this;
console.log("selected id",data)
$vm.$router.push({name:'updateEmployee',params:{data}})
}
}
}
</script>
