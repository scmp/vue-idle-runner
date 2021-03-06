import idleQueueHelper from './helpers/idleQueue'
import onLoadIdleQueue from './components/onLoadIdleQueue.js'
import idleQueue from './components/idleQueue.js'
import get from 'lodash/get'
import defaults from 'lodash/defaults'

export default {
  install (Vue, options = {}) {
    const defaultOptions = {
      onLoad: false,
      onLoadTimeout: 0,
    }

    Vue.component('onload-idle-queue', onLoadIdleQueue(defaults(options, defaultOptions)))
    Vue.component('idle-queue', idleQueue)

    Vue.prototype.$idleQueue = function (func, options = {}) {
      options = defaults(options, defaultOptions)
      if (get(options, 'onLoad') && typeof window !== 'undefined' && typeof document !== 'undefined') {
        if (get(document, 'readyState') === 'complete') {
          idleQueueHelper(func)
        } else {
          let timeoutID = null
          const setOnLoad = () => {
            if (timeoutID) {
              clearTimeout(timeoutID)
              timeoutID = null
            }
            idleQueueHelper(func)
            window.removeEventListener('load', setOnLoad)
          }
          window.addEventListener('load', setOnLoad)
          if (get(options, 'onLoadTimeout') > 0) {
            timeoutID = setTimeout(setOnLoad, get(options, 'onLoadTimeout'))
          }
        }
      } else {
        idleQueueHelper(func)
      }
    }
  }
}
