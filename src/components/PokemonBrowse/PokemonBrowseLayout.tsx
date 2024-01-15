import React from 'react';
import {
  VirtuosoGrid,
} from 'react-virtuoso';
import { PokemonListResponse } from '@/api/api.type';
import LoadingSpinner from '@/components/LoadingSpinner';
import PokemonBrowseListItem from '@/components/PokemonBrowseListItem';
import styles from './pokemonBrowse.module.sass';

type PokemonBrowseLayoutProps = {
  data: PokemonListResponse | undefined;
  isError: boolean;
  isSuccess: boolean;
  isUninitialized: boolean;
  isLoading: boolean;
  hidden?: boolean;
  getNextPage: () => void;
};

const defaultProps = {
  hidden: false,
};

const PokemonBrowseLayout: React.FC<PokemonBrowseLayoutProps> = ({
  data,
  isError,
  isSuccess,
  isUninitialized,
  isLoading,
  hidden,
  getNextPage,
}) => (
  <div
    data-testid="pokemon-browse-list"
    className={hidden ? styles.pokemonBrowseListBlocked : styles.pokemonBrowseList}
  >
    {
      isError ? (
        <div>Something went wrong...</div>
      ) : null
    }
    {
      isSuccess && data?.results ? (
        <VirtuosoGrid
          totalCount={data?.count || 0}
          data={data?.results || []}
          overscan={{ main: 600, reverse: 600 }}
          itemClassName={styles.itemContainer}
          listClassName={styles.listContainer}
          // eslint-disable-next-line react/no-unstable-nested-components
          itemContent={(_i, pokemon) => (
            <PokemonBrowseListItem
              pokemon={pokemon.name}
              number={pokemon.number}
            />
          )}
          endReached={getNextPage}
        />
      ) : null
    }
    <LoadingSpinner isLoading={isUninitialized || isLoading} />
  </div>
);

PokemonBrowseLayout.defaultProps = defaultProps;

export default PokemonBrowseLayout;
