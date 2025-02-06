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
    spinner.classList.remove("hidden");

    // Clear previous result if exists
    const previousResult = document.getElementById("pokemon-card");
    if (previousResult) {
      previousResult.remove();
    }

    // Artificial delay to make spinner visible
    await new Promise((resolve) => setTimeout(resolve, 1500));

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
      <div id="pokemon-card" class="max-w-sm mx-auto drop-shadow-lg rounded-xl overflow-hidden mt-10 transition-transform transform hover:scale-102 text-neutral-900">
      <div class="mt-8 mb-4 p-4 text-center">
      <div class="flex items-center justify-center">
      <div class="border-t-6 border-white w-1/10 rounded-lg"></div>
      <h2 class="text-3xl text-bold font-extrabold uppercase mx-4">${name}</h2>
      <div class="border-t-6 border-white w-1/10 rounded-lg"></div>
      </div>
      <h3 class=" font-semibold mb-5 lowercase">${data.types[0].type.name}</h3>
      <div class="flex justify-center mt-4">
      <img src="${sprites.front_default}" alt="${name}" class="w-32 h-32 bg-8 bg-white rounded-full">
      </div>
      <h3 class="text-xl font-semibold mt-4 mb-2 lowercase underline" style="text-decoration-color: white; text-decoration-thickness: 2px; text-underline-offset: 4px;">Stats</h3>
      <ul class="list-none list-inside inline-block lowercase">${statsList}</ul>
      <h3 class="text-xl font-semibold mt-4 mb-2 lowercase underline" style="text-decoration-color: white; text-decoration-thickness: 2px; text-underline-offset: 4px;">Abilities</h3>
      <ul class="list-none list-inside inline-block lowercase">${abilitiesList}</ul>
      </div>
      </div>
    `;
  } catch (error) {
    app.innerHTML =
      '<div class="mt-6 text-center text-lg text-neutral-800">Error fetching data. Please try again.</div>';
    console.error(error);
    error = true;
  } finally {
    isLoading = false;
    spinner.classList.add("hidden");
    success = !error && !isLoading ? true : false;
    console.log("success:", success);
  }
}
