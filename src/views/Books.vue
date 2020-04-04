<template>
  <v-container class="view">
    <BookList />
  </v-container>
</template>

<script>
import BookList from '@/components/books/BookList'

export default {
  name: 'BooksView',
  components: {
    BookList
  }
}
</script>

<style scoped lang="scss">
  @import "@/sass/_view.scss";
</style>