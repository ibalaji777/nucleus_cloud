// resources/vue/main.js
import vuetify from './plugin/vuetify.js'
import Vue from 'vue'
import store from './store/index.js'
// import App from '../vue/App.vue'
import router from './router/index.js'
Vue.config.productionTip = false
import App from '../vue/App.vue'
import addBranchDialog from '../vue/addBranchDialog.vue'
import addEmployeeDialog from '../vue/addEmployeeDialog.vue'
import addShiftDialog from '../vue/addShiftDialog.vue'
import addBreaksDialog from '../vue/addBreaksDialog.vue'
import addMachineDialog from '../vue/addMachineDialog.vue'
import addDownTimeDialog from '../vue/addDownTimeDialog.vue'
import addProductDialog from '../vue/addProductDialog.vue'
import addEmpRoleDialog from '../vue/addEmpRoleDialog.vue'

import addEmployee from '../vue/addEmployee.vue'

import machinesWidget from '../vue/machinesWidget.vue'
import addBranch from '../vue/addBranch.vue'
import machinDetailDialog from '../vue/machinDetailDialog.vue'

import mainMachine from '../vue/mainMachine.vue'
import mainGroup from '../vue/mainGroup.vue'
import mainProduct from '../vue/mainProduct.vue'

import mainBranch from '../vue/mainBranch.vue'
import addMachine from '../vue/addMachine.vue'
import addProduct from '../vue/addProduct.vue'
import addGroup from '../vue/addGroup.vue'
import addShedule from '../vue/addShedule.vue'

import addGroupDialog from '../vue/addGroupDialog.vue'
import VueSimpleAlert from "vue-simple-alert";
Vue.use(VueSimpleAlert);

Vue.component('addEmployee',addEmployee)
Vue.component('addShedule',addShedule)
Vue.component('addBranch',addBranch)
Vue.component('addMachine',addMachine)
Vue.component('addProduct',addProduct)
Vue.component('addGroup',addGroup)
// Vue.component('addDowntime',addDowntime)
// Vue.component('addBreak',addBreak)

Vue.component('addEmpRoleDialog',addEmpRoleDialog)
Vue.component('addProductDialog',addProductDialog)
Vue.component('addGroupDialog',addGroupDialog)
Vue.component('addBranchDialog',addBranchDialog)
Vue.component('addEmployeeDialog',addEmployeeDialog)
Vue.component('addShiftDialog',addShiftDialog)
Vue.component('addBreaksDialog',addBreaksDialog)
Vue.component('addMachineDialog',addMachineDialog)
Vue.component('addDownTimeDialog',addDownTimeDialog)
Vue.component('machinDetailDialog',machinDetailDialog)

Vue.component('mainMachine',mainMachine)
Vue.component('mainGroup',mainGroup)
Vue.component('mainProduct',mainProduct)
Vue.component('mainBranch',mainBranch)


//widgets
Vue.component('machinesWidget',machinesWidget)




const app = new Vue({
  vuetify,
  router,
  store,

  // store,
  el: '#app',
  render: h => h(App)
  // store
});
// import '../css/app.css'
