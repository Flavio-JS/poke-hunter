export interface PokeApiTypeResponse {
  pokemon: Array<{
    pokemon: {
      name: string;
      url: string;
    };
    slot: number;
  }>;
}

export interface PokemonByType {
  type: string;
  pokemons: string[];
}

export interface PokeApiPokemonResponse {
  name: string;
  sprites: {
    front_default: string;
  };
}
