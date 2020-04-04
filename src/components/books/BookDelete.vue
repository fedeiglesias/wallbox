<template>
  <v-dialog
    v-model="dialog"
    v-if="dialog"
    persistent
    max-width="500">
    <v-card>
      <v-card-title class="headline">Do you want to delete the book?</v-card-title>
      <v-card-text><b>{{ book.Title }}</b> </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" text @click="dialog = false">Cancel</v-btn>
        <v-btn color="green darken-1" text @click="confirmDelete">Confirm</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      getById: 'books/getById'
    }),
    book () {
      return this.getById(this.$store.state.books.layout.deleteModalId)
    },
    dialog: {
      get () { return !!this.$store.state.books.layout.deleteModalId },
      set () { this.$store.dispatch('books/hideDeleteDialog') }
    }
  },
  methods: {
    ...mapActions({
      confirmDelete: 'books/delete'
    })
  }
}
</script>

<style scoped>

</style>
