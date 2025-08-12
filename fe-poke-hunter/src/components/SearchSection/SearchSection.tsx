"use client";

import { useRef, useState } from "react";
import { useWeatherPokemonMutation } from "@/api/hooks/useWeatherPokemon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faSearch } from "@fortawesome/free-solid-svg-icons";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useSectionHighlight } from "@/hooks/useSectionHighlight";
import { useWeatherPokemonContext } from "@/contexts/WeatherPokemonContext";

export const SearchSection = () => {
  const [city, setCity] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const isHighlighted = useSectionHighlight("search-section");
  const { setWeatherData, setIsLoading, addToHistory, setError } =
    useWeatherPokemonContext();

  const { mutate, isPending, error } = useWeatherPokemonMutation();

  const handleSearch = () => {
    if (city.trim()) {
      setIsLoading(true);
      setError(null);
      mutate(city.trim(), {
        onSuccess: (data) => {
          setWeatherData(data);
          addToHistory(data);
          setIsLoading(false);
        },
        onError: (error) => {
          setError(error);
          setIsLoading(false);
        },
      });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <section id="search-section" className="-mt-16 mb-8 scroll-mt-[84px] pt-16">
      <div
        className={`bg-card border-primary rounded-2xl border-2 p-8 shadow-xl transition-all duration-500 ${isHighlighted ? "border-primary-foreground ring-primary-foreground/80 ring-4" : ""}`}
      >
        <div className="mb-6 text-center">
          <h2 className="text-foreground mb-2 text-2xl font-bold">
            Encontre seu Pokémon!
          </h2>
          <p className="text-muted-foreground">
            Digite o nome de uma cidade para descobrir qual Pokémon está por lá
          </p>
        </div>

        <div className="mx-auto flex max-w-2xl flex-col items-center justify-center gap-4 md:flex-row">
          <div className="relative flex-1">
            <Input
              ref={inputRef}
              type="text"
              placeholder="Digite o nome da cidade"
              className="w-full rounded-xl px-6 py-4 text-lg shadow-inner"
              id="city-search"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <FontAwesomeIcon
              icon={faMapMarkerAlt}
              className="text-muted-foreground absolute top-2.5 right-3 transform text-base"
            />
          </div>
          <Button
            className="bg-primary flex w-[200px] transform items-center justify-center space-x-2 px-8 py-4 text-lg font-bold shadow-lg transition-all duration-200 hover:scale-105 hover:cursor-pointer hover:shadow-xl"
            id="hunt-button"
            variant="default"
            size="lg"
            onClick={handleSearch}
            disabled={isPending}
          >
            {isPending ? (
              "Carregando..."
            ) : (
              <>
                <FontAwesomeIcon icon={faSearch} className="text-base" />
                <span>Caçar Pokémon</span>
              </>
            )}
          </Button>
        </div>

        {error && (
          <div className="text-destructive mt-4 text-center">
            {error.message}
          </div>
        )}
      </div>
    </section>
  );
};
