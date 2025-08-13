"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestion, faStar } from "@fortawesome/free-solid-svg-icons";
import { useWeatherPokemonContext } from "@/contexts/WeatherPokemonContext";
import Image from "next/image";
import { getPokemonExplanation } from "@/utils/getPokemonExplanation";
import { getTypeIcon, getTypeColor } from "@/utils/pokemonTypeUtils";

export const PokemonCard = () => {
  const { weatherData, isLoading } = useWeatherPokemonContext();

  return (
    <div
      id="pokemon-card"
      className={`bg-card border-destructive rounded-2xl border-l-4 p-6 shadow-xl ${
        !weatherData ? "opacity-50" : ""
      }`}
    >
      <div className="mb-4 flex items-center">
        <div className="bg-destructive/20 mr-4 flex h-12 w-12 items-center justify-center rounded-full">
          <FontAwesomeIcon
            icon={faStar}
            className="text-destructive text-xl"
            fixedWidth
          />
        </div>
        <h3 className="text-foreground text-xl font-bold">Pokémon</h3>
      </div>
      <div className="flex flex-col items-center justify-center py-8 text-center">
        {weatherData ? (
          <>
            <div className="relative mx-auto h-32 w-32">
              {weatherData.pokemonImage ? (
                <Image
                  src={weatherData.pokemonImage}
                  alt={`${weatherData.pokemon} official artwork`}
                  fill
                  className="rounded-full object-cover"
                  unoptimized
                />
              ) : (
                <div className="bg-muted flex h-full w-full items-center justify-center rounded-full">
                  <FontAwesomeIcon
                    icon={faQuestion}
                    className="text-muted-foreground text-6xl"
                    fixedWidth
                  />
                </div>
              )}
            </div>
            <h4 className="text-foreground mt-4 text-2xl font-bold capitalize">
              {weatherData.pokemon.replace("-", " ")}
            </h4>
            <div className="mt-2 flex items-center justify-center space-x-2">
              <FontAwesomeIcon
                icon={getTypeIcon(weatherData.pokemonType)}
                className={`${getTypeColor(weatherData.pokemonType)} text-lg`}
              />
              <span className="text-foreground capitalize">
                {weatherData.pokemonType}
              </span>
            </div>
            <p className="text-muted-foreground mt-4 text-sm">
              Pokémon sugerido porque{" "}
              <strong>
                {weatherData
                  ? getPokemonExplanation(
                      weatherData.temperature,
                      weatherData.isRaining,
                    )
                  : ""}
              </strong>
            </p>
          </>
        ) : (
          <>
            <div className="bg-muted flex h-32 w-32 items-center justify-center rounded-full">
              <FontAwesomeIcon
                icon={faQuestion}
                className="text-muted-foreground text-6xl"
                fixedWidth
              />
            </div>
            <p className="text-muted-foreground mt-4 text-lg">
              {isLoading ? "Carregando..." : "Aguardando busca..."}
            </p>
          </>
        )}
      </div>
    </div>
  );
};
