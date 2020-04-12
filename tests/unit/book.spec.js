import { mount } from '@vue/test-utils'
import BookView from '@/components/books/BookView.vue'
import Vue from 'vue'
import Vuex from 'vuex'
import Vuetify from 'vuetify'

describe('BookView.vue', () => {

  let store
  let state
  let actions
  let getters

  let wrapper

  const bookMock = {
    ID: 1,
    Title: "Cartas a Cristina",
    Description: "En Cartas a Cristina el autor vuelve vivas las sensaciones e impresiones vividas y explícitos los contrastes político-sociales en Brasil. Inaugurando un nuevo género en su obra, que bordea la ficción, Paulo Freire revela que la base de cualquier teoría y la llave del conocimiento se encuentran en la experiencia personal y la capacidad de aprender a partir de impresiones obtenidas del universo vivido.",
    PageCount: 284,
    PublishDate: "1996-01-01",
    coverImage: "https://i.picsum.photos/id/1/400/300.jpg"
  }
  const authorsMock = () => () => [
    { 
      ID: 1,
      IDBook: [1],
      FirstName: "Elijiah",
      LastName: "David",
      avatar: "https://randomuser.me/api/portraits/men/19.jpg"
    }
  ]

  beforeEach(() => {
    Vue.use(Vuex);
    Vue.use(Vuetify);

    actions = {
      actionClick: jest.fn(),
      actionInput: jest.fn()
    }

    getters = {
      'authors/getByBookId': authorsMock
    }

    state = {
    }

    store = new Vuex.Store({
      state,
      getters,
      actions
    })

    wrapper = mount(BookView, {
      store,
      propsData: {
        book: bookMock
      }
    })
  })

  it('Must render all data', async () => {
    expect(wrapper.find('.v-card__title').text()).toBe('Cartas a Cristina')
    expect(wrapper.find('.year').text()).toBe('1996')
    expect(wrapper.find('.pages').text()).toBe('284')
    expect(wrapper.findAll('.authors > .v-chip')).toHaveLength(1);
  })
})
