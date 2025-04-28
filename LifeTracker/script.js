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
        changeCurrencies(0,500,0);
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