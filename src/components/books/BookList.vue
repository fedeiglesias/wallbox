<template>
  <div class="sheet">
    <div>
      <h1 text-align="center">Login</h1>
      
      <div
        v-if="!this.$store.state.books.loading && !this.$store.state.authors.loading">
          <div class="list" v-if="actualPage">
            <book-view
              v-for="book in books"
              :key="book.ID"
              :book="book">
            </book-view>
          </div>
      </div>

      <book-delete></book-delete>
      <book-add-edit></book-add-edit>

      <div class="progress" v-if="existMoreItemsToShow()">
        <v-progress-circular
          :size="70"
          :width="7"
          color="#43ba9b"
          indeterminate>
        </v-progress-circular>
      </div>
    </div>
  </div>
</template>

<script>
import BookView from './BookView'
import BookDelete from './BookDelete'
import BookAddEdit from './BookAddEdit'
import { mapActions, mapGetters } from 'vuex'

export default {
  components: {
    BookView,
    BookDelete,
    BookAddEdit
  },
  data () {
    return {
      loading: true
    }
  },
  computed: {
    books () {
      return this.$store.getters['books/getAll']
    },
    totalPages () {
      return this.$store.getters['books/totalPages']
    },
    actualPage: {
      get () { return this.$store.state.books.pagination.page },
      set (page) { this.$store.dispatch('books/setPage', page) }
    }
  },
  methods: {
    ...mapActions({
      nextPage: 'books/setPage'
    }),
    ...mapGetters({
      existMoreItemsToShow: 'books/existMoreItemsToShow'
    }),
    handleScroll () {
      let d = document.documentElement
      let offset = Math.ceil(d.scrollTop) + window.innerHeight
      let height = d.offsetHeight

      if (offset === height && this.existMoreItemsToShow()) {
        this.nextPage()
      }
    }
  },
  beforeCreate () {
    this.$store.dispatch('authors/getList')
    this.$store.dispatch('books/getList')
  },
  created () {
    window.addEventListener('scroll', this.handleScroll)
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll)
  }
}
</script>

<style scoped lang="scss">
  @import "@/sass/_sheet.scss";
  
  .list {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }
  .list > * {
    margin: 10px;
  }

  .progress {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 150px;
    width: 100%;
  }

</style>
