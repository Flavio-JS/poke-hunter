import { IsNotEmpty, IsString } from 'class-validator';

export class WeatherRequestDto {
  @IsNotEmpty()
  @IsString()
  city: string;
}
