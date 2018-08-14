import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import * as firebase from 'firebase'

//import pages
import Home from '../views/Home'
import Auth from '../views/Auth'
import Contacts from '../views/Contacts'
import Edit from '../views/Edit'
import AddContact from '../views/AddContact'

Vue.use(Router)

let routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/auth',
    name: 'auth',
    component: Auth,
    meta: { guestOnly: true }
  },
  {
    path: '/contacts',
    name: 'contacts',
    component: Contacts,
    meta: { requireAuth: true },
  },
  {
    path: '/add',
    name: 'contact-add',
    component: AddContact,
    meta: { requireAuth: true },
  },
  {
    path: '/edit/:id',
    name: 'contact-edit',
    component: Edit
  },
  {path: '*', redirect: '/'}
]

const router = new Router({
  mode: 'history',
  routes,
  scrollBehavior (to, from, savedPosition) {
    return {x: 0, y: 0}
  }
})


router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requireAuth)) {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        next()
      } else {
        next('/auth')
      }
    });
  }else if(to.matched.some(record => record.meta.guestOnly)){
    firebase.auth().onAuthStateChanged(function (user) {
      if(user){
        next('/')
      }else{
        next()
      }
    })
  }else{
    next()
  }
})

export default router