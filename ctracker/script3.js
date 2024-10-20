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



function getDateString(){
    const date = new Date();
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
    console.log(old)
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


function extractNumber(str) {
    // Replace all non-digit characters with an empty string
    return parseInt(str.replace(/\D/g, '')); // \D matches any non-digit character
}