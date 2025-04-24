// Set --vh to 1% of the actual viewport height
function setVh() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }
  
  // Initial setup
  setVh();
  
  // Update on resize or orientation change
  window.addEventListener('resize', setVh);


//#region Currencies

let level = 0;
if(localStorage.level){
    level = Number(localStorage.level);
}
console.log(level)
let xp = 0;
if(localStorage.xp){
    xp = Number(localStorage.xp);
}
console.log(xp)
let orbs = 0;
if(localStorage.orbs){
    orbs = Number(localStorage.orbs);
}
console.log(orbs)
let diamonds = 0;
if(localStorage.diamonds){
    diamonds = Number(localStorage.diamonds);
}
console.log(diamonds);
document.getElementById("xpProgress").style.width = xp / (2 + level*2);
document.getElementById("xpNumber").innerHTML = `${xp}/${200 + level*200}`;
document.getElementById("xpProgress").style.width = Math.round(xp / (2 + level*2)) +"%";
document.getElementById("xpNumber").innerHTML = `${xp}/${200 + level*200}`;
document.getElementById("xpText").innerHTML = level;
document.getElementById("orbsText").innerHTML = orbs + '<img src="./Images/ManaOrbs.png" width="20px">';
document.getElementById("diamondsText").innerHTML = diamonds +'<img src="./Images/Diamond.png" width="20px">';

function changeCurrencies(xpDelta, orbsDelta, diamondsDelta) {
    if(xpDelta != 0 && xp + xpDelta < 200 + level*200){
        xp = xp + xpDelta;
        localStorage.xp = xp;
        document.getElementById("xpProgress").style.width = Math.round(xp / (2 + level*2)) +"%";
        document.getElementById("xpNumber").innerHTML = `${xp}/${200 + level*200}`;
    }
    else if(xpDelta + xp >= 200 + level*200){
        xp = xp + xpDelta - (200 + level*200);
        level = level + 1;
        localStorage.level = level;
        localStorage.xp = xp;
        document.getElementById("xpProgress").style.width = Math.round(xp / (2 + level*2)) +"%";
        console.log( Math.round(xp / (2 + level*2)) +"%")
        document.getElementById("xpNumber").innerHTML = `${xp}/${200 + level*200}`;
        document.getElementById("xpText").innerHTML = level;
    }
    if(orbsDelta != 0){
        orbs = orbs + orbsDelta;
        localStorage.orbs = orbs;
        document.getElementById("orbsText").innerHTML = orbs + '<img src="./Images/ManaOrbs.png" width="20px">';
    }
    if(diamondsDelta != 0){
        diamonds = diamonds + diamondsDelta;
        localStorage.diamonds = diamonds;
        document.getElementById("diamondsText").innerHTML = diamonds +'<img src="./Images/Diamond.png" width="20px">';
    }
}

//#endregion

//#region Daily Quest
var currentSitUps = 0;
var currentPushUps = 0;
var currentSquats = 0;
var currentBike = 0;

var sitReward = 0;
var pushReward = 0;
var squatReward = 0;
var bikeReward = 0;
var claimedReward = 0;

function dailyReward() {
    console.log(claimedReward)
    
    if(claimedReward == 2){
        console.log(claimedReward)
        return;
    }
    else if(claimedReward == 0 && bikeReward >= 1 && pushReward >= 1 && sitReward >= 1 && squatReward >= 1){
        changeCurrencies(100, 0, 0);
        claimedReward = 1;
        localStorage.claimedReward = 1;
        console.log("def",claimedReward)
        return;
    }
    else if(claimedReward == 1 && bikeReward == 2 && pushReward == 2 && sitReward == 2 && squatReward == 2){
        changeCurrencies(100,50,1);
        claimedReward = 2;
        localStorage.claimedReward = 2;
        console.log("crown",claimedReward)
        return;
    }
    else{
        return;
    }
}

function isToday(){
const today = new Date().toLocaleDateString("en-CA");
    const saved = localStorage.getItem("lastVisitDate");
  
    if (today === saved) {
      return true
    } else {
        return false
}}

function incrementCounter(status2, counter, status, key, max) {
    let current;
    var currentReward = {
    };
    switch (key) {
        case "Sit":
          currentSitUps += 10;
          current = currentSitUps;
          currentReward = currentReward = {
            set: (val) => sitReward = val,
        };
          break;
        case "Push":
          currentPushUps += 10;
          current = currentPushUps;
          currentReward = currentReward = {
            set: (val) => pushReward = val,
        };
          break;
        case "Squat":
          currentSquats += 10;
          current = currentSquats;
          currentReward = currentReward = {
            set: (val) => squatReward = val,
        };
          break;
        case "Bike":
          currentBike += 10;
          current = currentBike;
          currentReward = currentReward = {
            set: (val) => bikeReward = val,
        };
          break;
      }
      
      if (current > 2 * max) current = 2*max;
      localStorage.setItem(key, current);
      
      counter.textContent = `[${current}/${max}]`;
      if (key == "Bike") counter.textContent =`[${current}/${max}KM]`;

      if (current >= max) {
        status.textContent = "✔️";
        status2.textContent = "[Complete]";
        currentReward.set(1);
      }
      if (current >= 2*max) {
        status.textContent = "👑";
        status2.textContent = "[Complete]";
        currentReward.set(2);
      }
      if (current == 0) {
        status.textContent = "❌";
        status2.textContent = "[Incomplete]";
      }
      dailyReward();

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
    

checkDateOnFocus();
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
      console.log("todia")
      if(localStorage.claimedReward){
        claimedReward = Number(localStorage.claimedReward);
        console.log("claimed",claimedReward)
      }
    } else {
    claimedReward = 0;
    localStorage.claimedReward = 0;
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

// Run again every time the tab gains focus
window.addEventListener("focus", checkDateOnFocus);

//#endregion

//#region Progress bars
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var rewardCheckPoints = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
var gottenGym = 0;
var gottenAlcohol = 0;
var gottenDiet = 0;

var gymCounter = 0;
var alcoholCounter = 0;
var dietCounter = 0;

function addProgress(key, counter, progress) {
    let current;
    let gottenCount;
    switch(key){
        case "gym":
            gymCounter += 1;
            localStorage.gymCounter = gymCounter;
            current = gymCounter;
            gottenCount = gottenGym;
            break;
        case "alcohol":
            alcoholCounter += 1;
            localStorage.alcoholCounter = alcoholCounter;
            current = alcoholCounter;
            gottenCount = gottenAlcohol;
            break;
        case "diet":
            dietCounter +=1;
            localStorage.dietCounter = dietCounter;
            current = dietCounter;
            gottenCount = gottenDiet;
            break;
    }
counter.textContent = ` ${current}/${Math.floor(current/10 + 1)*10} Days`;
progress.style.width = `${current / Math.floor(current/10 + 1) * 10}%`

if(rewardCheckPoints.includes(current) &&  current > gottenCount){
    changeCurrencies(0, 100, 1);
    switch(key){
        case "gym":
            localStorage.gottenGym = current;
            break;
        case "alcohol":
            localStorage.gottenAlcohol = current;
            break;
        case "diet":
            localStorage.gottenDiet = current;
            break;
    }
}
}
function resetProgress(key, counter, progress){
    console.log("reset!")
    switch(key){
        case "gym":
            gymCounter = 0;
            localStorage.gymCounter = gymCounter;
            break;
        case "alcohol":
            alcoholCounter = 0;
            localStorage.alcoholCounter = alcoholCounter;
            break;
        case "diet":
            dietCounter = 0;
            localStorage.dietCounter = dietCounter;
            break;
    }
counter.textContent = ` 0/10 Days`;
progress.style.width = `0%`
}

if(localStorage.gottenGym){
    gottenGym = localStorage.gottenGym;
}
if(localStorage.gottenAlcohol){
    gottenAlcohol = localStorage.gottenAlcohol;
}
if(localStorage.gottenDiet){
    gottenDiet = localStorage.gottenDiet;
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

//haldes adding hold event listeners
function AddHoldEvent(element, callback, duration = 750) {
    let pressTimer;

    const start = () => {
        console.log("started")
      pressTimer = setTimeout(() => {
        console.log("called")
        callback();
      }, duration);
    };

    const cancel = () => {
        console.log("ended")
      clearTimeout(pressTimer);
    };

    // Touch events
    element.addEventListener("touchstart", start);
    element.addEventListener("touchend", cancel);

    // Mouse events
    element.addEventListener("mousedown", start);
    element.addEventListener("mouseup", cancel);
    element.addEventListener("mouseleave", cancel);
}

AddHoldEvent(document.getElementById("gym"), () =>resetProgress('gym', document.getElementById('gymCounter'), document.getElementById('gymProgress')))
AddHoldEvent(document.getElementById("alcohol"), () =>resetProgress('alcohol', document.getElementById('alcoholCounter'), document.getElementById('alcoholProgress')))
AddHoldEvent(document.getElementById("diet"), () =>resetProgress('diet', document.getElementById('dietCounter'), document.getElementById('dietProgress')))
//#endregion

//#region Weather
loadWeatherData();
window.addEventListener('focus', loadWeatherData());
function loadWeatherData(){
    $("#weatherTable tr").remove(); 
    const url = 'https://opendata.fmi.fi/wfs?service=WFS&version=2.0.0&request=getFeature&storedquery_id=fmi::forecast::harmonie::surface::point::simple&place=helsinki&' + new Date().getTime();
    document.getElementById("uvImage").src = "https://cdn.fmi.fi/apps/global-ultraviolet-index/plot.php?location=helsinki&lang=fi&day=0"+ new Date().getTime()
    fetch(url)
      .then(res => res.text())
      .then(xmlText => {
        const temperatureData = [];
        const precipitationAmount = [];
        const cloudCover = [];
        const windSpeed = [];
  
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
          if (member.includes('<BsWfs:ParameterName>PrecipitationAmount</BsWfs:ParameterName>')) {
            const valueMatch = /<BsWfs:ParameterValue>(.*?)<\/BsWfs:ParameterValue>/i.exec(member);
            if (valueMatch) {
              const value = valueMatch[1];
              precipitationAmount.push(value);
            }
          }
          if (member.includes('<BsWfs:ParameterName>TotalCloudCover</BsWfs:ParameterName>')) {
            const valueMatch = /<BsWfs:ParameterValue>(.*?)<\/BsWfs:ParameterValue>/i.exec(member);
            if (valueMatch) {
              const value = valueMatch[1];
              cloudCover.push(value);
            }
          }
          if (member.includes('<BsWfs:ParameterName>WindSpeedMS</BsWfs:ParameterName>')) {
            const valueMatch = /<BsWfs:ParameterValue>(.*?)<\/BsWfs:ParameterValue>/i.exec(member);
            if (valueMatch) {
              const value = valueMatch[1];
              windSpeed.push(value);
            }
          }

        }
          const table = document.getElementById("weatherTable");
          for(i = 0; i < temperatureData.length; i++){
                var rowI = table.insertRow(-1);
                
              var cellTime = rowI.insertCell(0);
              var cellWeather = rowI.insertCell(1);
              var cellCloud = rowI.insertCell(2);
              var cellWind = rowI.insertCell(3);
              var cellwater = rowI.insertCell(4);
              cellwater.innerHTML = Math.max(0, precipitationAmount[i+1]-precipitationAmount[i]).toFixed(1) + " mm";
              cellWind.innerHTML = Math.round(windSpeed[i]) + ' m/s';
              cellTime.innerHTML = temperatureData[i].time + ":00";
              cellWeather.innerHTML = Math.round(temperatureData[i].value) + "°";
              var img = document.createElement("img");
              img.style.width = "20px"
              img.style.position = "absolute";
              img.style.transform = "translate(-50%, -50%)";
              
                console.log(precipitationAmount[i+1]-precipitationAmount[i])
                if(precipitationAmount[i+1]-precipitationAmount[i] < 0.1){
                    if(cloudCover[i] < 1/8*100){
                        img.src = "./Images/0.svg";
                    }
                    else if(cloudCover[i] < 3/8*100){
                        img.src = "./Images/1.svg";
                    }
                    else if(cloudCover[i] < 5/8*100){
                        img.src = "./Images/2.svg";
                    }
                    else if(cloudCover[i] < 7/8*100){
                        img.src = "./Images/3.svg";
                    }
                    else{
                        img.src = "./Images/4.svg";
                    }
                }
                else if(precipitationAmount[i+1]-precipitationAmount[i] < 0.25){
                    if(cloudCover[i] < 5/8*100){
                        img.src = "./Images/20.svg";
                    }
                    else if(cloudCover[i] < 7/8*100){
                        img.src = "./Images/30.svg";
                    }
                    else{
                        img.src = "./Images/40.svg";
                    }
                }
                else if(precipitationAmount[i+1]-precipitationAmount[i] < 1){
                    if(cloudCover[i] < 5/8*100){
                        img.src = "./Images/21.svg";
                    }
                    else if(cloudCover[i] < 7/8*100){
                        img.src = "./Images/31.svg";
                    }
                    else{
                        img.src = "./Images/41.svg";
                    }
                }
                else{
                    if(cloudCover[i] < 5/8){
                        img.src = "./Images/22.svg";
                    }
                    else if(cloudCover[i] < 7/8){
                        img.src = "./Images/32.svg";
                    }
                    else{
                        img.src = "./Images/42.svg";
                    }
                }

                cellCloud.appendChild(img)
              cellWeather.classList.add("redWeather");
                cellTime.classList.add("blueWeather")
          }
          document.getElementById("weatherButton").innerHTML = document.getElementById("weatherTable").rows[0].cells[1].textContent + '<i class="fa-solid fa-temperature-three-quarters"></i>'
      })
      .catch(err => {
        console.error('Error:', err.message);
      });
  };
  
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
    loadWeatherData();
    document.getElementById("WeatherContainer").style.display = "block";
}
//#endregion Weather
