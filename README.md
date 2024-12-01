# Overview
The application is a demonstration of a Weather App designed with the following functionalities in mind:
1. Location based weather details.
2. Favorites cart out of the box.
3. Searching functionality by city, country, zip code..etc.
4. Profile management.

The application is using nuxt3 with vite and vitest as a testing framework, along with pnpm as a package manager.

## Technical Decisions and Data Flow
In this application, I am using the localstorage as our main storage for the favorites cart, as it provides much larger
capacity than cookies, it's efficient and does not get sent by every request, finally it's more accessible in Pinia stores.

In terms of data flow, we always have a straight way to data fetch, which is through changes in the favorites cart, or triggering it from its interface.
This is giving us more control over our flow and let us easily contain any business logic required.

## Setup

Make sure to install dependencies:

```bash
pnpm install
```

## Application Tests

To run all the tests available:

```bash
pnpm run test
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
pnpm run dev
```

## Production

Build the application for production:

```bash
pnpm run build
```

Locally preview production build:

```bash
pnpm run preview
```