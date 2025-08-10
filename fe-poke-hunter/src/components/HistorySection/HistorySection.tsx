import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faHistory } from "@fortawesome/free-solid-svg-icons";

export const HistorySection = () => {
  return (
    <section id="history-section" className="scroll-mt-[84px]">
      <div className="bg-card rounded-2xl p-6 shadow-xl">
        <div className="mb-6 flex items-center">
          <div className="bg-primary/20 mr-4 flex h-12 w-12 items-center justify-center rounded-full">
            <FontAwesomeIcon
              icon={faHistory}
              className="text-primary text-xl"
            />
          </div>
          <h3 className="text-foreground text-xl font-bold">
            Histórico de Buscas
          </h3>
        </div>
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <FontAwesomeIcon
            icon={faClock}
            className="text-muted-foreground mb-4 text-6xl"
          />
          <p className="text-lg">Nenhuma busca realizada ainda</p>
          <p className="text-muted-foreground mt-2 text-sm">
            Suas buscas anteriores aparecerão aqui
          </p>
        </div>
      </div>
    </section>
  );
};
