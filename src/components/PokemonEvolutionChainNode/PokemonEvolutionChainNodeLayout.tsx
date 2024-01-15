import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineWarning } from 'react-icons/ai';
import { PokemonDetailResponse } from '@/api/api.type';
import styles from './pokemonEvolutionChainNodeLayout.module.sass';

interface PokemonEvolutionChainNodeLayoutProps {
  pokemon: PokemonDetailResponse | undefined;
  isError: boolean;
  isSuccess: boolean;
}

// TODO: Improve styling and review the evolution chain feature in full
const PokemonEvolutionChainNodeLayout: React.FC<PokemonEvolutionChainNodeLayoutProps> = ({
  pokemon,
  isError,
  isSuccess,
}) => (
  <foreignObject width="150" height="150" x="-75" y="-75">
    <div className={styles.pokemonEvolutionChainNode}>
      {
        isError ? (
          <div className={styles.warning}>
            <AiOutlineWarning size={50} />
          </div>
        ) : null
      }
      {
        isSuccess && pokemon ? (
          <div data-testid="evolution-chain-node" className={styles.pokemonImage}>
            <Link to={`/details/${pokemon.name}`}>
              {
                pokemon?.image ? (
                  <img src={pokemon.image} alt={pokemon.formattedName} />
                ) : null
              }
              <p>{pokemon.formattedName}</p>
            </Link>
          </div>
        ) : null
      }
    </div>
  </foreignObject>
);

export default React.memo(PokemonEvolutionChainNodeLayout);
