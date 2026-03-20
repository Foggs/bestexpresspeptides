#!/bin/bash
set -e

npm install --ignore-scripts
npx prisma db push --accept-data-loss
npx prisma generate
