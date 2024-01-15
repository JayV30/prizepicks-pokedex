import {
  http,
  HttpResponse,
} from 'msw';
import {
  pokemons1,
  pokemons2,
  jigglypuffDetail,
  pikachuDetail,
  jigglypuffSpecies,
  pikachuSpecies,
  jigglypuffEvolutionChain,
  pikachuEvolutionChain,
} from './mockResponses';

// Define request handlers and response resolvers for the tests.
const handlers = [
  // list of pokemons
  http.get('https://pokeapi.co/api/v2/pokemon', ({ request }) => {
    // Construct a URL instance out of the intercepted request.
    const url = new URL(request.url);

    // Read the URL query params using the "URLSearchParams" API.
    const limit = url.searchParams.get('limit');
    const offset = url.searchParams.get('offset');

    // Handle the query params to return the mocked response.
    if (limit === '20' && offset === '0') {
      return HttpResponse.json(pokemons1);
    }
    if (limit === '20' && offset === '20') {
      return HttpResponse.json(pokemons2);
    }
    if (!limit && !offset) {
      return HttpResponse.json(pokemons1);
    }
    return new HttpResponse(null, { status: 404 });
  }),
  // single pokemon detail
  http.get('https://pokeapi.co/api/v2/pokemon/:id', ({ params }) => {
    const { id } = params;
    switch (id) {
      case '39':
      case 'jigglypuff':
        return HttpResponse.json(jigglypuffDetail);
      case '25':
      case 'pikachu':
        return HttpResponse.json(pikachuDetail);
      default:
        return new HttpResponse(null, { status: 404 });
    }
  }),
  // single species detail
  http.get('https://pokeapi.co/api/v2/pokemon-species/:id', ({ params }) => {
    const { id } = params;
    switch (id) {
      case '39':
      case 'jigglypuff':
        return HttpResponse.json(jigglypuffSpecies);
      case '25':
      case 'pikachu':
        return HttpResponse.json(pikachuSpecies);
      default:
        return new HttpResponse(null, { status: 404 });
    }
  }),
  // single evolution chain detail
  http.get('https://pokeapi.co/api/v2/evolution-chain/:id', ({ params }) => {
    const { id } = params;
    switch (id) {
      case '16':
        return HttpResponse.json(jigglypuffEvolutionChain);
      case '10':
        return HttpResponse.json(pikachuEvolutionChain);
      default:
        return new HttpResponse(null, { status: 404 });
    }
  }),
];

export default handlers;
