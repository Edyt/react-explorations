var AppDispatcher = require('../dispatcher/AppDispatcher');
var ActionConstants = require('../constants/ActionConstants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var _ = require('lodash');

var ActionTypes = ActionConstants.ActionTypes;
var CHANGE_EVENT = 'change';


var _components = {},
    _currentComponentID = null;





var ComponentListStore = assign({}, EventEmitter.prototype, {

  init(rawComponents) {

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
  },

  emitChange() {
    this.emit(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */

  // Actively listen to change event
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
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
});



// Register Store to dispatcher
// All Actions sent out from the Dispatcher will be filtered based on Type
ComponentListStore.dispatchToken = AppDispatcher.register(function(action) {

  switch(action.type) {

    case ActionTypes.CLICK_BUTTON:
      _currentComponentID = action.currentComponentID;
      // Emit change event to re-render the View
      ComponentListStore.emitChange();
      break;

    case ActionTypes.RECEIVE_RAW_COMPONENTS:
      ComponentListStore.init(action.rawComponents);
      // Emit change event to re-render the View
      ComponentListStore.emitChange();
      break;

    default:
      // do nothing
  }
});





module.exports = ComponentListStore;