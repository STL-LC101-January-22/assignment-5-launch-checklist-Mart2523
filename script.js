// Write your JavaScript code here!

window.addEventListener("load", function() {

    let listedPlanets;
  
    let listedPlanetsResponse= myFetch();

   listedPlanetsResponse.then(function(result) {
       listedPlanets = result;
   }).then(function () {
       let planet = pickPlanet(listedPlanets);
       addDestinationInfo(document, planet.name, planet.diameter, planet.star, planet.distance, planet.moons, planet.image)
   });

   let form = document.querySelector("form");
   
   form.addEventListener("submit", function(event) {
         
       let list = document.querySelector("#faultyItems");
       let pilot = document.querySelector("input[name=pilotName]");
       let coPilot = document.querySelector("input[name=copilotName]");
       let fuelLevel= document.querySelector("input[name=fuelLevel]");
       let cargoLevel = document.querySelector("input[name=cargoMass]");
       list.style.visibility = "hidden";
       
       
       formSubmission(document, list, pilot.value, coPilot.value, fuelLevel.value, cargoLevel.value)

       event.preventDefault();

            
     });

});