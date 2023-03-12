<template>
  <div style="padding:10px;">
    <!-- eslint-disable -->
    <v-btn color="primary" @click="machinePrePlanningDialog=true">Pre Planning </v-btn>
    <v-data-table
    dense
    height="45vh"
    style="margin:10px 0"
  fixed-header
      :headers="$store.state.headers.machinePrePlanning"
      :items="$store.state.db.machinePrePlanning"
      :search="search"
    >
    <template v-slot:item.action="{item}">
      <v-icon @click="removeItem(item)">fa-trash</v-icon>
    </template>
   </v-data-table>
    <v-dialog
      v-model="machinePrePlanningDialog"
      persistent
      max-width="600px"
    >

      <v-card>
        <v-card-title>
          <span class="text-h5">Machine Planning </span>
        </v-card-title>
        <v-card-text>

  <v-text-field v-model="planning.subject" label="Subject"></v-text-field>
  <v-text-field v-model="planning.description" label="Description"></v-text-field>



          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="machinePrePlanningDialog=false"
          >
            Close
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
@click="submit"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>


  </div>
</template>

<script>

function initialState(){
  return {
    search:'',
    machinePrePlanningDialog:false,
    planning:{
      subject:'',
      description:''
    }
  }
}
export default {
data(){
  return initialState()
},
mounted(){
var $vm=this;

$vm.$store.dispatch("GET_MACHINE_PRE_PLANNING")



},
methods:{
  removeItem(item){
var $vm=this;
$vm.$confirm("Do You Want To Delete").then(()=>{
$vm.$store.dispatch("REMOVE_MACHIEN_PRE_PLANNING",item.id)
})
  },
async submit(){
  var $vm=this;
var machine_id=$vm.$store.state.eventMachineDetail.id;

var prepare={
  machine_id,
  ...$vm.planning
}
var result=await  $vm.$store.dispatch('CREATE_MACHINE_PRE_PLANNING',prepare)
if(result.data.success)
{
  $vm.$alert("Successfully Updated")
$vm.planning=initialState().planning
}
}

}

}
</script>
<style lang="scss">

</style>
