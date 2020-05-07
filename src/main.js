import 'babel-polyfill' // 对es6的api进行转义 如：promiss
import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick' // 解决移动端300毫秒的延迟
import VueLazyload from "vue-lazyload" // vue 懶加載插件 （之前要npm install)

import 'common/stylus/index.styl'

fastclick.attach(document.body)

Vue.use(VueLazyload,{
  loading: require('common/image/default.png') // 加載前的默認圖片
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router
})
