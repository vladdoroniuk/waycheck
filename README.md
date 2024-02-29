# Waycheck

## Services

- localhost:3000 -> Users Service (/api -> Swagger Docs)
- localhost:6379 -> Redis
- localhost:5432 -> PostgreSQL
- localhost:5555 -> Prisma Studio (npm run db:studio, only in **local** dev)

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

## Access/Refresh Token Sequence Diagram

<p align="center">
  <picture>
    <source media="(prefers-color-scheme: light)">
    <img src="./images/tokens_sd.svg">
  </picture>
</p>

## Social Sign In Sequence Diagram

<p align="center">
  <picture>
    <source media="(prefers-color-scheme: light)">
    <img src="./images/social_signin_sd.svg">
  </picture>
</p>

## Useful Links

- https://datatracker.ietf.org/doc/html/rfc6749
