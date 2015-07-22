var Dispatcher = require('flux').Dispatcher;





// - A Dispatcher is a central hub for all the Actions. In other words, all actions that have intention of mutate data in the Stores are required to go through here.
// - The Dispatcher also responsible for distributing Actions accross all registered Stores.
module.exports = new Dispatcher();