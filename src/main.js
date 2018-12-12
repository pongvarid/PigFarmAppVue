import '@babel/polyfill'
import Vue from 'vue'
import './plugins/vuetify'
import "@mdi/font/css/materialdesignicons.min.css"
import App from './App.vue'
import router from './router/'
import store from './store/'
import "@/assets/color.css"
import "@/assets/custom.css"
import "@/assets/mbs.css"
import "@/assets/position.css"
import "@/assets/size.css"
import 'animate.css'
Vue.config.productionTip = false

import VueQrcodeReader from 'vue-qrcode-reader'

Vue.use(VueQrcodeReader)
Vue.component('my-component', {
  components: {
    'qrcode-stream': VueQrcodeReader.QrcodeStream,
    'qrcode-drop-zone': VueQrcodeReader.QrcodeDropZone,
    'qrcode-capture': VueQrcodeReader.QrcodeCapture
  }});

new Vue({
  router,
  store,
  
  render: h => h(App)
}).$mount('#app')
