import React from 'react';
import pokemonSVG from './pokemon-logo.svg';
import styles from './pageHeader.module.sass';

const PageHeader: React.FC = () => (
  <header className={styles.mainHeader}>
    <img src={pokemonSVG} alt="Pokemon Logo" />
    <h1>Pokedex</h1>
  </header>
);

export default PageHeader;
