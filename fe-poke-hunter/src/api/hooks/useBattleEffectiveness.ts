import { useMutation } from "@tanstack/react-query";
import { BattleEffectiveness } from "../types/battleEffectiveness";
import { fetchBattleEffectiveness } from "../services/battleEffectiveness.service";

export const useBattleEffectivenessMutation = () => {
  return useMutation<BattleEffectiveness, Error, string>({
    mutationFn: (pokemonType: string) => fetchBattleEffectiveness(pokemonType),
  });
};
