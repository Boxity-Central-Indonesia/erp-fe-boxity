# ==============================
# STEP 1: Build React App
# ==============================
FROM node:20 AS build

# Set working directory
WORKDIR /app

# Copy package.json dan package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy seluruh source code
COPY . .

# Build aplikasi untuk produksi
RUN npm run build

# ==============================
# STEP 2: Serve dengan Nginx
# ==============================
FROM nginx:alpine

# Hapus konfigurasi default Nginx
RUN rm -rf /usr/share/nginx/html/*

# Copy hasil build React ke Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom Nginx config (opsional)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
