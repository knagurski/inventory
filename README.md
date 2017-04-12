# Inventory
[![Build Status](https://travis-ci.org/knagurski/inventory.svg?branch=master)](https://travis-ci.org/knagurski/inventory)

> Simple sample application to explore the use of Vue.js and some new techniques.

## Build Setup

``` bash
# install dependencies
npm install

# install dependencies using yarn
yarn install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

## Notes
Being a sample project to explore some new technologies and techniques I've
decided to keep things relatively simple. Item persistence is via the
`LocalStorage` api, but has natural points, off which synchronisation with a
server is possible.

I've also chosen to keep browser support to primarily Chrome. Firefox should be
fine, but, at the time of writing, doesn't provide a built-in date picker for
the `Date Available` element.

I would love to add support for adding item photos via a drag-drop interface and
may revisit to do so. My plan was to capture a photo using a `file` input and
the `FileReader` API, then put that into a `canvas` element, resize to 200x200,
and extract the result, encoding as a data uri which could be stored with the
item. Currently sample item images are loaded (randomly) from
[LoremPixel](http://lorempixel.com).

I decided to forgo keyboard integration at this stage, but would love to revisit
to allow navigation using arrow keys, deleting using the `delete` key and dialog
dismissal using the `esc` key.

I've chosen to store the price as an integer for simplicity and accuracy. When
displayed the price is converted to a string representation with 2 decimal places.
