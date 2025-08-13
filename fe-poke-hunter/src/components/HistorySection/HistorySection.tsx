"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faHistory, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useSectionHighlight } from "@/hooks/useSectionHighlight";
import { useWeatherPokemonContext } from "@/contexts/WeatherPokemonContext";
import Image from "next/image";
import {
  getTypeIcon,
  getTypeColor,
  getTypeGradient,
} from "@/utils/pokemonTypeUtils";
import { WeatherPokemonResponse } from "@/api/types/weatherPokemon";
import { smoothScrollTo } from "@/utils/smooth-scroll";
import { useBattleEffectivenessMutation } from "@/api/hooks/useBattleEffectiveness";

export const HistorySection = () => {
  const isHighlighted = useSectionHighlight("history-section");
  const {
    searchHistory,
    clearHistory,
    setWeatherData,
    setBattleEffectiveness,
    setIsLoading,
    setError,
  } = useWeatherPokemonContext();
  const { mutate: fetchEffectiveness } = useBattleEffectivenessMutation();

  const handleHistoryItemClick = (item: WeatherPokemonResponse) => {
    setWeatherData(item);
    setIsLoading(true);
    setError(null);

    fetchEffectiveness(item.pokemonType, {
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

    smoothScrollTo("results-section");
  };

  return (
    <section id="history-section" className="scroll-mt-[84px]">
      <div
        className={`bg-card rounded-2xl p-6 shadow-xl transition-all duration-500 ${
          isHighlighted
            ? "border-primary-foreground ring-primary-foreground/80 ring-4"
            : ""
        }`}
      >
        <div className="mb-6 flex items-center">
          <div className="bg-primary/20 mr-4 flex h-12 w-12 items-center justify-center rounded-full">
            <FontAwesomeIcon
              icon={faHistory}
              className="text-primary text-xl"
            />
          </div>
          <h3 className="text-foreground text-xl font-bold">
            Histórico de Buscas
          </h3>
          {searchHistory.length > 0 && (
            <span className="ml-3 rounded-full bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-800">
              {searchHistory.length}{" "}
              {searchHistory.length === 1 ? "busca" : "buscas"}
            </span>
          )}
        </div>

        {searchHistory.length > 0 ? (
          <>
            <div className="space-y-3">
              {searchHistory.map((item, index) => (
                <div
                  key={index}
                  className={`transform rounded-lg border bg-gradient-to-r p-4 transition-all duration-200 hover:cursor-pointer hover:shadow-md ${getTypeGradient(item.pokemonType)}`}
                  onClick={() => handleHistoryItemClick(item)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="relative h-10 w-10">
                        <Image
                          src={item.pokemonImage}
                          alt={`${item.pokemon} official artwork`}
                          fill
                          className="rounded-full object-cover"
                          unoptimized
                        />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800">{item.city}</h4>
                        <p className="text-sm text-gray-600">
                          {item.temperature}°C • {item.pokemon}
                        </p>
                        <div className="bg-card mt-1 flex w-fit items-center space-x-1 rounded-xl px-2 py-0.5">
                          <FontAwesomeIcon
                            icon={getTypeIcon(item.pokemonType)}
                            className={`${getTypeColor(item.pokemonType)} text-xs`}
                          />
                          <span className="text-card-foreground text-xs capitalize">
                            {item.pokemonType}
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500">
                      {new Date(item.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 text-center">
              <button
                onClick={clearHistory}
                className="text-primary hover:text-primary-dark mx-auto flex items-center space-x-2 text-sm font-semibold transition-colors hover:cursor-pointer"
              >
                <FontAwesomeIcon icon={faTrash} />
                <span>Limpar histórico</span>
              </button>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <FontAwesomeIcon
              icon={faClock}
              className="text-muted-foreground mb-4 text-6xl"
            />
            <p className="text-lg">Nenhuma busca realizada ainda</p>
            <p className="text-muted-foreground mt-2 text-sm">
              Suas buscas anteriores aparecerão aqui
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
