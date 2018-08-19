import firebase from 'firebase'
import Vue from 'vue'
let Chance = require('chance')
let chance = new Chance()

export default {
  namespaced: true,
  state: {
    all: {},
  },
  mutations:{
    SET_CONTACT(state, payload){
      state.all = {
        ...state.all,
        [payload.id]: payload.data()
      }
      console.log(state.all)
    },
    DELETE_CONTACT(state, payload){
      Vue.delete(state.all, payload)
      console.log(state.all)
    }
  },
  actions:{
    seeds({rootState, commit, dispatch}){
      commit('setLoading', true, {root:true})
      dispatch('clearAllAlerts', null, {root:true})
      rootState.db.collection("contacts").add({
        avatar: chance.avatar(),
        name: chance.name(),
        phone: chance.phone(),
        owner: rootState.user.user.id
      }).then(data => {
        commit('setLoading', false, {root:true})
        dispatch('setSuccess', data, {root:true})
      })
    },
    async getContacts({commit, rootState}){
      let contastsRef = rootState.db.collection('contacts').where('owner', '==', rootState.user.user.id)
      let contacts = await contastsRef.get()
      contacts.forEach(contact => {
        commit('SET_CONTACT', contact)
      })
    },
    addContact({commit, rootState}, payload){
      rootState.db.collection('contacts').add({
        avatar: payload.avatar,
        name: payload.name,
        phone: payload.phone,
        owner: rootState.user.user.id
      }).then(data => {
        console.log(data)
      })
    },
    removeContact({commit, dispatch, rootState}, payload){
      rootState.db.collection('contacts').doc(payload).delete().then(()=>{
        commit('DELETE_CONTACT', payload)
      })
    }
  },
  getters: {
    contacts(state){
      return state.all
    }
  }
}