"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCloud,
  faCloudSun,
  faSun,
  faCloudRain,
} from "@fortawesome/free-solid-svg-icons";
import { useWeatherPokemonContext } from "@/contexts/WeatherPokemonContext";

export const WeatherCard = () => {
  const { weatherData, isLoading } = useWeatherPokemonContext();

  const getWeatherIcon = () => {
    if (!weatherData) return faCloud;
    if (weatherData.isRaining) return faCloudRain;
    if (weatherData.condition.includes("Clear")) return faSun;
    return faCloudSun;
  };

  return (
    <div
      id="weather-card"
      className={`bg-card border-primary rounded-2xl border-l-4 p-6 shadow-xl ${
        !weatherData ? "opacity-50" : ""
      }`}
    >
      <div className="mb-4 flex items-center">
        <div className="bg-primary/20 mr-4 flex h-12 w-12 items-center justify-center rounded-full">
          <FontAwesomeIcon
            icon={getWeatherIcon()}
            className="text-primary text-xl"
            fixedWidth
          />
        </div>
        <h3 className="text-foreground text-xl font-bold">Clima</h3>
      </div>
      <div className="flex flex-col items-center justify-center py-8 text-center">
        {weatherData ? (
          <>
            <div className="bg-muted flex h-32 w-32 items-center justify-center rounded-full">
              <FontAwesomeIcon
                icon={getWeatherIcon()}
                className="text-muted-foreground text-6xl"
                fixedWidth
              />
            </div>
            <h4 className="text-foreground mt-4 text-2xl font-bold">
              {weatherData.city}
            </h4>
            <p className="text-foreground mt-2 text-xl">
              {weatherData.temperature}°C
            </p>
            <p className="text-muted-foreground mt-2 capitalize">
              {weatherData.condition.toLowerCase()}
            </p>
          </>
        ) : (
          <>
            <div className="bg-muted flex h-32 w-32 items-center justify-center rounded-full">
              <FontAwesomeIcon
                icon={faCloud}
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
