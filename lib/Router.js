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
var queryString = require('query-string');

function matchPath(subviews, pathParams, url, paths) {

  paths.forEach(function(path) {
    var regex = new RegExp(path.pattern);
    var m = regex.exec(url);
    if (m == null) { return; }

    for(var param in path.paramIndex) {
      pathParams[param] = m[path.paramIndex[param]];
    }

    subviews.push({
      component: path.component
    });

    var nextUrl = url.substring(m[0].length, url.length);
    matchPath(subviews, pathParams, nextUrl, path.paths);
  });
}

function buildRootProps(hash, config) {
  var indexOfQueryString = hash.indexOf('?');

  //Parse the query string
  var pathComponent;
  var queryParams;
  if (indexOfQueryString == -1) {
    pathComponent = hash;
    queryParams = {};
  } else {
    pathComponent = hash.substring(0, indexOfQueryString);
    queryParams = queryString.parse(hash.substring(indexOfQueryString, hash.length))
  }

  var paths = pathComponent.split('/');
  var subviews = [];
  var pathParams = {};

  subviews.push({
    component: config.component
  });

  matchPath(subviews, pathParams, pathComponent.substring(1, pathComponent.length), config.paths);

  return {
    subviews : subviews,
    params: pathParams,
    query : queryParams
  };
}

module.exports = {
  run: function(config, callback) {
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
