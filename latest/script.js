let stops = ["2K Stop", "Chota Gate", "Drigh Road", "Korangi Crossing", "Malir Cant", "Malir Halt", "Model Colony", "Shah Faisal Town", "Sharfabad"];

let stopsList = document.getElementById("stopsList");
if (stopsList) {
    stopsList.innerHTML = stops.map(stop => `<li>${stop}</li>`).join('');
}

const buses = [
    {
        id: 1,
        name: "1-B",
        stops: ["Korangi Crossing", "Malir Cant", "Model Colony", "Malir Halt", "Shah Faisal Town"],
        filledSeats: 35,
        totalSeats: 50
    },
    {
        id: 2,
        name: "29",
        stops: ["2K Stop", "Chota Gate", "Malir Cant", "Shah Faisal Town"],
        filledSeats: 42,
        totalSeats: 50
    },
    {
        id: 3,
        name: "5",
        stops: ["Drigh Road", "Malir Halt", "Model Colony", "Sharfabad"],
        filledSeats: 28,
        totalSeats: 45
    },
    {
        id: 4,
        name: "Bus-4",
        stops: ["Chota Gate", "Shah Faisal Town", "Malir Cant"],
        filledSeats: 45,
        totalSeats: 50
    }
];

let stopSelected = "None";

if (window.location.pathname === '/index.html' || window.location.pathname === '/') {

    function filterList() {
        const input = document.getElementById('searchInput');
        const filter = input.value.toLowerCase();
        const li = document.querySelectorAll("#stopsList li");

        li.forEach(item => {
            const textValue = item.textContent || item.innerText;
            item.style.display = textValue.toLowerCase().includes(filter) ? '' : 'none';
        });
    }

    const allLi = document.querySelectorAll("#stopsList li");
    allLi.forEach(element => {
        element.style.margin = '0';
        element.style.padding = '10px';
        element.style.cursor = 'pointer';

        element.onclick = () => {
            const stopName = element.textContent;
            sessionStorage.setItem('selectedStop', stopName);
            window.location.assign(`stops.html?stop=${encodeURIComponent(stopName)}`);
        };
    });
}

if (window.location.pathname === '/stops.html') {
    const stopNameElement = document.getElementById('stopName');
    const urlParams = new URLSearchParams(window.location.search);
    const stopFromUrl = urlParams.get('stop');
    const stopFromStorage = sessionStorage.getItem('selectedStop');
    const selectedStop = stopFromUrl || stopFromStorage;

    if (selectedStop && stopNameElement) {
        stopNameElement.textContent = selectedStop;
        document.title = selectedStop + ' - Stop Details';
        console.log('Selected stop:', selectedStop);
    } else if (stopNameElement) {
        stopNameElement.textContent = 'No stop selected';
        stopNameElement.style.color = '#999';
    }

    const busesList = document.getElementById('busesList');
    if (busesList && selectedStop) {
        const filteredBuses = buses.filter(bus => bus.stops.includes(selectedStop));
        busesList.innerHTML = filteredBuses.length
            ? filteredBuses.map(bus => `
                <li>
                    <div class="bus-name">${bus.name}</div>
                    <div class="bus-seats">${bus.filledSeats}/${bus.totalSeats} seats filled</div>
                </li>
            `).join('')
            : `<li>No buses available for this stop</li>`;
    }
}

