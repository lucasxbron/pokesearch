import "./styles/index.css";
import { searchPokemon } from "./features/apiSearch";
import { setupSearch } from "./components/utils";
import { fetchPokemonTypeAndSetColor } from "./components/containerColor";
// import { fetchPokemonTypes } from './components/containerColor';

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
    // await searchPokemon(query, searchButton, searchInput, app);
    // setTimeout(async () => {
    //     await searchPokemon(query, searchButton, searchInput, app);
    //   }, 2000);
    await searchPokemon(query, searchButton, searchInput, app);
    await fetchPokemonTypeAndSetColor(query);
  });
}

// fetchPokemonTypes()
setupSearch();
// fetchPokemonTypeAndSetColor(query)
