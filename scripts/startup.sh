#!/bin/bash

sleep 20
npx prisma db push
node dist/main.js