// Set --vh to 1% of the actual viewport height
function setVh() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }
  
  // Initial setup
  setVh();
  
  // Update on resize or orientation change
  window.addEventListener('resize', setVh);
  
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

//#region Progress bars

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
//#endregion

//#region Weather
document.addEventListener('DOMContentLoaded', () => {
    const url = 'https://opendata.fmi.fi/wfs?service=WFS&version=2.0.0&request=getFeature&storedquery_id=fmi::forecast::harmonie::surface::point::simple&place=helsinki&';
  
    fetch(url)
      .then(res => res.text())
      .then(xmlText => {
        const temperatureData = [];
  
        // Loop through each <wfs:member> block
        const memberRegex = /<wfs:member>([\s\S]*?)<\/wfs:member>/g;
        let match;
  
        while ((match = memberRegex.exec(xmlText)) !== null) {
          const member = match[1];
  
          if (member.includes('<BsWfs:ParameterName>Temperature</BsWfs:ParameterName>')) {
            const timeMatch = /<BsWfs:Time>(.*?)<\/BsWfs:Time>/i.exec(member);
            const valueMatch = /<BsWfs:ParameterValue>(.*?)<\/BsWfs:ParameterValue>/i.exec(member);
  
            if (timeMatch && valueMatch) {
              const timeRaw = new Date(timeMatch[1]).toISOString().replace('T', ' ').split('.')[0];
              const value = valueMatch[1];
              const boolTime = checkTime(timeRaw);
              const time = timeRaw.split(' ')[1].split(':')[0];
              if(boolTime) temperatureData.push({ time, value, boolTime });
            }
          }
        }
          const table = document.getElementById("weatherTable");
          const rowTime = table.insertRow(0);
          const rowWeather = table.insertRow(1);
          rowWeather.classList.add("redWeather");
          rowTime.classList.add("blueWeather")
          for(i = 0; i < temperatureData.length; i++){
              var cellTime = rowTime.insertCell(i);
              var cellWeather = rowWeather.insertCell(i);
              cellTime.innerHTML = temperatureData[i].time;
              cellWeather.innerHTML = Math.round(temperatureData[i].value) + "°";
          }
          
      })
      .catch(err => {
        console.error('Error:', err.message);
      });
  });
  
  function checkTime(inputTimeStr) {
      const now = new Date();
      const input = new Date(inputTimeStr.replace(" ", "T")); // Local time

      const sameDate =
          input.getFullYear() === now.getFullYear() &&
          input.getMonth() === now.getMonth() &&
          input.getDate() === now.getDate();

      const sameHour = input.getHours() === now.getHours();

      if (sameDate && (input > now || sameHour)) {
          return true;
        } 
      else {
          return false;
        }
  }

function hideWeather(){
    document.getElementById("WeatherContainer").style.display = "none";
}
function showWeather(){
    document.getElementById("WeatherContainer").style.display = "block";
}
//#endregion Weather
