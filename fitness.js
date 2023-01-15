let diettable = 'https://63be2b5b585bedcb36a8bdcd.mockapi.io/diettable'

//This event listener reads the data stored in the API array and writes it to the table on the html page every time the website is loaded.
document.addEventListener("DOMContentLoaded", function(){
    fetch(diettable)
    .then(response => response.json())
    .then(json => 
        {
            for (i = 0; i < json.length; i++) {
                let x = $('#diet thead tbody tr').length;
                let dietTableResponse = json;
                let htmltable = document.getElementById('diet');
                let row = htmltable.insertRow(x + 1);
                row.insertCell(0).innerHTML = json[i].food;
                row.insertCell(1).innerHTML = json[i].calories;
                row.insertCell(2).innerHTML = json[i].protein;
                row.insertCell(3).innerHTML = json[i].carbs;
                row.insertCell(4).innerHTML = json[i].fat;
                row.insertCell(5).innerHTML = json[i].id;
            }
       }
    )
});

//This function and the following event listener create and push new entries into the API for the values entered in the form.
function createFood(foodToCreate) {
    return $.ajax({
        url: 'https://63be2b5b585bedcb36a8bdcd.mockapi.io/diettable',
        data: JSON.stringify(foodToCreate),
        dataType: "json",
        type: "POST",
        contentType: "application/json",
        crossDomain: true,
    }).then(setTimeout(function(){
        window.location.reload();
    }, 500));
}

document.getElementById('submitbtn').addEventListener('click', () => {
    let foodName  = document.getElementById('exampleFood').value;
    let calories = document.getElementById('exampleCalories').value;
    let protein = document.getElementById('exampleProtein').value;
    let carbs = document.getElementById('exampleCarbs').value;
    let fat = document.getElementById('exampleFat').value;
    let foodToCreate = {"food":foodName,"calories":calories,"protein":protein,"carbs":carbs,"fat":fat,"id":"1"};
    createFood(foodToCreate)
});

//This function and the following event listener delete an entry from the API based on the ID entered into the input field on the html page.
function deleteFood(deletefood) {
    return $.ajax({
        url: `https://63be2b5b585bedcb36a8bdcd.mockapi.io/diettable/${deletefood}`,
        type: "DELETE",
    }).then(setTimeout(function(){
        window.location.reload();
    }, 500));
};

document.getElementById('deletebtn').addEventListener('click', () => {
    deleteFood(`${document.getElementById('exampleDelete').value}`);
});

//This function and the following event listener update an entry in the API with new values as entered in the form.
function updateFood(foodData) {
    return $.ajax({
        url: `https://63be2b5b585bedcb36a8bdcd.mockapi.io/diettable/${foodData.id}`,
        dataType: "json",
        data: JSON.stringify(foodData),
        contentType: "application/json",
        crossDomain: true,
        type: "PUT",
    }).then(setTimeout(function(){
        window.location.reload();
    }, 500));
};

document.getElementById('updatebtn').addEventListener('click', () => {
    let updatedFoodName = document.getElementById('exampleUpdatedFood').value;
    let updatedCalories = document.getElementById('exampleUpdatedCalories').value;
    let updatedProtein = document.getElementById('exampleUpdatedProtein').value;
    let updatedCarbs = document.getElementById('exampleUpdatedCarbs').value;
    let updatedFat = document.getElementById('exampleUpdatedFat').value;
    let updatedId = document.getElementById('exampleUpdatedId').value;
    let foodToUpdate = {"food":(updatedFoodName),"calories":(updatedCalories),"protein":(updatedProtein),"carbs":(updatedCarbs),"fat":(updatedFat),"id":`${updatedId}`};
    updateFood(foodToUpdate);
});