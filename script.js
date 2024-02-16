$(document).ready(function () {
  let timer;
  let timerInterval;
  let audio = false;
  let editNumber = false;

  // Start timer function
  function startTimer(duration, display) {
    timer = duration;
    let hours, minutes, seconds;
    timerInterval = setInterval(function () {
      hours = parseInt(timer / 3600, 10);
      minutes = parseInt((timer % 3600) / 60, 10);
      seconds = parseInt(timer % 60, 10);

      hours = hours < 10 ? "0" + hours : hours;
      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      display.text(hours + ":" + minutes + ":" + seconds);

      if (--timer < 0) {
        clearInterval(timerInterval);
        timer = 0;
        if (!audio) {
          $("audio").trigger("play");
          audio = true;
        } else {
          timer--;
        }
      }
    }, 1000);
  }

  // Edit section
  function editTimer() {
    let newDuration = parseInt($("#editNum").val()) * 60; //
    if (newDuration > 0) {
      editNumber = true;
      resetTimer();
      let display = $(".time");
      startTimer(newDuration, display);
    } else {
      alert("Please enter a valid number greater than 0.");
    }
  }

  // Click event for submit button to change timer
  $("#submitBtn").click(function () {
    editTimer();
  });

  // Function to reset the timer
  function resetTimer() {
    clearInterval(timerInterval);
    $(".time").text("00:00:00");
    audio = false;
  }

  // Click event for start timer button
  $(".start").click(function () {
    let duration = 25 * 60;
    let display = $(".time");
    if (!editNumber) {
      startTimer(duration, display);
    } else {
      resetTimer();
      startTimer(duration, display);
      editNumber = false;
    }
  });

  // Click event for reset timer button
  $(".reset").click(function () {
    resetTimer();
    editNumber = false;
  });
});
