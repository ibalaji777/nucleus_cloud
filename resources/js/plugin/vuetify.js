import Vue from 'vue'
import Vuetify from 'vuetify'
import "vuetify/dist/vuetify.min.css";
import '@fortawesome/fontawesome-free/css/all.css' // Ensure you are using css-loader
import 'material-design-icons-iconfont/dist/material-design-icons.css'
Vue.use(Vuetify)

export default new Vuetify({theme: {
  disable: true
},
icons: {
iconfont: 'fa',
}}
)
