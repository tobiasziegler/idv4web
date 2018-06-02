# Interactive Data Visualization for the Web (2nd Edition) Exercises

This repository contains a set of data visualisations created using D3.js.
They were created as I worked my way through Scott Murray's book,
[Interactive Data Visualization for the Web (2nd ed.)](http://alignedleft.com/work/d3-book-2e).
This was a way for me to learn not only D3, but to also experiment with
setting up some modern build tools and writing code using ES6 features.

[The original code examples for the book](https://github.com/alignedleft/d3-book)
are available on GitHub and licensed under a [Creative Commons Attribution-NonCommercial-NoDerivs 3.0 Unported License](http://creativecommons.org/licenses/by-nc-nd/3.0/).

## Getting Started

1.  Fork, clone or download this repository
1.  Install the dependencies with `npm install`.
1.  Launch the development server with `npm start`.
1.  The project homepage should automatically open in your default browser,
    but if not then visit `http://localhost:8080`.

## Building and Deployment

- `npm run build` will create a production build in the `dist` folder
- `npm run publish` will create the production build and deploy it to the
  `gh-pages` branch - you must have permission to push to the remote repository

## Features and Libraries

This project uses [D3.js](https://d3js.org/) version 5, rather than version 4
as used in the book's code examples. The main difference is that asynchronous
operations (e.g., loading files with `d3.csv` or `d3.json`) now use Promises
rather than callback functions.

I've used [webpack version 4](https://webpack.js.org/) to bundle the files
involved in the project, with each page being defined by a sepaate entry point
and outputting its own code bundle. Common code dependencies (i.e., the D3
library itself) are put into a separate bundle so that after viewing one
visualisation, the common bundle should be cached and only the page-specific
code needs to be loaded to display the next visualisation.

[Babel](https://babeljs.io/) transpiles the JavaScript code so that the
visualiations can be created using ES2015+ code (arrow functions, template
literals, etc.) but displayed on browsers that don't support all of the new
syntax features.

Finally, [Prettier](https://prettier.io/) is included to keep the code
formatting consistent.
