
$(document).ready(() => {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page

  function getPosition() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
        console.log(showPosition)
    }; 
      function showPosition(position) {
        console.log("Latitude: " + position.coords.latitude + " " +
        "Longitude: " + position.coords.longitude);
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
    };

    
  };

  getPosition();

  

  $.get("/api/user_data").then(data => {
    var email = data.email;

    $("#register").on("click", function(event) {
      event.preventDefault();
      // console.log(email);
      var dLicense = $("#dl-input").val().trim();
      var voterReg = $("#reg-input").val().trim();
      // console.log(dLicense);
      // console.log(voterReg);
      window.location.replace("/api/voter_validation/" + dLicense + "/" + voterReg)
      
    })
  });
  
});
