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

var _get = require('lodash/get');

var _get2 = _interopRequireDefault(_get);

var _defaults = require('lodash/defaults');

var _defaults2 = _interopRequireDefault(_defaults);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  install: function install(Vue) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var defaultOptions = {
      onLoad: false,
      onLoadTimeout: 0
    };

    Vue.component('onload-idle-queue', (0, _onLoadIdleQueue2.default)((0, _defaults2.default)(options, defaultOptions)));
    Vue.component('idle-queue', _idleQueue4.default);

    Vue.prototype.$idleQueue = function (func) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      options = (0, _defaults2.default)(options, defaultOptions);
      if ((0, _get2.default)(options, 'onLoad') && typeof window !== 'undefined' && typeof document !== 'undefined') {
        if ((0, _get2.default)(document, 'readyState') === 'complete') {
          (0, _idleQueue2.default)(func);
        } else {
          var timeoutID = null;
          var setOnLoad = function setOnLoad() {
            if (timeoutID) {
              clearTimeout(timeoutID);
              timeoutID = null;
            }
            (0, _idleQueue2.default)(func);
            window.removeEventListener('load', setOnLoad);
          };
          window.addEventListener('load', setOnLoad);
          if ((0, _get2.default)(options, 'onLoadTimeout') > 0) {
            timeoutID = setTimeout(setOnLoad, (0, _get2.default)(options, 'onLoadTimeout'));
          }
        }
      } else {
        (0, _idleQueue2.default)(func);
      }
    };
  }
};