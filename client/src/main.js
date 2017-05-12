// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
require('semantic-ui-css/semantic.css')
require('semantic-ui-css/semantic.js')
import Vue from 'vue'
import App from './App'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import router from './router'

Vue.component('navbar', Navbar)
Vue.component('footer', Footer)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
