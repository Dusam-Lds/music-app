import 'babel-polyfill' // 对es6的api进行转义 如：promiss
import Vue from 'vue'
import App from './App'
// import router from './router'
import fastclick from 'fastclick' // 解决移动端300毫秒的延迟

import 'common/stylus/index.styl'

fastclick.attach(document.body)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App)
})
