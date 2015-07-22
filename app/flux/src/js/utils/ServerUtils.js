var ServerActionCreators = require('../actions/ServerActionCreators');





module.exports = {
  getAllComponents() {
    $.ajax({
      url: "src/data.json",
      method: "GET",
      dataType: "JSON",
      success: function(data) {
        // After successfully retrieve data, call an `Action Creator` method to help set up an `Action Call` to send to `store` through a `dispatcher`
        ServerActionCreators.receiveAll(data);
      },
      error: function(err) {
        console.log(err);
      }
    })
  }
}