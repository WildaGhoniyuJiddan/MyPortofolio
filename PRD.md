# PRD — Portfolio Signal Network

**Status:** Draft siap implementasi  
**Tanggal:** 15 Agustus 2026  
**Pemilik produk:** Portfolio owner  
**Target:** Website portofolio interaktif dengan visual dan pola interaksi yang setia pada software di repo `spiderman-tracker`

## 1. Ringkasan produk

Portfolio Signal Network adalah website portofolio pribadi yang terasa seperti ruang kendali jaringan: pengunjung membuka briefing singkat, membaca peta sinyal proyek, menyaring pengalaman, membuka detail case study, lalu menghubungi pemilik portofolio melalui kanal komunikasi yang jelas.

Referensi utamanya adalah repository [ganend060805-dotcom/spiderman-tracker](https://github.com/ganend060805-dotcom/spiderman-tracker), terutama struktur software di folder `app/`: map-first dashboard, navigation rail, activity log, panel modal, ticker, terminal console, radar, marker state, dan Web Audio synthesizer. Targetnya adalah **kesetiaan tinggi pada bahasa visual, motion, respons, dan sound cue**, tetapi seluruh copy, data, identitas, dan aset branded diganti menjadi identitas portofolio.

### 1.1 Batasan penting tentang “persis”

Yang dipertahankan:

- susunan software dashboard dan progressive disclosure;
- warna navy/royal-blue, cyan/teal, red signal, black outline, hard shadow, scanline, ruler, radar, ticker, dan panel gelap;
- pola interaksi map, filter, drawer, terminal, intro briefing, status system, dan micro-interaction;
- karakter audio 8-bit yang dihasilkan secara sintetis melalui Web Audio API;
- ritme animasi, feedback suara, dan state loading/empty/error.

Yang wajib diubah:

- Spider-Man/Ned/Spidey Tracker, mask, logo, nama karakter, dan copy film;
- marker “sighting/villain/event” menjadi project, experience, skill, milestone, dan case note;
- semua data contoh dan URL eksternal milik repo referensi;
- aset gambar atau audio yang tidak dimiliki portfolio owner.

Dengan aturan ini, pengalaman terasa sama sebagai **produk software**, tetapi tetap menjadi portofolio orisinal dan aman dipublikasikan.

## 2. Referensi teknis yang diaudit

- Repository: <https://github.com/ganend060805-dotcom/spiderman-tracker>
- Commit referensi saat audit: [`8fdc92ac090ac1e244f8b543fcade8129b297876`](https://github.com/ganend060805-dotcom/spiderman-tracker/commit/8fdc92ac090ac1e244f8b543fcade8129b297876)
- Entry point referensi: `app/index.html` dan `app/app.js`
- Modul perilaku: `app/js/audio.js`, `map.js`, `panel.js`, `terminal.js`, `ui.js`, `storage.js`, `modals.js`
- Design reference: `docs/design.md`
- Product reference: `docs/PRD.md`

### 2.1 Temuan implementasi referensi

- Prototype saat ini memakai HTML/CSS/JavaScript modular dan Leaflet/OpenStreetMap.
- `app/app.js` menginisialisasi peta Leaflet, marker, filter, GPS, radius scan, fallback map, dan detail signal.
- Navigation rail membuka panel tanpa full-page reload.
- Panel memiliki view Activity Log, Report, Web Watch, Videos, Events, Help, Downloads, dan Detail.
- Terminal menyediakan perintah `help`, `scan`, `list`, `locate`, `filter`, `report`, `sound`, `radar`, `panel`, `clear`, dan `exit`.
- Audio tidak memakai file `.mp3`, `.wav`, atau `.ogg`. `app/js/audio.js` membuat suara dengan oscillator Web Audio API.
- Repo referensi memiliki placeholder dan sample JSON; data tersebut tidak boleh masuk ke portofolio produksi.

## 3. Sasaran produk

### 3.1 Sasaran utama

1. Membuat recruiter, klien, dan developer peer memahami kemampuan pemilik portofolio dalam kurang dari dua menit.
2. Menjadikan eksplorasi proyek terasa seperti menemukan sinyal, bukan membaca daftar kartu biasa.
3. Menampilkan bukti kerja: peran, masalah, proses, teknologi, hasil, dan tautan demo/repository.
4. Memberi CTA kontak dan download CV yang selalu mudah ditemukan.
5. Mempertahankan sensasi “AMAZING seperti Spider-Man” melalui motion, radar, web-network iconography, dan audio feedback tanpa menggandakan IP Spider-Man.

### 3.2 Sasaran keberhasilan MVP

- Pengunjung dapat menemukan proyek unggulan maksimal dalam tiga interaksi.
- Pengunjung dapat membuka detail proyek, experience, dan CV dari desktop maupun mobile.
- Semua kontrol inti dapat dipakai dengan keyboard dan screen reader.
- First meaningful content muncul cepat; intro tidak menghalangi akses isi.
- Sound bersifat opt-in setelah gesture pertama dan pilihan mute tersimpan.
- Semua animasi utama tetap halus pada perangkat kelas menengah dan berhenti/menyederhana saat reduced motion aktif.

### 3.3 Di luar sasaran MVP

- Login atau akun pengunjung.
- Komentar publik, social feed, dan crowd verification.
- Ticketing, pembayaran, marketplace, atau CMS kompleks.
- GPS pengunjung sebagai fitur utama. “Scan near me” hanya boleh dipakai jika ada konteks portofolio yang benar-benar relevan.
- Penyalinan logo, karakter, typography, screenshot, atau sound recording milik pihak lain.
- AR, street view, dan 3D berat yang mengorbankan kecepatan halaman.

## 4. Pengguna dan kebutuhan

| Persona | Kebutuhan | Bukti yang harus terlihat |
|---|---|---|
| Recruiter / hiring manager | Memindai kompetensi dan pengalaman dengan cepat | headline, status availability, featured project, skill telemetry, CV |
| Klien / calon kolaborator | Menilai kecocokan dan cara menghubungi | case study, service signal, hasil kerja, contact channel |
| Developer peer | Melihat kedalaman teknis dan kualitas implementasi | stack, architecture notes, repository, terminal/project data |
| Pengunjung umum | Mengerti “siapa saya” tanpa membaca dokumen panjang | intro briefing, About, visual narrative, concise copy |
| Pemilik portofolio | Mengganti project, skill, link, dan status tanpa merusak UI | typed content/data layer, validation, empty state |

## 5. Arsitektur informasi dan section website

Section berikut menjadi padanan langsung dari panel pada repo referensi.

| Section portofolio | Padanan software referensi | Tujuan |
|---|---|---|
| **Home / Command Center** | Map viewport + intro briefing | First impression, status, featured signal, CTA utama |
| **About / Identity Signal** | Help + operator briefing | Profil singkat, prinsip kerja, cara berpikir, personality |
| **Featured Build** | Selected marker detail | Satu proyek utama dengan problem, solution, result, demo |
| **Project Network** | Global map + marker filter | Semua proyek sebagai jaringan signal yang bisa dieksplorasi |
| **Skills Telemetry** | Filter rail + radar/status | Skill berdasarkan domain, level, bukti, dan project terkait |
| **Experience Activity Log** | Activity Log | Timeline pengalaman, kontribusi, milestone, dan outcome |
| **Lab / Archive** | Web Watch + Videos | Eksperimen, tulisan, prototype, demo reel, case notes |
| **Contact / Open Channel** | Report panel | CTA kolaborasi, email, social link, dan inquiry form |
| **Resume / Downloads** | Downloads panel | CV, one-page profile, project deck, asset yang boleh dibagikan |
| **Footer / Signal End** | Ticker + footer branding | Status terakhir, copyright, availability, quick links |

### 5.1 Mapping data lama ke konteks portofolio

| Konsep referensi | Implementasi portofolio |
|---|---|
| Sighting | Project / shipped work |
| Confirmed / rumored | Shipped / prototype / in progress |
| Event | Milestone, talk, collaboration, release |
| Villain / Web Watch | Challenge, constraint, risk, atau case note |
| Report Sighting | Contact / collaboration inquiry |
| Videos | Demo reel, walkthrough, presentation |
| Downloads | CV, profile, deck, resource |
| Radar scan | Project scanner / skill signal scan |
| GPS location | Optional project region atau tidak digunakan |
| Spider-Net terminal | Portfolio-Net console |

## 6. User journey

### 6.1 First visit

1. Pengunjung melihat boot/briefing singkat.
2. Intro menampilkan identitas, role, kalimat positioning, dan tiga action: `OPEN PORTFOLIO`, `SCAN PROJECTS`, `SKIP BRIEFING`.
3. Setelah action pertama, audio di-unlock hanya jika pengunjung mengizinkan melalui gesture tersebut.
4. Command Center menampilkan featured signal, peta/network, status availability, dan ticker.

### 6.2 Menemukan proyek

1. Pengunjung memilih `PROJECT NETWORK` atau marker pada network map.
2. Marker menampilkan tooltip singkat.
3. Klik/Enter membuka detail drawer tanpa reload.
4. Drawer menampilkan role, tahun, status, stack, problem, approach, result, media, repository, demo, dan project terkait.
5. `BACK TO NETWORK` mengembalikan posisi/filter terakhir.

### 6.3 Menilai pengalaman

1. Pengunjung membuka `EXPERIENCE ACTIVITY LOG`.
2. Search dan filter berdasarkan role, tahun, domain, atau status.
3. Item log dapat dihubungkan ke project dan milestone.
4. State kosong menjelaskan filter yang aktif dan menawarkan `CLEAR FILTER`.

### 6.4 Menghubungi pemilik portofolio

1. Pengunjung menekan `OPEN CHANNEL` dari hero, drawer, atau footer.
2. Form menampilkan reason, name, email, message, dan optional project scope.
3. Validasi terjadi di client dan server jika backend digunakan.
4. Setelah submit, tampilkan success signal, fallback email, dan status pengiriman yang jujur.

### 6.5 Mengunduh CV

1. Pengunjung menekan `DOWNLOAD CV`.
2. Sebelum download, tampilkan nama file, tanggal update, tipe file, dan ukuran.
3. Jika file unavailable, tampilkan fallback contact atau profile page; jangan menghasilkan tautan rusak.

## 7. Persyaratan fungsional

### FR-01 — Shell dan navigation rail

- Shell harus terasa sebagai software interface, bukan mockup HP/tablet.
- Desktop memakai rail kiri sekitar 72–88px; mobile memakai top bar dan bottom navigation.
- Rail menyediakan Home, About, Projects, Skills, Experience, Lab, Contact, Resume, dan Sound.
- Icon-only control wajib memiliki accessible label, tooltip, focus ring, dan active state.
- Panel dibuka dengan state URL/hash agar bisa dibagikan dan dipulihkan saat refresh.

### FR-02 — Intro briefing

- Intro muncul pada first visit atau saat dipanggil melalui `REPLAY BRIEFING`.
- Visual boot menampilkan scanline, signal pulse, status network, dan identity mark.
- Full sequence maksimal 2.2 detik; fast path setelah user menekan skip maksimal 300–500ms.
- `SKIP BRIEFING` selalu terlihat dan tidak disembunyikan di balik animasi.
- Intro tidak boleh memblokir navigasi untuk pengguna yang memakai reduced motion.

### FR-03 — Command Center

- Hero menampilkan role, positioning, availability, featured project, dan dua CTA.
- Menampilkan “live-feeling” status seperti `NETWORK READY`, `LAST SYNC`, dan `SIGNALS ONLINE`; status harus berasal dari data nyata atau diberi label simulasi.
- Ticker dapat menampilkan highlight proyek, update, atau availability.
- Semua informasi penting tetap tersedia dalam HTML, bukan hanya canvas.

### FR-04 — Project Network

- Menyediakan peta/network viewport interaktif dengan pan, zoom, reset, filter, dan keyboard alternative.
- Marker memakai kategori status: `SHIPPED`, `PROTOTYPE`, `IN PROGRESS`, atau `COLLABORATION`.
- Marker memiliki idle, hover, focus, selected, loading, dan unavailable state.
- Pada perangkat kecil, map dapat berubah menjadi network grid/list tanpa kehilangan informasi.
- Tidak meminta geolocation secara default. Tombol `SCAN PROJECTS` memindai dataset portofolio, bukan lokasi privat pengunjung.
- Jika peta gagal dimuat, Activity Log atau Project Grid menjadi fallback wajib.

### FR-05 — Detail drawer / case study

- Dibuka tanpa full-page reload.
- Mendukung close button, Escape, click outside yang aman, focus trap, dan restore focus.
- Data minimum: title, category, status, date, role, summary, problem, process, result, stack, links, media, alt text.
- Tombol `VIEW CASE STUDY`, `OPEN DEMO`, `SOURCE`, dan `CONTACT ABOUT THIS` diberi state external-link yang jelas.
- Drawer mengingat scroll position network dan filter terakhir.

### FR-06 — Activity Log pengalaman

- Search berdasarkan keyword dan filter berdasarkan domain, tahun, role, status.
- Mendukung pagination atau progressive loading.
- Setiap item menampilkan timestamp/year, label, title, organization/client yang boleh dipublikasikan, dan outcome.
- Item dapat mengarahkan ke project detail atau external proof.

### FR-07 — Skills Telemetry

- Skill dikelompokkan minimal ke Frontend, Backend, Data/AI, Design/UX, dan Tools.
- Setiap skill mempunyai evidence project; jangan menampilkan persentase level tanpa definisi.
- Radar/chart dekoratif tidak boleh menjadi satu-satunya representasi data.
- Filter skill memperbarui project yang relevan secara visual dan tekstual.

### FR-08 — Lab, archive, dan media

- Menyediakan card untuk eksperimen, tulisan, demo, dan prototype.
- Card memiliki format, tanggal, status, thumbnail, summary, dan link.
- Video autoplay hanya muted; sediakan poster, caption/transcript, dan keyboard controls.
- Media lazy-load setelah viewport; gunakan image dimensions untuk mencegah layout shift.

### FR-09 — Contact / Open Channel

- Form inquiry berisi nama, email, konteks, pesan, dan consent jika diperlukan.
- Validasi format dan error message harus dapat dibaca screen reader.
- Jika backend belum tersedia, gunakan mailto/external form yang disetujui; jangan mengklaim pesan sudah terkirim.
- Tampilkan social links hanya yang aktif dan memang ingin dipublikasikan.

### FR-10 — Resume / Downloads

- Menyediakan CV PDF, one-page profile, dan resource lain yang disetujui.
- Menampilkan updated date, file size, format, dan accessible download label.
- Track download hanya jika analytics/privacy policy mengizinkan.

### FR-11 — Terminal console

Terminal adalah easter egg yang tetap usable, bukan satu-satunya cara navigasi.

Perintah portofolio:

```text
help
scan
list
open <project-slug>
filter <category>
about
contact
sound on|off
radar
panel <section>
clear
exit
```

- Prompt: `PORTFOLIO-NET // CONSOLE`.
- Command parser harus menolak input asing tanpa mengeksekusi HTML mentah.
- History boleh disimpan di localStorage memakai key netral, misalnya `portfolio_terminal_history`.

### FR-12 — Sound system

#### Prinsip

- Sound mempertahankan nuansa 8-bit dari repo referensi, tetapi dibuat melalui Web Audio API, bukan menyalin rekaman musik.
- Browser autoplay policy dihormati: audio baru aktif setelah gesture eksplisit (`OPEN PORTFOLIO`, `SCAN PROJECTS`, atau tombol sound).
- Default MVP adalah muted/opt-in. Pilihan pengguna disimpan di `portfolio_sound_enabled`.
- Tombol sound selalu terlihat di desktop dan mobile; label berubah antara `SOUND ON` dan `SOUND OFF`.
- Sediakan volume slider atau minimal level aman sekitar 0.25.
- `prefers-reduced-motion` tidak otomatis mematikan sound, tetapi pengguna harus mendapat kontrol terpisah.

#### Sound cue parity

| Cue | Sumber behavior | Implementasi portfolio |
|---|---|---|
| UI click | Square oscillator 440→880Hz, 50ms, gain `volume × 0.4` | Klik rail, chip, button, terminal submit |
| Radar ping | Sine 1200→300Hz, 350ms, gain `volume × 0.6` | Project scan selesai, marker ditemukan |
| Alert | Sawtooth 520/780/1040Hz pada 0/80/160ms, total 280ms | Warning/error status yang penting |
| Success | Square 330/440/550/660/880Hz, stagger 50ms, 90ms tiap note | Form berhasil, download siap |
| Error | Sawtooth 140→90Hz, 220ms | Validasi gagal atau link unavailable |
| Chime | Sine 600/900Hz, stagger 80ms, 120ms | Sound diaktifkan, intro selesai |

- Tidak ada background music loop pada MVP.
- Jika kelak ditambahkan musik ambient, file harus dibuat/berlisensi milik portfolio owner, memiliki mute terpisah, dan tidak menghalangi akses konten.
- Setiap cue memiliki fallback silent ketika AudioContext tidak tersedia.

## 8. Visual dan interaction fidelity

### 8.1 Layout software

- Canvas utama memakai deep royal-blue/ink background.
- Shell software memakai cyan/teal bezel visual, tetapi tidak menggambar frame fisik HP, tablet, laptop, atau monitor.
- Topbar memiliki ruler, identity mark, status network, help, dan sound control.
- Rail kiri memakai icon geometric dengan black outline, hard shadow, active glow, dan press feedback.
- Network viewport/map memiliki scan grid, city/project lines, marker clusters, ruler, tooltip, dan radar sweep.
- Detail dan utility panel memakai dark navy/teal, border hitam tegas, corner radius kecil, dan shadow keras.
- Bottom ticker menyampaikan status atau update proyek tanpa menjadi marquee yang mengganggu pembaca.

### 8.2 Tipografi final portofolio

Keputusan final menggantikan font demo di repo referensi:

- **Orbitron** — heading, identity mark, section title, button utama.
- **Rajdhani** — body copy, paragraph, metadata yang perlu dibaca cepat.
- **Share Tech Mono** — data, angka, timestamp, label status, terminal, coordinate-like value.

Font dimuat dengan `next/font` atau asset lokal untuk mengurangi layout shift. Jangan memakai Press Start 2P, Pixelify Sans, Silkscreen, atau VT323 sebagai font utama produksi meskipun font tersebut ada di prototype referensi.

### 8.3 Token warna baseline

Token ini mengikuti implementasi visual repo referensi dan boleh diberi nama ulang secara semantik:

```css
--signal-blue: #003791;
--signal-blue-deep: #001d54;
--signal-blue-gradient: linear-gradient(180deg, #094eb8 0%, #00338a 45%, #001f5c 100%);
--bezel-cyan: #52bfd8;
--bezel-cyan-mid: #2c8da6;
--bezel-cyan-deep: #195d70;
--outline-ink: #134654;
--map-bg: #041024;
--map-water: #071936;
--marker-cyan: #58c4d8;
--marker-green: #58b572;
--signal-red: #e63946;
--signal-amber: #f4b842;
--paper: #ffffff;
```

Kontras teks dan state aktif wajib diuji ulang; token boleh disesuaikan jika kontras aksesibilitas tidak memenuhi target.

## 9. Motion dan animasi

Animasi harus membuat interface terasa hidup seperti signal network, bukan sekadar menambah efek.

| Area | Animasi | Durasi / aturan |
|---|---|---|
| Boot | identity mark reveal, scanline, pulse, status text | 1.2–2.2s; skip selalu tersedia |
| Hero | signal beacon, subtle parallax, data ticker | loop ringan; transform/opacity only |
| Marker | pulse ring, hover lift, selected ring | 2.4s idle; pause saat hidden |
| Radar | conic sweep, ping ring, result flash | 1.8–3.6s; tidak lebih dari 3 flash/detik |
| Drawer | slide/scale dari anchor marker | 280ms, cubic-bezier yang halus |
| Button | press-in, shadow offset, focus glow | 150–220ms |
| Ticker | translate horizontal berbasis CSS | pause on hover/focus; reduced motion jadi static |
| Monogram/avatar | bob, blink, web spark | idle only; jangan memindahkan layout |
| Scroll | section reveal dan parallax layer | IntersectionObserver/GSAP; batasi jumlah observer |
| Canvas | particle/web ambient | capped DPR, pause off-screen, fallback CSS |

### 9.1 Reduced motion

Saat `prefers-reduced-motion: reduce` aktif:

- matikan parallax, continuous particle, marker pulse, radar sweep, ticker movement, dan autoplay;
- gunakan fade instan atau state statis;
- tetap tampilkan status dan feedback secara tekstual;
- jangan menghilangkan informasi hanya karena animasi dimatikan.

### 9.2 Target performa motion

- Target 60fps pada scene normal.
- Animasi utama hanya mengubah `transform` dan `opacity` jika memungkinkan.
- Jangan animasikan `filter: blur()` besar, layout property, atau box-shadow kompleks secara terus-menerus.
- Canvas/Three.js harus bersifat dekoratif, lazy, dan dapat dinonaktifkan pada perangkat rendah.

## 10. Icon, web motif, dan asset system

### 10.1 Icon orisinal

- Buat set SVG sendiri: portfolio mark/monogram, node, web, radar, project, code, design, data, experience, contact, download, sound, terminal, external link.
- Ikon menggunakan stroke/geometry konsisten, rounded join secukupnya, cyan/white/red states, dan black outline saat berada di tombol.
- Web motif adalah jaringan node/geometric lines, bukan logo Spider-Man atau bentuk karakter berhak cipta.
- Setiap icon-only button memiliki `<title>` atau accessible name.

### 10.2 Asset inventory

```text
public/
  brand/portfolio-mark.svg
  brand/portfolio-wordmark.svg
  brand/monogram.svg
  icons/*.svg
  map/project-network-fallback.svg
  map/project-marker-*.svg
  media/projects/*
  media/lab/*
  media/resume/*
  posters/*
```

- Gambar besar memakai AVIF/WebP dan dimensi eksplisit.
- Semua poster/video punya fallback statis.
- Jangan memakai screenshot, mask, chibi, wordmark, atau asset Spider-Man dari repo referensi pada versi publik.
- Asset dari portfolio owner harus memiliki alt text, lisensi, dan sumber yang tercatat.

## 11. Data model dan content contract

MVP memakai data typed/local (TypeScript, JSON terverifikasi, atau MDX). CMS dapat ditambahkan setelah schema stabil.

```ts
type Project = {
  slug: string;
  title: string;
  category: 'frontend' | 'backend' | 'data-ai' | 'design' | 'tooling';
  status: 'shipped' | 'prototype' | 'in-progress' | 'collaboration';
  year: number;
  role: string;
  summary: string;
  problem: string;
  process: string[];
  result?: string;
  stack: string[];
  links: { demo?: string; source?: string; caseStudy?: string };
  media?: { src: string; alt: string; kind: 'image' | 'video' }[];
  networkPosition?: { x: number; y: number; region?: string };
  featured?: boolean;
};

type ExperienceItem = {
  id: string;
  date: string;
  title: string;
  organization?: string;
  role?: string;
  summary: string;
  outcome?: string;
  projectSlugs?: string[];
  proofUrl?: string;
};

type Skill = {
  slug: string;
  label: string;
  group: 'frontend' | 'backend' | 'data-ai' | 'design' | 'tools';
  evidenceProjectSlugs: string[];
  levelNote: string;
};
```

Data rules:

- Jangan mengarang metric, client, revenue, user count, atau result yang belum disetujui.
- Jika result belum tersedia, gunakan `outcome: null` dan copy yang jujur seperti `case study in progress`.
- URL external divalidasi dan dibuka dengan `rel="noopener noreferrer"`.
- Data confidential diganti dengan deskripsi generik atau dihapus.
- `siteSettings` menyimpan name, role, availability, social links, CV metadata, sound preference, dan theme tokens.

## 12. Tech stack target

### 12.1 Production recommendation

- **Next.js App Router + TypeScript** — routing, metadata, server/client boundary, dan scalable portfolio pages.
- **Tailwind CSS + CSS custom properties** — token dan responsive utility tanpa menghilangkan CSS pixel-art custom.
- **GSAP + ScrollTrigger** — intro choreography, timeline, drawer transition, dan scroll scene.
- **Motion** — state transition komponen yang tidak perlu timeline kompleks.
- **SVG inline + CSS** — icon, web network, marker, ruler, dan radar.
- **Canvas 2D** — particle/web ambience yang ringan dan optional.
- **Leaflet** hanya jika project network benar-benar memakai geographic coordinates; jika tidak, gunakan SVG/CSS network map agar makna “map” tidak palsu.
- **Optional Three.js/R3F** hanya untuk hero/asset yang benar-benar memberi nilai; harus ada fallback.
- **MDX atau typed local data** untuk case study dan experience pada MVP.
- `next/font`, `next/image`, ESLint, Prettier, Playwright, dan Lighthouse CI untuk quality gate.

### 12.2 Parity dengan prototype referensi

Prototype referensi tetap menjadi behavior oracle: vanilla HTML/CSS/JS + Leaflet + Web Audio. Implementasi produksi boleh ditulis ulang ke Next/TypeScript, tetapi hasil interaksi harus mempertahankan:

- map/filter/marker semantics;
- panel/hash/focus behavior;
- terminal command flow;
- intro skip dan sound toggle;
- loading/empty/error/fallback states.

## 13. Responsive behavior

| Breakpoint | Layout |
|---|---|
| 360–767px | Topbar ringkas, bottom nav 5 item, detail bottom sheet, filter sheet, network list fallback |
| 768–1023px | Topbar + side utility, panel sebagai bottom/side sheet, map dan log bergantian |
| 1024–1439px | Left command rail, network viewport utama, activity panel 320–420px |
| 1440px+ | Shell max-width terkontrol, whitespace bertambah, tidak memperbesar teks pixel secara berlebihan |

Touch target minimal 44×44px. Hover tidak boleh menjadi satu-satunya cara menemukan detail.

## 14. Accessibility, privacy, dan resilience

- Heading hierarchy valid dan landmark (`header`, `nav`, `main`, `aside`, `footer`) jelas.
- Kontras teks minimal WCAG AA 4.5:1 untuk body copy.
- Focus ring terlihat; tab order mengikuti narasi.
- Modal/drawer memiliki focus trap, Escape close, dan restore focus.
- Map selalu memiliki Activity Log/Grid sebagai alternative.
- Tidak ada flashing lebih dari 3 kali per detik.
- Audio tidak autoplay sebelum consent gesture; mute preference disimpan lokal.
- Tidak meminta lokasi, microphone, camera, atau notification permission untuk MVP.
- Contact form memiliki rate limit/server validation bila backend digunakan.
- Analytics bersifat minimal, anonim, dan terdokumentasi di privacy notice.
- Semua error network/media memiliki fallback yang dapat dimengerti manusia.

## 15. Analytics event opsional

Jika analytics dipakai, event minimal:

```text
briefing_started
briefing_skipped
sound_enabled
sound_disabled
network_loaded
network_filter_changed
project_marker_opened
project_case_study_opened
activity_log_filtered
skill_filter_changed
lab_item_opened
contact_started
contact_submitted
resume_downloaded
terminal_command_used
```

Jangan mengirim isi pesan kontak, email, data sensitif, atau coordinate privat ke analytics.

## 16. Acceptance criteria

### Visual

- [ ] Pada desktop, website langsung terbaca sebagai software dashboard/map signal, bukan landing page SaaS generik.
- [ ] Tidak ada frame HP/tablet/monitor fisik.
- [ ] Orbitron, Rajdhani, dan Share Tech Mono diterapkan sesuai peran.
- [ ] Cyan/teal shell, navy map, red signal, black outline, hard shadow, scanline, ruler, radar, ticker, dan panel drawer hadir secara konsisten.
- [ ] Icon web/network dibuat sebagai asset orisinal.

### Behavior

- [ ] Intro dapat di-skip dan tidak menghalangi konten.
- [ ] Semua nav membuka section/panel tanpa full reload yang tidak perlu.
- [ ] Project marker/filter/detail drawer berfungsi dan sinkron dengan list.
- [ ] Activity Log, Skills Telemetry, Lab, Contact, dan Resume tersedia sebagai section nyata.
- [ ] Terminal mendukung command portfolio yang terdokumentasi.
- [ ] Fallback map/list tetap memberikan akses ke seluruh project.

### Audio

- [ ] Audio di-unlock setelah gesture, bukan autoplay paksa.
- [ ] Sound toggle dan preference tersimpan.
- [ ] Cue click, ping, alert, success, error, dan chime terdengar konsisten dengan prototype.
- [ ] Tidak ada file audio pihak lain yang disalin tanpa lisensi.

### Quality

- [ ] Responsive pada 360, 768, 1024, dan 1440px.
- [ ] Keyboard-only flow berhasil untuk nav, drawer, filter, terminal, contact, dan download.
- [ ] `prefers-reduced-motion` menghapus loop dekoratif yang berlebihan.
- [ ] Lighthouse Performance dan Accessibility ditargetkan minimal 80 setelah asset nyata masuk.
- [ ] Tidak ada broken image, broken link, console error, atau placeholder sample data yang lolos ke production.

## 17. Definition of Done

Fitur dianggap selesai bila:

1. Data portofolio nyata sudah menggantikan semua sample tracker.
2. Design token dan typography final diterapkan di seluruh surface.
3. Desktop, tablet, mobile, keyboard, reduced motion, muted audio, dan error state diuji.
4. Semua asset pihak ketiga memiliki lisensi atau diganti asset orisinal.
5. Case study, CV, contact, source/demo link, dan social link sudah diverifikasi.
6. Build production, lint, typecheck, dan browser smoke test lulus.
7. README deployment menjelaskan env, build, hosting, dan fallback.

## 18. Urutan delivery

### Phase 1 — Signal shell

- Next.js/TypeScript foundation, fonts, tokens, shell, rail, topbar, ticker, responsive nav.
- Portfolio data contract dan content placeholders.

### Phase 2 — Core portfolio

- Home/Command Center, About, Featured Build, Project Network, detail drawer, Activity Log.

### Phase 3 — Interactivity

- Intro choreography, radar/network animation, filters, terminal, sound synthesizer, local preference.

### Phase 4 — Evidence surfaces

- Skills Telemetry, Experience, Lab/Archive, media poster/video, Resume/Downloads, Contact.

### Phase 5 — Polish dan QA

- reduced motion, keyboard, mobile bottom sheets, fallbacks, performance pass, SEO/OG, analytics/privacy, final content audit.

## 19. Input yang dibutuhkan dari portfolio owner

Implementasi tidak boleh mengarang bagian berikut:

- nama dan headline/role final;
- bio singkat dan tone komunikasi;
- daftar project, status, tahun, role, stack, demo, source, dan result;
- timeline experience/milestone;
- skill dan evidence project;
- CV final dan tanggal update;
- email, social link, dan availability;
- asset foto/avatar/monogram yang boleh dipublikasikan;
- keputusan apakah network map memakai lokasi geografis, abstract graph, atau project grid;
- keputusan apakah contact memakai backend, mailto, atau service external.

## 20. Catatan legal dan publikasi

Dokumen ini memakai repository Spider-Man Tracker sebagai referensi desain dan perilaku. Versi portofolio produksi harus menggunakan identitas, copy, logo, ilustrasi, font license, data, dan audio yang hak penggunaannya jelas. Jangan mempublikasikan data internal perusahaan, URL admin, credentials, client confidential information, atau sample tracker yang dapat disalahpahami sebagai pengalaman nyata.

