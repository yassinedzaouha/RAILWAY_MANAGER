import { trips } from "./data/trips.js";
// console.log(trips);





function showTrips(){
    let trip
    console.log("\n\n            === TRAJETS DISPONIBLES ===");
    for(let i=0; i<trips.length; i++){
        trip = trips[i]
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

showTrips()

function byTickites(){

}
