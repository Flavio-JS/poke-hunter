import api from "@/lib/api";
import { BattleEffectiveness } from "../types/battleEffectiveness";

export const fetchBattleEffectiveness = async (
  pokemonType: string,
): Promise<BattleEffectiveness> => {
  try {
    const response = await api.get<BattleEffectiveness>(
      `pokemon/battle-effectiveness?type=${pokemonType.toLowerCase()}`,
    );
    return response.data;
  } catch {
    throw new Error(
      `Failed to fetch battle effectiveness for type ${pokemonType}`,
    );
  }
};
