import { mount } from '@vue/test-utils'
import Register from '@/components/auth/Register.vue'
import Vue from 'vue'
import Vuex from 'vuex'
import Vuetify from 'vuetify'

describe('Register.vue', () => {

  let actions
  let store
  let state

  let wrapper
  let form
  let emailInput
  let firstNameInput
  let lastNameInput
  let passwordInput
  let passwordReenterInput

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

    wrapper = mount(Register, { store })

    form = wrapper.find('#form')
    emailInput = wrapper.find('#email')
    firstNameInput = wrapper.find('#fName')
    lastNameInput = wrapper.find('#lName')
    passwordInput = wrapper.find('#password')
    passwordReenterInput = wrapper.find('#passwordReenter')
  })

  it('Register form must be valid', async () => {

    emailInput.trigger('focus')
    await wrapper.vm.$nextTick()
    emailInput.element.value = 'info@wallbox.com'
    emailInput.trigger('input')
    await wrapper.vm.$nextTick()

    firstNameInput.trigger('focus')
    await wrapper.vm.$nextTick()
    firstNameInput.element.value = 'Wallbox Firstname'
    firstNameInput.trigger('input')
    await wrapper.vm.$nextTick()

    lastNameInput.trigger('focus')
    await wrapper.vm.$nextTick()
    lastNameInput.element.value = 'Wallbox Lastname'
    lastNameInput.trigger('input')
    await wrapper.vm.$nextTick()

    passwordInput.trigger('focus')
    await wrapper.vm.$nextTick()
    passwordInput.element.value = 'wallboxPassword'
    passwordInput.trigger('input')
    await wrapper.vm.$nextTick()

    passwordReenterInput.trigger('focus')
    await wrapper.vm.$nextTick()
    passwordReenterInput.element.value = 'wallboxPassword'
    passwordReenterInput.trigger('input')
    await wrapper.vm.$nextTick()

    form.trigger('input')
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.valid).toBeTruthy()

  })

  it('Password match validation (invalid)', async () => {

    emailInput.trigger('focus')
    await wrapper.vm.$nextTick()
    emailInput.element.value = 'info@wallbox.com'
    emailInput.trigger('input')
    await wrapper.vm.$nextTick()

    firstNameInput.trigger('focus')
    await wrapper.vm.$nextTick()
    firstNameInput.element.value = 'Wallbox Firstname'
    firstNameInput.trigger('input')
    await wrapper.vm.$nextTick()

    lastNameInput.trigger('focus')
    await wrapper.vm.$nextTick()
    lastNameInput.element.value = 'Wallbox Lastname'
    lastNameInput.trigger('input')
    await wrapper.vm.$nextTick()

    passwordInput.trigger('focus')
    await wrapper.vm.$nextTick()
    passwordInput.element.value = 'wallboxPassword'
    passwordInput.trigger('input')
    await wrapper.vm.$nextTick()

    passwordReenterInput.trigger('focus')
    await wrapper.vm.$nextTick()
    passwordReenterInput.element.value = 'wallboxPasswordInvalid'
    passwordReenterInput.trigger('input')
    await wrapper.vm.$nextTick()

    form.trigger('input')
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.valid).toBeFalsy()
  })
})
