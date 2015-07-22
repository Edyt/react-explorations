var AppDispatcher = require('../dispatcher/AppDispatcher');
var ActionConstants = require('../constants/ActionConstants');

var ActionTypes = ActionConstants.ActionTypes;





module.exports = {
  clickButton(componentID) {
    AppDispatcher.dispatch({
      type: ActionTypes.CLICK_BUTTON,
      currentComponentID: componentID
    });
  }
}