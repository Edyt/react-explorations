var ComponentListActions = require('../actions/ComponentListActions');





module.exports = {

  // Page load calls this Ajax method to retrieve data
  getAllComponents() {
    $.ajax({
      url: "src/data.json",
      method: "GET",
      dataType: "JSON",
      // Retrieved data will be send to the `Store` through the guidance/dispatch from an `Action` call
      success: function(data) {
        ComponentListActions.processRawComponents(data);
      },
      error: function(err) {
        console.log(err);
      }
    })
  }
}