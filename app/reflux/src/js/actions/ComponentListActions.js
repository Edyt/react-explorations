var Reflux = require('reflux');





// A collection of `Action` interfaces
// These actions build the communication between View/Utils to the Store
module.exports = Reflux.createActions([
  'processRawComponents',
  'clickButton'
]);
