export default {
  state: {
    loading: false,
    error: null,
    success: null
  },
  mutations: {
    setLoading (state, payload) {
      state.loading = payload
    },
    setError (state, payload) {
      state.error = payload
    },
    setSuccess(state, payload){
      state.success = payload
    },
    clearAllAlerts (state) {
      state.error = null
      state.success = null
    }
  },
  actions: {
    clearAllAlerts ({commit}) {
      commit('clearAllAlerts')
    },
    setError ({commit}, payload) {
      commit('setError', payload)
    },
    setSuccess({commit}, payload){
      commit('setSuccess', payload)
    }
  },
  getters: {
    loading (state) {
      return state.loading
    },
    error (state) {
      return state.error
    },
    success(state){
      return state.success
    }
  }
}