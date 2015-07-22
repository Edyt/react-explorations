var AppDispatcher = require('../dispatcher/AppDispatcher');
var ActionConstants = require('../constants/ActionConstants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var _ = require('lodash');

var ActionTypes = ActionConstants.ActionTypes;
var CHANGE_EVENT = 'change';


// DATA
// _componentList stores all the component data
var _componentList = {},
    _currentComponentID = null;





var ComponentListStore = assign({}, EventEmitter.prototype, {

  init(rawComponents) {

    // Build a new data architecture for each `component`
    rawComponents.forEach(function(component) {
      var componentID = component.id,
          componentName = component.name,
          componentHTML = component.html,
          componentCSS = component.css,
          componentJS = component.js,
          componentDocs = component.docs;

      _componentList[componentID] = {
        id: componentID,
        name: componentName,
        html: componentHTML,
        css: componentCSS,
        js: componentJS,
        docs: componentDocs
      };
    }, this);

    // Initialize current component
    if(!_currentComponentID) {
      // Data is stored in an object (i.e. _componentList). To retrieve information of a component, we are required to know `component ID. Our goal here is to simply assign a `current state` on a Component; so the easiest way for us to convert the data from `Object` form into `Array` form. With Array, we can easily access a particular Component through `array index`
      var sortedList = this.getSortedList();
      _currentComponentID = sortedList[0].id;
    }
  },

  // `emit` method sends out a `named` event to be listened by the `on` method
  emitChange() {
    this.emit(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */

  // Trigger everytime an `event` is sent out by `emit` method
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
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
});



// Register Store to dispatcher
// `Actions` sent out from the Dispatcher will be filter out based on their `Type`.
ComponentListStore.dispatchToken = AppDispatcher.register(function(action) {

  // Each `case` in the `switch` represent each Action Type.
  switch(action.type) {

    case ActionTypes.CLICK_BUTTON:
      _currentComponentID = action.currentComponentID;
      ComponentListStore.emitChange();
      break;

    case ActionTypes.RECEIVE_RAW_COMPONENTS:
      ComponentListStore.init(action.rawComponents);
      ComponentListStore.emitChange();
      break;

    default:
      // do nothing
  }
});





module.exports = ComponentListStore;