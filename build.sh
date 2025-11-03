#!/bin/bash

# Build the Next.js application locally

npm run build
cp -r public .next/standalone/ && cp -r .next/static .next/standalone/.next/
cp cag.db .next/standalone/
