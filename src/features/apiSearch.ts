export async function searchPokemon() {
  const searchButton = document.getElementById("searchButton");
  const searchInput = document.getElementById("search") as HTMLInputElement;
  const app = document.getElementById("app");

  if (!searchButton || !searchInput || !app) {
    console.error("Elements not found");
    return;
  }

  searchButton.addEventListener("click", async () => {
    const query = searchInput.value.trim();
    if (!query) {
      app.innerHTML =
        '<div class="text-center text-blue-900">Please enter a Pokémon ID or name.</div>';
      return;
    }

    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${query.toLowerCase()}`
      );
      if (!response.ok) {
        throw new Error("Pokémon not found");
      }

      const data = await response.json();
      const { name, sprites, stats, abilities } = data;

      const statsList = stats
        .map((stat: any) => `<li>${stat.stat.name}: ${stat.base_stat}</li>`)
        .join("");
      const abilitiesList = abilities
        .map((ability: any) => `<li>${ability.ability.name}</li>`)
        .join("");

      app.innerHTML = `
              <div class="max-w-sm mx-auto bg-poke-yellow shadow-lg rounded-xl overflow-hidden mt-10">
                <div class="my-4 p-4 text-center">
                  <h2 class="text-3xl text-bold font-extrabold uppercase">${name}</h2>
                  <div class="flex justify-center mt-4">
                      <img src="${sprites.front_default}" alt="${name}" class="w-32 h-32 bg-8 bg-white rounded-full">
                  </div>
                  <h3 class="text-xl font-semibold mt-4 mb-1 uppercase underline">Stats</h3>
                  <ul class="list-none list-inside inline-block uppercase">${statsList}</ul>
                  <h3 class="text-xl font-semibold mt-4 mb-1 uppercase underline">Abilities</h3>
                  <ul class="list-none list-inside inline-block uppercase">${abilitiesList}</ul>
                </div>
              </div>
          `;
    } catch (error) {
      app.innerHTML =
        '<div class="text-center text-blue-900">Error fetching Pokémon data. Please try again.</div>';
      console.error(error);
    }
  });
}
