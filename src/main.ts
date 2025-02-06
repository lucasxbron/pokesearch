import './styles/index.css'
import {searchPokemon} from './features/apiSearch'
import {setupSearch} from './components/utils'

const searchButton = document.getElementById("searchButton");
const searchInput = document.getElementById("search") as HTMLInputElement;
const app = document.getElementById("app");

if (searchButton && app) {
    searchButton.addEventListener("click", async () => {
      const query = searchInput.value.trim();
    if (!query) {
      app.innerHTML =
      '<div class="text-center text-blue-900">Please enter a Pokémon ID or name.</div>';
      return;
    }
    await searchPokemon(query, searchButton, searchInput, app);
  });
}

setupSearch()