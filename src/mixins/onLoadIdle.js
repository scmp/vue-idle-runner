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
    timeout: {
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
      if (this.timeout > 0) {
        this.timeoutID = setTimeout(this.setOnLoad, this.timeout)
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
      window.removeEventListener('load', this.setOnLoad)
      if (this.timeoutID !== null) {
        clearTimeout(this.timeoutID)
      }
      this.onLoad = true
    },
  },
  watch: {
    onLoad(onLoad, oldValue) {
      if (onLoad && !oldValue) {
        this.checkIdle()
      }
    },
  },
}
