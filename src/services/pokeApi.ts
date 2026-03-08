import axios from "axios";
import {
  TypesListResponse,
  PokemonType,
  Pokemon,
  PokemonSpecies,
} from "@/types/pokemon";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_POKEMON_API_URL,
  timeout: 10000,
});

/**
 * Fetch all Pokémon types/categories from the PokeAPI.
 */
export const getAllTypes = async (): Promise<TypesListResponse> => {
  const { data } = await apiClient.get<TypesListResponse>("/type?limit=100");
  return data;
};

/**
 * Fetch a single type by name or ID, including all pokémon in that type.
 */
export const getTypeDetail = async (
  nameOrId: string | number
): Promise<PokemonType> => {
  const { data } = await apiClient.get<PokemonType>(`/type/${nameOrId}`);
  return data;
};

/**
 * Fetch a single Pokémon by name or ID.
 */
export const getPokemon = async (
  nameOrId: string | number
): Promise<Pokemon> => {
  const { data } = await apiClient.get<Pokemon>(`/pokemon/${nameOrId}`);
  return data;
};

/**
 * Fetch species data for a Pokémon (for flavor text, genera, etc.).
 */
export const getPokemonSpecies = async (
  nameOrId: string | number
): Promise<PokemonSpecies> => {
  const { data } = await apiClient.get<PokemonSpecies>(
    `/pokemon-species/${nameOrId}`
  );
  return data;
};

export default apiClient;
