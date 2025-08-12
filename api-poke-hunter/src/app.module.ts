import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { WeatherModule } from './modules/weather/weather.module';
import { PokemonModule } from './modules/pokemon/pokemon.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    HttpModule,
    WeatherModule,
    PokemonModule,
  ],
})
export class AppModule {}
