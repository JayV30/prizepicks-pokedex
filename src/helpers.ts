import { RawNodeDatum } from 'react-d3-tree';
import { ChainLink } from '@/api/api.type';

export const kebabToTitleCase = (str: string): string => (
  str.split('-').map((part) => (
    part.length > 0 ? part[0].toUpperCase() + part.slice(1) : ''
  )).join(' ').trim()
);

export const spaceToKebabCase = (str: string): string => (
  str.trim().toLowerCase().replace(/\s+/g, '-')
);

export const decimetresToFeetInches = (dm: number): string => {
  const inches = dm * 3.93701;
  let formatted = '';
  if (inches >= 12) {
    formatted += `${Math.floor(inches / 12)}'`;
  }
  if (inches % 12) {
    formatted += `${Math.floor(inches % 12)}"`.padStart(3, '0');
  }
  return formatted;
};

export const hectogramsToPounds = (hg: number): string => `${(hg / 4.536).toFixed(1)} lbs`;

export const getEvolutionChain = (chain: ChainLink): RawNodeDatum => {
  const { species, evolves_to: evolvesTo } = chain;
  const { name } = species;

  const node: RawNodeDatum = {
    name,
  };

  if (evolvesTo.length > 0) {
    node.children = evolvesTo.map((evolution) => getEvolutionChain(evolution));
  }

  return node;
};
