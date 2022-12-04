<template>
  <div class="bgGradient">
<div class="menubar">
<div @click="defaultMenuBar=item.name" :class="{selectedNavbar:defaultMenuBar==item.name}" v-for="(item,index) in menubar" :key="'menubar'+index">
{{item.title}}
</div>
<div style="display:flex;flex:1"></div>
<div @click="logout" style="text-align: right; padding: 10px">Logout</div>
</div>
<div style="height:20px;background:white"></div>

<div v-if="defaultMenuBar=='dashboard'">
    <div style="display: flex; flex-wrap: wrap;padding:10px">
      <div
        @click="
          $store.commit('dialog', { key: 'addBranchDialog', value: true })
        "
        class="nucleus_widget gradient2"
      >
        Branches
      </div>




    </div>

    <!-- {{$store.state.db}} -->
    <h2 style="padding: 10px">Branches</h2>
    <div style="display: flex;padding:10px">
      <div
        v-for="(item, index) in $store.state.db.branches"
        :key="'branch' + index"
        class="nucleus_widget gradient2"
        @click="selectBranch(item.name)"
      >
        {{ item.name }}
      </div>
    </div>
</div>
     </div>
</template>

<script>

export default {
  data(){
  return {
    defaultMenuBar:'dashboard',
    menubar:[
      {
        title:'Dashboard',
        name:'dashboard'
      },

// {
//         title:'Branch',
//         name:'branch'
//       },
//             {
//         title:'Machine',
//         name:'machine'

//       },
//       {
//         title:'Product',
//         name:'product'

//       },
      // {
      //   title:'Group',
      //   name:'group'

      // },

    ]
  }
},
  mounted() {
    var $vm = this;
    $vm.$store.dispatch("GET_MACHINES");
    $vm.$store.dispatch("GET_GROUPS");
    $vm.$store.dispatch("GET_BREAK");
    $vm.$store.dispatch("GET_DOWNTIME");
    $vm.$store.dispatch("GET_SHIFT");
    $vm.$store.dispatch("GET_EMPLOYEE");
    $vm.$store.dispatch("GET_BRANCHES");
    $vm.$store.dispatch("GET_EMPROLE")
    $vm.$store.dispatch("GET_PRODUCTS");
  },
  methods: {
    selectBranch(branch){
var $vm=this;
$vm.$store.commit('SELECTED_BRANCH',branch)
$vm.$router.push({name:'branch_dashboard'})
    },
    machineDialog(data) {
      var $vm = this;

      $vm.$store.commit("EVENT_MACHINE_DETAIL", data);
      $vm.$store.commit("dialog", { key: "machinDetailDialog", value: true });
    },
    logout() {
      var $vm = this;

      $vm.$store.commit("COMPANY_LOGOUT");
      $vm.$router.push({ name: "company_signin" });
    },
  },
};
</script>
<style lang="scss">

.selectedNavbar{
  background: white !important;
}
.nucleus_widget {
  display: flex;
  height: 60px;
  min-width: 15vw;
  background: white;
  justify-content: center;
  align-items: center;
  margin: 2px;
}
.menubar{
  display:flex;
  // padding:2px;
  background: #F5FAFE;
}
.menubar div{
padding: 10px 11px;
    font-size: 12px;
    text-transform: uppercase;
    font-weight: 500;
    cursor: pointer;
}
</style>
