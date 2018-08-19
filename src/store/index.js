import Vue from 'vue'
import Vuex from 'vuex'

import user from './modules/user'
import contacts from './modules/contacts'

import shared from './shared'

import {db, storage} from '../firebaseConnect/firebaseInit'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    db: db,
    storage: storage
  },
  modules: {
    user: user,
    contacts: contacts,
    shared: shared
  }
})

export default store