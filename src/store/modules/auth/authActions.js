import router from '@/router/index'

export default {
  login ({ commit }, payload) {
    commit('SET_LOADING', true)
    // Simulate API call
    setTimeout(() => {
      let userData = {
        username: payload.username,
        fullName: 'John Doe'
      }
      commit('SET_USER', userData)
      router.replace({name: 'books'})
      commit('SET_LOADING', false)
    }, 2500)
  },
  logout ({commit }) {
    commit('SET_LOADING', true)
    // Call to API and destroy session
    commit('SET_USER', null)
    router.replace({name: 'login'})
    commit('SET_LOADING', false)
  }
}
