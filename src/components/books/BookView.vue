<template>
  <v-card
    class="card"
    max-width="350"
    :elevation="cardHover ? 6 : 2"
    @mouseover="cardHover = true"
    @mouseout="cardHover = false">
    <v-img
      class="cover"
      :class="{overlay: actionsOpen}"
      height="200px"
      :src="book.coverImage">
      <transition name="fade">
        <div
          class="cover-overlay"
          v-if="actionsOpen">
        </div>
      </transition>
    </v-img>

    <v-card-title class="title">
      {{ book.Title.trim() }}
      <v-speed-dial
        absolute right
        class="actions"
        direction="top"
        v-model="actionsOpen"
        transition="slide-y-reverse-transition">

        <template v-slot:activator>
          <v-btn fab dark v-model="actionsOpen" color="#10D5A5">
            <transition name="fade">
              <v-icon v-if="actionsOpen">mdi-close</v-icon>
              <v-icon v-else>mdi-dots-vertical</v-icon>
            </transition>
          </v-btn>
        </template>

        <v-tooltip left color="rgba(0,0,0,0.9)">
          <template v-slot:activator="{ on }">
            <v-btn
              v-on="on" fab dark small
              color="blue darken-2"
              @click="$event => showEditDialog(book.ID)">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
          </template>
          <span>Edit</span>
        </v-tooltip>

        <v-tooltip left color="rgba(0,0,0,0.9)">
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" @click="$event => showDeleteDialog(book.ID)" fab dark small color="red">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </template>
          <span>Delete</span>
        </v-tooltip>

      </v-speed-dial>
    </v-card-title>
    <v-card-subtitle class="subtitle">
      <span class="year" id="year">
        {{ new Date(book.PublishDate).getFullYear() }}
      </span>
      <span class="pages">
        <v-icon small color="rgba(0,0,0,0.4)">mdi-book-open-page-variant</v-icon>
        {{ book.PageCount }}
      </span>
    </v-card-subtitle>
    <div class="authors">
      <v-chip pill v-for="author in authors" :key="author.ID">
        <v-avatar left>
          <v-img
            contain
            class="avatar"
            :src="author.avatar">
          </v-img>
        </v-avatar>
        {{ author.FirstName + ' ' + author.LastName }}
      </v-chip>
    </div>

    <v-card-text class="text--primary description">
      {{ book.Description }}
    </v-card-text>

  </v-card>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: {
    book: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      cardHover: false,
      actionsOpen: false
    }
  },
  computed: {
    authors () {
      return this.$store.getters['authors/getByBookId'](this.book.ID)
    }
  },
  methods: {
    ...mapActions({
      showDeleteDialog: 'books/showDeleteDialog',
      showEditDialog: 'books/showEditDialog'
    })
  }
}
</script>

<style scoped>
  .cover-overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.3);
  }

  .title {
    position: relative;
    font-weight: 400;
  }

  .title::first-letter {
    text-transform: capitalize;
  }

  .subtitle {
    text-align: left;
    display: flex;
    justify-content: space-between;
  }

  .year {
    font-size: 15px;
    color: rgba(0,0,0,0.6);
  }

  .pages {
    font-size: 14px;
    font-weight: 100;
    color: rgba(0,0,0,0.40);
    display: flex;
    justify-content: center;
  }

  .pages > i {
    margin: -1px 3px 0 0;
  }

  .description {
    overflow-y: scroll;
    height: 200px;
    margin: 10px 0px;
  }

  .description > * {
    flex: 1 1 auto;
  }

  .description {
    box-shadow: inset 0px 0px 10px rgba(0,0,0,0.03);
    border-top: 1px solid rgba(0,0,0,0.05);
  }

  .description::first-letter {
    text-transform: capitalize;
  }

  .actions {
    top: -30px;
  }

  .avatar {
    border: 1px solid rgba(0,0,0,0.1);
  }

  .authors {
    padding: 5px;
  }

  .authors > * {
    margin: 5px;
  }
</style>
