import { useMutation } from "@tanstack/react-query";
import { fetchWeatherPokemon } from "../services/weatherPokemon.service";
import { WeatherPokemonResponse } from "../types/weatherPokemon.d";

export const useWeatherPokemonMutation = () => {
  return useMutation<WeatherPokemonResponse, Error, string>({
    mutationFn: (city: string) => fetchWeatherPokemon(city),
  });
};
