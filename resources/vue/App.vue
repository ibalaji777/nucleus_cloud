<!-- resources/vue/App.vue -->

<template>
<v-app>
  <router-view></router-view>



<add-branch-dialog></add-branch-dialog>
<add-employee-dialog></add-employee-dialog>
<add-shift-dialog></add-shift-dialog>
<add-breaks-dialog></add-breaks-dialog>
<add-machine-dialog></add-machine-dialog>
<add-down-time-dialog></add-down-time-dialog>
<add-group-dialog></add-group-dialog>
<add-product-dialog></add-product-dialog>

</v-app>
</template>

<script>
export default {
  name: "App",

  mounted() {
    console.log("App has been mounted!!!");
  },
};
</script>

<style lang="scss">
@import url('../css/nucleus.css');
// a {
//   border: 1px solid black;
//   width: 100px;
//   background: gray;
//   padding: 5px 10px;
//   text-align: center;

//   &.active {
//     background: tomato;
//   }
// }
</style>
