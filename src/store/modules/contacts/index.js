import firebase from 'firebase'
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
      let contastsRef = rootState.db.collection('contacts')
      let contacts = await contastsRef.get()
      contacts.forEach(contact => {
        commit('SET_CONTACT', contact)
      })
    }
  },
  getters: {
    contacts(state){
      return state.contacts
    }
  }
}