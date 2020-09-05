import '@/assets/scss/_fonts.scss'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

const VueAutosize = require('vue-autosize')
Vue.use(VueAutosize)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
