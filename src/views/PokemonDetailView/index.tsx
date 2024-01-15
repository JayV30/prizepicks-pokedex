import React from 'react';
import { useParams } from 'react-router-dom';
import PokemonDetailHeader from '@/components/PokemonDetailHeader';
import PokemonDetail from '@/components/PokemonDetail';
import styles from './pokemonDetailView.module.sass';

/**
 * This renders in the <AnimatedOutlet /> of the HomeView
 * when the route is /details/:pokemonName
 */
const PokemonDetailView: React.FC = () => {
  const { pokemonName } = useParams();

  return (
    <article
      data-testid="pokemon-detail-view"
      className={styles.pokemonDetailView}
    >
      {
        pokemonName && pokemonName.length > 0 ? (
          <PokemonDetail pokemonName={pokemonName} />
        ) : (
          <>
            <PokemonDetailHeader pokemonName="Invalid Search" />
            <p data-testid="invalid-pokemon-name-text">Invalid Pokemon Name or Pokemon does not exist!</p>
          </>
        )
      }
    </article>
  );
};

export default PokemonDetailView;
