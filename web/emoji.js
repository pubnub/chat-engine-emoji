(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports={
  "_args": [
    [
      {
        "raw": ".",
        "scope": null,
        "escapedName": null,
        "name": null,
        "rawSpec": ".",
        "spec": "/Users/ian/Development/ocf-plugin",
        "type": "directory"
      },
      ""
    ]
  ],
  "_from": "../../../../Development/ocf-plugin",
  "_id": "ocf-plugin@0.0.1",
  "_inCache": true,
  "_installable": true,
  "_location": "/ocf-plugin",
  "_phantomChildren": {},
  "_requested": {
    "raw": ".",
    "scope": null,
    "escapedName": null,
    "name": null,
    "rawSpec": ".",
    "spec": "/Users/ian/Development/ocf-plugin",
    "type": "directory"
  },
  "_requiredBy": [
    "#USER"
  ],
  "_resolved": "file:../../../../Development/ocf-plugin",
  "_shasum": "d759b5f26ebaebae29af0736b7e2ea9ce37f24c0",
  "_shrinkwrap": null,
  "_spec": ".",
  "_where": "",
  "bin": {
    "ocf-plugin": "./gulpfile.js"
  },
  "dependencies": {
    "browserify": "^14.3.0",
    "chalk": "^1.1.3",
    "commander": "^2.9.0",
    "gulp": "^3.9.1",
    "vinyl-source-stream": "^1.1.0"
  },
  "description": "",
  "devDependencies": {
    "chai": "^3.5.0",
    "mocha": "^3.3.0"
  },
  "gitHead": "a55841f4bece806b57990f16156cd14ed23bfe47",
  "main": "./plugin.js",
  "name": "ocf-plugin",
  "open-chat-framework": {
    "namespace": "append"
  },
  "optionalDependencies": {},
  "readme": "# ocf-plugin\n",
  "readmeFilename": "README.md",
  "version": "0.0.1"
}

},{}],2:[function(require,module,exports){
module.exports = (config) => {

    // create empty config object if not supplied
    config = config || {};

    // define defaults if config is empty
    config.send = config.send || " pub_append";
    config.subscribe = config.subscribe || " sub_append";

    // define middleware to run right before a message leaves the client
    // all OCF functions have run by now
    let send = {
        message: function(payload, next) {

            // append config.send to the text supplied in the event
            payload.data.text += config.send;

            // continue along middleware
            next(null, payload);

        }
    };

    // define middleware to run after a message has been received and OCF has processed it
    let broadcast = {
        message: function(payload, next) {
        
            // append config.broadcast text to the payload
            payload.data.text += config.broadcast;

            // continue along middleware
            next(null, payload);

        }
    };

    // middleware tells the framework to use these functions when 
    // messages are sent or received
    return {
        middleware: {
            send: send, 
            broadcast: broadcast
        }
    }
}

},{}],3:[function(require,module,exports){
(function() {

    const namespace = require('./package.json')['open-chat-framework']['namespace'];
    window.OpenChatFramework.plugin[namespace] = require('./plugin.js');

})();

},{"./package.json":1,"./plugin.js":2}]},{},[3])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy5udm0vdmVyc2lvbnMvbm9kZS92Ni43LjAvbGliL25vZGVfbW9kdWxlcy9vY2YtcGx1Z2luL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi8uLi8ubnZtL3ZlcnNpb25zL25vZGUvdjYuNy4wL2xpYi9ub2RlX21vZHVsZXMvb2NmLXBsdWdpbi9wYWNrYWdlLmpzb24iLCIuLi8uLi8ubnZtL3ZlcnNpb25zL25vZGUvdjYuNy4wL2xpYi9ub2RlX21vZHVsZXMvb2NmLXBsdWdpbi9wbHVnaW4uanMiLCIuLi8uLi8ubnZtL3ZlcnNpb25zL25vZGUvdjYuNy4wL2xpYi9ub2RlX21vZHVsZXMvb2NmLXBsdWdpbi93cmFwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIm1vZHVsZS5leHBvcnRzPXtcbiAgXCJfYXJnc1wiOiBbXG4gICAgW1xuICAgICAge1xuICAgICAgICBcInJhd1wiOiBcIi5cIixcbiAgICAgICAgXCJzY29wZVwiOiBudWxsLFxuICAgICAgICBcImVzY2FwZWROYW1lXCI6IG51bGwsXG4gICAgICAgIFwibmFtZVwiOiBudWxsLFxuICAgICAgICBcInJhd1NwZWNcIjogXCIuXCIsXG4gICAgICAgIFwic3BlY1wiOiBcIi9Vc2Vycy9pYW4vRGV2ZWxvcG1lbnQvb2NmLXBsdWdpblwiLFxuICAgICAgICBcInR5cGVcIjogXCJkaXJlY3RvcnlcIlxuICAgICAgfSxcbiAgICAgIFwiXCJcbiAgICBdXG4gIF0sXG4gIFwiX2Zyb21cIjogXCIuLi8uLi8uLi8uLi9EZXZlbG9wbWVudC9vY2YtcGx1Z2luXCIsXG4gIFwiX2lkXCI6IFwib2NmLXBsdWdpbkAwLjAuMVwiLFxuICBcIl9pbkNhY2hlXCI6IHRydWUsXG4gIFwiX2luc3RhbGxhYmxlXCI6IHRydWUsXG4gIFwiX2xvY2F0aW9uXCI6IFwiL29jZi1wbHVnaW5cIixcbiAgXCJfcGhhbnRvbUNoaWxkcmVuXCI6IHt9LFxuICBcIl9yZXF1ZXN0ZWRcIjoge1xuICAgIFwicmF3XCI6IFwiLlwiLFxuICAgIFwic2NvcGVcIjogbnVsbCxcbiAgICBcImVzY2FwZWROYW1lXCI6IG51bGwsXG4gICAgXCJuYW1lXCI6IG51bGwsXG4gICAgXCJyYXdTcGVjXCI6IFwiLlwiLFxuICAgIFwic3BlY1wiOiBcIi9Vc2Vycy9pYW4vRGV2ZWxvcG1lbnQvb2NmLXBsdWdpblwiLFxuICAgIFwidHlwZVwiOiBcImRpcmVjdG9yeVwiXG4gIH0sXG4gIFwiX3JlcXVpcmVkQnlcIjogW1xuICAgIFwiI1VTRVJcIlxuICBdLFxuICBcIl9yZXNvbHZlZFwiOiBcImZpbGU6Li4vLi4vLi4vLi4vRGV2ZWxvcG1lbnQvb2NmLXBsdWdpblwiLFxuICBcIl9zaGFzdW1cIjogXCJkNzU5YjVmMjZlYmFlYmFlMjlhZjA3MzZiN2UyZWE5Y2UzN2YyNGMwXCIsXG4gIFwiX3Nocmlua3dyYXBcIjogbnVsbCxcbiAgXCJfc3BlY1wiOiBcIi5cIixcbiAgXCJfd2hlcmVcIjogXCJcIixcbiAgXCJiaW5cIjoge1xuICAgIFwib2NmLXBsdWdpblwiOiBcIi4vZ3VscGZpbGUuanNcIlxuICB9LFxuICBcImRlcGVuZGVuY2llc1wiOiB7XG4gICAgXCJicm93c2VyaWZ5XCI6IFwiXjE0LjMuMFwiLFxuICAgIFwiY2hhbGtcIjogXCJeMS4xLjNcIixcbiAgICBcImNvbW1hbmRlclwiOiBcIl4yLjkuMFwiLFxuICAgIFwiZ3VscFwiOiBcIl4zLjkuMVwiLFxuICAgIFwidmlueWwtc291cmNlLXN0cmVhbVwiOiBcIl4xLjEuMFwiXG4gIH0sXG4gIFwiZGVzY3JpcHRpb25cIjogXCJcIixcbiAgXCJkZXZEZXBlbmRlbmNpZXNcIjoge1xuICAgIFwiY2hhaVwiOiBcIl4zLjUuMFwiLFxuICAgIFwibW9jaGFcIjogXCJeMy4zLjBcIlxuICB9LFxuICBcImdpdEhlYWRcIjogXCJhNTU4NDFmNGJlY2U4MDZiNTc5OTBmMTYxNTZjZDE0ZWQyM2JmZTQ3XCIsXG4gIFwibWFpblwiOiBcIi4vcGx1Z2luLmpzXCIsXG4gIFwibmFtZVwiOiBcIm9jZi1wbHVnaW5cIixcbiAgXCJvcGVuLWNoYXQtZnJhbWV3b3JrXCI6IHtcbiAgICBcIm5hbWVzcGFjZVwiOiBcImFwcGVuZFwiXG4gIH0sXG4gIFwib3B0aW9uYWxEZXBlbmRlbmNpZXNcIjoge30sXG4gIFwicmVhZG1lXCI6IFwiIyBvY2YtcGx1Z2luXFxuXCIsXG4gIFwicmVhZG1lRmlsZW5hbWVcIjogXCJSRUFETUUubWRcIixcbiAgXCJ2ZXJzaW9uXCI6IFwiMC4wLjFcIlxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSAoY29uZmlnKSA9PiB7XG5cbiAgICAvLyBjcmVhdGUgZW1wdHkgY29uZmlnIG9iamVjdCBpZiBub3Qgc3VwcGxpZWRcbiAgICBjb25maWcgPSBjb25maWcgfHwge307XG5cbiAgICAvLyBkZWZpbmUgZGVmYXVsdHMgaWYgY29uZmlnIGlzIGVtcHR5XG4gICAgY29uZmlnLnNlbmQgPSBjb25maWcuc2VuZCB8fCBcIiBwdWJfYXBwZW5kXCI7XG4gICAgY29uZmlnLnN1YnNjcmliZSA9IGNvbmZpZy5zdWJzY3JpYmUgfHwgXCIgc3ViX2FwcGVuZFwiO1xuXG4gICAgLy8gZGVmaW5lIG1pZGRsZXdhcmUgdG8gcnVuIHJpZ2h0IGJlZm9yZSBhIG1lc3NhZ2UgbGVhdmVzIHRoZSBjbGllbnRcbiAgICAvLyBhbGwgT0NGIGZ1bmN0aW9ucyBoYXZlIHJ1biBieSBub3dcbiAgICBsZXQgc2VuZCA9IHtcbiAgICAgICAgbWVzc2FnZTogZnVuY3Rpb24ocGF5bG9hZCwgbmV4dCkge1xuXG4gICAgICAgICAgICAvLyBhcHBlbmQgY29uZmlnLnNlbmQgdG8gdGhlIHRleHQgc3VwcGxpZWQgaW4gdGhlIGV2ZW50XG4gICAgICAgICAgICBwYXlsb2FkLmRhdGEudGV4dCArPSBjb25maWcuc2VuZDtcblxuICAgICAgICAgICAgLy8gY29udGludWUgYWxvbmcgbWlkZGxld2FyZVxuICAgICAgICAgICAgbmV4dChudWxsLCBwYXlsb2FkKTtcblxuICAgICAgICB9XG4gICAgfTtcblxuICAgIC8vIGRlZmluZSBtaWRkbGV3YXJlIHRvIHJ1biBhZnRlciBhIG1lc3NhZ2UgaGFzIGJlZW4gcmVjZWl2ZWQgYW5kIE9DRiBoYXMgcHJvY2Vzc2VkIGl0XG4gICAgbGV0IGJyb2FkY2FzdCA9IHtcbiAgICAgICAgbWVzc2FnZTogZnVuY3Rpb24ocGF5bG9hZCwgbmV4dCkge1xuICAgICAgICBcbiAgICAgICAgICAgIC8vIGFwcGVuZCBjb25maWcuYnJvYWRjYXN0IHRleHQgdG8gdGhlIHBheWxvYWRcbiAgICAgICAgICAgIHBheWxvYWQuZGF0YS50ZXh0ICs9IGNvbmZpZy5icm9hZGNhc3Q7XG5cbiAgICAgICAgICAgIC8vIGNvbnRpbnVlIGFsb25nIG1pZGRsZXdhcmVcbiAgICAgICAgICAgIG5leHQobnVsbCwgcGF5bG9hZCk7XG5cbiAgICAgICAgfVxuICAgIH07XG5cbiAgICAvLyBtaWRkbGV3YXJlIHRlbGxzIHRoZSBmcmFtZXdvcmsgdG8gdXNlIHRoZXNlIGZ1bmN0aW9ucyB3aGVuIFxuICAgIC8vIG1lc3NhZ2VzIGFyZSBzZW50IG9yIHJlY2VpdmVkXG4gICAgcmV0dXJuIHtcbiAgICAgICAgbWlkZGxld2FyZToge1xuICAgICAgICAgICAgc2VuZDogc2VuZCwgXG4gICAgICAgICAgICBicm9hZGNhc3Q6IGJyb2FkY2FzdFxuICAgICAgICB9XG4gICAgfVxufVxuIiwiKGZ1bmN0aW9uKCkge1xuXG4gICAgY29uc3QgbmFtZXNwYWNlID0gcmVxdWlyZSgnLi9wYWNrYWdlLmpzb24nKVsnb3Blbi1jaGF0LWZyYW1ld29yayddWyduYW1lc3BhY2UnXTtcbiAgICB3aW5kb3cuT3BlbkNoYXRGcmFtZXdvcmsucGx1Z2luW25hbWVzcGFjZV0gPSByZXF1aXJlKCcuL3BsdWdpbi5qcycpO1xuXG59KSgpO1xuIl19
