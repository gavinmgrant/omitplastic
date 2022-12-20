# OmitPlastic

This full-stack app is designed to help people reduce plastic consumption by purchasing products with less plastic content. However, this full-stack e-commerce affiliate app that uses Next.js, Prisma, and MySQL can be adapted for other types of products. The affiliate marketing program used is [Amazon Associates](https://affiliate-program.amazon.com/). 

## Technology

* TypeScript - strongly typed programming language
* ReactJS - user interface library
* NextJS - React framework for production
* Tailwind CSS - CSS framework
* MySQL - relational database management system
* Prisma - database toolkit for PostgreSQL
* PlanetScale - database platform
* SWR - React hooks for data fetching
* Vercel - platform for deploying and hosting
* React Spring - component animations

## Setup

* Clone this repository to your local computer.
* Install the dependencies for the project: `npm install` or `yarn install`
* Create a free account and MySQL database on PlanetScale.
* Bootstrap a basic Prisma setup: `npx prisma init`
* Create the tables in the database using Prisma: `npx prisma db push`
* Open the `example.env` file and replace the dummy connection URL `DATABASE_URL` with `'mysql://root@127.0.0.1:3309/<DATABASE_NAME>'`
* Run the application locally: `npm run dev` or `yarn dev`
* Open `http://localhost:3000/` in your browser.
* To deploy to Vercel [read this](https://planetscale.com/docs/tutorials/deploy-to-vercel#deploy-to-vercel).

## Edit Database Schema

* Open the `schema.prisma` file.
* After you have made your changes, run `npx prisma db push` to update the database.
* Go here for more information about the [Prisma schema file](https://www.prisma.io/docs/concepts/components/prisma-schema).

## Edit Prisma Tables

* Run the command `npx prisma studio`
* This opens [Prisma Studio](https://www.prisma.io/studio).
