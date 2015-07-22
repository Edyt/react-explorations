var React = require('react');
var Reflux = require('reflux');
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

  // Import Reflux Mixins to listen to the store (i.e. through "listenTo" method).
  mixins: [Reflux.ListenerMixin],

  getInitialState() {
    return getStateFromStores();
  },

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

  /**
   * Event handler for 'change' events coming from the ComponentListStore
   */
  _onChange() {
    this.setState(getStateFromStores());
  }
})