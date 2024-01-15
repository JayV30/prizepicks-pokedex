import React from 'react';
import { useGetPokemonByNameQuery } from '@/api';
import PokemonDetailLayout from './PokemonDetailLayout';

type PokemonDetailProps = {
  pokemonName: string;
};

// TODO: tests
const PokemonDetail: React.FC<PokemonDetailProps> = ({ pokemonName }) => {
  // rtk-query api call for individual pokemon detail data
  const {
    isUninitialized,
    isLoading,
    isError,
    isSuccess,
    data,
  } = useGetPokemonByNameQuery({ pokemonName });

  return (
    <PokemonDetailLayout
      pokemon={data}
      isSuccess={isSuccess}
      isLoading={isLoading}
      isError={isError}
      isUninitialized={isUninitialized}
    />
  );
};

export default PokemonDetail;
