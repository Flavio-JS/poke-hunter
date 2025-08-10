import { HistorySection } from "@/components/HistorySection/HistorySection";
import { InstructionsSection } from "@/components/InstructionsSection/InstructionsSection";
import { PokemonCard } from "@/components/PokemonCard/PokemonCard";
import { SearchSection } from "@/components/SearchSection/SearchSection";
import { WeatherCard } from "@/components/WeatherCard/WeatherCard";

export default function Home() {
  return (
    <main
      id="main-content"
      className="container mx-auto scroll-mt-[84px] px-4 py-8"
    >
      <SearchSection />

      <section id="results-section" className="mb-8">
        <div className="grid gap-6 md:grid-cols-2">
          <WeatherCard />
          <PokemonCard />
        </div>
      </section>

      <InstructionsSection />
      <HistorySection />
    </main>
  );
}
