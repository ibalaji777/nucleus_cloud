<template>
  <div>
    <v-dialog
      v-model="$store.state.dialog.addBranchDialog"
      persistent
      max-width="600px"
    >
      <v-card>
        <v-card-title>
          <span class="text-h6">Branch/Create</span>
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
            @click="
              $store.commit('dialog', { key: 'addBranchDialog', value: false })
            "
          >
            Close
          </v-btn>
          <v-btn color="blue darken-1" text @click="submit"> Save </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
function initialState() {
  return {
    branch: {
      name: "",
    },
  };
}
export default {
  data() {
    return initialState();
  },
  methods: {
    async submit() {
      var $vm = this;
      console.log("create branch");
      var prepare = { ...$vm.branch };
      var result = await $vm.$store.dispatch("CREATE_BRANCH", prepare);

      if (result.data.success) {
        $vm.$store.commit("dialog", { key: "addBranchDialog", value: false });
        $vm.branch = initialState().branch;
      }
      $vm.$alert(result.data.msg);
    },
  },
};
</script>
<style lang="scss"></style>
