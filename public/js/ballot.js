$(document).ready(() => {
  if ($(".type").val() === "Referendum"){
    console.log("hello world");
    document.getElementsByClassName("type").className = "referendumText"
  }

});
