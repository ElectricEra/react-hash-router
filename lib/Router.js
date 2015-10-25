/*
The MIT License (MIT)

Copyright (c) 2015

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
var React = require('react');
var RootComponent = require('./RootComponent');

function matchPath(viewChain, pathParams, url, paths) {

  paths.forEach(function(path) {
    var regex = new RegExp(path.pattern);
    var m = regex.exec(url);
    if (m == null) { return; }

    for(var param in path.paramIndex) {
      pathParams[param] = m[path.paramIndex[param]];
    }

    viewChain.push({
      component: path.component
    });

    var nextUrl = url.substring(m[0].length, url.length);
    matchPath(viewChain, pathParams, nextUrl, path.paths);
  });
}

function buildRootProps(hash, config) {
  var paths = hash.split('/');
  var viewChain = [];
  var pathParams = {};

  viewChain.push({
    component: config.component
  });

  matchPath(viewChain, pathParams, hash.substring(1, hash.length), config.paths);

  return {
    viewChain : viewChain,
    params: pathParams,
    query : {}
  };
}

module.exports = {
  run: function(config, targetElement) {
    var hashChanged = function() {
      var hash = window.location.hash;
      var props = buildRootProps(hash, config);
      React.render(
        React.createElement(RootComponent, props),
        targetElement
      );
    }

    if (window.location.hash == '') {
      window.location.hash = "#/";
    }

    window.onhashchange = hashChanged;
    hashChanged();
  },

  route: function(config, callback) {
    var hashChanged = function() {
      var hash = window.location.hash;
      var props = buildRootProps(hash, config);
      callback(RootComponent, props);
    }

    if (window.location.hash == '') {
      window.location.hash = "#/";
    }

    window.onhashchange = hashChanged;
    hashChanged();
  }
};
