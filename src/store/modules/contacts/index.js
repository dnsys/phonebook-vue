import firebase from 'firebase'

export default {
  namespaced: true,
  state: {
    contacts: ''
  },
  mutations:{
    SET_CONTACT(){

    }
  },
  actions:{
    seeds({rootState, commit}){
      rootState.db.collection("contacts").add({
        avatar: 'https://upload.wikimedia.org/wikipedia/en/thumb/2/21/Web_of_Spider-Man_Vol_1_129-1.png/250px-Web_of_Spider-Man_Vol_1_129-1.png',
        name: 'Spider Man',
        phone: '+38(093)222-2222',
        owner: rootState.user.user.id
      })
    }
  }
}