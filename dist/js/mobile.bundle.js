webpackJsonp([1],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _pubsub = __webpack_require__(3);

	var _pubsub2 = _interopRequireDefault(_pubsub);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Application = function () {
	  function Application() {
	    _classCallCheck(this, Application);
	  }

	  _createClass(Application, [{
	    key: 'start',
	    value: function start() {
	      var _this = this;

	      this.channel = location.search.split('n=')[1];
	      this.connected = false;
	      this.pubsub = new _pubsub2.default();
	      this.pubsub.publish(this.channel, {
	        type: 'connected'
	      }).then();

	      if (window.DeviceOrientationEvent) window.addEventListener('deviceorientation', function (e) {
	        return _this.tilt(e.alpha, e.beta, e.gamma);
	      }, false);
	    }
	  }, {
	    key: 'tilt',
	    value: function tilt(alpha, beta, gamma) {
	      if (this.pubsub) this.pubsub.publish(this.channel, {
	        type: 'update',
	        orientation: {
	          alpha: alpha,
	          beta: beta,
	          gamma: gamma
	        }
	      });
	    }
	  }], [{
	    key: 'main',
	    value: function main() {
	      var app = new Application();
	      app.start();
	    }
	  }]);

	  return Application;
	}();

	Application.main();

/***/ },
/* 1 */,
/* 2 */,
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _pubnub = __webpack_require__(2);

	var _pubnub2 = _interopRequireDefault(_pubnub);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Pubsub = function () {
	  function Pubsub() {
	    _classCallCheck(this, Pubsub);

	    this.pubnub = new _pubnub2.default({
	      publish_key: 'pub-c-e0b788e5-deaa-44f9-8f6e-a5e97fe3b6cf',
	      subscribe_key: 'sub-c-c825c9b2-0666-11e6-a5b5-0619f8945a4f',
	      ssl: 'https:' == document.location.protocol ? true : false
	    });
	  }

	  _createClass(Pubsub, [{
	    key: 'subscribe',
	    value: function subscribe(channelName, cb) {
	      var _this = this;

	      return new Promise(function (resolve) {
	        _this.pubnub.subscribe({
	          channel: channelName,
	          message: function message(_message) {
	            return cb ? cb(_message) : null;
	          },
	          connect: function connect() {
	            return resolve();
	          }
	        });
	      });
	    }
	  }, {
	    key: 'publish',
	    value: function publish(channel, message) {
	      var _this2 = this;

	      return new Promise(function (resolve) {
	        _this2.pubnub.publish({
	          channel: channel,
	          message: message,
	          callback: function callback(m) {
	            return resolve(m);
	          }
	        });
	      });
	    }
	  }]);

	  return Pubsub;
	}();

	exports.default = Pubsub;

/***/ }
]);