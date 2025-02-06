let error = false;
let isLoading = false;
let success = undefined;

export async function searchPokemon(
  query: string,
  searchButton: HTMLElement,
  searchInput: HTMLInputElement,
  app: HTMLElement
) {
  const spinner = document.getElementById("spinner");

  if (!searchButton || !searchInput || !app || !spinner) {
    console.error("Elements not found");
    return;
  }

  try {
    isLoading = true;
    spinner.classList.remove("hidden"); // Show spinner

    // Clear previous result if exists
    const previousResult = document.getElementById("pokemon-card");
    if (previousResult) {
      previousResult.remove();
    }

    // Artificial delay to make spinner visible
    await new Promise(resolve => setTimeout(resolve, 2000));

    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${query?.toLowerCase()}`
    );
    if (!response.ok) {
      throw new Error("Pokémon not found");
    }
    const data = await response.json();
    console.log("data:", data);
    const { name, sprites, stats, abilities } = data;

    console.log("stats:", stats);
    const statsList = stats
      .map((stat: any) => `<li>${stat.stat.name}: ${stat.base_stat}</li>`)
      .join("");
    const abilitiesList = abilities
      .map((ability: any) => `<li>${ability.ability.name}</li>`)
      .join("");

    app.innerHTML = `
      <div id="pokemon-card" class="max-w-sm mx-auto drop-shadow-lg rounded-xl overflow-hidden mt-10 transition-transform transform hover:scale-102">
        <div class="my-4 p-4 text-center">
          <h2 class="text-3xl text-bold font-extrabold uppercase">${name}</h2>
          <h3 class=" font-semibold mt-1 mb-4 uppercase">${data.types[0].type.name}</h3>
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
      '<div class="text-center text-blue-900">Error fetching data. Please try again.</div>';
    console.error(error);
    error = true;
  } finally {
    isLoading = false;
    spinner.classList.add("hidden"); // Hide spinner
    success = !error && !isLoading ? true : false;
    console.log("success:", success);
  }
}