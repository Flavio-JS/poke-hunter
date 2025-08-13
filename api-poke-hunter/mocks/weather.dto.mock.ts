import { faker } from '@faker-js/faker/.';
import { WeatherPokemonResponseDto } from 'src/modules/weather/dto/weather-pokemon-response.dto';
import { WeatherResponseDto } from 'src/modules/weather/dto/weather-response.dto';

export const mockWeatherResponseDto: WeatherResponseDto = {
  city: faker.location.city(),
  condition: faker.helpers.arrayElement(['Rain', 'Clear', 'Clouds']),
  temperature: faker.number.float({ min: -10, max: 40, fractionDigits: 1 }),
  isRaining: faker.datatype.boolean(),
};

export const mockWeatherPokemonResponseDto: WeatherPokemonResponseDto = {
  ...mockWeatherResponseDto,
  pokemon: faker.person.firstName().toLowerCase(),
  pokemonType: faker.helpers.arrayElement(['electric', 'fire', 'water']),
  pokemonImage: faker.image.avatar(),
  timestamp: Date.now(),
};
