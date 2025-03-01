let input = document.querySelector("input");
let button = document.querySelector("button");
let ipaddress = document.querySelector(".ip");
let userLocation = document.querySelector(".loc"); 
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
        const inputValue = input.value || "157.49.105.111"; 
        const apikey = "at_DxNzSKPrA7tpzMf1WA07BRSYmQtq6"
        const response = await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=${apikey}&ipAddress=${inputValue}`)
        
        if (!response.ok) {
            throw new Error("Could not fetch API");
        }

        const data = await response.json();

        if (data.status === "fail") {
            throw new Error("Invalid IP address or domain");
        }

        // Update the UI with fetched data
        ipaddress.innerHTML = data.ip;
        userLocation.innerHTML = `${data.location.city}, ${data.location.region}, ${data.location.country}`;
        timezone.innerHTML = `UTC ${data.location.timezone}`;
        isp.innerHTML = data.isp;

        let latitude=data.location.lat
        let longitude=data.location.lng
        
        map.setView([latitude, longitude], 13);

        if (marker) {
            map.removeLayer(marker);
        }

        marker = L.marker([latitude, longitude]).addTo(map)
            .bindPopup(`<b>${data.location.city}, ${data.location.region}</b><br>${data.location.country}`)
            .openPopup();
        

    } catch (error) {
        console.error(error);
        alert(error.message); 
    }
}
ip();


button.addEventListener("click", function () {
    ip();
});
