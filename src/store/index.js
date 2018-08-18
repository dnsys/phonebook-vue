import Vue from 'vue'
import Vuex from 'vuex'

import user from './modules/user'
import contacts from './modules/contacts'

import shared from './shared'

import * as firebase from 'firebase'

let configFirebase = {
  apiKey: "AIzaSyBgsHd1nOMPng--Kw8Aj2hO6qD0D4ekEws",
  authDomain: "testing-app-fc213.firebaseapp.com",
  databaseURL: "https://testing-app-fc213.firebaseio.com",
  projectId: "testing-app-fc213",
  storageBucket: "testing-app-fc213.appspot.com",
  messagingSenderId: "187892633827"
}


let firebaseApp = firebase.initializeApp(configFirebase)
let dataBase = firebaseApp.database()

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    db:  dataBase
  },
  modules: {
    user: user,
    contacts: contacts,
    shared: shared
  },
  getters: {
    db(state){
      return state.db
    }
  }
})

export default store