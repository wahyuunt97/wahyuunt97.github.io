# Web Soundboard 🎶

A Single-File HTML interactive soundboard. Load your local audio files, bind them to custom keyboard shortcuts, and play them instantly!

## 🌍 URL Akses
Karena proyek ini di-hosting menggunakan GitHub Pages di repositori `wahyu_portfolio`, Anda bisa mengakses Soundboard ini di:

**👉 [https://wahyuunt97.github.io/sound-board](https://wahyuunt97.github.io/sound-board) 👈**

*(Catatan: Pastikan repositori Anda sudah di-set publik atau GitHub Pages-nya sudah aktif untuk folder `root` atau `docs`)*

---

## 🚀 Fitur

- **100% Client-Side:** Aplikasi ini hanya berupa antarmuka (UI). File suara Anda **TIDAK DIUNGGAH** ke internet, melainkan dimuat langsung ke memori browser untuk performa instan.
- **Custom Key Bindings:** Ubah *shortcut* keyboard untuk setiap pad sesuka hati (misalnya: `1`, `A`, `Space`, dll.).
- **Overlapping Audio:** Tekan tombol berkali-kali dengan cepat, suara akan tumpang-tindih (*overlap*) layaknya soundboard profesional!
- **Mode Loop 🔁:** Tersedia tombol *toggle* (ikon panah berputar) untuk memutar audio secara berulang tanpa henti.
- **Mode Lock 🔒:** Tersedia tombol *toggle* (ikon gembok) untuk mengunci pad agar suaranya **TIDAK BISA** dihentikan oleh tombol "Stop All".
- **Global Stop:** Tekan tombol **`Escape`** di keyboard atau tombol merah di atas untuk menghentikan semua suara yang sedang diputar (yang tidak di-*lock*).
- **Auto-Save:** Nama pad, pengikatan tombol (*keybinds*), status Loop, dan status Lock Anda disimpan otomatis di memori browser (`localStorage`). Jadi, saat Anda *refresh* halaman, pengaturannya tidak akan hilang!

---

## 💻 Cara Penggunaan

1. Buka URL Soundboard di atas.
2. Klik ikon **Gear (Pengaturan)** ⚙️ pada salah satu kotak (pad) untuk memuat file audio lokal dari komputer Anda (format yang didukung: `.mp3`, `.wav`, dll).
3. (Opsional) Klik pada nama pad (misalnya "Sound Pad 1") untuk **mengganti namanya**.
4. (Opsional) Klik tombol **"Bind Key"**, lalu tekan tombol di keyboard Anda untuk mengganti *shortcut*-nya.
5. Tekan tombol *shortcut* yang sudah ditentukan, atau klik kotaknya langsung untuk memutar suara!

*(Catatan: Demi alasan keamanan di semua browser modern, jika Anda me-refresh halaman, Anda harus memuat ulang file audionya secara manual melalui ikon gear. Namun, pengaturan nama pad & shortcut-nya akan tetap aman!)*

---

## 🛠️ Tools Lainnya

Jangan lupa cek juga *tool* berguna lainnya dari repositori ini:
- **[AI Prompt Generator](https://wahyuunt97.github.io/prompt-generator/)** - Aplikasi *offline* pembuat prompt AI praktis yang juga berjalan langsung di browser tanpa instalasi!
