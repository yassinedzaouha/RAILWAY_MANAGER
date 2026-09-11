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
      buyTickets();
      break;

    case 3:
      showTickets(tickets);
      break;

    case 4:
      cancelTicket();
      break;

    case 5:
      searchTicket();
      break;

    case 6:
      filterTrips();
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

function buyTickets() {
  let name = prompt("Nom du passager : ");

  if (name.trim() == "") {
    console.log("\nvotre nom est invalide .");
    return;
  }

  let id = Number(prompt("Identifiant du trajet : "));

  let trip = getTrip(id);
  if (!trip) {
    console.log("\nTrajet introuvable.");
    return;
  }
  if (!checkAvailableSeats(id)) {
    console.log("\nTrain complet.");
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
  trip.availableSeats--;
  console.log("\nvotre ticket etait achter avec succes\n");
}

function showTickets(tickets) {
  let ticket;
  if (!tickets.length) {
    console.log("\nAucun ticket enregistré.");
    return;
  }

  console.log("\n\n            === TICKETES DISPONIBLES ===");

  for (let i = 0; i < tickets.length; i++) {
    ticket = tickets[i];
    let departure = getTrip(ticket.tripId).departure;
    let destination = getTrip(ticket.tripId).destination;
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

function cancelTicket() {
  let ticketId = Number(prompt("Identifiant du ticket : "));
  let ticket = getTicket(ticketId);
  if (!ticket) {
    console.log("\nAucun ticket enregistré by id", ticketId);
    return;
  }

  for (let i = 0; i < tickets.length; i++) {
    if (tickets[i] == ticket) {
      tickets.splice(i, 1);
      break;
    }
  }

  let trip = getTrip(ticket.tripId);
  trip.availableSeats++;

  console.log("\nTicket annulé avec succès.");
}

function searchTicket() {
  let name = prompt("Nom du passager : ");
  let searchedTickets = [];
  for (let ticket of tickets) {
    if (ticket.passengerName.toLowerCase() == name.toLowerCase()) {
      searchedTickets.push(ticket);
    }
  }

  if (!searchedTickets.length) {
    console.log("\nle nom", name, "est introuvable");
    return;
  }
  
  showTickets(searchedTickets);
}

function filterTrips() {
  let city = prompt("Ville de départ : ");
  console.log(`\n=== les traject de ${city} ===`);
  let checkcity = false;
  for (let trip of trips) {
    if (trip.departure.toLowerCase() == city.toLowerCase()) {
      console.log(
        `\n\n${trip.departure} ==> ${trip.destination} : ${trip.price}DH\n\n`,
      );
      checkcity = true;
    }
  }
  if (!checkcity) {
    console.log("\ncity intouvable");
  }
}

function tripSort() {
  let val;
  for (let j = 0; j < trips.length; j++) {
    for (let i = 0; i < trips.length - j - 1; i++) {
      if (trips[i].price > trips[i + 1].price) {
        val = trips[i];
        trips[i] = trips[i + 1];
        trips[i + 1] = val;
      }
    }
  }
  console.log("\nles trajets été trie avec succés ");
  showTrips();
}

//Statistics

function ticketsTotalNumber() {
  console.log("\nNombre total de tickets :", tickets.length);
}

function totalRevenue() {
  let total = 0;
  for (let ticket of tickets) {
    total += ticket.price;
  }
  console.log("\nChiffre d'affaires total :", total);
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

  bestTrip = getTrip(id)

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
  if (trip.availableSeats){
    return true;
  } 
  return false;
}

function assignSeatNumber(id) {
  let isAvailable;
  let mySeatNumber = 0;
  let i = 1;
  while (!mySeatNumber) {
    isAvailable = true;
    for (let j = 0; j < tickets.length; j++) {
      if ((tickets[j].tripId == id) && (tickets[j].seatNumber == i)) {
        isAvailable = false;
        break;
      }
    }
    if (isAvailable) {
      mySeatNumber = i;
    }
    i++;
  }
  return mySeatNumber;
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