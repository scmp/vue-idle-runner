'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _get = require('lodash/get');

var _get2 = _interopRequireDefault(_get);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  data: function data() {
    return {
      isOnloadIdle: false,
      onLoad: false,
      timeoutID: null
    };
  },

  props: {
    timeout: {
      type: Number,
      default: 0 // No timeout, should wait for onload event.
    }
  },
  mounted: function mounted() {
    if ((0, _get2.default)(document, 'readyState') === 'complete') {
      this.onLoad = true;
      this.checkIdle();
    } else {
      window.addEventListener('load', this.setOnLoad);
      if (this.timeout > 0) {
        this.timeoutID = setTimeout(this.setOnLoad, this.timeout);
      }
    }
  },

  methods: {
    checkIdle: function checkIdle() {
      var _this = this;

      this.$idleQueue(function () {
        _this.isOnloadIdle = true;
      });
    },
    setOnLoad: function setOnLoad() {
      window.removeEventListener('load', this.setOnLoad);
      if (this.timeoutID !== null) {
        clearTimeout(this.timeoutID);
      }
      this.onLoad = true;
    }
  },
  watch: {
    onLoad: function onLoad(_onLoad, oldValue) {
      if (_onLoad && !oldValue) {
        this.checkIdle();
      }
    }
  }
};