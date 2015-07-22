var AppDispatcher = require('../dispatcher/AppDispatcher');
var ActionConstants = require('../constants/ActionConstants');

// Reference to Action Constants
var ActionTypes = ActionConstants.ActionTypes;





// - All interactions (i.e. from User or Server) that want to mutate data in the Store are required to make a call to the Action Creator.
// - In the code, AppDispatcher.dispatch is initiating an Action.
// - An Action always has a Type and an optional piece of Data.
module.exports = {
  receiveAll(rawComponents) {
    AppDispatcher.dispatch({
      type: ActionTypes.RECEIVE_RAW_COMPONENTS,
      rawComponents: rawComponents
    })
  }
}