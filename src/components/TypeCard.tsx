import Link from "next/link";
import { NamedAPIResource } from "@/types/pokemon";
import { motion } from "framer-motion";

interface TypeCardProps {
  type: NamedAPIResource;
  index: number;
}

// A dictionary to give different types different colors
export const typeColors: Record<string, string> = {
  normal: "bg-stone-400 dark:bg-stone-600",
  fire: "bg-red-500 dark:bg-red-700",
  water: "bg-blue-500 dark:bg-blue-700",
  electric: "bg-yellow-400 dark:bg-yellow-600 text-slate-900 dark:text-slate-100",
  grass: "bg-green-500 dark:bg-green-700",
  ice: "bg-cyan-300 dark:bg-cyan-600 text-slate-900 dark:text-slate-100",
  fighting: "bg-orange-700 dark:bg-orange-900",
  poison: "bg-purple-500 dark:bg-purple-700",
  ground: "bg-amber-600 dark:bg-amber-800",
  flying: "bg-indigo-300 dark:bg-indigo-600 text-slate-900 dark:text-slate-100",
  psychic: "bg-pink-500 dark:bg-pink-700",
  bug: "bg-lime-500 dark:bg-lime-700",
  rock: "bg-yellow-700 dark:bg-yellow-900",
  ghost: "bg-indigo-800 dark:bg-indigo-950",
  dragon: "bg-violet-600 dark:bg-violet-800",
  dark: "bg-slate-800 dark:bg-slate-900",
  steel: "bg-slate-400 dark:bg-slate-600",
  fairy: "bg-rose-400 dark:bg-rose-600",
};

export default function TypeCard({ type, index }: TypeCardProps) {
  const typeId = type.url.split("/").filter(Boolean).pop();
  const colorClass = typeColors[type.name] || "bg-slate-700";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Link href={`/type/${typeId || type.name}`}>
        <div
          className={`${colorClass} rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-6 flex items-center justify-center min-h-[120px] relative overflow-hidden group`}
        >
          {/* Decorative background element */}
          <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/20 rounded-full blur-2xl group-hover:bg-white/30 transition-colors" />
          
          <h2 className="text-2xl font-bold text-white capitalize drop-shadow-md z-10 relative">
            {type.name}
          </h2>
        </div>
      </Link>
    </motion.div>
  );
}
