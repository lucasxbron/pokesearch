const typeColors: { [key: string]: string } = {
  normal: "bg-gray-400",
  fire: "bg-red-500",
  water: "bg-blue-500",
  grass: "bg-green-500",
  electric: "bg-poke-yellow",
  ice: "bg-blue-200",
  fighting: "bg-red-700",
  poison: "bg-purple-500",
  ground: "bg-yellow-700",
  flying: "bg-blue-300",
  psychic: "bg-pink-500",
  bug: "bg-green-500",
  rock: "bg-gray-700",
  ghost: "bg-purple-700",
  dragon: "bg-indigo-700",
  dark: "bg-gray-800",
  steel: "bg-gray-500",
  fairy: "bg-pink-300",
  stellar: "bg-teal-500",
  unknown: "bg-gray-300",
};

// async function fetchPokemonTypes() {
//     try {
//         const response = await fetch('https://pokeapi.co/api/v2/type');
//         const data = await response.json();
//         const types = data.results.map((type: { name: string }) => type.name);
//         console.log(types);
//     } catch (error) {
//         console.error('Error fetching Pokemon types:', error);
//     }
// }

async function fetchPokemonTypeAndSetColor(pokemonName: string) {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
    );
    const data = await response.json();
    if (data.types && data.types.length > 0) {
      const type = data.types[0].type.name;
      console.log("type:", type);
      const colorClass = typeColors[type] || "bg-gray-400";
      const container = document.getElementById("pokemon-card");
      if (container) {
        container.classList.add(colorClass);
      }
    } else {
      console.error("No types found for this Pokémon");
    }
  } catch (error) {
    console.error("Error fetching Pokemon type:", error);
  }
}

// export { fetchPokemonTypes };
export { fetchPokemonTypeAndSetColor };
