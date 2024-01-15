import React from 'react';
import { useGetPokemonByNameQuery } from '@/api';
import PokemonEvolutionChainNodeLayout from './PokemonEvolutionChainNodeLayout';

type PokemonEvolutionChainNodeProps = {
  pokemonName: string;
};

// TODO: tests
const PokemonEvolutionChainNode: React.FC<PokemonEvolutionChainNodeProps> = ({ pokemonName }) => {
  // rtk-query api call for individual pokemon detail data
  const {
    isError,
    isSuccess,
    data,
  } = useGetPokemonByNameQuery({ pokemonName });

  return (
    <PokemonEvolutionChainNodeLayout
      pokemon={data}
      isSuccess={isSuccess}
      isError={isError}
    />
  );
};

export default PokemonEvolutionChainNode;
