import App from './App'
import uview from 'uview-ui'
import httpInterceptor from '@/common/http.interceptor.js'
import httpApi from '@/common/http.api.js'
import user from '@/utils/user.js'
// #ifndef VUE3
import Vue from 'vue'
Vue.use(uview) //引入uview组件
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App
})
Vue.use(httpInterceptor, app)
// Vue.use(user,app)
Vue.use(httpApi,app)
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif