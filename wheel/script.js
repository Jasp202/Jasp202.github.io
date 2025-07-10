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
    peoplePlaying.push(new PersonPlaying(counterTextInput.value, [], tempShotColor))
    
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

document.getElementById("containerTest").addEventListener("contextmenu", function(e){
    rightClickTurns(e);
});
document.getElementById("rollAgainButton").addEventListener('click', function() {
    rollForSamePerson = true;
    spinBtn.click();
});
document.getElementById("resetRolledButton").addEventListener('click', function() {
    removeDaresFromPlayer(peoplePlaying, currentPlayer);
    drawPie(dataDaresPie);
});
document.getElementById("resetRolledAllButton").addEventListener('click', function() {
    peoplePlaying.forEach((plr) => {
        plr.cleanDares();
    })
    drawPie(dataDaresPie);
});
function removeDaresFromPlayer(array, index){
    if(array.length == 0) return;
    array[mod(index, array.length)].cleanDares();
}
document.getElementById("nextTurnButton").addEventListener('click', function() {

    if(turnsEnabled) {
        currentPlayer += 1;
        highlightCurrentPlayer(getShotButtonDivs());
        drawPie(dataDaresPie);
    }
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
    clone.style.marginBottom = "5px"
    clone.getElementsByTagName('div')[0].innerHTML = counterTextInput.value;
    clone.getElementsByTagName('div')[0].style.width = "100px";
    clone.getElementsByTagName('img')[0].src = document.getElementById("mySelect").value;
    clone.getElementsByTagName('img')[0].style.height = "129px";
    clone.querySelectorAll("*").forEach(el => {
            el.style.color = tempShotColor})

    var shadowColor = "rgb(255, 217, 0)";
    getAverageColorFromImageSrc(clone.getElementsByTagName('img')[0].src, (avgColor) => {
        if (avgColor) {
            shadowColor = avgColor;
        } else {
            shadowColor = "rgb(255, 217, 0)";
        }
        clone.getElementsByTagName('img')[0].style.filter = `drop-shadow(  1px  0px 0px black)drop-shadow(  -1px  0px 0px black)drop-shadow(  0px  1px 0px black)drop-shadow(  0px  -1px 0px black)drop-shadow(  3px  0px 0px ${shadowColor})drop-shadow(  -3px  0px 0 ${shadowColor})drop-shadow(  0px  3px 0 ${shadowColor})drop-shadow(  0px  -3px 0 ${shadowColor})`
      });

      
    
    clone.addEventListener('mouseover', function () {
        this.style.filter = `drop-shadow(0 0 1rem ${shadowColor})drop-shadow(0 0 1rem ${shadowColor})`
        this.style.transition = "all 0.3s ease";
        
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
                peoplePlaying[index].cleanDares();
                dataShots.names.splice(index, 1);
                dataShots.counts.splice(index, 1);
                dataShots.images.splice(index, 1);
                dataShots.colors.splice(index, 1);
                peoplePlaying.splice(index, 1);
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
    img.style.filter = `drop-shadow(  0.3px  0px 0px black)drop-shadow(  -0.3px  0px 0px black)drop-shadow(  0px  0.3px 0px black)drop-shadow(  0px  -0.3px 0px black)`
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
   dataShots.colors.push(tempShotColor);
   localStorage.dataShots = JSON.stringify(dataShots);
    
   return clone;
}

function shotStorageChange(dataGiven) {
    localStorage.setItem("shotData", dataGiven);
}

function mod(n, m) {
    if (m === 0) {
    return 0;
    }
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


function wheelSound(src, speed, vol) {
    switch(src){
        case "vine":
            this.sound = document.getElementById("sound2");
            break;
        case "alarm":
            this.sound = document.getElementById("audio1");
            break;
        case "wheel":
            this.sound = document.getElementById("audio2");
            break;
        default: //coin
            this.sound = document.getElementById("sound1");
            break;
    }
    this.sound.loop = "";
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
    
    switch(src){
        case "vine":
            this.sound = document.getElementById("sound2");
            break;
        case "alarm":
            this.sound = document.getElementById("audio1");
            break;
        case "wheel":
            this.sound = document.getElementById("audio2");
            break;
        case "spin":
            this.sound = document.getElementById("soundSlotSpin");
            break;
        case "win":
            this.sound = document.getElementById("soundSlotWin");
            break;
        default: //coin
            this.sound = document.getElementById("sound1");
            break;
    }
    
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


function change_wheel() {
    gotoriginal = false;
    switch(current_wheel) {
        case "no pain":
            document.getElementById("triangleCSS").style.borderTop = "55px solid " + "#2E86C1";
            spinColors = json_pain_free.colors;
            
            break;
        case "no enemies":
            document.getElementById("triangleCSS").style.borderTop = "55px solid " + '#B8C795';
            spinColors = json_no_enemies.colors;
            document.getElementById("headerText").className = "vinlandFont";
            document.getElementById("headerText").innerHTML = " I HAVE NO ENEMIES";
            textWheelIcon.innerHTML = "no enemies";
            break;
        case "memes":
            document.getElementById("triangleCSS").style.borderTop = "55px solid " + '#2bdc4c';
            spinColors = json_memes.colors;
            document.getElementById("headerText").className = "";
            document.getElementById("headerText").innerHTML = 
            `<div class="containerh1Text">
            <div class="neon"> Iivo Wonkyn</div>
            <div class="flux">Dare Factory</div>
            </div>`;
            textWheelIcon.innerHTML = "IWDF";
            break;
        case "vergipsycho":
            document.getElementById("triangleCSS").style.borderTop = "55px solid " + '#00ff9f';
            spinColors = json_vergi_psycho.colors;
            document.getElementById("headerText").className = "cyberFont";
            document.getElementById("headerText").innerHTML = "vergiPsycho";
            textWheelIcon.innerHTML = "vergiPsycho";
            break;
        case "no sitting":
            document.getElementById("triangleCSS").style.borderTop = "55px solid " + "#447654";
            spinColors = json_no_sitting.colors;
            document.getElementById("headerText").className = "armyFont";
            document.getElementById("headerText").innerHTML = "NO SITTING";
            textWheelIcon.innerHTML = "no sitting";
            break;
        case "default":
            document.getElementById("triangleCSS").style.borderTop = "55px solid " + "#E74C3C";
            spinColors = json_default.colors;
            document.getElementById("headerText").className = "defaulHeader";
            document.getElementById("headerText").innerHTML = "DEFAULT WHEEL";
            textWheelIcon.innerHTML = "default";
            break;
        default:
            
    }
    
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
 
function parseOrDefault(input) {
    // Use parseInt to attempt converting the input to a number
    const parsed = parseInt(input);

    // Check if the result is NaN (not a valid number)
    if (isNaN(parsed)) {
        return 1;  // Return 1 if the input is invalid
    }

    return parsed;  // Return the parsed number if valid
}

// load dare sets from local storage or js file jsons
if(localStorage.defaultJSON){
    wheeldata_Default = JSON.parse(localStorage.defaultJSON)

    if(localStorage.plusdefaultDare){
        dareNums = localStorage.plusdefaultDare.split("\n");
        
        dareNames = wheeldata_Default.dares;
        arrr = [];
        for(i=0; i < dareNames.length; i++){
            for(j=0; j < parseOrDefault(dareNums[i]); j++){
                arrr.push(dareNames[i]);
            }
        }
        wheeldata_Default.dares = arrr;
        
    };
    if(localStorage.plusdefaultEnvironment){
        dareNums = localStorage.plusdefaultEnvironment.split("\n");
        dareNames = wheeldata_Default.environments;
        
        arrr = [];
        for(i=0; i < dareNames.length; i++){
            for(j=0; j < parseOrDefault(dareNums[i]); j++){
                arrr.push(dareNames[i]);
            }
        }
        wheeldata_Default.environments = arrr;
        
    };
    if(localStorage.plusdefaultWheel){
        dareNums = localStorage.plusdefaultWheel.split("\n");
        dareNames = wheeldata_Default.wheel_changes;
        
        arrr = [];
        for(i=0; i < dareNames.length; i++){
            for(j=0; j < parseOrDefault(dareNums[i]); j++){
                arrr.push(dareNames[i]);
            }
        }
        wheeldata_Default.wheel_changes = arrr;
        
    };


}
else{
    wheeldata_Default = json_default;
}

if(localStorage.painJSON){
    wheeldata_Pain_Free = JSON.parse(localStorage.painJSON)

    if(localStorage.pluspainDare){
        dareNums = localStorage.pluspainDare.split("\n");
        dareNames = wheeldata_Pain_Free.dares;
        arrr = [];
        for(i=0; i < dareNames.length; i++){
            for(j=0; j < parseOrDefault(dareNums[i]); j++){
                arrr.push(dareNames[i]);
            }
        }
        wheeldata_Pain_Free.dares = arrr;
        
    };
    if(localStorage.pluspainEnvironment){
        dareNums = localStorage.pluspainEnvironment.split("\n");
        dareNames = wheeldata_Pain_Free.environments;
        
        arrr = [];
        for(i=0; i < dareNames.length; i++){
            for(j=0; j < parseOrDefault(dareNums[i]); j++){
                arrr.push(dareNames[i]);
            }
        }
        wheeldata_Pain_Free.environments = arrr;
        
    };
    if(localStorage.pluspainWheel){
        dareNums = localStorage.pluspainWheel.split("\n");
        dareNames = wheeldata_Pain_Free.wheel_changes;
        
        arrr = [];
        for(i=0; i < dareNames.length; i++){
            for(j=0; j < parseOrDefault(dareNums[i]); j++){
                arrr.push(dareNames[i]);
            }
        }
        wheeldata_Pain_Free.wheel_changes = arrr;
        
    };
}
else{
    wheeldata_Pain_Free = json_pain_free;
}

if(localStorage.enemiesJSON){
    wheeldata_No_Enemies = JSON.parse(localStorage.enemiesJSON)

    if(localStorage.plusenemiesDare){
        dareNums = localStorage.plusenemiesDare.split("\n");
        dareNames = wheeldata_No_Enemies.dares;
        arrr = [];
        for(i=0; i < dareNames.length; i++){
            for(j=0; j < parseOrDefault(dareNums[i]); j++){
                arrr.push(dareNames[i]);
            }
        }
        wheeldata_No_Enemies.dares = arrr;
        
    };
    if(localStorage.plusenemiesEnvironment){
        dareNums = localStorage.plusenemiesEnvironment.split("\n");
        dareNames = wheeldata_No_Enemies.environments;
        
        arrr = [];
        for(i=0; i < dareNames.length; i++){
            for(j=0; j < parseOrDefault(dareNums[i]); j++){
                arrr.push(dareNames[i]);
            }
        }
        wheeldata_No_Enemies.environments = arrr;
        
    };
    if(localStorage.plusenemiesWheel){
        dareNums = localStorage.plusenemiesWheel.split("\n");
        dareNames = wheeldata_No_Enemies.wheel_changes;
        
        arrr = [];
        for(i=0; i < dareNames.length; i++){
            for(j=0; j < parseOrDefault(dareNums[i]); j++){
                arrr.push(dareNames[i]);
            }
        }
        wheeldata_No_Enemies.wheel_changes = arrr;
        
    };
}
else{
    wheeldata_No_Enemies = json_no_enemies;
}

if(localStorage.vergiJSON){
    wheeldata_Vergi_psycho = JSON.parse(localStorage.vergiJSON)

    if(localStorage.plusvergiDare){
        dareNums = localStorage.plusvergiDare.split("\n");
        dareNames = wheeldata_Vergi_psycho.dares;
        arrr = [];
        for(i=0; i < dareNames.length; i++){
            for(j=0; j < parseOrDefault(dareNums[i]); j++){
                arrr.push(dareNames[i]);
            }
        }
        wheeldata_Vergi_psycho.dares = arrr;
        
    };
    if(localStorage.plusvergiEnvironment){
        dareNums = localStorage.plusvergiEnvironment.split("\n");
        dareNames = wheeldata_Vergi_psycho.environments;
        
        arrr = [];
        for(i=0; i < dareNames.length; i++){
            for(j=0; j < parseOrDefault(dareNums[i]); j++){
                arrr.push(dareNames[i]);
            }
        }
        wheeldata_Vergi_psycho.environments = arrr;
        
    };
    if(localStorage.plusvergiWheel){
        dareNums = localStorage.plusvergiWheel.split("\n");
        dareNames = wheeldata_Vergi_psycho.wheel_changes;
        
        arrr = [];
        for(i=0; i < dareNames.length; i++){
            for(j=0; j < parseOrDefault(dareNums[i]); j++){
                arrr.push(dareNames[i]);
            }
        }
        wheeldata_Vergi_psycho.wheel_changes = arrr;
        
    };
}
else{
    wheeldata_Vergi_psycho = json_vergi_psycho;
}

if(localStorage.sittingJSON){
    wheeldata_No_Sitting = JSON.parse(localStorage.sittingJSON)

    if(localStorage.plussittingDare){
        dareNums = localStorage.plussittingDare.split("\n");
        dareNames = wheeldata_No_Sitting.dares;
        arrr = [];
        for(i=0; i < dareNames.length; i++){
            for(j=0; j < parseOrDefault(dareNums[i]); j++){
                arrr.push(dareNames[i]);
            }
        }
        wheeldata_No_Sitting.dares = arrr;
        
    };
    if(localStorage.plussittingEnvironment){
        dareNums = localStorage.plussittingEnvironment.split("\n");
        dareNames = wheeldata_No_Sitting.environments;
        
        arrr = [];
        for(i=0; i < dareNames.length; i++){
            for(j=0; j < parseOrDefault(dareNums[i]); j++){
                arrr.push(dareNames[i]);
            }
        }
        wheeldata_No_Sitting.environments = arrr;
        
    };
    if(localStorage.plussittingWheel){
        dareNums = localStorage.plussittingWheel.split("\n");
        dareNames = wheeldata_No_Sitting.wheel_changes;
        
        arrr = [];
        for(i=0; i < dareNames.length; i++){
            for(j=0; j < parseOrDefault(dareNums[i]); j++){
                arrr.push(dareNames[i]);
            }
        }
        wheeldata_No_Sitting.wheel_changes = arrr;
        
    };
}
else{
    wheeldata_No_Sitting = json_no_sitting;
}

if(localStorage.memesJSON){
    wheeldata_Memes = JSON.parse(localStorage.memesJSON)

    if(localStorage.plusmemesDare){
        dareNums = localStorage.plusmemesDare.split("\n");
        dareNames = wheeldata_Memes.dares;
        arrr = [];
        for(i=0; i < dareNames.length; i++){
            for(j=0; j < parseOrDefault(dareNums[i]); j++){
                arrr.push(dareNames[i]);
            }
        }
        wheeldata_Memes.dares = arrr;
        
    };
    if(localStorage.plusmemesEnvironment){
        dareNums = localStorage.plusmemesEnvironment.split("\n");
        dareNames = wheeldata_Memes.environments;
        
        arrr = [];
        for(i=0; i < dareNames.length; i++){
            for(j=0; j < parseOrDefault(dareNums[i]); j++){
                arrr.push(dareNames[i]);
            }
        }
        wheeldata_Memes.environments = arrr;
        
    };
    if(localStorage.plusmemesWheel){
        dareNums = localStorage.plusmemesWheel.split("\n");
        dareNames = wheeldata_Memes.wheel_changes;
        
        arrr = [];
        for(i=0; i < dareNames.length; i++){
            for(j=0; j < parseOrDefault(dareNums[i]); j++){
                arrr.push(dareNames[i]);
            }
        }
        wheeldata_Memes.wheel_changes = arrr;
        
    };
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
    colors: [],
};
var tempShotColor = "white";

if (localStorage.dataShots) {
    // there is something
    
    let dataShotsTemp = JSON.parse(localStorage.dataShots);
    normalizeDataShotsColors(dataShotsTemp);
    
    localStorage.dataShots = JSON.stringify(dataShots);

    for (let i = 0; i < dataShotsTemp.names.length; i++){

        counterTextInput.value = dataShotsTemp.names[i];
        document.getElementById("mySelect").value = dataShotsTemp.images[i];
        tempShotColor = getSafeShotColorAtIndex(dataShotsTemp, i);

        let item = CreateNewDom();
        item.getElementsByTagName('div')[1].innerHTML = dataShotsTemp.counts[i];


        //set default settings back for shot creator
        counterTextInput.value = '';
        document.getElementById("mySelect").value = "./Images\icons/default_icon.png";
        document.getElementById("mySelect").options[0].selected = true;
    }
    tempShotColor = "white";
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
const pieHolder = document.getElementById("pieHolder")

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
    switch(current_wheel) {
            case "no enemies":
                getDataDareEnemies();
                updateValueOfShots(dataDaresPie);
                drawPie(dataDaresPie);
                break;
            case "memes":
                getDataDareMeme();
                updateValueOfShots(dataDaresPie);
                drawPie(dataDaresPie);
                break;
            case "vergipsycho":
                getDataDareVergi();
                updateValueOfShots(dataDaresPie);
                drawPie(dataDaresPie);
                break;
            case "no sitting":
                getDataDareSitting();
                updateValueOfShots(dataDaresPie);
                drawPie(dataDaresPie);
                break;
            case "default":
                getDataDareDefault();
                updateValueOfShots(dataDaresPie);
                drawPie(dataDaresPie);
                break;
            default:
                break;
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
const checkBoom = document.getElementById('radioBoom');
const checkDefault = document.getElementById('radioDefault');
const checkSlots = document.getElementById('radioSlots');

let BoomSetting = false;
let SlotsSetting = false;

if(localStorage.BoomSetting == "true"){
    checkBoom.checked = true;
    BoomSetting = true;
}
if(localStorage.SlotsSetting == "true"){
    checkSlots.checked = true;
    SlotsSetting = true;
}

checkBoom.addEventListener('change', (event) => {
    if (event.currentTarget.checked) {
        BoomSetting = true;
        SlotsSetting = false;
        localStorage.BoomSetting = true;
        localStorage.SlotsSetting = false;
        
    } else {
        BoomSetting = false;
        localStorage.BoomSetting = false;
        
    }
});
checkSlots.addEventListener('change', (event) => {
    if (event.currentTarget.checked) {
        BoomSetting = false;
        SlotsSetting = true;
        localStorage.BoomSetting = false;
        localStorage.SlotsSetting = true;
        
    } else {
        SlotsSetting = false;
        localStorage.SlotsSetting = false;
    }
});
checkDefault.addEventListener('change', (event) => {
    if (event.currentTarget.checked) {
        
        BoomSetting = false;
        SlotsSetting = false;
        localStorage.BoomSetting = false;
        localStorage.SlotsSetting = false;
    }
});
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
    change_wheel()
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
    change_wheel()
    getDataDareEnemies();
    updateValueOfShots(dataDaresPie);
    drawPie(dataDaresPie);
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
    change_wheel()
    getDataDareMeme();
    updateValueOfShots(dataDaresPie);
    drawPie(dataDaresPie);
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
    change_wheel()
    getDataDareVergi();
    updateValueOfShots(dataDaresPie);
    drawPie(dataDaresPie);
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
    change_wheel()
    getDataDareSitting();
    updateValueOfShots(dataDaresPie);
    drawPie(dataDaresPie);
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
    change_wheel()
    getDataDareDefault();
    updateValueOfShots(dataDaresPie);
    drawPie(dataDaresPie);
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



document.getElementById("containerTest").style.maxWidth = "24.37rem";
/* --------------- Chart To Image --------------------- */

spinImage.src = "";

/* --------------- Display Value Based On The Angle --------------------- */
let current_type = "1"; // gets number, E or W
let current_wheel = "default"

function generateValue(OriginalangleValue, angleValue = Math.floor(mod(90 - OriginalangleValue, 360) *dares_count / 360)){
    
        text.innerHTML = `${spinValues[angleValue][2]}`;
        text2.innerHTML = `${spinValues[angleValue][2]}`;
           
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
            clearInterval(timerInterval);
            function playSoundWithAlert() {
                var mySound = new alarmSound("alarm", alertVolume);
            
                // Wrap the play method in a Promise
                return new Promise((resolve, reject) => {
                    try {
                        mySound.play(); // Play the sound
                        resolve(mySound); // Resolve with the sound instance
                    } catch (error) {
                        reject(error); // Reject the promise if an error occurs
                    }
                });
            }
            
            // Use the Promise structure
            playSoundWithAlert()
                .then((mySound) => {
                    // Wait 100ms for the alert after playing the sound
                    return new Promise((resolve) => {
                        setTimeout(() => {
                            alert("Timer is done");
                            resolve(mySound);
                        }, 100);
                    });
                })
                .then((mySound) => {
                    // Stop the sound 5ms after the alert
                    setTimeout(() => {
                        mySound.stop();
                    }, 5);
                })
                .catch((error) => {
                    console.error("An error occurred:", error);
                });
            
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
function inverseSecretShotPercent(x){ // polynomial ivese made with machine learning fitting ofr range 0.1, 0.5
    return -0.050716-0.207709*x+9.451340*x*x-26.148516*x*x*x+32.922510*x*x*x*x
}
let shotMultiplier = 0.1;
let extraShotsCheck = false;

const extraShots = document.getElementById('extraShots');
document.getElementById("labelSliderMul").innerHTML = "Amount of rolls that are rounds of shots: <span class='beerColor'>10%</span>"; // Display the default slider value

if(localStorage.extraShotsCheck == "true"){
    extraShots.checked = true;
    extraShotsCheck = true;
    secret = true;
    document.getElementById("sliderContainer").classList.remove("disabled");
    document.getElementById("sliderMul").style.cursor = "pointer"
    document.getElementById("sliderMul").disabled = false;
}
else{
    extraShotsCheck = false;
}
if(localStorage.extraShotsMult && extraShotsCheck){
    const mult = Number(localStorage.extraShotsMult);
    document.getElementById("sliderMul").value = Math.round(100 * mult);
    document.getElementById("labelSliderMul").innerHTML = "Amount of rolls that are rounds of shots: <span class='beerColor'>" + Math.round(100 * mult) + "%</span>";
    document.getElementById('whiteOverlay').style.transform = `scaleX(${1-mult})`
    shotMultiplier = mult;
    
}

extraShots.addEventListener('change', (event) => {
if (event.currentTarget.checked) {
    secret = true;
    document.getElementById("sliderContainer").classList.remove("disabled");
    document.getElementById("sliderMul").style.cursor = "pointer"
    document.getElementById("sliderMul").disabled = false;
    updateValueOfShots(dataDaresPie)
    localStorage.extraShotsCheck = true;
} else {
    secret = false;
    document.getElementById("sliderContainer").classList.add("disabled");
    document.getElementById("sliderMul").style.cursor = "not-allowed"
    document.getElementById("sliderMul").disabled = true;
    returnValueOfShots(dataDaresPie)
    localStorage.extraShotsCheck = false;
}
});

const checkboxConsecRos = document.getElementById('extraShotsFairness');
let noConsecRos = false;
if(localStorage.noConsecRos == "true"){
    checkboxConsecRos.checked = true;
    noConsecRos = true
}
else{
    noConsecRos = false;
    
}
checkboxConsecRos.addEventListener('change', (event) => {
    if (event.currentTarget.checked) {
        noConsecRos = true;
        localStorage.noConsecRos = true;
        
    } else {
        noConsecRos = false;
        localStorage.noConsecRos = false;
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

  window.addEventListener("keydown", e => {
    if (e.key == "ArrowUp"){
        switch (e.target.tagName.toLowerCase()) { // we dont want to activate the wheel when pressing space in textboxes etc.
            case "input":
            case "textarea":
            case "select":
            case "p":
            case "span":
            // ...and so on for other elements you want to exclude; thanks stackexchange
              break;
            default:
                btnArr = Array.from(document.querySelectorAll('.shotclass > button')).slice(1);
                btnArr.forEach( (b) => b.click());
              break;
        }
    
    }
  })
  window.addEventListener("keydown", e => {
    if (e.key == "ArrowDown"){
        switch (e.target.tagName.toLowerCase()) { // we dont want to activate the wheel when pressing space in textboxes etc.
            case "input":
            case "textarea":
            case "select":
            case "p":
            case "span":
            // ...and so on for other elements you want to exclude; thanks stackexchange
              break;
            default:
                const eventA = new MouseEvent("contextmenu", {
                    bubbles: true,         // The event bubbles up through the DOM
                    cancelable: true,      // The event can be canceled
                    view: window,          // The view is set to the window object
                    button: 2              // Button 2 for the right-click (context menu)
                });

                btnArr = Array.from(document.querySelectorAll('.shotclass > button')).slice(1);
                btnArr.forEach( (b) => {
                    b.dispatchEvent(eventA);
                    document.getElementById("removeButton").click();
                });
              break;
        }
    
    }
  })

/* --------------- button controls --------------------- */
window.addEventListener("keydown", (e) => {
    if (e.key == " " || e.key == "Enter"){
        if (myPopup.classList.toString().includes("show")){
            myPopup.classList.remove("show");
            document.getElementById("popupbackground").style.display = "none";
            document.querySelector(".slots").style.display = "none";
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
                    if(document.querySelector(".slots").style.display != "none"){
                        document.querySelector(".slots").style.display = "none";
                    }
                    else{
                        spinBtn.click();
                    }
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
const confessionWheel = shuffle([
'Who is your idol',
'Name a person you DESPISE and why',
'Pick your death row meal',
'Last lie you told (preferably to one of the boys) / TEOLLE JOURNAL PAGE (FUCK YOU)',
'Reveal one thing on your bucket list',
'Fictional character (Movie/TV/Game/Anime) youd bang',
'Favourite or least favourite cliche in fiction',
'Dodgy thing youve done alone',
'Reveal your kink',
'Most perverted thing youve done',
'Biggest pet peeve about one of the boys',
'Most embarassing bathroom story',
'Tell us a morally bad thing youve done',
'Reveal your first or most recent celebrity crush',
'What is your dream blunt rotation 2-4 people (living or dead, fictional or real)',
'Whats the pettiest thing youve done',
'Tell us the dumbest thing you ever believed 100%',
'Whats your GUILTY pleasure that you shouldnt admit',
'Cringiest thing youve done to impress someone',
]);
var currentConfessionCount = 0;
var confessionWheelLength = confessionWheel.length;
//#region spinning
var rollForSamePerson = false;
spinBtn.addEventListener("click", () => {
    
    if(!(peoplePlaying.length == 0) && turnsEnabled){
            if(current_type !== "W" && !rollForSamePerson) currentPlayer += 1;
            rollForSamePerson = false;
        }
    drawPie(dataDaresPie);
    if(turnsEnabled) highlightCurrentPlayer(getShotButtonDivs())
    let count = 100;
    spinBtn.disabled = true;
    let test_dare = "";
    //roll dare and check for flags

    let rolledDare = 360 * Math.random(); // angle for the initial dare rolled this spin

    // check that dare is not the same as previous one /(#¤/(#))
    //
    let rosPer = calculateRoundOfShotsPercantege(dataDaresPie);
    markovCoin.pHeadsAfterTailChange(rosPer);

    if(noConsecRos ? markovCoin.next() : markovCoin.nextFair()){ // roll analog round of shots
        
        let safeSlice = 360 / (2 * totalValue);
        let safeStartAngle = 360 * Math.random();
        let indices = Array.from({ length: 2 * totalValue }, (_, i) => i);
        indices = shuffle(indices);
        for (let i = 0; i < indices.length; i++) {
            rolledDare = indices[i] * safeSlice + safeStartAngle;
            current_type = pullPieType(rolledDare, totalValue);
            test_dare = pullPieDare(rolledDare, totalValue);
            
            if (
                test_dare.toLowerCase().includes(". round of shots")
            ) {
                break; // Found a valid one
            }
        }
    }else if((current_type == "W") || (w_disabled == true)){ // roll for dare and we dont want W or round of shots or prev.
        
        let safeSlice = 360 / (2 * totalValue);
        let safeStartAngle = 360 * Math.random();
        let indices = Array.from({ length: 2 * totalValue }, (_, i) => i);
        indices = shuffle(indices);
        let currentPlayerDares = (peoplePlaying.length == 0 || !turnsEnabled) ? [] : peoplePlaying[mod(currentPlayer, peoplePlaying.length)].dares;
        for (let i = 0; i < indices.length; i++) {
            rolledDare = indices[i] * safeSlice + safeStartAngle;
            current_type = pullPieType(rolledDare, totalValue);
            test_dare = pullPieDare(rolledDare, totalValue);
            
            if (
                test_dare !== previous_dare &&
                current_type !== "W" &&
                !test_dare.toLowerCase().includes(". round of shots") &&
                !currentPlayerDares.includes(current_wheel + test_dare)
            ) {
                
                break; // Found a valid one
            }
        }
    }else{ // roll for dare we dont want prev or round of shots
        
        let safeSlice = 360 / (2 * totalValue);
        let safeStartAngle = 360 * Math.random();
        let indices = Array.from({ length: 2 * totalValue }, (_, i) => i);
        indices = shuffle(indices);
        let currentPlayerDares = (peoplePlaying.length == 0 || !turnsEnabled) ? [] :peoplePlaying[mod(currentPlayer, peoplePlaying.length)].dares;
        for (let i = 0; i < indices.length; i++) {
            rolledDare = indices[i] * safeSlice + safeStartAngle;
            current_type = pullPieType(rolledDare, totalValue);
            test_dare = pullPieDare(rolledDare, totalValue);
            
            if (
                test_dare !== previous_dare &&
                !test_dare.toLowerCase().includes(". round of shots") &&
                !currentPlayerDares.includes(current_wheel + test_dare)
            ) {
                break; // Found a valid one
            }
        }
    }


    //old

    
    // if secret is activated then this replaces rolled dare
    //if (secret == true && Math.random() > 1.0-inverseSecretShotPercent(shotMultiplier) && !(previous_dare.toLowerCase().includes(". round of shots")) && current_wheel != "no pain"){
    //    rolledDare = inverseDareToAngle(findAngleByString(". round of shots"));
    //        
    //    current_type = pullPieType(rolledDare, totalValue);
    //    test_dare = pullPieDare(rolledDare, totalValue);
    //} 
    // if hidden dare is next
    if (hiddenPrimed){
        test_dare =  "1" + String(Math.floor(Math.random() * 24) + 1).padStart(2, '0') + ". " + hiddenDare;
        current_type = "11";
    }
    
    //dare has been rolled 
    var mySound = new wheelSound("wheel", fast_roll, wheelVolume);
    mySound.play();

    // roate pic 
    let rotationInterval = window.setInterval(() => {

    if (count < 200) {
        pieHolder.style.transform = "rotate(" + 360 * Math.random() + "deg)" ;
        if(count % 2 == 0){
            generateValuePie(180 * Math.random(), totalValue);
        };
    }
    else {
        pieHolder.style.transform = "rotate("  +  (-100000/Math.pow(count-199, 1.5) + 12.4533 - 36000 / (1 + 10 *count)  + rolledDare + 6 - 90) + "deg)";
        if(count % 2 == 0){
            generateValuePie((-100000/Math.pow(count-199, 1.5) + 12.4533 -36000 / (1 + 10*count)  + rolledDare + 6 ), totalValue);
        };
    }

    
    count = count + fast_roll; // fast roll is 1 or 10 
    if (count >= 600) {

        clearInterval(rotationInterval);
        generateValuePie(rolledDare, totalValue);
        if(hiddenPrimed){
            hiddenPrimed = false;
            text.innerHTML = test_dare;
            text2.innerHTML = test_dare;
        }
        if (current_type == "notUsed") {
            textE.innerHTML = test_dare.replace("ENVIRONMENT : ", "");
            textE.style.fontSize =  "" + (2.8 * Math.min(1, 0.9*(32.0 / textE.innerText.length)))   + "rem";
            previous_environment = test_dare;
        }
        else{
            previous_dare = test_dare;
        };

        //glow for people playing. 
        if(!(peoplePlaying.length == 0) && turnsEnabled){
            peoplePlaying[mod(currentPlayer, peoplePlaying.length)].pushDare(current_wheel + test_dare);
            drawPie(dataDaresPie);
            
        }
        

        //log it to dares history
        dares_history.push(test_dare.replaceAll(",", ";"));
        let dareHistoryHTML = "<li>" + dares_history.toString().replaceAll("," , "</li><li>") + "</li>";
        dareHistoryHTML = dareHistoryHTML.replaceAll("ENVIRONMENT :", '<span class="summer">ENVIRONMENT :</span>');
        dareHistoryHTML = dareHistoryHTML.replaceAll("WHEEL CHANGE :", '<span class="winter">WHEEL CHANGE :</span>');
        document.getElementById("dareHistoryList").innerHTML = dareHistoryHTML;

        spinBtn.disabled = false;
        myPopup.classList.add("show");

        if(test_dare.toLowerCase().includes(". round of shots")){
            if(previous_environment.includes("Round of Shots multiplies")){
                inputField.value = "Round of shots";
                addDareAll.click();
                shotsMultiplied += 1;
                text2.innerHTML = `Round of shots (${shotsMultiplied} extra)`
            }
            document.getElementById("myPopupContent").style.backgroundImage = "url('./Images/backgrounds/dare_shot.png')";
            text2.style.color = "black";
            document.getElementById("popupbackground").style.display = "block";

            
            if(BoomSetting == true){
                vineBoom();
            }
            else if(SlotsSetting == true){
                document.querySelector(".slots").style.display="flex"
                rollAll();
            }
    
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
        if(test_dare.toLowerCase().includes("confession wheel")){
            confessionRoll();
            
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
            else if(wheelChangeString.includes("default")){
                defaultButton.click();
            }

            myPopup.classList.remove("show");
            document.getElementById("popupbackground").style.display = "none";
            spinBtn.click();
        }

        //count adder starts here
        ChangeDareCount(test_dare, 0); //used to referesh doesnt cahnge anything
        document.getElementById("currentDareCountMinus").onclick = function() {ChangeDareCount(test_dare, -1)}
        document.getElementById("currentDareCountPlus").onclick = function() {ChangeDareCount(test_dare, 1)}
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

const plusText1 = document.getElementById("plusText");
const plusText2 = document.getElementById("plusText2");
const plusText3 = document.getElementById("plusText3");

const editorDefault = document.getElementById("editorDefault");
const editorPain = document.getElementById("editorPain");
const editorSitting = document.getElementById("editorSitting");
const editorEnemies = document.getElementById("editorEnemies");
const editorVergi = document.getElementById("editorVergi");
const editorMemes = document.getElementById("editorMemes");


let textArea1Obj = {
    default: localStorage.defaultJSON ? JSON.parse(localStorage.defaultJSON).dares.join("\n") : json_default.dares.join("\n"),
    pain: localStorage.painJSON ? JSON.parse(localStorage.painJSON).dares.join("\n") : json_pain_free.dares.join("\n"),
    enemies: localStorage.enemiesJSON ? JSON.parse(localStorage.enemiesJSON).dares.join("\n") : json_no_enemies.dares.join("\n"),
    vergi: localStorage.vergiJSON ? JSON.parse(localStorage.vergiJSON).dares.join("\n") : json_vergi_psycho.dares.join("\n"),
    memes: localStorage.memesJSON ? JSON.parse(localStorage.memesJSON).dares.join("\n") : json_memes.dares.join("\n"),
    sitting: localStorage.sittingJSON ? JSON.parse(localStorage.sittingJSON).dares.join("\n") : json_no_sitting.dares.join("\n"),
} 

let textArea2Obj = {
    default: localStorage.defaultJSON ? JSON.parse(localStorage.defaultJSON).environments.join("\n").replaceAll("ENVIRONMENT : ", "") : json_default.environments.join("\n").replaceAll("ENVIRONMENT : ", ""),
    pain: localStorage.painJSON ? JSON.parse(localStorage.painJSON).environments.join("\n").replaceAll("ENVIRONMENT : ", "") : json_pain_free.environments.join("\n").replaceAll("ENVIRONMENT : ", ""),
    enemies: localStorage.enemiesJSON ? JSON.parse(localStorage.enemiesJSON).environments.join("\n").replaceAll("ENVIRONMENT : ", "") : json_no_enemies.environments.join("\n").replaceAll("ENVIRONMENT : ", ""),
    vergi: localStorage.vergiJSON ? JSON.parse(localStorage.vergiJSON).environments.join("\n").replaceAll("ENVIRONMENT : ", "") : json_vergi_psycho.environments.join("\n").replaceAll("ENVIRONMENT : ", ""),
    memes: localStorage.memesJSON ? JSON.parse(localStorage.memesJSON).environments.join("\n").replaceAll("ENVIRONMENT : ", "") : json_memes.environments.join("\n").replaceAll("ENVIRONMENT : ", ""),
    sitting: localStorage.sittingJSON ? JSON.parse(localStorage.sittingJSON).environments.join("\n").replaceAll("ENVIRONMENT : ", "") : json_no_sitting.environments.join("\n").replaceAll("ENVIRONMENT : ", ""),
} 

let textArea3Obj = {
    default: localStorage.defaultJSON ? JSON.parse(localStorage.defaultJSON).wheel_changes.join("\n").replaceAll("WHEEL CHANGE : ", "") : json_default.wheel_changes.join("\n").replaceAll("WHEEL CHANGE : ", ""),
    pain: localStorage.painJSON ? JSON.parse(localStorage.painJSON).wheel_changes.join("\n").replaceAll("WHEEL CHANGE : ", "") : json_pain_free.wheel_changes.join("\n").replaceAll("WHEEL CHANGE : ", ""),
    enemies: localStorage.enemiesJSON ? JSON.parse(localStorage.enemiesJSON).wheel_changes.join("\n").replaceAll("WHEEL CHANGE : ", "") : json_no_enemies.wheel_changes.join("\n").replaceAll("WHEEL CHANGE : ", ""),
    vergi: localStorage.vergiJSON ? JSON.parse(localStorage.vergiJSON).wheel_changes.join("\n").replaceAll("WHEEL CHANGE : ", "") : json_vergi_psycho.wheel_changes.join("\n").replaceAll("WHEEL CHANGE : ", ""),
    memes: localStorage.memesJSON ? JSON.parse(localStorage.memesJSON).wheel_changes.join("\n").replaceAll("WHEEL CHANGE : ", "") : json_memes.wheel_changes.join("\n").replaceAll("WHEEL CHANGE : ", ""),
    sitting: localStorage.sittingJSON ? JSON.parse(localStorage.sittingJSON).wheel_changes.join("\n").replaceAll("WHEEL CHANGE : ", "") : json_no_sitting.wheel_changes.join("\n").replaceAll("WHEEL CHANGE : ", ""),
} 

let plusText1Obj = {
    default:   localStorage.plusdefaultDare ? localStorage.plusdefaultDare : "1\n".repeat(((textArea1Obj.default).split("\n")).length),
    pain:  localStorage.pluspainDare ? localStorage.pluspainDare : "1\n".repeat(((textArea1Obj.pain).split("\n")).length),
    memes:  localStorage.plusmemesDare ? localStorage.plusmemesDare : "1\n".repeat(((textArea1Obj.memes).split("\n")).length),
    enemies:  localStorage.plusenemiesDare ? localStorage.plusenemiesDare : "1\n".repeat(((textArea1Obj.enemies).split("\n")).length),
    sitting: localStorage.plussittingDare ? localStorage.plussittingDare : "1\n".repeat(((textArea1Obj.sitting).split("\n")).length),
    vergi:  localStorage.plusvergiDare ? localStorage.plusvergiDare : "1\n".repeat(((textArea1Obj.vergi).split("\n")).length)
}

let plusText2Obj = {
    default:   localStorage.plusdefaultEnvironment ? localStorage.plusdefaultEnvironment : "1\n".repeat(((textArea2Obj.default).split("\n")).length),
    pain:  localStorage.pluspainEnvironment ? localStorage.pluspainEnvironment : "1\n".repeat(((textArea2Obj.pain).split("\n")).length),
    memes:  localStorage.plusmemesEnvironment ? localStorage.plusmemesEnvironment : "1\n".repeat(((textArea2Obj.memes).split("\n")).length),
    enemies:  localStorage.plusenemiesEnvironment ? localStorage.plusenemiesEnvironment : "1\n".repeat(((textArea2Obj.enemies).split("\n")).length),
    sitting: localStorage.plussittingEnvironment ? localStorage.plussittingEnvironment : "1\n".repeat(((textArea2Obj.sitting).split("\n")).length),
    vergi:  localStorage.plusvergiEnvironment ? localStorage.plusvergiEnvironment : "1\n".repeat(((textArea2Obj.vergi).split("\n")).length)
}

let plusText3Obj = {
    default:   localStorage.plusdefaultWheel ? localStorage.plusdefaultWheel :"1\n".repeat(((textArea3Obj.default).split("\n")).length),
    pain:  localStorage.pluspainWheel ? localStorage.pluspainWheel : "1\n".repeat(((textArea3Obj.pain).split("\n")).length),
    memes:  localStorage.plusmemesWheel ? localStorage.plusmemesWheel : "1\n".repeat(((textArea3Obj.memes).split("\n")).length),
    enemies:  localStorage.plusenemiesWheel ? localStorage.plusenemiesWheel : "1\n".repeat(((textArea3Obj.enemies).split("\n")).length),
    sitting: localStorage.plussittingWheel ? localStorage.plussittingWheel : "1\n".repeat(((textArea3Obj.sitting).split("\n")).length),
    vergi:  localStorage.plusvergiWheel ? localStorage.plusvergiWheel : "1\n".repeat(((textArea3Obj.vergi).split("\n")).length)
}

const editorpopupcontent = document.getElementById("editorpopupcontent");


function f1Load(givenEditor) {

    textArea1.value = textArea1Obj[givenEditor];
    textArea2.value = textArea2Obj[givenEditor];
    textArea3.value = textArea3Obj[givenEditor];

    plusText1.value = plusText1Obj[givenEditor];
    plusText2.value = plusText2Obj[givenEditor];
    plusText3.value = plusText3Obj[givenEditor];
    newButtons(countNewlines(textArea1Obj[givenEditor]) + 1);
    newButtons2(countNewlines(textArea2Obj[givenEditor]) + 1);
    newButtons3(countNewlines(textArea3Obj[givenEditor]) + 1);
    buttonSelected(givenEditor);


    textArea1.style.height = "";
    textArea1.style.height = textArea1.scrollHeight -8 + "px";
    textArea2.style.height = "";
    textArea2.style.height = textArea2.scrollHeight -8 + "px";
    textArea3.style.height = "";
    textArea3.style.height = textArea3.scrollHeight -8 + "px";
    plusText3.style.height = textArea3.scrollHeight -8 + "px";
    
};

function fLoadDefault() {
    if(currentEditor == ""){
        
    }
    else{
        textArea1Obj[currentEditor] = textArea1.value;
        textArea2Obj[currentEditor] = textArea2.value;
        textArea3Obj[currentEditor] = textArea3.value;

        plusText1Obj[currentEditor] = plusText1.value;
        plusText2Obj[currentEditor] = plusText2.value;
        plusText3Obj[currentEditor] = plusText3.value;
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

        plusText1Obj[currentEditor] = plusText1.value;
        plusText2Obj[currentEditor] = plusText2.value;
        plusText3Obj[currentEditor] = plusText3.value;
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

        plusText1Obj[currentEditor] = plusText1.value;
        plusText2Obj[currentEditor] = plusText2.value;
        plusText3Obj[currentEditor] = plusText3.value;
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

        plusText1Obj[currentEditor] = plusText1.value;
        plusText2Obj[currentEditor] = plusText2.value;
        plusText3Obj[currentEditor] = plusText3.value;
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

        plusText1Obj[currentEditor] = plusText1.value;
        plusText2Obj[currentEditor] = plusText2.value;
        plusText3Obj[currentEditor] = plusText3.value;
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

        plusText1Obj[currentEditor] = plusText1.value;
        plusText2Obj[currentEditor] = plusText2.value;
        plusText3Obj[currentEditor] = plusText3.value;
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
    textArea1.style.height = textArea1.scrollHeight -8+ "px";
    editorpopupcontent.scrollTop = scrollHeightVar;

    
    lineData = countNewlineDifference(textArea1Obj[currentEditor], textArea1.value);
    if(lineData[1] > 0){
        const plusArr = ((plusText1.value).split('\n')).filter(item => item !== '');
        if(lineData[2]==0){
            plusArr.push("1\n".repeat(lineData[1]));
            
            plusText1.value = plusArr.join('\n')
        }
        else{
            plusArr.splice(lineData[0], 0, ...Array(lineData[1]).fill("1"));
            plusText1.value = plusArr.join('\n')
        }
        
        

        newButtons(countNewlines(textArea1.value) + 1);
    }
    else if(lineData[1] < 0){
        const plusArr = ((plusText1.value).split('\n')).filter(item => item !== '');
        if(lineData[2]==0){
            plusArr.pop();
        }
        else{
            plusArr.splice(lineData[0], Math.abs(lineData[1]));
        }
        

        plusText1.value = plusArr.join('\n')
        

        newButtons(countNewlines(textArea1.value) + 1);
    }
    textArea1Obj[currentEditor] = textArea1.value;
    
});


textArea2.addEventListener("input", function() {
    let scrollHeightVar = editorpopupcontent.scrollTop;
    textArea2.style.height = "";
    textArea2.style.height = textArea2.scrollHeight -8+ "px";
    editorpopupcontent.scrollTop = scrollHeightVar;

    
    lineData = countNewlineDifference(textArea2Obj[currentEditor], textArea2.value);
    if(lineData[1] > 0){
        const plusArr = ((plusText2.value).split('\n')).filter(item => item !== '');
        if(lineData[2]==0){
            plusArr.push("1\n".repeat(lineData[1]));
            
            plusText2.value = plusArr.join('\n')
        }
        else{
            plusArr.splice(lineData[0], 0, ...Array(lineData[1]).fill("1"));
            plusText2.value = plusArr.join('\n')
        }
        
        

        newButtons2(countNewlines(textArea2.value) + 1);
    }
    else if(lineData[1] < 0){
        const plusArr = ((plusText2.value).split('\n')).filter(item => item !== '');
        if(lineData[2]==0){
            plusArr.pop();
        }
        else{
            plusArr.splice(lineData[0], Math.abs(lineData[1]));
        }
        

        plusText2.value = plusArr.join('\n')
        

        newButtons2(countNewlines(textArea2.value) + 1);
    }
    textArea2Obj[currentEditor] = textArea2.value;
});


textArea3.addEventListener("input", function() {
    let scrollHeightVar = editorpopupcontent.scrollTop;
    textArea3.style.height = "";
    textArea3.style.height = textArea3.scrollHeight -8+ "px";
    plusText3.style.height = textArea3.scrollHeight -8 + "px";
    editorpopupcontent.scrollTop = scrollHeightVar;

    
    lineData = countNewlineDifference(textArea3Obj[currentEditor], textArea3.value);
    if(lineData[1] > 0){
        const plusArr = ((plusText3.value).split('\n')).filter(item => item !== '');
        if(lineData[2]==0){
            plusArr.push("1\n".repeat(lineData[1]));
            
            plusText3.value = plusArr.join('\n')
        }
        else{
            plusArr.splice(lineData[0], 0, ...Array(lineData[1]).fill("1"));
            plusText3.value = plusArr.join('\n')
        }
        
        

        newButtons3(countNewlines(textArea3.value) + 1);
    }
    else if(lineData[1] < 0){
        const plusArr = ((plusText3.value).split('\n')).filter(item => item !== '');
        if(lineData[2]==0){
            plusArr.pop();
        }
        else{
            plusArr.splice(lineData[0], Math.abs(lineData[1]));
        }
        

        plusText3.value = plusArr.join('\n')
        

        newButtons3(countNewlines(textArea3.value) + 1);
    }
    textArea3Obj[currentEditor] = textArea3.value;
});

function fCommit(){
    //finish saving current editor 
    if(currentEditor == ""){
        
    }
    else{
        textArea1Obj[currentEditor] = textArea1.value;
        textArea2Obj[currentEditor] = textArea2.value;
        textArea3Obj[currentEditor] = textArea3.value;

        plusText1Obj[currentEditor] = plusText1.value;
        plusText2Obj[currentEditor] = plusText2.value;
        plusText3Obj[currentEditor] = plusText3.value;
    }
    //now save all 6 dare sets.
    ["default", "pain", "enemies", "vergi", "sitting", "memes"].forEach(function(item){
        textArea1.value = textArea1Obj[item];
        textArea2.value = textArea2Obj[item];
        textArea3.value = textArea3Obj[item];

        plusText1.value = plusText1Obj[item]; 
        plusText2.value = plusText2Obj[item]; 
        plusText3.value = plusText3Obj[item];

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
    localStorage.setItem("plus" + key +"Dare", plusText1.value);
    localStorage.setItem("plus" + key +"Environment", plusText2.value);
    localStorage.setItem("plus" + key +"Wheel", plusText3.value);
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
    plusText1Obj = {
        default:   "1\n".repeat((json_default.dares).length),
        pain:  "1\n".repeat((json_pain_free.dares).length),
        memes:  "1\n".repeat((json_memes.dares).length),
        enemies:  "1\n".repeat((json_no_enemies.dares).length),
        sitting: "1\n".repeat(( json_no_sitting.dares).length),
        vergi:  "1\n".repeat((json_vergi_psycho.dares).length)
    }
    
    plusText2Obj = {
        default: "1\n".repeat((json_default.environments).length),
        pain: "1\n".repeat((json_pain_free.environments).length),
        enemies: "1\n".repeat((json_no_enemies.environments).length),
        vergi: "1\n".repeat((json_vergi_psycho.environments).length),
        memes: "1\n".repeat((json_memes.environments).length),
        sitting: "1\n".repeat((json_no_sitting.environments).length),
    }
    
    plusText3Obj = {
        default: "1\n".repeat((json_default.wheel_changes).length),
        pain: "1\n".repeat((json_pain_free.wheel_changes).length),
        enemies: "1\n".repeat((json_no_enemies.wheel_changes).length),
        vergi: "1\n".repeat((json_vergi_psycho.wheel_changes).length),
        memes: "1\n".repeat((json_memes.wheel_changes).length),
        sitting: "1\n".repeat((json_no_sitting.wheel_changes).length),
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

function getRandomShotImg() {
    const imagesKeys = Object.keys(images);
    var rItem = imagesKeys[Math.floor(Math.random()*imagesKeys.length)];
    if(document.getElementById("mySelect").value == images[rItem]){
        getRandomShotImg();
        return;
    }
    
    for(let i = 0;i < dropdownItems.length; i++){
        let dataValue = dropdownItems[i].getAttribute('data-value');
        if(dataValue == rItem){
            dropdownItems[i].click();
            break;
        }
    }

}
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
    "Rum bottle":  "./Images/icons/rum_bottle_icon.png",
    "Holy wine": "./Images/icons/holy_wine_icon.png",
    "Altar wine":   "./Images/icons/altar_wine_icon.png",
    "Bloody mary": "./Images/icons/bloody_mary_icon.png",
    "Mohito":    "./Images/icons/mohito_icon.png",
    "Flaming shot":  "./Images/icons/flaming_shot_icon.png",
    "Hand sanitizer": "./Images/icons/hand_sanitizer_icon.png",
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


//preload images for smooth experience
function preloadImages(imageArray, callback) {
    let loadedImagesCount = 0;
    const totalImages = imageArray.length;
    const preloadContainer = document.getElementById('preload-container');

    imageArray.forEach(function(imageUrl) {
        const img = new Image();

        img.onload = function() {
            loadedImagesCount++;
            preloadContainer.appendChild(img); // Add the image to a hidden container

            if (loadedImagesCount === totalImages) {
                callback(); // All images loaded
            }
        };

        img.onerror = function() {
            console.error(`Error loading image: ${imageUrl}`);
        };

        img.src = imageUrl;
    });
}

var backgroundList = ['./Images/backgrounds/cyberpunk_bg.png', './Images/backgrounds/dare_shot.png', './Images/backgrounds/default_bg.png', './Images/backgrounds/environment_border.png', './Images/backgrounds/memes_bg.png', './Images/backgrounds/no_enemies_bg.png', './Images/backgrounds/no_pain_bg.png', './Images/backgrounds/no_sitting_bg.png']
var iconList = ['./Images/icons/absinthe_icon.png', './Images/icons/add_dare_icon.png', './Images/icons/ahma_icon.png', './Images/icons/beer_bottle_icon.png', './Images/icons/beer_icon.png', './Images/icons/beer_mug_icon.png', './Images/icons/blue_anime_icon.png', './Images/icons/cactus_glass_icon.png', './Images/icons/cartoon_coctail_icon.png', './Images/icons/champagne_icon.png', './Images/icons/clock_icon.png', './Images/icons/coctail_glass_2_icon.png', './Images/icons/coctail_glass_icon.png', './Images/icons/coin_heads_icon.png', './Images/icons/coin_tails_icon.png', './Images/icons/copper_mug_icon.png', './Images/icons/current_icon.png', './Images/icons/default_d_icon.png', './Images/icons/default_icon.png', './Images/icons/favicon.png', './Images/icons/gin_bottle_icon.png', './Images/icons/history_icon.png', './Images/icons/jager_icon.png', './Images/icons/koff_beer_icon.png', './Images/icons/koff_lonkero_icon.png', './Images/icons/koskekorva_mansikka_icon.png', './Images/icons/lemon_anime_icon.png', './Images/icons/lonkero_icon.png', './Images/icons/lonkero_red_icon.png', './Images/icons/lonkero_yellow_icon.png', './Images/icons/memes_d_icon.png', './Images/icons/memes_icon.png', './Images/icons/no_enemies_jesus_d_icon.png', './Images/icons/no_enemies_jesus_icon.png', './Images/icons/no_pain_d_icon.png', './Images/icons/no_pain_icon.png', './Images/icons/no_sitting_d_icon.png', './Images/icons/no_sitting_icon.png', './Images/icons/power_icon_0.png', './Images/icons/power_icon_1.png', './Images/icons/power_icon_2.png', './Images/icons/power_icon_3.png', './Images/icons/power_icon_4.png', './Images/icons/power_icon_5.png', './Images/icons/power_icon_6.png', './Images/icons/power_icon_7.png', './Images/icons/red_cup_icon.png', './Images/icons/sake_icon.png', './Images/icons/screw_anime_icon.png', './Images/icons/scroll_icon.png', './Images/icons/settings_icon.png', './Images/icons/shot2_icon.png', './Images/icons/shot_icon.png', './Images/icons/spiritus_anime_icon.png', './Images/icons/vergi_d_icon.png', './Images/icons/vergi_icon.png', './Images/icons/wheel_icon.png', './Images/icons/whiskey_anime_icon.png', './Images/icons/whiskey_bottle_icon.png', './Images/icons/whiskey_rocks_icon.png', './Images/icons/white_wine_icon.png', './Images/icons/wine_bottle_icon.png', './Images/icons/wine_glass_icon.png', './Images/icons/rum_bottle_icon.png', './Images/icons/reel_icon2.png']
var imagesToPreload = backgroundList.concat(iconList)

// Preload all images
preloadImages(imagesToPreload, function() {
    return;
});



//monesko nappi on painettu
function handleButtonClickM(event) {
    // Get the clicked button
    const clickedButton = event.target;

    // Get all buttons in the wrapper
    const buttons = document.querySelectorAll('.wrapperB.minus > button');

    // Find the index of the clicked button
    const index = Array.from(buttons).indexOf(clickedButton);

    // Display the result
    const textBut = document.getElementById("plusText").value;
    const lines = textBut.split('\n');
    const newVal = Math.max(parseInt(lines[index]) - 1, 0);
    lines[index] = newVal;
    if(newVal == 0){
        clickedButton.classList.add("zero");
    }
    document.getElementById("plusText").value = lines.join('\n') + '\n'

}
//monesko nappi on painettu
function handleButtonClickP(event) {
    // Get the clicked button
    const clickedButton = event.target;

    // Get all buttons in the wrapper
    const buttons = document.querySelectorAll('.wrapperB.plus > button');

    // Find the index of the clicked button
    const index = Array.from(buttons).indexOf(clickedButton);
    Mbut = Array.from(document.querySelectorAll('.wrapperB.minus > button'))[index]
    Mbut.classList.remove("zero");

    // Display the result
    const textBut = document.getElementById("plusText").value;
    const lines = textBut.split('\n');
    lines[index] = parseInt(lines[index]) + 1
    document.getElementById("plusText").value = lines.join('\n') + '\n'
}
//monesko nappi on painettu
function handleButtonClickM2(event) {
    // Get the clicked button
    const clickedButton = event.target;

    // Get all buttons in the wrapper
    const buttons = document.querySelectorAll('.wrapperB.minus.env > button');

    // Find the index of the clicked button
    const index = Array.from(buttons).indexOf(clickedButton);

    // Display the result
    const textBut = document.getElementById("plusText2").value;
    const lines = textBut.split('\n');
    const newVal = Math.max(parseInt(lines[index]) - 1, 0);
    lines[index] = newVal;
    if(newVal == 0){
        clickedButton.classList.add("zero");
    }
    document.getElementById("plusText2").value = lines.join('\n') + '\n'

}
//monesko nappi on painettu
function handleButtonClickP2(event) {
    // Get the clicked button
    const clickedButton = event.target;

    // Get all buttons in the wrapper
    const buttons = document.querySelectorAll('.wrapperB.plus.env > button');

    // Find the index of the clicked button
    const index = Array.from(buttons).indexOf(clickedButton);
    Mbut = Array.from(document.querySelectorAll('.wrapperB.minus.env > button'))[index]
    Mbut.classList.remove("zero");

    // Display the result
    const textBut = document.getElementById("plusText2").value;
    const lines = textBut.split('\n');
    lines[index] = parseInt(lines[index]) + 1
    document.getElementById("plusText2").value = lines.join('\n') + '\n'
}
//monesko nappi on painettu
function handleButtonClickM3(event) {
    // Get the clicked button
    const clickedButton = event.target;

    // Get all buttons in the wrapper
    const buttons = document.querySelectorAll('.wrapperB.minus.whl > button');

    // Find the index of the clicked button
    const index = Array.from(buttons).indexOf(clickedButton);

    // Display the result
    const textBut = document.getElementById("plusText3").value;
    const lines = textBut.split('\n');
    const newVal = Math.max(parseInt(lines[index]) - 1, 0);
    lines[index] = newVal;
    if(newVal == 0){
        clickedButton.classList.add("zero");
    }
    document.getElementById("plusText3").value = lines.join('\n') + '\n'

}
//monesko nappi on painettu
function handleButtonClickP3(event) {
    // Get the clicked button
    const clickedButton = event.target;

    // Get all buttons in the wrapper
    const buttons = document.querySelectorAll('.wrapperB.plus.whl > button');

    // Find the index of the clicked button
    const index = Array.from(buttons).indexOf(clickedButton);
    Mbut = Array.from(document.querySelectorAll('.wrapperB.minus.whl > button'))[index]
    Mbut.classList.remove("zero");

    // Display the result
    const textBut = document.getElementById("plusText3").value;
    const lines = textBut.split('\n');
    lines[index] = parseInt(lines[index]) + 1
    document.getElementById("plusText3").value = lines.join('\n') + '\n'
}
//nrebuttons for envoronments
function newButtons2(n){
    const buttonsDivM2 = document.getElementById('buttonsMinus2'); // Get the div
    const buttonsDivP2 = document.getElementById('buttonsPlus2');

    butText = '<button>-</button>'.repeat(n);
    buttonsDivM2.innerHTML=butText;
    butText = "<button>+</button>".repeat(n);
    buttonsDivP2.innerHTML=butText;

    const textBut2 = document.getElementById("plusText2").value;
    const lines2 = textBut2.split('\n');

        // Add click event listeners to all buttons
    const buttonsqm2 = document.querySelectorAll('.wrapperB.minus.env > button');
    const butArray2 = Array.from(buttonsqm2);
    buttonsqm2.forEach(button => {
        button.addEventListener('click', handleButtonClickM2);
        index = butArray2.indexOf(button);
        if(parseInt(lines2[index]) == 0){
            button.classList.add("zero");
        }
    });
    const buttonsqp2 = document.querySelectorAll('.wrapperB.plus.env > button');
    buttonsqp2.forEach(button => {
        button.addEventListener('click', handleButtonClickP2);
        button.classList.add("highlight")
});
}

function newButtons(n){
    const buttonsDivM = document.getElementById('buttonsMinus'); // Get the div
    const buttonsDivP = document.getElementById('buttonsPlus');

    butText = '<button>-</button>'.repeat(n);
    buttonsDivM.innerHTML=butText;
    butText = "<button>+</button>".repeat(n);
    buttonsDivP.innerHTML=butText;

    const textBut = document.getElementById("plusText").value;
    const lines = textBut.split('\n');

        // Add click event listeners to all buttons
    const buttonsqm = document.querySelectorAll('.wrapperB.minus > button');
    const butArray = Array.from(buttonsqm);
    buttonsqm.forEach(button => {
        button.addEventListener('click', handleButtonClickM);
        index = butArray.indexOf(button);
        if(parseInt(lines[index]) == 0){
            button.classList.add("zero");
        }
    });
    const buttonsqp = document.querySelectorAll('.wrapperB.plus > button');
    buttonsqp.forEach(button => {
        button.addEventListener('click', handleButtonClickP);
        button.classList.add("highlight")
});
}

//buttons for weheel change editor
function newButtons3(n){
    const buttonsDivM3 = document.getElementById('buttonsMinus3'); // Get the div
    const buttonsDivP3 = document.getElementById('buttonsPlus3');

    butText = '<button>-</button>'.repeat(n);
    buttonsDivM3.innerHTML=butText;
    butText = "<button>+</button>".repeat(n);
    buttonsDivP3.innerHTML=butText;

    const textBut3 = document.getElementById("plusText3").value;
    const lines3 = textBut3.split('\n');

        // Add click event listeners to all buttons
    const buttonsqm3 = document.querySelectorAll('.wrapperB.minus.whl > button');
    const butArray3 = Array.from(buttonsqm3);
    buttonsqm3.forEach(button => {
        button.addEventListener('click', handleButtonClickM3);
        index = butArray3.indexOf(button);
        if(parseInt(lines3[index]) == 0){
            button.classList.add("zero");
        }
    });
    const buttonsqp3 = document.querySelectorAll('.wrapperB.plus.whl > button');
    buttonsqp3.forEach(button => {
        button.addEventListener('click', handleButtonClickP3);
        button.classList.add("highlight")
});
}

function countNewlines (input) {
   // Use the regex \n to find all newline characters
   const newlines = input.match(/\n/g);
    
   // If newlines are found, return the length of the array, otherwise return 0
   return newlines ? newlines.length : 0;
};






//counting newlines until texts differ used to balance dare counts to make it match.
function countNewlineDifference(text1, text2) {
    // Function to count consecutive newlines from the start
    function countFromStart(t1, t2) {
        let count = 0;
        let numNL = 0;
        while (count < (t1.length) && count < (t2.length) && t1[count] === t2[count]) {
            if(t1[count] === '\n'){
                numNL++;
            }
            count++;
        }
        
        return numNL;
    }
    
    function countFromEnd(t1, t2) {
        let count = 0;
        let i1 = t1.length -1;
        let i2 = t2.length -1;
        
        
        while (i1 >= 0 && i2 >= 0 && t1[i1] === t2[i2]) {
            if(t1[i1]==="\n"){
                count++;
            }
                
            
            i1--;
            i2--;
        }
        return count;
        }

    

    const startCount = countFromStart(text1, text2);
    const endCount = countFromEnd(text1, text2);
    
    return [
        startCount,
        countNewlines(text2) - countNewlines(text1),
        endCount
    ]
}


function vineBoom() {
    // Remove flash-screen after 1 second
    setTimeout(function() {
        document.querySelector('.flash-screen').style.display = 'block';
        // Fade in the image
        document.querySelector('.fade-image').style.display = 'block';
        var mySound = new alarmSound("vine", alertVolume);
            
            mySound.play();
        
        // Remove the image after the fade-in is complete (2 seconds)
        setTimeout(function() {
            document.querySelector('.fade-image').style.display = 'none';
            document.querySelector('.flash-screen').style.display = 'none';
        }, 3000); // fade out after 1 second
    }, 500); // flash lasts 1 second
}



/**
 * Setup
 */

// Mapping of indexes to icons: start from banana in middle of initial position and then upwards
// Width of the icons
icon_height = 158,	
// Number of icons in the strip
num_icons = 10,	
// Max-speed in ms for animating one icon down
time_per_icon = 100,
// Holds icon indexes
indexes = [0, 0, 0];


/** 
 * Roll one reel
 */
const roll = (reel, offset = 0, target = null) => {	
	// Minimum of 2 + the reel offset rounds
	let delta = (offset + 2) * num_icons + Math.round(Math.random() * num_icons); 
	
	const style = getComputedStyle(reel),
					// Current background position
					backgroundPositionY = parseFloat(style["background-position-y"]);
	
	// Rigged?
	if (target) {
		// calculate delta to target
		const currentIndex = backgroundPositionY / icon_height;
		delta = target - currentIndex + (offset + 2) * num_icons;
	}
	
	// Return promise so we can wait for all reels to finish
	return new Promise((resolve, reject) => {
		
		
		const
					// Target background position
					targetBackgroundPositionY = backgroundPositionY + delta * icon_height,
					// Normalized background position, for reset
					normTargetBackgroundPositionY = targetBackgroundPositionY%(num_icons * icon_height);
		
		// Delay animation with timeout, for some reason a delay in the animation property causes stutter
		setTimeout(() => { 
			// Set transition properties ==> https://cubic-bezier.com/#.41,-0.01,.63,1.09
			reel.style.transition = `background-position-y ${(8 + 1 * delta) * time_per_icon}ms cubic-bezier(.41,-0.01,.63,1.09)`;
			// Set background position
			reel.style.backgroundPositionY = `${backgroundPositionY + delta * icon_height}px`;
		}, offset * 150);
			
		// After animation
		setTimeout(() => {
			// Reset position, so that it doesn't get higher without limit
			reel.style.transition = `none`;
			reel.style.backgroundPositionY = `${normTargetBackgroundPositionY}px`;
			// Resolve this promise
			resolve(delta%num_icons);
		}, (8 + 1 * delta) * time_per_icon + offset * 150);
		
	});
};


/**
 * Roll all reels, when promise resolves roll again
 */
function rollAll() {
	
	const reelsList = document.querySelectorAll('.slots > .reel');
    var mySoundSpin = new alarmSound("spin", 1);
    mySoundSpin.sound.addEventListener('timeupdate', function(){
        var buffer = .44
        if(this.currentTime > this.duration - buffer){
            this.currentTime = 0
            this.play()
        }
    });
    mySoundSpin.play();
	
	// rig the outcome for every 3rd roll, if targets is set to null, the outcome will not get rigged by the roll function
    const win1p = Math.random() > 0.5 ;
    const win2p = Math.random() > 0.5;
    var targets = [0,0,0]
    if(win1p){
        if(win2p){
            const winner2p = Math.floor(Math.random() * num_icons);
            targets =  [winner2p, winner2p, winner2p];
        }
        else{
            const winner1p = Math.floor(Math.random() * num_icons);
            targets =  [winner1p, winner1p, Math.floor(Math.random() * num_icons)];
        }
    }
    else{
        targets =  [Math.floor(Math.random() * num_icons), Math.floor(Math.random() * num_icons), Math.floor(Math.random() * num_icons)];
    }
	
	
	
	Promise
		
		// Activate each reel, must convert NodeList to Array for this with spread operator
		.all( [...reelsList].map((reel, i) => roll(reel, i, targets ? targets[i] : null)) )	
		
		// When all reels done animating (all promises solve)
		.then((deltas) => {
            mySoundSpin.stop();
            mySoundSpin.stop();
            topLever.classList.remove("pull");
			// add up indexes
			deltas.forEach((delta, i) => indexes[i] = (indexes[i] + delta)%num_icons);
			
		
			// Win conditions
			if (indexes[0] == indexes[1] && indexes[1] == indexes[2]) {
                var mySound = new alarmSound("win", 1);
                mySound.play();
				const winCls = indexes[0] == indexes[2] ? "win2" : "win1";
				document.querySelector(".slots").classList.add(winCls);
				setTimeout(function() { 
                    document.querySelector(".slots").classList.remove(winCls);
                }
                , 2000)
			}
            
		});
};
document.querySelector(".slots").addEventListener('click', (e) => {
    
    if(e.target.matches("div.slots") || e.target.matches("div.reel")){
        document.querySelector(".slots").style.display = "none";
    }
})
let lever = document.querySelector("#lever");
let topLever = document.querySelector(".top");
function pull(e) {
    if(!topLever.classList.contains("pull")){
        rollAll();
    }
    topLever.classList.add("pull");
}

lever.addEventListener("click", pull);

function countNewlinesBeforeSubstring(inputString, searchString) {
    // Find the index of the first occurrence of the search string
    const index = inputString.indexOf(searchString);

    // If the substring doesn't appear, return null
    if (index === -1) return null;
    
    if (index == 0) return 0;

    // Extract the part of the string before the found substring
    const partBeforeSubstring = inputString.slice(0, index);

    // Count the number of newline characters in the extracted part
    const newlineCount = (partBeforeSubstring.match(/\n/g) || []).length;

    // Return the count of newlines
    return newlineCount;
}
function addNAfterKNewlines(text, k, N) {
    // Split the text into lines
    const lines = text.split('\n');

    // If k is out of bounds, return the original text
    if (k < 0 || k >= lines.length) {
        console.error("Invalid value of k: out of bounds.", lines);
        return text;
    }

    // Parse the number at the kth line and add 1
    const num = parseInt(lines[k], 10);

    // Check if the line contains a valid number
    if (isNaN(num)) {
        console.error(`The line at position ${k} is not a valid number.`);
        return text;
    }

    // Update the number in the kth line
    lines[k] = (Math.max(0, num + N)).toString();
    

    // Join the lines back into a single string
    return lines.join('\n');
}   
function getDareMult(text, k) {
    // Split the text into lines
    
    const lines = text.split('\n');

    // If k is out of bounds, return the original text
    if (k < 0 || k >= lines.length) {
        console.error("Invalid value of k: out of bounds.", lines);
        return null;
    }

    // Parse the number at the kth line and add 1
    const num = parseInt(lines[k], 10);

    // Check if the line contains a valid number
    if (isNaN(num)) {
        console.error(`The line at position ${k} is not a valid number.`);
        return null;
    }

    return num;
}   
function ChangeDareCount(CurrentDare, N) {
    
        switch(current_wheel) {
            case "no pain":
                fLoadPain();
                
                if(CurrentDare.includes("ENVIRONMENT :")){
                    index = countNewlinesBeforeSubstring(textArea2Obj["pain"], CurrentDare.replaceAll("ENVIRONMENT : ", ""));
                        if(index != null){
                            plusText2.value = addNAfterKNewlines(plusText2.value, index, N);
                            document.getElementById("currentDareCount").innerText = `CURRENT COUNT ${getDareMult(plusText2.value, index)}`;
                            fSoftCommit("pain");
                            if(N == 1){
                                addTempEnv(CurrentDare)
                            }
                            if(N == -1){
                                removeTempEnv(CurrentDare)
                            }
                        }
                }
                else if(CurrentDare.includes("WHEEL CHANGE :")){
                    index = countNewlinesBeforeSubstring(textArea3Obj["pain"], CurrentDare.replaceAll("WHEEL CHANGE : ", ""));
                        if(index != null){
                            plusText3.value = addNAfterKNewlines(plusText3.value, index, N);
                            document.getElementById("currentDareCount").innerText = `CURRENT COUNT ${getDareMult(plusText3.value, index)}`;
                            fSoftCommit("pain");
                            if(N == 1){
                                addTempWheelch(CurrentDare)
                            }
                            if(N == -1){
                                removeTempWheelch(CurrentDare)
                            }
                        }
                }
                else{
                    index = countNewlinesBeforeSubstring(textArea1Obj["pain"], CurrentDare);
                        if(index != null){
                            plusText1.value = addNAfterKNewlines(plusText1.value, index, N);
                            document.getElementById("currentDareCount").innerText = `CURRENT COUNT ${getDareMult(plusText1.value, index)}`;
                            fSoftCommit("pain");
                            if(N == 1){
                                addTempDare(CurrentDare)
                            }
                            if(N == -1){
                                removeTempDare(CurrentDare)
                            }
                            
                        }
                }
                break;
            case "no enemies":
                fLoadEnemies();
                
                if(CurrentDare.includes("ENVIRONMENT :")){
                    index = countNewlinesBeforeSubstring(textArea2Obj["enemies"], CurrentDare.replaceAll("ENVIRONMENT : ", ""));
                        if(index != null){
                            plusText2.value = addNAfterKNewlines(plusText2.value, index, N);
                            document.getElementById("currentDareCount").innerText = `CURRENT COUNT ${getDareMult(plusText2.value, index)}`;
                            fSoftCommit("enemies");
                            if(N == 1){
                                addTempEnv(CurrentDare)
                            }
                            if(N == -1){
                                removeTempEnv(CurrentDare)
                            }
                        }
                }
                else if(CurrentDare.includes("WHEEL CHANGE :")){
                    index = countNewlinesBeforeSubstring(textArea3Obj["enemies"], CurrentDare.replaceAll("WHEEL CHANGE : ", ""));
                        if(index != null){
                            plusText3.value = addNAfterKNewlines(plusText3.value, index, N);
                            document.getElementById("currentDareCount").innerText = `CURRENT COUNT ${getDareMult(plusText3.value, index)}`;
                            fSoftCommit("enemies");
                            if(N == 1){
                                addTempWheelch(CurrentDare)
                            }
                            if(N == -1){
                                removeTempWheelch(CurrentDare)
                            }
                        }
                }
                else{
                    index = countNewlinesBeforeSubstring(textArea1Obj["enemies"], CurrentDare);
                        if(index != null){
                            plusText1.value = addNAfterKNewlines(plusText1.value, index, N);
                            document.getElementById("currentDareCount").innerText = `CURRENT COUNT ${getDareMult(plusText1.value, index)}`;
                            fSoftCommit("enemies");
                            if(N == 1){
                                addTempDare(CurrentDare)
                            }
                            if(N == -1){
                                removeTempDare(CurrentDare)
                            }
                            
                        }
                }
                break;
            case "memes":
                fLoadMemes();
                
                if(CurrentDare.includes("ENVIRONMENT :")){
                    index = countNewlinesBeforeSubstring(textArea2Obj["memes"], CurrentDare.replaceAll("ENVIRONMENT : ", ""));
                        if(index != null){
                            plusText2.value = addNAfterKNewlines(plusText2.value, index, N);
                            document.getElementById("currentDareCount").innerText = `CURRENT COUNT ${getDareMult(plusText2.value, index)}`;
                            fSoftCommit("memes");
                            if(N == 1){
                                addTempEnv(CurrentDare)
                            }
                            if(N == -1){
                                removeTempEnv(CurrentDare)
                            }
                        }
                }
                else if(CurrentDare.includes("WHEEL CHANGE :")){
                    index = countNewlinesBeforeSubstring(textArea3Obj["memes"], CurrentDare.replaceAll("WHEEL CHANGE : ", ""));
                        if(index != null){
                            plusText3.value = addNAfterKNewlines(plusText3.value, index, N);
                            document.getElementById("currentDareCount").innerText = `CURRENT COUNT ${getDareMult(plusText3.value, index)}`;
                            fSoftCommit("memes");
                            if(N == 1){
                                addTempWheelch(CurrentDare)
                            }
                            if(N == -1){
                                removeTempWheelch(CurrentDare)
                            }
                        }
                }
                else{
                    index = countNewlinesBeforeSubstring(textArea1Obj["memes"], CurrentDare);
                        if(index != null){
                            plusText1.value = addNAfterKNewlines(plusText1.value, index, N);
                            document.getElementById("currentDareCount").innerText = `CURRENT COUNT ${getDareMult(plusText1.value, index)}`;
                            fSoftCommit("memes");
                            if(N == 1){
                                addTempDare(CurrentDare)
                            }
                            if(N == -1){
                                removeTempDare(CurrentDare)
                            }
                            
                        }
                }
                break;
            case "vergipsycho":
                fLoadVergi();
                
                if(CurrentDare.includes("ENVIRONMENT :")){
                    index = countNewlinesBeforeSubstring(textArea2Obj["vergi"], CurrentDare.replaceAll("ENVIRONMENT : ", ""));
                        if(index != null){
                            plusText2.value = addNAfterKNewlines(plusText2.value, index, N);
                            document.getElementById("currentDareCount").innerText = `CURRENT COUNT ${getDareMult(plusText2.value, index)}`;
                            fSoftCommit("vergi");
                            if(N == 1){
                                addTempEnv(CurrentDare)
                            }
                            if(N == -1){
                                removeTempEnv(CurrentDare)
                            }
                        }
                }
                else if(CurrentDare.includes("WHEEL CHANGE :")){
                    index = countNewlinesBeforeSubstring(textArea3Obj["vergi"], CurrentDare.replaceAll("WHEEL CHANGE : ", ""));
                        if(index != null){
                            plusText3.value = addNAfterKNewlines(plusText3.value, index, N);
                            document.getElementById("currentDareCount").innerText = `CURRENT COUNT ${getDareMult(plusText3.value, index)}`;
                            fSoftCommit("vergi");
                            if(N == 1){
                                addTempWheelch(CurrentDare)
                            }
                            if(N == -1){
                                removeTempWheelch(CurrentDare)
                            }
                        }
                }
                else{
                    index = countNewlinesBeforeSubstring(textArea1Obj["vergi"], CurrentDare);
                        if(index != null){
                            plusText1.value = addNAfterKNewlines(plusText1.value, index, N);
                            document.getElementById("currentDareCount").innerText = `CURRENT COUNT ${getDareMult(plusText1.value, index)}`;
                            fSoftCommit("vergi");
                            if(N == 1){
                                addTempDare(CurrentDare)
                            }
                            if(N == -1){
                                removeTempDare(CurrentDare)
                            }
                            
                        }
                }
                break;
            case "no sitting":
                fLoadSitting();
                
                if(CurrentDare.includes("ENVIRONMENT :")){
                    index = countNewlinesBeforeSubstring(textArea2Obj["sitting"], CurrentDare.replaceAll("ENVIRONMENT : ", ""));
                        if(index != null){
                            plusText2.value = addNAfterKNewlines(plusText2.value, index, N);
                            document.getElementById("currentDareCount").innerText = `CURRENT COUNT ${getDareMult(plusText2.value, index)}`;
                            fSoftCommit("sitting");
                            if(N == 1){
                                addTempEnv(CurrentDare)
                            }
                            if(N == -1){
                                removeTempEnv(CurrentDare)
                            }
                        }
                }
                else if(CurrentDare.includes("WHEEL CHANGE :")){
                    index = countNewlinesBeforeSubstring(textArea3Obj["sitting"], CurrentDare.replaceAll("WHEEL CHANGE : ", ""));
                        if(index != null){
                            plusText3.value = addNAfterKNewlines(plusText3.value, index, N);
                            document.getElementById("currentDareCount").innerText = `CURRENT COUNT ${getDareMult(plusText3.value, index)}`;
                            fSoftCommit("sitting");
                            if(N == 1){
                                addTempWheelch(CurrentDare)
                            }
                            if(N == -1){
                                removeTempWheelch(CurrentDare)
                            }
                        }
                }
                else{
                    index = countNewlinesBeforeSubstring(textArea1Obj["sitting"], CurrentDare);
                        if(index != null){
                            plusText1.value = addNAfterKNewlines(plusText1.value, index, N);
                            document.getElementById("currentDareCount").innerText = `CURRENT COUNT ${getDareMult(plusText1.value, index)}`;
                            fSoftCommit("sitting");
                            if(N == 1){
                                addTempDare(CurrentDare)
                            }
                            if(N == -1){
                                removeTempDare(CurrentDare)
                            }
                            
                        }
                }
                break;
            case "default":
                fLoadDefault();
                
                if(CurrentDare.includes("ENVIRONMENT :")){
                    index = countNewlinesBeforeSubstring(textArea2Obj["default"], CurrentDare.replaceAll("ENVIRONMENT : ", ""));
                        if(index != null){
                            plusText2.value = addNAfterKNewlines(plusText2.value, index, N);
                            document.getElementById("currentDareCount").innerText = `CURRENT COUNT ${getDareMult(plusText2.value, index)}`;
                            fSoftCommit("default");
                            if(N == 1){
                                addTempEnv(CurrentDare)
                            }
                            if(N == -1){
                                removeTempEnv(CurrentDare)
                            }
                        }
                }
                else if(CurrentDare.includes("WHEEL CHANGE :")){
                    index = countNewlinesBeforeSubstring(textArea3Obj["default"], CurrentDare.replaceAll("WHEEL CHANGE : ", ""));
                        if(index != null){
                            plusText3.value = addNAfterKNewlines(plusText3.value, index, N);
                            document.getElementById("currentDareCount").innerText = `CURRENT COUNT ${getDareMult(plusText3.value, index)}`;
                            fSoftCommit("default");
                            if(N == 1){
                                addTempWheelch(CurrentDare)
                            }
                            if(N == -1){
                                removeTempWheelch(CurrentDare)
                            }
                        }
                }
                else{
                    index = countNewlinesBeforeSubstring(textArea1Obj["default"], CurrentDare);
                        if(index != null){
                            plusText1.value = addNAfterKNewlines(plusText1.value, index, N);
                            document.getElementById("currentDareCount").innerText = `CURRENT COUNT ${getDareMult(plusText1.value, index)}`;
                            fSoftCommit("default");
                            if(N == 1){
                                addTempDare(CurrentDare)
                            }
                            if(N == -1){
                                removeTempDare(CurrentDare)
                            }
                            
                        }
                }
                break;
            default:
                
        }
    }

    function getAverageColorFromImageSrc(src, callback) {
        const img = new Image();
        img.crossOrigin = "Anonymous"; // Allow cross-origin images if needed
        img.src = src;
      
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
      
          canvas.width = img.width;
          canvas.height = img.height;
      
          ctx.drawImage(img, 0, 0, img.width, img.height);
          const imageData = ctx.getImageData(0, 0, img.width, img.height).data;
      
          let r = 0, g = 0, b = 0, totalWeight = 0;
      
          // Loop through all pixels
          for (let i = 0; i < imageData.length; i += 4) {
            const pixelR = imageData[i];
            const pixelG = imageData[i + 1];
            const pixelB = imageData[i + 2];
            const pixelA = imageData[i + 3]; // Alpha value (0-255)
      
            if (pixelA === 0) continue; // Skip transparent pixels
      
            // Calculate colorfulness: difference between max and min RGB values
            const colorfulness = Math.max(pixelR, pixelG, pixelB) - Math.min(pixelR, pixelG, pixelB);
      
            // Weight based on colorfulness (normalized)
            const weight = colorfulness / 255;
      
            // Accumulate weighted color values
            r += pixelR * weight;
            g += pixelG * weight;
            b += pixelB * weight;
      
            totalWeight += weight;
          }
      
          if (totalWeight === 0) {
            callback("rgb(0, 0, 0)"); // Return black if no valid pixels
            return;
          }
      
          // Calculate the weighted average color
          let avgR = Math.round(r / totalWeight);
          let avgG = Math.round(g / totalWeight);
          let avgB = Math.round(b / totalWeight);
      
          // Step 2: Post-process to boost colorfulness if too neutral
          const colorfulness = Math.max(avgR, avgG, avgB) - Math.min(avgR, avgG, avgB);
          if (colorfulness < 50) { // Threshold for low colorfulness
            // Identify the dominant color channel
            const maxChannel = Math.max(avgR, avgG, avgB);
      
            if (maxChannel === avgR) avgR = Math.min(avgR + 50, 255); // Boost red
            if (maxChannel === avgG) avgG = Math.min(avgG + 50, 255); // Boost green
            if (maxChannel === avgB) avgB = Math.min(avgB + 50, 255); // Boost blue
      
            // Increase saturation further by pushing other channels away
            if (avgR >= avgG && avgR >= avgB) {
              avgG = Math.max(avgG - 30, 0);
              avgB = Math.max(avgB - 30, 0);
            } else if (avgG >= avgR && avgG >= avgB) {
              avgR = Math.max(avgR - 30, 0);
              avgB = Math.max(avgB - 30, 0);
            } else if (avgB >= avgR && avgB >= avgG) {
              avgR = Math.max(avgR - 30, 0);
              avgG = Math.max(avgG - 30, 0);
            }
          }
      
          // Final average color
          const finalColor = `rgb(${avgR}, ${avgG}, ${avgB})`;
          callback(finalColor);
        };
      
        img.onerror = () => {
          console.error("Failed to load the image:", src);
          callback(null);
        };
      }
      

function fSoftCommit(item){
        //finish saving current editor 
        if(currentEditor == ""){
            
        }
        else{
            textArea1Obj[currentEditor] = textArea1.value;
            textArea2Obj[currentEditor] = textArea2.value;
            textArea3Obj[currentEditor] = textArea3.value;
    
            plusText1Obj[currentEditor] = plusText1.value;
            plusText2Obj[currentEditor] = plusText2.value;
            plusText3Obj[currentEditor] = plusText3.value;
        }
        
            textArea1.value = textArea1Obj[item];
            textArea2.value = textArea2Obj[item];
            textArea3.value = textArea3Obj[item];
    
            plusText1.value = plusText1Obj[item]; 
            plusText2.value = plusText2Obj[item]; 
            plusText3.value = plusText3Obj[item];
    
            saveTextArea(item);
    
    }

    function addTempDare(added){
        switch(current_wheel) {
            case "no pain":
                
                break;
            case "no enemies":
                enemiesButton.click();
                break;
            case "memes":
                memesButton.click();
                break;
            case "vergipsycho":
                vergiButton.click();
                break;
            case "no sitting":
                sittingButton.click();
                break;
            case "default":
                defaultButton.click();
                break;
            default:
                
        }
    }
    function addTempEnv(added){
        switch(current_wheel) {
            case "no pain":
                wheeldata_Pain_Free.environments.push(added);
                change_wheel(wheeldata_Pain_Free);
                break;
            case "no enemies":
                wheeldata_No_Enemies.environments.push(added);
                change_wheel(wheeldata_No_Enemies);
                break;
            case "memes":
                wheeldata_Memes.environments.push(added);
                change_wheel(wheeldata_Memes);
                break;
            case "vergipsycho":
                wheeldata_Vergi_psycho.environments.push(added);
                change_wheel(wheeldata_Vergi_psycho);
                break;
            case "no sitting":
                wheeldata_No_Sitting.environments.push(added);
                change_wheel(wheeldata_No_Sitting);
                break;
            case "default":
                wheeldata_Default.environments.push(added);
                change_wheel(wheeldata_Default);
                break;
            default:
                
        }
    }
    function addTempWheelch(added){
        switch(current_wheel) {
            case "no pain":
                
                break;
            case "no enemies":
                enemiesButton.click();
                break;
            case "memes":
                memesButton.click();
                break;
            case "vergipsycho":
                vergiButton.click();
                break;
            case "no sitting":
                sittingButton.click();
                break;
            case "default":
                defaultButton.click();
                break;
            default:
                
        }
    }
    function removeFirstMatch(arr, str) {
        // Find the index of the first occurrence of the string
        const index = arr.indexOf(str);
        
        // If the string exists in the array, remove it
        if (index !== -1) {
          arr.splice(index, 1);
        }
      }
    function removeTempDare(added){
        switch(current_wheel) {
            case "no pain":
                
                break;
            case "no enemies":
                enemiesButton.click();
                break;
            case "memes":
                memesButton.click();
                break;
            case "vergipsycho":
                vergiButton.click();
                break;
            case "no sitting":
                sittingButton.click();
                break;
            case "default":
                defaultButton.click();
                break;
            default:
                
        }
    }
    function removeTempEnv(added){
        switch(current_wheel) {
            case "no pain":
                removeFirstMatch(wheeldata_Pain_Free.environments, added);
                change_wheel(wheeldata_Pain_Free);
                break;
            case "no enemies":
                removeFirstMatch(wheeldata_No_Enemies.environments, added);
                change_wheel(wheeldata_No_Enemies);
                break;
            case "memes":
                removeFirstMatch(wheeldata_Memes.environments, added);
                change_wheel(wheeldata_Memes);
                break;
            case "vergipsycho":
                removeFirstMatch(wheeldata_Vergi_psycho.environments, added);
                change_wheel(wheeldata_Vergi_psycho);
                break;
            case "no sitting":
                removeFirstMatch(wheeldata_No_Sitting.environments, added);
                change_wheel(wheeldata_No_Sitting);
                break;
            case "default":
                removeFirstMatch(wheeldata_Default.environments, added);
                change_wheel(wheeldata_Default);
                break;
            default:
        }
    }
    function removeTempWheelch(added){
        switch(current_wheel) {
            case "no pain":
                
                break;
            case "no enemies":
                enemiesButton.click();
                break;
            case "memes":
                memesButton.click();
                break;
            case "vergipsycho":
                vergiButton.click();
                break;
            case "no sitting":
                sittingButton.click();
                break;
            case "default":
                defaultButton.click();
                break;
            default:
                
        }
    }


//#region spinwheel 
class PersonPlaying {
     constructor(name, dares, color) {
    this.name = name;
    this.dares = dares;
    this.color = color;
  }
  pushDare(dare){
    this.dares.push(dare);
    localStorage.setItem("DaresAlreadyRolled" + this.name, JSON.stringify(this.dares));
  }
  cleanDares(){
    this.dares = [];
    localStorage.removeItem("DaresAlreadyRolled" + this.name);
  }
  setDaresFromLocal(){
    const localDares = localStorage.getItem("DaresAlreadyRolled" + this.name);
    if(localDares !== null){
        this.dares = JSON.parse(localDares);
    }
  }
}

var peoplePlaying = [];
var currentPlayer = -1;
var turnsEnabled = false;

const checkboxTurns = document.getElementById('checkTurns');

var turnsSave = false;
const checkboxTurnsStorage = document.getElementById('checkTurnsStorage');
const checkTurnsStorageSpan = document.getElementById('checkTurnsStorageSpan');
const checkTurnsStorageLabel = document.getElementById('checkTurnsStorageLabel');

if(localStorage.turnsEnabled == "true"){
    checkboxTurns.checked = true;
    turnsEnabled = true
    checkTurnsStorageSpan.classList.remove("disabledSlider")
    checkTurnsStorageLabel.classList.remove("disabledSlider")
    checkboxTurnsStorage.disabled = false;
}
else{
    turnsEnabled = false;
}
checkboxTurns.addEventListener('change', (event) => {
if (event.currentTarget.checked) {
    turnsEnabled = true;
    localStorage.turnsEnabled = true;

    //lower button
    checkTurnsStorageSpan.classList.remove("disabledSlider")
    checkTurnsStorageLabel.classList.remove("disabledSlider")
    checkboxTurnsStorage.disabled = false;
    
} else {
    turnsEnabled = false;
    localStorage.turnsEnabled = false;
    removeHighlight(getShotButtonDivs());
    drawPie(dataDaresPie);

    //lower button
    checkTurnsStorageSpan.classList.add("disabledSlider")
    checkTurnsStorageLabel.classList.add("disabledSlider")
    checkboxTurnsStorage.checked = false;
    checkboxTurnsStorage.disabled = true;
    turnsSave = false;
    localStorage.turnsSave = false;
}
});

if(localStorage.turnsSave == "true"){
    checkboxTurnsStorage.checked = true;
    turnsSave = true
}
else{
    turnsSave = false;
}
checkboxTurnsStorage.addEventListener('change', (event) => {
if (event.currentTarget.checked) {
    turnsSave = true;
    localStorage.turnsSave = true;
    
} else {
    turnsSave = false;
    localStorage.turnsSave = false;
    }
});

function drawPie(data) {
  const canvas = document.getElementById("pieCanvas");
  const ctx = canvas.getContext("2d");

  // 🔹 Clear previous content
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const centerX = 250, centerY = 250, radius = 248;
  let total = data.reduce((sum, s) => sum + s.value, 0);
  let startAngle = -Math.PI / 2;

  const sliceAngles = [];

  // 🔹 Pass 1: fill and stroke all slices with black outline
  data.forEach(slice => {
    if (slice.value === 0) {
      sliceAngles.push(null);
      return;
    }

    const angle = (slice.value / total) * 2 * Math.PI;
    const endAngle = startAngle + angle;
    sliceAngles.push([startAngle, endAngle]);

    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.closePath();
    ctx.fillStyle = slice.color;
    ctx.fill();

    // 🟤 Default black outline for all
    ctx.lineWidth = 1;
    ctx.strokeStyle = "black";
    ctx.shadowBlur = 0;
    ctx.shadowColor = "";
    ctx.stroke();

    // Label logic (unchanged)
    const midAngle = (startAngle + endAngle) / 2;
    const textEndX = centerX + Math.cos(midAngle) * 80;
    const textEndY = centerY + Math.sin(midAngle) * 80;
    const textX = centerX + Math.cos(midAngle) * (radius - 10);
    const textY = centerY + Math.sin(midAngle) * (radius - 10);
    const dx = textEndX - textX, dy = textEndY - textY;
    const angleText = Math.atan2(dy, dx);
    const maxLength = Math.hypot(dx, dy);

    ctx.save();
    ctx.translate(textX, textY);
    ctx.rotate(angleText);
    ctx.font = "12px sans-serif";
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";

    let text = slice.label;
    while (ctx.measureText(text + "…").width > maxLength && text.length > 0) {
      text = text.slice(0, -1);
    }
    if (text !== slice.label) text += "…";
    ctx.fillStyle = "black";
    ctx.fillText(text, 0, 0);
    ctx.restore();

    startAngle = endAngle;
  });

  // 🔹 Pass 2: glowing stroke on top for matching slices
  const currentPlayerId = mod(currentPlayer, peoplePlaying.length);


  const glowColor = peoplePlaying.length == 0 ? "black" : peoplePlaying[currentPlayerId].color;

  sliceAngles.forEach((angles, i) => {
    const slice = data[i];
    if(!turnsEnabled) return;
    if(peoplePlaying.length == 0) return;
    if (!angles || !peoplePlaying[currentPlayerId].dares.includes(current_wheel + slice.label)) return;

    const [startAngle, endAngle] = angles;

    ctx.save();
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.closePath();


    ctx.lineWidth = 3;
    ctx.strokeStyle = glowColor;
    ctx.shadowColor = glowColor;
    ctx.shadowBlur = 5;
    ctx.stroke();
    ctx.restore();
  });
}

function sliceColor(colors, darename, seed){
    if(darename.includes("Round of Shots")){
        return "white"
    }
    else{
        return colors[seed % colors.length]
    }
}
var spinValuesPie;
var totalValue = 1;
var dataDaresPie;

window.onload = () => {
    let playernames = getShotButtonDivs();
    playernames.forEach(btn => {
        peoplePlaying.push(new PersonPlaying(btn.getElementsByTagName('div')[0].innerHTML, [], btn.getElementsByTagName('div')[1].style.color))
    })
    
    if(turnsSave){
    peoplePlaying.forEach((plr) =>{
            plr.setDaresFromLocal();
        })}
    getDataDareDefault();
    if(extraShotsCheck) {updateValueOfShots(dataDaresPie)};
    currentPlayer += 1;
    drawPie(dataDaresPie);
    currentPlayer -= 1;
    if(turnsEnabled) {
        currentPlayer += 1;
        highlightCurrentPlayer(getShotButtonDivs())
        currentPlayer -= 1;
    }

}

function findAngleByString(name){
    let angle = 0;
    for(i in spinValuesPie){
        if(spinValuesPie[i][2].toLowerCase().includes(name)){
            angle = (spinValuesPie[i][0] + spinValuesPie[i][1]) / 2;
            
            break;
        }
    }
    
    return angle;
}

function inverseDareToAngle(dare) {
    let angleValue = (dare + 0.5) / totalValue * 360; // center of bucket
    return Math.floor((90 - angleValue + 360) % 360);
}

function CalculateSpinValues(dataDares) {
    
    let totalValue = dataDares.reduce((sum, s) => sum + s.value, 0);
    
    let startAngle = -90;
    let newSpinvalues = [];
    const angle = (1 / totalValue) * 360;
    for(i in dataDares){
        for(j in [...Array(dataDares[i].value).keys()]){
        let endAngle = startAngle + angle;
        newSpinvalues.push([mod(startAngle, 360), mod(endAngle, 360), dataDares[i].label, (dataDares[i].label).slice("")[0] ])
        startAngle = endAngle;
        }
    }
    
    return newSpinvalues;
}

function generateValuePie(OriginalangleValue, total){
        let angleValue = Math.floor(mod(90 - OriginalangleValue, 360))
        let dare = Math.floor(angleValue / 360 * spinValuesPie.length)
        

        text.innerHTML = `${spinValuesPie[dare][2]}`;
        text2.innerHTML = `${spinValuesPie[dare][2]}`;      
};

function pullPieDare(OriginalangleValue, total){
    let angleValue = Math.floor(mod(90 - OriginalangleValue, 360))
        let dare = Math.floor(angleValue / 360 * total)
        
    return `${spinValuesPie[dare][2]}`
}
function pullPieType(OriginalangleValue, total){
    let angleValue = Math.floor(mod(90 - OriginalangleValue, 360))
        let dare = Math.floor(angleValue / 360 * total)

    return `${spinValuesPie[dare][3]}`
}

var originalShotsValue = 1;
var gotoriginal = false; 
function updateValueOfShots(array){
    if(!secret){
        return;
    }
    
    array.forEach(obj => {
        if((obj.label).toLowerCase().includes(". round of shots")){
            if(!gotoriginal){
                originalShotsValue = obj.value;
                gotoriginal = true;
            }
            obj.value = Math.ceil(shotMultiplier / (1-shotMultiplier) * (totalValue - obj.value))
        }
    })
    totalValue = dataDaresPie.reduce((sum, s) => sum + s.value, 0);
    spinValuesPie = CalculateSpinValues(dataDaresPie);
    drawPie(dataDaresPie);
    return;
}
function returnValueOfShots(array){
    array.forEach(obj => {
        if((obj.label).toLowerCase().includes(". round of shots")){
            obj.value = originalShotsValue;
        }
    })
    totalValue = dataDaresPie.reduce((sum, s) => sum + s.value, 0);
    spinValuesPie = CalculateSpinValues(dataDaresPie);
    drawPie(dataDaresPie);
}
function calculateRoundOfShotsPercantege(array){
    const svalue = array.find(obj => (obj.label).toLowerCase().includes(". round of shots")).value;
    const spercent =  svalue / totalValue;
    return spercent;
}

var sliderS = document.getElementById("sliderMul");
var outputS = document.getElementById("labelSliderMul");
var whiteOverlay = document.getElementById('whiteOverlay');

// Update the current slider value (each time you drag the slider handle)
sliderS.oninput = function() {
  outputS.innerHTML = "Amount of rolls that are rounds of shots: <span class='beerColor'>" + (this.value) + "%</span>";
  shotMultiplier = (this.value / 100.0);
  whiteOverlay.style.transform = `scaleX(${1-shotMultiplier})`
  updateValueOfShots(dataDaresPie);
  localStorage.extraShotsMult = shotMultiplier;

}


function getDataDareDefault() {
  pie_Default_colors = json_default.colors;
  if(localStorage.defaultJSON){
    pie_Default = JSON.parse(localStorage.defaultJSON).dares;
  }
  else{
    pie_Default = json_default.dares;
  }
  if(localStorage.plusdefaultDare){
        dareNums = localStorage.plusdefaultDare.split("\n");
    }else{
        dareNums = []
    }
    let datadares = []
    
    for(i in pie_Default){
        let slicecolors = sliceColor(pie_Default_colors, pie_Default[i], i)
        datadares.push({label: pie_Default[i], value: parseOrDefault(dareNums[i]), color: slicecolors})
    }
    if(localStorage.defaultJSON){
        pie_Default_wheel = JSON.parse(localStorage.defaultJSON).wheel_changes;
    }else{
        pie_Default_wheel = json_default.wheel_changes;
    }
    if(localStorage.plusdefaultWheel){
        wheelNums = localStorage.plusdefaultWheel.split("\n")
    }else{
        wheelNums = [];
    }
    
    if(!w_disabled){
        for(i in pie_Default_wheel){
            datadares.push({label: pie_Default_wheel[i], value: parseOrDefault(wheelNums[i]), color: "pink"})
        }
    }
    dataDaresPie = datadares;
    spinValuesPie = CalculateSpinValues(datadares);
    totalValue = datadares.reduce((sum, s) => sum + s.value, 0);
}
function getDataDareEnemies() {
  pie_Default_colors = json_no_enemies.colors;
  if(localStorage.enemiesJSON){
    pie_Default = JSON.parse(localStorage.enemiesJSON).dares;
  }
  else{
    pie_Default = json_no_enemies.dares;
  }
  if(localStorage.plusenemiesDare){
        dareNums = localStorage.plusenemiesDare.split("\n");
    }else{
        dareNums = []
    }
    let datadares = []
    
    for(i in pie_Default){
        let slicecolors = sliceColor(pie_Default_colors, pie_Default[i], i)
        datadares.push({label: pie_Default[i], value: parseOrDefault(dareNums[i]), color: slicecolors})
    }
    if(localStorage.enemiesJSON){
        pie_Default_wheel = JSON.parse(localStorage.enemiesJSON).wheel_changes;
    }else{
        pie_Default_wheel = json_no_enemies.wheel_changes;
    }
    if(localStorage.plusenemiesWheel){
        wheelNums = localStorage.plusenemiesWheel.split("\n")
    }else{
        wheelNums = [];
    }
    
    if(!w_disabled){
        for(i in pie_Default_wheel){
            datadares.push({label: pie_Default_wheel[i], value: parseOrDefault(wheelNums[i]), color: "pink"})
        }
    }
    dataDaresPie = datadares;
    spinValuesPie = CalculateSpinValues(datadares);
    totalValue = datadares.reduce((sum, s) => sum + s.value, 0);
}
function getDataDareVergi() {
  pie_Default_colors = json_vergi_psycho.colors;
  if(localStorage.vergiJSON){
    pie_Default = JSON.parse(localStorage.vergiJSON).dares;
  }
  else{
    pie_Default = json_vergi_psycho.dares;
  }
  if(localStorage.plusvergiDare){
        dareNums = localStorage.plusvergiDare.split("\n");
    }else{
        dareNums = []
    }
    let datadares = []
    
    for(i in pie_Default){
        let slicecolors = sliceColor(pie_Default_colors, pie_Default[i], i)
        datadares.push({label: pie_Default[i], value: parseOrDefault(dareNums[i]), color: slicecolors})
    }
    if(localStorage.vergiJSON){
        pie_Default_wheel = JSON.parse(localStorage.vergiJSON).wheel_changes;
    }else{
        pie_Default_wheel = json_vergi_psycho.wheel_changes;
    }
    if(localStorage.plusvergiWheel){
        wheelNums = localStorage.plusvergiWheel.split("\n")
    }else{
        wheelNums = [];
    }
    
    if(!w_disabled){
        for(i in pie_Default_wheel){
            datadares.push({label: pie_Default_wheel[i], value: parseOrDefault(wheelNums[i]), color: "pink"})
        }
    }
    dataDaresPie = datadares;
    spinValuesPie = CalculateSpinValues(datadares);
    totalValue = datadares.reduce((sum, s) => sum + s.value, 0);
}
function getDataDareMeme() {
  pie_Default_colors = json_memes.colors;
  if(localStorage.memesJSON){
    pie_Default = JSON.parse(localStorage.memesJSON).dares;
  }
  else{
    pie_Default = json_memes.dares;
  }
  if(localStorage.plusmemesDare){
        dareNums = localStorage.plusmemesDare.split("\n");
    }else{
        dareNums = []
    }
    let datadares = []
    
    for(i in pie_Default){
        let slicecolors = sliceColor(pie_Default_colors, pie_Default[i], i)
        datadares.push({label: pie_Default[i], value: parseOrDefault(dareNums[i]), color: slicecolors})
    }
    if(localStorage.memesJSON){
        pie_Default_wheel = JSON.parse(localStorage.memesJSON).wheel_changes;
    }else{
        pie_Default_wheel = json_memes.wheel_changes;
    }
    if(localStorage.plusmemesWheel){
        wheelNums = localStorage.plusmemesWheel.split("\n")
    }else{
        wheelNums = [];
    }
    
    if(!w_disabled){
        for(i in pie_Default_wheel){
            datadares.push({label: pie_Default_wheel[i], value: parseOrDefault(wheelNums[i]), color: "pink"})
        }
    }
    dataDaresPie = datadares;
    spinValuesPie = CalculateSpinValues(datadares);
    totalValue = datadares.reduce((sum, s) => sum + s.value, 0);
}
function getDataDareSitting() {
  pie_Default_colors = json_no_sitting.colors;
  if(localStorage.sittingJSON){
    pie_Default = JSON.parse(localStorage.sittingJSON).dares;
    
  }
  else{
    pie_Default = json_no_sitting.dares;
  }
  if(localStorage.plussittingDare){
        dareNums = localStorage.plussittingDare.split("\n");
    }else{
        dareNums = []
    }
    let datadares = []
    
    for(i in pie_Default){
        let slicecolors = sliceColor(pie_Default_colors, pie_Default[i], i)
        datadares.push({label: pie_Default[i], value: parseOrDefault(dareNums[i]), color: slicecolors})
    }
    if(localStorage.sittingJSON){
        pie_Default_wheel = JSON.parse(localStorage.sittingJSON).wheel_changes;
    }else{
        pie_Default_wheel = json_no_sitting.wheel_changes;
    }
    if(localStorage.plussittingWheel){
        wheelNums = localStorage.plussittingWheel.split("\n")
    }else{
        wheelNums = [];
    }
    
    if(!w_disabled){
        for(i in pie_Default_wheel){
            datadares.push({label: pie_Default_wheel[i], value: parseOrDefault(wheelNums[i]), color: "pink"})
        }
    }
    dataDaresPie = datadares;
    spinValuesPie = CalculateSpinValues(datadares);
    totalValue = datadares.reduce((sum, s) => sum + s.value, 0);
}


function confessionRoll(){
    text2.innerHTML = 
            `<div id="confession">CONFESSION: 
            <div class="rotating-text-container">
                
                <div class="rotating-text">
                    <span>${confessionWheel[mod(currentConfessionCount, confessionWheelLength)]}</span>
                    <span>Last lie you told (preferably to one of the boys) / TEOLLE JOURNAL PAGE (FUCK YOU)</span>
                    <span>Who is your idol</span>
                    <span>Name a person you DESPISE and why</span>
                    <span>Pick your death row meal</span>
                    <span>Last lie you told (preferably to one of the boys) / TEOLLE JOURNAL PAGE (FUCK YOU)</span>
                    <span>Reveal one thing on your bucket list</span>
                    <span>Fictional character (Movie/TV/Game/Anime) you'd bang</span>
                    <span>Favourite or least favourite cliche in fiction</span>
                    <span>Dodgy thing you've done alone</span>
                    <span>Reveal your kink</span>
                    <span>Most perverted thing you've done</span>
                    <span>Biggest pet peeve about one of the boys</span>
                    <span>Most embarassing bathroom story</span>
                    <span>Tell us a morally bad thing you've done</span>
                    <span>Reveal your first or most recent celebrity crush</span>
                    <span>What is your dream blunt rotation 2-4 people (living or dead, fictional or real)</span>
                    <span>What's the pettiest thing you've done</span>
                    <span>Tell us the dumbest thing you ever believed 100%</span>
                    <span>What's your GUILTY pleasure that you shouldn't admit</span>
                    <span>Cringiest thing you've done to impress someone</span>
                    <span>${confessionWheel[mod(currentConfessionCount, confessionWheelLength)]}</span>
                </div>
            </div>
            <button id="confessionButton" onclick="confessionRoll()"><i class="fa-solid fa-dice"></i></button>
            </div>`
    currentConfessionCount += 1;
}

function getShotButtonDivs() {
  // Get the container element by id
  const container = document.getElementById('shotClass');
  if (!container) return [];

  // Get all buttons inside the container
  const buttons = container.getElementsByTagName('button');

  // Filter buttons that have id="newID"
  const result = [];
  for (const btn of buttons) {
    if (btn.id === 'newID') {
      result.push(btn);
    }
  }
  return result;
}


function highlightCurrentPlayer(shotButtonDivs){
    if(shotButtonDivs.length==0 || peoplePlaying.length != shotButtonDivs.length) return;
    shotButtonDivs.forEach((button, index) => {
        if(mod(currentPlayer, peoplePlaying.length) == index){
            
            button.querySelector("#shotCount").classList.add("glow-text");
            
        }else{
            button.querySelector("#shotCount").classList.remove("glow-text");
        }
        
    })
}
function removeHighlight(shotButtonDivs){
    if(shotButtonDivs.length==0 || peoplePlaying.length != shotButtonDivs.length) return;
    shotButtonDivs.forEach((button) => {
        button.querySelector("#shotCount").classList.remove("glow-text");
        
    })}

//#region shotcolor
const shotColorBtn = document.getElementById('shotColorBtn');
const shotColorMenu = document.getElementById('shotColorMenu');
const shotColorSquares = shotColorMenu.querySelectorAll('.shotColor-square');
const shotColorIndicator = document.getElementById('shotColorIndicator');


// Default selected
let selectedShotColor = shotColorSquares[0];
selectedShotColor.classList.add('selected');

shotColorBtn.addEventListener('click', () => {
shotColorMenu.classList.toggle('open');
});

shotColorSquares.forEach(square => {
square.addEventListener('click', () => {
    selectedShotColor.classList.remove('selected');
    square.classList.add('selected');
    selectedShotColor = square;
    tempShotColor = selectedShotColor.dataset.shotcolor;

    shotColorIndicator.style.backgroundColor = square.dataset.shotcolor;
    shotColorMenu.classList.remove('open');
});
});

document.addEventListener('click', (e) => {
if (!shotColorBtn.contains(e.target) && !shotColorMenu.contains(e.target)) {
    shotColorMenu.classList.remove('open');
}
});

function getSelectedShotColor() {
  return selectedShotColor.dataset.shotcolor;
}

function getSafeShotColorAtIndex(json, index) {
  try {
    if (
      json &&
      Array.isArray(json.colors) &&
      typeof json.colors[index] === 'string'
    ) {
      return json.colors[index];
    }
  } catch (e) {
    // Do nothing, will return default
  }
  return 'white';
}


function normalizeDataShotsColors(dataShots) {
  const n = Math.max(
    dataShots.names?.length || 0,
    dataShots.counts?.length || 0,
    dataShots.images?.length || 0
  );

  if (!Array.isArray(dataShots.colors)) {
    dataShots.colors = [];
  }

  for (let i = 0; i < n; i++) {
    if (typeof dataShots.colors[i] !== 'string') {
      dataShots.colors[i] = 'white';
    }
  }

  // Truncate if colors has more than n items (optional, remove if undesired)
  dataShots.colors.length = n;
}


//markov chain fair-unfair coin 
class BiasedCoin {
  constructor(desiredRate = 0.1) {
    this.desiredRate = desiredRate;
    this.lastWasHead = true;
    this.pHeadsAfterTail = desiredRate / (1 - desiredRate);
  }
  pHeadsAfterTailChange(newDesired) {
    this.desiredRate = newDesired;
    this.pHeadsAfterTail = newDesired / (1 - newDesired);
  }

  next() {
    let result;
    if (this.lastWasHead) {
      result = false; // force tail
    } else {
      result = Math.random() < this.pHeadsAfterTail;
    }
    this.lastWasHead = result;
    return result;
  }
  nextFair() {
    let result;
    result = Math.random() < this.desiredRate;
    this.lastWasHead = result;
    return result;
  }
}
const markovCoin = new BiasedCoin();