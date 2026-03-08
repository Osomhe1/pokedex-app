import { useQuery } from "@tanstack/react-query";
import { getAllTypes, getTypeDetail, getPokemon, getPokemonSpecies } from "@/services/pokeApi";

export const QUERY_KEYS = {
  types: ["pokemon", "types"] as const,
  typeDetail: (name: string) => ["pokemon", "type", name] as const,
  pokemon: (nameOrId: string | number) => ["pokemon", "detail", nameOrId] as const,
  pokemonSpecies: (nameOrId: string | number) => ["pokemon", "species", nameOrId] as const,
};

export function usePokemonTypes() {
  return useQuery({
    queryKey: QUERY_KEYS.types,
    queryFn: getAllTypes,
    staleTime: 1000 * 60 * 60, // 1 hour
  });
}

export function useTypeDetail(name: string) {
  return useQuery({
    queryKey: QUERY_KEYS.typeDetail(name),
    queryFn: () => getTypeDetail(name),
    enabled: !!name,
    staleTime: 1000 * 60 * 30, // 30 minutes
  });
}

export function usePokemon(nameOrId: string | number) {
  return useQuery({
    queryKey: QUERY_KEYS.pokemon(nameOrId),
    queryFn: () => getPokemon(nameOrId),
    enabled: !!nameOrId,
    staleTime: 1000 * 60 * 30,
  });
}

export function usePokemonSpecies(nameOrId: string | number) {
  return useQuery({
    queryKey: QUERY_KEYS.pokemonSpecies(nameOrId),
    queryFn: () => getPokemonSpecies(nameOrId),
    enabled: !!nameOrId,
    staleTime: 1000 * 60 * 30,
    retry: false, // some pokemon don't have species data
  });
}
