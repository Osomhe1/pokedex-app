import Link from "next/link";
import { usePokemon } from "@/hooks/usePokemon";
import { typeColors } from "./TypeCard";
import { motion } from "framer-motion";

interface PokemonCardProps {
  name: string;
  url: string;
  index: number;
}

export default function PokemonCard({ name, url, index }: PokemonCardProps) {
  // Extract ID from url to fetch details
  const idStr = url.split("/").filter(Boolean).pop() || name;
  const { data, isLoading } = usePokemon(idStr);

  if (isLoading || !data) {
    return (
      <div className="bg-slate-800/50 rounded-2xl shadow p-4 animate-pulse h-48 flex items-center justify-center">
        <div className="w-16 h-16 rounded-full bg-slate-700/50" />
      </div>
    );
  }

  // Get primary type for background color
  const primaryType = data.types[0]?.type.name || "normal";
  const colorClass = typeColors[primaryType] || "bg-slate-700";

  // We only use the color for a subtle border/badge and the background gradient
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: (index % 10) * 0.05 }}
      whileHover={{ y: -5 }}
    >
      <Link href={`/pokemon/${data.id}`}>
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg hover:border-slate-600 transition-colors relative overflow-hidden group">
          {/* Background gradient based on type */}
          <div className={`absolute top-0 right-0 w-32 h-32 opacity-20 group-hover:opacity-30 blur-2xl transition-opacity rounded-bl-full ${colorClass}`} />
          
          <div className="flex justify-between items-start mb-4 relative z-10">
            <div>
              <span className="text-slate-400 font-mono text-sm font-semibold">
                #{String(data.id).padStart(3, "0")}
              </span>
              <h3 className="text-xl font-bold text-white capitalize mt-1">
                {data.name}
              </h3>
            </div>
            <div className="flex flex-col gap-1">
              {data.types.map((t) => (
                <span 
                  key={t.type.name}
                  className={`${typeColors[t.type.name] || "bg-slate-700"} text-[10px] uppercase font-bold px-2 py-0.5 rounded-full text-white/90 text-center shadow-sm`}
                >
                  {t.type.name}
                </span>
              ))}
            </div>
          </div>

          <div className="relative h-32 mt-2 flex justify-center items-center z-10">
            {/* Pokeball placeholder background */}
            <div className="absolute inset-0 flex justify-center items-center opacity-10">
              <svg width="80" height="80" viewBox="0 0 100 100" fill="currentColor" className="text-slate-400">
                <path d="M50 0C22.4 0 0 22.4 0 50s22.4 50 50 50 50-22.4 50-50S77.6 0 50 0zm0 90C28 90 10 72 10 50c0-10.4 4-20 10.5-27h79C96 29.9 100 39.5 100 50c0 22-17.9 40-40 40zm0-55c-8.3 0-15 6.7-15 15s6.7 15 15 15 15-6.7 15-15-6.7-15-15-15zm0 20c-2.8 0-5-2.2-5-5s2.2-5 5-5 5 2.2 5 5-2.2 5-5 5z"/>
              </svg>
            </div>
            
            {data.sprites.other["official-artwork"].front_default || data.sprites.front_default ? (
              <img
                src={data.sprites.other["official-artwork"].front_default || data.sprites.front_default || ""}
                alt={data.name}
                className="w-28 h-28 object-contain drop-shadow-lg group-hover:scale-110 transition-transform duration-300 relative z-10"
                loading="lazy"
              />
            ) : (
              <span className="text-slate-500">No Image</span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
