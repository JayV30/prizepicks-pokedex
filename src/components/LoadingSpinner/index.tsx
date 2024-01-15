import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import styles from './loadingSpinner.module.sass';

type LoadingSpinnerProps = {
  isLoading: boolean;
}

const motionVariants = {
  initial: {
    opacity: 0,
    scale: 0.75,
  },
  animate: {
    opacity: 1,
    scale: 1,
  },
};

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ isLoading }) => (
  <AnimatePresence>
    {isLoading && (
      <motion.div
        data-testid="loading-spinner"
        className={styles.loadingSpinner}
        variants={motionVariants}
        initial="initial"
        animate="animate"
        exit="initial"
      >
        <div className={styles.loadingSpinnerInner} />
        <h4>Finding Data<br />In Pokedex</h4>
      </motion.div>
    )}
  </AnimatePresence>
);

export default LoadingSpinner;
