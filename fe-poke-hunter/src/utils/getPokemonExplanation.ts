export const getPokemonExplanation = (
  temperature: number,
  isRaining: boolean,
): string => {
  if (isRaining) {
    return "está chovendo (pokémon elétrico)";
  }

  if (temperature < 5) {
    return "a temperatura está abaixo de 5°C (pokémon de gelo)";
  }
  if (temperature >= 5 && temperature < 10) {
    return "a temperatura está entre 5°C e 10°C (pokémon de água)";
  }
  if (temperature >= 12 && temperature < 15) {
    return "a temperatura está entre 12°C e 15°C (pokémon de grama)";
  }
  if (temperature >= 15 && temperature < 21) {
    return "a temperatura está entre 15°C e 21°C (pokémon de terra)";
  }
  if (temperature >= 23 && temperature < 27) {
    return "a temperatura está entre 23°C e 27°C (pokémon inseto)";
  }
  if (temperature >= 27 && temperature <= 33) {
    return "a temperatura está entre 27°C e 33°C (pokémon de pedra)";
  }
  if (temperature > 33) {
    return "a temperatura está acima de 33°C (pokémon de fogo)";
  }

  return "a temperatura está em uma faixa normal (pokémon normal)";
};
