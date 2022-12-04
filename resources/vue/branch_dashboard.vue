<template>
  <div class="bgGradient">
<div class="menubar">
<div @click="defaultMenuBar=item.name" :class="{selectedNavbar:defaultMenuBar==item.name}" v-for="(item,index) in menubar" :key="'menubar'+index">
{{item.title}}
</div>



<div style="display:flex;flex:1;height:95%"></div>
<div @click="logout" style="text-align: right; padding: 10px">Logout</div>
</div>

<div style="display:flex;padding:10px;">
<div style="height:20px;background:white"></div>
<div>
Selected Branch:{{$store.state.setup.selected_branch}}
<div v-if="defaultMenuBar=='dashboard'">
    <div style="display: flex; flex-wrap: wrap">
      <div
        @click="
          $store.commit('dialog', { key: 'addBranchDialog', value: true })
        "
        class="nucleus_widget gradient1"
      >
        Branches
      </div>
      <div   @click="$router.push({ name: 'main_users' })" class="nucleus_widget gradient2">
        Users
      </div>
      <!-- <div @click="$store.commit('dialog',{key:'addEmployeeDialog',value:true})"  class="nucleus_widget">
Users
</div> -->
      <div
        @click="
          $store.commit('dialog', { key: 'addMachineDialog', value: true })
        "
        class="nucleus_widget gradient3"
      >
        Machines
      </div>
      <div
        @click="
          $store.commit('dialog', { key: 'addBreaksDialog', value: true })
        "
        class="nucleus_widget gradient4"
      >
        Break Times
      </div>
      <div
        @click="
          $store.commit('dialog', { key: 'addDownTimeDialog', value: true })
        "
        class="nucleus_widget gradient5"
      >
        DownTime
      </div>
      <!-- <div
        @click="$store.commit('dialog', { key: 'addGroupDialog', value: true })"
        class="nucleus_widget"
      >
        Group
      </div> -->
      <div
        @click="
          $store.commit('dialog', { key: 'addProductsDialog', value: true })
        "
        class="nucleus_widget gradient6"
      >
        Products
      </div>

      <div
        @click="$store.commit('dialog', { key: 'addShiftDialog', value: true })"
        class="nucleus_widget gradient5 "
      >
        Shifts
      </div>

      <!-- <div @click="$store.commit('dialog',{key:'addEmpRoleDialog',value:true})"  class="nucleus_widget">
Emp Role
</div> -->
    </div>

    <h2 style="padding: 10px">Machine</h2>

    <h4 v-if="branchWiseMachine.length==0" style="    text-align: center;
    height: 450px;
    background: lightgray;
    display: flex;
    justify-content: center;
    align-items: center;">MACHINES NOT FOUND</h4>
    <div style="display: flex" v-else>

      <div
        @click="machineDialog(item)"
        v-for="(item, index) in branchWiseMachine"
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
  <div style="padding:10px;background:white">
<div class="side_nav_widget">
<div class="side_nav_widget_split">
<div style="background:#F5FAFE;flex:1;">{{branchWiseMachine.length}}</div>
<div style="background:white;flex:2;">MACHINE</div>

</div>
</div>
<div class="side_nav_widget">
<div class="side_nav_widget_split">
<div style="background:#F5FAFE;flex:1;">{{branchWiseProducts.length}}</div>
<div style="background:white;flex:2;">PRODUCTS</div>

</div>
</div>
<div class="side_nav_widget">
<div class="side_nav_widget_split">
<div style="background:#F5FAFE;flex:1;">{{branchWiseShifts.length}}</div>
<div style="background:white;flex:2;">SHIFT</div>

</div>
</div>
<div class="side_nav_widget">
<div class="side_nav_widget_split">
<div style="background:#F5FAFE;flex:1;">{{branchWiseBreakTimes.length}}</div>
<div style="background:white;flex:2;">BREAK TIME</div>

</div>
</div>
<div class="side_nav_widget">
<div class="side_nav_widget_split">
<div style="background:#F5FAFE;flex:1;">{{branchWiseDownTimes.length}}</div>
<div style="background:white;flex:2;">DOWN TIME</div>

</div>
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
            {
        title:'Machine',
        name:'machine'

      },
      {
        title:'Product',
        name:'product'

      },
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
  computed:{

    branchWiseProducts(){
var $vm=this;
return   _.filter($vm.$store.state.db.products,(machine)=>machine.branch==$vm.$store.state.setup.selected_branch)
    },
        branchWiseShifts(){
var $vm=this;
return   _.filter($vm.$store.state.db.shift,(machine)=>machine.branch==$vm.$store.state.setup.selected_branch)
    },
        branchWiseBreakTimes(){
var $vm=this;
return   _.filter($vm.$store.state.db.break,(machine)=>machine.branch==$vm.$store.state.setup.selected_branch)
    },
        branchWiseDownTimes(){
var $vm=this;
return   _.filter($vm.$store.state.db.downtime,(machine)=>machine.branch==$vm.$store.state.setup.selected_branch)
    },

    branchWiseMachine(){
var $vm=this;
return   _.filter($vm.$store.state.db.machines,(machine)=>machine.branch==$vm.$store.state.setup.selected_branch)
    }
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
.side_nav_widget_split{
      display: flex;
    height: 100%;
}

.side_nav_widget_split div{
  display:flex;justify-content:center;align-items:center
}

.side_nav_widget{
    width: 230px;
    height: 110px;
    margin-top:5px;
    background: white;
    border-radius: 9%;
    box-shadow: 0 4px 8px 0 rgb(0 0 0 / 20%);
    overflow: hidden;
    transition: 0.3s;
}
.nucleus_widget {
  display: flex;
  height: 60px;
  min-width: 15vw;
// color: white;
  justify-content: center;
  align-items: center;
  margin: 2px;

   box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
   transition: 0.3s;
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
