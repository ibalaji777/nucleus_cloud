<!-- resources/vue/App.vue -->

<template>
<v-app>
  <router-view></router-view>



<add-branch-dialog></add-branch-dialog>
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
