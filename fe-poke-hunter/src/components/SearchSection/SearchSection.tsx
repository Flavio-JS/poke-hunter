"use client";

import { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faSearch } from "@fortawesome/free-solid-svg-icons";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useSectionHighlight } from "@/hooks/useSectionHighlight";

export const SearchSection = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const isHighlighted = useSectionHighlight("search-section");

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
            />
            <FontAwesomeIcon
              icon={faMapMarkerAlt}
              className="text-muted-foreground absolute top-2.5 right-3 transform text-base"
            />
          </div>
          <Button
            className="bg-primary flex transform items-center justify-center space-x-2 px-8 py-4 text-lg font-bold shadow-lg transition-all duration-200 hover:scale-105 hover:cursor-pointer hover:shadow-xl"
            id="hunt-button"
            variant="default"
            size="lg"
          >
            <FontAwesomeIcon icon={faSearch} className="text-base" />
            <span>Caçar Pokémon</span>
          </Button>
        </div>
      </div>
    </section>
  );
};
