import { faCircle, faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Footer = () => {
  return (
    <footer id="footer" className="bg-card border-primary mt-12 border-t-4">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col items-center justify-between md:flex-row">
          <div className="mb-4 flex items-center space-x-3 md:mb-0">
            <div className="from-primary to-destructive flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br shadow-lg">
              <FontAwesomeIcon icon={faCircle} className="text-xs text-white" />
            </div>
            <span className="text-muted-foreground font-semibold">
              PokeHunter © {new Date().getFullYear()}
            </span>
          </div>
          <button className="bg-primary text-primary-foreground hover:bg-primary/90 flex items-center space-x-2 rounded-lg px-6 py-2 transition-colors">
            <FontAwesomeIcon icon={faQuestionCircle} className="text-base" />
            <span>Ajuda</span>
          </button>
        </div>
      </div>
    </footer>
  );
};
