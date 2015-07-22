var React = require('react');
var ClassNames = require('classnames');
var SidebarActionCreators = require('../../actions/SidebarActionCreators');

// CSS
var styles = require('./sidebar.css');





var SidebarButtons = module.exports = React.createClass({

  propTypes: {
    componentID: React.PropTypes.string,
    currentComponentID: React.PropTypes.string
  },

  // When user clicks the button, calls Action Creator to prepare and dispatch Action to the Dispatcher
  handleClick() {
    var componentID = this.props.componentID;
    SidebarActionCreators.clickButton(componentID);
  },

  render() {
    var componentID = this.props.componentID,
        currentComponentID = this.props.currentComponentID,
        isBtnActive = null;

    if(componentID === currentComponentID) {
      isBtnActive = styles.isActive;
    }

    return (
      <button className={ClassNames(styles.sidebarBtn, isBtnActive)} onClick={this.handleClick}>
        {this.props.children}
      </button>
    )
  }
})