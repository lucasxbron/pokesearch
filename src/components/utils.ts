export function setupSearch() {
    const searchElement = document.getElementById('search');
    const searchButtonElement = document.getElementById('searchButton');

    if (searchElement && searchButtonElement) {
        searchElement.addEventListener('keydown', function(event) {
            if (event.key === 'Enter') {
                searchButtonElement.click();
            }
        });
    }
}