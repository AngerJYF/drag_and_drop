import Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex);

import TransferData from './module/TransferData.js'
export default new vuex.Store({
  modules: {
    TransferData
  }
})