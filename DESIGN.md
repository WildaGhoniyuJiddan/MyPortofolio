# Portfolio Tracker — Design Specification

> Spesifikasi desain web portofolio yang memakai bahasa visual software Spidey Tracker buatan Ned Leeds dari *Spider-Man: Brand New Day*.
>
> Scope: **software/web UI saja**. Tidak ada desain HP, tablet, bezel, frame perangkat, atau mockup hardware.  
> Versi: 2.0  
> Tanggal riset: 14 Agustus 2026  
> Referensi visual utama: screenshot 504 × 452 px yang diberikan pengguna

## 1. Tujuan

Membuat web portofolio personal yang terasa seperti software pemantauan buatan programmer muda yang sangat cerdas: padat informasi, playful, responsif, dan personal. Bahasa desain mengambil inspirasi kuat dari screenshot Ned, tetapi isi, ikon, identitas, dan fungsi diubah menjadi milik pemilik portofolio.

Website bukan clone Spidey Tracker. Website adalah **Portfolio Tracker**: sebuah command center interaktif tempat pengunjung “melacak” proyek, kemampuan, pengalaman, dan status pemilik portofolio.

Target pengalaman:

- pengunjung memahami siapa pemilik portofolio dalam 5–10 detik;
- proyek terbaik dapat dibuka maksimal dalam dua interaksi;
- tampilan terasa unik dan sinematik tanpa mengorbankan keterbacaan;
- UI tetap berguna saat animasi dimatikan;
- desktop dan mobile mempertahankan identitas visual yang sama.

## 2. Sumber kebenaran

Urutan prioritas desain:

1. **Screenshot pengguna** — komposisi, warna, kepadatan, silhouette, dan hierarki visual.
2. **Kebutuhan portofolio** — isi dan usability selalu lebih penting daripada menyalin fungsi tracker secara literal.
3. **Materi resmi Samsung** — memvalidasi bahwa software buatan Ned memakai interface bergaya pixel art.
4. **Situs resmi Sony Pictures** — memvalidasi pola map, activity log, filters, confirmed/rumored markers, center map, global map, dan sound control.
5. **Google Maps Platform** — memvalidasi penggunaan customized map, custom markers, geolocation, dan detail lokasi pada versi web resmi.

### Batas kepastian

- Warna diperoleh dari foto layar dan terpengaruh pencahayaan serta white balance. Nilai HEX di dokumen ini adalah baseline visual, bukan token resmi film.
- Typeface dan sprite produksi asli tidak dipublikasikan. Font yang direkomendasikan adalah substitusi.
- Perspektif miring pada screenshot berasal dari foto. Layout web harus lurus dan tidak meniru distorsi foto.
- Ikon laba-laba, topeng Spider-Man, nama karakter, dan artwork resmi tidak digunakan sebagai identitas portofolio. Buat glyph dan maskot orisinal.

## 3. Konsep produk

### 3.1 Nama konsep

**Portfolio Tracker**

Nama dapat diganti dengan nama pemilik, misalnya:

- `[NAME] // PROJECT TRACKER`
- `[INITIALS] WORK INDEX`
- `PORTFOLIO SIGNAL MAP`

### 3.2 Metafora

Portofolio divisualisasikan sebagai peta sinyal:

- proyek = marker;
- kategori = profile/filter;
- pengalaman kerja = activity log;
- perjalanan karier = route/path;
- proyek unggulan = proximity alert;
- skill = telemetry;
- kontak = chat channel;
- proyek lama = archive;
- status mencari kerja/freelance = system status.

### 3.3 Kata kunci

`pixel-tech` · `portfolio map` · `DIY intelligence` · `comic utility` · `playful urgency` · `dense but scannable` · `modular telemetry`

### 3.4 Kepribadian

- **Cerdas, bukan korporat.** Terlihat dibuat oleh developer dengan sudut pandang personal.
- **Playful, bukan kekanak-kanakan.** Pixel art hadir pada bentuk dan motion, bukan lewat dekorasi acak.
- **Padat, bukan berantakan.** Banyak informasi disusun dalam cluster yang jelas.
- **Tactile.** Tombol terasa dapat ditekan melalui outline dan hard shadow.
- **Sedikit tidak sempurna.** Notched corner, panel bertumpuk, dan offset kecil membuat UI terasa buatan tangan.

### 3.5 Experience target — `AMAZING`

Website harus memberi kesan seperti membuka software superhero yang benar-benar hidup, sambil tetap jelas sebagai portofolio profesional. Efek “amazing” datang dari koreografi dan respons terhadap pengguna, bukan dari membuat semua objek bergerak bersamaan.

Target emosional per fase:

1. **Curiosity** — boot sequence singkat memperlihatkan grid, signal, dan web lines.
2. **Recognition** — nama, role, dan featured project langsung terbaca.
3. **Discovery** — marker, radar, dan jaring bereaksi terhadap pointer, scroll, touch, dan keyboard.
4. **Impact** — proyek unggulan dibuka melalui transisi sinematik yang tetap cepat.
5. **Trust** — case study, hasil, kontak, dan CV mudah ditemukan tanpa harus memahami gimmick UI.

Prinsip utama: **animated everywhere, distracting nowhere**. Selalu ada respons visual pada tindakan pengguna, tetapi hanya satu area yang menjadi pusat perhatian pada satu waktu.

## 4. Information architecture

| Area portofolio | Representasi visual | Isi minimum |
|---|---|---|
| Home | project map | nama, role, intro singkat, featured project |
| About | identity/profile panel | bio, lokasi/timezone, cara kerja, minat |
| Projects | map markers + detail drawer | thumbnail, masalah, solusi, role, stack, hasil, link |
| Experience | activity log/timeline | perusahaan/organisasi, posisi, periode, hasil |
| Skills | telemetry/profile filters | kelompok skill dan level berbasis bukti |
| Contact | chat/comms panel | email, LinkedIn/GitHub, form singkat |
| Archive | archived signals | eksperimen, proyek lama, mini builds |
| Resume | downloadable data file | tombol lihat dan unduh CV |

### 4.1 Urutan section halaman

Website sebaiknya berupa single-page experience dengan section yang dapat dinavigasi melalui left rail, keyboard, URL hash, dan scroll natural. Peta menjadi pusat visual, sedangkan section di bawahnya memperdalam cerita portofolio.

| Urutan | Section | Label UI | Tujuan dan isi |
|---:|---|---|---|
| 0 | Boot/Signal Intro | `SYSTEM READY` | sequence singkat grid, radar, dan web lines; boleh dilewati |
| 1 | Hero / Command Center | `HOME` | nama, role, value proposition, status availability, featured project, dan project map overview |
| 2 | About / Identity Signal | `ABOUT` | bio singkat, cara kerja, lokasi/timezone, prinsip, dan avatar/monogram orisinal |
| 3 | Featured Build | `LOCKED SIGNAL` | satu studi kasus utama dengan problem, kontribusi, hasil, stack, dan CTA |
| 4 | Project Network | `WORK` | semua project markers, filter kategori, cluster, radar, dan project drawer |
| 5 | Skills Telemetry | `STACK` | skill groups, tools, evidence level, dan hubungan skill ke project nyata |
| 6 | Experience Activity Log | `LOG` | timeline kerja, organisasi, pendidikan, achievement, dan milestones |
| 7 | Lab / Archive | `ARCHIVE` | eksperimen, mini builds, failed attempts, prototype, dan side projects |
| 8 | Contact / Open Channel | `CONTACT` | email, GitHub, LinkedIn, form singkat, availability, dan CTA kolaborasi |
| 9 | Footer / Signal End | `END OF TRANSMISSION` | resume link, copyright, social links, last updated, dan shortcut kembali ke Home |

#### 4.1.1 Isi minimum per section

**Hero / Command Center** harus menjawab “siapa kamu dan apa yang kamu buat” tanpa menunggu animasi selesai. Featured alert hanya mengarahkan perhatian; ia tidak boleh menjadi satu-satunya tempat informasi utama.

**About / Identity Signal** harus terasa seperti profile module, bukan paragraf panjang. Gunakan 3–5 fakta kuat, misalnya bidang utama, lokasi, pendekatan kerja, dan jenis kolaborasi yang dicari.

**Featured Build** menjadi halaman case study mini. Tampilkan outcome lebih dulu, lalu proses, stack, visual, dan link. Proyek ini juga menjadi marker coral terbesar di map.

**Project Network** menjadi section paling interaktif. Setiap marker harus memiliki nama, status, tahun, kategori, role, dan link detail. Sediakan list view sebagai fallback.

**Skills Telemetry** menghubungkan skill dengan bukti. Jangan membuat chart persentase dekoratif tanpa dasar; klik skill harus menyorot project yang memakai skill tersebut.

**Experience Activity Log** fokus pada kontribusi dan hasil, bukan hanya daftar jabatan. Filter berdasarkan tahun atau domain diperbolehkan.

**Lab / Archive** memperlihatkan rasa ingin tahu dan proses belajar. Labelkan dengan jujur sebagai `EXPERIMENT`, `WIP`, atau `ARCHIVED`.

**Contact / Open Channel** harus menjadi jalur paling mudah setelah project dibuka. Email dan social link terlihat sebelum form, dengan feedback success/error yang jelas.

#### 4.1.2 Hubungan section dengan peta

```text
HOME ──┬── ABOUT        → identity node
       ├── FEATURED     → coral signal + case study
       ├── WORK         → project marker network
       ├── STACK        → skill radar + filtered markers
       ├── LOG          → chronological route
       ├── ARCHIVE      → muted/gray markers
       └── CONTACT      → open communication channel
```

Pada desktop, section dapat tampil sebagai panel yang menggeser map secara halus. Pada mobile, map tetap menjadi header/overview lalu section berubah menjadi alur scroll vertikal yang lebih linear.

### 4.2 Navigasi primer

Navigasi tidak memakai navbar SaaS biasa. Gunakan left rail dengan ikon dan label saat hover/focus:

1. `HOME`
2. `WORK`
3. `LOG`
4. `ABOUT`
5. `CONTACT`

Setiap item memindahkan state aplikasi, menggeser/recenter peta, atau membuka panel—bukan mengubah website menjadi halaman dengan gaya berbeda.

## 5. Anatomi layar software

Gunakan viewport referensi hampir persegi dengan rasio sekitar **0,95 : 1** (lebar : tinggi). Rasio ini hanya kanvas software. Pada layar lebar, UI boleh diperluas dengan panel detail tanpa menambahkan bezel atau bentuk perangkat.

```text
┌────────────────────────────────────────────┐
│ PORTFOLIO MAP              STATUS MODULE   │
│                    ┌─ FEATURED SIGNAL ─┐   │
│                    │ featured project  │   │
│                    └───────────────────┘   │
│ L       clusters of project markers        │
│ E                                   RADAR  │
│ F       selected project / route           │
│ T                                          │
│ ─────────────────── status divider ─────── │
│ R      category filters     utility grid   │
│ A                                          │
│ I                                          │
│ L                                          │
└────────────────────────────────────────────┘
```

### 5.1 Proporsi acuan

| Area | Posisi | Proporsi | Fungsi portofolio |
|---|---|---:|---|
| Project map | atas, hampir selebar viewport | 68–72% tinggi | pusat eksplorasi proyek |
| Command tray | bawah | 22–27% tinggi | filter dan tindakan cepat |
| Left rail | kiri, overlap map/tray | 9–12% lebar | navigasi utama |
| Featured alert | atas-tengah, floating | 34–40% lebar | proyek unggulan atau availability |
| Status module | kanan-atas, floating | 27–33% lebar | role, timezone, availability, CV |
| Skill radar | kanan-bawah map | 17–21% lebar | ringkasan skill/filter aktif |

Semua panel harus terasa bagian dari satu aplikasi. Hindari card putih besar, glassmorphism, dan floating navbar modern.

## 6. Sistem warna

### 6.1 Token

| Token | Nilai awal | Peran |
|---|---|---|
| `--ink` | `#0E1033` | outline, teks utama, hard shadow |
| `--map-deep` | `#101B4F` | area peta paling gelap |
| `--map-navy` | `#111A62` | bidang dasar peta |
| `--map-blue` | `#3461A4` | blok/region peta |
| `--map-line` | `#3D63AB` | route, jalan, batas, grid |
| `--ui-cyan` | `#49C3FC` | command tray dan panel utama |
| `--cyan-highlight` | `#B8F1FE` | separator dan highlight terang |
| `--coral` | `#F38C7C` | featured/high-impact project |
| `--mint` | `#50DC9A` | live/shipped project dan status available |
| `--amber` | `#FCC780` | selected item dan utility action |
| `--paper` | `#F5EDC1` | badge netral dan note |
| `--disabled` | `#7DA3AF` | kontrol nonaktif/archive |

```css
:root {
  --ink: #0e1033;
  --map-deep: #101b4f;
  --map-navy: #111a62;
  --map-blue: #3461a4;
  --map-line: #3d63ab;
  --ui-cyan: #49c3fc;
  --cyan-highlight: #b8f1fe;
  --coral: #f38c7c;
  --mint: #50dc9a;
  --amber: #fcc780;
  --paper: #f5edc1;
  --disabled: #7da3af;
}
```

### 6.2 Semantik portofolio

| State | Warna | Makna |
|---|---|---|
| featured | coral | proyek paling penting/berdampak |
| shipped/live | mint | dapat dilihat atau digunakan |
| case study selected | amber + cyan center | proyek yang sedang dibuka |
| experiment | pale blue | eksplorasi atau proof of concept |
| archived | blue-gray | proyek lama/nonaktif |

Warna selalu dipasangkan dengan glyph dan label; jangan mengandalkan warna saja.

### 6.3 Aturan

- `--ink` menjadi outline bersama. Hindari hitam murni.
- Peta dibuat lebih redup daripada marker.
- Coral dan mint hanya digunakan pada informasi penting/interaktif.
- Amber menandai pilihan atau tindakan utilitas.
- Gunakan warna datar. Kedalaman berasal dari highlight satu sisi dan hard shadow, bukan gradient lembut.

## 7. Tipografi

### 7.1 Karakter

- uppercase untuk heading, status, dan label pendek;
- heading geometric-tech yang tegas;
- body humanist-condensed yang tetap nyaman untuk paragraf;
- data dan angka monospaced dengan ritme terminal;
- gunakan tiga keluarga font secara konsisten, tanpa menambah font dekoratif lain.

### 7.2 Hirarki

| Style | Font | Penggunaan | Ukuran minimum |
|---|---|---|---:|
| `Display / Heading` | **Orbitron** | nama, heading, featured alert | 20–42 px |
| `Body / Reading` | **Rajdhani** | bio, deskripsi, case study, helper text | 15–19 px |
| `UI / Data` | **Share Tech Mono** | tombol, tab, stack, tahun, status, angka, metadata | 10–14 px |

Kombinasi font final:

- **Orbitron** untuk headings dan display besar. Gunakan weight 600–800; jangan memberi efek glow berlebihan.
- **Rajdhani** untuk body agar teks panjang tetap ringan dan terbaca.
- **Share Tech Mono** untuk data, angka, label, tab, status, dan microcopy terminal.

Font tersebut adalah pilihan desain portofolio, bukan klaim bahwa font itu digunakan pada film.

Contoh pemuatan prototipe non-Next.js (produksi memakai `next/font/google`):

```css
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@500;600;700;800&family=Rajdhani:wght@400;500;600;700&family=Share+Tech+Mono&display=swap');

:root {
  --font-heading: 'Orbitron', system-ui, sans-serif;
  --font-body: 'Rajdhani', 'Arial Narrow', sans-serif;
  --font-data: 'Share Tech Mono', ui-monospace, monospace;
}

h1, h2, h3, .featured-alert {
  font-family: var(--font-heading);
}

body, .case-study-copy {
  font-family: var(--font-body);
}

button, .label, .status, .metadata, .metric {
  font-family: var(--font-data);
}
```

## 8. Geometri visual

- Base unit: 4 px; layout besar mengikuti kelipatan 8 px.
- Outline utama: 3 px.
- Outline detail: 2 px.
- Hard shadow: offset 3–5 px, blur 0.
- Corner radius: 0–4 px.
- Gunakan clipped/notched corner untuk variasi panel.
- Ikon pixel dibuat pada resolusi kecil lalu diperbesar dengan skala bilangan bulat.
- Terapkan `image-rendering: pixelated` pada sprite raster.
- Hit area boleh lebih besar daripada artwork pixel-nya.

Ketidakteraturan harus terkontrol. Gunakan satu atau dua detail seperti tab, notch, gerigi, baut digital, atau label bertumpuk pada setiap komponen—bukan seluruhnya sekaligus.

## 9. Komponen utama

### 9.1 Project map

Peta adalah hero section sekaligus indeks proyek. Ia tidak harus memakai peta kota nyata. Gunakan peta abstrak yang memadukan:

- jaringan jalan sebagai hubungan antarproyek;
- distrik sebagai kategori keahlian;
- route sebagai perjalanan karier;
- grid/crosshair sebagai telemetry dekoratif;
- label kecil sebagai tahun, stack, atau domain.

Contoh distrik:

- `WEB / FRONTEND`
- `BACKEND / SYSTEMS`
- `DATA / AI`
- `DESIGN / 3D`
- `EXPERIMENTS`

Urutan layer:

1. base/map deep;
2. region blocks;
3. routes and boundaries;
4. telemetry grid;
5. project markers;
6. selected marker;
7. skill radar;
8. alert dan status overlays.

### 9.2 Project marker

Silhouette memakai lingkaran bergerigi seperti ledakan komik atau sinyal abstrak, bukan logo laba-laba.

- Diameter: 34–46 px pada viewport referensi sekitar 900 px lebar.
- Outline: 2–3 px `--ink`.
- Glyph tengah mewakili kategori: code, data, cube, pen, server, atau link.
- Cluster boleh overlap 15–35%.
- Marker terpilih memakai ring amber/paper dengan pusat cyan.
- Hover/focus menampilkan nama proyek, tahun, role, dan status.

Klik marker membuka project drawer, bukan langsung meninggalkan halaman.

### 9.3 Featured project alert

Adaptasi banner `SIGHTING IN YOUR DIRECT VICINITY` menjadi elemen portofolio orisinal.

Pilihan microcopy:

```text
FEATURED BUILD
SIGNAL LOCKED
```

atau

```text
PROJECT IN RANGE
OPEN CASE STUDY
```

Spesifikasi:

- banner coral, outline navy, hard shadow;
- 2–3 baris teks;
- tiga glyph kecil di atas banner dapat mewakili role/stack utama;
- angka di kiri/kanan dapat menjadi tahun, impact metric, atau completion status;
- klik membuka proyek unggulan;
- banner tidak boleh menutupi marker terpilih pada viewport sempit.

### 9.4 Status module kanan-atas

Mengambil bentuk modul telemetry berlapis pada referensi, tetapi seluruh isinya adalah informasi portofolio:

- note tile: monogram/avatar orisinal;
- display mint: `AVAILABLE`, `OPEN TO WORK`, atau status saat ini;
- metadata: `UTC+7`, lokasi, role, atau response time;
- action kecil: `VIEW CV` atau `COPY EMAIL`.

Panel memakai metafora visual instrumen elektronik, tetapi tetap software. Jangan menggambar bezel, engsel, tombol fisik, atau body perangkat.

### 9.5 Skill radar

- Lingkaran navy transparan dengan grid polar/web abstrak.
- Sumbu mewakili kelompok skill, bukan skor kepribadian.
- Nilai hanya ditampilkan bila mempunyai dasar yang jelas.
- Saat filter kategori berubah, radar ikut menyorot skill relevan.
- Radar bersifat ringkasan; daftar skill tekstual tetap tersedia.

Hindari persentase seperti `JavaScript 95%` tanpa metodologi. Gunakan label berbasis bukti seperti `Primary`, `Production`, `Working Knowledge`, dan `Exploring`.

### 9.6 Left rail

Urutan yang direkomendasikan:

| Ikon | Label | Aksi |
|---|---|---|
| monogram | `HOME` | reset ke overview |
| marker/grid | `WORK` | tampilkan semua proyek |
| pulse/log | `LOG` | buka experience timeline |
| avatar | `ABOUT` | buka profile panel |
| chat | `CONTACT` | buka communication panel |

Gunakan ikon orisinal. Label penuh muncul saat hover, keyboard focus, atau rail dibuka.

### 9.7 Command tray

Bidang cyan di bawah map, dipisahkan oleh bar putih/cyan-highlight.

Kelompok filter kiri:

```text
ALL      FRONTEND
LIVE     BACKEND
LAB      DATA / 3D
```

Kelompok utility kanan mengikuti grid 2 × 3 dari referensi:

| Kolom kiri | Kolom kanan |
|---|---|
| `STACK` | `CONTACT` |
| `3D VIEW` | `ARCHIVE` |
| `CENTER` | `SHARE` |

Aturan:

- `3D VIEW` hanya aktif bila implementasi benar-benar memiliki mode 3D; selain itu tampil disabled atau hapus secara sadar.
- `CENTER` mengembalikan project map ke overview.
- `SHARE` menyalin URL portofolio atau URL project aktif.
- `STACK` membuka daftar skill yang accessible.
- `CONTACT` membuka panel kontak tanpa pindah konteks visual.

### 9.8 Activity log

Experience dan pencapaian ditampilkan sebagai log kronologis:

```text
2026.08  PROJECT SHIPPED      [PROJECT NAME]
2026.05  ROLE UPDATED         [ROLE / COMPANY]
2025.11  CERTIFICATION ADDED  [NAME]
```

Setiap entri dapat membuka detail, tetapi timeline harus tetap terbaca sebagai teks biasa dan dapat dinavigasi keyboard.

### 9.9 Project drawer

Drawer muncul dari kanan atau ditambatkan ke marker terpilih.

Isi wajib:

- nama dan satu kalimat outcome;
- role dan kontribusi pribadi;
- masalah yang diselesaikan;
- stack;
- 1–3 visual;
- hasil/metrik bila dapat dibuktikan;
- `VIEW LIVE`, `SOURCE`, dan `FULL CASE STUDY` bila tersedia.

Gunakan panel cyan/paper ber-outline navy. Jangan memakai modal putih generik.

### 9.10 Button states

| State | Perubahan |
|---|---|
| default | fill datar + outline + hard shadow |
| hover | naik 1–2 px atau highlight atas bertambah |
| pressed | bergeser 2–3 px menuju shadow |
| focus-visible | ring paper/cyan 2 px di luar outline |
| active | mint/coral + notch/check kecil |
| disabled | blue-gray, opacity 55–70%, tanpa motion |

## 10. Alur interaksi

### 10.1 First visit

1. Nama, role, dan one-line value proposition terlihat tanpa interaksi.
2. Project markers masuk bertahap.
3. Featured alert menunjuk proyek utama.
4. Pengunjung dapat memilih marker atau memakai left rail.
5. Detail proyek terbuka sebagai drawer sambil mempertahankan konteks map.

### 10.2 Eksplorasi proyek

1. Filter kategori dipilih.
2. Marker yang tidak relevan meredup, bukan hilang secara membingungkan.
3. Map recenter ke cluster yang relevan.
4. Hover/focus menampilkan summary.
5. Klik membuka drawer.
6. URL diperbarui agar project dapat dibagikan dan dibuka langsung.

### 10.3 Kontak

1. `CONTACT` membuka comms panel.
2. Email dan social links langsung terlihat.
3. Form maksimal memakai nama, email, dan pesan.
4. Success/error state mengikuti bahasa pixel UI.
5. Pengunjung dapat menutup panel dan kembali ke posisi map sebelumnya.

## 11. Motion dan feedback

### 11.1 Target animasi

- Terasa aktif sejak first paint tanpa menyembunyikan nama dan role.
- Mempertahankan gaya stepped/pixel-tech pada panel, marker, dan alert.
- Memakai gerakan lebih cair hanya pada web lines, route map, radar, dan partikel.
- Setiap hover, tap, focus, drag, filter, dan perubahan route memberikan feedback.
- Tidak ada animation loop dekoratif yang mengambil fokus lebih besar daripada konten proyek.
- Target utama 60 FPS pada perangkat modern; kualitas efek turun secara adaptif pada perangkat yang lebih lemah.

### 11.2 Koreografi pembuka

Intro maksimal sekitar 2,2 detik dan dapat dilewati. Konten penting sudah ada di DOM sejak awal.

| Fase | Waktu acuan | Visual |
|---|---:|---|
| boot | 0–350 ms | background grid dan telemetry menyala |
| scan | 250–800 ms | radar sweep pertama dan crosshair mencari posisi |
| connect | 550–1.200 ms | web lines menggambar hubungan antar-project marker |
| identify | 900–1.600 ms | nama, role, dan status module masuk bertahap |
| lock | 1.300–2.200 ms | featured marker ping dan alert `SIGNAL LOCKED` muncul |

Intro tidak boleh mengunci scroll, menahan link, atau harus diputar ulang setiap navigasi. Pada kunjungan berikutnya, gunakan versi ringkas 300–500 ms.

### 11.3 Motion dasar

Motion harus stepped dan mekanis, bukan spring animation yang terlalu licin.

- Marker masuk: scale `0 → 1.1 → 1` dalam 140–220 ms.
- Marker aktif: pulse outline setiap 1,2–1,8 detik.
- Radar sweep: satu putaran dalam 2–3 detik.
- Featured alert: slide 6–10 px + hard bounce singkat.
- Button press: translasi 2–3 px dan shadow collapse.
- Filter change: marker meredup/menyala kembali per cluster.
- Status display: scan line tipis atau pergantian karakter sesekali.
- Project drawer: stepped slide, tanpa blur panjang.

Hormati `prefers-reduced-motion`: hilangkan pulse, sweep terus-menerus, dan bounce; gunakan perubahan fill/outline.

Audio bersifat opsional dan default **off**. Bila dipakai, sediakan kontrol sound on/off yang selalu terlihat.

### 11.4 Target interaktivitas

#### Project map

- Pointer menggeser highlight grid dan menghasilkan parallax maksimum 4–8 px.
- Hover/focus marker menarik web line dari marker ke label proyek.
- Klik marker membuat radar mengunci lokasi, marker lain meredup, lalu project drawer terbuka.
- Drag/pan diperbolehkan pada map, tetapi tersedia tombol `CENTER` untuk reset.
- Cluster marker mengembang secara radial saat dipilih agar setiap proyek tetap dapat diakses.
- Scroll dapat menggerakkan route karier, tetapi tidak mengganti scroll native dengan scroll-jacking.

#### Panels dan controls

- Tombol mempunyai state idle, hover, pressed, focused, active, loading, success, error, dan disabled.
- Panel dapat ditutup dengan tombol, `Escape`, klik area aman, dan gesture swipe pada mobile.
- Filter mengubah marker, radar, route, counter, dan URL state secara serempak.
- Project drawer mempertahankan state map sehingga pengguna kembali ke posisi sebelumnya.
- Semua interaksi pointer mempunyai padanan touch dan keyboard.

#### Easter eggs

- Web node tersembunyi dapat membuka fun fact, mini build, atau achievement.
- Konami-like input atau klik sequence boleh memicu “hero mode” singkat, tetapi tidak menyembunyikan konten utama.
- Easter egg harus orisinal dan tidak memakai logo, topeng, suara, atau artwork resmi Spider-Man.

### 11.5 Sistem ikon dan jaring

Gunakan dua lapisan ikon:

1. **Utility icons** — navigasi, share, archive, contact, download, close. Basis dapat memakai Lucide, lalu disesuaikan stroke dan frame-nya.
2. **Signature icons** — web node, signal burst, project marker, radar blip, monogram maskot, category glyph. Semua dibuat khusus sebagai SVG orisinal.

Aturan signature icon:

- viewBox konsisten, misalnya `0 0 24 24` atau grid pixel 16 × 16;
- stroke navy tebal dengan ujung cenderung square;
- bentuk terbaca pada 16, 24, dan 32 px;
- spider-web memakai garis radial + concentric polygon, bukan logo laba-laba resmi;
- kategori mempunyai silhouette berbeda: code, server, data, cube/3D, design, dan experiment;
- state aktif dapat menambah coral/mint fill tanpa mengganti silhouette;
- SVG path diberi ID/kelas yang stabil agar dapat dianimasikan.

Motion ikon:

| State | Respons |
|---|---|
| idle | micro-pulse sangat pelan atau diam |
| hover/focus | garis jaring tergambar dari pusat ke luar |
| pressed | icon turun 2 px dan frame shadow collapse |
| active | node pusat menyala dan terhubung ke panel terkait |
| loading | radar sweep atau tiga node bergerak bergantian |
| success | web ring menutup penuh + mint flash satu kali |
| error | coral glitch dua frame, tanpa kedipan berulang |

### 11.6 Web connection engine

- Gunakan inline SVG untuk puluhan koneksi yang perlu diklik atau diberi label.
- Gunakan Canvas 2D untuk partikel, debris digital, atau ratusan garis non-interaktif.
- Hitung ulang endpoint saat layout berubah dengan `ResizeObserver`.
- Web line aktif mengikuti selected project; garis lain turun ke opacity 15–30%.
- Animasi draw memakai `stroke-dasharray`/`stroke-dashoffset` atau `pathLength`.
- Jangan membuat garis mengikuti pointer setiap frame pada mobile.
- WebGL/3D hanya dipakai untuk satu hero scene khusus bila efeknya benar-benar meningkatkan cerita.

### 11.7 Sound dan haptic feel

- Default audio off; status mute disimpan secara lokal.
- Sound palette: boot tick, radar ping, marker lock, button click, drawer open, success chirp.
- Durasi sound pendek dan volume rendah; tidak ada musik autoplay.
- “Haptic feel” pada web dibuat secara visual melalui button depression, snap, overshoot pendek, dan hard-shadow collapse.

### 11.8 Performance choreography

- Prioritaskan `transform`, `opacity`, dan SVG stroke properties.
- Pause radar, particles, dan animation loop ketika tab tidak terlihat atau elemen offscreen.
- Batasi device pixel ratio Canvas/WebGL, idealnya maksimum 1,5–2.
- Lazy-load project media, heavy animation modules, dan optional 3D scene.
- Hindari membaca layout lalu menulis style berulang dalam frame yang sama.
- Tetapkan animation quality mode: `full`, `balanced`, dan `reduced`.
- `prefers-reduced-motion` otomatis memilih `reduced`, tetapi pengguna tetap dapat mengubahnya.
- Jika FPS turun konsisten, matikan partikel lebih dulu, kemudian parallax, lalu radar loop; navigasi dan feedback tombol tetap aktif.

## 12. Responsive behavior

### Viewport referensi

- Project map sekitar 70% tinggi.
- Seluruh overlay tampil penuh.
- Command tray memiliki dua kelompok horizontal.

### Viewport sempit

- Map menjadi latar utama setinggi viewport.
- Left rail menjadi icon-only bottom/side rail.
- Command tray berubah menjadi bottom sheet dua tingkat.
- Featured alert diperkecil dan tidak menutupi nama/role.
- Status module menjadi satu badge yang dapat dibuka.
- Project drawer menjadi full-height sheet.

### Viewport lebar

- Jangan meregangkan map secara paksa ke rasio 16:9.
- Pertahankan komposisi map dan gunakan ruang tambahan untuk project drawer atau activity log.
- Area tambahan harus menjadi bagian software, bukan ilustrasi perangkat.

## 13. Aksesibilitas

- Nama, role, value proposition, dan jalur menuju proyek unggulan harus tersedia sebelum animasi selesai.
- Area klik minimum 44 × 44 CSS px.
- Teks UI minimum 11–12 px; body minimum 15–16 px.
- Semua ikon memiliki accessible name dan tooltip.
- Marker dibedakan dengan warna, glyph, dan label.
- Sediakan list view untuk semua proyek sebagai alternatif map.
- Semua fungsi dapat digunakan dengan keyboard.
- Focus state terlihat jelas.
- Dekorasi telemetry disembunyikan dari screen reader.
- Radar, pulse, scanline, dan suara dapat dihentikan.
- Jaga kontras informasi penting minimal setara WCAG AA.

## 14. Content rules

- Headline harus menjelaskan profesi, bukan hanya slogan estetis.
- Setiap proyek dimulai dari outcome, bukan daftar teknologi.
- Hanya tampilkan metrik yang dapat dibuktikan.
- Jelaskan kontribusi pribadi pada proyek tim.
- Jangan menggunakan placeholder sebagai konten final.
- Jangan memberi rating persentase skill tanpa metode.
- Gunakan istilah konsisten: `PROJECT`, `BUILD`, `LOG`, `STATUS`, `ARCHIVE`, `CONTACT`.

Contoh hero copy:

```text
[NAME]
FULL-STACK DEVELOPER / CREATIVE CODER

I BUILD FAST, USEFUL, AND VISUALLY DISTINCT
WEB EXPERIENCES.
```

## 15. Pedoman implementasi visual

### 15.1 Stack rekomendasi

| Layer | Teknologi | Tanggung jawab |
|---|---|---|
| framework | Next.js App Router + TypeScript | routing, SEO, server/client boundary, project pages |
| styling | Tailwind CSS 4 + CSS custom properties | layout, responsive rules, design tokens |
| cinematic motion | GSAP + ScrollTrigger | boot sequence, scroll choreography, map routes, radar timeline |
| UI motion | Motion for React | hover/tap/focus, drawer, layout transition, SVG path animation |
| visual network | inline SVG | interactive web lines, marker, radar, icons |
| ambient effects | Canvas 2D | particles dan scan/debris layer |
| utility icons | Lucide React | ikon generik yang kemudian diselaraskan dengan style |
| optional 3D | Three.js + React Three Fiber | hanya untuk hero scene/project constellation khusus |
| content | typed TypeScript data + MDX | project metadata dan long-form case study |
| media | `next/image` + static SVG | gambar responsif, thumbnail, dan vector asset |

Dependency inti:

```bash
npm install gsap motion lucide-react
```

Dependency 3D opsional:

```bash
npm install three @types/three @react-three/fiber
```

### 15.2 Pembagian ownership animasi

- **GSAP** memiliki page-level timeline, scroll-linked sequence, map route, radar, dan intro.
- **Motion** memiliki component-level transition, gesture, hover/tap/focus, drawer, dan list reordering.
- **CSS** memiliki state sederhana seperti color, shadow, dan pressed offset.
- **SVG** memiliki interactive web/path yang perlu semantics atau hit testing.
- **Canvas** hanya memiliki ambient visuals yang tidak perlu dibaca screen reader.
- Jangan membuat GSAP dan Motion mengontrol property yang sama pada elemen yang sama.

### 15.3 Strategi rendering

- Home, metadata proyek, dan navigasi dirender sebagai HTML agar SEO dan accessibility tetap kuat.
- Hanya komponen interaktif memakai client boundary.
- SVG utama dirender inline agar path dapat dianimasikan dan diberi event.
- Canvas/WebGL dimuat setelah konten utama siap dan tidak boleh memblokir first interaction.
- Mode 3D harus mempunyai fallback 2D yang lengkap.
- Project aktif dan filter disimpan pada URL agar dapat dibagikan.

### 15.4 Font loading

Dalam implementasi Next.js, muat Orbitron, Rajdhani, dan Share Tech Mono melalui `next/font/google`, bukan CSS `@import`, agar font di-self-host, preload lebih terkontrol, dan layout shift dapat diminimalkan. CSS `@import` pada bagian tipografi hanya contoh prototipe non-Next.js.

### 15.5 Lakukan

- Jadikan map sebagai pusat pengalaman dan indeks proyek.
- Gunakan ikon SVG/sprite orisinal dengan silhouette konsisten.
- Gunakan nearest-neighbor scaling untuk sprite raster.
- Pertahankan outline navy dan hard shadow.
- Simpan kategori/status marker sebagai data, bukan class yang ditulis manual.
- Pertahankan URL state untuk project/filter aktif.
- Pisahkan decoration layer dari hit area.
- Uji dengan mouse, keyboard, touch, reduced motion, dan zoom 200%.

### 15.6 Hindari

- bezel, frame HP/tablet, engsel, body perangkat, atau mockup hardware;
- logo laba-laba/topeng Spider-Man sebagai identitas;
- glassmorphism, blur, gradient neon, dan rounded card ala SaaS;
- sudut membulat besar;
- peta realistis penuh label yang mengalahkan proyek;
- animasi halus berlebihan;
- perspektif miring dari foto;
- intro panjang yang menahan akses ke konten;
- efek 3D berat jika tidak menambah fungsi;
- mengorbankan body copy demi font pixel.

## 16. Acceptance criteria

Desain dianggap berhasil bila:

- terlihat sebagai software portofolio, bukan gambar perangkat;
- nama, role, dan nilai utama langsung terbaca;
- map gelap, bidang UI cyan, marker coral/mint, left rail, alert, radar, dan command tray terbaca sebagai satu sistem;
- proyek unggulan dapat dibuka maksimal dalam dua interaksi;
- section Home, About, Featured Build, Work, Skills, Experience Log, Archive, Contact, dan Footer mempunyai tujuan serta jalur navigasi yang jelas;
- project markers mempunyai state featured, live, selected, experiment, dan archive yang jelas;
- detail proyek tetap nyaman dibaca walau shell UI bergaya pixel;
- seluruh ikon dan identitas visual orisinal;
- boot sequence, web lines, radar, marker, panel, dan drawer membentuk satu koreografi yang konsisten;
- setiap hover, tap, focus, filter, dan pemilihan project memberikan feedback yang jelas;
- signature web icons terbaca pada ukuran kecil dan mempunyai state idle, active, loading, success, serta error;
- efek ambient turun kualitasnya secara otomatis sebelum fungsi utama terganggu;
- target 60 FPS tercapai pada perangkat modern dalam mode `full` atau `balanced`;
- `3D VIEW` tidak dibuat aktif tanpa fitur nyata;
- mobile tidak sekadar mengecilkan layout desktop;
- list view, keyboard navigation, reduced motion, dan focus state tersedia;
- website tetap berguna bila JavaScript animation gagal;
- tidak ada dekorasi bezel/frame perangkat di luar UI.

## 17. Sumber riset

- [Samsung Newsroom Indonesia — Samsung Luncurkan Pengalaman Spidey Tracker](https://news.samsung.com/id/samsung-luncurkan-pengalaman-spidey-tracker-menjelang-spider-man-brand-new-day) — konteks resmi bahwa software dibuat Ned untuk melacak Spider-Man dan diperluas menjadi pengalaman interaktif.
- [Samsung Newsroom Brasil — Spidey Tracker dan antarmuka pixel art](https://news.samsung.com/br/samsung-entra-em-acao-em-homem-aranha-um-novo-dia-da-sony-pictures) — secara eksplisit mendeskripsikan interface sebagai pixel art.
- [Sony Pictures — Spidey Tracker](https://spideytracker.net/) — nomenklatur dan pola resmi seperti activity log, sightings, map filters, center/global map, archive-like content, dan sound control.
- [Google Maps Platform — Building the Spider-Man: Brand New Day Spidey Tracker](https://mapsplatform.google.com/resources/blog/discover-peter-parkers-world-building-the-sony-pictures-spider-man-brand-new-day-spidey-tracker/) — customized map, advanced markers, geolocation, dan detail lokasi pada versi web resmi.
- [The Direct — First look at Ned's Spider Tracker](https://thedirect.com/article/spider-man-brand-new-day-ned-upgrade) — sumber sekunder untuk membaca label dan struktur kontrol pada artwork.

### Referensi teknologi

- [Next.js — App Router](https://nextjs.org/docs/app) — struktur aplikasi, server/client components, routing, dan navigation.
- [Tailwind CSS — Theme variables](https://tailwindcss.com/docs/theme) — design tokens untuk warna, font, spacing, shadow, breakpoint, dan animation utilities.
- [GSAP — ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/) — scrub, pin, snap, responsive scroll choreography, dan timeline callbacks.
- [Motion for React](https://motion.dev/docs/react) — layout animation, gestures, enter/exit state, scroll, dan SVG animation.
- [React Three Fiber — Introduction](https://r3f.docs.pmnd.rs/getting-started/introduction) — renderer React untuk Three.js pada optional 3D layer.
- [Lucide](https://lucide.dev/) — utility SVG icons yang tree-shakable dan dapat dikustomisasi.

---

### Ringkasan satu kalimat

**Portfolio Tracker adalah web portofolio berbentuk software peta pixel-tech: proyek menjadi sinyal, pengalaman menjadi activity log, skill menjadi telemetry, dan identitas pemilik tetap menjadi informasi pertama yang terlihat.**
