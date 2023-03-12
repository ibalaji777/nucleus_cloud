<template>
  <div>

<!-- <div style="display:flex;justify-content:center">
<v-btn @click="$store.commit('dialog',{key:'addEmployeeDialog',value:true})" rounded  color="primary">
<v-icon  >fa-plus</v-icon>
Employee
</v-btn>
</div> -->
<div style="display:flex;margin-top:20px">
<div style="width:50vw;display:flex;justify-content:center">
<div class="cardRow" style="padding:15px">
<add-employee></add-employee>
</div>
</div>
<div style="width:50vw;display:flex;justify-content:center">
<div class="cardRow" style="padding:15px">


<div style="text-align: center;
margin-top:10px">
<div>      <v-text-field
        v-model="employeeSearch"
        append-icon="mdi-magnify"
        label="Search"
        style="height:100%"
        single-line
        hide-details
      ></v-text-field>
    <v-data-table
      :headers="headerEmployee"
      :items="$store.state.db.employees"
      :search="employeeSearch"
       @click:row="selectRow"
    ></v-data-table>
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
{ text: 'Branch', value: 'branch' },
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
     $vm.$store.dispatch("GET_EMPLOYEE");
    $vm.$store.dispatch("GET_BRANCHES");
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
