import React, {
  useRef,
} from 'react';
import { Tree } from 'react-d3-tree';
import useResizeObserver from 'beautiful-react-hooks/useResizeObserver';
import LoadingSpinner from '@/components/LoadingSpinner';
import PokemonEvolutionChainNode from '@/components/PokemonEvolutionChainNode';
import { PokemonEvolutionResponse } from '@/api/api.type';
import styles from './pokemonEvolutionChainLayout.module.sass';

interface PokemonEvolutionChainLayoutProps {
  chain: PokemonEvolutionResponse | undefined;
  isUninitialized: boolean;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
}

const PokemonEvolutionChainLayout: React.FC<PokemonEvolutionChainLayoutProps> = ({
  chain,
  isUninitialized,
  isLoading,
  isError,
  isSuccess,
}) => {
  // useResizeObserver hook to get dimensions of container for the tree viz
  const containerRef = useRef(null);
  const dimensions = useResizeObserver(containerRef);
  return (
    <div
      ref={containerRef}
      data-testid="pokemon-evolution-chain-layout"
      className={styles.pokemonEvolutionChainWrapper}
    >
      {
        isError ? (
          <div>No Pokemon Evolution Details Found.</div>
        ) : null
      }
      {
        isSuccess && chain && dimensions?.width ? (
          <div
            data-testid="pokemon-evolution-tree"
            className={styles.pokemonEvolutionTreeWrapper}
          >
            <Tree
              data={chain.evolutions}
              collapsible={false}
              zoomable
              draggable
              dimensions={{
                width: dimensions?.width || 0,
                height: dimensions?.height || 0,
              }}
              translate={{
                x: dimensions?.width ? dimensions.width / 5 : 0,
                y: dimensions?.height ? dimensions.height / 2 : 150,
              }}
              pathFunc="straight"
              orientation="horizontal"
              nodeSize={{
                x: 150,
                y: 150,
              }}
              separation={{
                siblings: 1.5,
                nonSiblings: 2,
              }}
              depthFactor={200}
              // hasInteractiveNodes
              renderCustomNodeElement={({ nodeDatum }) => (
                <PokemonEvolutionChainNode
                  pokemonName={nodeDatum.name}
                />
              )}
            />
          </div>
        ) : null
      }
      <LoadingSpinner isLoading={isUninitialized || isLoading} />
    </div>
  );
};

export default React.memo(PokemonEvolutionChainLayout);
