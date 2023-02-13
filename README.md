# Google Books

## Description

This project showcases the use of the Google Books API to search for specific categories of books or to make any query you want and see which books come up. It also has a filter feature to select only books of a certain price range or that have a certain format.

The web page is also fully responsive being able to be displayed in any screen size, from very small (mobile) through medium (tablet) to regular size (desktop).

## Deploy

This application has been deployed to the following url: https://google-books-ecru.vercel.app/

## Technologies

This project features a few technologies:

### ChakraUI:

Chakra was the choice for component library. Even though it is a fully fledged component library, it also serves as a "CSS in JS" library in the sense that it is highly customizable and does not get in the way of making a complete design from scratch. Another very useful feature from Chakra that was used in this project was the responsivity feature. It is very easy to apply responsive styles when you use Chakra components.

### NextJS:

It was used mainly as a boilerplate, since no server side rendering features have been used. Also, deploying to Vercel is free and is very trivial when you use NextJS.

### Redux Toolkit (RTK)

This technology was chosen mainly for the paginated requests using RTK Query. It makes it very easy to manage data fetching state. Also Redux itself is a very powerful tool for managing state.

### Jest

Jest was the test framework of choice for making the unit tests for this application.

## How to Run

To run the project, first you'll need to install all dependencies. It can be done using `yarn` (recommended) by running:

```
yarn
```

Or using `npm`:

```
npm i
```

Then, to run a **development version**, you can run:

`yarn`

```
yarn dev
```

`npm`

```
npm run dev
```

Or you can build the project and run a static server:

`yarn`

```
yarn build && yarn start
```

`npm`

```
npm run build && npm start
```
