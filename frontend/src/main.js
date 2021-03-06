// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/index'
import store from './router/store'
import ElementUI from 'element-ui'
import SuiVue from 'semantic-ui-vue'
import 'semantic-ui-css/semantic.min.css'
import 'element-ui/lib/theme-chalk/index.css'
import VueResource from 'vue-resource'
import axios from 'axios'
import Vuex from 'vuex'

Vue.use(Vuex)
Vue.use(SuiVue)
Vue.use(ElementUI)
Vue.use(VueResource)
Vue.config.productionTip = false
Vue.prototype.$axios = axios
axios.defaults.baseURL = '/flask'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store
})
