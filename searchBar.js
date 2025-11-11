let stops = ["2K Stop", "Chota Gate", "Digh Road", "Malir Cant", "Malir Halt", "Model Colony", "Shah Faisal Town","Sharfabad", "Geooo"];

let stopsList = document.getElementById("stopsList");
stopsList.innerHTML = stops.map(stop => `<li>${stop}</li>`).join('');

function filterList() {
    const input = document.getElementById('searchInput');
    const filter = input.value.toLowerCase();
    
    const li = document.querySelectorAll("li");

    li.forEach (item =>{
        const textValue = item.textContent || item.innerText;
        if (textValue.toLowerCase().indexOf(filter) > -1) {
            item.style.display = '';
        } else {
            item.style.display = 'none';
        }
    });
}

const allLi = document.querySelectorAll("#stopsList li");
allLi.forEach(element => {
    element.style.margin = '0';
    element.style.padding = '10px';
    element.style.cursor = 'pointer';
    
    element.onclick = () => { 
        const stopName = element.textContent;
        
        navigator.clipboard.writeText(stopName).then(() => {
            console.log('Copied:', stopName);
        });
        
        sessionStorage.setItem('selectedStop', stopName);
        
        window.location.assign(`/stops.html?stop=${encodeURIComponent(stopName)}`);
    }
});






// let stops = ["Shah Faisal Town", "Model Colony", "Malir Cant", "Malir Halt", "Chota Gate"];

// let stopsList = document.getElementById("stopsList");
// stopsList.innerHTML = stops.map(stop => `<li>${stop}<li>`).join('');


// li?.forEach(element => {
//     element.onclick = ()=>{ 
//         window.location.assign("/new.html")
        
//     }
// });