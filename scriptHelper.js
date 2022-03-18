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
        return "Is not a Number"
   } 
	else {
        return "Is a Number"
   }
}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
    
    let fuelStatus = document.getElementById("fuelStatus");
    let cargoStatus = document.getElementById("cargoStatus");
    let launchStatus = document.getElementById("launchStatus");
    
  if (validateInput(pilot) === "Empty" || validateInput(copilot) === "Empty" || validateInput(fuelLevel) === "Empty" || validateInput(cargoLevel) === "Empty") {
  window.alert("All fields are required!");

} else if (validateInput(pilot) === "Is a Number" || validateInput(copilot) === "Is a Number" || validateInput(fuelLevel) === "Is not a Number" || validateInput(cargoLevel) === "Is not a Number") {
  window.alert("Valid information is required for each field!");

} else {
  let faultyItems = document.getElementById("faultyItems");
  list.style.visibility = "visible";
  faultyItems.style.visibility = "visible";
  document.getElementById("pilotStatus").innerHTML = `Pilot ${pilotName.value} is ready to launch`;
  document.getElementById("copilotStatus").innerHTML = `Co-pilot ${copilotName.value} is ready to launch`;

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
