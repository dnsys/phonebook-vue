import firebase from 'firebase'
let Chance = require('chance')
let chance = new Chance()

export default {
  //namespaced: true,
  state: {
    contacts: ''
  },
  mutations:{
    SET_CONTACT(){

    }
  },
  actions:{
    seeds({rootState, commit}){
      commit('setLoading', true)
      commit('clearError')
      rootState.db.collection("contacts").add({
        avatar: chance.avatar(),
        name: chance.name(),
        phone: chance.phone(),
        owner: rootState.user.user.id
      }).then(data => {
        commit('setLoading', false)
        console.log(data)
      })
      // rootState.db.collection("contacts").add({
      //   avatar: 'https://www.sideshowtoy.com/wp-content/uploads/2017/11/dc-comics-justice-league-batman-statue-prime1-studio-feature-903246-1.jpg',
      //   name: 'Bruce Wayne',
      //   phone: '+38(093)222-2222',
      //   owner: rootState.user.user.id
      // })
      // rootState.db.collection("contacts").add({
      //   avatar: 'https://www.sideshowtoy.com/wp-content/uploads/2017/07/dc-comics-the-dark-knight-the-joker-quarter-scale-hot-toys-thumb-903126-1.jpg',
      //   name: 'Joker',
      //   phone: '+38(093)222-2222',
      //   owner: rootState.user.user.id
      // })
      // rootState.db.collection("contacts").add({
      //   avatar: 'https://ce-pro.eu/wp-content/uploads/2016/06/deadpool.png',
      //   name: 'Deadpool',
      //   phone: '+38(093)222-2222',
      //   owner: rootState.user.user.id
      // })
      // rootState.db.collection("contacts").add({
      //   avatar: 'http://alchile.com.mx/wp-content/uploads/2017/10/IMG-17564011.jpg',
      //   name: 'Wonder woman',
      //   phone: '+38(093)222-2222',
      //   owner: rootState.user.user.id
      // })
      // rootState.db.collection("contacts").add({
      //   avatar: 'http://s1.lprs1.fr/images/2017/02/01/6645372_000-gb3qo-c7598101336-original_940x500.jpg',
      //   name: 'Denzel Washington',
      //   phone: '+38(093)222-2222',
      //   owner: rootState.user.user.id
      // })
    }
  }
}