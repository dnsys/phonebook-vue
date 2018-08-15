// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
let _ = require('lodash');
// Load the FP build for immutable auto-curried iteratee-first data-last methods.
let fp = require('lodash/fp');

// Load method categories.
let array = require('lodash/array');
let object = require('lodash/fp/object');

// Cherry-pick methods for smaller browserify/rollup/webpack bundles.
let at = require('lodash/at');
let curryN = require('lodash/fp/curryN');

import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

import * as firebase from 'firebase'

import VueFire from 'vuefire'

Vue.use(Vuetify)
Vue.use(VueFire)

import './firebaseConnect'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  created(){
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('autoSignIn', user)
      }
    })
  },
  components: { App },
  template: '<App/>'
})
