import axios from 'axios'
import { API_URL } from '../index'
import { generateName, generateAvatar } from './authorsMock'

export default {
  getList ({ commit }) {
    commit('SET_LOADING', true)
    axios.get(API_URL + '/Authors')
      .then(response => {
        const authors = response.data.map(author => ({
          ...author, // keep original data from API
          IDBook: [author.IDBook],
          ...generateName(),
          ...generateAvatar()
        }))
        commit('SET_ITEMS', authors)
      })
      .catch(error => commit('SET_ERROR', error.message))
      .finally(() => {
        commit('SET_LOADING', false)
      })
  },
  updateBooks ({ commit }, payload) {
    commit('UPDATE_BOOKS', payload)
  }
}
