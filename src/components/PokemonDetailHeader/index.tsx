import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import styles from './pokemonDetailHeader.module.sass';

type PokemonDetailHeaderProps = {
  pokemonName: string | undefined;
};

// TODO: tests
const PokemonDetailHeader: React.FC<PokemonDetailHeaderProps> = ({
  pokemonName,
}) => (
  <header className={styles.pokemonDetailHeader}>
    {
      pokemonName ? (
        <h3>{pokemonName}</h3>
      ) : (
        <h3>&nbsp;</h3>
      )
    }
    <Link
      to="/"
      aria-label="Back to Pokemon List"
      title="Back to Pokemon List"
      className={styles.closeLink}
      ref={(el) => {
        // pull focus here after list click or search bar submit
        if (el) {
          el.focus();
        }
      }}
    >
      <AiOutlineCloseCircle size={32} />
    </Link>
  </header>
);

export default PokemonDetailHeader;
