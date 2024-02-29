# Waycheck

## Services

- localhost:3000 -> Users Service (/api -> Swagger Docs)
- localhost:6379 -> Redis
- localhost:5432 -> PostgreSQL
- localhost:5555 -> Prisma Studio (npm run db:studio, only in **local** dev)

After running `docker compose up -d` you should wait at least for 20 seconds.

## Answers

### Question 1 - What If

Since the server is stateless, we can use K8s.

The user will make GET requests (to update access/refresh tokens) more often than POST requests (for sign in and sign up). So reads will occur more often than writes. In this case, we can use a read-heavy NoSQL database like Redis for caching, and a SQL database like MySQL (it is better than PostgreSQL for reads).

For horizontal scaling Redis, we can apply distributed cache, and for MySQL (PostgreSQL), we can connecgt read-only replicas for horizontal scaling and more computer resources for vertical scaling.

Also I'd consider using a cloud provider (AWS/GCP) if we can't manage system on our servers.

### Question 2 - Social Login

From my experience and observations, signing up via our own data and via SSO creates 2 separate accounts in most systems. In case of using SSO, we can connect Passport.js library, create a different endpoint for each SSO, e.g. /google/oauth and /github/oauth and then let frontend's manage access/refresh tokens revocations (schemed below).

## System Design Diagram

<p align="center">
  <picture>
    <source media="(prefers-color-scheme: light)">
    <img src="./images/system_design.svg">
  </picture>
</p>

## Entity Relationship Diagram

<p align="center">
  <picture>
    <source media="(prefers-color-scheme: light)">
    <img src="./images/erd.svg">
  </picture>
</p>

## Social Login Sequence Diagram

<p align="center">
  <picture>
    <source media="(prefers-color-scheme: light)">
    <img src="./images/tokens_sd.svg">
  </picture>
</p>

## Useful Links

- https://datatracker.ietf.org/doc/html/rfc6749
