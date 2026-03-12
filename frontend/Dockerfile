# ---------- STAGE 1: Build ----------
FROM node:22-alpine AS build

# Set the working directory inside the container
WORKDIR /app

# Copy only package.json and package-lock.json (if exists) first to leverage Docker cache
COPY package*.json ./

# Install dependencies
RUN npm install

# Pass necessary build arguments
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

# Copy the rest of the frontend source code
COPY . .

# Build the application for production (this will generate the 'dist' folder)
RUN npm run build

# ---------- STAGE 2: Production (Nginx) ----------
FROM nginx:alpine

# Copy our custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the static files generated in the build stage to the Nginx directory
COPY --from=build /app/dist /usr/share/nginx/html

# Expose HTTP and HTTPS ports
EXPOSE 80
EXPOSE 443

# Command to start Nginx
CMD ["nginx", "-g", "daemon off;"]
