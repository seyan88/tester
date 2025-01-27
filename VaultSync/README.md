# VaultSync

## Ikhtisar
VaultSync adalah sistem manajemen file ringan yang dibangun dengan JavaScript native dan Node.js. Aplikasi ini mendemonstrasikan konsep inti seperti manajemen memori, operasi input/output, manipulasi file, dan keamanan dasar.

---

## Fitur Utama
- **Unggah File**: Unggah file langsung melalui browser.
- **Manajemen File**: Lihat file yang diunggah, termasuk metadata seperti ukuran dan waktu unggah.
- **Penghapusan File**: Hapus file dari server dengan satu klik.
- **Penyimpanan Metadata**: Menyimpan informasi file menggunakan metadata berbasis JSON.
- **Operasi Aman**: Membatasi operasi file untuk mencegah akses yang tidak sah.

## Fiture Tambahan
- **Log Aktivitas**: log Akivitas ke file berbeda mencakup (Upload,Dellet,Rename),.
- **Rename file**: Melakukan rename ke file 



---

## Persyaratan
- [Node.js](https://nodejs.org/) (v14 atau lebih tinggi)
- Browser modern (misalnya, Chrome, Firefox)
- [Laragon](https://laragon.org/) (untuk pengembangan lokal)
- [Visual Studio Code](https://code.visualstudio.com/download) (untuk pengeditan kode)

---

## Struktur Folder
```plaintext
project-folder/
├── server.js          // File utama server
├── fileStore.js       // Mengelola penyimpanan metadata
├── style.css          // Styling frontend
├── index.html         // Antarmuka frontend
├── uploads/           // Direktori untuk file yang diunggah
└── fileMetadata.json  // File JSON untuk menyimpan metadata
```

---

## Instalasi

### Langkah 1: Instalasi Laragon
1. Unduh Laragon dari situs resminya: [https://laragon.org/](https://laragon.org/).
2. Jalankan installer dan ikuti langkah-langkah berikut:
   - Pilih lokasi instalasi, misalnya `C:\laragon`.
   - Pilih komponen yang diperlukan (Full version direkomendasikan untuk pemula).
3. Setelah instalasi selesai, buka aplikasi Laragon dan klik **Start All** untuk memulai semua layanan.
4. Pastikan Laragon berjalan dengan baik dengan mengakses [http://localhost](http://localhost) di browser Anda.

### Langkah 2: Instalasi Visual Studio Code
1. Unduh Visual Studio Code dari situs resminya: [https://code.visualstudio.com/download](https://code.visualstudio.com/download).
2. Jalankan installer dan ikuti wizard instalasi:
   - Pilih lokasi instalasi (default: `C:\Program Files\Microsoft VS Code`).
   - Centang opsi "Add to PATH" untuk mempermudah akses dari terminal.
3. Setelah instalasi selesai, buka Visual Studio Code dan tambahkan ekstensi yang diperlukan seperti **Prettier**, **ESLint**, dan **Docker**.

### Langkah 3: Clone Repositori
1. Clone repositori VaultSync:
   ```bash
   git clone https://github.com/yastiaisyah/VaultSync.git
   cd VaultSync
   ```
2. Pastikan direktori `uploads/` ada:
   ```bash
   mkdir uploads
   ```

### Langkah 4: Instalasi Node.js
1. Pastikan Node.js sudah terinstal di sistem Anda. Cek dengan perintah:
   ```bash
   node -v
   ```
2. Jika belum terinstal, unduh dan instal Node.js dari [https://nodejs.org/](https://nodejs.org/).

3. Instal dependensi proyek:
   ```bash
   npm init -y
   ```

### Langkah 5: Menjalankan Server
1. Jalankan server dengan perintah berikut:
   ```bash
   node server.js
   ```
2. Buka browser Anda dan akses:
   ```
   http://localhost:3000/
   ```

---

## Dukungan Docker

### Membuat Docker Image

```bash
docker build -t node-file-server .
```

### Menjalankan Docker Container

```bash
docker run -p 3000:3000 -v C:/laragon/www/VaultSync:/usr/src/app --name file-server node-file-server
```

- **`-p 3000:3000`**: Memetakan port 3000 di host ke port 3000 di container.

### Menghentikan Container

```bash
docker stop file-server
```

### Menghapus Container

```bash
docker rm file-server
```

---

## File Utama

### 1. `server.js`
Mengelola logika server, termasuk unggahan, pengambilan, dan penghapusan file. Juga menyajikan file frontend (`index.html` dan `style.css`).

### 2. `fileStore.js`
Mengelola metadata untuk file yang diunggah, termasuk penyimpanan dan pengambilan metadata dari file JSON (`fileMetadata.json`).

### 3. `index.html`
Antarmuka frontend untuk berinteraksi dengan aplikasi.

### 4. `style.css`
Menyediakan desain UI yang sederhana dan bersih untuk aplikasi.

---

## API Endpoints

### `GET /`
Menyajikan halaman HTML utama.

### `GET /style.css`
Menyajikan file CSS untuk styling.

### `POST /upload`
Mengunggah file ke server.

### `GET /files`
Mengembalikan daftar file yang diunggah beserta metadata dalam format JSON.

### `POST /delete/:fileName`
Menghapus file tertentu dari server.

---

## Catatan Keamanan
- Pastikan direktori `uploads/` terlindungi dari akses tidak sah saat melakukan deployment ke produksi.
- Validasi file yang diunggah untuk mencegah konten berbahaya disimpan di server.
- Batasi akses ke rute server hanya untuk pengguna yang berwenang (pengembangan di masa depan).

---

## Lisensi
Proyek ini dilisensikan di bawah lisensi MIT. Anda bebas menggunakan, memodifikasi, dan mendistribusikan proyek ini sesuai kebutuhan.