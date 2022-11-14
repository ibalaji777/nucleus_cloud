<template>
<v-app>
  <v-row justify="center">
    <v-dialog
      v-model="$store.state.dialog.addBranchDialog"
      persistent
      max-width="600px"
    >

      <v-card>
        <v-card-title>
          <span class="text-h5">Branch</span>
        </v-card-title>
        <v-card-text>

  <v-text-field v-model="branch.name" label="Branch"></v-text-field>




          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="$store.commit('dialog',{key:'addBranchDialog',value:false})"
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
export default {
data(){
  return {
branch:{
  name:''
}
  }
},
methods:{
 async submit(){
    var $vm=this;
var prepare={company_id:$vm.$store.state.setup.selected_company.id,name:$vm.branch.name}
var result=await $vm.$store.dispatch('CREATE_BRANCH',prepare)
$vm.$alert(result.msg)

  }
}
}
</script>
<style lang="scss">

</style>
