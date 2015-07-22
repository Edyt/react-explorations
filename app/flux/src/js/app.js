var React = require('react');
var ServerUtils = require('./utils/ServerUtils');

// Components
var AppContainer = require('./components/AppContainer');





// Retrieve data through Ajax
ServerUtils.getAllComponents();

React.render(
  <AppContainer />,
  document.body
);


