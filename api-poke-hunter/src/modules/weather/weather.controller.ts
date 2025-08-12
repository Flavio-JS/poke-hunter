import { Controller, Get, Query } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { WeatherRequestDto } from './dto/weather-request.dto';
import { WeatherResponseDto } from './dto/weather-response.dto';

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get()
  async getWeather(
    @Query() query: WeatherRequestDto,
  ): Promise<WeatherResponseDto> {
    return this.weatherService.getWeather(query.city);
  }
}
