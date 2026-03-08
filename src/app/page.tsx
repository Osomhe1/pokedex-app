"use client";

import { usePokemonTypes } from "@/hooks/usePokemon";
import TypeCard from "@/components/TypeCard";
import LoadingSpinner from "@/components/LoadingSpinner";
import { motion } from "framer-motion";

export default function Home() {
  const { data, isLoading, error } = usePokemonTypes();

  if (isLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
        <div className="text-red-500 bg-red-500/10 p-4 rounded-xl font-medium border border-red-500/20">
          Failed to load Pokémon categories. Please try again later.
        </div>
      </div>
    );
  }

  // Filter out 'unknown' and 'shadow' types which don't usually have basic pokemon in them
  const validTypes = data.results.filter(
    (type) => type.name !== "unknown" && type.name !== "shadow"
  );

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4 text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-rose-600 drop-shadow-sm">
          Explore by Category
        </h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          Select a Pokémon type to see all Pokémon belonging to that category.
        </p>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-2">
        {validTypes.map((type, index) => (
          <TypeCard key={type.name} type={type} index={index} />
        ))}
      </div>
    </div>
  );
}
