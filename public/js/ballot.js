$(document).ready(function() {
  $("button").click(function(){   
    event.preventDefault();

      // Targeting each radio selection value and pushing to an array called selection
      var selection = []
      $.each($("input[class='radio']:checked"), function(){
        selection.push($(this).val());
      });

      console.log(selection)

      // Changing selection variable to results and changing to string
      results = selection.toString()
      console.log(results)

      // Create a variable called address that is targetting hidden address on ballot handlebars
      let address = $("#address").text()
      console.log(address)

      // PUT route to update database, changing voting status from false to true
      $.ajax({
        method: "PUT",
        url: "/api/update_user_voted/" + address, 
        data: {"address": address}
      }).then(results => {
        console.log(results);
      });

      // POST route creating a new row in Voter_response table that adds voting selections
      $.ajax({
        method: "POST",
        url: "/api/ballot_results/" + address + "/" + results 
      }).then(results => {
        console.log(results);
      });      

  });
});
