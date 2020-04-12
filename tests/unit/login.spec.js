import { mount } from '@vue/test-utils'
import Login from '@/components/auth/Login.vue'
import Vue from 'vue'
import Vuex from 'vuex'
import Vuetify from 'vuetify'


describe('Login.vue', () => {

  let actions
  let store
  let state

  let wrapper

  beforeEach(() => {
    Vue.use(Vuex);
    Vue.use(Vuetify);

    actions = {
      actionClick: jest.fn(),
      actionInput: jest.fn()
    }
    state = {
      auth: {
        loading: false
      }
    }
    store = new Vuex.Store({
      actions,
      state
    })

    wrapper = mount(Login, { store })
  })

  it('Username and password must be validated (valid)', async () => {
    const userInput = wrapper.find('#username')
    const passwordInput = wrapper.find('#password')

    userInput.trigger('focus')
    await wrapper.vm.$nextTick()

    userInput.element.value = 'wallbox'
    userInput.trigger('input')
    await wrapper.vm.$nextTick()
    
    passwordInput.trigger('focus')
    await wrapper.vm.$nextTick()

    passwordInput.element.value = 'wallboxPassword'
    passwordInput.trigger('input')
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.valid()).toBeTruthy()
  })

  it('Username and password must be validated (invalid)', async () => {
    const userInput = wrapper.find('#username')
    const passwordInput = wrapper.find('#password')

    userInput.trigger('focus')
    await wrapper.vm.$nextTick()

    userInput.element.value = 'wallbox'
    userInput.trigger('input')
    await wrapper.vm.$nextTick()
    
    passwordInput.trigger('focus')
    await wrapper.vm.$nextTick()

    passwordInput.element.value = ''
    passwordInput.trigger('input')
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.valid()).toBeFalsy()
  })
})
