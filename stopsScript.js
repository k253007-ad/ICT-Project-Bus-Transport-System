const urlParams = new URLSearchParams(window.location.search);
const stopFromUrl = urlParams.get('stop');

const stopFromStorage = sessionStorage.getItem('selectedStop');

const selectedStop = stopFromUrl || stopFromStorage;

const stopNameElement = document.getElementById('stopName');

if (selectedStop) {
    stopNameElement.textContent = selectedStop;
    document.title = selectedStop + ' - Stop Details';
    console.log('Selected stop:', selectedStop);
} else {
    stopNameElement.textContent = 'No stop selected';
    stopNameElement.style.color = '#999';
}