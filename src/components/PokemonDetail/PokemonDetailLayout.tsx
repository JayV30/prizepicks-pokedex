import React from 'react';
import { Helmet } from 'react-helmet-async';
import LoadingSpinner from '@/components/LoadingSpinner';
import PokemonDetailHeader from '@/components/PokemonDetailHeader';
import { kebabToTitleCase } from '@/helpers';
import { PokemonDetailResponse } from '@/api/api.type';
import styles from './pokemonDetailLayout.module.sass';
import PokemonEvolutionChain from '../PokemonEvolutionChain';

interface PokemonDetailLayoutProps {
  pokemon: PokemonDetailResponse | undefined;
  isUninitialized: boolean;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
}

const PokemonDetailLayout: React.FC<PokemonDetailLayoutProps> = ({
  pokemon,
  isUninitialized,
  isLoading,
  isError,
  isSuccess,
}) => (
  <>
    <Helmet>
      <title>{`${pokemon?.formattedName || 'Details'} | Pokedex!`}</title>
    </Helmet>
    <PokemonDetailHeader pokemonName={pokemon?.formattedName} />
    <div className={styles.pokemonDetail}>
      <div className={styles.pokemonDetailInner}>
        {
          isError ? (
            <div>No Pokemon Details Found. Please ensure you&apos;ve entered a valid Pokemon name or number!</div>
          ) : null
        }
        {
          isSuccess && pokemon ? (
            <>
              <div data-testid="pokemon-detail-stats" className={styles.pokemonStats}>
                <div className={styles.pokemonStatRow}>
                  <div className={styles.pokemonStatGroup}>
                    <h4>Name</h4>
                    <p>{pokemon.formattedName}</p>
                  </div>
                  <div className={styles.pokemonStatGroup}>
                    <h4>Number</h4>
                    <p>{`#${pokemon.id}`}</p>
                  </div>
                </div>
                <div className={styles.pokemonStatRow}>
                  <div className={styles.pokemonStatGroup}>
                    <h4>Height</h4>
                    <p>{pokemon.height}</p>
                  </div>
                  <div className={styles.pokemonStatGroup}>
                    <h4>Weight</h4>
                    <p>{pokemon.weight}</p>
                  </div>
                </div>
                <div className={styles.pokemonStatRow}>
                  <div className={styles.pokemonStatGroup}>
                    <h4>Type{ pokemon.types.length !== 1 ? 's' : ''}</h4>
                    <ul>
                      {
                        pokemon.types.map((type) => (
                          <li key={type}>
                            {kebabToTitleCase(type)}
                          </li>
                        ))
                      }
                    </ul>
                  </div>
                  <div className={styles.pokemonStatGroup}>
                    <h4>Abilit{ pokemon.abilities.length !== 1 ? 'ies' : 'y'}</h4>
                    <ul>
                      {
                        pokemon.abilities.map((ability) => (
                          <li key={ability}>
                            {kebabToTitleCase(ability)}
                          </li>
                        ))
                      }
                    </ul>
                  </div>
                </div>
              </div>
              <div data-testid="pokemon-detail-image" className={styles.pokemonImage}>
                {
                  pokemon?.image ? (
                    <img src={pokemon.image} alt={pokemon.formattedName} />
                  ) : null
                }
              </div>
            </>
          ) : null
        }
      </div>
      {
        isSuccess && pokemon ? (
          <>
            <h3 className={styles.evolutionChainHeading}>Evolution Chain</h3>
            <PokemonEvolutionChain speciesId={pokemon.speciesId} />
          </>
        ) : null
      }
      <LoadingSpinner isLoading={isUninitialized || isLoading} />
    </div>
  </>
);

export default React.memo(PokemonDetailLayout);
