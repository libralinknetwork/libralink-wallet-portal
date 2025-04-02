# Libralink Portal

[![CircleCI](https://dl.circleci.com/status-badge/img/circleci/3mRSbP89jqQQqkK78hQhCE/6C4hfQst43FZZf4WsZ8yBW/tree/main.svg?style=svg)](https://dl.circleci.com/status-badge/redirect/circleci/3mRSbP89jqQQqkK78hQhCE/6C4hfQst43FZZf4WsZ8yBW/tree/main)

## Running in development
### Install dependencies

```
nvm use 20
npm i
```

### Start the development server

```
npm start
```

In development, the app is run with `lerna`, which will run `npm start` in each
of the packages. Each of the apps can also be run individually by running `npm start`
in their respective folders (Provided you have also run their dependencies, e.g. you need
to run `libralink-portal-shared` to run `libralink-portal-wallet`).

To start the app with lerna, run in the root of the repository:
`npm start`

The same effect can be achieved by running `npm start` in each of the packages.

## Building for production
You need to deploy each application separately to their CDN or hosting service. 
The only configuration needed is to use the correct remote URLs in `.env` files in each of the packages, which would need to point to CDN or hosting service URLs instead of localhost URLs.

### .env 
```
LIBRALINK_PORTAL_SHARED_URL=http://localhost:4000
LIBRALINK_PORTAL_WALLET_URL=http://localhost:3002
```
