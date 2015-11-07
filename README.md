# react-hash-router
A minimal router for React applications. Only supports hash urls ( e.g. #/resource/123/edit ).

### Usage

##### Example 1
index.jsx
``` javascript

var React = require('react');
var Router = require('react-hash-router');
var Path = Router.Path;

var routes = new Path('*', require('./components/RootView'), [
  new Path('/home', require('./components/HomeView')),
  new Path('/other/:resourceId', require('./components/OtherView')),
  new Path('*', require('./components/DefaultView')),
]);

Router.run(routes, function(RootComponent, props) {
  React.render(<RootComponent {...props}/>, document.getElementById('content'));
});

```
RootView.jsx
``` javascript
var React = require('react');
var RouteHandler = require('react-hash-router').RouteHandler;

var RootView = React.createClass({
  render: function() {
    return (
      <div>
        <h1>Root View</h1>
        <RouteHandler/>
      </div>
    );
  }
});

```

Path & query string parameters can be accessed using context

``` javascript

var Component = React.createClass({
  contextTypes : {
    query: React.propTypes.object,
    params: React.propTypes.object
  }

  render: function() {
    return <div>ResourceId: { this.context.params.resourceId }</div>;
  }

});

```

##### Example 2 - Nested routes

``` javascript
var routes = new Path('*', require('./components/views/RootView'), [
  new Path('/book/:bookId', require('./components/views/BookContainerView'), [

    //Matches #/book/123/edit
    new Path('/edit', require('./components/views/EditBook')),

    //Matches #/book/123/view
    new Path('/view', require('./components/views/ViewBook'))
  ])
]);

```
