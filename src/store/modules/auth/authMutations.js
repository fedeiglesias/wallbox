export default {
  SET_USER (state, userData) {
    state.user = userData
  },

  SET_ERROR (state, data) {
    state.error = data
  },

  SET_LOADING (state, data) {
    state.loading = data
  }
}
