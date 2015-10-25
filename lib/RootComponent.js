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

var RootComponent = React.createClass({
  propTypes : {
    viewChain: React.PropTypes.array.isRequired,
    params: React.PropTypes.object.isRequired,
    query: React.PropTypes.object.isRequired
  },

  childContextTypes: {
    viewChain: React.PropTypes.array,
    params: React.PropTypes.object,
    query: React.PropTypes.object
  },

  getChildContext: function() {
    var c = this.props.viewChain;
    var subChain;
    if (c.length > 0) {
      subChain = c.slice(1,c.length);
    } else {
      subChain = [];
    }

    return {
      viewChain: subChain,
      params : this.props.params,
      query: this.props.query
    }
  },

  render: function() {
    var Component = this.props.viewChain[0].component;
    return React.createElement(Component);
  }

});

module.exports = RootComponent;
