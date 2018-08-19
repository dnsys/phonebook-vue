import firebase from 'firebase'
import Vue from 'vue'
let Chance = require('chance')
let chance = new Chance()

export default {
  namespaced: true,
  state: {
    all: [],
  },
  mutations:{
    SET_CONTACT(state, payload){
      state.all = payload.docs.map(contact => {
        return {
          id: contact.id,
          ...contact.data(),
        }
      })
    },
    // DELETE_CONTACT(state, payload){
    //   Vue.delete(state.all, payload)
    //   console.log(state.all)
    // }
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
    async getContacts({commit, dispatch, rootState}){
      let contastsRef = rootState.db.collection('contacts').where('owner', '==', rootState.user.user.id)
      let contacts = await contastsRef.get()
      commit('SET_CONTACT', contacts)
    },
    addContact({commit, dispatch, rootState}, payload){
      let file = payload.avatar
      let fileName = file.name
      let metadata = {
        contentType: file.type
      }
      let imgUpload = rootState.storage.ref().child(fileName).put(file, metadata)
      imgUpload
        .then(snapshot => {
          return snapshot.ref.getDownloadURL()
        })
        .then(url => {
          rootState.db.collection('contacts').add({
            avatar: url,
            name: payload.name,
            phone: payload.phone,
            owner: rootState.user.user.id
          }).then(data => {
            console.log(data)
            dispatch('getContacts')
          })
        })
    },
    removeContact({commit, dispatch, rootState}, payload){
      rootState.db.collection('contacts').doc(payload).delete().then(()=>{
        dispatch('getContacts')
      })
    }
  },
  getters: {
    contacts(state){
      return state.all
    }
  }
}