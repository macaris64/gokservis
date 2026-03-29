"use client";

import { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Rocket, Satellite, Zap, Target } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import SimUI from "@/components/sim/SimUI";
import type { SimStats } from "@/components/sim/types";

// Must be at module top-level — ssr: false only works in Client Components
const DockingScene = dynamic(() => import("@/components/sim/DockingScene"), {
  ssr: false,
  loading: () => (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#0A0A0B",
        flexDirection: "column",
        gap: 16,
      }}
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        style={{ fontSize: "2rem" }}
      >
        🛸
      </motion.div>
      <span
        style={{
          fontFamily: "var(--font-heading)",
          fontSize: "0.7rem",
          letterSpacing: "0.14em",
          color: "var(--cyan)",
          textTransform: "uppercase",
        }}
      >
        Simülasyon Yükleniyor…
      </span>
    </div>
  ),
});

const phaseCards = [
  {
    icon: Satellite,
    color: "var(--cyan)",
    bg: "var(--cyan-faint)",
    border: "var(--cyan-border)",
    step: "01",
    title: "Hazırlık & İntikal",
    desc: "KUTAY Yörünge Hub'ından yakıt ve yedek parça yüklenen GEZGİN, kimyasal motorlarıyla 185 m/s'ye ulaşarak hedef yörüngeye transfer manevrası yapar.",
  },
  {
    icon: Target,
    color: "var(--orange)",
    bg: "var(--orange-faint)",
    border: "var(--orange-border)",
    step: "02",
    title: "Yanaşma (RPO)",
    desc: "3D LIDAR ve AI destekli navigasyon, GEZGİN'i KUTAY'ın Gök-Dock portuna 6 m/s altına düşürerek hizalar. 24 RCS thruster soğuk gaz püskürtür.",
  },
  {
    icon: Zap,
    color: "var(--purple)",
    bg: "rgba(139,92,246,0.08)",
    border: "rgba(139,92,246,0.22)",
    step: "03",
    title: "Kenetlenme (Docking)",
    desc: "Evrensel Port Adaptörü (UPA) genişler, elektromanyetik sönümleyiciler devreye girer. IDSS/APAS-95 standart kenetlenme tamamlanır. Veri + güç transferi başlar.",
  },
  {
    icon: Rocket,
    color: "var(--green)",
    bg: "rgba(16,185,129,0.08)",
    border: "rgba(16,185,129,0.22)",
    step: "04",
    title: "Yakıt Transferi (PMD)",
    desc: "PMD kılcal pompası sıfır yerçekiminde Hidrazin/Xenon akışını yönlendirir. Helyum basınçlandırma gazı aktarımı hızlandırır. Kayıp < %0.1.",
  },
];

const DEFAULT_STATS: SimStats = {
  phase: 0,
  phaseName: "Hazırlık",
  distance: "57.8",
  velocity: "0.0",
  fuelPct: 0,
};

export default function SimulasyonPage() {
  const [playing, setPlaying] = useState(true);
  const [speed, setSpeed] = useState<number>(1);
  const [cinematic, setCinematic] = useState(true);
  const [stats, setStats] = useState<SimStats>(DEFAULT_STATS);

  const handleUpdate = useCallback((s: SimStats) => setStats(s), []);
  const handleTogglePlay = useCallback(() => setPlaying((v) => !v), []);
  const handleSpeed = useCallback((s: number) => setSpeed(s), []);
  const handleToggleCinematic = useCallback(() => setCinematic((v) => !v), []);

  return (
    <div className="page-wrapper">

      {/* ── HERO ── */}
      <section className="hero hero--sub" style={{ paddingBottom: "var(--space-2xl)" }}>
        <div
          className="glow-bg"
          style={{
            background: "radial-gradient(ellipse, rgba(0,245,255,0.14) 0%, transparent 70%)",
            width: 700,
            height: 500,
            top: 0,
            left: "50%",
            transform: "translate(-50%, -25%)",
            position: "absolute",
          }}
        />

        <div className="hero__content">
          <div className="hero__badge">
            <span className="badge badge--cyan">
              <Rocket size={13} /> Interaktif 3D Simülasyon
            </span>
          </div>

          <motion.h1
            className="heading-hero grad-cyan"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.1 }}
          >
            Görev Simülatörü
          </motion.h1>

          <motion.p
            className="heading-sm c-2"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{ fontFamily: "var(--font-heading)", letterSpacing: "0.06em", marginBottom: "var(--space-md)" }}
          >
            GEZGİN → KUTAY Kenetlenme Operasyonu
          </motion.p>

          <motion.p
            className="body-lg hero__subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Gerçek zamanlı 3D simülasyon ile GEZGİN servis aracının KUTAY Orbital Hub&apos;ına
            kenetlenme sürecini adım adım keşfedin. Kamerayı serbest bırakın, açıyı değiştirin,
            hızı ayarlayın.
          </motion.p>
        </div>
      </section>

      {/* ── 3D SIMULATION ── */}
      <section id="sim" className="section" style={{ paddingTop: 0 }}>
        <div className="container" style={{ maxWidth: "var(--max-w)" }}>
          <AnimatedSection>
            {/* Canvas wrapper */}
            <div
              style={{
                position: "relative",
                width: "100%",
                height: 680,
                borderRadius: "var(--radius-xl)",
                overflow: "hidden",
                border: "1px solid rgba(0,245,255,0.14)",
                boxShadow: "0 0 60px rgba(0,245,255,0.08), 0 24px 80px rgba(0,0,0,0.7)",
              }}
            >
              {/* 3D Scene */}
              <DockingScene
                playing={playing}
                speed={speed}
                cinematic={cinematic}
                onUpdate={handleUpdate}
              />

              {/* UI Overlay */}
              <SimUI
                {...stats}
                playing={playing}
                speed={speed}
                cinematic={cinematic}
                onTogglePlay={handleTogglePlay}
                onSpeed={handleSpeed}
                onToggleCinematic={handleToggleCinematic}
              />
            </div>

            {/* Hint below canvas */}
            <p
              style={{
                textAlign: "center",
                fontSize: "0.72rem",
                color: "var(--text-3)",
                letterSpacing: "0.07em",
                marginTop: "var(--space-md)",
                fontFamily: "var(--font-heading)",
              }}
            >
              {cinematic
                ? "SİNEMATİK MOD — Kamera otomatik izliyor. Serbest kontrol için sağ üst köşedeki düğmeyi kullanın."
                : "SERBEST MOD — Sürükle: kamerayı döndür  •  Kaydır: yakınlaştır / uzaklaştır"}
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ── PHASE EXPLAINER CARDS ── */}
      <section className="section">
        <div className="container">
          <AnimatedSection className="section-header section-header--center">
            <span className="label c-cyan">Operasyon Detayları</span>
            <h2 className="heading-xl">Kenetlenme Sürecinin 4 Fazı</h2>
            <p className="body-lg">
              Her faz farklı sensör sistemleri, itki rejimleri ve protokoller gerektirir.
            </p>
          </AnimatedSection>

          <div className="grid-2" style={{ gap: "var(--space-lg)" }}>
            {phaseCards.map((c, i) => {
              const Icon = c.icon;
              return (
                <AnimatedSection key={c.step} delay={i * 0.1}>
                  <div
                    className="card"
                    style={{
                      height: "100%",
                      borderColor: c.border,
                      background: `linear-gradient(135deg, ${c.bg} 0%, transparent 100%)`,
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "flex-start", gap: 14, marginBottom: "var(--space-md)" }}>
                      <div
                        className="card__icon"
                        style={{ background: c.bg, border: `1px solid ${c.border}` }}
                      >
                        <Icon size={18} strokeWidth={1.5} color={c.color} />
                      </div>
                      <div>
                        <span
                          style={{
                            fontFamily: "var(--font-heading)",
                            fontSize: "0.6rem",
                            letterSpacing: "0.14em",
                            color: c.color,
                            display: "block",
                            marginBottom: 3,
                          }}
                        >
                          FAZ {c.step}
                        </span>
                        <p className="card__title" style={{ color: c.color }}>
                          {c.title}
                        </p>
                      </div>
                    </div>
                    <p className="card__body">{c.desc}</p>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── TECH FOOTNOTE ── */}
      <section className="section" style={{ paddingBottom: "var(--space-3xl)" }}>
        <div className="container">
          <AnimatedSection>
            <div
              className="card card--neutral"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "var(--space-xl)",
                flexWrap: "wrap",
                padding: "var(--space-xl)",
              }}
            >
              <div style={{ flex: 1, minWidth: 240 }}>
                <span className="label c-orange" style={{ marginBottom: "var(--space-sm)", display: "block" }}>
                  Simülasyon Hakkında
                </span>
                <p className="card__body">
                  Bu simülasyon, Three.js WebGL motoru üzerinde gerçek zamanlı olarak çalışmaktadır.
                  Mesafe ve hız değerleri, GEZGİN&apos;in KUTAY&apos;a yaklaşma profiline göre
                  ölçeklendirilmiş temsili verilerdir. Gerçek operasyonel parametreler STM sertifikasyon
                  sürecinde nihai halini alacaktır.
                </p>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12, minWidth: 200 }}>
                {[
                  { k: "Render Motoru", v: "Three.js WebGL" },
                  { k: "Kenetlenme Std.", v: "IDSS / APAS-95" },
                  { k: "RCS Thruster", v: "24 Adet, 6-DOF" },
                  { k: "Yakıt Protokolü", v: "PMD Kılcal Pompa" },
                ].map((r) => (
                  <div
                    key={r.k}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: 12,
                      borderBottom: "1px solid rgba(255,255,255,0.05)",
                      paddingBottom: 10,
                    }}
                  >
                    <span style={{ fontSize: "0.78rem", color: "var(--text-3)" }}>{r.k}</span>
                    <span style={{ fontSize: "0.78rem", color: "var(--cyan)", fontWeight: 600 }}>{r.v}</span>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

    </div>
  );
}
