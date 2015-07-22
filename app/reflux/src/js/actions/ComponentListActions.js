var Reflux = require('reflux');





// - A list of Action interfaces created by Reflux.
// - This establishes communication with the Store.
// - When an Action is triggered, either from User or Server, all the Stores that "listened" will be notified about the Action.
module.exports = Reflux.createActions([
  'processRawComponents',
  'clickButton'
]);
