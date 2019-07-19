import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import components from '@/components'
import '@/styles/index.less'

import router from '@/router'
import axios from '@/api/axios.js'
// axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'

Vue.prototype.$http = axios
Vue.use(components)
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
