# Anayze Symbol History

This is an interview coding task. Check setup information below.

## Setup

1. Clone this repository.
2. Make sure you are using nove >= 20.
3. Run `npm install`
4. Signup on https://www.binance.com/ and get API_KEY and SECURE_KEY
5. Copy `.env.example` as `.env` and provide proper variables.
6. To run dev version run `npm run dev`
7. To run tests runb `npm run test' or for watch mode `npm run test:watch`

## What is missing and should be improved

- error handling - right now when fetching data fails the error is logged and empty array is returned, there should be some inform,ation for end user and correct http code (now is 200)
- caching/storing data - right now all data comes from api - there should be some caching layer or/and store data in local db to avoid calling api all the time. It will also help with showing old but true data when api fails
- fetching data tests are naive and are calling api. This should be mockd but in interview stress I failed to mock 'binanse.ts' module. That should not happen.
- rate limit - right now this app could be easly ddosed

## What I think went well

- application is following instructions
- business logic is separated from I/O layer
- minimal setup
- almost no dependencies (binance client could be replaced with fetch calls)
