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
function Path(url, component, paths) {
  this.url = url;
  this.component = component;
  this.paramIndex = {};

  if (paths === undefined || !Array.isArray(paths)) {
    this.paths = [];
  } else {
    this.paths = paths;
  }

  var components = url.split("/");
  var regexStr = "";
  for (var x = 0; x < components.length; x++) {
    var component = components[x];
    if (component == '' || component == '*'){ continue; }

    if (component.substring(0, 1) == ':') {
      regexStr = regexStr + '/([^/]*)';
      this.paramIndex[component.substring(1, component.length)] = x;
    } else {
      regexStr = regexStr + '/(' + component + ')';
    }
  }

  this.pattern = regexStr;
};

module.exports = Path;
