function search() {
    window.location.assign("sub/products.html?search=" + document.getElementById('search_bar').value);
}

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('search_form').addEventListener("submit", function (event) {
        event.preventDefault();
        search();
    })
})