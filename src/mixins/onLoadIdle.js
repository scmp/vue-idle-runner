import get from 'lodash/get'

export default {
  data() {
    return {
      isOnloadIdle: false,
      onLoad: false,
      timeoutID: null,
    }
  },
  props: {
    onLoadTimeout: {
      type: Number,
      default: 0, // No timeout, should wait for onload event.
    },
  },
  mounted() {
    if (get(document, 'readyState') === 'complete') {
      this.onLoad = true
      this.checkIdle()
    } else {
      window.addEventListener('load', this.setOnLoad)
      if (this.onLoadTimeout > 0) {
        this.timeoutID = setTimeout(this.setOnLoad, this.onLoadTimeout)
      }
    }
  },
  methods: {
    checkIdle() {
      this.$idleQueue(() => {
        this.isOnloadIdle = true
      })
    },
    setOnLoad() {
      this.onLoad = true
      this.checkIdle()
      window.removeEventListener('load', this.setOnLoad)
      if (this.timeoutID !== null) {
        clearTimeout(this.timeoutID)
      }
    },
  },
}
