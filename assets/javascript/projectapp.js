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
    let foodName = $("#food-name-input").val().trim();
    let itemUnit = $("#unit-input").val().trim();
    let itemQuantity = $("#quantity-input").val().trim();
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
    //let pre = document.getElementById('response');


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
        //pre.innerHTML = text;
        let data = JSON.parse(text);
            console.log(data.calories);
      

        let foodName = $("#food-name-input").val().trim();
        let itemUnit = $("#unit-input").val().trim();
        let itemQuantity = $("#quantity-input").val().trim();
        let itemCOGS = $("#cogs-input").val().trim();




        
        // Creates local "temporary" object for holding item data
        let newItem = {
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

    //pre.innerHTML = 'Loading...';
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(recipe);


    //     
}

//On click event for submit button
$("#add-item-btn").on("click", function (event) {
    event.preventDefault();
    makeCorsRequest();
    foodName = $("#food-name-input").val().trim();
    itemUnit = $("#unit-input").val().trim();
    itemQuantity = $("#quantity-input").val().trim();
    itemCOGS = $("#cogs-input").val().trim();
});

//  
//


  // 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
  database.ref().on("child_added", function (childSnapshot) {
    console.log(childSnapshot.val());

    // Store everything into a variable.
    let foodName1 = childSnapshot.val().name;
    let itemUnit1 = childSnapshot.val().unit;
    let itemQuantity1 = childSnapshot.val().quantity;
    let itemCOGS1 = childSnapshot.val().cogs;
    let itemCalories = childSnapshot.val().calories;



    // Calculate the total tax deduction amount
    let taxDeduction = itemQuantity1 * itemCOGS1;


    let key = childSnapshot.key;

    // Create the new row
    let newRow = $("<tr>");
    newRow.append($("<td>" + childSnapshot.val().name + "</td>"));
    newRow.append($("<td>" + childSnapshot.val().unit + "</td>"));
    newRow.append($("<td class='text-center'>" + childSnapshot.val().quantity + "</td>"));
    newRow.append($("<td class='text-center'>" + childSnapshot.val().cogs + "</td>"));
    newRow.append($("<td class='text-center'>" + taxDeduction + "</td>"));
    newRow.append($("<td class='text-center'>" + itemCalories + "</td>"));
    newRow.append($("<td class='text-center'><button class='remove btn btn-default btn-sm' remove='" + key + "'> - </button></td>"));

    // Append the new row to the table
    $("#employee-table").append(newRow);

    //Remove Functionality - Removes data from Firebase and Page
$(document).on("click", ".remove", function () {
    removeKey = $(this).attr("remove");
    database.ref().child(removeKey).remove();
    window.location.reload();
  });
});