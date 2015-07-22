var ServerActionCreators = require('../actions/ServerActionCreators');





module.exports = {

  // Page load triggers this method to grab data from a file.
  getAllComponents() {
    $.ajax({
      url: "src/data.json",
      method: "GET",
      dataType: "JSON",

      // If success, tell ServerActionCreators to grab the fetched data and prepare an Action.
      success: function(data) {
        ServerActionCreators.receiveAll(data);
      },
      error: function(err) {
        console.log(err);
      }
    })
  }
}