import { Injectable, NotFoundException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { WeatherResponseDto } from './dto/weather-response.dto';
import { OpenWeatherResponse } from 'src/common/interfaces/open-weather.interface';
import { AxiosError } from 'axios';

@Injectable()
export class WeatherService {
  constructor(private readonly httpService: HttpService) {}

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

  private transformWeatherData(data: OpenWeatherResponse): WeatherResponseDto {
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
