<template>
  <div>
    <span class="text-h5">Product</span>
    <v-text-field v-model="product.name" label="Name(*)"></v-text-field>
    <v-text-field v-model="product.part_no" label="Part No(*)"></v-text-field>
    <v-text-field
      v-model="product.description"
      label="Description"
    ></v-text-field>

    <v-btn color="blue darken-1" text @click="submit"> Save </v-btn>
  </div>
</template>
<script>
import moment from "moment";

function initialState() {
  return {
    product: {
      branch: "",
      name: "",
      part_no: "",
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
      if ($vm.product.name == "") {
        $vm.$alert("Please Enter the Name");
        return;
      }
      if ($vm.product.part_no == "") {
        $vm.$alert("Please Enter the Part No");
        return;
      }

      var prepare = { ...this.product };
      var result = await $vm.$store.dispatch("CREATE_PRODUCT", prepare);

      if (result.data.success) {
        $vm.product = initialState().product;
      }
      $vm.$alert(result.data.msg);
    },
  },
};
</script>
<style lang="scss"></style>
