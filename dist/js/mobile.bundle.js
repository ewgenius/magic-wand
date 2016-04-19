webpackJsonp([1],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _pubnub = __webpack_require__(2);

	var _pubnub2 = _interopRequireDefault(_pubnub);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var CubeMesh = function (_Mesh) {
	  _inherits(CubeMesh, _Mesh);

	  function CubeMesh(x, y, z) {
	    _classCallCheck(this, CubeMesh);

	    var geometry = new BoxGeometry(x, y, z);
	    var material = new MeshBasicMaterial({});
	    return _possibleConstructorReturn(this, Object.getPrototypeOf(CubeMesh).call(this, geometry, material));
	  }

	  return CubeMesh;
	}(Mesh);

	var Application = function () {
	  function Application() {
	    _classCallCheck(this, Application);
	  }

	  _createClass(Application, [{
	    key: 'start',
	    value: function start() {
	      var _this2 = this;

	      this.pubnub = new _pubnub2.default({
	        publish_key: 'pub-c-e0b788e5-deaa-44f9-8f6e-a5e97fe3b6cf',
	        subscribe_key: 'sub-c-c825c9b2-0666-11e6-a5b5-0619f8945a4f'
	      });
	      console.log('Subscribing..');
	      this.pubnub.subscribe({
	        channel: 'hello_world',
	        message: function message(_message, envelope, channelOrGroup, time, channel) {
	          return console.log('\n        Message Received.\n        Channel or Group: ' + JSON.stringify(channelOrGroup) + '\n        Channel: ' + JSON.stringify(channel) + '\n        Message: ' + JSON.stringify(_message) + '\n        Time: ' + time + '\n        Raw Envelope: ' + JSON.stringify(envelope) + '\n        ');
	        },
	        connect: function connect() {
	          console.log('Since we\'re publishing on subscribe connectEvent, we\'re sure we\'ll receive the following publish.');
	          _this2.pubnub.publish({
	            channel: 'hello_world',
	            message: 'Hello from PubNub Docs!',
	            callback: function callback(m) {
	              return console.log(m);
	            }
	          });
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

/***/ }
]);