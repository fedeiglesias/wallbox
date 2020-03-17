import axios from 'axios'
import { API_URL } from '../index'
import { bookData, coverGenerator } from './booksMock'

export default {
  getList ({ state, commit }) {
    commit('SET_LOADING', true)

    axios.get(API_URL + '/Books')
      .then(response => {
        const books = response.data.map((book, index) => ({
          ...book,
          ...bookData[index], // Only for better UX purposes
          coverImage: coverGenerator(book.ID) // Only for better UX purposes
        }))

        commit('SET_ITEMS', books)
      })
      .catch(error => commit('SET_ERROR', error.message))
      .finally(() => commit('SET_LOADING', false))
  },

  delete ({commit}) {
    // In real world here make a async call to API
    // then trigger the state mutation depends on result
    commit('DELETE')
    commit('HIDE_DELETE_DIALOG')
  },

  edit ({commit, dispatch}, payload) {
    // In real world here make a async call to API
    // then trigger the state mutation depends on result
    commit('EDIT', payload.book)
    dispatch('authors/updateBooks', payload.authors, {root: true})
    commit('HIDE_EDIT_DIALOG')
  },

  add ({commit, dispatch}, payload) {
    // In real world here make a async call to API
    // then trigger the state mutation depends on result

    console.log('Agregamos')
    console.log(payload)

    payload.book.ID = payload.authors.book = +new Date() // ID from server
    payload.book.coverImage = coverGenerator() // Cover from server

    commit('ADD', payload.book)
    dispatch('authors/updateBooks', payload.authors, {root: true})
    commit('HIDE_ADD_DIALOG')
  },

  setPage ({state, commit}) {
    commit('SET_PAGINATION', { page: state.pagination.page + 1 })
  },

  showDeleteDialog ({commit}, bookId) {
    commit('SHOW_DELETE_DIALOG', bookId)
  },

  hideDeleteDialog ({commit}) {
    commit('HIDE_DELETE_DIALOG')
  },

  showEditDialog ({commit}, bookId) {
    commit('SHOW_EDIT_DIALOG', bookId)
  },

  hideEditDialog ({commit}) {
    commit('HIDE_EDIT_DIALOG')
  },

  showAddDialog ({commit}) {
    commit('SHOW_ADD_DIALOG')
  },

  hideAddDialog ({commit}) {
    commit('HIDE_ADD_DIALOG')
  }
}
