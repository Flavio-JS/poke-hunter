import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faSnowflake,
  faDroplet,
  faLeaf,
  faMountain,
  faBug,
  faFire,
  faBolt,
  faPaw,
  faQuestion,
  faGhost,
  faDragon,
  faFeather,
  faAtom,
  faHandFist,
} from "@fortawesome/free-solid-svg-icons";

export const typeIcons: Record<string, IconDefinition> = {
  ice: faSnowflake,
  water: faDroplet,
  grass: faLeaf,
  ground: faMountain,
  bug: faBug,
  rock: faMountain,
  fire: faFire,
  electric: faBolt,
  normal: faPaw,
  ghost: faGhost,
  dragon: faDragon,
  fairy: faFeather,
  fighting: faHandFist,
  poison: faDroplet,
  psychic: faAtom,
  flying: faFeather,
  steel: faAtom,
  dark: faGhost,
};

export const typeColors: Record<string, string> = {
  ice: "text-cyan-200",
  water: "text-sky-500",
  grass: "text-emerald-500",
  ground: "text-amber-700",
  bug: "text-lime-600",
  rock: "text-stone-600",
  fire: "text-orange-600",
  electric: "text-yellow-300",
  normal: "text-slate-400",
  ghost: "text-purple-500",
  dragon: "text-violet-600",
  fairy: "text-pink-400",
  fighting: "text-red-700",
  poison: "text-fuchsia-600",
  psychic: "text-rose-500",
  flying: "text-indigo-400",
  steel: "text-slate-500",
  dark: "text-gray-800",
};

export const typeGradients: Record<string, string> = {
  ice: "from-cyan-100 to-cyan-200",
  water: "from-sky-100 to-sky-200",
  grass: "from-emerald-100 to-emerald-200",
  ground: "from-amber-100 to-amber-200",
  bug: "from-lime-100 to-lime-200",
  rock: "from-stone-100 to-stone-200",
  fire: "from-orange-100 to-orange-200",
  electric: "from-yellow-100 to-yellow-200",
  normal: "from-slate-100 to-slate-200",
  ghost: "from-purple-100 to-purple-200",
  dragon: "from-violet-100 to-violet-200",
  fairy: "from-pink-100 to-pink-200",
  fighting: "from-red-100 to-red-200",
  poison: "from-fuchsia-100 to-fuchsia-200",
  psychic: "from-rose-100 to-rose-200",
  flying: "from-indigo-100 to-indigo-200",
  steel: "from-slate-100 to-slate-200",
  dark: "from-gray-100 to-gray-200",
};

export const getTypeIcon = (type?: string): IconDefinition => {
  if (!type) return faQuestion;
  return typeIcons[type] || faPaw;
};

export const getTypeColor = (type?: string): string => {
  if (!type) return "destructive";
  return typeColors[type] || "destructive";
};

export const getTypeGradient = (type?: string): string => {
  if (!type) return "from-gray-50 to-gray-100";
  return typeGradients[type] || "from-gray-50 to-gray-100";
};
