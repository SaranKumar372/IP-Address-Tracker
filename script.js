

let input = document.querySelector("input");
let button = document.querySelector("button");
let ipaddress = document.querySelector(".ip");
let userLocation = document.querySelector(".loc"); // Renamed to avoid conflict
let timezone = document.querySelector(".time");
let isp = document.querySelector(".risp");


var map = L.map('map').setView([13.0895, 80.2739], 13);
var osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});
osm.addTo(map);
var marker;





async function ip() {
    try {
        const inputValue = input.value || "157.49.105.111"; // Default to a known IP if input is empty
        const response = await fetch(`https://ip-api.com/json/${inputValue}`);
        
        if (!response.ok) {
            throw new Error("Could not fetch API");
        }

        const data = await response.json();

        if (data.status === "fail") {
            throw new Error("Invalid IP address or domain");
        }

        // Update the UI with fetched data
        ipaddress.innerHTML = data.query;
        userLocation.innerHTML = `${data.city}, ${data.region}, ${data.country}`;
        timezone.innerHTML = `UTC ${data.timezone}`;
        isp.innerHTML = data.isp;

        let latitude=data.lat
        let longitude=data.lon
        
        map.setView([latitude, longitude], 13);

        // Remove previous marker if it exists
        if (marker) {
            map.removeLayer(marker);
        }

        // Add a new marker at the updated location
        marker = L.marker([latitude, longitude]).addTo(map)
            .bindPopup(`<b>${data.city}, ${data.region}</b><br>${data.country}`)
            .openPopup();
        

    } catch (error) {
        console.error(error);
        alert(error.message); // Show an error message to the user
    }
}
ip();

// Event Listener for button click
button.addEventListener("click", function () {
    ip();
});
