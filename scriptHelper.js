// Write your helper functions here!
require('isomorphic-fetch');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
    let missionDiv = document.getElementById("missionTarget");
    missionDiv.innerHTML = `
        <h2>Mission Destination</h2>
                <ol>
                    <li>Name: ${name} </li>
                    <li>Diameter: ${diameter} </li>
                    <li>Star: ${star} </li>
                    <li>Distance from Earth: ${distance} </li>
                    <li>Number of Moons: ${moons} </li>
                </ol>
                <img src=${imageUrl}>
        `;
}

function validateInput(testInput) {
   if (testInput === "") {
        return "Empty"
   } 
	else if (isNaN(testInput)) {
        return "Not a Number"
   } 
	else {
        return "Is a Number"
   }
}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
    
    let fuelStatus = document.getElementById("fuelStatus");
    let cargoStatus = document.getElementById("cargoStatus");
    let launchStatus = document.getElementById("launchStatus");
    let faultyItems = document.querySelector("#faultyItems");
    faultyItems.style.visibility = "hidden"
    
  if (validateInput(pilot) === "Empty" || validateInput(copilot) === "Empty" || validateInput(fuelLevel) === "Empty" || validateInput(cargoLevel) === "Empty") {
  window.alert("All fields are required!");

} else if (validateInput(pilot) === "Is a Number" || validateInput(copilot) === "Is a Number" || validateInput(fuelLevel) === "Not a Number" || validateInput(cargoLevel) === "Not a Number") {
  window.alert("Valid information is required for each field!");

} else {
  list.style.visibility = "visible";
  faultyItems.style.visibility = "visible";
  pilotStatus = document.getElementById("pilotStatus")
  pilotStatus.innerHTML = `Pilot ${pilot} is ready to launch`;
  copilotStatus = document.getElementById("copilotStatus");
  copilotStatus.innerHTML = `Co-pilot ${copilot} is ready to launch`;

  if (fuelLevel < 10000 && cargoLevel <= 10000) {
    fuelStatus.innerHTML = "Fuel level too low for launch";
    cargoStatus.innerHTML = "Cargo mass good for launch";
    launchStatus.innerHTML = "Shuttle not ready for launch";
    launchStatus.style.color = 'red';

  } else if (fuelLevel >= 10000 && cargoLevel > 10000) {
    fuelStatus.innerHTML = "Fuel level good for launch";
    cargoStatus.innerHTML = "Cargo mass too heavy";
    launchStatus.innerHTML = "Shuttle not ready for launch";
    launchStatus.style.color = 'red';

  } else if (fuelLevel < 10000 && cargoLevel > 10000) {
    fuelStatus.innerHTML = "Fuel level too low for the Journey";
    cargoStatus.innerHTML = "Cargo mass too heavy";
    launchStatus.innerHTML = "Shuttle is  not ready for launch";
    launchStatus.style.color = 'red';

  } else {
    fuelStatus.innerHTML = "Fuel level good for launch";
    cargoStatus.innerHTML = "Cargo mass good for launch";
    launchStatus.innerHTML = "Shuttle Ready for launch";
    launchStatus.style.color = 'green';
    }
  }

}

async function myFetch() {
    let planetsReturned;

    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then( function(response) {
    return response.json();
    });

    return planetsReturned;
}

function pickPlanet(planets) {
    let index = Math.floor(Math.random()*planets.length);
    return planets[index]
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;
