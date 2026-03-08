export interface NamedAPIResource {
  name: string;
  url: string;
}

export interface PokemonType {
  id: number;
  name: string;
  pokemon: TypePokemonEntry[];
}

export interface TypePokemonEntry {
  pokemon: NamedAPIResource;
  slot: number;
}

export interface TypesListResponse {
  count: number;
  results: NamedAPIResource[];
}

export interface PokemonSprites {
  front_default: string | null;
  front_shiny: string | null;
  other: {
    "official-artwork": {
      front_default: string | null;
      front_shiny: string | null;
    };
    dream_world: {
      front_default: string | null;
    };
  };
}

export interface PokemonStat {
  base_stat: number;
  effort: number;
  stat: NamedAPIResource;
}

export interface PokemonAbility {
  ability: NamedAPIResource;
  is_hidden: boolean;
  slot: number;
}

export interface PokemonMove {
  move: NamedAPIResource;
}

export interface PokemonTypeSlot {
  slot: number;
  type: NamedAPIResource;
}

export interface Pokemon {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  weight: number;
  sprites: PokemonSprites;
  stats: PokemonStat[];
  abilities: PokemonAbility[];
  moves: PokemonMove[];
  types: PokemonTypeSlot[];
}

export interface PokemonSpecies {
  flavor_text_entries: FlavorTextEntry[];
  genera: Genus[];
  generation: NamedAPIResource;
  evolves_from_species: NamedAPIResource | null;
  capture_rate: number;
  base_happiness: number;
}

export interface FlavorTextEntry {
  flavor_text: string;
  language: NamedAPIResource;
  version: NamedAPIResource;
}

export interface Genus {
  genus: string;
  language: NamedAPIResource;
}
