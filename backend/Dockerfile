# ---------- STAGE 1: Build ----------
FROM node:22-alpine AS build

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies (including devDependencies needed for TypeScript compilation)
RUN npm install

# Copy Prisma schema and generate Prisma Client
COPY prisma ./prisma/
RUN npx prisma generate

# Copy the rest of the backend source code
COPY . .

# Build the TypeScript project into JavaScript (creates the /dist directory)
RUN npm run build

# ---------- STAGE 2: Production ----------
FROM node:22-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install ONLY production dependencies to keep the image lightweight
RUN npm install --omit=dev

# Copy generated Prisma Client from the build stage
COPY --from=build /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=build /app/node_modules/@prisma ./node_modules/@prisma

# Copy the compiled code and the Prisma schema
COPY --from=build /app/dist ./dist
COPY --from=build /app/prisma ./prisma

# Expose the API port
EXPOSE 3000

# The command to execute when the container starts.
# Note: First runs migrations against the DB, then starts the Node server.
CMD npx prisma migrate deploy && node dist/index.js