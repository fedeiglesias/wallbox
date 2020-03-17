<template>
    <v-dialog
      v-model="dialogOpen"
      persistent
      max-width="600">
      <v-card>
        <v-card-title class="headline">
          {{
            mode === 'edit'?
            'Edit Book' :
            'Add new Book'
          }}
        </v-card-title>

        <div class="form">
          <v-text-field
            label="Title"
            color="#43ba9b"
            v-model.lazy="book.Title">
          </v-text-field>

          <v-menu
            ref="menu"
            v-model="publishDateMenu"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            min-width="290px">
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model.lazy="book.PublishDate"
                color="#43ba9b"
                label="Publish Date"
                readonly
                v-on="on">
              </v-text-field>
            </template>
            <v-date-picker
              ref="picker"
              color="#43ba9b"
              v-model="book.PublishDate"
              :max="new Date().toISOString().substr(0, 10)"
              min="1950-01-01"
              @change="publishDateSave">
            </v-date-picker>
          </v-menu>

          <v-combobox
            v-model="authors"
            :items="getAllAuthors"
            :item-text="author => author.FirstName + ' ' + author.LastName"
            :item-value="author => author.ID"
            hide-selected
            label="Authors"
            color="#43ba9b"
            multiple chips deletable-chips>

            <template v-slot:selection="{ attrs, item, parent }">
              <v-chip
                pill close
                :key="item.ID"
                @click:close="parent.selectItem(item)">
                <v-avatar left>
                  <v-img
                    contain
                    class="avatar"
                    :src="item.avatar">
                  </v-img>
                </v-avatar>
                {{ item.FirstName + ' ' + item.LastName }}
              </v-chip>
            </template>
          </v-combobox>

          <v-text-field
            label="Pages"
            color="#43ba9b"
            v-model.lazy="book.PageCount">
          </v-text-field>

          <v-textarea
            rows="12"
            color="#43ba9b"
            label="Description"
            v-model.lazy="book.Description">
          </v-textarea>
        </div>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="cancel">Cancel</v-btn>
          <v-btn color="green darken-1" text @click="confirm">Confirm</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data: function () {
    return {
      book: {},
      dialogOpen: false,
      authors: [],
      publishDateMenu: false
    }
  },
  computed: {
    ...mapGetters({
      getBookById: 'books/getById',
      getAllAuthors: 'authors/getAll',
      getAuthorsByBook: 'authors/getByBookId',
      getDefaultBook: 'books/getDefaultBook'
    }),
    mode: {
      get () {
        let { editModalId: edit, addModal: add } = this.$store.state.books.layout

        if (edit) return 'edit'
        if (add) return 'add'
        return null
      }
    }
  },
  watch: {
    menu (val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
    },
    mode (newData, oldData) {
      console.log('Open/close')

      if (newData === 'add') {
        Object.assign(this.book, this.getDefaultBook)
        this.authors = []
      }

      if (newData === 'edit') {
        let { editModalId: bookId } = this.$store.state.books.layout
        let bookData = this.getBookById(bookId)
        Object.assign(this.book, bookData)
        this.authors = this.getAuthorsByBook(bookId)
      }

      this.dialogOpen = !!newData
    }
  },
  methods: {
    ...mapActions({
      add: 'books/add',
      edit: 'books/edit',
      hideEditDialog: 'books/hideEditDialog',
      hideAddDialog: 'books/hideAddDialog'
    }),
    publishDateSave (date) {
      this.$refs.menu.save(date)
    },
    cancel () {
      this.hideAddDialog()
      this.hideEditDialog()
    },
    confirm () {
      let data = {
        book: {...this.book},
        authors: {
          book: this.book.ID,
          authors: [...this.authors.map(author => author.ID)]
        }
      }

      if (this.mode === 'edit') this.edit(data)
      if (this.mode === 'add') this.add(data)
    }
  }
}
</script>

<style scoped>
  .form  {
    padding: 0 24px;
  }

</style>
