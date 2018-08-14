import Vue from 'vue'
import Vuex from 'vuex'

import user from './modules/user'
import contacts from './modules/contacts'

import shared from './shared'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user: user,
    contacts: contacts,
    shared: shared
  }
})

export default store