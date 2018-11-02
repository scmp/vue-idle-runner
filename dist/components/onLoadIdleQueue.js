'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _onLoadIdle = require('../mixins/onLoadIdle');

var _onLoadIdle2 = _interopRequireDefault(_onLoadIdle);

var _get = require('lodash/get');

var _get2 = _interopRequireDefault(_get);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (options) {
  return {
    name: 'onload-idle-queue',
    mixins: [_onLoadIdle2.default],
    props: {
      onLoadTimeout: {
        type: Number,
        default: (0, _get2.default)(options, 'onLoadTimeout', 0) // No timeout, should wait for onload event.
      }
    },
    render: function render(h) {
      if (this.isOnloadIdle) {
        return h('div', null, this.$slots.default);
      }
      return h;
    }
  };
};