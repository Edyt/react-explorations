var React = require('react');

var ServerUtils = require('./utils/ServerUtils');
var ComponentListStore = require('./stores/ComponentListStore.js');

// Components
var AppContainer = require('./components/AppContainer');





// Page load calls a ServerUtils method to fetch the data from the server.
ServerUtils.getAllComponents();

React.render(
  <AppContainer/>,
  document.body
);


