import { BattleEffectivenessSection } from "@/components/BattleEffectivenessSection/BattleEffectivenessSection";
import { HistorySection } from "@/components/HistorySection/HistorySection";
import { InstructionsSection } from "@/components/InstructionsSection/InstructionsSection";
import { PokemonCard } from "@/components/PokemonCard/PokemonCard";
import { SearchSection } from "@/components/SearchSection/SearchSection";
import { WeatherCard } from "@/components/WeatherCard/WeatherCard";
import { WeatherPokemonProvider } from "@/contexts/WeatherPokemonContext";

export default function Home() {
  return (
    <WeatherPokemonProvider>
      <main
        id="main-content"
        className="container mx-auto scroll-mt-[84px] px-4 py-8"
      >
        <SearchSection />

        <section id="results-section" className="mb-8 scroll-mt-[84px]">
          <div className="grid gap-6 md:grid-cols-2">
            <WeatherCard />
            <PokemonCard />
          </div>

          <BattleEffectivenessSection />
        </section>

        <InstructionsSection />
        <HistorySection />
      </main>
    </WeatherPokemonProvider>
  );
}
