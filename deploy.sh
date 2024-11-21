#!/bin/bash

# Navigate to the project directory
cd /var/www/altimetrik-career-path-web-app

# Pull the latest code
git pull origin main

# Install dependencies
npm install

# Build the project
npm run build

# Restart the app using PM2
pm2 stop altimetrik-career-path || true
pm2 start npm --name "altimetrik-career-path" -- start
pm2 save

