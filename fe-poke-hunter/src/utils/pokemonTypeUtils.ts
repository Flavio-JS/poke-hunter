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
