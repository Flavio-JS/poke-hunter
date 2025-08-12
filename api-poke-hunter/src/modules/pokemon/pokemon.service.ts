import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import {
  PokeApiTypeResponse,
} from '../../common/interfaces/poke-api.interface';
import { PokemonResponseDto } from './dto/pokemon-response.dto';

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
}
