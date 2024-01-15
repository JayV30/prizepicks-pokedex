import { PokeAPI } from 'pokeapi-types';
import { RawNodeDatum } from 'react-d3-tree';

// response from https://pokeapi.co/api/v2/pokemon
export interface PokemonRawListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<{
    name: string;
    url: string;
  }>;
}

// transformed response from https://pokeapi.co/api/v2/pokemon
export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<{
    name: string;
    number: number;
  }>;
}

/**
 * pokeapi-types sprites property is not typed correctly, so we need
 * a few types to override and correct it
*/
export interface SpriteVariants {
  front_default?: string | null;
  front_shiny?: string | null;
  front_female?: string | null;
  front_shiny_female?: string | null;
  front_gray?: string | null;
  front_transparent?: string | null;
  front_shiny_transparent?: string | null;
  back_default?: string | null;
  back_shiny?: string | null;
  back_female?: string | null;
  back_shiny_female?: string | null;
  back_gray?: string | null;
  back_transparent?: string | null;
  back_shiny_transparent?: string | null;
  animated?: SpriteVariants;
}

// response from https://pokeapi.co/api/v2/pokemon/{pokemonName}, with sprites property corrected
export interface PokemonRawDetailResponse extends Omit<PokeAPI.Pokemon, 'sprites'> {
  sprites: {
    front_default: string | null;
    front_shiny: string | null;
    front_female: string | null;
    front_shiny_female: string | null;
    back_default: string | null;
    back_shiny: string | null;
    back_female: string | null;
    back_shiny_female: string | null;
    other?: {
      dream_world?: SpriteVariants;
      home?: SpriteVariants;
      'official-artwork'?: SpriteVariants;
      showdown?: SpriteVariants;
    };
    versions?: {
      'generation-i'?: {
        'red-blue'?: SpriteVariants;
        yellow?: SpriteVariants;
      };
      'generation-ii'?: {
        crystal?: SpriteVariants;
        gold?: SpriteVariants;
        silver?: SpriteVariants;
      };
      'generation-iii'?: {
        emerald?: SpriteVariants;
        'firered-leafgreen'?: SpriteVariants;
        'ruby-sapphire'?: SpriteVariants;
      };
      'generation-iv'?: {
        'diamond-pearl'?: SpriteVariants;
        'heartgold-soulsilver'?: SpriteVariants;
        platinum?: SpriteVariants;
      };
      'generation-v'?: {
        'black-white'?: SpriteVariants;
      };
      'generation-vi'?: {
        'omegaruby-alphasapphire'?: SpriteVariants;
        'x-y'?: SpriteVariants;
      };
      'generation-vii'?: {
        icons?: SpriteVariants;
        'ultra-sun-ultra-moon'?: SpriteVariants;
      };
      'generation-viii'?: {
        icons?: SpriteVariants;
      };
    };
  }
}

// transformed response from https://pokeapi.co/api/v2/pokemon/{pokemonName}
export interface PokemonDetailResponse {
  id: number;
  name: string;
  formattedName: string;
  height: string;
  weight: string;
  abilities: string[];
  types: string[];
  image: string | null;
  speciesId: number;
}

/**
 * pokeapi-types evolution chain types need correction
 */
export interface EvolutionDetail {
  item: PokeAPI.NamedAPIResource | null;
  trigger: PokeAPI.NamedAPIResource | null;
  gender: number | null;
  held_item: PokeAPI.NamedAPIResource | null;
  known_move: PokeAPI.NamedAPIResource | null;
  known_move_type: PokeAPI.NamedAPIResource | null;
  location: PokeAPI.NamedAPIResource | null;
  min_level: number | null;
  min_happiness: number | null;
  min_beauty: number | null;
  min_affection: number | null;
  needs_overworld_rain: boolean;
  party_species: PokeAPI.NamedAPIResource | null;
  party_type: PokeAPI.NamedAPIResource | null;
  relative_physical_stats: number | null;
  time_of_day: string | null;
  trade_species: PokeAPI.NamedAPIResource | null;
  turn_upside_down: boolean;
}

export interface ChainLink {
  is_baby: boolean;
  species: PokeAPI.NamedAPIResource;
  evolves_to: ChainLink[];
  evolution_details: EvolutionDetail[];
}

// response from https://pokeapi.co/api/v2/evolution-chain/{chainId}, with baby_trigger_item property corrected
export interface PokemonRawEvolutionResponse {
  id: number;
  baby_trigger_item: PokeAPI.NamedAPIResource | null;
  chain: ChainLink;
}

// transformed response from https://pokeapi.co/api/v2/evolution-chain/{chainId}
export interface PokemonEvolutionResponse {
  evolutions: RawNodeDatum;
}
