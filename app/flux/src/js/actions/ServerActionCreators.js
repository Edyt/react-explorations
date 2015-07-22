var AppDispatcher = require('../dispatcher/AppDispatcher');
var ActionConstants = require('../constants/ActionConstants');

// Reference to Action Constants
var ActionTypes = ActionConstants.ActionTypes;





module.exports = {
  receiveAll(rawComponents) {
    // Configure the `action` key-value before sending to `store`
    // The `action` at least two types of data
    //    1) Action Type
    //    2) Data to store in the `store`
    AppDispatcher.dispatch({
      type: ActionTypes.RECEIVE_RAW_COMPONENTS,
      rawComponents: rawComponents
    })
  }
}