export class BattleEffectivenessResponseDto {
  strongAgainst: {
    pokemon: string;
    type: string;
    image: string;
  }[];
  weakAgainst: {
    pokemon: string;
    type: string;
    image: string;
  }[];
}
