// Bus stops data
let stops = [
    "2K Stop", 
    "Chota Gate", 
    "Drigh Road", 
    "Korangi Crossing", 
    "Malir Cant", 
    "Malir Halt", 
    "Model Colony", 
    "Shah Faisal Town", 
    "Sharfabad"
];

// Buses data with enhanced information
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

// Helper function to get current page (works with GitHub Pages)
function getCurrentPage() {
    const path = window.location.pathname;
    const page = path.substring(path.lastIndexOf('/') + 1);
    return page || 'index.html';
}

// ========== INDEX PAGE FUNCTIONALITY ==========
if (getCurrentPage() === 'index.html' || getCurrentPage() === '') {
    // Populate stops list
    const stopsList = document.getElementById("stopsList");
    if (stopsList) {
        stopsList.innerHTML = stops.map(stop => `<li>${stop}</li>`).join('');

        // Add click handlers to all stop items
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
                const capacityPercent = Math.round((bus.filledSeats / bus.totalSeats) * 100);
                let capacityClass = 'low';
                let badgeClass = 'badge-low';
                let badgeText = 'Available';
                let itemClass = 'low-capacity';
                
                if (capacityPercent >= 90) {
                    capacityClass = 'high';
                    badgeClass = 'badge-high';
                    badgeText = 'Almost Full';
                    itemClass = 'high-capacity';
                } else if (capacityPercent >= 70) {
                    capacityClass = 'medium';
                    badgeClass = 'badge-medium';
                    badgeText = 'Filling Up';
                    itemClass = 'medium-capacity';
                }

                return `
                    <li class="${itemClass}" onclick="viewBusDetails(${bus.id})">
                        <div class="bus-item">
                            <div>
                                <div class="bus-name">Bus ${bus.name}</div>
                                <div class="bus-seats">${bus.filledSeats}/${bus.totalSeats} seats filled 
                                    <span class="capacity-badge ${badgeClass}">${badgeText}</span>
                                </div>
                                <div class="capacity-info">
                                    <div class="capacity-bar">
                                        <div class="capacity-fill capacity-${capacityClass}" style="width: ${capacityPercent}%"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                `;
            }).join('');

            // Update stats
            const totalBusesEl = document.getElementById('totalBuses');
            const avgCapacityEl = document.getElementById('avgCapacity');
            
            if (totalBusesEl) {
                totalBusesEl.textContent = filteredBuses.length;
            }
            
            if (avgCapacityEl) {
                const avgCapacity = Math.round(
                    filteredBuses.reduce((sum, bus) => sum + (bus.filledSeats / bus.totalSeats * 100), 0) / filteredBuses.length
                );
                avgCapacityEl.textContent = avgCapacity + '%';
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
        const capacityPercentEl = document.getElementById('capacityPercent');

        if (totalStopsEl) totalStopsEl.textContent = selectedBus.stops.length;
        if (filledSeatsEl) filledSeatsEl.textContent = selectedBus.filledSeats;
        if (availableSeatsEl) availableSeatsEl.textContent = selectedBus.totalSeats - selectedBus.filledSeats;
        
        const capacityPercent = Math.round((selectedBus.filledSeats / selectedBus.totalSeats) * 100);
        if (capacityPercentEl) capacityPercentEl.textContent = capacityPercent + '%';

        // Update capacity bar
        const capacityFillEl = document.getElementById('capacityFill');
        const capacityTextEl = document.getElementById('capacityText');
        
        if (capacityFillEl && capacityTextEl) {
            setTimeout(() => {
                capacityFillEl.style.width = capacityPercent + '%';
                capacityTextEl.textContent = capacityPercent + '%';
                
                // Change color based on capacity
                if (capacityPercent >= 90) {
                    capacityFillEl.classList.add('high');
                } else if (capacityPercent >= 70) {
                    capacityFillEl.classList.add('medium');
                }
            }, 300);
        }

        // Create route map
        const routeMapEl = document.getElementById('routeMap');
        if (routeMapEl) {
            const routeHTML = selectedBus.stops.map((stop, index) => {
                const isFirstStop = index === 0;
                const isLastStop = index === selectedBus.stops.length - 1;
                const isCurrentStop = stop === fromStop;
                
                let dotClass = 'stop-dot';
                if (isFirstStop) dotClass += ' first-stop';
                if (isLastStop) dotClass += ' last-stop';
                if (isCurrentStop) dotClass += ' current-stop';

                const estimatedTime = index * 5; // 5 minutes between stops
                
                return `
                    <div class="route-stop">
                        <div class="stop-marker">
                            <div class="${dotClass}"></div>
                            ${!isLastStop ? '<div class="stop-line"></div>' : ''}
                        </div>
                        <div class="stop-details">
                            <span class="stop-number">Stop ${index + 1}</span>
                            <div class="stop-name-text">
                                ${stop}
                                ${isCurrentStop ? ' ⭐' : ''}
                            </div>
                            <div class="stop-time">
                                ${estimatedTime} min
                                ${isFirstStop ? ' (Start)' : ''}
                                ${isLastStop ? ' (End)' : ''}
                                ${isCurrentStop ? ' (Your Stop)' : ''}
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
