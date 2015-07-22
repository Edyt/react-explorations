var React = require('react');

// Components
var Sidebar = require('./sidebar/sidebar');
var MainContent = require('./main-content/main-content');

// CSS
require('../../css/global');





var Styleguide = module.exports = React.createClass({

  render() {
    return (
      <div>
        <Sidebar />
        <MainContent />
      </div>
    )
  },

});


