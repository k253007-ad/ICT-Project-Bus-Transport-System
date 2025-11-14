const stops = ["2K Stop", "Chota Gate", "Drigh Road", "Korangi Crossing", "Malir Cant", "Malir Halt", "Model Colony", "Shah Faisal Town", "Sharfabad"];
const buses = [
    { id: 1, name: "1-B", stops: ["Korangi Crossing", "Malir Cant", "Model Colony", "Malir Halt", "Shah Faisal Town"], filledSeats: 35, totalSeats: 50 },
    { id: 2, name: "29", stops: ["2K Stop", "Chota Gate", "Malir Cant", "Shah Faisal Town"], filledSeats: 42, totalSeats: 50 },
    { id: 3, name: "5", stops: ["Drigh Road", "Malir Halt", "Model Colony", "Sharfabad"], filledSeats: 28, totalSeats: 45 },
    { id: 4, name: "Bus-4", stops: ["Chota Gate", "Shah Faisal Town", "Malir Cant"], filledSeats: 45, totalSeats: 50 }
];

// GitHub Pages path compatibility
function getEffectivePathname() {
    const path = window.location.pathname;
    const segments = path.split('/').filter(Boolean);
    
    // On GitHub Pages, first segment is repo name
    if (window.location.hostname.includes('github.io') && segments.length > 0) {
        const pathAfterRepo = segments.slice(1).join('/');
        return pathAfterRepo || '/';
    }
    
    // Local or custom domain
    return path === '/' ? '/' : path.substring(1);
}

const effectivePath = getEffectivePathname();

// Global filter function for HTML onkeyup
window.filterList = function() {
    const input = document.getElementById('searchInput');
    const filter = input.value.toLowerCase();
    const li = document.querySelectorAll("#stopsList li");
    li.forEach(item => {
        const textValue = item.textContent || item.innerText;
        item.style.display = textValue.toLowerCase().includes(filter) ? '' : 'none';
    });
}

// Initialize app
function init() {
    const stopsList = document.getElementById("stopsList");
    
    // Index page logic
    if (effectivePath === 'index.html' || effectivePath === '/') {
        if (stopsList) {
            stopsList.innerHTML = stops.map(stop => `<li>${stop}</li>`).join('');
        }
        
        document.querySelectorAll("#stopsList li").forEach(element => {
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

    // Stops page logic
    if (effectivePath === 'stops.html') {
        const stopNameElement = document.getElementById('stopName');
        const urlParams = new URLSearchParams(window.location.search);
        const selectedStop = urlParams.get('stop') || sessionStorage.getItem('selectedStop');

        if (stopNameElement) {
            if (selectedStop) {
                stopNameElement.textContent = selectedStop;
                document.title = selectedStop + ' - Stop Details';
            } else {
                stopNameElement.textContent = 'No stop selected';
                stopNameElement.style.color = '#999';
            }
        }

        const busesList = document.getElementById('busesList');
        if (busesList) {
            if (selectedStop) {
                const filteredBuses = buses.filter(bus => bus.stops.includes(selectedStop));
                busesList.innerHTML = filteredBuses.length
                    ? filteredBuses.map(bus => `
                        <li>
                            <div class="bus-name">${bus.name}</div>
                            <div class="bus-seats">${bus.filledSeats}/${bus.totalSeats} seats filled</div>
                        </li>
                    `).join('')
                    : `<li>No buses available for this stop</li>`;
            } else {
                busesList.innerHTML = '<li>No stop selected</li>';
            }
        }
    }
}

// Run when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
