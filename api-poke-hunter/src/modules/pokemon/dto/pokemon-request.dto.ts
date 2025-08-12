import { IsNotEmpty, IsString } from 'class-validator';

export class PokemonRequestDto {
  @IsNotEmpty()
  @IsString()
  type: string;
}
