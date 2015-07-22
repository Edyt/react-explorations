var Reflux = require('reflux');
var ComponentListActions = require('../actions/ComponentListActions');
var ComponentListStore = require('./ComponentListStore');

var _component = {};


var MainContentStore = Reflux.createStore({
  listenables: ComponentListActions,

  // - page load calls for all components from store
  // - dispatch sends response data to this method / handler
  // - this method / handler processes the response data and assigns components into _componentList
  onProcessRawComponents(rawComponents) {
    _component = ComponentListStore.getCurrentComponent();

    // Send out the `change` event listener
    this.trigger();
  },

  onClickButton() {
    _component = ComponentListStore.getCurrentComponent();
    this.trigger();
  },

  getComponent() {
    return _component;
  }
})





module.exports = MainContentStore;


