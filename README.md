# Pokedex
### Introduction

Ash and his friends are on a new adventure to catch even more Pokemon! Before they set off on this journey they need some tools. As we all know every great Pokemon trainer needs a reliable Pokedex to identify Pokemon. It’s a good thing they have you! Ash has asked if you would be willing to build him a brand new Pokedex with core features and a couple of enhancements.

Of course, we've helped Ash and built him a Pokedex that he can use to become a legendary Pokemon trainer!

<p align="center">
  <img src="https://media.karlsven.dev/img/random/pikachu.png" alt="Surprised Pikachu" />
</p>

[Click here to view the live site](https://projects.karlsven.dev/pokedex)

## Application
This Pokedex was built with the following key libraries and tools:

 - [React](https://react.dev/reference/react) w/ [TypeScript](https://www.typescriptlang.org/docs/)
 - [Vite](https://vitejs.dev/) for builds/bundling
 - [Redux](https://redux.js.org/api/api-reference) via [Redux Toolkit](https://redux-toolkit.js.org/introduction/getting-started)
 - [RTK Query](https://redux-toolkit.js.org/rtk-query/overview) for HTTP requests and caching
 - [React Router](https://reactrouter.com/web/guides/quick-start) for routing
 - [D3 (`react-d3-tree`)](https://bkrem.github.io/react-d3-tree/docs/) for displaying the Pokemon evolution chain
 - [SASS modules](https://sass-lang.com/documentation/modules/) for styling (no CSS frameworks used)
 - Testing with [Vitest](https://vitest.dev/), [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/), [MSW](https://mswjs.io/docs)
 - Utilizes [PokeAPI](https://pokeapi.co/docs/v2) for Pokemon data

### Installation
Follow these steps to install and run the application locally:

 1. Clone the repository and navigate to the project directory
 2. Install dependencies with `npm install`
 3. Create a copy of the `._sample_env-cmdrc.json` file to `.env-cmdrc.json` and update the values (updating the values should not be necessary for local development / previewing)
 3. Run the application with `npm start`
 4. Navigate to `http://localhost:3000` in your browser

### Available commands
The following commands are available for use with this project:
- `npm start` - Runs the application in development mode using `development` environment variables
- `npm run build` - Builds the application for production using `production` environment variables
- `npm run preview` - Runs the application with a local server serving the build in `/dist`
- `npm test` - Runs the test suite
- `npm run coverage` - Runs the test suite and generates a coverage report

## Developer Notes

### Architecture
Main views/pages for the application are located in `src/views`. However, the Pokemon Detail view is a rendered into an `<Outlet />` in the Home view. The main purpose of this was to allow the Pokemon list scroll position to be easily maintained while viewing a Pokemon's details. It may be important to understand that `src/views/PokemonDetailView` is ultimately a child of `src/views/HomeView`.

### Features

#### Pokemon List
The Pokemon list is the first view that the users sees when landing at `/`. The list is loaded from the PokeAPI 20 items at a time using offset and limit query params, with infinite scroll. The response from the PokeAPI is transformed to the smallest form we need to cache with RTK Query. The resulting rendered list is virtualized using [`react-virtuoso`](https://www.npmjs.com/package/react-virtuoso) to improve performance.

The list returned from the PokeAPI does not have an image URL, which I wanted to display for each list item. So each item (`/src/components/PokemonBrowseListItem`) makes a request to the PokeAPI to get the Pokemon's details, which includes the image URL. This response is also transformed to a more minimal format, removing uneeded key/value pairs and normalizing the data. This data is then cached with RTK Query.

Note on [`react-virtuoso`](https://www.npmjs.com/package/react-virtuoso): I used this library due to the promise of easily being able to use different size list items. I had not used the library prior to this project. It generally works well, but I discovered a measurement bug that can sometimes cause the list to 'jump/jitter'. With more time I would investigate this further or use a different library.

#### Search Functionality
The search functions by submitting the search term appended to the PokeAPI URL. If there is no result, the user sees an error message. This is probably not ideal but it was the fastest way to implement search functionality with the PokeAPI (unless I missed some search endpoint?). I would improve on this by either implementing my own search endpoint or caching ALL pokemon names and IDs on the front end and using that to search and offer search suggestions.

Twenty items max are stored as a search history, which appears when the user focuses the search input. Individual search history items can be deleted, and the entire search history can be cleared by the user. Clicking a search history item directs the user to the Pokemon Detail view for that Pokemon. If a search history item is clicked, it is removed from the search history and added to the top of the list. This is done to prevent the same Pokemon from appearing in the search history multiple times.

The search history from the Redux store is persisted to browser storage (via [`localforage`](https://www.npmjs.com/package/localforage)) using a Redux middleware function. This was done to allow the search history to persist between sessions. A custom react hook is used to retrieve the search history from browser storage and update the Redux store on application mount.

#### Pokemon Detail
I'm somewhat unfamiliar with Pokemon, so I was unsure about what information was the most important and relevant to display in the Detail view. Users can view the following:
  - Pokemon name
  - Pokemon ID
  - Pokemon image
  - Pokemon types
  - Pokemon abilities
  - Pokemon evolution chain

Given more time, I would like to implement an image carousel for the various Pokemon images. Additionally, I would implement some sort of data visualization for the Pokemon's stats, but I didn't have a solid understanding of what the stat max values were.

The evolution chain took me by surprise, as I initially thought that the evolutions were linear and did not branch. I was halfway through implementing the evolution chain before I realized it was a tree structure. I refactored to use a tree structure and used [`react-d3-tree`](https://bkrem.github.io/react-d3-tree/docs/) to render the tree. This was the last feature I wrote and with more time I would improve on it with improved styling, a review of accessibility, and adding tests.

### Testing
I used [`vitest`](https://vitest.dev/) for testing, which is [`jest`](https://jestjs.io/) compatible and [`react-testing-library`](https://testing-library.com/docs/react-testing-library/intro/). I chose this library because configuration is easier for [`vite`](https://vitejs.dev/). I also used [`msw`](https://mswjs.io/docs) to mock HTTP requests.

I tested as much as I could, but some test that required more complex setups took up much of my time. Given more time, I would like to implement some sort of end to end testing like [`cypress`](https://www.cypress.io/) or [`playwright`](https://playwright.dev/).

Currently, these four components are not tested:
  - `src/components/PokemonDetail`
  - `src/components/PokemonDetailHeader`
  - `src/components/PokemonEvolutionChain`
  - `src/components/PokemonEvolutionChainNode`

I don't have much experience with automated testing, so I'm sure there are a number of things I could improve on. I would love to get feedback on this!

### Styling
I used SASS modules for styling. I chose this because I'm most familiar with SASS and I like the idea of having scoped styles. I did not use a CSS framework because I wanted to demonstrate my ability to write CSS from scratch. I also wanted to demonstrate my ability to write responsive CSS.

Side Note: A few years ago I switched to primarily using [ChakraUI](https://chakra-ui.com/getting-started) (which is based on [Emotion](https://emotion.sh/docs/introduction)) for styling. This allows for very rapid development and theming when building from scratch. I would have used ChakraUI for this project, but again, I wanted to demonstrate my ability to write CSS, not use a UI or styling library.

## Improvements and Conclusions
- Improvements:
  - I would implement a better solution for the search functionality. Either my own search endpoint or cache all Pokemon names and IDs on the front end to implement search suggestions.
  - Data visualization for the Pokemon's stats.
  - Image carousel for the various Pokemon images.
  - Improve testing and implement some sort of end to end like [Cypress](https://www.cypress.io/).
  - Change library for virtualized list rendering.

In regards to running in a concurrent environment, with the current implementation I would expect the application to run fine. Due to the use of RTK Query, we largely avoid any race conditions on the front end with data fetching. And since there is no need for creation or updates via API, there is no need to consider race conditions on the server for user submitted content.

While I'm not too experienced at scaling high traffic applications, I am aware of strategies such as caching, load balancing, and horizontal scaling. I would be interested in learning more about this and how to implement these strategies. I also researched the PokeAPI and found they use Cloudflare to cache responses, which allows them to handle a large amount of traffic for minimal cost.

This was a fun project! Thanks for taking the time to review it.