import Vue from 'vue'
import App from './App.vue'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import router from '@/router/index.js'

import store from '@/store.js'

Vue.use(Buefy)

Vue.config.productionTip = false
Vue.prototype.$store = store
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
