//#region Daily Quest
var currentSitUps = 0;
var currentPushUps = 0;
var currentSquats = 0;
var currentBike = 0;

function incrementCounter(status2, counter, status, key, max) {
    let current;
    switch (key) {
        case "Sit":
          currentSitUps += 10;
          current = currentSitUps;
          break;
        case "Push":
          currentPushUps += 10;
          current = currentPushUps;
          break;
        case "Squat":
          currentSquats += 10;
          current = currentSquats;
          break;
        case "Bike":
          currentBike += 10;
          current = currentBike;
          break;
      }
      
      if (current > 2 * max) current = 2*max;
      localStorage.setItem(key, current);
      
      counter.textContent = `[${current}/${max}]`;
      if (key == "Bike") counter.textContent =`[${current}/${max}KM]`;

      if (current >= max) {
        status.textContent = "✔️";
        status2.textContent = "[Complete]";
      }
      if (current >= 2*max) {
        status.textContent = "👑";
        status2.textContent = "[Complete]";
      }
      if (current == 0) {
        status.textContent = "❌";
        status2.textContent = "[Incomplete]";
      }
  }

  function updateTimer() {
    // Get current date and time
    const now = new Date();

    // Get the current time at midnight (next day at 00:00:00)
    const midnight = new Date();
    midnight.setHours(24, 0, 0, 0);  // Set to 12:00 AM of the next day

    // Calculate the remaining time in milliseconds
    const timeLeft = midnight - now;

    // If time left is less than or equal to 0, restart at 24 hours again
    if (timeLeft <= 0) {
      midnight.setHours(48, 0, 0, 0);  // Restart at the next midnight (24 hours from now)
    }

    // Calculate hours, minutes, and seconds remaining
    const hours = Math.floor(timeLeft / (1000 * 60 * 60)); // Convert to hours
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60)); // Convert to minutes
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000); // Convert to seconds

    // Display the timer in the format hr:min:sec
    document.getElementById("countdown").textContent = 
      `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`;

    // If it's already midnight, restart the timer
    if (timeLeft <= 0) {
      clearInterval(timerInterval);  // Stop the timer
      setTimeout(function () {
        timerInterval = setInterval(updateTimer, 1000);  // Restart the timer every second
      }, 1000);
    }
  }

  // Helper function to pad single digits with a leading zero
  function padZero(value) {
    return value < 10 ? `0${value}` : value;
  }

  // Update the timer every second
  let timerInterval = setInterval(updateTimer, 1000);

  // Initial call to display the timer
  updateTimer();

function hideDaily() {
    document.getElementById("dailyQuestDiv").style.display = "none";
}
function showDaily() {
    document.getElementById("dailyQuestDiv").style.display = "flex";
}
    
if(localStorage.Sit){
    currentSitUps = localStorage.Sit -10;
    document.getElementById("counterSitUps").click();
}
if(localStorage.Push){
    currentPushUps = localStorage.Push -10;
    document.getElementById("counterPushUps").click();
}
if(localStorage.Squat){
    currentSquats = localStorage.Squat -10;
    document.getElementById("counterSquats").click();
}
if(localStorage.Bike){
    currentBike = localStorage.Bike -10;
    document.getElementById("counterBike").click();
}
function checkDateOnFocus() {
    const today = new Date().toLocaleDateString("en-CA");
    const saved = localStorage.getItem("lastVisitDate");
  
    if (today === saved) {
      //same day no changes
    } else {
    currentSitUps = -10;
    document.getElementById("counterSitUps").click();
    currentPushUps = -10;
    document.getElementById("counterPushUps").click();
    currentSquats = -10;
    document.getElementById("counterSquats").click();
    currentBike = -10;
    document.getElementById("counterBike").click();

    localStorage.setItem("lastVisitDate", today);
    }
}
checkDateOnFocus();
// Run again every time the tab gains focus
window.addEventListener("focus", checkDateOnFocus);

//#endregion

var gymCounter = 0;
var alcoholCounter = 0;
var dietCounter = 0;

function addProgress(key, counter, progress) {
    let current;
    switch(key){
        case "gym":
            gymCounter += 1;
            localStorage.gymCounter = gymCounter;
            current = gymCounter;
            break;
        case "alcohol":
            alcoholCounter += 1;
            localStorage.alcoholCounter = alcoholCounter;
            current = alcoholCounter;
            break;
        case "diet":
            dietCounter +=1;
            localStorage.dietCounter = dietCounter;
            current = dietCounter;
            break;
    }
counter.textContent = ` ${current}/${Math.floor(current/10 + 1)*10} Days`;
progress.style.width = `${current / Math.floor(current/10 + 1) * 10}%`
}

if(localStorage.gymCounter){
    gymCounter = localStorage.gymCounter -1;
    document.getElementById("gym").click();
}
if(localStorage.alcoholCounter){
    alcoholCounter = localStorage.alcoholCounter -1;
    document.getElementById("alcohol").click();
}
if(localStorage.dietCounter){
    dietCounter = localStorage.dietCounter -1;
    document.getElementById("diet").click();
}

function showProgress(){
    document.getElementById("progressDiv").style.display = "flex";
}
function hideProgress(){
    document.getElementById("progressDiv").style.display = "none";
}