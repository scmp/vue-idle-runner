'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _idleQueue = require('./helpers/idleQueue');

var _idleQueue2 = _interopRequireDefault(_idleQueue);

var _onLoadIdleQueue = require('./components/onLoadIdleQueue.js');

var _onLoadIdleQueue2 = _interopRequireDefault(_onLoadIdleQueue);

var _idleQueue3 = require('./components/idleQueue.js');

var _idleQueue4 = _interopRequireDefault(_idleQueue3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  install: function install(Vue) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    Vue.component('onload-idle-queue', (0, _onLoadIdleQueue2.default)(options));
    Vue.component('idle-queue', _idleQueue4.default);

    Vue.prototype.$idleQueue = function (func) {
      (0, _idleQueue2.default)(func);
    };
  }
};