$(document).ready(function () {

  function clearPlanner() {
    window.localStorage.clear();
    for (let i = 9; i < 18; i++) {
      $("#ta-" + i).val("");
    }
  }


  function loadPlanner() {
    var existingEntries = JSON.parse(window.localStorage.getItem("existing-entries"));
    if (existingEntries != null) {
      for (let i = 9; i < 18; i++) {
        if (existingEntries[i] != null) {
          $("#ta-" + i).val(existingEntries[i].toDo);
        }
      }
    }
  }

  



  for (let i = 9; i < 18; i++) {
    $("#btn-" + i).click(function () {



      if ($("#ta-" + i).attr('disabled')) {

        $("#ta-" + i).removeAttr('disabled');
      } else {

        $("#ta-" + i).attr('disabled', 'true');
        var existingEntries = JSON.parse(window.localStorage.getItem("existing-entries"));
        if (existingEntries == null) existingEntries = [];
        existingEntries[i] = {
          time: i,
          toDo: $("#ta-" + i).val()
        };
        window.localStorage.setItem("existing-entries", JSON.stringify(existingEntries));
        console.log(existingEntries);
      }




    });
  }



  setInterval(function () {
    var thisDay = new Date();
    var date = thisDay.toDateString() + ' | ' + thisDay.toTimeString();


    $("#currentDay").text(date);



    for (let i = 9; i < 18; i++) {
      var today = new Date();
      var time = today.getHours();

      if (i > time) {
        $("#hour-" + i).removeClass("past");
        $("#hour-" + i).removeClass("present");
        $("#hour-" + i).addClass("future");
      } else if (i == time) {
        $("#hour-" + i).removeClass("past");
        $("#hour-" + i).removeClass("future");
        $("#hour-" + i).addClass("present");
      } else {
        $("#hour-" + i).removeClass("future");
        $("#hour-" + i).removeClass("present");
        $("#hour-" + i).addClass("past");
      }
    }
  }, 100);


  //add event listener for clear button
  $("#clear-btn").click(clearPlanner);

  //load planner from previous data
  loadPlanner();

});

