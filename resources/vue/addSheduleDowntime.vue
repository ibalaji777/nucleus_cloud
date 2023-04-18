<template>
  <div>
    <v-text-field v-model="shedule.name" label="Name(*)"></v-text-field>
    <v-text-field
      type="number"
      v-model="shedule.minutes"
      label="Time in Minutes(*)"
    ></v-text-field>
    <v-text-field
      v-model="shedule.description"
      label="description"
    ></v-text-field>
    <small>*indicates required field</small>
    <v-btn
      color="blue darken-1"
      text
      @click="
        $store.commit('dialog', { key: 'addsheduleDialog', value: false })
      "
    >
      Close
    </v-btn>
    <v-btn color="blue darken-1" text @click="submit"> Save </v-btn>
  </div>
</template>
<script>
function initialState() {
  return {
    shedule: {
      group: "",
      name: "",
      type: 1,
      minutes: 15,
      description: "",
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
      if ($vm.shedule.name == "") {
        $vm.$alert("Please Enter the Name");
        return;
      }
      if ($vm.shedule.minutes == "") {
        $vm.$alert("Please Enter the Time In (Minutes)");
        return;
      }

      var prepare = {
        ...this.shedule,
      };

      var result = await $vm.$store.dispatch("CREATE_DOWN_TIME", prepare);
      if (result.data.success) $vm.shedule = initialState().shedule;
      $vm.$alert(result.data.msg);
    },
  },
};
</script>
<style lang="scss"></style>
