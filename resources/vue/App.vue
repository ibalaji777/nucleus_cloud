<!-- resources/vue/App.vue -->

<template>
<div>
  <router-view></router-view>
</div>

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
