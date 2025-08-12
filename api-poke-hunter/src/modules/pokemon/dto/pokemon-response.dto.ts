import { IsString } from 'class-validator';
import { PokemonByType } from '../../../common/interfaces/poke-api.interface';

export class PokemonResponseDto implements PokemonByType {
  @IsString()
  type: string;

  @IsString({ each: true })
  pokemons: string[];
}
