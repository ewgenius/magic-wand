webpackJsonp([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _three = __webpack_require__(1);

	var _pubsub = __webpack_require__(3);

	var _pubsub2 = _interopRequireDefault(_pubsub);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Scene = _three.THREE.Scene;
	var PerspectiveCamera = _three.THREE.PerspectiveCamera;
	var Mesh = _three.THREE.Mesh;
	var WebGLRenderer = _three.THREE.WebGLRenderer;
	var MeshBasicMaterial = _three.THREE.MeshBasicMaterial;
	var BoxGeometry = _three.THREE.BoxGeometry;
	var Vector3 = _three.THREE.Vector3;

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

	      var channel = '123'; // String(Date.now())

	      this.pubsub = new _pubsub2.default();
	      this.pubsub.subscribe(channel, function (message) {
	        return _this2.onUpdate(message);
	      }).then(function () {
	        return console.log('connect to ' + channel);
	      });

	      this.camera = new PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
	      this.camera.position.x = 400;
	      this.camera.position.z = 400;
	      this.camera.position.y = 400;
	      this.camera.lookAt(new Vector3(-1, -1, -1));

	      this.scene = new Scene();

	      this.cube = new CubeMesh(200, 200, 200);
	      this.cube.rotation.order = 'ZXY';
	      this.scene.add(this.cube);

	      this.renderer = new WebGLRenderer();
	      this.renderer.setPixelRatio(window.devicePixelRatio);
	      this.renderer.setSize(window.innerWidth, window.innerHeight);
	      document.body.appendChild(this.renderer.domElement);
	      window.addEventListener('resize', function () {
	        return _this2.onWindowResize();
	      });
	      this.loop();
	    }
	  }, {
	    key: 'onWindowResize',
	    value: function onWindowResize() {
	      this.camera.aspect = window.innerWidth / window.innerHeight;
	      this.camera.updateProjectionMatrix();
	      this.renderer.setSize(window.innerWidth, window.innerHeight);
	    }
	  }, {
	    key: 'onUpdate',
	    value: function onUpdate(message) {
	      if (message.orientation) {
	        var _message$orientation = message.orientation;
	        var alpha = _message$orientation.alpha;
	        var beta = _message$orientation.beta;
	        var gamma = _message$orientation.gamma;

	        this.cube.rotation.x = beta * Math.PI / 180;
	        this.cube.rotation.y = gamma * Math.PI / 180;
	        this.cube.rotation.z = alpha * Math.PI / 180;
	      } else {
	        console.log(message);
	      }
	    }
	  }, {
	    key: 'loop',
	    value: function loop() {
	      var _this3 = this;

	      requestAnimationFrame(function () {
	        return _this3.loop();
	      });
	      this.renderer.render(this.scene, this.camera);
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