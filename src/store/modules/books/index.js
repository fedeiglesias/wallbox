import state from './booksState'
import mutations from './booksMutations'
import getters from './booksGetters'
import actions from './booksActions'

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
