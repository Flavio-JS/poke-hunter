import api from "@/lib/api";
import { WeatherPokemonResponse } from "../types/weatherPokemon.d";

export const fetchWeatherPokemon = async (city: string) => {
  const response = await api.get<WeatherPokemonResponse>(
    `/weather/pokemon?city=${encodeURIComponent(city)}`,
  );
  return response.data;
};
