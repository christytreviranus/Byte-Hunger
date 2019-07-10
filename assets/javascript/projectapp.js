
const config = {
    apiKey: "AIzaSyCn7ygSM2eOnXBkrvrGir2tnmYYbeR7uGo",
    authDomain: "groupproject1-30974.firebaseapp.com",
    databaseURL: "https://groupproject1-30974.firebaseio.com",
    projectId: "groupproject1-30974",
    storageBucket: "groupproject1-30974.appspot.com",
    messagingSenderId: "271261501589",
    appId: "1:271261501589:web:a0ea8fd47e61a1e9"
};

firebase.initializeApp(config);

const database = firebase.database();
//_______________API Section____________


const apiURL = "https://api.edamam.com/search?q=";
const apiKey = "&app_key=36f12c48ebecf0af53dfc30aad210ca4";
const apiId = "&app_id=a2182079";
let foodName = $("#food-name-input").val().trim();

let queryURL = 'https://api.edamam.com/search?q=chicken&app_id=a2182079&app_key=36f12c48ebecf0af53dfc30aad210ca4&'




// ____________________________________________Pasted code for CORS reqeust_____________
// Create the XHR object.
function createCORSRequest(method, url) {
    var xhr = new XMLHttpRequest();
    if ("withCredentials" in xhr) {
        // XHR for Chrome/Firefox/Opera/Safari.
        xhr.open(method, url, true);
    } else if (typeof XDomainRequest != "undefined") {
        // XDomainRequest for IE.
        xhr = new XDomainRequest();
        xhr.open(method, url);
    } else {
        // CORS not supported.
        xhr = null;
    }
    return xhr;
}

// Make the actual CORS request.
function makeCorsRequest() {
    const foodName = $("#food-name-input").val().trim();
    const itemUnit = $("#unit-input").val().trim();
    const itemQuantity = $("#quantity-input").val().trim();
    const space = " "
    const ofWord = "of"

    let app_id = "a2182079";
    let app_key = "36f12c48ebecf0af53dfc30aad210ca4";
    // let recipeHeader = ingr:;
    let recipe = `{"ingr": ["${itemQuantity + space + itemUnit + space + ofWord + space + foodName}"]}`

    console.log(recipe);
    let recipeUse = [itemQuantity, itemUnit, foodName];
    // let myJSON = JSON.stringify(recipeUse);
    // document.getElementById("demo").innerHTML = myJSON;
    console.log(recipeUse)
    // document.getElementById('itemQuantity').value & document.getElementById('itemUnit').value & document.getElementById('foodName').value
    let pre = document.getElementById('response');


    var url = 'https://api.edamam.com/api/nutrition-details?app_id=' + app_id + '&app_key=' + app_key;


    var xhr = createCORSRequest('POST', url);
    if (!xhr) {
        alert('CORS not supported');
        return;
    }

    // Response handlers.

    //THIS IS WHERE YOUR DATA IS COMING FROM, AKA THE RESPONSE
    xhr.onload = function () {
        var text = xhr.responseText;
        pre.innerHTML = text;
        let data = JSON.parse(text);
            console.log(data.calories);
        console.log("hello")

        const foodName = $("#food-name-input").val().trim();
        const itemUnit = $("#unit-input").val().trim();
        const itemQuantity = $("#quantity-input").val().trim();
        const itemCOGS = $("#cogs-input").val().trim();


        // Creates local "temporary" object for holding item data
        const newItem = {
            name: foodName,
            unit: itemUnit,
            quantity: itemQuantity,
            cogs: itemCOGS,
            calories: data.calories
        };

        // Uploads item data to the database
        database.ref().push(newItem);

        // Logs everything to console
        console.log(newItem.name);
        console.log(newItem.unit);
        console.log(newItem.quantity);
        console.log(newItem.cogs);

        // alert("Item successfully added");

        // Clears all of the text-boxes
        $("#food-name-input").val("");
        $("#unit-input").val("");
        $("#quantity-input").val("");
        $("#cogs-input").val("");



       
    };




    xhr.onerror = function () {
        alert('Woops, there was an error making the request.');
    };

    console.log('recipe:', recipe)

    pre.innerHTML = 'Loading...';
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(recipe);


    //     
}


//  
//


  // 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
  database.ref().on("child_added", function (childSnapshot) {
    console.log(childSnapshot.val());

    // Store everything into a variable.
    const foodName1 = childSnapshot.val().name;
    const itemUnit1 = childSnapshot.val().unit;
    const itemQuantity1 = childSnapshot.val().quantity;
    const itemCOGS1 = childSnapshot.val().cogs;
    const itemCalories = childSnapshot.val().calories;

    // Item Info
    // console.log(foodName);
    // console.log(itemUnit);
    // console.log(itemQuantity);
    // console.log(itemCOGS);


    // Calculate the total tax deduction amount
    let taxDeduction = 2 * itemCOGS1;
    console.log(taxDeduction);

    

text(foodName1),
        $("<td>").text(itemUnit1),
        $("<td>").text(itemQuantity1),
        $("<td>").text(itemCOGS1),
        $("<td>").text(taxDeduction),
        $("<td>").text(itemCalories)
    ;

    // Append the new row to the table
    $("#employee-table > tbody").append(newRow);
});

