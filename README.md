---
title: HackerNews ExpressJS Prisma
description: An ExpressJS server that uses Prisma to connect to a PostgreSQL database
tags:
  - express
  - postgresql
  - prisma
  - typescript
---

# HackerNews ExpressJS Prisma

This is an [ExpressJS](https://expressjs.com/) REST API that uses [Prisma](https://www.prisma.io/) to connect to a Postgres database and CRUD HackerNews posts.

[![codecov](https://codecov.io/gh/MatiasAgelvis/expressjs-prisma/branch/main/graph/badge.svg?token=7OESZNZ04T)](https://codecov.io/gh/MatiasAgelvis/expressjs-prisma)  
[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template/LqCw_O)

## 📚 Stack

- Prisma
- Express
- Postgres
- TypeScript

## 🖥 Local Development

- Install dependencies `yarn install` or `pnpm install`
- Setup a local Postgres instance ([How To](https://www.prisma.io/dataguide/postgresql/setting-up-a-local-postgresql-database))
- Migrate the database `yarn migrate:dev`
- Run the Server app `yarn dev`


## 💁‍♀️ Deploy to Railway

- Install dependencies `yarn` or `pnpm`
- [Provision a Postgres container on Railway](https://dev.new)
- Connect to your Railway project with `railway link`
- Migrate the database `railway run yarn migrate:dev`
- Run the Server app `railway run yarn dev`

## 📝 Notes

REST API for HackerNews posts related to NodeJS. The available routes are:

- `GET /posts` gets a list of posts, has the following query parameters:
  - `page` : number, gets a different list of results
  - `author` : string, gets a list of posts by the author
  - `title` : string, gets a list of posts that contain the query title
  - `tag` : string, gets a list of posts that have the given tag
- `GET /posts/:id` gets a post by id
- `DELETE /posts/:id` deletes a post by id, once deleted that post wont reappear on the DB
