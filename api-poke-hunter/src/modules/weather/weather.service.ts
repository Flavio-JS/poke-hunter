import { Injectable, NotFoundException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { WeatherResponseDto } from './dto/weather-response.dto';
import { OpenWeatherResponse } from 'src/common/interfaces/open-weather.interface';
import { AxiosError } from 'axios';
import { WeatherPokemonResponseDto } from './dto/weather-pokemon-response.dto';
import { PokemonService } from '../pokemon/pokemon.service';

@Injectable()
export class WeatherService {
  constructor(
    private readonly httpService: HttpService,
    private readonly pokemonService: PokemonService,
  ) {}

  async getWeather(city: string): Promise<WeatherResponseDto> {
    if (!city) {
      throw new NotFoundException(
        'City is required. Please provide a valid city name.',
      );
    }

    const apiKey = process.env.OPEN_WEATHER_API_KEY;
    const baseUrl = process.env.OPEN_WEATHER_BASE_URL;

    if (!apiKey || !baseUrl) {
      throw new Error('Missing required environment variables');
    }

    try {
      const url = `${baseUrl}/weather?q=${city}&appid=${apiKey}&units=metric`;
      const response = await firstValueFrom(
        this.httpService.get<OpenWeatherResponse>(url),
      );

      if (response.data.cod && response.data.cod !== 200) {
        throw new NotFoundException('Failed to fetch weather data');
      }

      return this.transformWeatherData(response.data);
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 404) {
          throw new NotFoundException('City not found');
        }
        throw new Error('Failed to fetch weather data');
      }
      throw error;
    }
  }

  async getWeatherWithPokemon(
    city: string,
  ): Promise<WeatherPokemonResponseDto> {
    if (!city) {
      throw new NotFoundException('City is required');
    }

    const apiKey = process.env.OPEN_WEATHER_API_KEY;
    const baseUrl = process.env.OPEN_WEATHER_BASE_URL;

    if (!apiKey || !baseUrl) {
      throw new Error('Missing required environment variables');
    }

    try {
      const url = `${baseUrl}/weather?q=${city}&appid=${apiKey}&units=metric`;
      const response = await firstValueFrom(
        this.httpService.get<OpenWeatherResponse>(url),
      );

      if (response.data.cod && response.data.cod !== 200) {
        throw new NotFoundException('Failed to fetch weather data');
      }

      const weatherData = this.transformWeatherData(response.data);
      const pokemonType = this.determinePokemonType(weatherData);
      const randomPokemon =
        await this.pokemonService.getRandomPokemonByType(pokemonType);

      return {
        ...weatherData,
        pokemon: randomPokemon.name,
        pokemonType: pokemonType,
        pokemonImage: randomPokemon.image,
        timestamp: Date.now(),
      };
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 404) {
          throw new NotFoundException('City not found');
        }
        throw new Error('Failed to fetch weather data');
      }
      throw error;
    }
  }

  private determinePokemonType(weatherData: {
    temperature: number;
    isRaining: boolean;
  }):
    | 'ice'
    | 'water'
    | 'grass'
    | 'ground'
    | 'bug'
    | 'rock'
    | 'fire'
    | 'electric'
    | 'normal' {
    if (weatherData.isRaining) {
      return 'electric';
    }

    const temp = weatherData.temperature;

    if (temp < 5) return 'ice';
    if (temp >= 5 && temp < 10) return 'water';
    if (temp >= 12 && temp <= 15) return 'grass';
    if (temp > 15 && temp <= 21) return 'ground';
    if (temp >= 23 && temp <= 27) return 'bug';
    if (temp > 27 && temp <= 33) return 'rock';
    if (temp > 33) return 'fire';

    return 'normal';
  }

  private transformWeatherData(data: OpenWeatherResponse): {
    city: string;
    temperature: number;
    condition: string;
    isRaining: boolean;
  } {
    return {
      city: data.name,
      condition: data.weather[0]?.main || 'Unknown',
      temperature: data.main.temp,
      isRaining: data.weather.some((condition) =>
        condition.main.toLowerCase().includes('rain'),
      ),
    };
  }
}
