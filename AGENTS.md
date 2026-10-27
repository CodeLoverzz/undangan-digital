
# AGENTS.md — Proyek Undangan Digital

## Peran AI
Bertindak sebagai partner developer untuk membantu membangun
website undangan pernikahan digital yang modern, responsif,
dan bisa digunakan berulang kali untuk banyak klien.

## Latar belakang proyek
- Pemilik proyek masih pemula dalam pemrograman.
- Pemilik memiliki minat dan kemampuan desain visual.
- Desain awal dibuat menggunakan Figma AI.
- Desain sudah diekspor ke PNG, tetapi belum tentu semua aset
  sudah dikumpulkan.
- Pemilik menggunakan Codex di VS Code dan masih pemula dalam
  pemrograman.
- Usahakan solusi gratis atau menggunakan layanan free tier.
- Saat mulai bekerja, periksa keadaan workspace terkini; jangan
  mengasumsikan proyek sudah selesai atau memakai struktur lama.

## Tujuan utama
Membangun platform undangan digital yang awalnya berupa satu
template, lalu bisa digunakan untuk banyak pasangan dengan
data dan tautan undangan masing-masing.

## Teknologi yang direncanakan
- React untuk komponen dan tampilan website.
- Vite untuk menjalankan dan membangun aplikasi.
- JavaScript untuk logika interaktif.
- CSS untuk styling dan animasi.
- Supabase sebagai opsi database untuk data pasangan, RSVP,
  dan ucapan tamu.
- Hosting dipilih kemudian berdasarkan biaya dan ketentuan
  penggunaan komersial.

Jangan memasang semua teknologi sekaligus tanpa kebutuhan.
Periksa keadaan workspace terlebih dahulu.

## Fitur undangan
1. Cover undangan dan tombol buka undangan.
2. Nama pasangan dan profil mempelai.
3. Nama tamu berdasarkan parameter URL.
4. Tanggal dan detail acara.
5. Countdown pernikahan.
6. Cerita pasangan.
7. Galeri foto.
8. Musik latar dengan kontrol play/pause.
9. Google Maps.
10. Informasi hadiah atau rekening.
11. RSVP dan ucapan tamu.
12. Dukungan banyak pasangan dengan data terpisah.
13. Dashboard admin sebagai pengembangan lanjutan.

## Prinsip pengembangan
- Dahulukan tampilan yang sesuai desain Figma.
- Prioritaskan tampilan mobile.
- Jangan mengarang detail desain yang belum diketahui.
- Gunakan aset asli dari pemilik jika tersedia.
- Hindari desain yang terlalu generik atau terlihat seperti
  hasil AI tanpa arahan desain.
- Buat komponen yang bisa digunakan ulang.
- Pisahkan data pasangan dari komponen tampilan.
- Jangan menaruh secret key atau kredensial privat di frontend.
- Jangan menambahkan dependensi tanpa alasan yang jelas.

## Status Workspace Saat Ini

- Proyek React dan Vite sudah tersedia. Periksa file yang ada
  sebelum mengubah struktur atau membuat ulang proyek.
- Data undangan dipisahkan ke `src/data/wedding.js`.
- Tampilan dan interaksi halaman berada di `src/App.jsx`;
  styling berada di `src/style.css`.
- Konfigurasi Vite ada di `vite.config.js`. File MP3 di folder
  aset dikecualikan dari watcher karena sebelumnya menyebabkan
  error file terkunci di Windows.
- Desain yang sudah dibuat mencakup sampul, pembuka, profil,
  hitung mundur, acara, cerita, galeri, hadiah, RSVP, ucapan,
  dan penutup. Gunakan PNG referensi di `UI-undangan/` untuk
  memeriksa kesesuaian visual.
- Foto yang tersedia berada di `public/assets/`. Dua gambar
  galeri adalah kolase dan saat ini digunakan dengan crop CSS.
- Detail acara dan rekening dikelola di `src/data/wedding.js`.
  Jangan menyalin informasi rekening ke dokumentasi, log, atau
  konfigurasi yang tidak diperlukan.
- Tanggal pernikahan yang dimasukkan adalah 16 April 2027.
  Tautan lokasi digunakan untuk akad dan resepsi; jam acara dan
  nama pemilik rekening belum diberikan.
- Cerita di data undangan adalah narasi contoh yang dimulai pada
  2025. Minta pemilik memeriksa kebenarannya sebelum publikasi.
- RSVP dan ucapan hanya berfungsi sementara di browser; keduanya
  belum terhubung ke database dan tidak menyimpan data.
- `public/assets/music.mp3` saat ini bukan audio MP3 yang dapat
  diputar. Ganti dengan file audio yang valid untuk mengaktifkan
  musik; mengganti ekstensi saja tidak mengubah format file.
- Validasi build yang tersedia: `npm run build`.

## Cara membimbing pemilik
- Gunakan bahasa Indonesia yang sederhana.
- Jelaskan istilah teknis saat pertama kali digunakan.
- Berikan langkah kecil, berurutan, dan mudah diuji.
- Untuk perintah terminal Windows, berikan perintah yang
  siap disalin serta jelaskan folder tempat menjalankannya.
- Jangan memberikan terlalu banyak langkah sekaligus.
- Sebelum mengubah file, periksa struktur dan isi proyek.
- Setelah perubahan, jelaskan file yang berubah dan cara
  menjalankan serta menguji hasilnya.
- Jangan menghapus atau menimpa file penting tanpa izin.
- Jika ada error, bantu diagnosis dari pesan error yang nyata.

## Langkah awal
1. Periksa isi workspace.
2. Pastikan apakah proyek React/Vite sudah ada.
3. Tanyakan atau periksa lokasi file PNG desain.
4. Tentukan aset yang benar-benar dibutuhkan.
5. Buat rencana implementasi sebelum menulis banyak kode.

Jangan langsung membangun seluruh website dalam satu langkah.
Mulai dari pemeriksaan proyek dan lanjutkan secara bertahap.

## Design System — Typography & Visual Style

### Typeface
- Primary heading / nama mempelai:
  Cormorant Garamond
- Body text / informasi / navigasi:
  Montserrat
- Gunakan Cormorant Garamond untuk memberi kesan elegan,
  romantis, editorial, dan premium.
- Gunakan Montserrat untuk keterbacaan informasi yang rapi,
  modern, dan mudah dibaca di layar HP.
- Jangan mengganti typeface tanpa alasan desain yang jelas.
- Periksa desain Figma/PNG terlebih dahulu. Jika desain asli
  menggunakan font berbeda, ikuti desain asli.

### Typography rules
- Nama mempelai menjadi fokus tipografi utama.
- Buat hierarki ukuran yang jelas antara judul, subjudul,
  informasi acara, dan teks pendukung.
- Hindari terlalu banyak variasi font, weight, dan ukuran.
- Perhatikan line-height, letter-spacing, dan panjang baris.
- Pastikan teks tetap terbaca pada layar mobile.
- Jangan menggunakan ALL CAPS secara berlebihan.
- Jangan memakai bold untuk semua teks.

### Visual direction
- Elegant, romantic, modern, editorial, dan minimal.
- Utamakan komposisi, whitespace, foto, dan tipografi.
- Hindari ornamen abstrak, bintang dekoratif, serta efek
  berlebihan yang tidak ada di desain referensi.
- Jangan membuat desain baru yang terlalu berbeda dari
  referensi Figma tanpa persetujuan pemilik.
