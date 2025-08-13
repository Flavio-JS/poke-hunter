import { faker } from '@faker-js/faker';
import { OpenWeatherResponse } from 'src/common/interfaces/open-weather.interface';

export const mockOpenWeatherResponse: OpenWeatherResponse = {
  weather: [
    {
      id: faker.number.int(),
      main: faker.helpers.arrayElement(['Rain', 'Clear', 'Clouds']),
      description: faker.lorem.words(3),
      icon: `0${faker.number.int({ min: 1, max: 9 })}d`,
    },
  ],
  main: {
    temp: faker.number.float({ min: -10, max: 40, fractionDigits: 1 }),
    pressure: faker.number.int({ min: 900, max: 1100 }),
    humidity: faker.number.int({ min: 30, max: 100 }),
    temp_min: faker.number.float({ min: -15, max: 35, fractionDigits: 1 }),
    temp_max: faker.number.float({ min: -5, max: 45, fractionDigits: 1 }),
  },
  name: faker.location.city(),
  cod: 200,
};