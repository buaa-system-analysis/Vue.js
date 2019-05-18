import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userID: localStorage.getItem('userID'),
    username: localStorage.getItem('username')
  },
  getters: {
    getUserID: (state) => state.userID,
    getUsername: (state) => state.username
  },
  mutations: {
    SET_UserID: (state, data) => {
      state.userID = data
      localStorage.setItem('userID', data)
    },
    SET_Username: (state, data) => {
      state.username = data
      localStorage.setItem('username', data)
    }
  }
})
