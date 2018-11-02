import idleQueueHelper from './helpers/idleQueue'
import onLoadIdleQueue from './components/onLoadIdleQueue.js'
import idleQueue from './components/idleQueue.js'

export default {
  install (Vue, options = {}) {
    Vue.component('onload-idle-queue', onLoadIdleQueue(options))
    Vue.component('idle-queue', idleQueue)

    Vue.prototype.$idleQueue = function (func) {
      idleQueueHelper(func)
    }
  }
}
