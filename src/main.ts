import "./styles/index.css";
import { searchPokemon } from "./features/apiSearch";
import { setupSearch } from "./components/utils";
import { fetchPokemonTypeAndSetColor } from "./components/containerColor";

const searchButton = document.getElementById("searchButton") as HTMLButtonElement;
const searchInput = document.getElementById("search") as HTMLInputElement;
const app = document.getElementById("app");

if (searchButton && app) {
  searchButton.addEventListener("click", async () => {
    const query = searchInput.value.trim();
    if (!query) {
      app.innerHTML =
        '<div class="mt-6 text-center text-lg text-neutral-800">Please enter any Pokémon.</div>';
      return;
    }
      await searchPokemon(query, searchButton, searchInput, app);
      await fetchPokemonTypeAndSetColor(query);

  });
}

setupSearch();
