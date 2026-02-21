# Build stage: install dependencies and compile the static site
FROM node:22-alpine AS build
WORKDIR /app
# Install deps using lockfile for repeatable builds
COPY package.json package-lock.json* ./
RUN npm ci
# Copy source and build
COPY . .
RUN npm run build

# Runtime stage: serve the static build with Nginx
FROM nginx:alpine
# Copy the built assets into Nginx's default web root
COPY --from=build /app/dist /usr/share/nginx/html
