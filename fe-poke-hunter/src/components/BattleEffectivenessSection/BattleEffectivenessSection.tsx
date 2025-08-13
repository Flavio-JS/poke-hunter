"use client";

import { useWeatherPokemonContext } from "@/contexts/WeatherPokemonContext";
import { getTypeColor, getTypeIcon } from "@/utils/pokemonTypeUtils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShieldAlt, faHandFist } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

export const BattleEffectivenessSection = () => {
  const { weatherData, battleEffectiveness } = useWeatherPokemonContext();

  if (!weatherData || !battleEffectiveness) {
    return (
      <section id="battle-effectiveness-section" className="mb-8">
        <div className="bg-card rounded-2xl p-6 shadow-xl">
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="text-muted-foreground mb-4 text-5xl">⚡</div>
            <h3 className="text-card-foreground mb-2 text-xl font-bold">
              Dados de Batalha Não Disponíveis
            </h3>
            <p className="text-muted-foreground max-w-md text-sm">
              {!weatherData
                ? "Selecione um tipo de Pokémon para ver sua efetividade em batalha."
                : "Carregando informações de efetividade em batalha..."}
            </p>
          </div>
        </div>
      </section>
    );
  }

  const typeIcon = getTypeIcon(weatherData.pokemonType);

  return (
    <section id="battle-effectiveness-section" className="mb-8">
      <div className="bg-card rounded-2xl p-6 shadow-xl">
        <div className="mb-6 flex items-center">
          <div
            className={`${getTypeColor(weatherData.pokemonType)} from-primary to-primary-foreground mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r`}
          >
            <FontAwesomeIcon icon={typeIcon} className="text-xl text-white" />
          </div>
          <h3 className="text-card-foreground text-xl font-bold">
            Efetividade em Batalha
          </h3>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div
            id="strong-against-card"
            className="border-chart-2 bg-chart-2/10 rounded-xl border-2 p-6"
          >
            <div className="mb-4 flex items-center">
              <FontAwesomeIcon
                icon={faHandFist}
                className="text-chart-2 mr-3 text-xl"
              />
              <h4 className="text-chart-2 text-lg font-bold">Forte Contra</h4>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {battleEffectiveness.strongAgainst.map((pokemon, index) => (
                <div className="text-center" key={index}>
                  <div className="bg-card mx-auto mb-2 flex h-16 w-16 items-center justify-center rounded-full shadow-md">
                    <Image
                      src={pokemon.image}
                      width={64}
                      height={64}
                      className="h-full w-full rounded-full object-cover"
                      alt={`${pokemon.pokemon} official artwork`}
                      unoptimized
                    />
                  </div>
                  <p className="text-muted-foreground text-xs font-semibold">
                    {pokemon.pokemon}
                  </p>
                  <span
                    className={`text-foreground rounded-full px-2 py-1 text-xs font-bold ${getTypeColor(pokemon.type)}`}
                  >
                    {pokemon.type.toUpperCase()}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div
            id="weak-against-card"
            className="border-destructive bg-destructive/10 rounded-xl border-2 p-6"
          >
            <div className="mb-4 flex items-center">
              <FontAwesomeIcon
                icon={faShieldAlt}
                className="text-destructive mr-3 text-xl"
              />
              <h4 className="text-destructive text-lg font-bold">
                Fraco Contra
              </h4>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {battleEffectiveness.weakAgainst.map((pokemon, index) => (
                <div className="text-center" key={index}>
                  <div className="bg-card mx-auto mb-2 flex h-16 w-16 items-center justify-center rounded-full shadow-md">
                    <Image
                      src={pokemon.image}
                      width={64}
                      height={64}
                      className="h-full w-full rounded-full object-cover"
                      alt={`${pokemon.pokemon} official artwork`}
                      unoptimized
                    />
                  </div>
                  <p className="text-muted-foreground text-xs font-semibold">
                    {pokemon.pokemon}
                  </p>
                  <span
                    className={`text-foreground rounded-full px-2 py-1 text-xs font-bold ${getTypeColor(pokemon.type)}`}
                  >
                    {pokemon.type.toUpperCase()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
