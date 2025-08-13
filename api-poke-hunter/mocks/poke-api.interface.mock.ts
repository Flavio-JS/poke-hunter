import { faker } from '@faker-js/faker';
import { PokeApiPokemonResponse, PokeApiTypeRelations, PokeApiTypeResponse } from 'src/common/interfaces/poke-api.interface';

export const mockPokeApiTypeResponse: PokeApiTypeResponse = {
  pokemon: Array.from({ length: 5 }, () => ({
    pokemon: {
      name: faker.person.firstName().toLowerCase(),
      url: faker.internet.url(),
    },
    slot: faker.number.int({ min: 1, max: 2 }),
  })),
};

export const mockPokeApiPokemonResponse: PokeApiPokemonResponse = {
  name: faker.person.firstName().toLowerCase(),
  sprites: {
    front_default: faker.image.avatar(),
  },
};

export const mockPokeApiTypeRelations: PokeApiTypeRelations = {
  damage_relations: {
    double_damage_to: Array.from({ length: 3 }, () => ({
      name: faker.helpers.arrayElement(['water', 'fire', 'grass']),
      url: faker.internet.url(),
    })),
    double_damage_from: Array.from({ length: 2 }, () => ({
      name: faker.helpers.arrayElement(['electric', 'ground']),
      url: faker.internet.url(),
    })),
  },
};
