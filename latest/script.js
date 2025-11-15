// Wait for DOM to load before running any code
document.addEventListener('DOMContentLoaded', function() {
  
  let stops = ["2K Stop", "Chota Gate", "Drigh Road", "Korangi Crossing", "Malir Cant", "Malir Halt", "Model Colony", "Shah Faisal Town", "Sharfabad"];

  // Stop list page logic
  const stopsList = document.getElementById("stopsList");
  if (stopsList) {
    stopsList.innerHTML = stops.map(stop => `<li>${stop}</li>`).join('');
    
    // Add click handlers AFTER creating the list items
    const allLi = stopsList.querySelectorAll("li");
    allLi.forEach(element => {
      element.style.margin = '0';
      element.style.padding = '10px';
      element.style.cursor = 'pointer';

      element.onclick = () => {
        const stopName = element.textContent;
        // Use URL only - sessionStorage causes issues on some hosts
        window.location.assign(`stops.html?stop=${encodeURIComponent(stopName)}`);
      };
    });

    // Search function (only on index page)
    window.filterList = function() {
      const input = document.getElementById('searchInput');
      if (!input) return;
      
      const filter = input.value.toLowerCase();
      const li = document.querySelectorAll("#stopsList li");

      li.forEach(item => {
        const textValue = item.textContent || item.innerText;
        item.style.display = textValue.toLowerCase().includes(filter) ? '' : 'none';
      });
    };
  }

  // Bus data
  const buses = [
    { id: 1, name: "1-B", stops: ["Korangi Crossing", "Malir Cant", "Model Colony", "Malir Halt", "Shah Faisal Town"], filledSeats: 35, totalSeats: 50 },
    { id: 2, name: "29", stops: ["2K Stop", "Chota Gate", "Malir Cant", "Shah Faisal Town"], filledSeats: 42, totalSeats: 50 },
    { id: 3, name: "5", stops: ["Drigh Road", "Malir Halt", "Model Colony", "Sharfabad"], filledSeats: 28, totalSeats: 45 },
    { id: 4, name: "Bus-4", stops: ["Chota Gate", "Shah Faisal Town", "Malir Cant"], filledSeats: 45, totalSeats: 50 }
  ];

  // Stop details page logic
  const stopNameElement = document.getElementById('stopName');
  if (stopNameElement) {
    const urlParams = new URLSearchParams(window.location.search);
    const selectedStop = urlParams.get('stop');

    if (selectedStop) {
      stopNameElement.textContent = decodeURIComponent(selectedStop);
      document.title = selectedStop + ' - Stop Details';
      
      // Display buses
      const busesList = document.getElementById('busesList');
      if (busesList) {
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
    } else {
      stopNameElement.textContent = 'No stop selected';
      stopNameElement.style.color = '#999';
    }
  }
});
