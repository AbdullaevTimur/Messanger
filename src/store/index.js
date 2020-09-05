import Vue from 'vue'
import Vuex from 'vuex'

import dialogs from '@/assets/json/data.json'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      login: 'vasiliy',
      name: 'Василий'
    },
    dialogs
  },
  getters: {
    getMessages: state => (id) => {
      const dialog = state.dialogs.find(x => x.id === id)
      return dialog ? dialog.parts : []
    }
  },
  mutations: {
    updateItems (state, { message, id }) {
      const index = state.dialogs.findIndex(x => x.id === id)
      if (index > -1) {
        state.dialogs[index].parts.push(message)
      }
    }
  },
  actions: {
    send: async ({ commit }, { message, id }) => {
      commit('updateItems', { message, id }) // Отправляю запрос на выполнение мутатации
    }
  }
})
