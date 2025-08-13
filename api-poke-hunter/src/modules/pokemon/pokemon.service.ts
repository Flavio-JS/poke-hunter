import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import {
  PokeApiPokemonResponse,
  PokeApiTypeRelations,
  PokeApiTypeResponse,
} from '../../common/interfaces/poke-api.interface';
import { PokemonResponseDto } from './dto/pokemon-response.dto';
import { BattleEffectivenessResponseDto } from './dto/battle-effectiveness-response.dto';

@Injectable()
export class PokemonService {
  constructor(private readonly httpService: HttpService) {}

  async getPokemonByType(type: string): Promise<PokemonResponseDto> {
    if (!type) {
      throw new BadRequestException(
        'Type is required. Please provide a valid Pokémon type.',
      );
    }

    const baseUrl = process.env.POKE_API_BASE_URL;

    if (!baseUrl) {
      throw new Error('POKE_API_BASE_URL environment variable is not set');
    }

    try {
      const url = `${baseUrl}/type/${type.toLowerCase()}`;
      const response = await firstValueFrom(
        this.httpService.get<PokeApiTypeResponse>(url),
      );

      if (!response.data || !response.data.pokemon) {
        throw new NotFoundException(`No data found for type '${type}'`);
      }

      return this.transformPokemonData(type, response.data);
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 404) {
          throw new NotFoundException(`Pokémon type '${type}' not found`);
        }
        if (error.response?.status === 400) {
          throw new BadRequestException('Invalid Pokémon type');
        }
        throw new Error('Failed to fetch Pokémon data from external API');
      }
      throw error;
    }
  }

  async getRandomPokemonByType(type: string): Promise<{
    name: string;
    image: string;
  }> {
    if (!type) {
      throw new NotFoundException('Type is required');
    }

    const baseUrl = process.env.POKE_API_BASE_URL;

    try {
      const typeUrl = `${baseUrl}/type/${type.toLowerCase()}`;
      const typeResponse = await firstValueFrom(
        this.httpService.get<PokeApiTypeResponse>(typeUrl),
      );

      if (!typeResponse.data?.pokemon?.length) {
        throw new NotFoundException(`No pokémons found for type ${type}`);
      }

      const randomIndex = Math.floor(
        Math.random() * typeResponse.data.pokemon.length,
      );
      const pokemonUrl = typeResponse.data.pokemon[randomIndex].pokemon.url;

      const pokemonResponse = await firstValueFrom(
        this.httpService.get<PokeApiPokemonResponse>(pokemonUrl),
      );

      return {
        name: pokemonResponse.data.name,
        image: pokemonResponse.data.sprites.front_default,
      };
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 404) {
          throw new NotFoundException(`Pokémon type '${type}' not found`);
        }
        throw new Error('Failed to fetch Pokémon data');
      }
      throw error;
    }
  }

  async getBattleEffectiveness(
    type: string,
  ): Promise<BattleEffectivenessResponseDto> {
    if (!type) {
      throw new BadRequestException(
        'Type is required. Please provide a valid Pokémon type.',
      );
    }

    const baseUrl = process.env.POKE_API_BASE_URL;

    if (!baseUrl) {
      throw new Error('POKE_API_BASE_URL environment variable is not set');
    }

    try {
      const url = `${baseUrl}/type/${type.toLowerCase()}`;
      const response = await firstValueFrom(
        this.httpService.get<PokeApiTypeRelations>(url),
      );

      if (!response.data) {
        throw new NotFoundException(`No data found for type '${type}'`);
      }

      return this.transformBattleEffectivenessData(response.data);
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 404) {
          throw new NotFoundException(`Pokémon type '${type}' not found`);
        }
        if (error.response?.status === 400) {
          throw new BadRequestException('Invalid Pokémon type');
        }
        throw new Error('Failed to fetch Pokémon battle effectiveness data');
      }
      throw error;
    }
  }

  private transformPokemonData(
    type: string,
    data: PokeApiTypeResponse,
  ): PokemonResponseDto {
    if (!data.pokemon || !Array.isArray(data.pokemon)) {
      throw new Error('Invalid Pokémon data structure received from API');
    }

    return {
      type: type.toLowerCase(),
      pokemons: data.pokemon.map((p) => {
        if (!p.pokemon || !p.pokemon.name) {
          throw new Error('Invalid Pokémon name structure received from API');
        }
        return p.pokemon.name;
      }),
    };
  }

  private async transformBattleEffectivenessData(
    data: PokeApiTypeRelations,
  ): Promise<BattleEffectivenessResponseDto> {
    const strongAgainstTypes = data.damage_relations.double_damage_to;
    const strongAgainstPokemons = await this.getEffectivenessData(
      strongAgainstTypes,
      3,
    );

    const weakAgainstTypes = data.damage_relations.double_damage_from;
    const weakAgainstPokemons = await this.getEffectivenessData(
      weakAgainstTypes,
      3,
    );

    return {
      strongAgainst: strongAgainstPokemons,
      weakAgainst: weakAgainstPokemons,
    };
  }

  private async getEffectivenessData(
    types: { name: string; url: string }[],
    limit: number,
  ): Promise<{ pokemon: string; type: string; image: string }[]> {
    if (!types || !types.length) return [];

    const result: { pokemon: string; type: string; image: string }[] = [];

    for (const type of types) {
      try {
        if (result.length >= limit) break;

        const pokemons = await this.getMultiplePokemonsByType(
          type.name,
          limit - result.length,
        );

        for (const pokemon of pokemons) {
          result.push({
            pokemon: pokemon.name,
            type: type.name,
            image: pokemon.image,
          });
        }
      } catch (error) {
        console.error(`Error getting pokemon for type ${type.name}:`, error);
      }
    }

    return result.slice(0, limit);
  }

  private async getMultiplePokemonsByType(
    type: string,
    count: number,
  ): Promise<{ name: string; image: string }[]> {
    if (!type) {
      throw new NotFoundException('Type is required');
    }

    const baseUrl = process.env.POKE_API_BASE_URL;

    try {
      const typeUrl = `${baseUrl}/type/${type.toLowerCase()}`;
      const typeResponse = await firstValueFrom(
        this.httpService.get<PokeApiTypeResponse>(typeUrl),
      );

      if (!typeResponse.data?.pokemon?.length) {
        throw new NotFoundException(`No pokémons found for type ${type}`);
      }

      const shuffled = [...typeResponse.data.pokemon].sort(
        () => 0.5 - Math.random(),
      );
      const selected = shuffled.slice(
        0,
        Math.min(count, typeResponse.data.pokemon.length),
      );

      const pokemons: { name: string; image: string }[] = [];
      for (const item of selected) {
        const pokemonResponse = await firstValueFrom(
          this.httpService.get<PokeApiPokemonResponse>(item.pokemon.url),
        );
        pokemons.push({
          name: pokemonResponse.data.name,
          image: pokemonResponse.data.sprites.front_default,
        });
      }

      return pokemons;
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 404) {
          throw new NotFoundException(`Pokémon type '${type}' not found`);
        }
        throw new Error('Failed to fetch Pokémon data');
      }
      throw error;
    }
  }
}
