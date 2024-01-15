import React, {
  useCallback,
  useState,
} from 'react';
import { useLocation } from 'react-router-dom';
import { useGetPokemonsQuery } from '@/api';
import PokemonBrowseLayout from './PokemonBrowseLayout';

const PokemonBrowse: React.FC = () => {
  const loc = useLocation();
  // pagination state
  const [offset, setOffset] = useState<number>(0);

  // rtk-query api call
  const {
    isUninitialized,
    isLoading,
    isError,
    isSuccess,
    data,
  } = useGetPokemonsQuery({ limit: 20, offset });

  // function to increment offset and trigger next rtk-query api call
  const getNextPage = useCallback(() => {
    if (isUninitialized || isLoading || isError) return;
    if (!data?.next) return;
    setOffset((prevOffset) => prevOffset + 20);
  }, [isUninitialized, isLoading, isError, data?.next]);

  return (
    <PokemonBrowseLayout
      data={data}
      isError={isError}
      isSuccess={isSuccess}
      isUninitialized={isUninitialized}
      isLoading={isLoading}
      getNextPage={getNextPage}
      hidden={loc.pathname !== '/'}
    />
  );
};

export default PokemonBrowse;
