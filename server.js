require('source-map-support').install();
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

 __webpack_require__(4);
 module.exports = __webpack_require__(3);


/***/ },
/* 1 */
/***/ function(module, exports) {

 "use strict";
 
 Object.defineProperty(exports, "__esModule", {
   value: true
 });
 var _process$env = process.env;
 var REDIS_HOST = _process$env.REDIS_HOST;
 var REDIS_PORT = _process$env.REDIS_PORT;
 var REDIS_AUTH_KEY = _process$env.REDIS_AUTH_KEY;
 exports.REDIS_HOST = REDIS_HOST;
 exports.REDIS_PORT = REDIS_PORT;
 exports.REDIS_AUTH_KEY = REDIS_AUTH_KEY;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

 'use strict';
 
 Object.defineProperty(exports, "__esModule", {
   value: true
 });
 exports.subClient = exports.pubClient = exports.canRedis = undefined;
 exports.getRedisItem = getRedisItem;
 
 var _config = __webpack_require__(1);
 
 var _redis = __webpack_require__(8);
 
 var canRedis = exports.canRedis = _config.REDIS_HOST;
 
 var pubClient = exports.pubClient = canRedis ? (0, _redis.createClient)({
   host: _config.REDIS_HOST,
   port: _config.REDIS_PORT,
   auth_pass: _config.REDIS_AUTH_KEY
 }) : null;
 
 var subClient = exports.subClient = canRedis ? (0, _redis.createClient)({
   host: _config.REDIS_HOST,
   port: _config.REDIS_PORT,
   auth_pass: _config.REDIS_AUTH_KEY,
   return_buffers: true
 }) : null;
 
 var redisClient = canRedis ? (0, _redis.createClient)({
   host: _config.REDIS_HOST,
   port: _config.REDIS_PORT,
   auth_pass: _config.REDIS_AUTH_KEY
 }) : null;
 
 function getRedisItem(id) {
   return new Promise(function (resolve, reject) {
     redisClient.get(id, function (error, res) {
       return error ? reject(error) : resolve(res);
     });
   });
 }

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

 'use strict';
 
 Object.defineProperty(exports, "__esModule", {
   value: true
 });
 
 var _express = __webpack_require__(6);
 
 var _express2 = _interopRequireDefault(_express);
 
 var _cors = __webpack_require__(5);
 
 var _cors2 = _interopRequireDefault(_cors);
 
 var _socket = __webpack_require__(10);
 
 var _socket2 = _interopRequireDefault(_socket);
 
 var _redisClient = __webpack_require__(2);
 
 function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
 
 function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; } /* eslint no-console: 0, no-throw-literal: 0 */
 
 
 var app = (0, _express2.default)();
 var server = __webpack_require__(7).Server(app); // eslint-disable-line
 server.listen(process.env.PORT || (8222), function () {
   var _server$address = server.address();
 
   var port = _server$address.port;
 
   console.log('The server is listening at http://localhost:' + port);
   if (false) {
     console.log('__DEV_START__');
   }
 });
 
 app.use((0, _cors2.default)());
 app.get('*', function (req, res) {
   res.status(200).send('Hello World');
 });
 
 exports.default = server;
 
 // it can be replaced DB
 
 var channels = {};
 var users = {};
 
 var io = __webpack_require__(9)(server);
 
 if (_redisClient.canRedis) {
   io.adapter((0, _socket2.default)({
     pubClient: _redisClient.pubClient,
     subClient: _redisClient.subClient
   }));
 }
 
 io.on('connection', function (socket) {
   var id = socket.client.id;
 
   function use(route, callback) {
     socket.on(route, function () {
       try {
         callback.apply(undefined, arguments);
       } catch (error) {
         if (typeof error === 'string') {
           socket.emit(route + ' error', {
             type: route,
             message: error
           });
         } else {
           console.log(error);
         }
       }
     });
   }
 
   // authorize user
   use('authenticate user', function () {
     var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(_ref) {
       var token = _ref.token;
       var username = _ref.username;
       var userInfo, user;
       return regeneratorRuntime.wrap(function _callee$(_context) {
         while (1) {
           switch (_context.prev = _context.next) {
             case 0:
               if (!_redisClient.canRedis) {
                 _context.next = 6;
                 break;
               }
 
               _context.next = 3;
               return (0, _redisClient.getRedisItem)(token);
 
             case 3:
               userInfo = _context.sent;
 
               if (userInfo) {
                 _context.next = 6;
                 break;
               }
 
               throw 'Invalid token';
 
             case 6:
               user = users[id] = {
                 id: id,
                 username: username,
                 channels: []
               };
 
               socket.emit('authorized', {
                 user: user
               });
 
             case 8:
             case 'end':
               return _context.stop();
           }
         }
       }, _callee, undefined);
     })),
         _this = undefined;
 
     return function (_x) {
       return ref.apply(_this, arguments);
     };
   }());
 
   // join channel
   use('join channel', function (_ref2) {
     var link = _ref2.link;
 
     var user = users[id];
     if (!user) throw 'you should be authorized';
     if (user.channels.indexOf(link) !== -1) throw 'already connected';
     if (!channels[link]) {
       channels[link] = {
         link: link,
         allUsers: 0
       };
     }
     var channel = channels[link];
     user.channels.push(link);
     channel.allUsers++;
     socket.join(link);
     socket.broadcast.to(link).emit('user joined', {
       channel: channel,
       user: user
     });
     socket.emit('channel connected', {
       channel: channel
     });
   });
 
   // leave channel
   use('leave channel', function (_ref3) {
     var link = _ref3.link;
 
     var user = users[id];
     if (!user) throw 'you should be authorized';
     if (user.channels.indexOf(link) === -1) throw 'not in connected';
     var channel = channels[link];
     if (!channel) throw 'the channel does not exist';
     user.channels.splice(user.channels.indexOf(link), 1);
     socket.emit('channel disconnected', { channel: channel });
     socket.broadcast.to(link).emit('user left', { channel: channel, user: user });
     socket.leave(link);
     channel.allUsers -= 1;
     if (!channel.allUsers) {
       delete channels[link];
     }
   });
 
   // send new message to users in the channel
   use('new message', function (_ref4) {
     var link = _ref4.link;
     var content = _ref4.content;
 
     var user = users[id];
     if (!user) throw 'you should be authorized';
     var channel = channels[link];
     if (!channel) throw 'the channel does not exist';
     if (user.channels.indexOf(link) === -1) throw 'you did not join the channel';
     var message = {
       author: id,
       username: user.username,
       content: content
     };
     io.sockets.to(link).emit('new message', {
       message: message,
       channel: channel
     });
   });
 
   // disconnected
   socket.on('disconnect', function () {
     var user = users[id];
     if (!user) {
       return;
     }
     user.channels.forEach(function (link) {
       var channel = channels[link];
       socket.broadcast.to(link).emit('user left', { channel: channel, user: user });
       channel.allUsers -= 1;
       if (!channel.allUsers) {
         delete channels[link];
       }
     });
   });
 });

/***/ },
/* 4 */
/***/ function(module, exports) {

 module.exports = require("babel-polyfill");

/***/ },
/* 5 */
/***/ function(module, exports) {

 module.exports = require("cors");

/***/ },
/* 6 */
/***/ function(module, exports) {

 module.exports = require("express");

/***/ },
/* 7 */
/***/ function(module, exports) {

 module.exports = require("http");

/***/ },
/* 8 */
/***/ function(module, exports) {

 module.exports = require("redis");

/***/ },
/* 9 */
/***/ function(module, exports) {

 module.exports = require("socket.io");

/***/ },
/* 10 */
/***/ function(module, exports) {

 module.exports = require("socket.io-redis");

/***/ }
/******/ ]);
//# sourceMappingURL=server.js.map