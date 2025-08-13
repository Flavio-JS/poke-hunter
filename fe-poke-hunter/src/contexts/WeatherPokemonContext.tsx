"use client";

import { createContext, useContext, useState } from "react";
import { WeatherPokemonResponse } from "@/api/types/weatherPokemon";

type BattleEffectiveness = {
  strongAgainst: {
    pokemon: string;
    type: string;
    image: string;
  }[];
  weakAgainst: {
    pokemon: string;
    type: string;
    image: string;
  }[];
};

type WeatherPokemonContextType = {
  weatherData: WeatherPokemonResponse | null;
  setWeatherData: (data: WeatherPokemonResponse | null) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  error: Error | null;
  setError: (error: Error | null) => void;
  searchHistory: WeatherPokemonResponse[];
  addToHistory: (data: WeatherPokemonResponse) => void;
  clearHistory: () => void;
  battleEffectiveness: BattleEffectiveness | null;
  setBattleEffectiveness: (data: BattleEffectiveness | null) => void;
};

const WeatherPokemonContext = createContext<
  WeatherPokemonContextType | undefined
>(undefined);

export const WeatherPokemonProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [weatherData, setWeatherData] = useState<WeatherPokemonResponse | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [searchHistory, setSearchHistory] = useState<WeatherPokemonResponse[]>(
    [],
  );
  const [battleEffectiveness, setBattleEffectiveness] =
    useState<BattleEffectiveness | null>(null);

  const addToHistory = (data: WeatherPokemonResponse) => {
    setSearchHistory((prev) => [data, ...prev].slice(0, 10));
  };

  const clearHistory = () => {
    setSearchHistory([]);
  };

  return (
    <WeatherPokemonContext.Provider
      value={{
        weatherData,
        setWeatherData,
        isLoading,
        setIsLoading,
        error,
        setError,
        searchHistory,
        addToHistory,
        clearHistory,
        battleEffectiveness,
        setBattleEffectiveness,
      }}
    >
      {children}
    </WeatherPokemonContext.Provider>
  );
};

export const useWeatherPokemonContext = () => {
  const context = useContext(WeatherPokemonContext);
  if (context === undefined) {
    throw new Error(
      "useWeatherPokemonContext must be used within a WeatherPokemonProvider",
    );
  }
  return context;
};
