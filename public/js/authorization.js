
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

        getZip(latitude,longitude)
        
    };

    
  };

  getPosition();


  function getZip(latitude, longitude) {
    var queryURL = "http://www.mapquestapi.com/geocoding/v1/reverse?key=GL9KfMUnj94IQ3OLDQBv7GBGfKh6fV6q&location="+latitude+","+longitude+"&includeRoadMetadata=true&includeNearestIntersection=true";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        // console.log(response)
      var zipCode = response.results[0].locations[0].postalCode.substring(0,5)
      console.log(response)
      console.log(zipCode.substring(0,5))
      console.log("New Zip:" + " " + zipCode)
      $('#zipCode').empty().append(zipCode);

      authorization(zipCode)
    });
  };


function authorization(zipCode) {
  $.get("/api/user_data").then(data => {
    var email = data.email;

    $("#register").on("click", function(event) {
      event.preventDefault();
      // console.log(email);
      var dLicense = $("#dl-input").val().trim();
      var voterReg = $("#reg-input").val().trim();
      var postalCode = $("#zipCode").text().trim();

      console.log("Postal Code " + postalCode)
      // console.log("License " + dLicense)
      // console.log("Voter Reg " + voterReg)
      window.location.replace("/api/voter_validation/" + dLicense + "/" + voterReg + "/" + zipCode )
      
    })
  });
}

});
