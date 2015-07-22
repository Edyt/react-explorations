var Reflux = require('reflux');
var _ = require('lodash');
var ComponentListActions = require('../actions/ComponentListActions');


var _componentList = {},
    _currentComponentID = null;


var ComponentListStore = Reflux.createStore({

  // Listen to the particular set of `Action` interface
  listenables: ComponentListActions,

  // - page load calls for all components from store
  // - dispatch sends response data to this method / handler
  // - this method / handler processes the response data and assigns components into _componentList
  onProcessRawComponents(rawComponents) {

    // Build a new data architecture for each `component`
    rawComponents.forEach(function(component) {

      var componentID = component.id;

      _componentList[componentID] = {
        id: componentID,
        name: component.name,
        html: component.html,
        css: component.css,
        js: component.js,
        docs: component.docs
      };
    }, this);

    // Initialize current component
    if(!_currentComponentID) {
      // Data is stored in an object (i.e. _componentList). To retrieve information of a component, we are required to know `component ID. Our goal here is to simply assign a `current state` on a Component; so the easiest way for us to convert the data from `Object` form into `Array` form. With Array, we can easily access a particular Component through an `array index`
      var sortedList = this.getSortedList();
      _currentComponentID = sortedList[0].id;
    }

    // Send out the `change` event listener
    // The View that listen to the changes in this Store will receive new `State`
    this.trigger();
  },

  onClickButton(currentComponentID) {
    _currentComponentID = currentComponentID;
    this.trigger();
  },

  get(name) {
    return _componentList[name];
  },

  getAll() {
    return _componentList;
  },

  getCurrentComponent() {
    return _componentList[_currentComponentID];
  },

  getCurrentComponentID() {
    return _currentComponentID;
  },

  getSortedList() {
    var orderedList = [];

    _.each(_componentList, function(component) {
      orderedList.push(component);
    });

    return orderedList;
  }
})





module.exports = ComponentListStore;


