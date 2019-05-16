import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  }
})
