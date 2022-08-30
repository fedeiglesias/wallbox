export default {
  SET_ITEMS(state, data) {
    state.items = data;
  },

  SET_ERROR(state, data) {
    state.error = data;
  },

  SET_LOADING(state, data) {
    state.loading = data;
  },

  UPDATE_BOOKS(state, payload) {
    state.items.forEach((author, index) => {
      const thisAuthorBooks = state.items[index].idBook;
      const bookIndex = author.idBook.indexOf(payload.book);
      const needToAppendBook = payload.authors.includes(author.id);

      if (needToAppendBook && bookIndex === -1) {
        thisAuthorBooks.push(payload.book);
      }

      if (!needToAppendBook && bookIndex > -1) {
        thisAuthorBooks.splice(bookIndex, 1);
      }
    });
  },
};
