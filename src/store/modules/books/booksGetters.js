export default {
  getDefaultBook: () => ({
    ID: null,
    Description: '',
    Excerpt: '',
    PageCount: '',
    PublishDate: '',
    Title: '',
    coverImage: ''
  }),
  isEmpty: state => !state.items.length,
  getById: state => id => state.items.find(book => book.ID === id),
  getAll: state => {
    return state.items.slice(0, state.pagination.page * state.pagination.limit)
  },
  totalPages: state => Math.ceil(state.items.length / state.pagination.limit),
  existMoreItemsToShow: state => state.pagination.page * state.pagination.limit < state.items.length
}
