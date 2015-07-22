var Reflux = require('reflux');
var _ = require('lodash');
var ComponentListActions = require('../actions/ComponentListActions');


var _components = {},
    _currentComponentID = null;





var ComponentListStore = Reflux.createStore({

  // - Listen to the Store defined in the value (i.e. ComponentListActions).
  listenables: ComponentListActions,

  // - page load calls for all components from store
  // - dispatch sends response data to this method / handler
  // - this method / handler processes the response data and assigns components into _components
  // - naming convention for action listener method is
  //   "on" + "ActionName" (first letter of the action name needs to be capitalized)
  onProcessRawComponents(rawComponents) {

    // Process the raw data and store it inside _components.
    rawComponents.forEach(function(component) {
      var componentID = component.id;

      _components[componentID] = {
        id: componentID,
        name: component.name,
        html: component.html,
        css: component.css,
        js: component.js,
        docs: component.docs
      };
    }, this);

    // Assign the current active component. In the app, we want to know which component is being active so we can assign the "is-active" class as well as display data that belong to only that component.
    if(!_currentComponentID) {
      // Process _components object and convert it into an array then assign the first index / element to be active.
      var sortedList = this.getSortedList();
      _currentComponentID = sortedList[0].id;
    }

    // Emit change event to re-render the View
    this.trigger();
  },

  onClickButton(currentComponentID) {
    _currentComponentID = currentComponentID;
    this.trigger();
  },

  get(name) {
    return _components[name];
  },

  getAll() {
    return _components;
  },

  getCurrentComponent() {
    return _components[_currentComponentID];
  },

  getCurrentComponentID() {
    return _currentComponentID;
  },

  getSortedList() {
    var orderedList = [];

    _.each(_components, function(component) {
      orderedList.push(component);
    });

    return orderedList;
  }
})





module.exports = ComponentListStore;


