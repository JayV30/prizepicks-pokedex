import React from 'react';
import { useGetPokemonByNameQuery } from '@/api';
import PokemonBrowseListItemLayout from './PokemonBrowseListItemLayout';

interface PokemonBrowseListItemProps {
  pokemon: string;
  number: number;
}

const PokemonBrowseListItem: React.FC<PokemonBrowseListItemProps> = ({
  pokemon,
  number,
}) => {
  // rtk-query api call for individual pokemon to get image & cache additional pokemon detail data
  const {
    isSuccess,
    data,
  } = useGetPokemonByNameQuery({ pokemonName: pokemon });

  return (
    <PokemonBrowseListItemLayout
      pokemon={pokemon}
      number={number}
      data={data}
      isSuccess={isSuccess}
    />
  );
};

export default React.memo(PokemonBrowseListItem);
