var AppDispatcher = require('../dispatcher/AppDispatcher');
var ActionConstants = require('../constants/ActionConstants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var ActionTypes = ActionConstants.ActionTypes;
var CHANGE_EVENT = 'change';


// STORE
var ComponentListStore = require('./ComponentListStore');

// DATA
var _component = {};





var MainContentStore = assign({}, EventEmitter.prototype, {

  emitChange() {
    this.emit(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getComponent() {
    return _component;
  }
});



// Register Store to dispatcher
MainContentStore.dispatchToken = AppDispatcher.register(function(action) {

  switch(action.type) {

    case ActionTypes.CLICK_BUTTON:
      _component = ComponentListStore.getCurrentComponent();
      MainContentStore.emitChange();
      break;

    case ActionTypes.RECEIVE_RAW_COMPONENTS:
      _component = ComponentListStore.getCurrentComponent();
      MainContentStore.emitChange();
      break;

    default:
  }
});



module.exports = MainContentStore;