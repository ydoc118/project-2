$(document).ready(() => {
  $(".ballot").on("click", function(event) {
    event.preventDefault();
    const id = $(this).data("id");
    console.log(id);

    $.get("/api/voter_address/" + id).then(results => {
      console.log(results);
      const street = results.address_one.replace(/\s/g, "%20");
      const city = results.city.replace(/\s/g, "%20");
      const state = results.state;
      const zip = results.zip;
      window.location.replace(
        `/getAPIResponse/${street}/${city}/${state}/${zip}`
      );
    });
  });
});
