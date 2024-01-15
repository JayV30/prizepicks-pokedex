import {
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { PokeAPI } from 'pokeapi-types';
import {
  kebabToTitleCase,
  decimetresToFeetInches,
  hectogramsToPounds,
  getEvolutionChain,
} from '@/helpers';
import {
  PokemonRawListResponse,
  PokemonListResponse,
  PokemonRawDetailResponse,
  PokemonDetailResponse,
  PokemonEvolutionResponse,
  PokemonRawEvolutionResponse,
} from './api.type';

// create all our RTK Query endpoints and export their associated hooks
const api = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://pokeapi.co/api/v2/',
  }),
  keepUnusedDataFor: 60 * 5, // 5 minutes
  endpoints: (builder) => ({
    getPokemons: builder.query<PokemonListResponse, { limit: number, offset: number | undefined }>({
      query: ({ limit = 20, offset = 0 }) => ({
        url: 'pokemon',
        params: {
          limit,
          offset,
        },
      }),
      transformResponse: (baseQueryReturnValue: PokemonRawListResponse): PokemonListResponse => {
        const { results } = baseQueryReturnValue;

        const transformedResults = results.map((pokemon) => ({
          ...pokemon,
          number: parseInt(pokemon.url.split('/').slice(-2, -1)[0], 10),
        }));

        return {
          ...baseQueryReturnValue,
          results: transformedResults,
        };
      },
      // remove offset from cache key to prevent cache duplication
      serializeQueryArgs: ({ queryArgs }) => {
        const newQueryArgs = { ...queryArgs };
        if ('offset' in newQueryArgs) {
          delete newQueryArgs.offset;
        }
        return newQueryArgs;
      },
      // merge new results with existing results in cache
      merge: (currentCache, newItems) => {
        if (currentCache.results) {
          return {
            ...currentCache,
            ...newItems,
            results: [...currentCache.results, ...newItems.results],
          };
        }
        return newItems;
      },
      // refetch query if offset changes
      forceRefetch({ currentArg, previousArg }) {
        return currentArg?.offset !== previousArg?.offset;
      },
    }),
    getPokemonByName: builder.query<PokemonDetailResponse, { pokemonName: string }>({
      query: ({ pokemonName }) => `pokemon/${pokemonName}`,
      // transform response to more minimal format to reduce cache size
      transformResponse: (baseQueryReturnValue: PokemonRawDetailResponse): PokemonDetailResponse => {
        const {
          id,
          name,
          height,
          weight,
          abilities,
          types,
          sprites,
          species,
        } = baseQueryReturnValue;

        const formattedName = kebabToTitleCase(name);
        const formattedHeight = decimetresToFeetInches(height);
        const formattedWeight = hectogramsToPounds(weight);

        return {
          id,
          name,
          formattedName,
          height: formattedHeight,
          weight: formattedWeight,
          abilities: abilities.map(({ ability }) => ability.name),
          types: types.map(({ type }) => type.name),
          image: sprites?.other?.['official-artwork']?.front_default || null,
          speciesId: parseInt(species.url.split('/').slice(-2, -1)[0], 10),
        };
      },
    }),
    getPokemonEvolutionChain: builder.query<PokemonEvolutionResponse, { speciesId: number }>({
      queryFn: async ({ speciesId }, _queryApi, _extraOptions, fetchWithBQ) => {
        // get species data to find evolution id
        const speciesResponse = await fetchWithBQ(`pokemon-species/${speciesId}`);
        if (speciesResponse.error) return speciesResponse;
        const species = speciesResponse.data as PokeAPI.PokemonSpecies;

        // get evolution chain data
        const evolutionChainId = species.evolution_chain.url.split('/').slice(-2, -1)[0];
        const evolutionChainResponse = await fetchWithBQ(`evolution-chain/${evolutionChainId}`);
        if (evolutionChainResponse.error) return evolutionChainResponse;
        const evolutionChain = evolutionChainResponse.data as PokemonRawEvolutionResponse;

        // get evolution chain
        const evolutions = getEvolutionChain(evolutionChain.chain);

        return {
          data: {
            evolutions,
          },
        };
      },
    }),
  }),
});

export const {
  useGetPokemonsQuery,
  useGetPokemonByNameQuery,
  useGetPokemonEvolutionChainQuery,
} = api;

export default api;
