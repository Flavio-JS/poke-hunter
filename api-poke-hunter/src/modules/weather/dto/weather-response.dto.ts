import { IsBoolean, IsNumber, IsString } from 'class-validator';
import { WeatherSummary } from 'src/common/interfaces/open-weather.interface';

export class WeatherResponseDto implements WeatherSummary {
  @IsString()
  city: string;

  @IsString()
  condition: string;

  @IsNumber()
  temperature: number;

  @IsBoolean()
  isRaining: boolean;
}
