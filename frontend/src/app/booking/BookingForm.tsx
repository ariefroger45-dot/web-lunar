"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

type FormData = {
  nama: string;
  tanggal: string;
  paket: string;
  tempat: string;
  email: string;
  whatsapp: string;
};

type PaymentResult = {
  referenceId: string;
  paymentRequestId: string;
  qrString: string;
  amount: number;
  expiresAt: string | null;
};

const PAKET_LABEL: Record<string, string> = {
  "soft-file-only": "Soft File Only — mulai Rp1.000.000",
  unlimited: "Unlimited — mulai Rp2.000.000 (Favorit)",
  "cetak-reguler": "Cetak Reguler — mulai Rp1.500.000",
};

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function BookingForm() {
  const searchParams = useSearchParams();

  const [data, setData] = useState<FormData>({
    nama: "",
    tanggal: "",
    paket: "",
    tempat: "",
    email: "",
    whatsapp: "",
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof FormData, boolean>>
  >({});
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [payment, setPayment] = useState<PaymentResult | null>(null);

  const today = new Date().toISOString().split("T")[0];

  // prefill paket dari query string, mis. /booking?paket=unlimited
  useEffect(() => {
    const preset = searchParams.get("paket");
    if (preset && PAKET_LABEL[preset]) {
      setData((d) => ({ ...d, paket: preset }));
    }
  }, [searchParams]);

  function formatTanggal(value: string) {
    if (!value) return "-";
    const d = new Date(value + "T00:00:00");
    return d.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  function handleChange(field: keyof FormData, value: string) {
    setData((d) => ({ ...d, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: false }));
  }

  function validate() {
    const newErrors: Partial<Record<keyof FormData, boolean>> = {};
    if (!data.nama.trim()) newErrors.nama = true;
    if (!data.tanggal) newErrors.tanggal = true;
    if (!data.paket) newErrors.paket = true;
    if (!data.tempat.trim()) newErrors.tempat = true;
    if (!/^\S+@\S+\.\S+$/.test(data.email)) newErrors.email = true;
    if (!/^[0-9+ ]{9,15}$/.test(data.whatsapp)) newErrors.whatsapp = true;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitError(null);

    if (!validate()) return;

    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/booking/create-payment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Gagal membuat QR pembayaran");

      const result: PaymentResult = await res.json();
      setPayment(result);
    } catch (err) {
      setSubmitError("Gagal memproses booking. Coba lagi sebentar lagi ya.");
    } finally {
      setLoading(false);
    }
  }

  const nomorHP = "6289672249269";
  const waText = encodeURIComponent(
    `Halo Lunar,\n\nsaya ${data.nama} mau konfirmasi booking photobooth.\n\nTanggal: ${formatTanggal(
      data.tanggal,
    )}\nTempat: ${data.tempat}\nPaket: ${PAKET_LABEL[data.paket] ?? data.paket}\nEmail: ${data.email}`,
  );
  const waFollowUpHref = `https://wa.me/${nomorHP}?text=${waText}`;

  return (
    <>
      <header>
        <nav>
          <a href="/" className="logo">
            <img src="/lunar-logo.png" alt="Lunar" />
          </a>
          <a href="/" className="back-link">
            ← Kembali ke Beranda
          </a>
        </nav>
      </header>

      <main>
        <section className="page-head">
          <div className="wrap">
            <span className="eyebrow">Form Booking</span>
            <h1>Isi data acara kamu.</h1>
            <p>
              Lengkapi form di bawah, lalu selesaikan DP lewat QRIS untuk kunci
              jadwal.
            </p>
          </div>
        </section>

        <section className="booking">
          <div className="wrap booking-grid">
            <div>
              {!payment ? (
                <form className="form-card" onSubmit={handleSubmit} noValidate>
                  <h2>Detail Booking</h2>
                  <p className="sub">Semua kolom wajib diisi ya.</p>

                  <div className={`field${errors.nama ? " has-error" : ""}`}>
                    <label htmlFor="nama">Nama Lengkap</label>
                    <input
                      type="text"
                      id="nama"
                      placeholder="cth. Dinda Pratiwi"
                      value={data.nama}
                      onChange={(e) => handleChange("nama", e.target.value)}
                    />
                    <span className="field-error">
                      Nama lengkap wajib diisi.
                    </span>
                  </div>

                  <div className="field-row">
                    <div
                      className={`field${errors.tanggal ? " has-error" : ""}`}
                    >
                      <label htmlFor="tanggal">Tanggal Acara</label>
                      <input
                        type="date"
                        id="tanggal"
                        min={today}
                        value={data.tanggal}
                        onChange={(e) =>
                          handleChange("tanggal", e.target.value)
                        }
                      />
                      <span className="field-error">
                        Pilih tanggal acara terlebih dahulu.
                      </span>
                    </div>
                    <div className={`field${errors.paket ? " has-error" : ""}`}>
                      <label htmlFor="paket">Paket Photobooth</label>
                      <select
                        id="paket"
                        value={data.paket}
                        onChange={(e) => handleChange("paket", e.target.value)}
                      >
                        <option value="" disabled>
                          Pilih paket
                        </option>
                        <option value="soft-file-only">
                          Soft File Only — mulai Rp1.000.000
                        </option>
                        <option value="unlimited">
                          Unlimited — mulai Rp2.000.000 (Favorit)
                        </option>
                        <option value="cetak-reguler">
                          Cetak Reguler — mulai Rp1.500.000
                        </option>
                      </select>
                      <span className="field-error">
                        Pilih salah satu paket.
                      </span>
                    </div>
                  </div>

                  <div className={`field${errors.tempat ? " has-error" : ""}`}>
                    <label htmlFor="tempat">Tempat Acara</label>
                    <input
                      type="text"
                      id="tempat"
                      placeholder="cth. Grand I Hotel"
                      value={data.tempat}
                      onChange={(e) => handleChange("tempat", e.target.value)}
                    />
                    <span className="field-error">
                      Tempat acara wajib diisi.
                    </span>
                  </div>

                  <div className="field-row">
                    <div className={`field${errors.email ? " has-error" : ""}`}>
                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        id="email"
                        placeholder="nama@email.com"
                        value={data.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                      />
                      <span className="field-error">
                        Masukkan alamat email yang valid.
                      </span>
                    </div>
                    <div
                      className={`field${errors.whatsapp ? " has-error" : ""}`}
                    >
                      <label htmlFor="whatsapp">Nomor WhatsApp</label>
                      <input
                        type="tel"
                        id="whatsapp"
                        placeholder="0812xxxxxxx"
                        value={data.whatsapp}
                        onChange={(e) =>
                          handleChange("whatsapp", e.target.value)
                        }
                      />
                      <span className="field-error">
                        Masukkan nomor WhatsApp yang valid.
                      </span>
                    </div>
                  </div>

                  {submitError && (
                    <p
                      className="field-error"
                      style={{ display: "block", marginBottom: 16 }}
                    >
                      {submitError}
                    </p>
                  )}

                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? "Memproses..." : "Kirim Booking & Bayar DP"}
                  </button>
                  <p className="form-note">
                    Dengan mengirim form ini, kamu setuju dihubungi tim Lunar
                    via WhatsApp/email.
                  </p>
                </form>
              ) : (
                <div className="confirm-card show">
                  <div className="confirm-icon">✓</div>
                  <h2>Scan untuk bayar DP</h2>
                  <p>
                    Selesaikan pembayaran DP lewat QRIS di bawah ini untuk kunci
                    jadwal acara kamu.
                  </p>

                  <div className="qr-box">
                    <img
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(
                        payment.qrString,
                      )}`}
                      alt="QR pembayaran"
                      width={220}
                      height={220}
                    />
                    <span className="qr-amount">
                      Total DP <b>Rp{payment.amount.toLocaleString("id-ID")}</b>
                    </span>
                    <span className="qr-status">Menunggu pembayaran...</span>
                  </div>

                  <div className="confirm-summary">
                    <div>
                      <span className="k">Nama</span>
                      <span className="v">{data.nama}</span>
                    </div>
                    <div>
                      <span className="k">Tanggal Acara</span>
                      <span className="v">{formatTanggal(data.tanggal)}</span>
                    </div>
                    <div>
                      <span className="k">Tempat Acara</span>
                      <span className="v">{data.tempat}</span>
                    </div>
                    <div>
                      <span className="k">Paket</span>
                      <span className="v">{PAKET_LABEL[data.paket]}</span>
                    </div>
                    <div>
                      <span className="k">Email</span>
                      <span className="v">{data.email}</span>
                    </div>
                    <div>
                      <span className="k">WhatsApp</span>
                      <span className="v">{data.whatsapp}</span>
                    </div>
                  </div>

                  <div className="confirm-actions">
                    <a
                      href={waFollowUpHref}
                      target="_blank"
                      className="btn btn-primary"
                      rel="noreferrer"
                    >
                      Konfirmasi via WhatsApp
                    </a>
                    <a href="/" className="btn btn-outline-dark">
                      Kembali ke Beranda
                    </a>
                  </div>
                </div>
              )}
            </div>

            <aside>
              <div className="side-card">
                <h3>Setelah kamu kirim form</h3>
                <ul className="side-steps">
                  <li>
                    <span className="n">01</span>
                    <span>
                      Scan QR yang muncul untuk bayar DP dan kunci tanggal.
                    </span>
                  </li>
                  <li>
                    <span className="n">02</span>
                    <span>
                      Tim Lunar konfirmasi dan diskusi detail acara kamu.
                    </span>
                  </li>
                  <li>
                    <span className="n">03</span>
                    <span>Sisa pembayaran dilunasi di hari-H.</span>
                  </li>
                </ul>
              </div>
              <div className="side-card contact">
                <h3>Butuh bantuan cepat?</h3>
                <p>
                  Kalau ada pertanyaan sebelum booking, langsung chat tim kami
                  saja.
                </p>
                <a
                  href="https://wa.me/6289672249269?text=Halo Lunar"
                  className="btn btn-primary"
                >
                  Chat via WhatsApp
                </a>
              </div>
            </aside>
          </div>
        </section>
      </main>

      <footer>© 2026 Lunar Photobooth. Semua hak cipta dilindungi.</footer>
    </>
  );
}
