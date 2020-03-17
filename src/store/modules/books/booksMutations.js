
export default {
  SET_ITEMS (state, data) {
    state.items = data
  },

  SET_PAGINATION (state, payload) {
    state.pagination = {
      page: payload.page || state.pagination.page,
      limit: payload.limit || state.pagination.limit,
      total: payload.total || state.pagination.total
    }
  },

  DELETE (state) {
    let bookId = state.layout.deleteModalId
    let bookIndex = state.items.findIndex(book => book.ID === bookId)
    state.items.splice(bookIndex, 1)
  },

  EDIT (state, bookData) {
    let bookIndex = state.items.findIndex(book => book.ID === bookData.ID)
    Object.assign(state.items[bookIndex], bookData)
  },

  ADD (state, bookData) {
    state.items.push(bookData)
  },

  SET_ERROR (state, data) {
    state.error = data
  },

  SET_LOADING (state, data) {
    state.loading = data
  },

  SHOW_DELETE_DIALOG (state, bookId) {
    state.layout.deleteModalId = bookId
  },

  HIDE_DELETE_DIALOG (state) {
    state.layout.deleteModalId = null
  },

  SHOW_EDIT_DIALOG (state, bookId) {
    state.layout.editModalId = bookId
  },

  HIDE_EDIT_DIALOG (state) {
    state.layout.editModalId = null
  },

  SHOW_ADD_DIALOG (state) {
    state.layout.addModal = true
  },

  HIDE_ADD_DIALOG (state) {
    state.layout.addModal = false
  }
}