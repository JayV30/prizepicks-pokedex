import {
  PokemonRawListResponse,
  PokemonRawDetailResponse,
  PokemonRawEvolutionResponse,
} from '@/api/api.type';
import { PokeAPI } from 'pokeapi-types';
import pokemonList from './pokemon-data/list.json';
import jigglypuff from './pokemon-data/jigglypuff.json';
import pikachu from './pokemon-data/pikachu.json';
import jigglypuffSpeciesData from './pokemon-data/jigglypuff-species.json';
import pikachuSpeciesData from './pokemon-data/pikachu-species.json';
import jigglypuffEvolutionChainData from './pokemon-data/jigglypuff-evolution.json';
import pikachuEvolutionChainData from './pokemon-data/pikachu-evolution.json';

// pokemon list data
export const pokemons1: PokemonRawListResponse = {
  count: 40,
  next: 'https://pokeapi.co/api/v2/pokemon?offset=20&limit=20',
  previous: null,
  results: pokemonList.slice(0, 20),
};
export const pokemons2: PokemonRawListResponse = {
  count: 40,
  next: null,
  previous: 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=20',
  results: pokemonList.slice(20, 40),
};

// pokemon detail data
export const jigglypuffDetail: PokemonRawDetailResponse = jigglypuff;
export const pikachuDetail: PokemonRawDetailResponse = pikachu;

// species data
export const jigglypuffSpecies: PokeAPI.PokemonSpecies = jigglypuffSpeciesData;
export const pikachuSpecies: PokeAPI.PokemonSpecies = pikachuSpeciesData;

// evolutions data
export const jigglypuffEvolutionChain: PokemonRawEvolutionResponse = jigglypuffEvolutionChainData;
export const pikachuEvolutionChain: PokemonRawEvolutionResponse = pikachuEvolutionChainData;
