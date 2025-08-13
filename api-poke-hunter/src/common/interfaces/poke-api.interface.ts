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

export interface PokeApiTypeRelations {
  damage_relations: {
    double_damage_to: Array<{
      name: string;
      url: string;
    }>;
    double_damage_from: Array<{
      name: string;
      url: string;
    }>;
  };
}
