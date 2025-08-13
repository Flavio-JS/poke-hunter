import { useState } from "react";
import { useWeatherPokemonMutation } from "@/api/hooks/useWeatherPokemon";
import { useBattleEffectivenessMutation } from "@/api/hooks/useBattleEffectiveness";
import { useWeatherPokemonContext } from "@/contexts/WeatherPokemonContext";

export const useSearchSection = () => {
  const [city, setCity] = useState("");
  const {
    setWeatherData,
    setIsLoading,
    addToHistory,
    setError,
    setBattleEffectiveness,
  } = useWeatherPokemonContext();

  const {
    mutate: fetchPokemon,
    isPending: isPokemonLoading,
    error: pokemonError,
  } = useWeatherPokemonMutation();
  const { mutate: fetchEffectiveness } = useBattleEffectivenessMutation();

  const handleSearch = async () => {
    if (!city.trim()) return;

    try {
      setIsLoading(true);
      setError(null);
      setWeatherData(null);
      setBattleEffectiveness(null);

      fetchPokemon(city.trim(), {
        onSuccess: async (pokemonData) => {
          setWeatherData(pokemonData);
          addToHistory(pokemonData);

          fetchEffectiveness(pokemonData.pokemonType, {
            onSuccess: (effectivenessData) => {
              setBattleEffectiveness(effectivenessData);
            },
            onError: (effectivenessError) => {
              console.error("Battle effectiveness error:", effectivenessError);
            },
            onSettled: () => {
              setIsLoading(false);
            },
          });
        },
        onError: (pokemonError) => {
          setError(pokemonError);
          setIsLoading(false);
        },
      });
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("Ocorreu um erro inesperado"),
      );
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return {
    city,
    setCity,
    isPokemonLoading,
    pokemonError,
    handleSearch,
    handleKeyDown,
  };
};
