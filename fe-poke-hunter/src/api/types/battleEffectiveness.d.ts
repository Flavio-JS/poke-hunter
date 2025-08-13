export type BattleEffectiveness = {
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
};
