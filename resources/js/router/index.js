import Vue from 'vue';
import VueRouter from 'vue-router'
// const page = path => (resolve) => require([`./pages/${path}`], resolve)
import  Home from '../../vue/Home.vue'
import  company_signup from '../../vue/company_signup.vue'
import  company_signin from '../../vue/company_signin'
import  dashboard from '../../vue/dashboard.vue'
import  groupDashboard from '../../vue/groupDashboard.vue'
import mainUsers from '../../vue/main_users.vue'
import store from '../store/index.js'
import updateEmployee from '../../vue/updateEmployee.vue'
Vue.use(VueRouter)

const  routes= [
    {

      path: '/',
      name: 'index',
      component: dashboard,
      meta: {
        auth: true
        }
    },
    {

      path: '/updateEmployee',
      name: 'updateEmployee',
      component: updateEmployee,
      meta: {
        auth: true
        }
    },

    {

      path: '/main_users',
      name: 'main_users',
      component: mainUsers,
      meta: {
        auth: true
        }
    },
    {

      path: '/company_dashboard',
      name: 'company_dashboard',
      component: dashboard,
      meta: {
        auth: true
        }


    },
    {

      path: '/groupdashboard',
      name: 'groupdashboard',
      component: groupDashboard,
      meta: {
        auth: true
        }
    },

    {

      path: '/company_signup',
      name: 'company_signup',
      component: company_signup

    },
    {

      path: '/company_signin',
      name: 'company_signin',
      component: company_signin
    },

  ]

function isAuthenticated(){
 return  store.state.setup.selected_company.id!='';
}


const router = new VueRouter({
  routes
})
  // GOOD
  router.beforeEach((to, from, next) => {
    if(to.matched.some(rec=> rec.meta.auth)){
      if(isAuthenticated()){
        next()
      }
      else
        next({name:"company_signin"})
    }
    next()
  })
export default router;

