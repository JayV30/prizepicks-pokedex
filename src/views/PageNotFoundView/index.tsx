import React from 'react';
import { Helmet } from 'react-helmet-async';
import styles from './pageNotFound.module.sass';

const PageNotFoundView: React.FC = () => (
  <>
    <Helmet>
      <title>PAGE NOT FOUND | PokeDex!</title>
    </Helmet>
    <main data-testid="page-not-found-view" className={styles.pageNotFoundWrapper}>
      <h1>Page Not Found!</h1>
    </main>
  </>
);

export default PageNotFoundView;
