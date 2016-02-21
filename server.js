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

 __webpack_require__(3);
 module.exports = __webpack_require__(2);


/***/ },
/* 1 */
/***/ function(module, exports) {

 "use strict";
 
 Object.defineProperty(exports, "__esModule", {
   value: true
 });
 var REDIS_URL = exports.REDIS_URL = process.env.REDIS_URL;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

 'use strict';
 
 Object.defineProperty(exports, "__esModule", {
   value: true
 });
 
 var _express = __webpack_require__(5);
 
 var _express2 = _interopRequireDefault(_express);
 
 var _cors = __webpack_require__(4);
 
 var _cors2 = _interopRequireDefault(_cors);
 
 var _socket = __webpack_require__(8);
 
 var _socket2 = _interopRequireDefault(_socket);
 
 var _config = __webpack_require__(1);
 
 function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
 
 /* eslint no-console: 0, no-throw-literal: 0 */
 
 
 var app = (0, _express2.default)();
 var server = __webpack_require__(6).Server(app); // eslint-disable-line
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
 
 var io = __webpack_require__(7)(server);
 if (_config.REDIS_URL) {
   io.adapter((0, _socket2.default)(_config.REDIS_URL));
 }
 io.on('connection', function (socket) {
   var id = socket.client.id;
 
   function use(route, callback) {
     socket.on(route, function () {
       try {
         callback.apply(undefined, arguments);
       } catch (error) {
         if (typeof error === 'string') {
           socket.emit('error', {
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
   // @TODO validate token
   use('authenticate user', function (_ref) {
     var username = _ref.username;
 
     var user = users[id] = {
       id: id,
       username: username,
       channels: []
     };
     console.log(user);
     socket.emit('authorized', {
       user: user
     });
   });
 
   // join channel
   use('join channel', function (_ref2) {
     var link = _ref2.link;
 
     var user = users[id];
     if (!user) throw 'you should be authorized';
     if (!channels[link]) {
       channels[link] = {
         link: link,
         allUsers: 0
       };
     }
     var channel = channels[link];
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
     if (user.channels.indexOf(link) === 0) throw 'you did not join the channel';
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
 });

/***/ },
/* 3 */
/***/ function(module, exports) {

 module.exports = require("babel-polyfill");

/***/ },
/* 4 */
/***/ function(module, exports) {

 module.exports = require("cors");

/***/ },
/* 5 */
/***/ function(module, exports) {

 module.exports = require("express");

/***/ },
/* 6 */
/***/ function(module, exports) {

 module.exports = require("http");

/***/ },
/* 7 */
/***/ function(module, exports) {

 module.exports = require("socket.io");

/***/ },
/* 8 */
/***/ function(module, exports) {

 module.exports = require("socket.io-redis");

/***/ }
/******/ ]);
//# sourceMappingURL=server.js.map