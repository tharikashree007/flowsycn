#!/bin/bash
# Build script for Render deployment

# Install frontend dependencies and build
cd "project management system"
npm install
npm run build

# Move build files to backend public folder
mkdir -p ../backend/public
cp -r dist/* ../backend/public/

# Install backend dependencies
cd ../backend
npm install