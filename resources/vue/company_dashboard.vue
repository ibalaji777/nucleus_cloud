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
    <div style="display: flex; flex-wrap: wrap">
      <div
        @click="
          $store.commit('dialog', { key: 'addBranchDialog', value: true })
        "
        class="nucleus_widget"
      >
        Branches
      </div>
      <div @click="$router.push({ name: 'main_users' })" class="nucleus_widget">
        Users
      </div>
      <!-- <div @click="$store.commit('dialog',{key:'addEmployeeDialog',value:true})"  class="nucleus_widget">
Users
</div> -->
      <div
        @click="
          $store.commit('dialog', { key: 'addMachineDialog', value: true })
        "
        class="nucleus_widget"
      >
        Machines
      </div>
      <div
        @click="
          $store.commit('dialog', { key: 'addBreaksDialog', value: true })
        "
        class="nucleus_widget"
      >
        Break Times
      </div>
      <div
        @click="
          $store.commit('dialog', { key: 'addDownTimeDialog', value: true })
        "
        class="nucleus_widget"
      >
        DownTime
      </div>
      <div
        @click="$store.commit('dialog', { key: 'addGroupDialog', value: true })"
        class="nucleus_widget"
      >
        Group
      </div>
      <div
        @click="
          $store.commit('dialog', { key: 'addProductsDialog', value: true })
        "
        class="nucleus_widget"
      >
        Products
      </div>

      <div
        @click="$store.commit('dialog', { key: 'addShiftDialog', value: true })"
        class="nucleus_widget"
      >
        Shifts
      </div>

      <!-- <div @click="$store.commit('dialog',{key:'addEmpRoleDialog',value:true})"  class="nucleus_widget">
Emp Role
</div> -->
    </div>

    <!-- {{$store.state.db}} -->
    <h2 style="padding: 10px">Branches</h2>
    <div style="display: flex">
      <div
        v-for="(item, index) in $store.state.db.branches"
        :key="'branch' + index"
        class="nucleus_widget"
      >
        {{ item.name }}
      </div>
    </div>

    <h2 style="padding: 10px">Group</h2>
    <div style="display: flex">
      <div
        @click="
          $router.push({ name: 'groupdashboard', params: { group: item.name } })
        "
        v-for="(item, index) in $store.state.db.groups"
        :key="'branch' + index"
        class="nucleus_widget"
      >
        {{ item.name }}
        <div style="margin-top: 10px">{{ item.group }}</div>
      </div>
    </div>
    <h2 style="padding: 10px">Machine</h2>
    <div style="display: flex">
      <div
        @click="machineDialog(item)"
        v-for="(item, index) in $store.state.db.machines"
        :key="'branch' + index"
        class="nucleus_widget"
      >
        {{ item.name }}
      </div>
    </div>
    </div>

    <div v-if="defaultMenuBar=='branch'">
          <main-branch></main-branch>
    </div>
    <div v-if="defaultMenuBar=='machine'">
          <main-machine></main-machine>
    </div>
    <div v-if="defaultMenuBar=='product'">
          <main-product></main-product>
    </div>
    <div v-if="defaultMenuBar=='group'">
          <main-group></main-group>
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

{
        title:'Branch',
        name:'branch'
      },
            {
        title:'Machine',
        name:'machine'

      },
      {
        title:'Product',
        name:'product'

      },
      {
        title:'Group',
        name:'group'

      },

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
  background: lightgrey;
}
.menubar div{
padding: 10px 11px;
    font-size: 12px;
    text-transform: uppercase;
    font-weight: 500;
    cursor: pointer;
}
</style>
