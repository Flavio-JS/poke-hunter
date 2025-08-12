import { IsBoolean, IsNumber, IsString, IsUrl } from 'class-validator';

export class WeatherPokemonResponseDto {
  @IsString()
  city: string;

  @IsNumber()
  temperature: number;

  @IsString()
  condition: string;

  @IsBoolean()
  isRaining: boolean;

  @IsString()
  pokemon: string;

  @IsString()
  pokemonType: string;

  @IsUrl()
  pokemonImage: string;

  @IsNumber()
  timestamp: number;
}
