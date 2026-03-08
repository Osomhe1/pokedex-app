"use client";

import { usePokemon, usePokemonSpecies } from "@/hooks/usePokemon";
import { useParams, useRouter } from "next/navigation";
import LoadingSpinner from "@/components/LoadingSpinner";
import { motion } from "framer-motion";
import { ArrowLeft, Ruler, Weight, Info } from "lucide-react";
import { typeColors } from "@/components/TypeCard";

export default function PokemonDetailPage() {
  const params = useParams();
  const router = useRouter();
  const pokemonId = params.id as string;

  const { data: pokemon, isLoading: isLoadingPokemon, error: errorPokemon } = usePokemon(pokemonId);
  const { data: species, isLoading: isLoadingSpecies } = usePokemonSpecies(pokemonId);

  const isLoading = isLoadingPokemon || isLoadingSpecies;

  if (isLoading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <LoadingSpinner size={64} />
      </div>
    );
  }

  if (errorPokemon || !pokemon) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
        <div className="text-red-500 bg-red-500/10 p-4 rounded-xl font-medium border border-red-500/20">
          Failed to load Pokémon details.
        </div>
        <button 
          onClick={() => router.back()}
          className="text-white hover:text-red-400 flex items-center gap-2"
        >
          <ArrowLeft size={16} /> Go Back
        </button>
      </div>
    );
  }

  const primaryType = pokemon.types[0]?.type.name || "normal";
  const mainColorClass = typeColors[primaryType] || "bg-slate-700";

  // Find English flavor text
  const description = species?.flavor_text_entries.find(
    (entry) => entry.language.name === "en"
  )?.flavor_text.replace(/\f/g, " ") || "No description available.";

  const genera = species?.genera.find(g => g.language.name === "en")?.genus || "Unknown Pokémon";
  
  const formattedWeight = pokemon.weight / 10; // kg
  const formattedHeight = pokemon.height / 10; // m

  const maxStatInfo = 255; // Base stats max is generally 255

  return (
    <div className="max-w-4xl mx-auto pb-12 animate-in fade-in zoom-in-95 duration-500">
      <button 
        onClick={() => router.back()}
        className="mb-8 p-2 bg-slate-800/80 backdrop-blur hover:bg-slate-700 rounded-full transition-colors text-slate-300 hover:text-white sticky top-20 z-40"
      >
        <ArrowLeft size={24} />
      </button>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl relative">
        {/* Header Section */}
        <div className={`${mainColorClass} relative pt-8 pb-32 px-8 overflow-hidden`}>
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-2xl -ml-20 -mb-20 pointer-events-none" />
          
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <div className="flex items-center gap-4 mb-2">
                <span className="text-white/80 font-mono text-xl md:text-2xl font-bold bg-black/20 px-3 py-1 rounded-full backdrop-blur">
                  #{String(pokemon.id).padStart(3, "0")}
                </span>
                <span className="text-white/90 font-medium tracking-wide">
                  {genera}
                </span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black text-white capitalize drop-shadow-md">
                {pokemon.name}
              </h1>
            </div>

            <div className="flex gap-2 mt-4 md:mt-0">
              {pokemon.types.map((t) => (
                <span 
                  key={t.type.name}
                  className="bg-white/20 backdrop-blur-md border border-white/20 text-white uppercase font-bold px-4 py-1.5 rounded-full shadow-lg text-sm tracking-wider"
                >
                  {t.type.name}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="bg-slate-900 rounded-t-3xl -mt-24 relative px-6 md:px-12 pt-32 pb-12 z-20">
          {/* Main Image */}
          <div className="absolute -top-48 left-1/2 -translate-x-1/2 z-30">
             <motion.img
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                src={pokemon.sprites.other["official-artwork"].front_default || pokemon.sprites.front_default || ""}
                alt={pokemon.name}
                className="w-72 h-72 md:w-80 md:h-80 object-contain drop-shadow-2xl"
              />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Left Column: About */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                  <Info className="text-slate-400" /> About
                </h3>
                <p className="text-slate-300 text-lg leading-relaxed bg-slate-800/50 p-6 rounded-2xl border border-slate-700/50">
                  {description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700/50 flex flex-col items-center justify-center">
                  <div className="flex items-center gap-2 text-slate-400 mb-2">
                    <Weight size={18} /> Weight
                  </div>
                  <span className="text-2xl font-semibold text-white">{formattedWeight} kg</span>
                </div>
                <div className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700/50 flex flex-col items-center justify-center">
                  <div className="flex items-center gap-2 text-slate-400 mb-2">
                    <Ruler size={18} /> Height
                  </div>
                  <span className="text-2xl font-semibold text-white">{formattedHeight} m</span>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-bold text-slate-200 mb-3">Abilities</h4>
                <div className="flex flex-wrap gap-3">
                  {pokemon.abilities.map((a) => (
                    <span 
                      key={a.ability.name}
                      className="bg-slate-800 text-slate-300 capitalize px-4 py-2 rounded-xl border border-slate-700 flex items-center gap-2"
                    >
                      {a.ability.name}
                      {a.is_hidden && <span className="text-[10px] bg-red-500/20 text-red-300 px-2 py-0.5 rounded uppercase font-bold">Hidden</span>}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Base Stats */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Base Stats</h3>
              <div className="bg-slate-800/30 p-6 rounded-3xl border border-slate-700/50 space-y-4">
                {pokemon.stats.map((stat) => {
                  const percentage = (stat.base_stat / maxStatInfo) * 100;
                  
                  // Color coding stats
                  let statColor = "bg-green-500";
                  if (stat.base_stat < 50) statColor = "bg-red-500";
                  else if (stat.base_stat < 80) statColor = "bg-yellow-500";
                  else if (stat.base_stat > 110) statColor = "bg-teal-400";

                  // Shorten stat names
                  const statName = stat.stat.name
                    .replace("special-attack", "Sp. Atk")
                    .replace("special-defense", "Sp. Def");

                  return (
                    <div key={stat.stat.name} className="flex items-center group">
                      <span className="w-24 text-sm font-medium text-slate-400 capitalize whitespace-nowrap">
                        {statName}
                      </span>
                      <span className="w-10 text-right text-white font-bold mr-4">
                        {stat.base_stat}
                      </span>
                      <div className="flex-1 h-3 bg-slate-800 rounded-full overflow-hidden border border-slate-700/50 relative">
                        <motion.div 
                          className={`absolute top-0 left-0 h-full rounded-full ${statColor} shadow-[0_0_10px_rgba(0,0,0,0.3)]`}
                          initial={{ width: 0 }}
                          animate={{ width: `${percentage}%` }}
                          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
