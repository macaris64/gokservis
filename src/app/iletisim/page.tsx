"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Mail, Send, Building2, Rocket, CheckCircle } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";

const offices = [
  {
    city: "Uşak",
    country: "Türkiye 🇹🇷",
    role: "Ar-Ge & Yazılım Merkezi",
    address: "Uşak Üniversitesi Teknoloji Geliştirme Bölgesi\nUşak 64000",
    icon: Building2,
    color: "var(--cyan)",
    iconClass: "card__icon--cyan",
    cardClass: "office-card--cyan",
    desc: "KUTAY ve GEZGİN sistemlerinin yazılım mimarisi ve mühendislik tasarımı. TUSAŞ & TUA koordinasyon merkezi.",
  },
  {
    city: "Mogadişu",
    country: "Somali 🇸🇴",
    role: "Fırlatma Üssü & Lojistik",
    address: "Somali Türk Uzay Limanı\nMogadişu Uluslararası Havalimanı Yakını\nBenadir Bölgesi, Somali",
    icon: Rocket,
    color: "var(--orange)",
    iconClass: "card__icon--orange",
    cardClass: "office-card--orange",
    desc: "Ekvatoral fırlatma avantajı ile düşük maliyetli yörünge erişimi. Kriyojenik depolama ve fırlatma rampaları.",
  },
];

const subjects = [
  "Yakıt İkmali Hizmeti (Refueling)",
  "Bakım & Modernizasyon Talebi",
  "Tamir & Kurtarma Görüşmesi",
  "Çekici & Lojistik İncelemesi",
  "Gök-Güvence Aboneliği",
  "Edge-as-a-Service Görüşmesi",
  "Yatırım & Ortaklık Görüşmesi",
  "Basın & İletişim",
  "Diğer",
];

export default function IletisimPage() {
  const [form, setForm] = useState({ name: "", company: "", email: "", subject: "", message: "" });
  const [loading,   setLoading]   = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Sunucu hatası");
      setSubmitted(true);
    } catch {
      alert("Mesaj gönderilemedi. Lütfen tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-wrapper">

      {/* ── HERO ── */}
      <section className="hero hero--sub" style={{ paddingBottom: "var(--space-3xl)" }}>
        <div className="glow-bg glow-bg--cyan"
          style={{ width: 500, height: 500, top: "5%", left: "50%", transform: "translate(-50%,-20%)" }} />

        <div className="hero__content">
          <div className="hero__badge">
            <span className="badge badge--cyan">
              <Mail size={13} /> Gelecekteki İşbirlikleri İçin
            </span>
          </div>

          <motion.h1
            className="heading-hero"
            initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, delay: 0.1 }}
          >
            İletişim<span className="grad-cyan">e Geç</span>
          </motion.h1>

          <motion.p className="body-lg hero__subtitle"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
          >
            Uyduları kaderine terk etmeyelim. GökServis ile yörüngenizdeki
            varlıklarınızı birlikte koruyalım.
          </motion.p>
        </div>
      </section>

      {/* ── OFFICES ── */}
      <section className="section section--sm">
        <div className="container">
          <div className="grid-2">
            {offices.map((o, i) => {
              const Icon = o.icon;
              return (
                <AnimatedSection key={o.city} delay={i * 0.15}>
                  <div className={`office-card ${o.cardClass}`}>
                    <div className="office-card__header">
                      <div className={`office-card__icon-wrap ${o.iconClass}`} style={{ width: 54, height: 54 }}>
                        <Icon size={24} strokeWidth={1.5} />
                      </div>
                      <div>
                        <p className="office-card__city" style={{ color: o.color }}>{o.city}</p>
                        <p className="office-card__country">{o.country}</p>
                        <p className="office-card__role">{o.role}</p>
                      </div>
                    </div>

                    <div className="office-card__address">
                      <MapPin size={13} style={{ color: o.color, flexShrink: 0, marginTop: 2 }} />
                      <pre style={{ fontFamily: "inherit", fontSize: "0.8rem", color: "var(--text-2)", lineHeight: 1.65, whiteSpace: "pre-wrap" }}>
                        {o.address}
                      </pre>
                    </div>

                    <p className="office-card__desc">{o.desc}</p>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── FORM ── */}
      <section className="section" style={{ paddingBottom: "var(--space-3xl)" }}>
        <div className="container">
          <AnimatedSection className="section-header section-header--center">
            <span className="label c-cyan">Görev Talebi Gönder</span>
            <h2 className="heading-xl">Bize Ulaşın</h2>
            <p className="body-lg">
              24 saat içinde bir uzay mühendisi veya iş geliştirme temsilcimiz
              size dönüş yapacak.
            </p>
          </AnimatedSection>

          <div style={{ maxWidth: 680, marginInline: "auto" }}>
            <AnimatedSection>
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }}
                  className="form-success"
                >
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 0.55 }}
                    className="form-success__icon"
                  >
                    <CheckCircle size={64} />
                  </motion.div>
                  <h3 className="heading-lg c-green" style={{ marginBottom: "var(--space-sm)" }}>
                    Mesaj Yörüngeye Fırlatıldı!
                  </h3>
                  <p className="body-md">
                    Talebiniz alındı. GökServis ekibi en geç 24 saat içinde sizinle
                    iletişime geçecek.
                  </p>
                </motion.div>
              ) : (
                <form className="form" onSubmit={onSubmit}>
                  <div className="form__row">
                    <div className="form__group" style={{ marginBottom: 0 }}>
                      <label className="form__label">Ad Soyad <span>*</span></label>
                      <input name="name" type="text" required value={form.name} onChange={onChange}
                        placeholder="Dr. Ahmet Yıldız" className="form__input" />
                    </div>
                    <div className="form__group" style={{ marginBottom: 0 }}>
                      <label className="form__label">Şirket / Kurum</label>
                      <input name="company" type="text" value={form.company} onChange={onChange}
                        placeholder="TÜRKSAT A.Ş." className="form__input" />
                    </div>
                  </div>

                  <div className="form__group">
                    <label className="form__label">E-Posta Adresi <span>*</span></label>
                    <input name="email" type="email" required value={form.email} onChange={onChange}
                      placeholder="ahmet@turksat.com.tr" className="form__input" />
                  </div>

                  <div className="form__group">
                    <label className="form__label">Konu <span>*</span></label>
                    <select name="subject" required value={form.subject} onChange={onChange} className="form__select">
                      <option value="">Konu seçin...</option>
                      {subjects.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>

                  <div className="form__group">
                    <label className="form__label">Mesaj <span>*</span></label>
                    <textarea name="message" required rows={6} value={form.message} onChange={onChange}
                      placeholder="Uydunuzun mevcut durumu, yörünge bilgisi ve ihtiyacınız hakkında bilgi verin..."
                      className="form__textarea" />
                  </div>

                  <motion.button
                    type="submit" disabled={loading}
                    whileHover={{ scale: loading ? 1 : 1.02 }} whileTap={{ scale: loading ? 1 : 0.98 }}
                    className="form__submit"
                  >
                    {loading ? (
                      <><div className="spinner" /> <span>Gönderiliyor...</span></>
                    ) : (
                      <><Send size={17} /> <span>Mesajı Yörüngeye Fırlat</span></>
                    )}
                  </motion.button>

                  <p className="form__note">
                    Bilgileriniz gizli tutulur ve yalnızca GökServis ekibi tarafından görülür.
                  </p>
                </form>
              )}
            </AnimatedSection>
          </div>
        </div>
      </section>

    </div>
  );
}
