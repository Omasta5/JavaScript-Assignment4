console.log("connected successfully! :)");
/// A console log just to make sure everything's connected

/// The global constants for the page
const userInput = document.querySelector("#userInput");
const submitButton = document.getElementById("submitButton");
const tableBody = document.querySelector("#tableBody");
const studentId = document.querySelector('#myStudentId');

console.log(userInput);
console.log(submitButton);
console.log(tableBody);


/// The function that will do the user's fetch request
function fetchGamesFromAPI() {
    let userValue = userInput.value;
    if (userValue === "") { /// If the user doesn't type in anything:
        alert("Sorry, but could you please type in an actual video game name?");
    } else {
        let baseURL = "https://api.rawg.io/api/games"; // The baseURL for the webiste
        let key = "65795d32336c492c89733f0de94d2c4e"; // The special key I got from the website

        let url = `${baseURL}?key=${key}&search=${userValue}`; // For the web service I used, it used 'key' instead of 'apikey' and 'search' instead of just 's'
        console.log(`Fetching data from: ${url}`);

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(json => displayGames(json))
            .catch(error => {
                console.error("Error fetching data:", error);
                alert("Oops! Seems like something went wrong while fetching the data. Please try again later.");
            });
    }
}

/// The function to display games in the table
function displayGames(data) {
    // This will clear any existing rows that may be in the table
    tableBody.innerHTML = "";

    let gamesArray = data.results;

    if (gamesArray && gamesArray.length > 0) {
        for (let i = 0; i < gamesArray.length; i++) {
            console.log(gamesArray[i]);

            let tableRow = document.createElement("tr"); // <tr></tr>
            let gameIdTd = document.createElement("td"); // <td></td>
            let developerTd = document.createElement("td"); // <td></td>
            let publisherTd = document.createElement("td"); // <td></td>
            let genreTd = document.createElement("td"); // <td></td>
            let gameTagTd = document.createElement("td"); // <td></td>
            let gameImageTd = document.createElement("td"); // <td></td>

            gameIdTd.textContent = gamesArray[i].id;
            developerTd.textContent = gamesArray[i].developers?.[0]?.name || "N/A";
            publisherTd.textContent = gamesArray[i].publishers?.[0]?.name || "N/A";
            genreTd.textContent = gamesArray[i].genres?.map(g => g.name).join(", ") || "N/A";
            gameTagTd.textContent = gamesArray[i].tags?.map(t => t.name).join(", ") || "N/A";

            let gameImage = document.createElement("img"); // <img>
            gameImage.setAttribute("src", gamesArray[i].background_image);
            gameImage.setAttribute("alt", `An image of the boxart for ${gamesArray[i].name}`);
            gameImageTd.appendChild(gameImage);

            tableRow.appendChild(gameIdTd);
            tableRow.appendChild(developerTd);
            tableRow.appendChild(publisherTd);
            tableRow.appendChild(genreTd);
            tableRow.appendChild(gameTagTd);
            tableRow.appendChild(gameImageTd);

            tableBody.appendChild(tableRow);
        }
    } else { // Just in case no games are found after searching
        let noResultsRow = document.createElement("tr");
        let noResultsCell = document.createElement("td");
        noResultsCell.colSpan = 6;
        noResultsCell.textContent = "No games were found matching your search terms. Please try another search.";
        noResultsRow.appendChild(noResultsCell);
        tableBody.appendChild(noResultsRow);
    }

    // The Code that should dinamitcally add my student name and ID to the web page
    studentId.textContent = "Owen DeHaan | ID: 1189401";
    console.log(studentId.textContent); // Log the actual content
}
/// The event listener for the button + Student ID
studentId.textContent = "Owen DeHaan | ID: 1189401"; // I REALLY wanted to get this to only show up after the User submits a search for a game, but for whatever reason the code never properly displays the info, even though as far I can tell, it should have everything it needs
console.log(studentId.textContent);
submitButton.addEventListener("click", fetchGamesFromAPI);
