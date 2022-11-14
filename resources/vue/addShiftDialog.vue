<template>
<v-app>
  <v-row justify="center">
    <v-dialog
      v-model="$store.state.dialog.addShiftDialog"
      persistent
      max-width="600px"
    >

      <v-card>
        <v-card-title>
          <span class="text-h5">shifts</span>
        </v-card-title>
        <v-card-text>
  <v-text-field v-model="shifts.name" label="Name(*)"></v-text-field>
  <v-text-field v-model="shifts.description" label="description"></v-text-field>
  <v-text-field v-model="shifts.other" label="other"></v-text-field>
<v-dialog
        ref="start_time_dialog"
        v-model="start_time_modal"
        :return-value.sync="shifts.start_time"
        persistent
        width="290px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="shifts.start_time"
            label="Start Time"
            prepend-icon="mdi-clock-time-four-outline"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-time-picker
          v-if="start_time_modal"
          v-model="shifts.start_time"
          full-width
         color="green lighten-1"
      header-color="#1867C0"
        >
          <v-spacer></v-spacer>
          <v-btn
            text
            color="primary"
            @click="start_time_modal = false"
          >
            Cancel
          </v-btn>
          <v-btn
            text
            color="primary"
            @click="$refs.start_time_dialog.save(shifts.start_time)"
          >
            OK
          </v-btn>
        </v-time-picker>
      </v-dialog>
<v-dialog
        ref="end_time_dialog"
        v-model="end_time_modal"
        :return-value.sync="shifts.end_time"
        persistent
        width="290px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="shifts.end_time"
            label="End Time"
            prepend-icon="mdi-clock-time-four-outline"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-time-picker
          v-if="end_time_modal"
          v-model="shifts.end_time"
          full-width
         color="green lighten-1"
      header-color="#1867C0"

        >
          <v-spacer></v-spacer>
          <v-btn
            text
            color="#1867C0"
            @click="end_time_modal = false"
          >
            Cancel
          </v-btn>
          <v-btn
            text
            color="#1867C0"
            @click="$refs.end_time_dialog.save(shifts.end_time)"
          >
            OK
          </v-btn>
        </v-time-picker>
      </v-dialog>


          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="$store.commit('dialog',{key:'addShiftDialog',value:false})"
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
  </v-row>
  </v-app>
</template>
<script>
import moment  from  'moment'
export default {
data(){
  return {
end_time_modal:'',
start_time_modal:'',


shifts:{
company_id:'',
name:'',
group:'',
start_time:moment().format(this.$store.state.setup.bgTimeFormat),
end_time:moment().format(this.$store.state.setup.bgTimeFormat)
}
  }
},
methods:{
 async submit(){
    var $vm=this;
if($vm.shifts.name=='')
{
  $vm.$alert("Please Enter the Name")
  return ;
}

var prepare={
...this.shifts,
company_id:$vm.$store.state.setup.selected_company.id
}
var result=await $vm.$store.dispatch('CREATE_shifts',prepare)
 $vm.$alert(result.msg)

  }
}
}
</script>
<style lang="scss">

</style>
