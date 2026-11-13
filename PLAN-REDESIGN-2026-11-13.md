# Rencana Redesign MyPortofolio — "Signal Network, Naik Kelas"

Disusun oleh: Muse (peran: Senior UI/UX Designer)
Tanggal: 13 November 2026
Status: RENCANA — belum ada kode yang diubah. Menunggu keputusan Dan per nomor di Bagian 7.
Sumber pelajaran: studi REA atas ekawahyu-portofolio.vercel.app (laporan: `~/workspace/rea-analysis/ekawahyu-portfolio/LAPORAN-UI-UX-ANIMASI.md`)
Basis audit: repo MyPortofolio lokal — `app/page.tsx` (962 baris), `app/globals.css` (1.141 baris), DESIGN.md v2.0, PRD Signal Network.

---

## 1. Diagnosis singkat (jujur, sebagai senior)

Portofolio Dan sekarang TIDAK kalah identitas dari ekawahyu — malah lebih orisinal:
konsep **Portfolio Signal Network** (command center, biru PlayStation `#003791` + cyan `#52bfd8`,
Orbitron/Rajdhani/Share Tech Mono, radar/scanline/ticker, WebLoader boot, canvas AmbientNetwork,
drawer + terminal, 17 keyframes CSS, sudah ada `prefers-reduced-motion`).

Yang kalah dari ekawahyu BUKAN tampang, tapi **pengalaman scroll**:
- Motion Dan sekarang dekoratif-lokal (looping: radar, ping, bob, scan) dan reveal sederhana via IntersectionObserver. Tidak ada narasi yang digerakkan scroll.
- Ekawahyu menang di *scroll storytelling*: hero parallax pinned, section horizontal yang di-pin, timeline yang menyala mengikuti fokus scroll. Pengunjung merasa "sedang melakukan perjalanan", bukan "sedang membaca halaman".
- Konten Dan sudah basi dibanding CV final Nov 2026: proyek masih bernama WorL / LAMAN-YP / AI Routing System, belum ada WorthBang Android sebagai featured, belum ada 3 proyek TEMBUSIN versi final, tidak ada status KP. Untuk tujuan utama portofolio saat ini (lamaran KP), ini masalah nomor satu — di atas animasi.

**Prinsip redesign: curi TEKNIKNYA, bukan GAYANYA.**
Gaya ekawahyu (navy generik, Verdana, glass pill, smiley) kalau ditempel ke Signal Network akan membunuh identitas Dan. Teknik scroll-nya yang kita transplantasi, diterjemahkan ke bahasa sinyal.

## 2. Peta adopsi dari ekawahyu

| Elemen ekawahyu | Putusan | Terjemahan ke Signal Network |
|---|---|---|
| Hero parallax berlapis, kontainer 180–225vh, visual sticky | **ADOPSI (inti redesign)** | "Descent into the Network": lapis grid HUD → langit gradasi + siluet skyline SVG (BUKAN foto stok — lihat Bagian 5B) → web/radar rings → judul SIGNAL NETWORK. Scroll = kamera turun ke jaringan. |
| Judul hero tenggelam lalu muncul saat scroll | **ADAPTASI** | Judul tidak ditenggelamkan (itu kelemahan ekawahyu: konteks hilang). Judul Dan tetap terbaca dari awal, yang bergerak adalah lapis di sekitarnya + status bar berubah "SCANNING → SIGNAL LOCKED". |
| Smooth scroll inertia (Lenis) | **ADOPSI BERSYARAT** | Hanya jika digabung GSAP ticker (pola resmi Lenis+ScrollTrigger) DAN lulus uji iOS. Ekawahyu sendiri kena laporan bug scroll iPhone — kita tidak mewarisi bug itu tanpa uji. Alternatif aman: tanpa Lenis, cukup ScrollTrigger + `scroll-behavior: smooth` untuk anchor. (Keputusan 3) |
| Section portfolio di-pin, scroll vertikal → gerak horizontal | **ADAPTASI (desktop saja)** | "Signal Route": proyek featured berjalan horizontal seperti rute di peta saat halaman di-pin. Di mobile (<900px) WAJIB fallback tumpukan vertikal biasa — pin horizontal di HP adalah sumber masalah ekawahyu. |
| Timeline menyala-redup mengikuti fokus scroll | **ADOPSI** | Experience Log: baris yang sedang di fokus = "SIGNAL LOCKED" (cyan terang, marker menyala), baris lain redup. Ini nyaris gratis secara teknis (IntersectionObserver yang sudah ada, rasio tengah viewport) dan dampaknya besar. |
| Nav pill kaca + indikator karakter pindah-pindah | **ADAPTASI SEBAGIAN** | Bentuk pill kaca: TOLAK (bukan bahasa Signal). Yang diadopsi: indikator aktif yang BERGERAK mengikuti section — versi Dan: penanda segitiga/chevron cyan + label mono yang meluncur di nav rail yang sudah ada. Smiley: TOLAK, ganti glyph web orisinal milik Dan yang sudah dirancang di DESIGN.md. |
| Transisi rute fade-dari-hitam | **ADOPSI (pengganti boot loader)** | WebLoader "STABILIZING SIGNAL NODES..." sekarang menahan pengunjung tiap kunjungan. Ganti: fade hitam 300–400ms + progress tipis, boot penuh hanya kunjungan pertama sesi (sessionStorage), selalu bisa dilewati dengan klik/ketuk. |
| Folder cards membuka fan-out | **ADAPTASI** | Dipakai bukan sebagai folder, tapi "Archive Dossiers": sertifikat/penghargaan (Datathon RISTEK UI x OpenAI, Gemini Certified) tampil sebagai berkas yang membuka kipas. Jumlah item kecil, cocok. |
| Easter egg foto berubah (Spider-Man) | **ADAPTASI** | Dan sudah punya bahannya: glyph web + maskot orisinal. Easter egg versi Dan: klik foto profil → mode "WEB-SLINGER" sesaat (web-lines menggambar di foto + bunyi 8-bit Web Audio yang SUDAH direncanakan di PRD). Jangan pakai topeng Spider-Man (IP + PRD Dan sendiri melarangnya). |
| Buku tamu komentar Supabase real-time | **TOLAK untuk sekarang** | Alasan senior: (1) tujuan portofolio sekarang = HRD KP, buku tamu publik = risiko komentar asal tampil di depan rekruter; (2) beban moderasi + backend baru; (3) ekawahyu membuktikan risikonya nyata (komentarnya penuh "gacor king" dan keluhan lag). Kalau nanti mau bukti sosial, bentuk amannya: kutipan testimoni terkurasi, statis. Bisa dievaluasi ulang setelah musim KP. (Keputusan 6) |
| Background WebGL shader (2 canvas) | **TOLAK menambah** | Dan sudah punya AmbientNetwork canvas. Dua canvas shader + GSAP + pin = resep lag ekawahyu. Aturan redesign: maksimal SATU canvas ambient aktif, dan ia berhenti (pause) saat keluar viewport. |
| Tiga mesin animasi sekaligus (GSAP+Lenis+Framer Motion) | **TOLAK pola ini** | Pilih SATU mesin scroll: GSAP + ScrollTrigger saja. Framer Motion tidak masuk (React Dan cukup dengan GSAP + CSS + IO). Ini keputusan performa terpenting di rencana ini. |
| Palet navy `#050510` + Verdana | **TOLAK total** | Identitas Dan (PS blue, cyan, Orbitron/Rajdhani/Share Tech Mono) dipertahankan penuh. Tidak ada satu pun warna/font ekawahyu yang pindah. |
| Halaman detail proyek terpisah + breadcrumb | **ADOPSI (sudah setengah ada)** | Drawer detail yang sekarang ditingkatkan jadi pola case-study penuh: masalah → peran → proses → hasil → tautan live/repo, dengan pola "Lihat selengkapnya" inline ala ekawahyu untuk teks panjang. Route terpisah hanya jika drawer mulai sesak. |

## 3. Yang DIROMBAK (struktur berubah besar)

1. **Hero / Command Center** — dari panel statis beranimasi loop menjadi panggung parallax pinned 200vh (desktop) / 150vh (mobile, lapis dikurangi): 3–4 lapis (HUD grid belakang, skyline, web-radar, konten depan). Akhir scroll hero memicu status "SIGNAL LOCKED // OPERATOR IDENTIFIED" yang sekarang sudah jadi copy Dan — dijadikan momen, bukan teks diam.
2. **Project Network** — featured projects (maks 4) menjadi "Signal Route" horizontal pinned di desktop; proyek sisanya tetap grid di bawahnya. Urutan featured mengikuti CV final: (1) WorthBang Android, (2) Landing Page Kompetisi TEMBUSIN, (3) Dashboard UTM TEMBUSIN, (4) Website Resmi TEMBUSIN (yapresindo.com + braindicator.com).
3. **Experience Log** — dari daftar log statis menjadi timeline fokus-scroll (locked/redup) dengan garis rute vertikal yang "terisi" cyan mengikuti progress scroll section.
4. **Boot / WebLoader** — dirombak total per Bagian 2 (fade singkat, sekali per sesi, skippable).

## 4. Yang DIUBAH (isi & poles, struktur tetap)

1. **Konten sinkron CV final** (sumber kebenaran: CV revisi 12 Nov 2026):
   - Nama proyek lama (WorL, LAMAN-YP, "AI Routing System", "Design System Protocol") diganti nama & deskripsi final CV. Klaim yang Dan hapus dari CV (React tanpa bukti, angka 410 test, kalimat "sedang mencari KP" sebagai kalimat CV) TIDAK dimunculkan lagi di web.
   - Pengalaman: Software Engineer (Magang) TEMBUSIN dengan 3 luaran terverifikasi (PageSpeed 95+, yapresindo.com, braindicator.com).
   - `/cv.pdf` diganti file PDF CV final terbaru.
2. **Status bar global**: tambah satu baris status mono di hero — domisili Yogyakarta + IPK 3,81 + ketersediaan KP mulai 4 Januari 2027 (sesuai keputusan periode KP Dan). Ini yang paling dicari HRD, sekarang belum ada di web.
3. **Tipografi hierarki**: judul section diperbesar bertahap ala ekawahyu (display besar, tracking rapat) tapi tetap Orbitron; body Rajdhani dinaikkan ukuran dasarnya 1px demi keterbacaan HRD yang membaca cepat.
4. **CTA**: tombol "Download CV" + "Hubungi" dibuat tetap terlihat (sticky mini-CTA muncul setelah hero dilewati) — sekarang kontak baru ditemukan di ujung halaman.
5. **Skills Telemetry**: kelompok skill diselaraskan dengan CV final (Data & Backend, Tools & Metode dengan spasi/enter yang benar — pelajaran dari revisi CV), React dicoret bila tetap tanpa bukti proyek.

## 5. Yang DIHAPUS (dan kenapa)

1. **Nama & data proyek lama** yang tidak lagi dipakai di CV (WorL, LAMAN-YP sebagai label utama) — membingungkan HRD yang membandingkan web vs CV.
2. **Animasi loop yang bertabrakan**: dari 17 keyframes, yang dipertahankan hanya yang punya fungsi (radar, scan, ticker, nodePulse, dataReveal). Loop dekoratif ganda pada elemen yang sama (breathe + bob + float bersamaan) dipangkas jadi satu per elemen — mengurangi kerja paint terus-menerus.
3. **Boot loader panjang pada kunjungan ulang** (lihat rombak #4).
4. **Aset gambar kota duplikat/berat** yang tidak terpakai setelah hero baru dipilih (repo sekarang menyimpan 6+ foto kota malam; hero hanya butuh 1–2, sisanya arsipkan keluar dari bundle publik).
5. **Copy berbau contoh/referensi** dari repo tracker referensi bila masih ada sisa di teks halaman (PRD Dan sendiri mewajibkan ini; diverifikasi saat implementasi).

## 5B. Strategi aset gambar (keputusan Dan, 13 Nov 2026 — mengikat)

Dan menilai gambar di portofolio sekarang terlalu random. Audit membuktikan dia benar:
repo menyimpan 7 foto stok kota malam New York dari Pexels (±5,1 MB) yang tidak ada
hubungannya dengan Dan (orang Yogyakarta, tidak pernah ke NYC), hanya 2 yang benar-benar
dipakai kode (`city-aerial-night.jpg` 1,2 MB, `pexels-nyc-night.jpg` 504 KB), sisanya
mubazir. `og.png` juga 1,47 MB.

**Aturan baru — setiap gambar di situs wajib lolos salah satu dari dua pintu:**
1. **Gambar yang berhubungan dengan Dan**: foto dirinya (`aku.jpg` yang sudah ada, foto
   kegiatan/organisasi bila Dan menyuplai), atau BUKTI KERJA NYATA: screenshot aplikasi
   WorthBang Android (set screenshot laporan sudah ada di Drive "WorthBang Screenshots
   Laporan"), tangkapan layar yapresindo.com & braindicator.com (situs live, bisa
   ditangkap saat implementasi), dashboard UTM.
2. **Bukan gambar sama sekali → warna gradasi**: permukaan kartu/hero memakai sistem
   gradasi dari palet Signal sendiri (biru `#003791` → cyan `#52bfd8`; ink `#041024` →
   `#071936`; varian aksen per kartu yang sudah ada: cyan/red/green/amber), DITAMBAH
   tekstur identitas Dan yang sudah jadi aset SVG-nya (hud-grid, circuit-board,
   web-radial, scanline) supaya gradasi tidak terasa polos/kosong.

Konsekuensi ke rencana:
- Lapis "skyline foto" pada hero parallax (Rombak #1) DIGANTI: langit gradasi ink→biru
  + siluet skyline SVG gambar sendiri bergaya HUD + grid. Tidak ada foto stok di hero.
- Kartu proyek: prioritas screenshot asli proyek; proyek tanpa screenshot tampil sebagai
  "dossier cover" gradasi + inisial mono besar + ikon teknologi — konsisten, tidak asal comot.
- HAPUS dari repo: 5 foto stok tak terpakai (`city-lights-bokeh`, `nyc-buildings`,
  `nyc-skyline-night`, `pexels-nyc-skyline`, `pexels-nyc`) + 2 yang sedang dipakai diganti
  per aturan di atas. Total buangan ±5,1 MB — bonus performa gratis.
- `og.png` dibuat ulang: gradasi Signal + nama + judul, target < 300 KB.
- Ikon teknologi & glyph SVG (react, python, radar, web-*, dll) BUKAN termasuk yang
  diganti — itu ikon identitas/fungsi, bukan foto random.

## 6. Fase pengerjaan (ada gerbang review di tiap fase)

- **Fase 0 — Fondasi konten** (tanpa animasi baru): sinkron data proyek/pengalaman/skill/CV/status KP. Hasil: halaman yang sama, isi benar. Gerbang: Dan cek teks.
- **Fase 1 — Mesin scroll**: pasang GSAP + ScrollTrigger (satu mesin), matikan reveal IO lama yang tumpang tindih, tetapkan budget performa: JS animasi tambahan ≤ 90KB gzip, tidak ada canvas kedua, semua animasi scroll pakai transform/opacity saja, `prefers-reduced-motion` = semua pin/parallax mati total.
- **Fase 2 — Hero parallax "Descent into the Network"** + boot loader baru + indikator nav bergerak.
- **Fase 3 — Signal Route (portfolio horizontal desktop + fallback mobile)** + Experience fokus-scroll + sticky CTA.
- **Fase 4 — Sentuhan akhir**: Archive Dossiers (sertifikat fan-out), easter egg foto, audit aksesibilitas (kontras teks redup, fokus keyboard, aria untuk pin section), uji perangkat: Android Dan + iPhone (pinjaman/simulasi) khusus menguji bug scroll ala ekawahyu, Lighthouse (target: Performance ≥ 85 desktop, ≥ 70 mobile; kalau gagal, Lenis yang pertama dicabut).
- **Publish tetap aturan lama**: setiap publish/update portofolio menunggu approval one-tap Dan. Tidak ada yang naik diam-diam.

Risiko utama & mitigasi:
- Pin + smooth-scroll di iOS Safari → diuji di Fase 4; fallback mematikan pin di iOS bila bermasalah (deteksi sederhana, bukan hack berat).
- Satu file `page.tsx` 962 baris akan membengkak → implementasi memecah komponen hero/route/log ke file sendiri sejak Fase 2.
- Stack hosting sekarang (vinext/Cloudflare) — GSAP/Lenis adalah library client biasa, tidak mengubah jalur deploy.

## 7. Keputusan untuk Dan (jawab nomornya saja)

1. **Arah konsep**: (A) Signal Network dipertahankan + transplantasi teknik scroll ekawahyu [REKOMENDASI], atau (B) rombak total mengikuti gaya ekawahyu?
2. **Hero parallax pinned 200vh**: gas, atau cukup parallax ringan tanpa pin (scroll tetap normal, lapis bergerak relatif)?
3. **Lenis**: (A) coba Lenis+GSAP dengan syarat lulus uji iOS, atau (B) tanpa Lenis selamanya (lebih aman, rasa inertia hilang)?
4. **Portfolio horizontal pinned**: desktop saja + fallback mobile [REKOMENDASI], atau tidak sama sekali (tetap grid + drawer seperti sekarang, hanya ditambah fokus-scroll)?
5. **Konten featured**: urutan 4 proyek versi CV final (WorthBang Android, Landing TEMBUSIN, Dashboard UTM, Website Resmi TEMBUSIN) — setuju? PRAMANA dan MAMAS: tampil sebagai proyek sekunder, atau tidak tampil sama sekali (mengikuti nasibnya di CV)?
6. **Buku tamu Supabase**: tolak sekarang [REKOMENDASI], atau tetap mau sebagai fase lanjutan setelah KP?
7. **Boot loader**: ganti fade singkat sekali-per-sesi [REKOMENDASI], atau pertahankan boot penuh sebagai ciri khas?
8. **Easter egg foto Web-Slinger**: kerjakan di Fase 4, atau coret dari rencana?

Setelah Dan menjawab, implementasi jalan per fase dengan gerbang review — tidak langsung sekaligus.

## 8. Keputusan Dan (13 November 2026 — FINAL, mengikat implementasi)

1. **Arah: A** — Signal Network dipertahankan + transplantasi teknik scroll ekawahyu, DENGAN SYARAT Dan: **warna dibuat minimalis**. Terjemahan eksekusi: palet dipangkas jadi basis ink/navy + biru `#003791` + cyan `#52bfd8` sebagai SATU aksen utama + putih/muted untuk teks. Merah/hijau/amber TURUN pangkat jadi warna status kecil saja (dot, label state), tidak lagi jadi aksen kartu/section bergantian seperti sekarang. Gradasi aset (Bagian 5B) juga hanya memakai rentang ink→biru→cyan ini.
2. **Hero parallax: PINNED dipakai** (kontainer ±200vh desktop, visual sticky, sesuai Rombak #1).
3. **Lenis: dipakai — "yang penting aesthetic"** (kata Dan). Gerbang uji iOS di Fase 4 TETAP berlaku sebagai syarat publish: kalau Lenis terbukti merusak scroll iPhone, ia dicabut sebelum publish (keputusan rasa tetap aesthetic, keputusan teknis tetap aman).
4. **Portfolio horizontal pinned: mengikuti rekomendasi** — desktop pinned, mobile fallback vertikal.
5. **Konten featured: urutan CV final disetujui. PRAMANA dan MAMAS TAMPIL, dibedakan sebagai kategori "Proyek Kuliah"** — terpisah jelas dari proyek featured/profesional (section atau filter tersendiri, label "Proyek Kuliah" eksplisit), bukan dicampur setara TEMBUSIN/WorthBang.
6. **Buku tamu Supabase: DITOLAK.** Tutup, tidak dievaluasi ulang kecuali Dan sendiri yang membuka lagi.
7. **Boot loader: mengikuti rekomendasi** — fade hitam singkat, sekali per sesi, skippable.
8. **Easter egg foto Web-Slinger: BOLEH, di fase terakhir (Fase 4).**

Status rencana: DISETUJUI dengan keputusan di atas. Implementasi mulai dari Fase 0 atas aba-aba Dan.

KOREKSI DAN (13 Nov 2026, 17:56 — mengikat, membatalkan butir status KP di Bagian 4): web portofolio isinya PENGALAMAN, bukan lamaran KP. TIDAK ada penyebutan KP/Kerja Praktek, tanggal mulai, IPK, atau ketersediaan di situs. Status bar hero yang sempat ditambahkan Fase 0 WAJIB dihapus total (dikerjakan worker Fase 2); audit Fase 4 ikut memeriksa nol sisa penyebutan KP di seluruh situs.
