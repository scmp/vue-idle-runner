'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _idle = require('../mixins/idle');

var _idle2 = _interopRequireDefault(_idle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'idle-queue',
  mixins: [_idle2.default],
  props: {
    forceRender: {
      type: Boolean,
      default: false
    }
  },
  render: function render(h) {
    if (this.forceRender || this.isIdle) {
      return h('div', null, this.$slots.default);
    }
    return h;
  }
};