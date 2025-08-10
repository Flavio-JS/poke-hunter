import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloud, faCloudSun } from "@fortawesome/free-solid-svg-icons";

export const WeatherCard = ({ loading = true }: { loading?: boolean }) => {
  return (
    <div
      id="weather-card"
      className="bg-card border-primary rounded-2xl border-l-4 p-6 opacity-50 shadow-xl"
    >
      <div className="mb-4 flex items-center">
        <div className="bg-primary/20 mr-4 flex h-12 w-12 items-center justify-center rounded-full">
          <FontAwesomeIcon
            icon={faCloudSun}
            className="text-primary text-xl"
            fixedWidth
          />
        </div>
        <h3 className="text-foreground text-xl font-bold">Clima</h3>
      </div>
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <div className="bg-muted flex h-32 w-32 items-center justify-center rounded-full">
          <FontAwesomeIcon
            icon={faCloud}
            className="text-muted-foreground text-6xl"
            fixedWidth
          />
        </div>
        <p className="text-muted-foreground mt-4 text-lg">
          {loading ? "Aguardando busca..." : "Dados do clima"}
        </p>
      </div>
    </div>
  );
};
