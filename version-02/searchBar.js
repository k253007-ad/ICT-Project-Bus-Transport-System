const li = document.querySelectorAll("li");
function filterList() {
    const input = document.getElementById('searchInput');
    const filter = input.value.toLowerCase();
    const ul = document.getElementById('stopsList');

    for (let i = 0; i < li.length; i++) {
        const textValue = li[i].textContent || li[i].innerText;
        if (textValue.toLowerCase().indexOf(filter) > -1) {
            li[i].style.display = '';
        } else {
            li[i].style.display = 'none';
        }
    }
}

// let stops = ["Shah Faisal Town", "Model Colony", "Malir Cant", "Malir Halt", "Chota Gate", "Digh Road"];

// let stopsList = document.getElementById("stopsList");
// stopsList.innerHTML = stops.map(stop => `<li>${stop}</li>`).join('');

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