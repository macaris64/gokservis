"use client";

import { motion } from "framer-motion";
import { Crosshair, Cpu, Eye, RotateCcw, CheckCircle } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";

const specs = [
  { f: "Gözlem Sistemi",     d: "3D LIDAR + AI Destekli Optik",  a: "Gece/Gündüz tam otonom yanaşma" },
  { f: "Kenetlenme",         d: "Evrensel UPA (Adaptör)",         a: "Her marka uyduya servis" },
  { f: "Müdahale Kolu",      d: "7-Eksenli Çift Robotik Kol",     a: "Karmaşık tamir ve parça değişimi" },
  { f: "Yakıt Kapasitesi",   d: "Modüler 50 kg – 500 kg",         a: "Çoklu uyduya tek seferde servis" },
  { f: "İşlemci",            d: "Radyasyon Dayanımlı SoC",        a: "Otonom karar verme" },
  { f: "Manevra Sistemi",    d: "24'lü RCS + Hibrit İtki",        a: "6-DOF tam serbesti" },
  { f: "Görüntü Sistemi",    d: "8K Steroskopik Kamera",          a: "Mikro-meteor hasarı tespiti" },
  { f: "Güç Kaynağı",        d: "Katlanır Güneş Panelleri",       a: "Sürekli yenilenen enerji" },
];

const sixDof = [
  { axis: "İleri / Geri",  icon: "↔️", desc: "X ekseni öteleme" },
  { axis: "Sağ / Sol",     icon: "↕️", desc: "Y ekseni öteleme" },
  { axis: "Yukarı / Aşağı",icon: "⬆️", desc: "Z ekseni öteleme" },
  { axis: "Yaw (Sapma)",   icon: "🔄", desc: "Z ekseni dönme" },
  { axis: "Pitch",         icon: "🔃", desc: "Y ekseni dönme" },
  { axis: "Roll (Yalpa)",  icon: "↩️", desc: "X ekseni dönme" },
];

const compatible = [
  { name: "SpaceBus (Airbus)",         flag: "🇪🇺" },
  { name: "BSS-702 (Boeing)",          flag: "🇺🇸" },
  { name: "A2100 (Lockheed Martin)",   flag: "🇺🇸" },
  { name: "SmallSat (Multiple)",       flag: "🌍" },
  { name: "TÜRKSAT Serisi",            flag: "🇹🇷" },
  { name: "İMECE (TUA)",               flag: "🇹🇷" },
];

const opLoop = [
  { step: "01", color: "var(--cyan)",   icon: "⛽", label: "Dolum",    title: "KUTAY'da Yükleme",    desc: "GEZGİN KUTAY'a kenetlenir. PMD sistemi ile sıfır yerçekiminde yakıt aktarımı gerçekleşir. Yedek parçalar sırt çantasına alınır." },
  { step: "02", color: "var(--orange)", icon: "🚀", label: "İntikal",  title: "Yörünge Transferi",    desc: "Kimyasal itki motorlarıyla hızlı Delta-V manevrası. Hedef uyduya hassas yakınsama için AI destekli otonom navigasyon aktive olur." },
  { step: "03", color: "var(--purple)", icon: "🔧", label: "Hizmet",   title: "Müşteri Servisi",      desc: "UPA ile nazik kenetlenme. 7-eksenli robotik kollarla yakıt transferi, tamir veya Edge Computing modülü kurulumu." },
  { step: "04", color: "var(--green)",  icon: "🔄", label: "Dönüş",   title: "KUTAY'a Geri Dönüş",   desc: "Görev tamamlanır. Güneş panelleriyle enerji toplarken KUTAY'a döner. Diagnostik kontrol yapılır, bir sonraki göreve hazırlanır." },
];

export default function GezginPage() {
  return (
    <div className="page-wrapper">

      {/* ── HERO ── */}
      <section className="hero hero--sub" style={{ paddingBottom: "var(--space-3xl)" }}>
        <div className="glow-bg glow-bg--orange"
          style={{ width: 560, height: 560, top: 0, right: "10%", transform: "translateY(-20%)" }} />

        <div className="hero__content">
          <div className="hero__badge">
            <span className="badge badge--orange">
              <Crosshair size={13} /> Platform B — Light Service Tug
            </span>
          </div>

          <motion.h1
            className="heading-hero grad-orange"
            initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, delay: 0.1 }}
          >
            GEZGİN
          </motion.h1>

          <motion.p
            className="heading-sm c-2"
            initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
            style={{ fontFamily: "var(--font-heading)", letterSpacing: "0.06em", marginBottom: "var(--space-md)" }}
          >
            Çevik Operasyon Birimi & Yörünge Taksimetresi
          </motion.p>

          <motion.p className="body-lg hero__subtitle"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
          >
            KUTAY&apos;ın eli ve ayağı. Yüksek manevra kabiliyetine sahip, otonom
            veya uzaktan kontrollü servis aracı. Bir kez fırlatılır, yüzlerce kez görev yapar.
          </motion.p>

          {/* GEZGİN visual */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
            style={{ position: "relative", width: 240, height: 240, margin: "var(--space-xl) auto 0" }}
          >
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <motion.div
                animate={{ rotate: [0, 6, -6, 0] }} transition={{ duration: 4, repeat: Infinity }}
                style={{
                  width: 80, height: 80, borderRadius: "var(--radius-lg)",
                  background: "var(--orange-faint)", border: "1px solid var(--orange-border)",
                  display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2.2rem",
                }}
              >
                🛰️
              </motion.div>
            </div>
            {/* RCS thruster dots */}
            {Array.from({ length: 8 }, (_, i) => {
              const a = (i * 45 * Math.PI) / 180;
              const x = 50 + Math.cos(a) * 36;
              const y = 50 + Math.sin(a) * 36;
              return (
                <motion.div key={i}
                  animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.3, 0.8] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                  style={{
                    position: "absolute", left: `${x}%`, top: `${y}%`,
                    transform: "translate(-50%,-50%)",
                    width: 7, height: 7, borderRadius: "50%",
                    background: "var(--orange)", boxShadow: "0 0 8px var(--orange)",
                  }}
                />
              );
            })}
            <motion.div
              animate={{ rotate: 360 }} transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
              style={{ position: "absolute", inset: 12, borderRadius: "50%", border: "1px dashed rgba(255,69,0,0.14)" }}
            />
          </motion.div>
        </div>
      </section>

      {/* ── 6-DOF ── */}
      <section id="6dof" className="section">
        <div className="container">
          <div className="grid-2" style={{ alignItems: "center", gap: "var(--space-2xl)" }}>
            <AnimatedSection direction="left">
              <span className="label c-orange">Tahrik & Manevra</span>
              <h2 className="heading-xl" style={{ marginTop: "var(--space-sm)", marginBottom: "var(--space-md)" }}>
                6-DOF: Yörünge Çevikliği
              </h2>
              <p className="body-md" style={{ marginBottom: "var(--space-xl)" }}>
                Uzayda her yöne tam hakimiyet. 24 reaksiyon kontrol thruster&apos;ı ile
                milimetrik hassasiyette manevralar. Hem hızlı intikal hem de nazik
                kenetlenme için hibrit itki mimarisi.
              </p>

              <div className="grid-2" style={{ gap: "var(--space-sm)", marginBottom: "var(--space-lg)" }}>
                {sixDof.map((ax, i) => (
                  <motion.div key={ax.axis}
                    initial={{ opacity: 0, scale: 0.85 }} whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }} transition={{ delay: i * 0.09 }}
                    className="card card--neutral"
                    style={{ padding: "12px 14px" }}
                  >
                    <div style={{ fontSize: "1.25rem", marginBottom: 4 }}>{ax.icon}</div>
                    <p style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--orange)" }}>{ax.axis}</p>
                    <p style={{ fontSize: "0.72rem", color: "var(--text-3)", marginTop: 2 }}>{ax.desc}</p>
                  </motion.div>
                ))}
              </div>

              <div className="card card--orange">
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                  <div className="card__icon card__icon--orange" style={{ width: 36, height: 36, minWidth: 36 }}>
                    <Crosshair size={16} strokeWidth={1.5} />
                  </div>
                  <p style={{ fontSize: "0.875rem", fontWeight: 700, color: "var(--text-1)" }}>Hibrit İtki Sistemi</p>
                </div>
                <p style={{ fontSize: "0.8rem", color: "var(--text-2)" }}>
                  Hızlı intikal için <span style={{ color: "var(--orange)" }}>kimyasal motorlar</span> →
                  Hassas kenetlenme için <span style={{ color: "var(--cyan)" }}>soğuk gaz / iyon thruster</span>
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right">
              <div className="card" style={{ padding: "var(--space-xl)" }}>
                <p className="card__title" style={{ marginBottom: "var(--space-lg)" }}>RCS Thruster Konfigürasyonu</p>
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: 180 }}>
                  <div style={{ position: "relative" }}>
                    <div style={{ width: 80, height: 48, background: "var(--orange-faint)", border: "1px solid var(--orange-border)", borderRadius: "var(--radius-md)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem" }}>🛰️</div>
                    {[
                      { pos: { top: -12, left: 4 } },  { pos: { top: -12, right: 4 } },
                      { pos: { bottom: -12, left: 4 } },{ pos: { bottom: -12, right: 4 } },
                      { pos: { left: -12, top: "50%"  } }, { pos: { right: -12, top: "50%" } },
                    ].map((t, idx) => (
                      <motion.div key={idx}
                        animate={{ opacity: [0.35, 1, 0.35] }}
                        transition={{ duration: 1.2, repeat: Infinity, delay: idx * 0.18 }}
                        style={{ position: "absolute", width: 10, height: 10, background: "var(--orange)", borderRadius: 2, boxShadow: "0 0 6px var(--orange)", transform: t.pos.top === "50%" || t.pos.top === "50%" ? "translateY(-50%)" : undefined, ...t.pos }}
                      />
                    ))}
                  </div>
                </div>
                <p style={{ textAlign: "center", fontSize: "0.75rem", color: "var(--text-3)", marginTop: "var(--space-md)" }}>
                  24 Reaksiyon Kontrol Sistemi (RCS) thruster
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── UPA ── */}
      <section id="upa" className="section">
        <div className="container">
          <AnimatedSection className="section-header section-header--center">
            <span className="label c-cyan">Evrensel Uyumluluk</span>
            <h2 className="heading-xl">Gök-Kenet & Evrensel Port Adaptörü (UPA)</h2>
            <p className="body-lg">
              Her uydu farklı yakıt girişi ve tutma koluna sahip. UPA bu sorunun kesin çözümüdür.
            </p>
          </AnimatedSection>

          <div className="grid-2">
            <AnimatedSection direction="left">
              <div className="card" style={{ height: "100%" }}>
                <p className="card__title c-cyan" style={{ marginBottom: "var(--space-lg)" }}>Uyumlu Uydu Platformları</p>
                {compatible.map((s, i) => (
                  <motion.div key={s.name}
                    initial={{ opacity: 0, x: -14 }} whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                    style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 0", borderBottom: "1px solid rgba(0,245,255,0.06)" }}
                  >
                    <CheckCircle size={13} color="var(--cyan)" />
                    <span style={{ fontSize: "0.875rem", color: "var(--text-1)", flex: 1 }}>{s.name}</span>
                    <span style={{ fontSize: "1.1rem" }}>{s.flag}</span>
                  </motion.div>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right">
              <div className="card card--orange" style={{ height: "100%" }}>
                <p className="card__title c-orange" style={{ marginBottom: "var(--space-lg)" }}>Kenetlenme Teknolojisi</p>
                {[
                  { icon: "🤝", t: "Yumuşak Kenetlenme",    d: "Elektromanyetik veya mekanik sönümleyicilerle müşteri uydusuna fiziksel darbe vurmadan nazikçe tutunma." },
                  { icon: "🔌", t: "Modüler Adaptör Kafası", d: "Farklı uydu markalarının dolum vanalarına ve yapısal çerçevelerine uyum sağlayan değiştirilebilir uç mekanizması." },
                  { icon: "〰️", t: "Titreşim İzolasyonu",    d: "Thruster ateşlemesi sırasında müşteri uydusuna aktarılan titreşimi sönümleyen yay-damper sistemi." },
                ].map((item) => (
                  <div key={item.t} style={{ display: "flex", gap: 14, marginBottom: "var(--space-lg)" }}>
                    <span style={{ fontSize: "1.6rem", flexShrink: 0, marginTop: 2 }}>{item.icon}</span>
                    <div>
                      <p style={{ fontSize: "0.875rem", fontWeight: 700, color: "var(--text-1)", marginBottom: 4 }}>{item.t}</p>
                      <p style={{ fontSize: "0.8rem", color: "var(--text-2)", lineHeight: 1.6 }}>{item.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── ROBOTIC ARMS ── */}
      <section id="robotic" className="section">
        <div className="container">
          <div className="grid-2" style={{ alignItems: "center", gap: "var(--space-2xl)" }}>
            <AnimatedSection direction="left">
              <span className="label c-purple">Robotik Müdahale</span>
              <h2 className="heading-xl" style={{ marginTop: "var(--space-sm)", marginBottom: "var(--space-md)" }}>
                Uzaydaki Cerrah
              </h2>
              <p className="body-md">
                GEZGİN sadece yakıt taşımaz. Üzerinde KUTAY&apos;dan aldığı komutları ve
                yedek parçaları uygulayan cerrahi hassasiyette robotik kollar bulunur.
              </p>
            </AnimatedSection>

            <AnimatedSection direction="right">
              {[
                { icon: Eye,       iconClass: "card__icon--cyan",   title: "Görsel Denetim Sistemi",  desc: "8K LIDAR ve steroskopik kameralar. Mikro-meteor çarpmaları ve termal battaniye hasarlarını tespit eder." },
                { icon: Cpu,       iconClass: "card__icon--purple", title: "AI Destekli Karar Alma",  desc: "Radyasyon dayanımlı SoC'de çalışan otonom algoritma. Beklenmedik durumlarda bağımsız karar verir." },
                { icon: RotateCcw, iconClass: "card__icon--orange", title: "7-Eksenli Çift Kol",      desc: "Güneş paneli açma, kablo onarımı, sensör modülü değişimi ve Edge Computing kurulumu için hassas manipülatörler." },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div key={item.title}
                    initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }} transition={{ delay: i * 0.14 }}
                    className="card card--hrow card--neutral"
                    style={{ marginBottom: "var(--space-md)" }}
                  >
                    <div className={`card__icon ${item.iconClass}`}><Icon size={18} strokeWidth={1.5} /></div>
                    <div className="card__content">
                      <p className="card__title">{item.title}</p>
                      <p className="card__body">{item.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── OP LOOP ── */}
      <section id="tamir" className="section">
        <div className="container">
          <AnimatedSection className="section-header section-header--center">
            <span className="label c-green">Operasyonel Döngü</span>
            <h2 className="heading-xl">Shuttle Modu: Sonsuz Döngü</h2>
          </AnimatedSection>

          <div className="op-loop">
            {opLoop.map((s, i) => (
              <AnimatedSection key={s.step} delay={i * 0.12}>
                <div className="op-step" style={{ borderColor: `color-mix(in srgb, ${s.color} 22%, transparent)`, height: "100%", overflow: "hidden" }}>
                  <div className="step-number" style={{ color: s.color }}>{s.step}</div>
                  <div className="op-step__icon">{s.icon}</div>
                  <p className="op-step__label" style={{ color: s.color }}>{s.label}</p>
                  <p className="op-step__title">{s.title}</p>
                  <p className="op-step__body">{s.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── TECH SPECS ── */}
      <section className="section" style={{ paddingBottom: "var(--space-3xl)" }}>
        <div className="container">
          <AnimatedSection className="section-header">
            <span className="label c-orange">Teknik Detaylar</span>
            <h2 className="heading-xl">GEZGİN Teknik Spesifikasyonları</h2>
          </AnimatedSection>
          <AnimatedSection>
            <div className="data-table-wrap data-table-wrap--orange">
              <table className="data-table data-table--orange">
                <thead>
                  <tr><th>Özellik</th><th>Teknik Detay</th><th>Operasyonel Avantaj</th></tr>
                </thead>
                <tbody>
                  {specs.map((r, i) => (
                    <motion.tr key={r.f}
                      initial={{ opacity: 0, x: -14 }} whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                    >
                      <td className="cell-highlight">{r.f}</td>
                      <td>{r.d}</td>
                      <td><span className="cell-chip cell-chip--green">{r.a}</span></td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </AnimatedSection>
        </div>
      </section>

    </div>
  );
}
