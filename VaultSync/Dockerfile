# Gunakan base image Node.js versi terbaru
FROM node:16-alpine

# Tentukan working directory dalam container
WORKDIR /usr/src/app

# Salin package.json dan package-lock.json (jika ada)
COPY package*.json ./

# Instal dependencies
RUN npm install

# Salin seluruh kode aplikasi ke dalam working directory
COPY . .

# Expose port 3000 untuk mengakses aplikasi
EXPOSE 3000

# Jalankan aplikasi
CMD ["node", "server.js"]