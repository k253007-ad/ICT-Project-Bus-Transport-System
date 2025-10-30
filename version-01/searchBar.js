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


li?.forEach(element => {
    element.onclick = ()=>{ 
        window.location.assign("/new.html")
    }

});
