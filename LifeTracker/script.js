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
let gems = 0;
if(localStorage.gems){
    gems = Number(localStorage.gems);
}
console.log(diamonds);
document.getElementById("xpProgress").style.width = xp / (2 + level*2);
document.getElementById("xpNumber").innerHTML = `${xp}/${200 + level*200}`;
document.getElementById("xpProgress").style.width = Math.round(xp / (2 + level*2)) +"%";
document.getElementById("xpNumber").innerHTML = `${xp}/${200 + level*200}`;
document.getElementById("xpText").innerHTML = level;
document.getElementById("orbsText").innerHTML = orbs + '<img src="./Images/ManaOrbs.png" width="20px">';
document.getElementById("diamondsText").innerHTML = diamonds +'<img src="./Images/Diamond.png" width="20px">';
document.getElementById("gemsText").innerHTML = gems +'<img src="./Images/gem.png" width="20px">';


function giveGem(gemsDelta){
    gems = gems + gemsDelta;
        localStorage.gems = gems;
        document.getElementById("gemsText").innerHTML = gems +'<img src="./Images/gem.png" width="20px">';
}

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
        giveGem(1);
        
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


//#region Chest Drop

function DropChestWith(diamondsChest, orbsChest, xpChest, gemsChest) {
    document.getElementById("rewardDiv").style.display = "block";
    let dropText = "";
    if(xpChest != 0){
        dropText += `+${xpChest}<img src="./Images/xp.png" width="20px">&nbsp`;
    }
    if(orbsChest != 0){
        dropText += `+${orbsChest}<img src="./Images/ManaOrbs.png" width="20px">&nbsp`;
    }
    if(diamondsChest != 0){
        dropText += `+${diamondsChest}<img src="./Images/Diamond.png" width="20px">&nbsp`;
    }
    if(gemsChest != 0){
        dropText += `+${gemsChest}<img src="./Images/gem.png" width="20px">&nbsp`;
    }
    let chest = document.getElementById("chestDiv");
    chest.classList.add("chestAnimate");

    chest.addEventListener('animationend', () => {
        
        chest.innerHTML = `<img src="./Images/goldChestOpen.png" width="100px"></img>`;
        document.getElementById("chestRewardText").innerHTML = dropText;
        (document.getElementById("chestRewardButton")).onclick = function() {
            
            chest.classList.remove("chestAnimate");
            chest.innerHTML = `<img src="./Images/goldChest.png" width="100px"></img>`;
            document.getElementById("chestRewardText").innerHTML = "";
            document.getElementById("rewardDiv").style.display = "none";

            changeCurrencies(xpChest, orbsChest, diamondsChest);
            giveGem(gemsChest);
        }
    });
    
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
        DropChestWith(0,100,100,0);
        claimedReward = 1;
        localStorage.claimedReward = 1;
        console.log("def",claimedReward)
        return;
    }
    else if(claimedReward == 1 && bikeReward == 2 && pushReward == 2 && sitReward == 2 && squatReward == 2){
        DropChestWith(1,100,100,0)
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
var gottenPiano = 0;

var gymCounter = 0;
var alcoholCounter = 0;
var dietCounter = 0;
var pianoCounter = 0;

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
        case "piano":
            pianoCounter +=1;
            localStorage.pianoCounter = pianoCounter;
            current = pianoCounter;
            gottenCount = gottenPiano;
            break;
    }
counter.textContent = ` ${current}/${Math.floor(current/10 + 1)*10} Days`;
progress.style.width = `${current / Math.floor(current/10 + 1) * 10}%`

if(rewardCheckPoints.includes(current) &&  current > gottenCount){
    DropChestWith(1,0,0,0);
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
        case "piano":
            localStorage.gottenPiano = current;
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
        case "piano":
            pianoCounter = 0;
            localStorage.pianoCounter = pianoCounter;
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
if(localStorage.gottenPiano){
    gottenPiano = localStorage.gottenPiano;
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
if(localStorage.pianoCounter){
    pianoCounter = localStorage.pianoCounter -1;
    document.getElementById("piano").click();
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
AddHoldEvent(document.getElementById("piano"), () =>resetProgress('piano', document.getElementById('pianoCounter'), document.getElementById('pianoProgress')))
//#endregion

//#region Weather
loadWeatherData();
window.addEventListener('focus', loadWeatherData());
function loadWeatherData(){
    findPeakUV("https://cdn.fmi.fi/apps/global-ultraviolet-index/plot.php?location=helsinki&lang=fi&day=0&" + new Date().getTime());
    document.getElementById("timeRise").innerText = getSunriseSunsetForToday()[0];
    document.getElementById("timeSet").innerText = getSunriseSunsetForToday()[1];
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
              var sunset = isSunUp(getSunriseSunsetForToday(), Number(temperatureData[i].time)); 
                console.log(precipitationAmount[i+1]-precipitationAmount[i])
                if(precipitationAmount[i+1]-precipitationAmount[i] < 0.1){
                    if(cloudCover[i] < 1/8*100){
                        if(sunset) {
                        img.src = "./Images/0.svg";
                        }
                        else{
                            img.src = "./Images/0d.svg";
                        }
                    }
                    else if(cloudCover[i] < 3/8*100){
                        if(sunset) {
                        img.src = "./Images/1.svg";
                        }
                        else{
                            img.src = "./Images/1d.svg";
                        }
                    }
                    else if(cloudCover[i] < 5/8*100){
                        if(sunset) {
                        img.src = "./Images/2.svg";
                        }
                        else{
                            img.src = "./Images/2d.svg";
                        }
                    }
                    else if(cloudCover[i] < 7/8*100){
                        if(sunset) {
                        img.src = "./Images/3.svg";
                        }
                        else{
                            img.src = "./Images/3d.svg";
                        }
                    }
                    else{
                        
                        img.src = "./Images/4.svg";
                        
                    }
                }
                else if(precipitationAmount[i+1]-precipitationAmount[i] < 0.25){
                    img.style.background = "#E5EDFF";
                    if(cloudCover[i] < 5/8*100){
                        if(sunrise){
                        img.src = "./Images/20.svg";
                        }
                        else{
                            img.src = "./Images/20d.svg";
                        }
                    }
                    else if(cloudCover[i] < 7/8*100){
                        if(sunrise){
                        img.src = "./Images/30.svg";
                        }
                        else{
                            img.src = "./Images/30d.svg";
                        }
                    }
                    else{
                        img.src = "./Images/40.svg";
                    }
                }
                else if(precipitationAmount[i+1]-precipitationAmount[i] < 1){
                    img.style.background = "#CCDBFF";
                    if(cloudCover[i] < 5/8*100){
                        if(sunrise){
                        img.src = "./Images/21.svg";
                        }
                        else{
                            img.src = "./Images/21d.svg";
                        }
                    }
                    
                    else if(cloudCover[i] < 7/8*100){
                        if(sunrise){
                        img.src = "./Images/31.svg";
                        }
                        else{
                            img.src = "./Images/31d.svg";
                        }
                    }
                    else{
                        img.src = "./Images/41.svg";
                    }
                }
                else{
                    img.style.background = "#99B8FF";
                    if(cloudCover[i] < 5/8){
                        if(sunrise){
                        img.src = "./Images/22.svg";
                        }
                        else{
                            img.src = "./Images/22d.svg";
                        }
                    }
                    else if(cloudCover[i] < 7/8){
                        if(sunrise){
                        img.src = "./Images/32.svg";
                        }
                        else{
                            img.src = "./Images/32d.svg";
                        }
                    }
                    else{
                        img.src = "./Images/42.svg";
                    }
                }
                
                
                
                img.style.paddingLeft = "10px";
                img.style.paddingRight = "10px";
                cellCloud.appendChild(img);
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

/**returns an array [sunrise, sunset] or null*/
function getSunriseSunsetForToday() {
    try {
        // Get current date (day of the year)
        const currentDate = new Date();
        const month = currentDate.getMonth();  // Month is 0-based (January is 0)
        const day = currentDate.getDate();  // Day of the month

        // Get the current month name
        const monthNames = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        const currentMonth = monthNames[month];

        // Find the corresponding date in the sunrises data
        const currentDayData = sunrises[currentMonth]?.find(entry => entry.day === day);

        if (currentDayData) {
            // Return an array with [sunrise, sunset] times
            return [currentDayData.sunrise, currentDayData.sunset];
        } else {
            // Return null if no data is found for today
            return null;
        }
    } catch (error) {
        console.error('Error accessing the sunrises data:', error);
        return null; // Return null if there's an error
    }
}
/**get and array of two times and check if we are between those 2 */
function isSunUp([sunrise, sunset], timeHour = null) {
    if (!sunrise || !sunset) return false;

    const now = new Date();
    const checkTime = new Date(now);

    // Use provided hour if available
    if (typeof timeHour === 'number') {
        checkTime.setHours(timeHour, 0, 0, 0);
    }

    const [srHours, srMinutes] = sunrise.split(':').map(Number);
    const [ssHours, ssMinutes] = sunset.split(':').map(Number);

    const sunriseTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), srHours, srMinutes);
    const sunsetTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), ssHours, ssMinutes);

    return checkTime >= sunriseTime && checkTime <= sunsetTime;
}
console.log(getSunriseSunsetForToday(), isSunUp(getSunriseSunsetForToday()))
//#endregion Weather

// Mapping of colors for UV 1 to UV 17 (your preset colors)
const colorToUV = {
    "rgb(78,180,0)": 1,
    "rgb(160,206,0)": 2,
    "rgb(247,228,0)": 3,
    "rgb(248,182,0)": 4,
    "rgb(248,135,0)": 5,
    "rgb(248,89,0)": 6,
    "rgb(232,44,14)": 7,
    "rgb(216,0,29)": 8,
    "rgb(255,0,153)": 9,
    "rgb(181,76,255)": 10,
    "rgb(153,140,255)": 11,
    "rgb(133,120,235)": 12,
    "rgb(113,100,215)": 13,
    "rgb(93,80,195)": 14,
    "rgb(73,60,175)": 15,
    "rgb(53,40,155)": 16,
    "rgb(33,20,135)": 17
  };
const uvToColor = {
    0: "rgb(93, 93, 93)",
    1: "rgb(78,180,0)",
    2: "rgb(160,206,0)",
    3: "rgb(247,228,0)",
    4: "rgb(248,182,0)",
    5: "rgb(248,135,0)",
    6: "rgb(248,89,0)",
    7: "rgb(232,44,14)",
    8: "rgb(216,0,29)",
    9: "rgb(255,0,153)",
    10: "rgb(181,76,255)",
    11: "rgb(153,140,255)",
    12: "rgb(133,120,235)",
    13: "rgb(113,100,215)",
    14: "rgb(93,80,195)",
    15: "rgb(73,60,175)",
    16: "rgb(53,40,155)",
    17: "rgb(33,20,135)"
  };

function findPeakUV(imagePath) {
  const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

   
    const img = new Image();
    img.crossOrigin = 'Anonymous';        // allow CORS
    img.src = imagePath;                 // same origin now
    img.onload = () => {
      // draw onto canvas, then getImageData…
    };

    img.onload = function() {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      const width = canvas.width;
      const height = canvas.height;

      let peakUV = 0;  // Default UV 0 if no peak found
      let peakY = height;  // Start with the lowest possible Y-coordinate (no peak yet)
      let peakX = width;

      // Start scanning the image for UV 1-17 (ignore UV 0)
      
      for (let y = 0; y < height; y++) {
          
        for (let x = 0; x < width; x++) {
          const pixel = ctx.getImageData(x, y, 1, 1).data;
          const r = pixel[0];
          const g = pixel[1];
          const b = pixel[2];
          const color = `rgb(${r},${g},${b})`;

          // Skip black or white pixels
          if (color === "rgb(255,255,255)" || color === "rgb(0,0,0)") {
            continue;
          }

          // Check if the color matches a UV 1-17 color
          if (colorToUV[color]) {
            // If we find a valid UV color and it's at a higher position, update the peak
            if (y <= peakY && peakUV != colorToUV[color]) {
              peakY = y;
              peakX = x;
              peakUV = colorToUV[color];
            }
          }
        }
      }
      console.log(peakUV, mapPeakXToTime(peakX))
      document.getElementById("UvNumber").innerText = peakUV;
      document.getElementById("UvNumber").style.color = uvToColor[peakUV];
      document.getElementById("timeUv").innerText = mapPeakXToTime(peakX);
      canvas.width = 0;
      canvas.height = 0;
      canvas.remove(); 
      
    };

  }
function mapPeakXToTime(peakX) {
      // your linear map from px → hours
      const m = 4/63;
      const b = 1.73;
      const t = m * peakX + b;      // e.g. 9.95
    
      // split into whole hours and fractional part
      let hours   = Math.floor(t);                    
      let minutes = Math.round((t - hours) * 60);     
    
      // handle rounding up to the next hour
      if (minutes === 60) {
        minutes = 0;
        hours += 1;
      }
    
      // pad both to two digits
      const hh = String(hours).padStart(2, "0");
      const mm = String(minutes).padStart(2, "0");
    
      return `${hh}:${mm}`;
    }

//#region Buttons


const currentDate = new Date().toISOString().split('T')[0];

function checkButtonState(buttonId, buttonElement) {
    const storedData = localStorage.getItem(buttonId);
    if (storedData === currentDate) {
        buttonElement.disabled = true;
    }
    else{
        buttonElement.disabled = false;
    }
}

document.querySelectorAll('.dailyButton').forEach((button, index) => {
    checkButtonState(`button${index + 1}`, button);
});

const explosion = document.querySelector('.explosion');
function markButton(button, buttonId) {
    button.disabled = true;
    localStorage.setItem(buttonId, currentDate);
    console.log(button.getBoundingClientRect())
    if(buttonId == "button7"){
        DropChestWith(0,50,0,0);
    }

  // Get the position and size of the main div relative to its parent container
  const mainDivRect = button.getBoundingClientRect();
  const containerRect = button.parentElement.getBoundingClientRect(); // Container position

  // Calculate the relative position of the main div within the container
  const offsetTop = mainDivRect.top - containerRect.top;
  const offsetLeft = mainDivRect.left - containerRect.left;

  // Set the overlay div on top of the main div
  explosion.style.top = `${offsetTop}px`;
  explosion.style.left = `${offsetLeft}px`;
  explosion.style.width = `${mainDivRect.width}px`;
  explosion.style.height = `${mainDivRect.height}px`;

    explosion.classList.add('exploding');
            setTimeout(() => {
                explosion.classList.remove('exploding');
                
            }, 3000);

}

function disableButtons(){
    document.getElementById("buttonContainer").style.display = "none";
}
function showButtons(){
    document.getElementById("buttonContainer").style.display = "flex";
}

window.addEventListener("focus", checkDateOnFocusButtons);
function checkDateOnFocusButtons(){
    document.querySelectorAll('.dailyButton').forEach((button, index) => {
        checkButtonState(`button${index + 1}`, button);
    });    
}


//#endregion


//#region Items

class MainItem {
    constructor(name, icon,  price, unlocked, lowers){
        this.name = name; 
        this.icon = icon;
        this.price = price;
        this.unlocked = unlocked;
        this.lowers = lowers;
        
    }
}
class ItemItself{
    constructor(name, icon,  price, unlocked, lowers){
        this.name = name; 
        this.icon = icon;
        this.price = price;
        this.unlocked = unlocked;
        this.lowers = lowers;
        
    }
}
class ItemVersion{
    constructor(name, icon, src, price, unlocked){
        this.name = name; 
        this.icon = icon;
        this.price = price;
        this.unlocked = unlocked;
        this.src = src;
    }
}

class Person{
    constructor(){
        this.pants = "./Images/me_images/pants/shorts/gray_shorts.png";
        this.feet = "./Images/me_images/feet/toes/toes.png";
        this.shirts = "";
        this.jackets = "";
        this.hair = "";
        this.hats = "";
    }
    applyToShop(){
        document.getElementById("pantsShop").src = this.pants;
         document.getElementById("feetShop").src = this.feet;
          document.getElementById("shirtsShop").src = this.shirts;
           document.getElementById("jacketsShop").src = this.jackets;
            document.getElementById("hairShop").src = this.hair;
             document.getElementById("hatsShop").src = this.hats;
    }
    applyToMe(){
        (document.getElementById("pants")).src = this.pants;
        (document.getElementById("feet")).src = this.feet;
        (document.getElementById("shirts")).src = this.shirts;
        (document.getElementById("jackets")).src = this.jackets;
        (document.getElementById("hair")).src = this.hair;
        (document.getElementById("hats")).src = this.hats;
    }
    savePerson(){
        localStorage.personpants = this.pants;
        localStorage.personfeet = this.feet;
        localStorage.personshirts = this.shirts;
        localStorage.personjackets = this.jackets;
        localStorage.personhair = this.hair;
        localStorage.personhats = this.hats;
    }
    loadPerson(){
        if(localStorage.personpants){this.pants = localStorage.personpants}else{this.pants = "./Images/me_images/pants/shorts/gray_shorts.png"};
        if(localStorage.personfeet ){this.feet= localStorage.personfeet}else{this.feet = "./Images/me_images/feet/toes/toes.png"};
        if(localStorage.personshirts ){ this.shirts= localStorage.personshirts}else{this.shirts = ""};
        if(localStorage.personjackets ){this.jackets= localStorage.personjackets}else{this.jackets = ""};
        if(localStorage.personhair ){ this.hair= localStorage.personhair}else{this.hair = ""};
        if(localStorage.personhats ){ this.hats= localStorage.personhats}else{this.hats = ""};
    }
    changeItem(ItemName, newSrc){
        switch(ItemName){
            case "pants": this.pants = newSrc;break;
            case "feet": this.feet = newSrc;break;
            case "shirts": this.shirts = newSrc;break;
            case "jackets": this.jackets = newSrc;break;
            case "hair": this.hair = newSrc;break;
            case "hats": this.hats = newSrc;break;
        }
    }
}
const shopPerson = new Person();
shopPerson.loadPerson();
shopPerson.applyToShop();
shopPerson.applyToMe();

const shirts = new MainItem("shirts", "./Images/me_images/shirts_icon.png",  [0,0,5], false, [
    new ItemItself("NoShirt", "./Images/me_images/0_icon.png", [0,0,0], true, [
        new ItemVersion("noShirtVersion", "./Images/me_images/0_icon.png","", [0,0,0], true)
    ]),
    new ItemItself("T-shirts", "./Images/me_images/shirts/Tshirts_icon.png", [0,0,0], true, [
        new ItemVersion("red color", "./Images/me_images/shirts/Tshirts/Tshirt_red_icon.png","./Images/me_images/shirts/Tshirts/Tshirt_red.png", [0,0,0], true),
        new ItemVersion("gray color", "./Images/me_images/shirts/Tshirts/Tshirt_gray_icon.png", "./Images/me_images/shirts/Tshirts/Tshirt_gray.png", [500,0,0], false),
        new ItemVersion("green color", "./Images/me_images/shirts/Tshirts/Tshirt_green_icon.png", "./Images/me_images/shirts/Tshirts/Tshirt_green.png", [500,0,0], false),
        new ItemVersion("blue color", "./Images/me_images/shirts/Tshirts/Tshirt_blue_icon.png", "./Images/me_images/shirts/Tshirts/Tshirt_blue.png", [500,0,0], false),
        new ItemVersion("black color", "./Images/me_images/shirts/Tshirts/Tshirt_black_icon.png", "./Images/me_images/shirts/Tshirts/Tshirt_black.png", [500,0,0], false),
        new ItemVersion("pink color", "./Images/me_images/shirts/Tshirts/Tshirt_pink_icon.png", "./Images/me_images/shirts/Tshirts/Tshirt_pink.png", [500,0,0], false),
        new ItemVersion("white color", "./Images/me_images/shirts/Tshirts/Tshirt_white_icon.png", "./Images/me_images/shirts/Tshirts/Tshirt_white.png", [500,0,0], false),
        new ItemVersion("sakura style", "./Images/me_images/shirts/Tshirts/Tshirt_sakura_icon.png", "./Images/me_images/shirts/Tshirts/Tshirt_sakura.png", [1000,5,0], false),
        new ItemVersion("anime style", "./Images/me_images/shirts/Tshirts/Tshirt_anime_icon.png", "./Images/me_images/shirts/Tshirts/Tshirt_anime.png", [1000,5,0], false),

    ]
    )
]
);
const pants = new MainItem("pants", "./Images/me_images/pants_icon.png", [0,0,5], true, [
    new ItemItself("shorts", "./Images/me_images/pants/shorts_icon.png", [0,0,5], true, [
        new ItemVersion("gray color", "./Images/me_images/pants/shorts/gray_shorts_icon.png", "./Images/me_images/pants/shorts/gray_shorts.png", [0,0,0], true)
    ])
])
const jackets = new MainItem("jackets", "./Images/me_images/jackets_icon.png", [0,0,5], false, [
    new ItemItself("noJacket", "./Images/me_images/0_icon.png", [0,0,0], true, [
        new ItemVersion("noJacketLow", "./Images/me_images/0_icon.png", "",[0,0,0], true)
    ]),
    new ItemItself("flanels", "./Images/me_images/jackets/flanel_icon.png", [0,0,0], true, [
        new ItemVersion("Buffalo check", "./Images/me_images/jackets/flanel/jacket_flanel_icon.png", "./Images/me_images/jackets/flanel/jacket_flanel.png", [0,0,0], true)
    ])
])
const feet = new MainItem("feet", "./Images/me_images/feet_icon.png", [0,0,5], false, [
    new ItemItself("toes", "./Images/me_images/0_icon.png", [0,0,0], true, [
        new ItemVersion("toesLow", "./Images/me_images/0_icon.png", "./Images/me_images/feet/toes/toes.png",[0,0,0],true)
    ]),
    new ItemItself("shoes", "./Images/me_images/feet_icon.png", [0,0,0], true, [
        new ItemVersion("brown shoes", "./Images/me_images/feet_icon.png","./Images/me_images/feet/shoes_standard/shoes_brown.png",[0,0,0],true)
    ])
])
const hair = new MainItem("hair", "./images/me_images/hair_icon.png", [0,0,5],false, [
    new ItemItself("noHair", "./Images/me_images/0_icon.png", [0,0,0], true, [
        new ItemVersion("noHairLow", "./Images/me_images/0_icon.png", "",[0,0,0], true)
    ]),
    new ItemItself("long hair", "./images/me_images/hair_icon.png", [0,0,0], true, [
        new ItemVersion("brown color", "./images/me_images/hairs/hair_long/hair_long_brown_icon.png", "./images/me_images/hairs/hair_long/hair_long_brown.png", [500,0,0], true),
        new ItemVersion("black color", "./images/me_images/hairs/hair_long/hair_long_black_icon.png", "./images/me_images/hairs/hair_long/hair_long_black.png", [500,0,0], false),
        new ItemVersion("blue color", "./images/me_images/hairs/hair_long/hair_long_blue_icon.png", "./images/me_images/hairs/hair_long/hair_long_blue.png", [500,0,0], false),
        new ItemVersion("gray color", "./images/me_images/hairs/hair_long/hair_long_gray_icon.png", "./images/me_images/hairs/hair_long/hair_long_gray.png", [500,0,0], false),
        new ItemVersion("pink color", "./images/me_images/hairs/hair_long/hair_long_pink_icon.png", "./images/me_images/hairs/hair_long/hair_long_pink.png", [500,0,0], false),
        new ItemVersion("purple color", "./images/me_images/hairs/hair_long/hair_long_purple_icon.png", "./images/me_images/hairs/hair_long/hair_long_purple.png", [500,0,0], false),
        new ItemVersion("white color", "./images/me_images/hairs/hair_long/hair_long_white_icon.png", "./images/me_images/hairs/hair_long/hair_long_white.png", [500,0,0], false),
        new ItemVersion("yellow color", "./images/me_images/hairs/hair_long/hair_long_yellow_icon.png", "./images/me_images/hairs/hair_long/hair_long_yellow.png", [500,0,0], false),
        new ItemVersion("rainbow style", "./images/me_images/hairs/hair_long/hair_long_rainbow_icon.png", "./images/me_images/hairs/hair_long/hair_long_rainbow.png", [500,5,0], false),
        new ItemVersion("star style", "./images/me_images/hairs/hair_long/hair_long_star_icon.png", "./images/me_images/hairs/hair_long/hair_long_star.png", [500,5,0], false),
    ])
])
const hats = new MainItem("hats", "./Images/me_images/hats_icon.png", [0,0,5], false, [
    new ItemItself("nohat", "./Images/me_images/0_icon.png", [0,0,0], true, [
        new ItemVersion("nohatLow", "./Images/me_images/0_icon.png", "",[0,0,0], true)
    ]),
    new ItemItself("caps", "./Images/me_images/hats/caps_icon.png", [0,0,0], true, [
        new ItemVersion("gray cap", "./Images/me_images/shirts/Tshirts/Tshirt_gray_icon.png","./Images/me_images/hats/caps/cap_gray.png",[0,0,0],true)
    ])
])


const mainItems = [shirts, pants, jackets, feet, hair, hats];


function openSubShop(subShopdiv, buttonClicked) {

    if(buttonClicked.classList.contains("selected")){
        buttonClicked.classList.remove("selected")
    }

    if(subShopdiv.style.display === "block"){
        subShopdiv.classList.remove("open")
        subShopdiv.classList.add("close")
        setTimeout(() => {
            subShopdiv.style.display = "none";
        }, 100); // 100 milliseconds = 0.1 seconds
        return;
    }
    subShopdiv.classList.remove("close")
    subShopdiv.classList.add("open")

    Array.from(document.getElementsByClassName("subShop")).forEach((i) => i.style.display = "none")
    subShopdiv.style.display = "block"

    Array.from(document.getElementsByClassName("mainItemButton")).forEach((i) => i.classList.remove("selected"))
    buttonClicked.classList.add("selected")
}

function openItemShop(itemShopdiv, buttonClicked){
    if(buttonClicked.classList.contains("selected2")){
        buttonClicked.classList.remove("selected2")
    }
    if(itemShopdiv.style.display === "block"){
        itemShopdiv.classList.remove("open")
        itemShopdiv.classList.add("close")
        setTimeout(() => {
            itemShopdiv.style.display = "none";
        }, 100); // 100 milliseconds = 0.1 seconds

        return;
    }

    itemShopdiv.classList.remove("close")
    itemShopdiv.classList.add("open")


    Array.from(itemShopdiv.parentElement.getElementsByTagName("button")).forEach(i => i.classList.remove("selected2"))
    buttonClicked.classList.add("selected2")
    

    Array.from(document.getElementsByClassName("itemShop")).forEach((i) => i.style.display = "none")
    itemShopdiv.style.display = "block"


}

function openVersionShop(clothingItem, itemMainName, itemButtonArray, theButton){
    itemButtonArray.forEach((i) => i.classList.remove("selected3"));
    theButton.classList.add("selected3")

    let clothImg;
    switch(itemMainName){
        case "shirts": clothImg = document.getElementById("shirtsShop");break;
        case "pants": clothImg = document.getElementById("pantsShop");break;
        case "jackets": clothImg = document.getElementById("jacketsShop");break;
        case "feet": clothImg = document.getElementById("feetShop");break;
        case "hair": clothImg = document.getElementById("hairShop");break;
        case "hats": clothImg = document.getElementById("hatsShop");break;
    }
    shopPerson.changeItem(itemMainName, clothingItem.src);
    clothImg.src = clothingItem.src;
    document.getElementById("skinContainerShopID").style.filter = "drop-shadow(  3px  0px 0 black)drop-shadow(  -3px  0px 0 black)drop-shadow(  0px  3px 0 black)drop-shadow(  0px  -3px 0 black)";
}
function openBuyShopWithItem(theItem, localName, theItemButton){
    document.getElementById("shopUnlock").style.display = "flex";
    document.getElementById("buyName").innerText = theItem.name;
    document.getElementById("buyPrice").innerHTML = "";
    document.getElementById("buyPrice").innerHTML = priceToStringFromArray(theItem.price);
    document.getElementById("buyImg").src = theItem.icon;

    let buyButton = document.getElementById("buyButton");
    if(canAfford(theItem.price)){
        buyButton.disabled = false;
        buyButton.innerHTML ="BUY"

        buyButton.onclick = () => {
            theItemButton.style.background = "url('"+ theItem.icon + "') no-repeat center / cover, #f0f9f6";
            theItem.unlocked = true;
            buyButton.innerHTML = "BOUGHT"
            localStorage.setItem(localName, "1");
            changeCurrencies(0,-theItem.price[0], -theItem.price[1]);
            giveGem(-theItem.price[2]);
            
        }
    }
    else{
        buyButton.onclick = () => {};
        buyButton.disabled = true;
        buyButton.innerHTML = '<img src="./Images/lock_icon.png"></img>'
    }
    
}
document.getElementById("buyCancel").onclick = () => {
    document.getElementById("shopUnlock").style.display = "none";
}

function buyMainItem(mainItem){

}

function priceToStringFromArray(array){
    let priceText = "for: ";
    if(array[0] != 0){priceText += (array[0] +' <img src="./Images/ManaOrbs.png"> ')};
    if(array[1] != 0){priceText += (array[1] +' <img src="./Images/Diamond.png"> ')};
    if(array[2] != 0){priceText += (array[2] +' <img src="./Images/gem.png""> ')};
    return priceText;
}
function canAfford(price){
    if((orbs >= price[0]) && (diamonds >= price[1]) && (gems >= price[2])){
        return true;
    }else{
        return false;
    }
}
//document.getElementById("button111").addEventListener('click', () => {
//    openSubShop(document.getElementById("subShop1"))
//})
//document.getElementById("button222").addEventListener('click', () => {
//    openSubShop(document.getElementById("itemShop1"))
//})
const shop = document.getElementById("shopDiv");
mainItems.forEach((item) =>{
    if(localStorage.getItem(item.name) == "1"){
                item.unlocked = true;
            }
    //create the button and its subshop
    let newSubShop = document.createElement('div');
    newSubShop.className = "subShop";

    let newButton = document.createElement('button');
    newButton.onclick = () => {
        if(item.unlocked){    
            openSubShop(newSubShop, newButton)
        } else{
            openBuyShopWithItem(item, item.name, newButton);
        }
    };
    newButton.style.background = (item.unlocked ? "" : "url('./Images/lock_icon.png') no-repeat center / cover,") + "url('"+ item.icon + "') no-repeat center / cover, #f0f9f6";
    newButton.classList.add("mainItemButton")
    

    shop.appendChild(newButton);
    shop.appendChild(newSubShop);

    //fill the subshop
    item.lowers.forEach((item2) => {
        if(localStorage.getItem(item.name + item2.name) == "1"){
                item2.unlocked = true;
            }
        let newItemShop = document.createElement('div');
        newItemShop.className = "itemShop";

        let newSubButton = document.createElement('button');
        newSubButton.onclick = () => {
            if(item2.unlocked){  
                openItemShop(newItemShop ,newSubButton);
            }else{
                openBuyShopWithItem(item2, item.name + item2.name, newSubButton);
            }

        };
        newSubButton.style.background = (item2.unlocked ? "" : "url('./Images/lock_icon.png') no-repeat center / cover,") +"url('"+ item2.icon + "') no-repeat center / cover, #f0f9f6";

        newSubShop.appendChild(newSubButton);
        newSubShop.appendChild(newItemShop);

        item2.lowers.forEach((item3) => {
            if(localStorage.getItem(item.name + item2.name + item3.name) == "1"){
                item3.unlocked = true;
            }

            let newItemButton = document.createElement('button');
            newItemButton.style.background = (item3.unlocked ? "" : "url('./Images/lock_icon.png') no-repeat center / cover,") +"url('"+ item3.icon + "') no-repeat center / cover, #f0f9f6";
            newItemButton.onclick = () => {
                if(item3.unlocked){
                    openVersionShop(item3, item.name, Array.from(newSubShop.getElementsByTagName("button")), newItemButton);
                }else{
                    openBuyShopWithItem(item3, item.name + item2.name + item3.name, newItemButton);
                }};

            newItemShop.appendChild(newItemButton);
        })
    })

})

//buttons back done
document.getElementById("backButton").addEventListener("click", () => {
    document.getElementById("shopID").style.display = "none";
    shopPerson.loadPerson();
    shopPerson.applyToShop();
});

document.getElementById("shopOpenButton").addEventListener("click", () => {
    document.getElementById("shopID").style.display = "block";
});

document.getElementById("doneButton").addEventListener("click", () => {
    shopPerson.applyToMe();
    shopPerson.savePerson();
    document.getElementById("shopID").style.display = "none";
});