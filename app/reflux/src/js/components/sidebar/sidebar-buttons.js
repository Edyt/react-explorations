var React = require('react');
var ClassNames = require('classnames');
var ComponentListActions = require('../../actions/ComponentListActions');

// CSS
var styles = require('./sidebar.css');





var SidebarButtons = module.exports = React.createClass({

  propTypes: {
    componentID: React.PropTypes.string,
    currentComponentID: React.PropTypes.string
  },

  handleClick() {
    var componentID = this.props.componentID;
    ComponentListActions.clickButton(componentID);
  },

  render() {
    var componentID = this.props.componentID,
        currentComponentID = this.props.currentComponentID,
        isBtnActive = null;

    // Process `active` state for a button
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