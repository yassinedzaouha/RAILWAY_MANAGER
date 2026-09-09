const prompt = require("prompt-sync")();
const trips = require("./data/trips.js").trips;
let ticketId = 1

let tickets = []

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

function buyTickets(name,id) {
  let trip = getTrip(id)
  if (!trip) {
    return "Trajet introuvable.";
  }
  if (!checkAvailableSeats(id)) {
    return "Train complet.";
  }

  let ticket = {
    id:ticketId++, 
    passengerName:name, 
    tripId:id, 
    seatNumber:assignSeatNumber(id), 
    price:trip.price
  }
  tickets.push(ticket)
  decreaseAvailableSeats(trip)


}

function showTickets() {
  let ticket;
  if(!tickets.length){
    console.log("Aucun ticket enregistré.")
    return null
  }
  console.log("\n\n            === TICKETES DISPONIBLES ===");
  for (let i = 0; i < tickets.length; i++) {
    ticket = tickets[i];
    console.log(`
            Ticket #${ticket.id}  
            ━━━━━━━━━━━━━━━━━━━━
            Passager : ${ticket.passengerName}
            Trajet :  ${ticket.tripId}
            Place : ${ticket.seatNumber}
            Price : ${ticket.price} DH
            ━━━━━━━━━━━━━━━━━━━━
        `);
  }
}

function deleteTickets(ticketId){
  let ticket = getTicket()
  if(!ticket){
    return "Aucun ticket enregistré."
  }
  
}



function checkAvailableSeats(id) {
  let trip = getTrip(id);
  if (trip.availableSeats) return true;
  return false;
}

function assignSeatNumber(id) {
  let isAvailable
  for(let i=1; i<=50; i++){
    isAvailable = true
    for(let j=0; j<tickets.length; j++){
      if((tickets[j].tripId == id) && ( tickets[j].seatNumber == i)){
        isAvailable = false
        break;
      }
    }
    if(isAvailable){
      return i;
    }
  }
}

function decreaseAvailableSeats(trip) {
  trip.availableSeats -= 1;
}

function getTrip(id) {
  for (let i = 0; i < trips.length; i++) {
    if (trips[i].id == id) {
      return trips[i];
    }
  }
  return false
}

function getTicket(id) {
  for (let i = 0; i < tickets.length; i++) {
    if (tickets[i].id == id) {
      return tickets[i];
    }
  }
  return false
}

// function checkTrip(id){
//     for(let i=0;i<trips.length;i++){
//         if(trips[i].id == id){
//             return true
//         }
//     }
//     return false
// }

function chekFunc(){
  let a = prompt("donner nom:")

  let b = prompt("donner id:")
  buyTickets(a,b)

}
chekFunc()
chekFunc()
chekFunc()
chekFunc()
showTickets()
