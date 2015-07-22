var React = require('react');

var ServerUtils = require('./utils/ServerUtils');
var ComponentListStore = require('./stores/ComponentListStore.js');

// Components
var AppContainer = require('./components/AppContainer');





// - Upon page load, fetch all data from the file (or Database)
ServerUtils.getAllComponents();

React.render(
  <AppContainer/>,
  document.body
);


