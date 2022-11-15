import Vue from 'vue';
import VueRouter from 'vue-router'
// const page = path => (resolve) => require([`./pages/${path}`], resolve)
import  Home from '../../vue/Home.vue'
import  login from '../../vue/login.vue'
import  signup from '../../vue/signup.vue'
import  dashboard from '../../vue/dashboard.vue'
import  groupDashboard from '../../vue/groupDashboard.vue'
Vue.use(VueRouter)

const  routes= [
    {

      path: '/',
      name: 'index',
      component: dashboard

    },
    {

      path: '/groupdashboard',
      name: 'groupdashboard',
      component: groupDashboard

    },

    {

      path: '/company_signup',
      name: 'company_signup',
      component: signup

    },
    {

      path: '/company_signin',
      name: 'company_signin',
      component: login
    },
    // {
    //   path: '/about',
    //   name: 'About',
    //   component: () => import('@/views/About.vue'),
    // },
    // // Should be the last route to handle 404
    // {
    //   path: '*',
    //   name: 'NotFound',
    //   component: () => import('@/views/NotFound.vue'),
    // },
  ]
const router = new VueRouter({
  // mode:'history',
  routes // short for `routes: routes`
})

export default router;

