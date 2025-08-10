import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLightbulb } from "@fortawesome/free-solid-svg-icons";

export const InstructionsSection = () => {
  return (
    <section
      id="instructions-section"
      className="-mt-16 mb-8 scroll-mt-[84px] pt-16"
    >
      <div className="bg-primary flex flex-col items-center justify-center rounded-2xl p-8 text-center shadow-xl">
        <div className="mb-6">
          <FontAwesomeIcon
            icon={faLightbulb}
            className="text-destructive text-4xl"
            fixedWidth
          />
        </div>
        <h3 className="text-foreground mb-6 text-2xl font-bold">
          Como funciona?
        </h3>
        <p className="mx-auto max-w-3xl text-lg leading-relaxed">
          Digite o nome de uma cidade e clique em &quot;Caçar Pokémon&quot; para
          descobrir qual criatura está habitando a região baseada nas condições
          climáticas atuais!
        </p>
      </div>
    </section>
  );
};
