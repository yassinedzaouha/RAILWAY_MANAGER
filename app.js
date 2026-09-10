const prompt = require("prompt-sync")();
const trips = require("./data/trips.js").trips;
let ticketId = 1;

let tickets = [];

main();

function main() {
  let choice;
  do {
    menu();

    choice = Number(prompt("Votre choix : "));

    switchCases(choice);
  } while (choice !== 0);
}

function switchCases(choice) {
  switch (choice) {
    case 1:
      showTrips();
      break;

    case 2:
      let name = prompt("Nom du passager : ");
      let tripId = prompt("Identifiant du trajet : ");
      buyTickets(name, tripId);
      break;

    case 3:
      showTickets(tickets);
      break;

    case 4:
      let ticketId = prompt("Identifiant du ticket : ");
      cancelTicket(ticketId);
      break;

    case 5:
      let serachedName = prompt("Nom du passager : ");
      searchTicket(serachedName);
      break;

    case 6:
      let city = prompt("Ville de départ : ");
      filterTrips(city);
      break;

    case 7:
      tripSort();
      break;

    case 8:
      statisticsMenu();
      break;

    case 0:
      console.log("Au revoir !...");
      break;

    default:
      console.log("Choix invalide.");
  }
}

function menu() {
  console.log("\n=================================");
  console.log("        RAILWAY MANAGER");
  console.log("=================================");
  console.log("1. Afficher les trajets");
  console.log("2. Acheter un ticket");
  console.log("3. Afficher les tickets");
  console.log("4. Annuler un ticket");
  console.log("5. Rechercher un ticket");
  console.log("6. Filtrer les trajets");
  console.log("7. Trier les trajets");
  console.log("8. Afficher les statistiques");
  console.log("0. Quitter\n");
}

function statisticsMenu() {
  let choice;
  do {
    console.log("\n\n=================================");
    console.log("          STATISTIQUES");
    console.log("=================================");
    console.log("1. Nombre total de tickets vendus");
    console.log("2. Chiffre d'affaires total");
    console.log("3. Trajet le plus vendu");
    console.log("0. Retour au menu principal\n");

    choice = Number(prompt("Votre choix : "));

    switch (choice) {
      case 1:
        ticketsTotalNumber();
        break;

      case 2:
        totalRevenue();
        break;

      case 3:
        bestSelling();
        break;

      case 0:
        console.log("Retour au menu principal...");
        break;

      default:
        console.log("Choix invalide.");
    }
  } while (choice !== 0);
}

// principal functions

//show all trips
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

//buy tickets
function buyTickets(name, id) {
  let trip = getTrip(id);
  if (!trip) {
    console.log("Trajet introuvable.");
    return;
  }
  if (!checkAvailableSeats(id)) {
    console.log("Train complet.");
    return;
  }
  let ticket = {
    id: ticketId++,
    passengerName: name,
    tripId: id,
    seatNumber: assignSeatNumber(id),
    price: trip.price,
  };
  tickets.push(ticket);
  decreaseAvailableSeats(trip);
}

//show all tickets
function showTickets(tickets) {
  let ticket;
  if (!tickets.length) {
    console.log("Aucun ticket enregistré.");
    return;
  }
  console.log("\n\n            === TICKETES DISPONIBLES ===");
  for (let i = 0; i < tickets.length; i++) {
    ticket = tickets[i];
    let departure = trips.find(trip => trip.id == ticket.tripId).departure
    let destination = trips.find(trip => trip.id == ticket.tripId).destination
    console.log(`
            Ticket #${ticket.id}  
            ━━━━━━━━━━━━━━━━━━━━
            Passager : ${ticket.passengerName}
            Trajet :  ${departure} -> ${destination}
            Place : ${ticket.seatNumber}
            Price : ${ticket.price} DH
            ━━━━━━━━━━━━━━━━━━━━
        `);
  }
}

// delete a ticket
function cancelTicket(ticketId) {
  let ticket = getTicket(ticketId);
  if (!ticket) {
    console.log("Aucun ticket enregistré by id", ticketId);
    return;
  }

  let index = tickets.findIndex(e => e.tripId === ticket.tripId);
  tickets.splice(index, 1);

  let trip = getTrip(ticket.tripId)
  trip.availableSeats++

  console.log("\nTicket annulé avec succès.");
}

// Search for a ticket
function searchTicket(name) {
  let searchedTickets = [];
  for (let ticket of tickets) {
    if (ticket.passengerName.toLowerCase() == name.toLowerCase()) {
      searchedTickets.push(ticket);
    }
  }
  if (!searchedTickets.length) {
    console.log("le nom " + name + "est introuvable");
  } else {
    showTickets(searchedTickets);
  }
}

//filter trips by departure city
function filterTrips(city) {
  console.log(`=== les traject de ${city} ===`);
  let checkcity = false;
  for (let trip of trips) {
    if (trip.departure.toLowerCase() == city.toLowerCase()) {
      console.log(
        `\n\n${trip.departure} ==> ${trip.destination} : ${trip.price}\n\n`,
      );
      checkcity = true;
    }
  }
  if (!checkcity) {
    console.log("city intouvable");
  }
}

//sorting trips
function tripSort() {
  let val;
  for (let j = 0; j < trips.length; j++) {
    for (let i = 0; i < trips.length - i - 1; i++) {
      if (trips[i].price > trips[i + 1].price) {
        val = trips[i];
        trips[i] = trips[i + 1];
        trips[i + 1] = val;
      }
    }
  }
  console.log("traject été trie avec succés ");
  showTrips();
}

//Statistics

function ticketsTotalNumber() {
  console.log("Nombre total de tickets :", tickets.length);
}

function totalRevenue() {
  let total = 0;
  for (let ticket of tickets) {
    total += ticket.price;
  }
  console.log("Chiffre d'affaires total :", total);
}

function bestSelling() {
  let count;
  let max = 0;
  let id = 0;
  let bestTrip = {};

  for (let trip of trips) {
    count = 0;
    for (let ticket of tickets) {
      if (ticket.tripId == trip.id) {
        count++;
      }
    }
    if (count > max) {
      max = count;
      id = trip.id;
    }
  }

  for (let trip of trips) {
    if (trip.id == id) {
      bestTrip = trip;
      break;
    }
  }

  if (max) {
    console.log("\nTrajet le plus vendu :");
    console.log(bestTrip.departure + " → " + bestTrip.destination);
    console.log(max + " tickets vendus");
  } else {
    console.log("\nAucun ticket vendu.");
  }
}

//helper functions

function checkAvailableSeats(id) {
  let trip = getTrip(id);
  if (trip.availableSeats) return true;
  return false;
}

function assignSeatNumber(id) {
  let isAvailable;
  let mySeatNumber = 0
  let i = 1
  while(!mySeatNumber) {
    isAvailable = true;
    for (let j = 0; j < tickets.length; j++) {
      if (tickets[j].tripId == id && tickets[j].seatNumber == i) {
        isAvailable = false;
        break;
      }
    }
    if (isAvailable) {
      mySeatNumber =  i
    }
    i++;
  }
  return mySeatNumber;
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
  return false;
}

function getTicket(id) {
  for (let i = 0; i < tickets.length; i++) {
    if (tickets[i].id == id) {
      return tickets[i];
    }
  }
  return false;
}
