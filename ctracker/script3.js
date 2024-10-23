let db;
let request = indexedDB.open("MyDatabase", 1);

request.onupgradeneeded = function(event) {
    db = event.target.result;

    // Step 2: Create an object store if it doesn't exist
    if (!db.objectStoreNames.contains("jsonStore")) {
    db.createObjectStore("jsonStore", { keyPath: "id" }); // "id" is used as a key for each object
    }
};

request.onsuccess = function(event) {
    db = event.target.result;
    console.log("Database opened successfully!");
    oldCalories();   
    processCalories();
    
};
request.onerror = function(event) {
    console.error("Database error: " + event.target.errorCode);
};

   

// Function to save JSON object
async function saveData(jsonDataO) {

    let jsonData = jsonDataO;

     // Use await to ensure you wait for the data retrieval
     let old = await retrieveData(getDateString());

     // Check if old data exists and is valid JSON
     if (old) {
         let oldJson;
         
         // Parse old data only if it's a valid JSON string
         if (typeof old === 'string') {
             try {
                 oldJson = JSON.parse(old);
             } catch (e) {
                 console.error("Error parsing old JSON data:", e);
             }
         } else if (typeof old === 'object') {
             // If it's already an object, just use it directly
             oldJson = old;
         }
 
         if (oldJson && oldJson.items) {
             // Combine old and new items
             let newItems = oldJson.items.concat(jsonData.items);
             jsonData.items = newItems;
         }
     }
 
     // Store the updated JSON data
     let transaction = db.transaction(["jsonStore"], "readwrite");
    let store = transaction.objectStore("jsonStore");
    store.put(jsonData);
    itemArr = jsonData.items
    const oldC = itemArr[itemArr.length - 1].cal + extractNumber(document.getElementById("calMeter").innerHTML);
    console.log(oldC)
    document.getElementById("calMeter").innerHTML = "&nbsp" + oldC; 

}

// Function to retrieve JSON object
function retrieveData(key) {
    return new Promise((resolve, reject) => {
        let transaction = db.transaction(["jsonStore"], "readonly");
        let store = transaction.objectStore("jsonStore");
        let request = store.get(key);

        request.onsuccess = function(event) {
            resolve(event.target.result);
        };

        request.onerror = function(event) {
            reject("Data retrieval failed");
        };
    });
}

// Event listeners for buttons
document.getElementById("saveButton").addEventListener("click", function () {
    const nameB = document.getElementById("nameInput").value;
    const calB = parseInt(document.getElementById("calInput").value);
    
    if((nameB == "") || (isNaN(calB))){
        return;
    }
    const jsonBread = {
        id: getDateString(),
        items: [{cal: calB, name: nameB}]
    };
    
    saveData(jsonBread);
    document.getElementById("nameInput").value = "";
    document.getElementById("calInput").value = "";
});



function getDateString(timeSkip=0){
    const date = new Date();
    date.setDate(date.getDate() - timeSkip)
    const d = date.getDate();
    const m = date.getMonth();
    const y = date.getFullYear();
    const fullDate = "" +d+ "."+ m+ "."+ y;
    return fullDate
}


// Function to save JSON object
async function oldCalories() {

     // Use await to ensure you wait for the data retrieval
     let old = await retrieveData(getDateString());
    
     // Check if old data exists and is valid JSON
     if (old) {
         let oldJson;
         
         // Parse old data only if it's a valid JSON string
         if (typeof old === 'string') {
             try {
                 oldJson = JSON.parse(old);
             } catch (e) {
                 console.error("Error parsing old JSON data:", e);
             }
         } else if (typeof old === 'object') {
             // If it's already an object, just use it directly
             oldJson = old;
         }
 
         if (oldJson && oldJson.items) {
             // Combine old and new items
             var calCount = 0;
             oldJson.items.forEach(element => {
                calCount += parseInt(element.cal);
                
             });
             
             document.getElementById("calMeter").innerHTML = "&nbsp" + calCount;
         }
     }
}

// load seven days to the future
async function getPreviousCalories(timeSkip) {

    // Use await to ensure you wait for the data retrieval
    let old = await retrieveData(getDateString(timeSkip));
    
    // Check if old data exists and is valid JSON
    if (old) {
        let oldJson;
        
        // Parse old data only if it's a valid JSON string
        if (typeof old === 'string') {
            try {
                oldJson = JSON.parse(old);
            } catch (e) {
                console.error("Error parsing old JSON data:", e);
            }
        } else if (typeof old === 'object') {
            // If it's already an object, just use it directly
            oldJson = old;
        }

        if (oldJson && oldJson.items) {
            // Combine old and new items
            var calCount = 0;
            oldJson.items.forEach(element => {
               calCount += parseInt(element.cal);
               
            });
            
            console.log(oldJson.items)
            return [calCount, timeSkip]
        }
    }
    return 0
}


function extractNumber(str) {
    // Replace all non-digit characters with an empty string
    return parseInt(str.replace(/\D/g, '')); // \D matches any non-digit character
}

async function processCalories() {
    const promises = [];

    for (let i = 1; i <= 7; i++) {
        // Store each promise in an array
        const promise = getPreviousCalories(i);
        promises.push(promise);
    }

    // Wait for all promises to resolve
    const allResults = await Promise.all(promises);
    var oldestDate = 1;
    var calAVG = 0;
    allResults.forEach((item) => {
        if(item !== 0){
            calAVG += item[0];
            oldestDate = item[1];
        }
    })
    const AVG = calAVG / oldestDate;
    document.getElementById("avgMeter").innerHTML = "&nbsp" + Math.round(AVG);
    
}
// Custom Plugin to draw a horizontal line at the baseline
const baselineValue = 1500; // Adjust this value to where you want the line
        
const horizontalLinePlugin = {
    id: 'horizontalLine',
    afterDraw: (chart) => {
        const ctx = chart.ctx;
        const yScale = chart.scales.y;
        const xScale = chart.scales.x;

        const yValue = yScale.getPixelForValue(baselineValue);

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(xScale.left, yValue); // Start from left of the chart
        ctx.lineTo(xScale.right, yValue); // Draw to the right of the chart
        ctx.strokeStyle = 'black'; // Line color
        ctx.lineWidth = 2; // Line width
        ctx.setLineDash([5, 5]);
        ctx.stroke();
        ctx.restore();
    }
};

// Register the plugin with Chart.js
Chart.register(horizontalLinePlugin);


async function drawChart(){

    const promises = [];
    const labels = [getDateString(1),getDateString(2),getDateString(3),getDateString(4),getDateString(5),getDateString(6),getDateString(7)];
    const data = []
    for (let i = 1; i <= 7; i++) {
        // Store each promise in an array
        const promise = getPreviousCalories(i);
        promises.push(promise);
    }

    // Wait for all promises to resolve
    const allResults = await Promise.all(promises);
    allResults.forEach((item) => {
        if(item !== 0){
            data.push(item[0]);
        }
        else{
            data.push(0);
        }
    })
    data.reverse();
    labels.reverse();
    const colorsA = (data).map(value => getColorByValue(value));
    
const ctx = document.getElementById('myChart').getContext('2d');
window.myBarChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: labels,
        datasets: [{
            data: data,
            backgroundColor: colorsA,
            borderColor: [
                'rgba(0, 0, 0, 1)',
                'rgba(0, 0, 0, 1)',
                'rgba(0, 0, 0, 1)',
                'rgba(0, 0, 0, 1)',
                'rgba(0, 0, 0, 1)',
                'rgba(0, 0, 0, 1)',
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        },
        plugins: {
            legend: {
                display: false // Disable legend (since there's no label)
            }
        },
    }
});}

function getColorByValue(data) {
    if (data < 1000) {
        return 'rgb(0, 255, 0,0.9)';  // Fully green
    } else if (data <= 1500) {
        // Interpolate between green (0, 255, 0) and yellow (255, 255, 0)
        const ratio = (data - 1000) / 500;
        const r = Math.round(255 * ratio);  // Red increases from 0 to 255
        return `rgb(${r}, 255, 0,0.9)`;  // Green remains 255, blue stays 0
    } else if (data <= 2000) {
        // Interpolate between yellow (255, 255, 0) and red (255, 0, 0)
        const ratio = (data - 1500) / 500;
        const g = Math.round(255 * (1 - ratio));  // Green decreases from 255 to 0
        return `rgb(255, ${g}, 0,0.9)`;  // Red remains 255, blue stays 0
    } else {
        return 'rgb(255, 0, 0,0.9)';  // Fully red
    }
}