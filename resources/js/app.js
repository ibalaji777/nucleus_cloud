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
import machinesWidget from '../vue/machinesWidget.vue'

import addGroupDialog from '../vue/addGroupDialog.vue'
import VueSimpleAlert from "vue-simple-alert";
Vue.use(VueSimpleAlert);
Vue.component('addEmpRoleDialog',addEmpRoleDialog)
Vue.component('addProductDialog',addProductDialog)
Vue.component('addGroupDialog',addGroupDialog)
Vue.component('addBranchDialog',addBranchDialog)
Vue.component('addEmployeeDialog',addEmployeeDialog)
Vue.component('addShiftDialog',addShiftDialog)
Vue.component('addBreaksDialog',addBreaksDialog)
Vue.component('addMachineDialog',addMachineDialog)
Vue.component('addDownTimeDialog',addDownTimeDialog)

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
