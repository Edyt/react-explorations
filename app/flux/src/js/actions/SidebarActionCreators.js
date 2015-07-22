var AppDispatcher = require('../dispatcher/AppDispatcher');
var ActionConstants = require('../constants/ActionConstants');

var ActionTypes = ActionConstants.ActionTypes;





// - All interactions (i.e. from User or Server) that want to mutate data in the Store are required to make a call to the Action Creator.
// - In the code, AppDispatcher.dispatch is initiating an Action.
// - An Action always has a Type and an optional piece of Data.
module.exports = {
  clickButton(componentID) {
    AppDispatcher.dispatch({
      type: ActionTypes.CLICK_BUTTON,
      currentComponentID: componentID
    });
  }
}