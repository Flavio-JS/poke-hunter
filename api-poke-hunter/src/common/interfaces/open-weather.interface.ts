export interface OpenWeatherResponse {
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  main: {
    temp: number;
    pressure: number;
    humidity: number;
    temp_min: number;
    temp_max: number;
  };
  name: string;
  cod: number;
}

export interface WeatherSummary {
  city: string;
  condition: string;
  temperature: number;
  isRaining: boolean;
}
