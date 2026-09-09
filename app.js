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

function showTickets(tickets) {
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
  let ticket = getTicket(ticketId)
  if(!ticket){
    return "Aucun ticket enregistré.";
  }
  let index = tickets.indexOf(ticket)

  for(let i=0; i<trips.length; i++){
    if(trips[i].id == ticket.tripId) {
      trips[i].availableSeats = trips[i].availableSeats + 1;
      console.log(trips[i].availableSeats)
      break;
    } 
  }

  tickets.splice(index,1)

  return "Ticket annulé avec succès.";
}

function searchTicket(name){
  let searchedTickets = []
  for(let i=0; i<tickets.length; i++){
    if(tickets[i].passengerName == name){
      searchedTickets.push(tickets[i])
    }
  }
  showTickets(searchedTickets)
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

// function increaseAvailableSeats(id) {

// }

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
  return false;
}

function chekFunc(){
  let a = prompt("donner nom:")

  let b = prompt("donner id:")
  buyTickets(a,b)

}

 
chekFunc()
chekFunc()
chekFunc()
showTickets(tickets)
let del = prompt("donner id delet :")
searchTicket(del)