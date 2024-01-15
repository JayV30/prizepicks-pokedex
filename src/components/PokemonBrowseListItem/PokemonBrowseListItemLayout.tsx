import React from 'react';
import { Link } from 'react-router-dom';
import { PokemonDetailResponse } from '@/api/api.type';
import styles from './pokemonBrowseListItem.module.sass';

interface PokemonBrowseListItemLayoutProps {
  pokemon: string;
  number: number;
  data: PokemonDetailResponse | undefined;
  isSuccess: boolean;
}

const PokemonBrowseListItemLayout: React.FC<PokemonBrowseListItemLayoutProps> = ({
  pokemon,
  number,
  data,
  isSuccess,
}) => (
  <div
    data-testid={`pokemon-list-item-${number}`}
    className={styles.pokemonBrowseListItem}
  >
    <Link
      to={`details/${pokemon}`}
      aria-label={`View ${data?.formattedName || pokemon}`}
      title={`View ${data?.formattedName || pokemon}`}
    />
    <picture>
      {
        isSuccess && data?.image ? (
          <>
            <source src={data.image} />
            <img
              data-testid={`pokemon-list-item-img-${number}`}
              src={data.image}
              alt={pokemon}
            />
          </>
        ) : null
      }
    </picture>
    <span className={styles.name}>{data?.formattedName || pokemon}</span>
    <span className={styles.number}>#{number}</span>
  </div>
);

export default React.memo(PokemonBrowseListItemLayout);
