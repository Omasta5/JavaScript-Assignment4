console.log("connected!")

/// The Global Constants
const userInput = document.querySelector("#userInput");
const submitButton = document.getElementById("submitButton");
const tableBody = document.querySelector("#tableBody");

console.log(userInput);
console.log(submitButton);
console.log(tableBody);


/// The function that will do the user's fetch request
function fetchMoviesFromAPI() {
    let userValue = userInput.value;
    if(userValue == "") {
        alert("Sorry, but could please type in an actual video game name?")
    } else {
        let baseURL = "http://www.omdbapi.com/";
        let key = "8127fd11";

        let url = `${baseURL}?apikey=${key}&s=${userValue}`;
        console.log(url);

        fetch(url).then(response => response.json()).then(json => displayMovies(json));
    }
}

/// Function that displays all my movies
function displayMovies(data) {
    console.log(data);

    let moviesArray = data.Search;
    for (let i = 0; i < moviesArray.length; i++) {
        console.log(moviesArray[i]);

        let tableRow = document.createElement("tr");    // <tr></tr>
        let imdbIdTd = document.createElement("td");    // <td></td>
        let titleTd = document.createElement("td");    // <td></td>
        let yearTd = document.createElement("td");    // <td></td>
        let posterTd = document.createElement("td");    // <td></td>

        imdbIdTd.textContent = moviesArray[i].imdbID;
        titleTd.textContent = moviesArray[i].Title;
        yearTd.textContent = moviesArray[i].Year;

        let posterImage = document.createElement("img"); // <img>
        posterImage.setAttribute("src", moviesArray[i].Poster);
        posterImage.setAttribute("alt", `An image of ${moviesArray[i].Title}`);
        posterTd.appendChild(posterImage)

        tableRow.appendChild(imdbIdTd);
        tableRow.appendChild(titleTd);
        tableRow.appendChild(yearTd);
        tableRow.appendChild(posterTd);

        tableBody.appendChild(tableRow);
    } 
}

/// The event listener for the button
submitButton.addEventListener("click", fetchMoviesFromAPI);