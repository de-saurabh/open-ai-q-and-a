# OPEN AI Based Basic Question Answer service

## Technologies used
1. Node JS
2. TypeScript
3. KOA
4. TypeORM
5. Open AI


## Steps to run the project
1. Install [node](https://nodejs.org/en/download/package-manager), [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) and [postgres](https://www.postgresql.org/download/)
2. Create an empty db
3. Update app-data-source.ts with the db details. Since an ORM has been used the tables will be created on its own.
4. This project uses OPEN AI so an Open AI API Key is required. As of writing this, Open AI has discontinued its paid service as a minimun wallet load of 5 USD is required to use its APIs. Set this key in `.env`.
5. In the env file we can also opt for different models and temperature
6. Since it is a TypeScript project we need to compile it first so run `tsc`
7. Now we run `npm run server` to start the service
8. Postman Collection for the APIs [here](https://api.postman.com/collections/36309739-a5630012-00da-4dd7-9940-b08b332946bc?access_key=PMAT-01J09A7ZTDX1EKJ5NQNZJC9J6C)
