// Bus stops data
let stops = [
  "2K Stop",
  "Ala Din Park",
  "Askari – II & III",
  "Askari – IV",
  "Aziz Bhatti Park",
  "Bahadurabad",
  "Bait-Ul-Mukarram",
  "Cant Station",
  "Cantt. Bazaar",
  "Chota Gate",
  "CMH",
  "Colony Gate",
  "Dhoraji",
  "Drig Road",
  "Falcon",
  "Forum Shopping Mall",
  "FTC",
  "Gizri",
  "Guro Mandir",
  "Hassan Square",
  "Hilltop",
  "Hyper Star",
  "Iqra University",
  "Islamiaya College",
  "Johar More",
  "Karsaz Pankha Stop",
  "Kh. Bukhari",
  "Kh. Ittehad",
  "Kh. Mujahid",
  "Korangi Crossing",
  "Korangi No. 2",
  "Korangi No. 5",
  "KPT Bridge",
  "Lal Flat",
  "Landhi 89",
  "Landhi No. 4",
  "Liaquat 10. No.",
  "M. Ali Society",
  "Malir Cantt",
  "Malir Cantt Phase-I",
  "Malir Halt",
  "Manzoor Colony",
  "Matka Stop",
  "Mumtaz Manzil",
  "Nasir Jump",
  "NMC",
  "PAF Chapter",
  "Perfume Chowk Johar",
  "Phase – IV",
  "Race Course",
  "Saba Avenue",
  "Sector - G",
  "Sector - J",
  "Shah Faisal Town",
  "Sharfabad",
  "Soldier Bazar",
  "Stadium Road",
  "Star Gate",
  "Teen Talwar",
  "Urdu Science College",
  "Usman Memmoiral",
  "ZamZama",
  "Zubaida Hospital"
];
// Buses data with enhanced information
const buses = [
    {
        id: 1,
        name: "1-B",
        stops: ["Malir Cantt Phase-I", "Sector - G", "Sector - J", "Falcon", "CMH", "Cantt. Bazaar"],
        filledSeats: 35,
        totalSeats: 50
    },
    {
        id: 2,
        name: "11",
        stops: ["Soldier Bazar", "Guro Mandir", "Islamiaya College", "Stadium Road"],
        filledSeats: 42,
        totalSeats: 50
    },
    {
        id: 3,
        name: "14",
        stops: ["Sharfabad", "Bahadurabad", "Dhoraji", "M. Ali Society", "Karsaz Pankha Stop"],
        filledSeats: 28,
        totalSeats: 45
    },
    {
        id: 4,
        name: "15",
        stops: ["Forum Shopping Mall", "ZamZama", "Gizri", "Phase – IV"],
        filledSeats: 45,
        totalSeats: 50
    },
    {
        id: 5,
        name: "16",
        stops: ["Hyper Star", "Kh. Mujahid", "Saba Avenue", "Kh. Bukhari", "Kh. Ittehad"],
        filledSeats: 40,
        totalSeats: 50
    },
    {
        id: 6,
        name: "19",
        stops: ["Hassan Square", "Mumtaz Manzil", "Bait-Ul-Mukarram", "Urdu Science College", "Aziz Bhatti Park"],
        filledSeats: 42,
        totalSeats: 50
    },
    {
        id: 7,
        name: "31",
        stops: ["KPT Bridge", "Iqra University", "Manzoor Colony", "PAF Chapter"],
        filledSeats: 44,
        totalSeats: 50
    },
    {
        id: 8,
        name: "33",
        stops: ["Liaquat 10. No.", "Usman Memmoiral", "Dhoraji", "Zubaida Hospital", "M. Ali Society"],
        filledSeats: 45,
        totalSeats: 50
        
    },
    {
        id: 9,
        name: "34",
        stops: ["Korangi Crossing", "Nasir Jump", "Korangi No. 2", "Korangi No. 5", "Landhi No. 4", "Landhi 89"],
        filledSeats: 39,
        totalSeats: 50
    },
    {
        id: 10,
        name: "35",
        stops: ["Teen Talwar", "Race Course", "Cant Station", "Askari – II & III", "NMC", "FTC"],
        filledSeats: 37,
        totalSeats: 50
    },
    {
        id: 11,
        name: "39",
        stops: ["Perfume Chowk Johar", "Hilltop", "Johar More", "Drig Road", "Colony Gate", "Star Gate"],
        filledSeats: 35,
        totalSeats: 50
    },
    {
       id: 11,
        name: "40",
        stops: ["Matka Stop", "Ala Din Park", "Lal Flat", "Askari – IV"],
        filledSeats: 32,
        totalSeats: 50 
    },
];

// Helper function to get current page 
function getCurrentPage() {
    const path = window.location.pathname;
    const page = path.substring(path.lastIndexOf('/') + 1);
    return page || 'search.html';
}

if (getCurrentPage() === 'search.html' || getCurrentPage() === '') {
    const stopsList = document.getElementById("stopsList");
    if (stopsList) {
        stopsList.innerHTML = stops.map(stop => `<li>${stop}</li>`).join('');

        const allLi = document.querySelectorAll("#stopsList li");
        allLi.forEach(element => {
            element.onclick = () => {
                const stopName = element.textContent.trim();
                sessionStorage.setItem('selectedStop', stopName);
                const basePath = window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/') + 1);
                window.location.href = basePath + `stops.html?stop=${encodeURIComponent(stopName)}`;
            };
        });
    }

    // Filter list function
    window.filterList = function() {
        const input = document.getElementById('searchInput');
        const filter = input.value.toLowerCase();
        const li = document.querySelectorAll("#stopsList li");
        const stopsCount = document.getElementById('stopsCount');
        
        let visibleCount = 0;
        
        li.forEach(item => {
            const textValue = item.textContent || item.innerText;
            const isVisible = textValue.toLowerCase().includes(filter);
            item.style.display = isVisible ? '' : 'none';
            if (isVisible) visibleCount++;
        });

        // Update count
        if (stopsCount) {
            stopsCount.textContent = `${visibleCount} stop${visibleCount !== 1 ? 's' : ''} ${filter ? 'found' : 'available'}`;
        }
    };
}

// ========== STOPS PAGE FUNCTIONALITY ==========
if (getCurrentPage() === 'stops.html') {
    const stopNameElement = document.getElementById('stopName');
    const urlParams = new URLSearchParams(window.location.search);
    const stopFromUrl = urlParams.get('stop');
    const stopFromStorage = sessionStorage.getItem('selectedStop');
    const selectedStop = stopFromUrl || stopFromStorage;

    // Display selected stop
    if (selectedStop && stopNameElement) {
        stopNameElement.textContent = selectedStop;
        document.title = selectedStop + ' - Stop Details';
    } else if (stopNameElement) {
        stopNameElement.textContent = 'No stop selected';
        stopNameElement.style.color = '#999';
    }

    // Display buses for this stop
    const busesList = document.getElementById('busesList');
    if (busesList && selectedStop) {
        const filteredBuses = buses.filter(bus => bus.stops.includes(selectedStop));
        
        if (filteredBuses.length > 0) {
            busesList.innerHTML = filteredBuses.map(bus => {

                let itemClass = 'busInfo';
                

                return `
                    <li class="${itemClass}" onclick="viewBusDetails(${bus.id})">
                        <div class="bus-name">Bus ${bus.name}</div>
                        <div class="bus-seats"> 
                            ${bus.filledSeats}/${bus.totalSeats} seats filled 
                        </div>
                    </li>
                `;
            }).join('');

            // Update stats
            const totalBusesEl = document.getElementById('totalBuses');
            
            if (totalBusesEl) {
                totalBusesEl.textContent = filteredBuses.length;
            }
            
        } else {
            busesList.innerHTML = '<li style="text-align: center; color: #999;">No buses available for this stop</li>';
        }
    }

    // Function to view bus details
    window.viewBusDetails = function(busId) {
        sessionStorage.setItem('selectedBusId', busId);
        sessionStorage.setItem('fromStop', selectedStop);
        const basePath = window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/') + 1);
        window.location.href = basePath + `busDetails.html?bus=${busId}`;
    };
}

// ========== BUS DETAILS PAGE FUNCTIONALITY ==========
if (getCurrentPage() === 'busDetails.html') {
    const urlParams = new URLSearchParams(window.location.search);
    const busIdFromUrl = urlParams.get('bus');
    const busIdFromStorage = sessionStorage.getItem('selectedBusId');
    const busId = parseInt(busIdFromUrl || busIdFromStorage);
    const fromStop = sessionStorage.getItem('fromStop');

    const selectedBus = buses.find(bus => bus.id === busId);

    if (selectedBus) {
        // Update bus name
        const busNameEl = document.getElementById('busName');
        if (busNameEl) {
            busNameEl.textContent = `Bus ${selectedBus.name}`;
            document.title = `Bus ${selectedBus.name} - Route Details`;
        }

        // Update stats
        const totalStopsEl = document.getElementById('totalStops');
        const filledSeatsEl = document.getElementById('filledSeats');
        const availableSeatsEl = document.getElementById('availableSeats');

        if (totalStopsEl) totalStopsEl.textContent = selectedBus.stops.length;
        if (filledSeatsEl) filledSeatsEl.textContent = selectedBus.filledSeats;
        if (availableSeatsEl) availableSeatsEl.textContent = selectedBus.totalSeats - selectedBus.filledSeats;
        
        // Create route map
        const routeMapEl = document.getElementById('routeMap');
        if (routeMapEl) {
            const routeHTML = selectedBus.stops.map((stop, index) => {

                return `
                    <div class="route-stop">
                        <div class="stop-details">
                            <span class="stop-number">Stop ${index + 1}</span>
                            <div class="stop-name-text">
                                ${stop}
                            </div>
                        </div>
                    </div>
                `;
            }).join('');

            routeMapEl.innerHTML = routeHTML;
        }
    } else {
        // Bus not found
        const busNameEl = document.getElementById('busName');
        if (busNameEl) {
            busNameEl.textContent = 'Bus not found';
        }
        
        const routeMapEl = document.getElementById('routeMap');
        if (routeMapEl) {
            routeMapEl.innerHTML = '<p style="text-align: center; color: #999;">Bus information not available. Please select a bus from the stops page.</p>';
        }
    }
}
