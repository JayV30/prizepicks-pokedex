import React from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { AnimatePresence, motion } from 'framer-motion';
import AnimatedOutlet from '@/components/AnimatedOutlet';
import PageHeader from '@/components/PageHeader';
import SideControls from '@/components/SideControls';
import SearchBar from '@/components/SearchBar';
import PokemonBrowse from '@/components/PokemonBrowse';
import styles from './home.module.sass';

const outletMotionVariants = {
  initial: {
    x: '-100%',
  },
  animate: {
    x: '0%',
  },
};

const HomeView: React.FC = () => {
  const loc = useLocation();

  return (
    <>
      <Helmet>
        <title>Home | PokeDex!</title>
      </Helmet>
      <main data-testid="home-view" className={styles.mainWrapper}>
        <PageHeader />
        <div className={styles.main}>
          <SideControls />
          <section className={styles.contentArea}>
            <SearchBar />
            <div className={styles.lowerContentArea}>
              <PokemonBrowse />
              <AnimatePresence mode="wait">
                <motion.div
                  key={loc.pathname?.includes('details') ? 'details' : 'browse'}
                  className={styles.outletWrapper}
                  variants={outletMotionVariants}
                  initial="initial"
                  animate="animate"
                  exit="initial"
                  transition={{
                    ease: 'easeInOut',
                    duration: 0.2,
                  }}
                >
                  <AnimatedOutlet key={loc.key} />
                </motion.div>
              </AnimatePresence>
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default HomeView;
