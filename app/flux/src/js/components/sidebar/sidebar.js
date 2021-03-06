var React = require('react');
var ComponentListStore = require('../../stores/ComponentListStore');
var _ = require('lodash');
var SidebarButtons = require('./sidebar-buttons');

// CSS
var styles = require('./sidebar.css');





// Controller-View
// Grab data from the Store using the Store's Getter methods
function getStateFromStores() {
  return {
    componentList: ComponentListStore.getAll(),
    currentComponentID: ComponentListStore.getCurrentComponentID()
  }
}





var SidebarSection = module.exports = React.createClass({

  getInitialState() {
    return getStateFromStores();
  },

  // Set-up communication between `Store` and `View`.
  // Data changes in the `Store` trigger the `setState` method in the View which will activate `Virtual DOM` to make appropriate changes in the UI
  componentDidMount() {
    ComponentListStore.addChangeListener(this._onChange);
  },

  componentWillUnmount() {
    ComponentListStore.removeChangeListener(this._onChange);
  },

  renderButtons() {
    return _.map(this.state.componentList, function(component) {

      var componentID = component.id,
          componentName = component.name,
          currentComponentID = this.state.currentComponentID;

      return (
        <SidebarButtons componentID={componentID} currentComponentID={currentComponentID}>
          {componentName}
        </SidebarButtons>
      );
    }.bind(this));
  },

  render() {
    return (
      <aside className={styles.sidebar}>
        <h3 className={styles.sidebarHeader}>Components</h3>
        {this.renderButtons()}
      </aside>
    )
  },

  _onChange() {
    this.setState(getStateFromStores());
  }
})