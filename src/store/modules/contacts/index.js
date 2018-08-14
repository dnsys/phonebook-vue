// import { firebaseDB } from '../../../firebaseConnect'
//
// export default {
//   state: {
//     contacts: null
//   },
//   mutations: {
//     updateContacts(state){
//       state.contacts = firebaseDB.collection('contacts')
//     }
//   },
//   actions: {
//     getContacts({commit}){
//       commit('updateContacts')
//     }
//   },
//   getters: {
//     contacts(state){
//       return state.contacts
//     }
//   }
// }