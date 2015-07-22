var React = require('react');
var Reflux = require('reflux');
var ComponentListStore = require('../../stores/ComponentListStore');
var _ = require('lodash');
var SidebarButtons = require('./sidebar-buttons');

// CSS
var styles = require('./sidebar.css');





// Structure the `View State` through the Data retrieved from the Store
function getStateFromStores() {
  return {
    componentList: ComponentListStore.getAll(),
    currentComponentID: ComponentListStore.getCurrentComponentID()
  }
}





var SidebarSection = module.exports = React.createClass({

  // Import a set of Reflux Mixins to use within the component
  mixins: [Reflux.ListenerMixin],

  getInitialState() {
    return getStateFromStores();
  },

  // MOST IMPORTANT!!
  // Set-up communication between `Store` and `View`.
  // Data changes in the `Store` trigger the `setState` method in the View which will activate `Virtual DOM` to make appropriate changes in the UI
  componentDidMount() {
    this.listenTo(ComponentListStore, this._onChange);
  },

  renderButtons() {
    return _.map(this.state.componentList, function(component) {
      return (
        <SidebarButtons componentID={component.id} currentComponentID={this.state.currentComponentID}>
          {component.name}
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

  // This method is sent to the Store Listener (i.e. in componentDidMount) as a callback
  // Whenever there is a change in the store, this callback method will be called and trigger the `setState` method to refresh the UI
  _onChange() {
    this.setState(getStateFromStores());
  }
})