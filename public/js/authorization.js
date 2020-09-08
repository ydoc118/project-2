$(document).ready(() => {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $(".modal").modal();
  function getPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
      //console.log(showPosition);
    }
    function showPosition(position) {
      console.log(
        "Latitude: " +
          position.coords.latitude +
          " " +
          "Longitude: " +
          position.coords.longitude
      );
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;

      getZip(latitude, longitude);
    }
  }

  getPosition();

  function getZip(latitude, longitude) {
    const queryURL = `/api/mapQuest/${latitude}/${longitude}`;
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(response => {
      // console.log(response)
      /* eslint-disable-next-line */
      const zipCode = response.results[0].locations[0].postalCode.substring(0, 5);
      // console.log(response);
      // console.log(zipCode.substring(0, 5));
      // console.log("New Zip:" + " " + zipCode);
      $("#zipCode")
        .empty()
        .append(zipCode);

      authorization(zipCode);
    });
  }

  function authorization(zipCode) {
    let dLicense;
    let voterReg;
    // let postalCode;
    $.get("/api/user_data").then(data => {
      const email = data.email;
      console.log("old" + email);

      $("#register").on("click", event => {
        event.preventDefault();
        console.log("new" + email);
        dLicense = $("#dl-input")
          .val()
          .trim();
        voterReg = $("#reg-input")
          .val()
          .trim();

        $.ajax({
          method: "PUT",
          url: "/api/update_email_voterids/" + voterReg + "/" + email
          // data: {"voterReg": voterReg}
        }).then(results => {
          console.log(results);
        });

        window.location.replace(
          "/api/voter_validation/" + dLicense + "/" + voterReg + "/" + zipCode
        );
      });
    });
  }
});
