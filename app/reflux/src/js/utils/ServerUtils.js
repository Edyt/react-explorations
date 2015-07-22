var ComponentListActions = require('../actions/ComponentListActions');





module.exports = {

  // Page load triggers this method to grab data from a file.
  getAllComponents() {
    $.ajax({
      url: "src/data.json",
      method: "GET",
      dataType: "JSON",

      // If success, grab the fetched data and initiate an Action.
      success: function(data) {
        ComponentListActions.processRawComponents(data);
      },
      error: function(err) {
        console.log(err);
      }
    })
  }
}