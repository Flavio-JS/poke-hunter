import { Controller, Get, Query } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { PokemonRequestDto } from './dto/pokemon-request.dto';
import { PokemonResponseDto } from './dto/pokemon-response.dto';
import { BattleEffectivenessResponseDto } from './dto/battle-effectiveness-response.dto';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Get()
  async getPokemonByType(
    @Query() query: PokemonRequestDto,
  ): Promise<PokemonResponseDto> {
    return this.pokemonService.getPokemonByType(query.type);
  }

  @Get('battle-effectiveness')
  async getBattleEffectiveness(
    @Query('type') type: string,
  ): Promise<BattleEffectivenessResponseDto> {
    return this.pokemonService.getBattleEffectiveness(type);
  }
}
