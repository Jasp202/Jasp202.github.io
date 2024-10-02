// The scripts to make the wheel work are generally implemented here with some exceptions implemented in the html file with <script>; generally button pop-up functionality.
 
/* helper functions */ 	

const counterAdd = document.getElementById("shotSubmitOne");
const counterTextInput = document.getElementById("shotText");


document.getElementById("mySelect").addEventListener("change", function () {
    document.getElementById("selectImg").src = document.getElementById("mySelect").value;
});

counterAdd.addEventListener("click", function () {
    let added1 = counterTextInput.value;
    if (added1 == '') {
        document.getElementById("shotPopup").classList.remove("show");
        return void(0);
    }
    CreateNewDom();
    counterTextInput.value = '';
    document.getElementById("shotPopup").classList.remove("show");
});

document.getElementById("HeaderElement1").addEventListener("contextmenu", function(e){
    rightClick3(e);
});
document.getElementById("repeatButton").addEventListener('click', function() {
    document.getElementById("textE").innerHTML = e_disabled ? 'disabled' : 'none yet...';
    textE.style.fontSize =  "" + (2.8 * Math.min(1, 0.9*(32.0 / textE.innerText.length)))   + "rem";
    previous_environment = "";
});

var functionName = 0;
// funtion to create a new shot counter and append it to the shotclass cointainer keeps localstorage updated
function CreateNewDom() {

    const node = document.getElementById("shotButton1");
    const clone = node.cloneNode(true);
    clone.id = "newID";
    clone.style.position = "relative";
    clone.style.opacity = "1.0";
    clone.style.background = "none";
    clone.style.border = "none";
    clone.style.padding = "0";
    clone.style.display = "table-cell"
    clone.style.verticalAlign = "top";
    clone.getElementsByTagName('div')[0].innerHTML = counterTextInput.value;
    clone.getElementsByTagName('div')[0].style.width = "100px";
    clone.getElementsByTagName('img')[0].src = document.getElementById("mySelect").value;
    clone.getElementsByTagName('img')[0].style.height = "129px";

    clone.addEventListener('mouseover', function () {
        
        this.style.filter = "drop-shadow(0 0 0.75rem rgb(255, 217, 0))";
        this.style.transition = "all 0.1s ease";
        
      });
      clone.addEventListener('mouseout', function () {
        
        this.style.filter = "";
      });

      clone.addEventListener('click', function () {
        let old1 = clone.getElementsByTagName('div')[1].innerHTML;
        let new1 = parseInt(old1) + 1;
        clone.getElementsByTagName('div')[1].innerHTML = new1; 
        dataShots.counts[dataShots.names.indexOf(clone.getElementsByTagName('div')[0].innerHTML)] = new1;
        localStorage.dataShots = JSON.stringify(dataShots);

        //focus out of shotcounter
        spinBtn.focus();
      });

        clone.addEventListener("contextmenu", function(e) {
            const flagClick = rightClick(e);

            if (flagClick == true){
            const trash = document.getElementById("trashButton")
            trash.addEventListener('click', function () {
            let index = dataShots.names.indexOf(clone.getElementsByTagName('div')[0].innerHTML);
            dataShots.names.splice(index, 1);
            dataShots.counts.splice(index, 1);
            dataShots.images.splice(index, 1);
            localStorage.dataShots = JSON.stringify(dataShots);
            document.getElementById("shotClass").removeChild(clone);
            img.remove();
            });

            const remove = document.getElementById("removeButton")
            remove.addEventListener('click', function () {
                let old1 = clone.getElementsByTagName('div')[1].innerHTML;
                let new1 = Math.max(parseInt(old1) - 1, 0);
                clone.getElementsByTagName('div')[1].innerHTML = new1; 
                dataShots.counts[dataShots.names.indexOf(clone.getElementsByTagName('div')[0].innerHTML)] = new1;
                localStorage.dataShots = JSON.stringify(dataShots);

            })
            const powerReset = document.getElementById("powerReset");
            powerReset.addEventListener('click', function () {
                img.src ="./Images/icons/power_icon_7.png";
                img.dataset.custom = "7";
            })
            ;}
        });
        
        
   document.getElementById("shotClass").appendChild(clone);
   let img = document.createElement('img');
    img.src ="./Images/icons/power_icon_7.png";
    img.style.height = "120px";
    img.style.width = "40px";
    img.id = `mapImage${functionName}`
    img.dataset.custom = "7";
    img.classList.add("powerImage");
    const nodeMap = document.getElementById("workmap");
    const cloneMap = nodeMap.cloneNode(true);
    document.body.appendChild(cloneMap);
    
    cloneMap.id = `workmap${functionName}`;
    var scriptElement = document.createElement('script');
    scriptElement.textContent = `
        function greetA${functionName}() {
            var imgU = document.getElementById("mapImage${functionName}");
            var int = parseInt(imgU.dataset.custom);
            if(int == 0 || int == 1 || int == 2 || int == 3){
                return;    
            }
            imgU.src = "./Images/icons/power_icon_" + (int - 4) +".png";
            imgU.dataset.custom = int - 4;
            
        }
        function greetB${functionName}() {
            var imgU = document.getElementById("mapImage${functionName}");
            var int = parseInt(imgU.dataset.custom);
            if(int == 0 || int == 1 || int == 4 || int == 5){
                return;    
            }
            
            imgU.src = "./Images/icons/power_icon_" + (int - 2) +".png";
            imgU.dataset.custom = int - 2;
            
        }
        function greetC${functionName}() {
            var imgU = document.getElementById("mapImage${functionName}");
            var int = parseInt(imgU.dataset.custom);
            if(int == 0 || int == 2 || int == 4 || int == 6){
                return;    
            }
            
            imgU.src = "./Images/icons/power_icon_" + (int - 1) +".png";
            imgU.dataset.custom = int - 1;
            
        }  
    `;
    
    document.body.appendChild(scriptElement);
    cloneMap.getElementsByTagName("area")[0].setAttribute("onclick", `greetA${functionName}()`);
    cloneMap.getElementsByTagName("area")[1].setAttribute("onclick", `greetB${functionName}()`);
    cloneMap.getElementsByTagName("area")[2].setAttribute("onclick", `greetC${functionName}()`);
    img.useMap = `#workmap${functionName}`;
    functionName = functionName + 1;
    if(localStorage.powersDisabled == "true"){
        img.style.display = "none";
    }
    
    document.getElementById("shotClass").appendChild(img);
   dataShots.names.push(counterTextInput.value);
   dataShots.counts.push(0);
   dataShots.images.push(document.getElementById("mySelect").value);
   localStorage.dataShots = JSON.stringify(dataShots);
    
   return clone;
}

function shotStorageChange(dataGiven) {
    localStorage.setItem("shotData", dataGiven);
}

function mod(n, m) {
    return ((n % m) + m) % m;
  }

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex > 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
};
function myFunction() {
    alert("Hello! I am an alert box!");
  }

function wheelSound(src, speed, vol) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.currentTime = 1.3;
        this.sound.playbackRate = 0.9 * speed;
        this.sound.volume = vol;
        this.sound.play();
    }
    this.stop = function(){
        this.sound.pause();
    }
}

function alarmSound(src, vol) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.currentTime = 0;
        this.sound.playbackRate = 1;
        this.sound.volume = vol;
        this.sound.play();
    }
    this.stop = function(){
        this.sound.pause();
    }
}


function change_wheel(wheeldata) {
    wheel_array = wheeldata.dares.concat(wheeldata.environments, wheeldata.wheel_changes);
    wheel_array = shuffle(wheel_array);
    dares_count = wheel_array.length;
    dares_sliced = wheel_array.map(x => x.slice(0,10) + '...');
    spinValues = wheel_array.map( (x, index) => Array( index / dares_count * 360,  (index + 1) / dares_count * 360, x, x.slice("")[0]));
    size = Array(dares_count).fill(10);
    switch(current_wheel) {
        case "no pain":
            document.getElementById("triangleCSS").style.borderTop = "55px solid " + "#2E86C1";
            spinColors = json_pain_free.colors;
            break;
        case "no enemies":
            document.getElementById("triangleCSS").style.borderTop = "55px solid " + '#B8C795';
            spinColors = json_no_enemies.colors;
            break;
        case "memes":
            document.getElementById("triangleCSS").style.borderTop = "55px solid " + '#2bdc4c';
            spinColors = json_memes.colors;
            break;
        case "vergipsycho":
            document.getElementById("triangleCSS").style.borderTop = "55px solid " + '#00ff9f';
            spinColors = json_vergi_psycho.colors;
            break;
        case "no sitting":
            document.getElementById("triangleCSS").style.borderTop = "55px solid " + "#447654";
            spinColors = json_no_sitting.colors;
            break;
        case "default":
            document.getElementById("triangleCSS").style.borderTop = "55px solid " + "#E74C3C";
            spinColors = json_default.colors;
            break;
        default:
            
    }

    BaseRotationDataLabels = Array.from({ length: dares_count }, (value, index) => 90 + index * 360 / dares_count );

    spinChart.destroy();
    document.getElementById("containerTest").style.maxWidth = "1000px"
    spinChart = new Chart(spinWheel, {
        plugins: [ChartDataLabels],
        type: "pie",
        rotation: 0,
        data: {
          labels: dares_sliced,
          datasets: [
            {
              backgroundColor: spinColors,
              data: size,
            },
          ],
        },
        options: {
            elements: {
                arc: {
                    borderWidth: 0
                }
            },
          rotation: 0,
          responsive: true,
          animation: { duration: 0 },
          plugins: {
            tooltip: false,
            legend: {
              display: false,
            },
            datalabels: {
              rotation: BaseRotationDataLabels,
              anchor: 'end',
              align: 'start',
              clamp: true,
              color: "#ffffff",
              formatter: (_, context) => context.chart.data.labels[context.dataIndex],
              font: { size: 15, weight: 'bold'},
            },
          },
        },
      });
      document.getElementById("containerTest").style.maxWidth = (current_wheel == "default") ? "24.37rem" : "34.37rem";
      spinImage.src = spinChart.toBase64Image();
      textWheelIcon.innerHTML = current_wheel;
}

function formatTime(time) {
    const minutes = Math.floor(time / 60);
    let seconds = time % 60;
  
    if (seconds < 10) {
      seconds = `0${seconds}`;
    }
  
    return `${minutes}:${seconds}`;
}
  
  
function calculateTimeFraction(timeLeftV, TIME_LIMITV) {
    const rawTimeFraction = timeLeftV / TIME_LIMITV;
    return rawTimeFraction - (1 / TIME_LIMITV) * (1 - rawTimeFraction);
}
 
// load dare sets from local storage or js file jsons
if(localStorage.defaultJSON){
    wheeldata_Default = JSON.parse(localStorage.defaultJSON)
}
else{
    wheeldata_Default = json_default;
}

if(localStorage.painJSON){
    wheeldata_Pain_Free = JSON.parse(localStorage.painJSON)
}
else{
    wheeldata_Pain_Free = json_pain_free;
}

if(localStorage.enemiesJSON){
    wheeldata_No_Enemies = JSON.parse(localStorage.enemiesJSON)
}
else{
    wheeldata_No_Enemies = json_no_enemies;
}

if(localStorage.vergiJSON){
    wheeldata_Vergi_psycho = JSON.parse(localStorage.vergiJSON)
}
else{
    wheeldata_Vergi_psycho = json_vergi_psycho;
}

if(localStorage.sittingJSON){
    wheeldata_No_Sitting = JSON.parse(localStorage.sittingJSON)
}
else{
    wheeldata_No_Sitting = json_no_sitting;
}

if(localStorage.memesJSON){
    wheeldata_Memes = JSON.parse(localStorage.memesJSON)
}
else{
    wheeldata_Memes = json_memes;
}

let wheel_array = wheeldata_Default.dares.concat(wheeldata_Default.environments, wheeldata_Default.wheel_changes);
wheel_array = shuffle(wheel_array);

let dares_count = wheel_array.length;
let dares_sliced = wheel_array.map(x => x.slice(0,10) + '...');

var dataShots = {
    names: [],
    counts: [],
    images: [],
};

if (localStorage.dataShots) {
    // there is something
    let dataShotsTemp = JSON.parse(localStorage.dataShots);
    localStorage.dataShots = JSON.stringify(dataShots);

    for (let i = 0; i < dataShotsTemp.names.length; i++){

        counterTextInput.value = dataShotsTemp.names[i];
        document.getElementById("mySelect").value = dataShotsTemp.images[i];
        let item = CreateNewDom();
        item.getElementsByTagName('div')[1].innerHTML = dataShotsTemp.counts[i];

        //set default settings back for shot creator
        counterTextInput.value = '';
        document.getElementById("mySelect").value = "./Images\icons/default_icon.png";
        document.getElementById("mySelect").options[0].selected = true;
    }

    localStorage.dataShots = JSON.stringify(dataShotsTemp);
    dataShots = dataShotsTemp;
  } else {
    // add object with empty arrays to lcoal storage
    localStorage.dataShots = JSON.stringify(dataShots);
  }

/* --------------- Spin Wheel  --------------------- */
const spinWheel = document.getElementById("spinWheel");
const spinBtn = document.getElementById("spin_btn");
const text = document.getElementById("text");
const spinImage = document.getElementById('spinImage');
const myPopup = document.getElementById("myPopup");
const text2 = document.getElementById("text2");
const textE = document.getElementById("textE");
const textWheelIcon = document.getElementById("wheelNameIcon");
const triangleCSS = document.getElementById("triangleCSS");

const wheelPara1 = document.getElementById("wheelPara1");
const wheelPara2 = document.getElementById("wheelPara2");
const wheelPara3 = document.getElementById("wheelPara3");

// buttons to add dares
const inputField = document.getElementById("AddDareText");
const addDare = document.getElementById("addDareSubmitOne");
const addDareAll = document.getElementById("addDareSubmitAll");

// setting toggles
const checkbox2 = document.getElementById('check2');
let w_disabled = false;
if(localStorage.w_disabled == "true"){
    checkbox2.checked = true;
    w_disabled = true
}
else{
    w_disabled = false;
    
}
checkbox2.addEventListener('change', (event) => {
if (event.currentTarget.checked) {
    w_disabled = true;
    localStorage.w_disabled = true;
    
} else {
    w_disabled = false;
    localStorage.w_disabled = false;
    
}
});

const checkbox3 = document.getElementById('check3');
let e_disabled = false;
if(localStorage.e_disabled == "true"){
    checkbox3.checked = true;
    e_disabled = true;
    textE.innerHTML = "disabled";
    textE.style.fontSize =  "" + (2.8 * Math.min(1, 0.9*(32.0 / textE.innerText.length)))   + "rem";
}
else{
    e_disabled = false;
    
}
checkbox3.addEventListener('change', (event) => {
if (event.currentTarget.checked) {
    e_disabled = true;
    localStorage.e_disabled = true;
    textE.innerHTML = "disabled";
    textE.style.fontSize =  "" + (2.8 * Math.min(1, 0.9*(32.0 / textE.innerText.length)))   + "rem";
} else {
    e_disabled = false;
    localStorage.e_disabled = false;
    textE.innerHTML = "none yet...";
    textE.style.fontSize =  "" + (2.8 * Math.min(1, 0.9*(32.0 / textE.innerText.length)))   + "rem";

}
});

textE.addEventListener('input', () => {
    textE.style.fontSize =  "" + (2.8 * Math.min(1, 0.9*(32.0 / textE.innerText.length)))   + "rem";
});


const checkbox4 = document.getElementById('check4');
let auto_change = true;
if(localStorage.auto_change == "false"){
    checkbox4.checked = false;
    auto_change = false;
}
else{
    auto_change = true;
}
checkbox4.addEventListener('change', (event) => {
if (event.currentTarget.checked) {
    auto_change = true;
    localStorage.auto_change = true;
} else {
    auto_change = false;
    localStorage.auto_change = false;
}
});

const checkbox5 = document.getElementById('check5');
let fast_roll = 1;
if(localStorage.fast_roll == "10"){
    checkbox5.checked = true;
    fast_roll = 10;
}
else{
    fast_roll = 1;
}
checkbox5.addEventListener('change', (event) => {
if (event.currentTarget.checked) {
    fast_roll = 10;
    localStorage.fast_roll = 10;
} else {
    fast_roll = 1;
    localStorage.fast_roll = 1;
}
});

const checkbox6 = document.getElementById('check6');
let teamJengaIsDisabled = false;
if(localStorage.teamJengaIsDisabled == "true"){
    checkbox6.checked = true;
    teamJengaIsDisabled = true;
}
else{
    teamJengaIsDisabled = false;
}
checkbox6.addEventListener('change', (event) => {
if (event.currentTarget.checked) {
    teamJengaIsDisabled = true;
    localStorage.teamJengaIsDisabled = true;
} else {
    teamJengaIsDisabled = false;
    localStorage.teamJengaIsDisabled = false;
}
});
const checkbox7 = document.getElementById("powerDisButton");
document.addEventListener('DOMContentLoaded', () =>{
    if(localStorage.powersDisabled == "true"){
        checkbox7.checked = true;
        var powerImages = document.getElementsByClassName("powerImage");
        for (var i = 0; i < powerImages.length; i++) {
            powerImages[i].style.display = "none"; 
        }
    }
})
checkbox7.addEventListener('change', (event) => {
    if (event.currentTarget.checked){
        var powerImages = document.getElementsByClassName("powerImage");
        for (var i = 0; i < powerImages.length; i++) {
            powerImages[i].style.display = "none"; 
        }
        localStorage.powersDisabled = true;
        document.getElementById('check').dispatchEvent(new Event('input'));
    }
    else{
        var powerImages = document.getElementsByClassName("powerImage");
        for (var i = 0; i < powerImages.length; i++) {
            powerImages[i].style.display = ""; 
        }
        localStorage.powersDisabled = false;
        document.getElementById('check').dispatchEvent(new Event('input'));
    }
})
//

addDare.addEventListener("click", function () {

    let added = inputField.value;
    if (added == '') {
        addDarePopup.classList.remove("show");
        return void(0);
    }
    added = "333. " + added;
    inputField.value = '';

    switch(current_wheel) {
        case "no pain":
            wheeldata_Pain_Free.dares.push(added);
            change_wheel(wheeldata_Pain_Free);
            break;
        case "no enemies":
            wheeldata_No_Enemies.dares.push(added);
            change_wheel(wheeldata_No_Enemies);
            break;
        case "memes":
            wheeldata_Memes.dares.push(added);
            change_wheel(wheeldata_Memes);
            break;
        case "vergipsycho":
            wheeldata_Vergi_psycho.dares.push(added);
            change_wheel(wheeldata_Vergi_psycho);
            break;
        case "no sitting":
            wheeldata_No_Sitting.dares.push(added);
            change_wheel(wheeldata_No_Sitting);
            break;
        case "default":
            wheeldata_Default.dares.push(added);
            change_wheel(wheeldata_Default);
            break;
        default:
            
    }
    addDarePopup.classList.remove("show");
});

addDareAll.addEventListener("click", function () {
    let added = inputField.value;
    if (added == '') {
        addDarePopup.classList.remove("show");
        return void(0);
    }
    added = "333. " + added;
    inputField.value = '';

    wheeldata_Pain_Free.dares.push(added);
    wheeldata_No_Enemies.dares.push(added);
    wheeldata_Memes.dares.push(added);
    wheeldata_Vergi_psycho.dares.push(added);
    wheeldata_No_Sitting.dares.push(added);
    wheeldata_Default.dares.push(added);

    switch(current_wheel) {
        case "no pain":
            change_wheel(wheeldata_Pain_Free);
            break;
        case "no enemies":
            change_wheel(wheeldata_No_Enemies);
            break;
        case "memes":
            change_wheel(wheeldata_Memes);
            break;
        case "vergipsycho":
            change_wheel(wheeldata_Vergi_psycho);
            break;
        case "no sitting":
            change_wheel(wheeldata_No_Sitting);
            break;
        case "default":
            change_wheel(wheeldata_Default);
            break;
        default:
            
    }
    addDarePopup.classList.remove("show");
});

// buttons to change wheels'
const wheelPopup = document.getElementById("wheelPopup");

const painButton = document.getElementById("wheelChoosePain");
painButton.addEventListener("click", function () {
    current_wheel = "no pain"
    change_wheel(wheeldata_Pain_Free)
    wheelPopup.classList.remove("show");
    document.body.style.background = "url('./Images/backgrounds/no_pain_bg.png')center/cover no-repeat";

    if(wheelPara1.classList.contains("showPara")){
        setTimeout(() => {
            spinBtn.click();
        }, 500);
    }
    wheelPara1.classList.remove("showPara");
    wheelPara2.classList.remove("showPara");
    wheelPara3.classList.remove("showPara");

    wheelButtonsArray.forEach( (item) => {
        item.getElementsByTagName('div')[1].classList.remove("showPara");
        item.style.opacity = "0.5";
    });
    painButton.getElementsByTagName('div')[1].classList.add("showPara");
    painButton.style.opacity = "1.0";
});

const enemiesButton = document.getElementById("wheelChooseEnemies");
enemiesButton.addEventListener("click", function () {
    current_wheel = "no enemies"
    change_wheel(wheeldata_No_Enemies)
    wheelPopup.classList.remove("show");
    document.body.style.background = "url('./Images/backgrounds/no_enemies_bg.png')center/cover no-repeat";

    if(wheelPara1.classList.contains("showPara")){
        setTimeout(() => {
            spinBtn.click();
        }, 500);
    }
    wheelPara1.classList.remove("showPara");
    wheelPara2.classList.remove("showPara");
    wheelPara3.classList.remove("showPara");

    wheelButtonsArray.forEach( (item) => {
        item.getElementsByTagName('div')[1].classList.remove("showPara");
        item.style.opacity = "0.5";
    });
    enemiesButton.getElementsByTagName('div')[1].classList.add("showPara");
    enemiesButton.style.opacity = "1.0";
});

const memesButton = document.getElementById("wheelChooseMemes");
memesButton.addEventListener("click", function () {
    current_wheel = "memes"
    change_wheel(wheeldata_Memes)
    wheelPopup.classList.remove("show");
    document.body.style.background = "url('./Images/backgrounds/memes_bg.png')center/cover no-repeat";

    if(wheelPara1.classList.contains("showPara")){
        setTimeout(() => {
            spinBtn.click();
        }, 500);
    }
    wheelPara1.classList.remove("showPara");
    wheelPara2.classList.remove("showPara");
    wheelPara3.classList.remove("showPara");

    wheelButtonsArray.forEach( (item) => {
        item.getElementsByTagName('div')[1].classList.remove("showPara");
        item.style.opacity = "0.5";
    });
    memesButton.getElementsByTagName('div')[1].classList.add("showPara");
    memesButton.style.opacity = "1.0";
});

const vergiButton = document.getElementById("wheelChooseVergi");
vergiButton.addEventListener("click", function () {
    current_wheel = "vergipsycho"
    change_wheel(wheeldata_Vergi_psycho)
    wheelPopup.classList.remove("show");
    document.body.style.background = "url('./Images/backgrounds/cyberpunk_bg.png')center/cover no-repeat";

    if(wheelPara1.classList.contains("showPara")){
        setTimeout(() => {
            spinBtn.click();
        }, 500);
    }
    wheelPara1.classList.remove("showPara");
    wheelPara2.classList.remove("showPara");
    wheelPara3.classList.remove("showPara");

    wheelButtonsArray.forEach( (item) => {
        item.getElementsByTagName('div')[1].classList.remove("showPara");
        item.style.opacity = "0.5";
    });
    vergiButton.getElementsByTagName('div')[1].classList.add("showPara");
    vergiButton.style.opacity = "1.0";
});

const sittingButton = document.getElementById("wheelChooseSitting");
sittingButton.addEventListener("click", function () {
    current_wheel = "no sitting"
    change_wheel(wheeldata_No_Sitting)
    wheelPopup.classList.remove("show");
    document.body.style.background = "url('./Images/backgrounds/no_sitting_bg.png')center/cover no-repeat";

    if(wheelPara1.classList.contains("showPara")){
        setTimeout(() => {
            spinBtn.click();
        }, 500);
    }
    wheelPara1.classList.remove("showPara");
    wheelPara2.classList.remove("showPara");
    wheelPara3.classList.remove("showPara");

    wheelButtonsArray.forEach( (item) => {
        item.getElementsByTagName('div')[1].classList.remove("showPara");
        item.style.opacity = "0.5";
    });
    sittingButton.getElementsByTagName('div')[1].classList.add("showPara");
    sittingButton.style.opacity = "1.0";
});

const defaultButton = document.getElementById("wheelChooseDefault");
defaultButton.addEventListener("click", function () {
    current_wheel = "default"
    change_wheel(wheeldata_Default)
    wheelPopup.classList.remove("show");
    document.body.style.background = "url('./Images/backgrounds/default_bg.png')center/cover no-repeat";

    if(wheelPara1.classList.contains("showPara")){
        setTimeout(() => {
            spinBtn.click();
        }, 500);
    }
    wheelPara1.classList.remove("showPara");
    wheelPara2.classList.remove("showPara");
    wheelPara3.classList.remove("showPara");

    wheelButtonsArray.forEach( (item) => {
        item.getElementsByTagName('div')[1].classList.remove("showPara");
        item.style.opacity = "0.5";
    });
    defaultButton.getElementsByTagName('div')[1].classList.add("showPara");
    defaultButton.style.opacity = "1.0";
});

const wheelButtonsArray = [painButton, vergiButton, defaultButton, sittingButton, enemiesButton, memesButton]

/* --------------- Minimum And Maximum Angle For A value  --------------------- */
let spinValues = wheel_array.map( (x, index) => Array( index / dares_count * 360,  (index + 1) / dares_count * 360, x, x.slice("")[0]));
/* --------------- Size Of Each Piece  --------------------- */
let size = Array(dares_count).fill(10);
/* --------------- Background Colors  --------------------- */
var spinColors = json_default.colors;
triangleCSS.style.borderTop = "55px solid " + "#E74C3C";
let BaseRotationDataLabels = Array.from({ length: dares_count }, (value, index) => 90 + index * 360 / dares_count )
/* --------------- Chart --------------------- */
/* --------------- Guide : https://chartjs-plugin-datalabels.netlify.app/guide/getting-started.html --------------------- */
document.getElementById("containerTest").style.maxWidth = "1000px"
let spinChart = new Chart(spinWheel, {
  plugins: [ChartDataLabels],
  type: "pie",
  rotation: 0,
  data: {
    labels: dares_sliced,
    datasets: [
      {
        backgroundColor: spinColors,
        data: size,
      },
    ],
  },
  options: {
    elements: {
        arc: {
            borderWidth: 0
        }
    },
    rotation: 0,
    responsive: true,
    animation: { duration: 0 },
    plugins: {
      tooltip: false,
      legend: {
        display: false,
      },
      datalabels: {
        rotation: BaseRotationDataLabels,
        anchor: 'end',
        align: 'start',
        clamp: false,
        display: true,
        color: "#ffffff",
        formatter: (_, context) => context.chart.data.labels[context.dataIndex],
        font: { size: 15, weight: 'bold'},
      },
    },
  },
});
document.getElementById("containerTest").style.maxWidth = "24.37rem";
/* --------------- Chart To Image --------------------- */

spinImage.src = spinChart.toBase64Image();

/* --------------- Display Value Based On The Angle --------------------- */
let current_type = "1"; // gets number, E or W
let current_wheel = "default"

const generateValue = (OriginalangleValue) => {
    for (let i = 0; i < dares_count; i++) {
        angleValue =  mod(90 - OriginalangleValue, 360);
        if (angleValue >= spinValues[i][0] && angleValue <= spinValues[i][1]) {
            text.innerHTML = `${spinValues[i][2]}`;
            text2.innerHTML = `${spinValues[i][2]}`;
            break;
    }
  }
};
/* --------------- Timer code--------------------- */

clockMake = document.getElementById("clockSubmitOne");

clockMake.addEventListener("click", function () {

    const clockField = document.getElementById("clockText");
    const clockField2 = document.getElementById("clockText2");

    let realTimeMin = clockField.value;
    let realTimeSec = clockField2.value;
    if (realTimeMin == '' && realTimeSec == '') {
        document.getElementById("clockPopup").classList.remove("show");
        return void(0);
    }
    if (realTimeMin == '') {
        realTimeMin = 0;
    }
    if (realTimeSec == ''){
        realTimeSec = 0;
    }
    if (isNaN(parseInt(realTimeMin)) || isNaN(parseInt(realTimeSec))) {
        alert("Timer input was not a valid Integer")
        return void(0);
    }

    realTime = parseInt(realTimeMin) * 60 + parseInt(realTimeSec);

    document.getElementById("clockText").value = '';
    document.getElementById("clockText2").value = '';

    const node = document.getElementById("app");
    const clone = node.cloneNode(true);
    clone.id = "newClock"; 
    
    let time1 = 0;
    let time2 = realTime;
    let time3 = realTime;
    clone.getElementsByTagName("span")[0].innerHTML = formatTime(time3);
    clone.style.display = "block";

    clone.addEventListener("contextmenu", function(e) {
        const flagClick2 = rightClick2(e);
        if (flagClick2 == true){
        const trash2 = document.getElementById("trashButton2")
        trash2.addEventListener('click', function () {
        document.getElementById("app2").removeChild(clone);
        clearInterval(timerInterval);
        }); }
    });

    let timerInterval = setInterval(() => {
        time1 = time1 += 1;
        time3 = time2 - time1;
        clone.getElementsByTagName("span")[0].innerHTML = formatTime(time3);
      
        // circle dsahed 
        const circleDasharray1 = `${(
            calculateTimeFraction(time3, time2) * FULL_DASH_ARRAY
          ).toFixed(0)} 283`;
          clone
            .getElementsByTagName("path")[0]
            .setAttribute("stroke-dasharray", circleDasharray1);
        // circle color 

        if (time3 <= time2 / 10) {
            clone
                .getElementsByTagName("path")[0]
                .classList.remove('orange');
            clone
                .getElementsByTagName("path")[0]
                .classList.add('red');
        } else if (time3 <= time2 / 4) {
            clone
                .getElementsByTagName("path")[0]
                .classList.remove('green');
            clone
                .getElementsByTagName("path")[0]
                .classList.add('orange');
        }
        if (time3 <= 0) {
            document.getElementById("app2").removeChild(clone);
            var mySound = new alarmSound("./Sounds/alarm_sound_effect.mp3", alertVolume);
            clearInterval(timerInterval);
            mySound.play();
            setTimeout(function() {alert("Timer is done")}, 100);
            setTimeout(function() {mySound.stop()}, 105);
            
        }
    
    }, 1000);
    document.getElementById("app2").appendChild(clone);
    document.getElementById("clockPopup").classList.remove("show");
    
});

const FULL_DASH_ARRAY = 283;
const WARNING_THRESHOLD = 10;
const ALERT_THRESHOLD = 5;

const COLOR_CODES = {
  info: {
    color: "green"
  },
  warning: {
    color: "orange",
    threshold: WARNING_THRESHOLD
  },
  alert: {
    color: "red",
    threshold: ALERT_THRESHOLD
  }
};

let remainingPathColor = COLOR_CODES.info.color;

document.getElementById("app").innerHTML = `
<div class="base-timer">
  <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <g class="base-timer__circle">
    
      <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
      
      
      <path
        id="base-timer-path-remaining"
        fill = "none"
        stroke-dasharray="283"
        class="base-timer__path-remaining ${remainingPathColor}"
        d="
          M 50, 50
          m -45, 0
          a 45,45 0 1,0 90,0
          a 45,45 0 1,0 -90,0
        "
      ></path>
      
    </g>
  </svg>
  <span id="base-timer-label" class="base-timer__label"></span>
</div>
`;
document.getElementById("app").style.display = "none";

//preset timers
clock10min = document.getElementById("10min");
clock10min.addEventListener("click", function () {
    document.getElementById("clockText").value = 10;
    document.getElementById("clockText2").value = 0;
    clockMake.click();
});

clock5min = document.getElementById("5min");
clock5min.addEventListener("click", function () {
    document.getElementById("clockText").value = 5;
    document.getElementById("clockText2").value = 0;
    clockMake.click();
});

clock4min = document.getElementById("4min");
clock4min.addEventListener("click", function () {
    document.getElementById("clockText").value = 4;
    document.getElementById("clockText2").value = 0;
    clockMake.click();
});

clock3min = document.getElementById("3min");
clock3min.addEventListener("click", function () {
    document.getElementById("clockText").value = 3;
    document.getElementById("clockText2").value = 0;
    clockMake.click();
});

clock1min = document.getElementById("1min");
clock1min.addEventListener("click", function () {
    document.getElementById("clockText").value = 1;
    document.getElementById("clockText2").value = 0;
    clockMake.click();
});

clock30sec = document.getElementById("30sec");
clock30sec.addEventListener("click", function () {
    document.getElementById("clockText").value = 0;
    document.getElementById("clockText2").value = 30;
    clockMake.click();
});

clock5sec = document.getElementById("5sec");
clock5sec.addEventListener("click", function () {
    document.getElementById("clockText").value = 0;
    document.getElementById("clockText2").value = 5;
    clockMake.click();
});
/* --------------- shot mult --------------------- */


let secret = false;
function secretShotPercent(x){
    return (0.226416 *x*x*x -  0.672193*x*x + 0.845255*x + 0.101609)
}
let shotMultiplier = 0.0;
const extraShots = document.getElementById('extraShots');

extraShots.addEventListener('change', (event) => {
if (event.currentTarget.checked) {
    secret = true;
    document.getElementById("sliderContainer").classList.remove("disabled");
    document.getElementById("sliderMul").style.cursor = "pointer"
    document.getElementById("sliderMul").disabled = false;
} else {
    secret = false;
    document.getElementById("sliderContainer").classList.add("disabled");
    document.getElementById("sliderMul").style.cursor = "not-allowed"
    document.getElementById("sliderMul").disabled = true;
}
});

// true hidden menu
let keys = {
    a_key: false,
    p_key: false,
};
window.addEventListener("keydown", (event) => {
    if (event.key === "z") {
      keys.a_key = true;
    }
    if (event.key === "x") {
      keys.p_key = true;
    }

  if(keys.a_key && keys.p_key){
    document.getElementById("hiddenPopup").classList.add("show");
    
  }

  });

  window.addEventListener("keyup", (event) => {
    if (event.key === "z") {
      keys.a_key = false;
    }
    if (event.key === "x") {
      keys.p_key = false;
    }
  });

/* --------------- button controls --------------------- */
window.addEventListener("keydown", (e) => {
    if (e.key == " " || e.key == "Enter"){
        if (myPopup.classList.toString().includes("show")){
            myPopup.classList.remove("show");
            document.getElementById("popupbackground").style.display = "none";
        }
        else{
            switch (e.target.tagName.toLowerCase()) { // we dont want to activate the wheel when pressing space in textboxes etc.
                case "input":
                case "textarea":
                case "select":
                case "p":
                case "span":
                // ...and so on for other elements you want to exclude; thanks stackexchange
                  break;
                default:
                    spinBtn.click();
                  break;
            }
            
        }
    };
   
});

/* --------------- Dare tracker --------------------- */
const dares_history = new Array();
let previous_dare = "";
let previous_environment = "";
let shotsMultiplied = 0;

/* --------------- Spinning Code --------------------- */

spinBtn.addEventListener("click", () => {
    generateValue(spinChart.options.rotation)
    let count = 100;
    spinBtn.disabled = true;
    let test_dare = "";
    //roll dare and check for flags

    let rolledDare = 360 * Math.random(); // angle for the initial dare rolled this spin

    // check that dare is not the same as previous one /(#¤/(#))
    //
    if (!(current_type == "E" || current_type == "W")) {

        do {
        rolledDare = 360 * Math.random();
        for (let i = 0; i < dares_count; i++) {
            angleValue =  mod(90 - rolledDare, 360);
            if (angleValue >= spinValues[i][0] && angleValue <= spinValues[i][1]) {
                current_type = `${spinValues[i][3]}`;
                test_dare = `${spinValues[i][2]}`;
                break;
        }
        }
        }while(test_dare == previous_dare || test_dare == previous_environment || (teamJengaIsDisabled && test_dare.includes("Team Jenga")) || disabledWheels.includes(test_dare));

      if ( (e_disabled == true) && (w_disabled == true) && (current_type == "E" || current_type == "W") ){

        do {
            rolledDare = 360 * Math.random();
            
            for (let i = 0; i < dares_count; i++) {
                angleValue =  mod(90 - rolledDare, 360);
                if (angleValue >= spinValues[i][0] && angleValue <= spinValues[i][1]) {
                    current_type = `${spinValues[i][3]}`;
                    test_dare = `${spinValues[i][2]}`;
                    break;
            }
          }
        }while(current_type == "E" || current_type == "W" || test_dare == previous_dare || test_dare == previous_environment)
      }
      
      if ((e_disabled == true) && (current_type == "E")){
        do {
            rolledDare = 360 * Math.random();
            
            for (let i = 0; i < dares_count; i++) {
                angleValue =  mod(90 - rolledDare, 360);
                if (angleValue >= spinValues[i][0] && angleValue <= spinValues[i][1]) {
                    current_type = `${spinValues[i][3]}`;
                    test_dare = `${spinValues[i][2]}`;
                    break;
            }
          }
        }while(current_type == "E" || test_dare == previous_dare || test_dare == previous_environment || disabledWheels.includes(test_dare))
      }

      if ((w_disabled == true) && (current_type == "W")){
        do {
            rolledDare = 360 * Math.random();
            
            for (let i = 0; i < dares_count; i++) {
                angleValue =  mod(90 - rolledDare, 360);
                if (angleValue >= spinValues[i][0] && angleValue <= spinValues[i][1]) {
                    current_type = `${spinValues[i][3]}`;
                    test_dare = `${spinValues[i][2]}`;
                    break;
            }
          }
        }while(current_type == "W" || test_dare == previous_dare || test_dare == previous_environment || (teamJengaIsDisabled && test_dare.includes("Team Jenga")))
      }

    } 
    else {
        do {
            rolledDare = 360 * Math.random();
            
            for (let i = 0; i < dares_count; i++) {
                angleValue =  mod(90 - rolledDare, 360);
                if (angleValue >= spinValues[i][0] && angleValue <= spinValues[i][1]) {
                    current_type = `${spinValues[i][3]}`;
                    test_dare = `${spinValues[i][2]}`;
                    break;
            }
          }
        }while(current_type == "E" || current_type == "W" || test_dare == previous_dare)
    }
    // if secret is activated then this replaces rolled dare
    if (secret == true && Math.random() > (1.0-shotMultiplier) && !(previous_dare.includes(". Round of shots")) && current_wheel != "no pain"){
        let numbersA = Array.from({length: dares_count}, (_, i) => i);
        numbersA = shuffle(numbersA);
        for (let i = 0; i < dares_count; i++) {
            let b = numbersA[i];
            test_dare = `${spinValues[b][2]}`;
            if (test_dare.includes(". Round of shots")){

                current_type = 11;
                rolledDare = 90 - (spinValues[b][0] + spinValues[b][1])/2;
                break;
            }
      }
    } 
    // if hidden dare is next
    if (hiddenPrimed){
        test_dare = "101. " + hiddenDare;
        current_type = "11";
    }
    
    //dare has been rolled 
    var mySound = new wheelSound("./Sounds/spinning_sound_effect.mp3", fast_roll, wheelVolume);
    mySound.play();

    // roate pic 
    let rotationInterval = window.setInterval(() => {

    if (count < 200) {
        spinImage.style.transform = "rotate(" + 360 * Math.random() + "deg)" + "scale(1.10)";
        generateValue(360 * Math.random());
    }
    else {
        spinImage.style.transform = "rotate("  +  (-100000/Math.pow(count-199, 1.5) + 12.4533 - 36000 / (1 + 10 *count)  + rolledDare + 6 - 90) + "deg)" + "scale(1.10)";
        generateValue((-100000/Math.pow(count-199, 1.5) + 12.4533 -36000 / (1 + 10*count)  + rolledDare + 6 ));
    }

    
    count = count + fast_roll; // fast roll is 1 or 10 
    if (count >= 600) {

        clearInterval(rotationInterval);
        generateValue(rolledDare);
        if(hiddenPrimed){
            hiddenPrimed = false;
            text.innerHTML = test_dare;
            text2.innerHTML = test_dare;
        }
        if (current_type == "E") {
            textE.innerHTML = test_dare.replace("ENVIRONMENT : ", "");
            textE.style.fontSize =  "" + (2.8 * Math.min(1, 0.9*(32.0 / textE.innerText.length)))   + "rem";
            previous_environment = test_dare;
        }
        else{
            previous_dare = test_dare;
        };
        //log it to dares history
        dares_history.push(test_dare.replaceAll(",", ";"));
        let dareHistoryHTML = "<li>" + dares_history.toString().replaceAll("," , "</li><li>") + "</li>";
        dareHistoryHTML = dareHistoryHTML.replaceAll("ENVIRONMENT :", '<span class="summer">ENVIRONMENT :</span>');
        dareHistoryHTML = dareHistoryHTML.replaceAll("WHEEL CHANGE :", '<span class="winter">WHEEL CHANGE :</span>');
        document.getElementById("dareHistoryList").innerHTML = dareHistoryHTML;

        spinBtn.disabled = false;
        myPopup.classList.add("show");

        if(test_dare.includes(". Round of shots")){
            if(previous_environment.includes("Round of Shots multiplies")){
                inputField.value = "Round of shots";
                addDareAll.click();
                shotsMultiplied += 1;
                text2.innerHTML = `Round of shots (${shotsMultiplied} extra)`
            }
            document.getElementById("myPopupContent").style.backgroundImage = "url('./Images/backgrounds/dare_shot.png')";
            text2.style.color = "black";
            document.getElementById("popupbackground").style.display = "block";
        }
        else if(test_dare.includes("Disable") && test_dare.includes("Wheel")){
            myPopup.classList.remove("show");
            document.getElementById("wheelDisButton").click();
            document.addEventListener("click", function() {
                setTimeout(() => {
                    wheelPopupDis.classList.remove("show");
                    spinBtn.click();
                }, 1000);
            }, { once: true });
        }
        else if(test_dare.includes("Choose a Themed Wheel")){
            myPopup.classList.remove("show");
            wheelPara1.classList.add("showPara");
            wheelPara2.classList.add("showPara");
            wheelPara3.classList.add("showPara");
            document.getElementById("wheelButton").click();
            
        }
        else if(test_dare.includes("ENVIRONMENT")){
            document.getElementById("myPopupContent").style.backgroundImage = "url('./Images/backgrounds/environment_border.png')";
            text2.style.color = "black";
            document.getElementById("popupbackground").style.display = "block";
        }
        else{
            document.getElementById("myPopupContent").style.backgroundImage = "none";
            text2.style.color = "green";
            document.getElementById("popupbackground").style.display = "block";
        }

        if ((current_type == "W") && (auto_change == true)){
            let wheelChangeString = test_dare;
            wheelChangeString = wheelChangeString.toLowerCase();

            if (wheelChangeString.includes("enemies")){
                enemiesButton.click();
            }
            else if (wheelChangeString.includes("pain")){
                painButton.click();
            }
            else if (wheelChangeString.includes("vergi")){
                vergiButton.click();
            }
            else if (wheelChangeString.includes("sitting")){
                sittingButton.click();
            }
            else if (wheelChangeString.includes("memes")){
                memesButton.click();
            }

            myPopup.classList.remove("show");
            document.getElementById("popupbackground").style.display = "none";
            spinBtn.click();
        }

    }


  }, 20);
});


/* --------------- End Spin Wheel  --------------------- */

/* TEXT EDITOR BEGINS */
// loads from files textarea inner html and makes it presentable
let currentEditor = "";
const textArea1 = document.getElementById("textarea1");
const textArea2 = document.getElementById("textarea2");
const textArea3 = document.getElementById("textarea3");

const editorDefault = document.getElementById("editorDefault");
const editorPain = document.getElementById("editorPain");
const editorSitting = document.getElementById("editorSitting");
const editorEnemies = document.getElementById("editorEnemies");
const editorVergi = document.getElementById("editorVergi");
const editorMemes = document.getElementById("editorMemes");

let textArea1Obj = {
    default: wheeldata_Default.dares.join("\n"),
    pain: wheeldata_Pain_Free.dares.join("\n"),
    enemies: wheeldata_No_Enemies.dares.join("\n"),
    vergi: wheeldata_Vergi_psycho.dares.join("\n"),
    memes: wheeldata_Memes.dares.join("\n"),
    sitting: wheeldata_No_Sitting.dares.join("\n")
} 

let textArea2Obj = {
    default: wheeldata_Default.environments.join("\n").replaceAll("ENVIRONMENT : ", ""),
    pain: wheeldata_Pain_Free.environments.join("\n").replaceAll("ENVIRONMENT : ", ""),
    enemies: wheeldata_No_Enemies.environments.join("\n").replaceAll("ENVIRONMENT : ", ""),
    vergi: wheeldata_Vergi_psycho.environments.join("\n").replaceAll("ENVIRONMENT : ", ""),
    memes: wheeldata_Memes.environments.join("\n").replaceAll("ENVIRONMENT : ", ""),
    sitting: wheeldata_No_Sitting.environments.join("\n").replaceAll("ENVIRONMENT : ", "")
} 

let textArea3Obj = {
    default: wheeldata_Default.wheel_changes.join("\n").replaceAll("WHEEL CHANGE : ", ""),
    pain: wheeldata_Pain_Free.wheel_changes.join("\n").replaceAll("WHEEL CHANGE : ", ""),
    enemies: wheeldata_No_Enemies.wheel_changes.join("\n").replaceAll("WHEEL CHANGE : ", ""),
    vergi: wheeldata_Vergi_psycho.wheel_changes.join("\n").replaceAll("WHEEL CHANGE : ", ""),
    memes: wheeldata_Memes.wheel_changes.join("\n").replaceAll("WHEEL CHANGE : ", ""),
    sitting: wheeldata_No_Sitting.wheel_changes.join("\n").replaceAll("WHEEL CHANGE : ", "")
} 

const editorpopupcontent = document.getElementById("editorpopupcontent");

function f1Load(givenEditor) {

    textArea1.value = textArea1Obj[givenEditor];
    textArea2.value = textArea2Obj[givenEditor];
    textArea3.value = textArea3Obj[givenEditor];
    buttonSelected(givenEditor);


    textArea1.style.height = "";
    textArea1.style.height = textArea1.scrollHeight + "px";
    textArea2.style.height = "";
    textArea2.style.height = textArea2.scrollHeight + "px";
    textArea3.style.height = "";
    textArea3.style.height = textArea3.scrollHeight + "px";
};

function fLoadDefault() {
    if(currentEditor == ""){
        
    }
    else{
        textArea1Obj[currentEditor] = textArea1.value;
        textArea2Obj[currentEditor] = textArea2.value;
        textArea3Obj[currentEditor] = textArea3.value;
    }
    currentEditor = "default";
    f1Load(currentEditor);
};
function fLoadPain() {
    if(currentEditor == ""){
        
    }
    else{
        textArea1Obj[currentEditor] = textArea1.value;
        textArea2Obj[currentEditor] = textArea2.value;
        textArea3Obj[currentEditor] = textArea3.value;
    }
    currentEditor = "pain";
    f1Load(currentEditor);
};
function fLoadEnemies() {
    if(currentEditor == ""){
        
    }
    else{
        textArea1Obj[currentEditor] = textArea1.value;
        textArea2Obj[currentEditor] = textArea2.value;
        textArea3Obj[currentEditor] = textArea3.value;
    }
    currentEditor = "enemies";
    f1Load(currentEditor);
};
function fLoadVergi() {
    if(currentEditor == ""){
        
    }
    else{
        textArea1Obj[currentEditor] = textArea1.value;
        textArea2Obj[currentEditor] = textArea2.value;
        textArea3Obj[currentEditor] = textArea3.value;
    }
    currentEditor = "vergi";
    f1Load(currentEditor);
};
function fLoadSitting() {
    if(currentEditor == ""){
        
    }
    else{
        textArea1Obj[currentEditor] = textArea1.value;
        textArea2Obj[currentEditor] = textArea2.value;
        textArea3Obj[currentEditor] = textArea3.value;
    }
    currentEditor = "sitting";
    f1Load(currentEditor);
};
function fLoadMemes() {
    if(currentEditor == ""){
        
    }
    else{
        textArea1Obj[currentEditor] = textArea1.value;
        textArea2Obj[currentEditor] = textArea2.value;
        textArea3Obj[currentEditor] = textArea3.value;
    }
    currentEditor = "memes";
    f1Load(currentEditor);
};

function buttonSelected(givenEditor) {
    switch(givenEditor){
        case "default":
            editorDefault.style.backgroundColor = "#65b9e6"
            editorPain.style.backgroundColor = ""
            editorSitting.style.backgroundColor = ""
            editorEnemies.style.backgroundColor = ""
            editorVergi.style.backgroundColor = ""
            editorMemes.style.backgroundColor = ""
            break;
        case "pain":
            editorDefault.style.backgroundColor = ""
            editorPain.style.backgroundColor = "#65b9e6"
            editorSitting.style.backgroundColor = ""
            editorEnemies.style.backgroundColor = ""
            editorVergi.style.backgroundColor = ""
            editorMemes.style.backgroundColor = ""
            break;
        case "enemies":
            editorDefault.style.backgroundColor = ""
            editorPain.style.backgroundColor = ""
            editorSitting.style.backgroundColor = ""
            editorEnemies.style.backgroundColor = "#65b9e6"
            editorVergi.style.backgroundColor = ""
            editorMemes.style.backgroundColor = ""
            break;
        case "vergi":
            editorDefault.style.backgroundColor = ""
            editorPain.style.backgroundColor = ""
            editorSitting.style.backgroundColor = ""
            editorEnemies.style.backgroundColor = ""
            editorVergi.style.backgroundColor = "#65b9e6"
            editorMemes.style.backgroundColor = ""
            break;
        case "sitting":
            editorDefault.style.backgroundColor = ""
            editorPain.style.backgroundColor = ""
            editorSitting.style.backgroundColor = "#65b9e6"
            editorEnemies.style.backgroundColor = ""
            editorVergi.style.backgroundColor = ""
            editorMemes.style.backgroundColor = ""
            break;
        case "memes":
            editorDefault.style.backgroundColor = ""
            editorPain.style.backgroundColor = ""
            editorSitting.style.backgroundColor = ""
            editorEnemies.style.backgroundColor = ""
            editorVergi.style.backgroundColor = ""
            editorMemes.style.backgroundColor = "#65b9e6"
            break;
        default:
    }
};

textArea1.addEventListener("input", function() {
    let scrollHeightVar = editorpopupcontent.scrollTop;
    textArea1.style.height = "";
    textArea1.style.height = textArea1.scrollHeight + "px";
    editorpopupcontent.scrollTop = scrollHeightVar;
});
textArea2.addEventListener("input", function() {
    let scrollHeightVar = editorpopupcontent.scrollTop;
    textArea2.style.height = "";
    textArea2.style.height = textArea2.scrollHeight + "px";
    editorpopupcontent.scrollTop = scrollHeightVar;
});
textArea3.addEventListener("input", function() {
    let scrollHeightVar = editorpopupcontent.scrollTop;
    textArea3.style.height = "";
    textArea3.style.height = textArea3.scrollHeight + "px";
    editorpopupcontent.scrollTop = scrollHeightVar;
});

function fCommit(){
    //finish saving current editor 
    if(currentEditor == ""){
        
    }
    else{
        textArea1Obj[currentEditor] = textArea1.value;
        textArea2Obj[currentEditor] = textArea2.value;
        textArea3Obj[currentEditor] = textArea3.value;
    }
    //now save all 6 dare sets.
    ["default", "pain", "enemies", "vergi", "sitting", "memes"].forEach(function(item){
        textArea1.value = textArea1Obj[item];
        textArea2.value = textArea2Obj[item];
        textArea3.value = textArea3Obj[item];

        saveTextArea(item);
    })
    document.getElementById("overlayWhite").style.display = "block";
    location.reload();
}

function saveTextArea(key){
    
    if(textArea1.value == ""){
        return;
    }

    let objDares = textArea1.value.trim().split("\n");
    let objEnvironments = textArea2.value.trim().split("\n");
    objEnvironments.forEach((element, index) => {  
        objEnvironments[index] = "ENVIRONMENT : " + element;  
    });
    let objWheels = textArea3.value.trim().split("\n");
    objWheels.forEach((element, index) => {  
        objWheels[index] = "WHEEL CHANGE : " + element;  
    });

    let newObj = {
        dares: objDares,
        environments: objEnvironments,
        wheel_changes: objWheels
    };
    localStorage.setItem("" + key + "JSON", JSON.stringify(newObj));
}

function fLoadOlds(){
    textArea1Obj = {
        default: json_default.dares.join("\n"),
        pain: json_pain_free.dares.join("\n"),
        enemies: json_no_enemies.dares.join("\n"),
        vergi: json_vergi_psycho.dares.join("\n"),
        memes: json_memes.dares.join("\n"),
        sitting: json_no_sitting.dares.join("\n")
    } 
    
    textArea2Obj = {
        default: json_default.environments.join("\n").replaceAll("ENVIRONMENT : ", ""),
        pain: json_pain_free.environments.join("\n").replaceAll("ENVIRONMENT : ", ""),
        enemies: json_no_enemies.environments.join("\n").replaceAll("ENVIRONMENT : ", ""),
        vergi: json_vergi_psycho.environments.join("\n").replaceAll("ENVIRONMENT : ", ""),
        memes: json_memes.environments.join("\n").replaceAll("ENVIRONMENT : ", ""),
        sitting: json_no_sitting.environments.join("\n").replaceAll("ENVIRONMENT : ", "")
    } 
    
    textArea3Obj = {
        default: json_default.wheel_changes.join("\n").replaceAll("WHEEL CHANGE : ", ""),
        pain: json_pain_free.wheel_changes.join("\n").replaceAll("WHEEL CHANGE : ", ""),
        enemies: json_no_enemies.wheel_changes.join("\n").replaceAll("WHEEL CHANGE : ", ""),
        vergi: json_vergi_psycho.wheel_changes.join("\n").replaceAll("WHEEL CHANGE : ", ""),
        memes: json_memes.wheel_changes.join("\n").replaceAll("WHEEL CHANGE : ", ""),
        sitting: json_no_sitting.wheel_changes.join("\n").replaceAll("WHEEL CHANGE : ", "")
    } 
    currentEditor = "default";
    f1Load(currentEditor);
    document.getElementById("overlayWhite").style.display = "block";
    setTimeout(() => {document.getElementById("overlayWhite").style.display = "none"}, "300");
}

function downloadJS(keyString) {
    var fileName = "";
    var jsonVar = "";
    switch(keyString){
        case "default":
            jsonVar = "json_default";
            fileName = "dares_default"
            break;
        case "pain":
            jsonVar = "json_pain_free";
            fileName = "dares_pain_free";
            break;
        case "enemies":
            jsonVar = "json_no_enemies";
            fileName = "dares_no_enemies"
            break;
        case "vergi":
            jsonVar = "json_vergi_psycho";
            fileName = "dares_vergi_psycho";
            break;
        case "sitting":
            jsonVar = "json_no_sitting";
            fileName = "dares_no_sitting";
            break;
        case "memes":
            jsonVar = "json_memes";
            fileName = "dares_memes";
            break;
        default:
            return;
    }

    //creating an invisible element

    var element = document.createElement('a'); 
    element.setAttribute('href',
        'data:text/javascript;charset=utf-8,'
        + "var " + jsonVar + " = {\n\n"
        + "dares: [\n"+ encodeURIComponent(JSON.stringify(textArea1Obj[keyString]).replaceAll("\\n", "\",\n\""))
        + "],\n\nenvironments: [\n" + "\"ENVIRONMENT : " + encodeURIComponent(JSON.stringify(textArea2Obj[keyString]).replace("\"", "").replaceAll("\\n", "\",\n\"ENVIRONMENT : "))
        + "],\n\nwheel_changes: [\n" + "\"WHEEL CHANGE : " + encodeURIComponent(JSON.stringify(textArea3Obj[keyString]).replace("\"", "").replaceAll("\\n", "\",\n\"WHEEL CHANGE : "))
        + "],\n\ncolors: [\n\"" + encodeURIComponent(window[jsonVar]["colors"].join("\",\n\""))
        + "\"]\n}")
    element.setAttribute('download', fileName);
    document.body.appendChild(element);
    element.click();

    document.body.removeChild(element);
}

function downloadAllJS(){
    ["default", "pain", "enemies", "vergi", "sitting", "memes"].forEach(downloadJS)
}

//new code
// Make the DIV element draggable:
dragElement(document.getElementById("draggableDiv"));

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    document.getElementById("draggableDivheader").style.cursor = "grabbing"
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    
        let notes = document.getElementById("notes");
        localStorage.setItem("notesTop", elmnt.style.top);
        localStorage.setItem("notesLeft", elmnt.style.left);
    
    if(notes.style.width != "" && notes.style.height != ""){
        localStorage.setItem("notesWidth", notes.style.width);
        localStorage.setItem("notesHeight", notes.style.height);
        
    }
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
    document.getElementById("draggableDivheader").style.cursor = "grab"
  }
}
document.addEventListener("DOMContentLoaded", () =>{
    let notesIni = document.getElementById("notes");
    let draggableIni = document.getElementById("draggableDiv")
    if(localStorage.notesTop){
        draggableIni.style.top = localStorage.notesTop;
    }
    if(localStorage.notesLeft){
        draggableIni.style.left = localStorage.notesLeft;
    }

    const resizeObserver = new ResizeObserver(entries => {
        for (let entry of entries) {
            if(notesIni.style.width != "" && notesIni.style.height != ""){
                localStorage.setItem("notesWidth", notesIni.style.width);
                localStorage.setItem("notesHeight", notesIni.style.height);
                
            }
        }
    });
    if(localStorage.notesText){
        notesIni.value = localStorage.notesText;
    }
    notesIni.addEventListener("change", () => {
        localStorage.setItem("notesText", notesIni.value);
      
    })

    resizeObserver.observe(notes);

    if(localStorage.notesWidth){
        notesIni.style.width = localStorage.notesWidth;
    }
    if(localStorage.notesHeight){
        notesIni.style.height = localStorage.notesHeight;
    }
});


const dropdownToggle = document.querySelector('.dropdown-toggle');
const dropdownMenu = document.querySelector('.dropdown-menu');
const dropdownItems = document.querySelectorAll('.dropdown-item');

const dropdownMenuR = document.getElementsByClassName('dropdown-menuR');
const dropdownToggle2 = document.getElementsByClassName('dropdown-toggle2');

// Image sources
const images = {
    "Shot glass":    "./Images/icons/shot_icon.png",
    "Coctail glass":        "./Images/icons/coctail_glass_icon.png",
    "Copper mug":        "./Images/icons/copper_mug_icon.png",
    "Lonkero":        "./Images/icons/lonkero_icon.png",
    "Wine glass":        "./Images/icons/wine_glass_icon.png",
    "Vergi bottle":        "./Images/icons/vergi_icon.png",
    "Beer glass":        "./Images/icons/beer_icon.png",
    "Absentti":            "./Images/icons/absinthe_icon.png",
    "Shot glass 2":            "./Images/icons/shot2_icon.png",
    "Jägermeister":            "./Images/icons/jager_icon.png",
    "Mansikkavodka":            "./Images/icons/koskekorva_mansikka_icon.png",
    "Champagne":            "./Images/icons/champagne_icon.png",
    "Sake":            "./Images/icons/sake_icon.png",
    "Coctail glass 2":        "./Images/icons/coctail_glass_2_icon.png",
    "Cactus glass":       "./Images/icons/cactus_glass_icon.png",
    "Cartoon":           "./Images/icons/cartoon_coctail_icon.png",
    "Lonkero red":     "./Images/icons/lonkero_red_icon.png",
    "Lonkero yellow":          "./Images/icons/lonkero_yellow_icon.png",
    "Koff beer":          "./Images/icons/koff_beer_icon.png",
    "Koff lonkero":          "./Images/icons/koff_lonkero_icon.png",
    "Wine bottle": "./Images/icons/wine_bottle_icon.png",
    "White wine":          "./Images/icons/white_wine_icon.png",
    "Whiskey bottle":          "./Images/icons/whiskey_bottle_icon.png",
    "Whiskey ice":      "./Images/icons/whiskey_rocks_icon.png",
    "Beer bottle":          "./Images/icons/beer_bottle_icon.png",
    "Beer mug":         "./Images/icons/beer_mug_icon.png",
    "Whiskey anime":    "./Images/icons/whiskey_anime_icon.png",
    "Screwdriver":          "./Images/icons/screw_anime_icon.png",
    "Green coctail":          "./Images/icons/lemon_anime_icon.png",
    "Blue coctail":          "./Images/icons/blue_anime_icon.png",
    "Spiritus":          "./Images/icons/spiritus_anime_icon.png",
    "Ahma beer":           "./Images/icons/ahma_icon.png",
    "Red cup":              "./Images/icons/red_cup_icon.png",
    "Gin bottle":          "./Images/icons/gin_bottle_icon.png",
};


// Function to change the image source based on dropdown selection
function changeImage(value) {
    document.getElementById("selectImg").src = images[value];
    document.getElementById("mySelect").value = images[value];
    document.getElementById("dropdownMenuButton").innerText = value;
}

// Function to change the image source when hovering over dropdown item
function changeImageOnHover(value) {
    document.getElementById("selectImg").src = images[value];
}

// Event listeners
dropdownToggle.addEventListener('click', function() {
    dropdownMenu.classList.toggle('show');
    dropdownMenu.style.height = dropdownMenu.scrollHeight + "px";
});

//keeping track if menu or real item is pressed both are items
let realItemFlag = false;

dropdownItems.forEach(item => {
    const selectedValue = item.getAttribute('data-value');
    item.addEventListener('click', function() {
        if(selectedValue.includes("menu")){
            //nothing this is the menu
            dropdownItems.forEach(function(item) {
                if(item.getAttribute('data-value').includes("menu")){
                    item.classList.remove("selected");
                } });

                if(realItemFlag == true){
                    this.classList.add("selected")
                }
                else{
                    //clear all
                    dropdownItems.forEach(function(item) {
                        item.classList.remove("selected");
                    });
                    //new selected
                    this.classList.add("selected")
                    let menuSelectedValue = item.getElementsByClassName("dropdown-menuR")[0].getElementsByClassName("dropdown-item")[0].getAttribute('data-value');
                    item.getElementsByClassName("dropdown-menuR")[0].getElementsByClassName("dropdown-item")[0].classList.add("selected");
                    changeImage(menuSelectedValue);
                }
            realItemFlag = false;
        }
        else{
        changeImage(selectedValue);
        dropdownMenu.classList.remove('show');

        dropdownItems.forEach(function(item) {
            item.classList.remove("selected");
        });
        // Add 'selected' class to the clicked item
        this.classList.add("selected");
        realItemFlag = true;
        }
    });
    item.addEventListener('mouseenter', function() {
        
        if(selectedValue.includes("menu")){
            let menuSelectedValue = item.getElementsByClassName("dropdown-menuR")[0].getElementsByClassName("dropdown-item")[0].getAttribute('data-value');
            changeImageOnHover(menuSelectedValue);
        }
        else{
            changeImageOnHover(selectedValue);
        }
    });
    item.addEventListener('mouseleave', function(event) {
        if(event.relatedTarget.classList.contains("dropdown-item")){
            //no change
        }
        else{
            document.getElementById("selectImg").src = document.getElementById("mySelect").value;
        }
        
    });
});

for(let i = 0; i < dropdownToggle2.length; i++){
dropdownToggle2[i].addEventListener('hover', function() {

    
    dropdownMenuR[i].classList.toggle('show');
    dropdownMenuR[i].style.height = dropdownMenuR[0].scrollHeight + "px";
    
})}

// Close the dropdown when clicking outside of it
window.addEventListener('click', function(event) {
    if (!event.target.matches('.dropdown-toggle')) {
        dropdownMenu.classList.remove('show');
    }
});
//settings audio control
let audio1 = document.getElementById("audio1");
let audio2 = document.getElementById("audio2");
var alertVolume = 1.0;
var wheelVolume = 0.2;

//try to get them from local stroge
if(localStorage.alertVolume){
    alertVolume = localStorage.alertVolume;
}
else{
    alertVolume = 1.0;
}
if(localStorage.wheelVolume){
    wheelVolume = localStorage.wheelVolume;
}
else{
    wheelVolume = 0.2;
}

audio1.volume = alertVolume;
audio2.volume = wheelVolume;

audio1.addEventListener("volumechange", function() {
  var volume = this.volume;
  document.getElementById("audio1p").innerHTML = 'timer: <span class="lava">'+ (volume * 100).toFixed(0)+' %</span>'
  alertVolume = volume;
  localStorage.alertVolume = alertVolume;
});
audio2.addEventListener("volumechange", function() {
    var volume = this.volume;
    document.getElementById("audio2p").innerHTML = 'wheelspin: <span class="lava">'+(volume * 100).toFixed(0)+' %</span>'
    wheelVolume = volume;
    localStorage.wheelVolume = wheelVolume;
  });


// wheel disabler 

// buttons to change wheels'
const wheelPopupDis = document.getElementById("wheelPopupDis");
let disabledWheels = [];

const painButtonDis = document.getElementById("wheelChoosePainDis");
painButtonDis.addEventListener("click", function () {
    disabledWheels.push('WHEEL CHANGE : Pain Free');
    painButton.disabled = true;
    painButton.classList.add("disabledButton");
    painButton.getElementsByTagName("img")[0].src = "./Images/icons/no_pain_d_icon.png";

    painButtonDis.disabled = true;
    painButtonDis.classList.add("disabledButton");
    painButtonDis.getElementsByTagName("img")[0].src = "./Images/icons/no_pain_d_icon.png";
});

const enemiesButtonDis = document.getElementById("wheelChooseEnemiesDis");
enemiesButtonDis.addEventListener("click", function () {
    disabledWheels.push('WHEEL CHANGE : I have no enemies');
    enemiesButton.disabled = true;
    enemiesButton.classList.add("disabledButton");
    enemiesButton.getElementsByTagName("img")[0].src = "./Images/icons/no_enemies_jesus_d_icon.png";

    enemiesButtonDis.disabled = true;
    enemiesButtonDis.classList.add("disabledButton");
    enemiesButtonDis.getElementsByTagName("img")[0].src = "./Images/icons/no_enemies_jesus_d_icon.png";
});

const memesButtonDis = document.getElementById("wheelChooseMemesDis");
memesButtonDis.addEventListener("click", function () {
    disabledWheels.push('WHEEL CHANGE : Box of Memes')
    memesButton.disabled = true;
    memesButton.classList.add("disabledButton");
    memesButton.getElementsByTagName("img")[0].src = "./Images/icons/memes_d_icon.png";

    memesButtonDis.disabled = true;
    memesButtonDis.classList.add("disabledButton");
    memesButtonDis.getElementsByTagName("img")[0].src = "./Images/icons/memes_d_icon.png";
});

const vergiButtonDis = document.getElementById("wheelChooseVergiDis");
vergiButtonDis.addEventListener("click", function () {
    disabledWheels.push('WHEEL CHANGE : Vergipsycho');
    vergiButton.disabled = true;
    vergiButton.classList.add("disabledButton");
    vergiButton.getElementsByTagName("img")[0].src = "./Images/icons/vergi_d_icon.png";

    vergiButtonDis.disabled = true;
    vergiButtonDis.classList.add("disabledButton");
    vergiButtonDis.getElementsByTagName("img")[0].src = "./Images/icons/vergi_d_icon.png";
});

const sittingButtonDis = document.getElementById("wheelChooseSittingDis");
sittingButtonDis.addEventListener("click", function () {
    disabledWheels.push('WHEEL CHANGE : No Sitting');
    sittingButton.disabled = true;
    sittingButton.classList.add("disabledButton");
    sittingButton.getElementsByTagName("img")[0].src = "./Images/icons/no_sitting_d_icon.png";

    sittingButtonDis.disabled = true;
    sittingButtonDis.classList.add("disabledButton");
    sittingButtonDis.getElementsByTagName("img")[0].src = "./Images/icons/no_sitting_d_icon.png";
});

const defaultButtonDis = document.getElementById("wheelChooseDefaultDis");
defaultButtonDis.addEventListener("click", function () {
    disabledWheels.push("default"); // you cant roll default wheel only change to it
    defaultButton.disabled = true;
    defaultButton.classList.add("disabledButton");
    defaultButton.getElementsByTagName("img")[0].src = "./Images/icons/default_d_icon.png";

    defaultButtonDis.disabled = true;
    defaultButtonDis.classList.add("disabledButton");
    defaultButtonDis.getElementsByTagName("img")[0].src = "./Images/icons/default_d_icon.png";
});


// BUTTONS FOR TEXTEDITORS 

function updateRow() {
    const textarea = document.getElementById('textarea1');
    const textBeforeCursor = textarea.value.slice(0, textarea.selectionStart);
    const currentRow = textBeforeCursor.split('\n').length;
    console.log(currentRow);
}

document.getElementById('textarea1').addEventListener('input', updateRow);