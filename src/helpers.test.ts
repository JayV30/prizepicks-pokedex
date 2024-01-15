import {
  describe,
  it,
  expect,
} from 'vitest';
import {
  kebabToTitleCase,
  spaceToKebabCase,
  decimetresToFeetInches,
  hectogramsToPounds,
  getEvolutionChain,
} from './helpers';

describe('kebabToTitleCase helper', () => {
  it('should convert kebab-case string to title case', () => {
    const input = 'foo-bar-baz';
    const expectedOutput = 'Foo Bar Baz';
    const result = kebabToTitleCase(input);
    expect(result).toEqual(expectedOutput);
  });

  it('should handle string with no hyphens', () => {
    const input = 'hello';
    const expectedOutput = 'Hello';
    const result = kebabToTitleCase(input);
    expect(result).toEqual(expectedOutput);
  });

  it('should handle leading/trailing hyphens in the input string', () => {
    const input = '-foo-bar-';
    const expectedOutput = 'Foo Bar';
    const result = kebabToTitleCase(input);
    expect(result).toEqual(expectedOutput);
  });

  it('should handle empty string input', () => {
    const input = '';
    const expectedOutput = '';
    const result = kebabToTitleCase(input);
    expect(result).toEqual(expectedOutput);
  });
});

describe('spaceToKebabCase helper', () => {
  it('should convert space-separated string to kebab-case', () => {
    const input = 'hello world';
    const expectedOutput = 'hello-world';
    const result = spaceToKebabCase(input);
    expect(result).toEqual(expectedOutput);
  });

  it('should handle leading/trailing spaces in the input string', () => {
    const input = '  test string  ';
    const expectedOutput = 'test-string';
    const result = spaceToKebabCase(input);
    expect(result).toEqual(expectedOutput);
  });

  it('should handle multiple consecutive spaces in the input string', () => {
    const input = 'this   is   a   test';
    const expectedOutput = 'this-is-a-test';
    const result = spaceToKebabCase(input);
    expect(result).toEqual(expectedOutput);
  });

  it('should handle empty string input', () => {
    const input = '';
    const expectedOutput = '';
    const result = spaceToKebabCase(input);
    expect(result).toEqual(expectedOutput);
  });
});

describe('decimetresToFeetInches helper', () => {
  it('should convert decimetres to feet and inches', () => {
    const input = 10;
    const expectedOutput = "3'03\"";
    const result = decimetresToFeetInches(input);
    expect(result).toEqual(expectedOutput);
  });

  it('should handle values with no feet', () => {
    const input = 3;
    const expectedOutput = '11"';
    const result = decimetresToFeetInches(input);
    expect(result).toEqual(expectedOutput);
  });

  it('should handle values with no inches', () => {
    const input = 3.048;
    const expectedOutput = "1'00\"";
    const result = decimetresToFeetInches(input);
    expect(result).toEqual(expectedOutput);
  });

  it('should return empty string if input is zero', () => {
    const input = 0;
    const expectedOutput = '';
    const result = decimetresToFeetInches(input);
    expect(result).toEqual(expectedOutput);
  });
});

describe('hectogramsToPounds helper', () => {
  it('should convert hectograms to pounds', () => {
    const input = 100;
    const expectedOutput = '22.0 lbs';
    const result = hectogramsToPounds(input);
    expect(result).toEqual(expectedOutput);
  });

  it('should handle values below 1 lb', () => {
    const input = 3;
    const expectedOutput = '0.7 lbs';
    const result = hectogramsToPounds(input);
    expect(result).toEqual(expectedOutput);
  });

  it('should handle values with no ounces', () => {
    const input = 4.53592;
    const expectedOutput = '1.0 lbs';
    const result = hectogramsToPounds(input);
    expect(result).toEqual(expectedOutput);
  });

  it('should handle zero value', () => {
    const input = 0;
    const expectedOutput = '0.0 lbs';
    const result = hectogramsToPounds(input);
    expect(result).toEqual(expectedOutput);
  });
});

describe('getEvolutionChain helper', () => {
  it('should return a react-d3-tree RawNodeDatum object', () => {
    const input = {
      species: {
        name: 'foo',
        url: 'https://example.com/foo',
      },
      evolves_to: [
        {
          species: {
            name: 'bar',
            url: 'https://example.com/bar',
          },
          is_baby: false,
          evolution_details: [],
          evolves_to: [],
        },
      ],
      is_baby: false,
      evolution_details: [],
    };
    const result = getEvolutionChain(input);
    expect(result).toEqual({
      name: 'foo',
      children: [
        {
          name: 'bar',
        },
      ],
    });
  });

  it('should handle linear evolutions', () => {
    const input = {
      species: {
        name: 'foo',
        url: 'https://example.com/foo',
      },
      evolves_to: [
        {
          species: {
            name: 'bar',
            url: 'https://example.com/bar',
          },
          is_baby: false,
          evolution_details: [],
          evolves_to: [
            {
              species: {
                name: 'baz',
                url: 'https://example.com/baz',
              },
              is_baby: false,
              evolution_details: [],
              evolves_to: [],
            },
          ],
        },
      ],
      is_baby: false,
      evolution_details: [],
    };
    const result = getEvolutionChain(input);
    expect(result).toEqual({
      name: 'foo',
      children: [
        {
          name: 'bar',
          children: [
            {
              name: 'baz',
            },
          ],
        },
      ],
    });
  });

  it('should handle branching evolutions', () => {
    const input = {
      species: {
        name: 'foo',
        url: 'https://example.com/foo',
      },
      evolves_to: [
        {
          species: {
            name: 'bar',
            url: 'https://example.com/bar',
          },
          is_baby: false,
          evolution_details: [],
          evolves_to: [
            {
              species: {
                name: 'baz',
                url: 'https://example.com/baz',
              },
              is_baby: false,
              evolution_details: [],
              evolves_to: [],
            },
          ],
        },
        {
          species: {
            name: 'bat',
            url: 'https://example.com/bar',
          },
          is_baby: false,
          evolution_details: [],
          evolves_to: [
            {
              species: {
                name: 'bap',
                url: 'https://example.com/baz',
              },
              is_baby: false,
              evolution_details: [],
              evolves_to: [],
            },
          ],
        },
      ],
      is_baby: false,
      evolution_details: [],
    };
    const result = getEvolutionChain(input);
    expect(result).toEqual({
      name: 'foo',
      children: [
        {
          name: 'bar',
          children: [
            {
              name: 'baz',
            },
          ],
        },
        {
          name: 'bat',
          children: [
            {
              name: 'bap',
            },
          ],
        },
      ],
    });
  });
});
