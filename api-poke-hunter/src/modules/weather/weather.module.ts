import { Module } from '@nestjs/common';
import { WeatherController } from './weather.controller';
import { WeatherService } from './weather.service';
import { HttpModule } from '@nestjs/axios';
import { PokemonService } from '../pokemon/pokemon.service';

@Module({
  imports: [HttpModule],
  controllers: [WeatherController],
  providers: [WeatherService, PokemonService],
  exports: [WeatherService],
})
export class WeatherModule {}
