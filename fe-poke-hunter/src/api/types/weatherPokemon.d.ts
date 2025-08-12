export interface WeatherPokemonResponse {
  city: string;
  temperature: number;
  condition: string;
  isRaining: boolean;
  pokemon: string;
  pokemonType: string;
  pokemonImage: string;
  timestamp: number;
}
