import { faker } from '@faker-js/faker/.';
import { BattleEffectivenessResponseDto } from 'src/modules/pokemon/dto/battle-effectiveness-response.dto';
import { PokemonResponseDto } from 'src/modules/pokemon/dto/pokemon-response.dto';

export const mockPokemonResponseDto: PokemonResponseDto = {
  type: faker.helpers.arrayElement(['fire', 'water', 'grass']),
  pokemons: Array.from({ length: 3 }, () =>
    faker.person.firstName().toLowerCase(),
  ),
};

export const mockBattleEffectivenessResponseDto: BattleEffectivenessResponseDto =
  {
    strongAgainst: Array.from({ length: 2 }, () => ({
      pokemon: faker.person.firstName().toLowerCase(),
      type: faker.helpers.arrayElement(['water', 'rock']),
      image: faker.image.avatar(),
    })),
    weakAgainst: Array.from({ length: 2 }, () => ({
      pokemon: faker.person.firstName().toLowerCase(),
      type: faker.helpers.arrayElement(['electric', 'ground']),
      image: faker.image.avatar(),
    })),
  };
