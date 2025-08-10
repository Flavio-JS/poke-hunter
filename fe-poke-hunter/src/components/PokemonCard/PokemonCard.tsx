import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestion, faStar } from "@fortawesome/free-solid-svg-icons";

export const PokemonCard = ({ loading = true }: { loading?: boolean }) => {
  return (
    <div
      id="pokemon-card"
      className="bg-card border-destructive rounded-2xl border-l-4 p-6 opacity-50 shadow-xl"
    >
      <div className="mb-4 flex items-center">
        <div className="bg-destructive/20 mr-4 flex h-12 w-12 items-center justify-center rounded-full">
          <FontAwesomeIcon
            icon={faStar}
            className="text-destructive text-xl"
            fixedWidth
          />
        </div>
        <h3 className="text-foreground text-xl font-bold">Pokémon</h3>
      </div>
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <div className="bg-muted flex h-32 w-32 items-center justify-center rounded-full">
          <FontAwesomeIcon
            icon={faQuestion}
            className="text-muted-foreground text-6xl"
            fixedWidth
          />
        </div>
        <p className="text-muted-foreground mt-4 text-lg">
          {loading ? "Aguardando busca..." : "Pokémon encontrado"}
        </p>
      </div>
    </div>
  );
};
