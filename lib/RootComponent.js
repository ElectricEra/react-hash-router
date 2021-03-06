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
var PropTypes = require('prop-types'); 

var RootComponent = React.createClass({

  displayName : 'RootComponent',

  propTypes : {
    subviews: PropTypes.array.isRequired,
    params: PropTypes.object.isRequired,
    query: PropTypes.object.isRequired
  },

  childContextTypes: {
    subviews: PropTypes.array,
    params: PropTypes.object,
    query: PropTypes.object
  },

  getChildContext: function() {
    var subviews = this.props.subviews;
    return {
      subviews: subviews.length > 0 ? subviews.slice(1, subviews.length) : [],
      params : this.props.params,
      query: this.props.query
    }
  },

  render: function() {
    var Component = this.props.subviews[0].component;
    return React.createElement(Component);
  }

});

module.exports = RootComponent;
