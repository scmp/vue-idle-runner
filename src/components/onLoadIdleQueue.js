import onLoadIdle from '../mixins/onLoadIdle'
import get from 'lodash/get'

export default (options) => {
  return {
    name: 'onload-idle-queue',
    mixins: [onLoadIdle],
    props: {
      onLoadTimeout: {
        type: Number,
        default: get(options, 'onLoadTimeout', 0), // No timeout, should wait for onload event.
      },
    },
    render(h) {
      if (this.isOnloadIdle) {
        return h('div', null, this.$slots.default)
      }
      return h
    },
  }
}
