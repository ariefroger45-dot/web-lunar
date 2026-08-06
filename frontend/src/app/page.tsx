"use client";

import { useState } from "react";
import "./lunar-landing.css";

export default function LandingPage() {
  const [navOpen, setNavOpen] = useState(false);

  function bukaWhatsApp() {
    const nomorHP = "6289672249269";
    const pesan = "Halo Lunar, saya ingin bertanya...";
    const url = `https://wa.me/${nomorHP}?text=${encodeURIComponent(pesan)}`;
    window.open(url, "_blank");
  }

  return (
    <>
      <header>
        <nav>
          <a href="#top" className="logo">
            <img src="/lunar-logo.png" alt="Lunar" />
          </a>
          <ul className={`nav-links${navOpen ? " open" : ""}`}>
            <li>
              <a href="#fitur" onClick={() => setNavOpen(false)}>
                Fitur
              </a>
            </li>
            <li>
              <a href="#cara-kerja" onClick={() => setNavOpen(false)}>
                Cara Kerja
              </a>
            </li>
            <li>
              <a href="#paket" onClick={() => setNavOpen(false)}>
                Paket
              </a>
            </li>
            <li>
              <a href="#galeri" onClick={() => setNavOpen(false)}>
                Galeri
              </a>
            </li>
            <li>
              <a href="#kontak" onClick={() => setNavOpen(false)}>
                Kontak
              </a>
            </li>
          </ul>
          <div className="nav-cta">
            <a href="#paket" className="btn btn-primary">
              Booking Sekarang
            </a>
            <button
              className="nav-toggle"
              aria-label="Buka menu"
              aria-expanded={navOpen}
              onClick={() => setNavOpen((v) => !v)}
            >
              <span className="bar bar1"></span>
              <span className="bar bar2"></span>
              <span className="bar bar3"></span>
            </button>
          </div>
        </nav>
      </header>

      <main id="top">
        {/* HERO */}
        <section className="hero">
          <div className="wrap hero-grid">
            <div>
              <span className="eyebrow">Photobooth Event · Batam</span>
              <h1>
                Pencet. Ketawa.
                <br />
                Cetak. <span>Kenang.</span>
              </h1>
              <p className="lead">
                Lunar menghadirkan photobooth dengan lampu studio, kamera
                professional, dan cetakan instan buat pernikahan, ulang tahun,
                sampai gathering kantor kamu.
              </p>
              <div className="hero-actions">
                <a href="#paket" className="btn btn-primary">
                  Cek Paket &amp; Harga
                </a>
                <a href="#cara-kerja" className="btn btn-ghost">
                  Lihat Cara Booking
                </a>
              </div>
            </div>
            <div className="photostrip-wrap">
              <div className="photostrip">
                <div className="frame f1">
                  <span>NO. 01</span>
                  <img src="/1.jpg" alt="" />
                </div>
                <div className="frame f2">
                  <span>NO. 02</span>
                  <img src="/2.jpg" alt="" />
                </div>
                <div className="frame f3">
                  <span>NO. 03</span>
                  <img src="/3.jpg" alt="" />
                </div>
                <div className="frame f4">
                  <span className="flash-word">KLIK!</span>
                  <img src="/4.jpg" alt="" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="stat-strip">
          <div className="wrap">
            <div className="stat">
              <span className="num">500+</span>
              <span className="label">acara terlayani</span>
            </div>
            <div className="stat">
              <span className="num">50rb+</span>
              <span className="label">lembar tercetak</span>
            </div>
            <div className="stat">
              <span className="num">4.9/5</span>
              <span className="label">rating dari klien</span>
            </div>
            <div className="stat">
              <span className="num">&lt;60dtk</span>
              <span className="label">waktu cetak per lembar</span>
            </div>
          </div>
        </div>

        {/* FITUR */}
        <section className="fitur" id="fitur">
          <div className="wrap">
            <div className="section-head">
              <span className="eyebrow">Kenapa Lunar</span>
              <h2>Bukan cuma sewa alat, satu paket lengkap.</h2>
              <p>
                Kamu nggak perlu mikirin logistik. Kru, properti, sampai kertas
                cetak — semua sudah kami siapkan.
              </p>
            </div>
          </div>
          <div className="wrap" style={{ padding: 0 }}>
            <div className="fitur-grid">
              {[
                [
                  "Cetak instan di tempat",
                  "Tamu bisa langsung bawa pulang hasil fotonya, tercetak kurang dari semenit setelah sesi selesai.",
                ],
                [
                  "Kualitas setara studio",
                  "Pencahayaan flash dan lensa yang kami pakai bikin warna kulit natural dan hasil tetap tajam.",
                ],
                [
                  "Backdrop & properti custom",
                  "Tema, warna, sampai properti bisa disesuaikan dengan konsep acara kamu, bukan pilihan itu-itu saja.",
                ],
                [
                  "Kru ramah & sigap",
                  "Operator kami standby sepanjang sesi, bantu atur pose sampai jaga antrean tetap tertib.",
                ],
                [
                  "Jepretan tanpa batas",
                  "Selama jam sesi berjalan, tamu bebas foto sepuasnya tanpa hitungan per lembar.",
                ],
                [
                  "Salinan digital",
                  "Semua hasil foto dikirim dalam bentuk file digital setelah acara, siap diunggah ke media sosial.",
                ],
              ].map(([title, desc]) => (
                <div className="fitur-card" key={title}>
                  <div className="chip"></div>
                  <h3>{title}</h3>
                  <p>{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CARA KERJA */}
        <section className="cara" id="cara-kerja">
          <div className="wrap">
            <div className="section-head">
              <span className="eyebrow">Cara Booking</span>
              <h2>Tiga langkah, acara kamu siap seru-seruan.</h2>
            </div>
            <div className="cara-list">
              <div className="cara-item">
                <span className="idx">01 — Pilih paket</span>
                <h3>Sesuaikan kebutuhan</h3>
                <p>
                  Pilih paket berdasarkan jenis acara, jumlah tamu, dan durasi
                  sesi yang kamu butuhkan.
                </p>
              </div>
              <div className="cara-item">
                <span className="idx">02 — Booking tanggal</span>
                <h3>Kunci jadwal &amp; konsep</h3>
                <p>
                  DP untuk amankan tanggal, lalu diskusikan desain cetakan dan
                  waktu mulai.
                </p>
              </div>
              <div className="cara-item">
                <span className="idx">03 — Hari-H tinggal pose</span>
                <h3>Kami urus sisanya</h3>
                <p>
                  Kru datang lebih awal untuk setup, tamu tinggal pose, upload
                  sosmed dan bawa pulang hasil cetaknya.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* PAKET */}
        <section className="paket" id="paket">
          <div className="wrap">
            <div className="section-head">
              <span className="eyebrow">Paket &amp; Harga</span>
              <h2>Pilih paket yang pas buat acara kamu.</h2>
              <p>
                Harga di bawah adalah harga mulai dari. Hubungi kami untuk
                detail lengkap.
              </p>
            </div>
            <div className="paket-grid">
              <div className="paket-card">
                <div className="paket-name">Soft File Only</div>
                <p className="paket-desc">
                  Cocok untuk ulang tahun atau acara komunitas skala kecil atau
                  buat seru acara kamu.
                </p>
                <div className="paket-price">
                  Mulai dari<b>Rp 1.000.000</b>
                </div>
                <ul className="paket-feats">
                  <li>Sesi 2/3/4/5/... jam</li>
                  <li>Desain custom</li>
                  <li>GIF video</li>
                  <li>Barcode softfile</li>
                  <li>3 Crew standby</li>
                </ul>
                <a
                  href="/booking?paket=soft-file-only"
                  className="btn btn-primary"
                >
                  Pilih Paket
                </a>
              </div>
              <div className="paket-card featured">
                <span className="tag">Paling Favorit</span>
                <div className="paket-name">Unlimited</div>
                <p className="paket-desc">
                  Pilihan paling banyak dipesan untuk pernikahan dan gathering
                  kantor.
                </p>
                <div className="paket-price">
                  Mulai dari<b>Rp 2.000.000</b>
                </div>
                <ul className="paket-feats">
                  <li>Sesi 2/3/4/5/... jam</li>
                  <li>Unlimited print</li>
                  <li>Desain custom</li>
                  <li>GIF video</li>
                  <li>Barcode softfile</li>
                  <li>4 Crew standby</li>
                </ul>
                <a href="/booking?paket=unlimited" className="btn btn-primary">
                  Pilih Paket
                </a>
              </div>
              <div className="paket-card">
                <div className="paket-name">Cetak Reguler</div>
                <p className="paket-desc">
                  Buat kamu yang tahu banget kebutuhan acara.
                </p>
                <div className="paket-price">
                  Mulai dari<b>Rp 1.500.000</b>
                </div>
                <ul className="paket-feats">
                  <li>Sesi 2/3/4/5/... jam</li>
                  <li>Photo print</li>
                  <li>Desain custom</li>
                  <li>GIF video</li>
                  <li>Barcode softfile</li>
                  <li>4 Crew standby</li>
                </ul>
                <a
                  href="/booking?paket=cetak-reguler"
                  className="btn btn-primary"
                >
                  Pilih Paket
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* GALERI */}
        <section className="galeri" id="galeri">
          <div className="wrap">
            <div className="section-head">
              <span className="eyebrow">Galeri</span>
              <h2>Cuplikan dari beberapa sesi.</h2>
              <p>Sebagian momen yang tertangkap di photobooth Lunar.</p>
            </div>
            <div className="galeri-grid">
              {[
                ["g1", "014", "5.jpg"],
                ["g2", "018", "6.jpg"],
                ["g3", "022", "7.jpg"],
                ["g4", "027", "8.jpg"],
                ["g4", "027", "9.jpg"],
                ["g5", "031", "10.jpg"],
                ["g6", "035", "11.jpg"],
                ["g7", "040", "12.jpg"],
              ].map(([cls, no, img], i) => (
                <div className={`gframe ${cls}`} key={i}>
                  <span>NO. {no}</span>
                  <img src={`/${img}`} alt="" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TESTIMONI */}
        <section className="testi">
          <div className="wrap">
            <div className="section-head">
              <span className="eyebrow">Kata Klien</span>
              <h2>Yang mereka bilang setelah acara selesai.</h2>
            </div>
            <div className="testi-grid">
              <div className="testi-card">
                <p className="testi-quote">
                  Antrean tamu tetap rapi walaupun ramai. Hasil cetaknya juga
                  bagus, warnanya natural banget.
                </p>
                <div className="testi-name">Dinda Pratiwi</div>
                <div className="testi-role">
                  Resepsi Pernikahan, Grand I Hotel
                </div>
              </div>
              <div className="testi-card">
                <p className="testi-quote">
                  Kru datang lebih awal dan setupnya cepat. Properti temanya
                  juga sesuai request kami.
                </p>
                <div className="testi-name">Ardian Nugroho</div>
                <div className="testi-role">Gathering Kantor, Nongsa Point</div>
              </div>
              <div className="testi-card">
                <p className="testi-quote">
                  Anak-anak seneng banget bisa langsung bawa pulang foto. Bakal
                  pakai Lunar lagi tahun depan.
                </p>
                <div className="testi-name">Ratna Salsabila</div>
                <div className="testi-role">
                  Ulang Tahun Anak, Ocean Resto KBC
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA FINAL */}
        <section className="cta-final" id="kontak">
          <div className="wrap">
            <h2>Siap bikin acara kamu makin seru?</h2>
            <p>
              Ceritakan tanggal dan konsep acaramu, tim Lunar bantu siapkan
              sisanya.
            </p>
            <div className="cta-actions">
              <a
                href="#"
                className="btn btn-primary"
                onClick={(e) => {
                  e.preventDefault();
                  bukaWhatsApp();
                }}
              >
                Chat via WhatsApp
              </a>
              <a href="/booking" className="btn btn-ghost">
                Book via Web
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="wrap">
          <div className="foot-grid">
            <div className="foot-col">
              <h4>Lunar Photobooth</h4>
              <p>Melayani acara di Batam</p>
            </div>
            <div className="foot-col">
              <h4>Kontak</h4>
              <a href="#">08</a>
              <a href="#">@gmail.com</a>
            </div>
            <div className="foot-col">
              <h4>Sosial</h4>
              <a href="#">Instagram</a>
              <a href="#">TikTok</a>
            </div>
            <div className="foot-col">
              <h4>Navigasi</h4>
              <a href="#fitur">Fitur</a>
              <a href="#paket">Paket</a>
              <a href="#galeri">Galeri</a>
            </div>
          </div>
          <div className="foot-bottom">
            <span>© 2026 Lunar Photobooth. Semua hak cipta dilindungi.</span>
            <span>Dibuat dengan flash dan sedikit drama.</span>
          </div>
        </div>
      </footer>
    </>
  );
}
