"use client";

import { useState, useMemo } from "react";
import { useTypeDetail } from "@/hooks/usePokemon";
import { useParams, useRouter } from "next/navigation";
import PokemonCard from "@/components/PokemonCard";
import LoadingSpinner from "@/components/LoadingSpinner";
import { motion } from "framer-motion";
import { ArrowLeft, Search, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { typeColors } from "@/components/TypeCard";

const ITEMS_PER_PAGE = 25;

export default function TypePage() {
  const params = useParams();
  const router = useRouter();
  const typeId = params.id as string;
  
  const { data, isLoading, error } = useTypeDetail(typeId);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const pokemonList = useMemo(() => {
    if (!data) return [];
    
    // Filter by search term
    let filtered = data.pokemon;
    if (searchTerm) {
      filtered = filtered.filter(p => 
        p.pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return filtered;
  }, [data, searchTerm]);

  // Reset to page 1 when searching
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(pokemonList.length / ITEMS_PER_PAGE);
  const paginatedPokemon = pokemonList.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  if (isLoading) {
    return (
      <div className="flex flex-col h-[70vh] items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
        <div className="text-red-500 bg-red-500/10 p-4 rounded-xl font-medium border border-red-500/20">
          Failed to load Pokémon for this category.
        </div>
        <button 
          onClick={() => router.push("/")}
          className="text-white hover:text-red-400 flex items-center gap-2"
        >
          <ArrowLeft size={16} /> Back to Categories
        </button>
      </div>
    );
  }

  const typeColor = typeColors[data.name] || "bg-slate-700";

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={() => router.push("/")}
          className="p-2 bg-slate-800 hover:bg-slate-700 rounded-full transition-colors text-slate-300 hover:text-white"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-4xl font-extrabold capitalize text-white flex items-center gap-4">
          {data.name} Types
          <span className={`${typeColor} text-sm px-3 py-1 rounded-full text-white font-medium shadow-sm`}>
            {data.pokemon.length} Pokémon
          </span>
        </h1>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-slate-900/50 p-4 rounded-2xl border border-slate-800">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input 
            type="text" 
            placeholder="Search Pokémon by name..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full bg-slate-950 border border-slate-700 text-slate-200 rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all shadow-inner"
          />
        </div>

        {totalPages > 1 && (
          <div className="flex items-center gap-2 bg-slate-950 px-2 py-1.5 rounded-xl border border-slate-800 shadow-sm w-full md:w-auto justify-center">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg hover:bg-slate-800 disabled:opacity-50 disabled:hover:bg-transparent transition-colors text-slate-300"
              aria-label="Previous page"
            >
              <ChevronLeft size={20} />
            </button>
            <span className="text-slate-300 font-medium px-4 min-w-[5rem] text-center">
              {currentPage} / {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg hover:bg-slate-800 disabled:opacity-50 disabled:hover:bg-transparent transition-colors text-slate-300"
              aria-label="Next page"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </div>

      {pokemonList.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 bg-slate-900/30 rounded-3xl border border-slate-800/50 border-dashed">
          <img 
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png" 
            alt="Pokeball" 
            className="w-16 h-16 opacity-50 mb-4 grayscale"
          />
          <p className="text-slate-400 text-lg">No Pokémon found matching "{searchTerm}"</p>
          <button 
            onClick={() => setSearchTerm("")}
            className="mt-4 text-red-400 hover:text-red-300 underline underline-offset-4"
          >
            Clear Search
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-6 gap-4 py-4">
          {paginatedPokemon.map((p, index) => (
            <PokemonCard 
              key={p.pokemon.name} 
              name={p.pokemon.name} 
              url={p.pokemon.url} 
              index={index}
            />
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex justify-center mt-12 pb-8">
          <div className="flex gap-2">
            {[...Array(Math.min(5, totalPages))].map((_, i) => {
              // Logic to show pages around current page
              let pageToShow = currentPage - 2 + i;
              if (currentPage <= 3) pageToShow = i + 1;
              else if (currentPage >= totalPages - 2) pageToShow = totalPages - 4 + i;
              
              if (pageToShow > 0 && pageToShow <= totalPages) {
                return (
                  <button
                    key={pageToShow}
                    onClick={() => setCurrentPage(pageToShow)}
                    className={`w-10 h-10 rounded-xl font-medium transition-all ${
                      currentPage === pageToShow 
                        ? "bg-red-500 text-white shadow-lg shadow-red-500/20" 
                        : "bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white"
                    }`}
                  >
                    {pageToShow}
                  </button>
                );
              }
              return null;
            })}
          </div>
        </div>
      )}
    </div>
  );
}
