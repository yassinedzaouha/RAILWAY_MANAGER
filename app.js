import { trips } from "./data/trips.js";
const prompt = require("prompt-sync")();
// console.log(trips);

function showTrips() {
  let trip;
  console.log("\n\n            === TRAJETS DISPONIBLES ===");
  for (let i = 0; i < trips.length; i++) {
    trip = trips[i];
    console.log(`
            Trip #${trip.id}
            ━━━━━━━━━━━━━━━━━━━━
            ${trip.departure} -> ${trip.destination}
            ${trip.departureTime} -> ${trip.arrivalTime}
            Price: ${trip.price} DH
            Available seats: ${trip.availableSeats}
            ━━━━━━━━━━━━━━━━━━━━
        `);
  }
}

showTrips();
function buyTickets(id) {
  if (!getTrip(id)) {
    return "Trajet introuvable.";
  }
  if (!checkAvailableSeats(id)) {
    return "Train complet.";
  }
}

// function checkTrip(id){
//     for(let i=0;i<trips.length;i++){
//         if(trips[i].id == id){
//             return true
//         }
//     }
//     return false
// }
function checkAvailableSeats(id) {
  let trip = getTrip(id);
  if (trip.availableSeats) return true;
  return false;
}

function getTrip(id) {
  for (let i = 0; i < trips.length; i++) {
    if (trips[i].id == id) {
      return trips[i];
    }
  }
  return false
}

