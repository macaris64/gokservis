"use client";

import { motion } from "framer-motion";
import { Thermometer, Anchor, Droplets, Package, Shield, Zap, CheckCircle } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";

const thermalCards = [
  {
    icon: Thermometer, iconClass: "card__icon--cyan",
    title: "MLI İzolasyon",
    points: ["40+ katmanlı Multi-Layer Insulation", "Güneş radyasyonuna karşı bariyer", "Kriyojenik yakıt buharlaşmasını engeller", "Isı yönetimi: −269 °C ile +120 °C arası"],
  },
  {
    icon: Zap, iconClass: "card__icon--purple",
    title: "Aktif Soğutma",
    points: ["Kapalı devre kriyojenik soğutma", "Tank basıncını sabit tutar", "Sıfır kayıp hedefli termal kontrol", "%99 yakıt korunumu garantisi"],
  },
  {
    icon: Package, iconClass: "card__icon--orange",
    title: "Ameliyathane Modülü",
    points: ["Gelişmiş robotik kollarla cerrahi müdahale", "Yedek parça deposu (sensör, panel, modül)", "GEZGİN'in getirdiği uydulara donanım güncellemesi", "Edge Computing modülü entegrasyon kapasitesi"],
  },
];

const fuelRows = [
  { type: "Hidrazin (N₂H₄)",  use: "Kimyasal İtki",        cap: "500 kg",  loss: "< %0.1/ay",  temp: "−10 °C → +50 °C" },
  { type: "Xenon (Xe)",        use: "İyon İtki",             cap: "200 kg",  loss: "< %0.05/ay", temp: "−110 °C" },
  { type: "Kripton (Kr)",      use: "Elektrikli İtki",       cap: "300 kg",  loss: "< %0.05/ay", temp: "−157 °C" },
  { type: "Helyum (He)",       use: "Basınçlandırma Gazı",   cap: "50 kg",   loss: "< %0.02/ay", temp: "−269 °C" },
];

const dockSpecs = [
  { k: "Eş Zamanlı Kenetlenme",   v: "6 Port" },
  { k: "GEZGİN Kapasitesi",       v: "4 Araç" },
  { k: "Tanker Portları",          v: "2 Port" },
  { k: "Kenetlenme Protokolü",    v: "IDSS / APAS-95" },
  { k: "Güç Transferi / Port",    v: "10 kW" },
  { k: "Veri Aktarım Hızı",       v: "1 Gbps" },
  { k: "Mekanik Yük Kapasitesi",  v: "5 000 kg" },
];

const advRows = [
  { prob: "Buharlaşma Kaybı",  sol: "Aktif Soğutma & MLI (40+ katman)",      adv: "%99 Yakıt Korunumu" },
  { prob: "Fırlatma Maliyeti", sol: "Somali Ekvatoral Çıkış (Roketsan)",       adv: "%30 Daha Fazla Faydalı Yük" },
  { prob: "Uyum Sorunu",       sol: "Evrensel Port Adaptörü (UPA)",            adv: "Tüm Uydularla Uyumluluk" },
  { prob: "Aktarım Riski",     sol: "PMD Teknolojisi (Kapiler Pompa)",          adv: "Sıfır Yerçekiminde Kesintisiz Akış" },
];

const pmdSteps = [
  { step: "01", icon: "🕸️", color: "var(--cyan)",   title: "PMD Kafes Yapısı",     desc: "Tank içindeki kılcal yapılar ve metal kafesler, yüzey gerilimini kullanarak sıvıyı sürekli çıkış vanasına yönlendirir." },
  { step: "02", icon: "💧", color: "var(--purple)", title: "Kılcal Pompalama",     desc: "Hareketli parça sayısını azaltan, sıvının yüzey gerilimi ile hareket etmesini sağlayan pasif pompalama." },
  { step: "03", icon: "⚡", color: "var(--orange)", title: "Helyum Basınçlandırma", desc: "Yakıt transferi, helyum gibi itici gazlar kullanılarak kontrollü basınç farkı ile gerçekleştirilir." },
];

export default function KutayPage() {
  return (
    <div className="page-wrapper">

      {/* ── HERO ── */}
      <section className="hero hero--sub" style={{ paddingBottom: "var(--space-3xl)" }}>
        <div className="glow-bg glow-bg--cyan"
          style={{ width: 600, height: 600, top: 0, left: "50%", transform: "translate(-50%,-30%)" }} />

        <div className="hero__content">
          <div className="hero__badge">
            <span className="badge badge--cyan">
              <Anchor size={13} /> Platform A — Orbital Hub
            </span>
          </div>

          <motion.h1
            className="heading-hero grad-cyan"
            initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, delay: 0.1 }}
          >
            KUTAY
          </motion.h1>

          <motion.p
            className="heading-sm c-2"
            initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
            style={{ fontFamily: "var(--font-heading)", letterSpacing: "0.06em", marginBottom: "var(--space-md)" }}
          >
            Yörüngedeki Lojistik Üssü ve Stratejik Depo
          </motion.p>

          <motion.p
            className="body-lg hero__subtitle"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
          >
            GEO ve LEO yörüngesinde konumlandırılan yüksek kapasiteli Orbital Hub.
            Kaynaklarını yönetir, GEZGİN&apos;leri konuşlandırır ve uzay ekonomisinin
            bel kemiğini oluşturur.
          </motion.p>

          {/* Orbital visual */}
          <motion.div
            className="orbital" style={{ marginTop: "var(--space-xl)" }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
          >
            <div className="orbital__ring orbital__ring--dashed" />
            <div className="orbital__ring orbital__ring--2" />
            <div className="orbital__center">
              <div className="orbital__hub">🛸</div>
            </div>
            {/* orbiting GEZGİN */}
            <motion.div
              style={{ position: "absolute", inset: 0 }}
              animate={{ rotate: 360 }} transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
            >
              <div className="orbital__sat" style={{ top: 4, left: "50%", transform: "translateX(-50%)" }}>🛰️</div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── THERMAL DESIGN ── */}
      <section className="section">
        <div className="container">
          <AnimatedSection className="section-header">
            <span className="label c-cyan">Bölüm 1</span>
            <h2 className="heading-xl">Termal & Yapısal Tasarım: &quot;Yörünge Termosu&quot;</h2>
          </AnimatedSection>

          <div className="grid-3">
            {thermalCards.map((c, i) => {
              const Icon = c.icon;
              return (
                <AnimatedSection key={c.title} delay={i * 0.14}>
                  <div className="card" style={{ height: "100%" }}>
                    <div className={`card__icon ${c.iconClass}`}><Icon size={22} strokeWidth={1.5} /></div>
                    <p className="card__title">{c.title}</p>
                    <ul className="checklist">
                      {c.points.map((pt) => (
                        <li key={pt}><CheckCircle size={13} color="var(--cyan)" />{pt}</li>
                      ))}
                    </ul>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── FUEL TABLE ── */}
      <section id="yakit" className="section">
        <div className="container">
          <AnimatedSection className="section-header">
            <span className="label c-cyan">Yakıt Kapasitesi</span>
            <h2 className="heading-xl">Depolama Spesifikasyonları</h2>
          </AnimatedSection>
          <AnimatedSection>
            <div className="data-table-wrap">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Yakıt Türü</th><th>Kullanım Alanı</th>
                    <th>Kapasite</th><th>Buharlaşma Kaybı</th><th>Depolama Sıcaklığı</th>
                  </tr>
                </thead>
                <tbody>
                  {fuelRows.map((r, i) => (
                    <motion.tr
                      key={r.type}
                      initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }} transition={{ delay: i * 0.09 }}
                    >
                      <td className="cell-highlight">{r.type}</td>
                      <td>{r.use}</td>
                      <td><span className="cell-chip">{r.cap}</span></td>
                      <td className="cell-green">{r.loss}</td>
                      <td>{r.temp}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── GÖK-DOCK ── */}
      <section className="section">
        <div className="container">
          <div className="grid-2" style={{ alignItems: "center", gap: "var(--space-2xl)" }}>
            <AnimatedSection direction="left">
              <span className="label c-cyan">Bölüm 2</span>
              <h2 className="heading-xl" style={{ marginTop: "var(--space-sm)", marginBottom: "var(--space-md)" }}>
                Gök-Dock: Kenetlenme İstasyonu
              </h2>
              <p className="body-md" style={{ marginBottom: "var(--space-xl)" }}>
                Uluslararası standartlarla uyumlu &ldquo;Tak-Çalıştır&rdquo; mimarisi.
                Sadece yakıt değil, veri ve enerji transferine de olanak tanıyan çoklu kenetlenme arayüzleri.
              </p>

              <div className="spec-list">
                {dockSpecs.map((s, i) => (
                  <motion.div
                    key={s.k} className="spec-row"
                    initial={{ opacity: 0, x: -14 }} whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                  >
                    <span className="spec-row__key">{s.k}</span>
                    <span className="spec-row__val">{s.v}</span>
                  </motion.div>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right">
              {/* Diagram */}
              <div className="orbital" style={{ width: 300, height: 300 }}>
                <div className="orbital__ring orbital__ring--dashed" style={{ animationDuration: "28s" }} />
                <div className="orbital__ring orbital__ring--2" />
                <div className="orbital__center">
                  <div className="orbital__hub">🛸</div>
                </div>
                {[0, 60, 120, 180, 240, 300].map((angle, i) => {
                  const rad = (angle * Math.PI) / 180;
                  const x = 50 + Math.cos(rad) * 38;
                  const y = 50 + Math.sin(rad) * 38;
                  return (
                    <motion.div
                      key={angle}
                      animate={{ scale: [1, 1.2, 1], opacity: [0.55, 1, 0.55] }}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.33 }}
                      style={{ position: "absolute", left: `${x}%`, top: `${y}%`, transform: "translate(-50%,-50%)", fontSize: "1.3rem" }}
                    >
                      {i < 4 ? "🛰️" : "🚀"}
                    </motion.div>
                  );
                })}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── PMD ── */}
      <section id="pmd" className="section">
        <div className="container">
          <AnimatedSection className="section-header section-header--center">
            <span className="label c-cyan">Bölüm 3</span>
            <h2 className="heading-xl">PMD Teknolojisi: Sıfır Yerçekimi Akışkan Yönetimi</h2>
            <p className="body-lg">
              Uzayda sıvılar tankın içinde &ldquo;topaklanır&rdquo;.
              KUTAY bunu 2026&apos;nın en ileri teknolojileriyle çözer.
            </p>
          </AnimatedSection>

          <div className="grid-3">
            {pmdSteps.map((s, i) => (
              <AnimatedSection key={s.step} delay={i * 0.14}>
                <div className="card card--neutral" style={{ position: "relative", height: "100%", overflow: "hidden" }}>
                  <div className="step-number" style={{ color: s.color }}>{s.step}</div>
                  <div style={{ fontSize: "2.4rem", marginBottom: "var(--space-md)" }}>{s.icon}</div>
                  <p className="card__title" style={{ color: s.color }}>{s.title}</p>
                  <p className="card__body">{s.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── ADVANTAGE TABLE ── */}
      <section className="section">
        <div className="container">
          <AnimatedSection className="section-header">
            <span className="label c-orange">Rekabet Üstünlüğü</span>
            <h2 className="heading-xl">KUTAY Avantajları Özeti</h2>
          </AnimatedSection>
          <AnimatedSection>
            <div className="data-table-wrap">
              <table className="data-table">
                <thead>
                  <tr><th>Sorun</th><th>GökServis Çözümü</th><th>Avantaj</th></tr>
                </thead>
                <tbody>
                  {advRows.map((r, i) => (
                    <motion.tr key={r.prob}
                      initial={{ opacity: 0, x: -14 }} whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }} transition={{ delay: i * 0.09 }}
                    >
                      <td className="cell-orange">{r.prob}</td>
                      <td>{r.sol}</td>
                      <td><span className="cell-chip cell-chip--green">{r.adv}</span></td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── SUPPLY CHAIN ── */}
      <section className="section" style={{ paddingBottom: "var(--space-3xl)" }}>
        <div className="container">
          <AnimatedSection className="section-header section-header--center">
            <span className="label c-orange">Bölüm 4</span>
            <h2 className="heading-xl">İkmal Zinciri: Somali&apos;den Yörüngeye</h2>
          </AnimatedSection>
          <div className="grid-3">
            {[
              { icon: "🚀", color: "var(--orange)", title: "Düşük Maliyetli Tankerler", desc: "Roketsan tarafından Somali Uzay Limanı'ndan fırlatılan, yük taşıma odaklı tek yönlü araçlar." },
              { icon: "🛸", color: "var(--cyan)",   title: "Otonom Yakınsama",          desc: "Tankerler KUTAY'ın rehberlik sistemlerini kullanarak otonom kenetlenir. İnsan müdahalesi gerekmez." },
              { icon: "♻️", color: "var(--green)",  title: "Döngüsel Ekonomi",          desc: "Boşalan tanklar uzay çöpü olmaz; atmosfere itilir veya KUTAY'a modüler yapı elemanı olarak eklenir." },
            ].map((item, i) => (
              <AnimatedSection key={item.title} delay={i * 0.14}>
                <div className="card card--neutral" style={{ height: "100%" }}>
                  <div style={{ fontSize: "2.2rem", marginBottom: "var(--space-md)" }}>{item.icon}</div>
                  <p className="card__title" style={{ color: item.color }}>{item.title}</p>
                  <p className="card__body">{item.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
