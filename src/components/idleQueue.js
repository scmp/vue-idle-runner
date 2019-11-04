import idle from '../mixins/idle'

export default {
  name: 'idle-queue',
  mixins: [idle],
  props: {
    forceRender: {
      type: Boolean,
      default: false,
    },
  },
  render (h) {
    if (this.forceRender || this.isIdle) {
      return h('div', null, this.$slots.default)
    }
    return h
  },
}
