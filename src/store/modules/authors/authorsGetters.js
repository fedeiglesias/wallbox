export default {
  isEmpty: (state) => !state.items.length,
  getAll: (state) => state.items,
  getByBookId: (state) => (bookId) =>
    state.items.filter((author) => author.idBook.includes(bookId)),
};
