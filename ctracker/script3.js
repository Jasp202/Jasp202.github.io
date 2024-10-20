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
};

request.onerror = function(event) {
    console.error("Database error: " + event.target.errorCode);
};

   

// Function to save JSON object
function saveData(jsonData) {
    // Step 3: Create a transaction to add data
    let transaction = db.transaction(["jsonStore"], "readwrite");
    let store = transaction.objectStore("jsonStore");


    let request = store.put(jsonData);  // put() will add or update the data

    request.onsuccess = function() {
    document.getElementById("h1").innerHTML ="JSON object saved to IndexedDB";
    };

    request.onerror = function() {
    document.getElementById("h1").innerHTML ="Error saving JSON object";
    };
}

// Function to retrieve JSON object
function retrieveData() {
    // Step 4: Create a transaction to read data
    let transaction = db.transaction(["jsonStore"], "readonly");
    let store = transaction.objectStore("jsonStore");

    let request = store.get("1.1");  // Get the object with key "1"

    request.onsuccess = function(event) {
    if (request.result) {
        document.getElementById("h1").innerHTML =  JSON.stringify(request.result);
    } else {
        document.getElementById("h1").innerHTML ="No data found";
    }
    };

    request.onerror = function() {
    document.getElementById("h1").innerHTML ="Error retrieving data";
    };
}
let jsonData1 = {
    id: "1.1",  // This is the key for the object
    items: [{cal: 100, name: "rice"}, {cal: 200, name: "noodles"}]
  };
// Event listeners for buttons
document.getElementById("saveButton").addEventListener("click", function () {
    saveData(jsonData1);
});
document.getElementById("retrieveButton").addEventListener("click", retrieveData);