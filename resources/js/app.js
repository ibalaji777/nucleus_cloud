// resources/vue/main.js
import vuetify from './plugin/vuetify.js'
import Vue from 'vue'
import store from './store/index.js'
// import App from '../vue/App.vue'
import router from './router/index.js'
Vue.config.productionTip = false
import App from '../vue/App.vue'

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
