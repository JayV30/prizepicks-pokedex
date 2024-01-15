import React from 'react';
import { useGetPokemonEvolutionChainQuery } from '@/api';
import PokemonEvolutionChainLayout from './PokemonEvolutionChainLayout';

type PokemonEvolutionChainProps = {
  speciesId: number;
};

// TODO: Review this feature for improvements
// TODO: tests
const PokemonEvolutionChain: React.FC<PokemonEvolutionChainProps> = ({ speciesId }) => {
  // rtk-query api call for evolution chain data
  const {
    isUninitialized,
    isLoading,
    isError,
    isSuccess,
    data,
  } = useGetPokemonEvolutionChainQuery({ speciesId });

  return (
    <PokemonEvolutionChainLayout
      chain={data}
      isSuccess={isSuccess}
      isLoading={isLoading}
      isError={isError}
      isUninitialized={isUninitialized}
    />
  );
};

export default PokemonEvolutionChain;
