import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'

Vue.config.productionTip = false

const options = {
  position: 'top-right',
  timeout: 5000,
}

Vue.use(Toast, options)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
