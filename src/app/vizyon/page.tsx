"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView, animate } from "framer-motion";
import {
  TrendingUp, Shield, Zap, Globe, DollarSign, Users,
  BarChart3, AlertTriangle, Radio, Lock, Activity,
  Satellite, Target,
} from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";

/* ─────────────────────────────────────────────────────────
   COUNTUP — animated number reveal
───────────────────────────────────────────────────────── */
function CountUp({
  to,
  decimals = 0,
  suffix = "",
}: {
  to: number;
  decimals?: number;
  suffix?: string;
}) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const inView  = useInView(nodeRef, { once: true });

  useEffect(() => {
    if (!inView || !nodeRef.current) return;
    const node = nodeRef.current;
    const ctrl = animate(0, to, {
      duration: 2.4,
      ease: "easeOut",
      onUpdate: (v) => { node.textContent = v.toFixed(decimals) + suffix; },
    });
    return ctrl.stop;
  }, [inView, to, decimals, suffix]);

  return <span ref={nodeRef}>0{suffix}</span>;
}

/* ─────────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────────── */
const markets = [
  {
    label: "TAM",
    fullLabel: "Toplam Adreslenebilir Pazar",
    countTo: 4.4, decimals: 1, unit: "Milyar $",
    year: "2030 küresel projeksiyon",
    color: "var(--cyan)",
    border: "rgba(0,245,255,0.22)",
    glow: "rgba(0,245,255,0.07)",
    desc: "Küresel yörünge içi servis ve yakıt ikmali pazarı — Northern Sky Research",
    icon: Globe,
  },
  {
    label: "SAM",
    fullLabel: "Hizmet Edilebilir Pazar",
    countTo: 1.1, decimals: 1, unit: "Milyar $",
    year: "Somali hub erişim alanı",
    color: "var(--purple)",
    border: "rgba(139,92,246,0.22)",
    glow: "rgba(139,92,246,0.07)",
    desc: "Yakıt kapasitesi kritik eşikte olan, hub mesafesindeki GEO/LEO uydular",
    icon: Target,
  },
  {
    label: "SOM",
    fullLabel: "Hedeflenen Pazar Payı",
    countTo: 120, decimals: 0, unit: "Milyon $",
    year: "2039 Faz 4 hedefi",
    color: "var(--orange)",
    border: "rgba(255,69,0,0.22)",
    glow: "rgba(255,69,0,0.07)",
    desc: "Türkiye + Orta Doğu + Doğu Afrika bölgesel operatörleri, Faz 4 ticari hedef",
    icon: BarChart3,
  },
];

const revenues = [
  {
    icon: DollarSign, iconClass: "card__icon--cyan",
    title: "Life Extension (Ömür Uzatma) Ücreti",
    sub: "Amiral Gemisi Gelir Kalemi",
    color: "var(--cyan)",
    model: "Yakıtın kg'ı + Hizmet bedeli",
    value: "15–20M$ / Görev",
    winwin: true,
    desc: "Bir haberleşme uydusu (GEO) yılda ortalama 40–50 milyon dolar gelir üretir. Biz uydunun ömrünü 1 yıl uzatmak için 15–20 milyon dolar talep ederiz. Operatör için 30 milyon dolar net kâr demektir.",
  },
  {
    icon: Shield, iconClass: "card__icon--purple",
    title: "Gök-Güvence Abonelik Modeli",
    sub: "Yıllık Retainer (SLA Garantisi)",
    color: "var(--purple)",
    model: "Yıllık sabit abonelik ücreti",
    value: "Düzenli Nakit Akışı",
    winwin: false,
    desc: "Uydular arızalanana kadar beklemek yerine, operatörlere yıllık 'sigorta benzeri' abonelik. Acil arıza veya ani yörünge düzeltme ihtiyacında öncelik ve SLA garantisi.",
  },
  {
    icon: Zap, iconClass: "card__icon--orange",
    title: "Edge-as-a-Service (Modernizasyon)",
    sub: "Donanım Yükseltme + Yazılım Lisansı",
    color: "var(--orange)",
    model: "Modül başına kurulum + Yazılım güncelleme",
    value: "Yüksek Marj",
    winwin: false,
    desc: "10 yıl önce fırlatılmış bir uydunun işlemci gücü, bugünkü bir akıllı saatten düşük. GEZGİN aracılığıyla 'yeni bir beyin' takarak 2026'nın AI algoritmalarını çalıştırmasını sağlıyoruz.",
  },
  {
    icon: Globe, iconClass: "card__icon--green",
    title: "Lojistik & De-Orbiting",
    sub: "Uzay Çekicisi Hizmetleri",
    color: "var(--green)",
    model: "Görev başına sabit ücret",
    value: "Zorunlu Pazar",
    winwin: false,
    desc: "Uyduları fırlatma noktasından hedef yörüngeye Last Mile teslimat. Uluslararası de-orbiting regülasyonlarına uyum sağlayarak yasal cezaların önüne geçin.",
  },
];

const econSegs = [
  { label: "Yakıt & PMD Maliyeti",   pct: 23, color: "var(--orange)", value: "4.2M$" },
  { label: "Operasyon & Ekip",        pct: 10, color: "var(--purple)", value: "1.8M$" },
  { label: "GEZGİN Amortismanı",      pct:  5, color: "rgba(148,163,184,0.5)", value: "0.9M$" },
  { label: "Net Kâr Marjı (%62)",     pct: 62, color: "var(--cyan)",   value: "11.1M$" },
];

const milliUydular = [
  {
    name: "İMECE",
    emoji: "🛰️",
    org: "TUA / TUSAŞ",
    launch: "2023",
    orbit: "LEO — 529 km SSO",
    type: "Yer Gözlem Uydusu",
    color: "var(--cyan)",
    border: "rgba(0,245,255,0.22)",
    iconClass: "card__icon--cyan",
    scenario: "2028–29'da yakıt kapasitesi kritik eşiğe ulaşır. GökServis LEO yakıt ikmali ile 4–5 yıl ek görev süresi kazanılabilir. Yeni uydu yerine servis bedeli operatöre 280M$+ tasarruf sağlar.",
    saving: 280,
    savingNote: "Yeni uydu yerine servis — tahmini tasarruf (M$)",
  },
  {
    name: "TÜRKSAT 6A",
    emoji: "📡",
    org: "TÜRKSAT A.Ş.",
    launch: "2024",
    orbit: "GEO — 42.0°D",
    type: "Haberleşme Uydusu",
    color: "var(--orange)",
    border: "rgba(255,69,0,0.22)",
    iconClass: "card__icon--orange",
    scenario: "Yılda 40–50M$ gelir üretir. Gök-Güvence SLA + planlı yakıt ikmali ile ömür 8+ yıl uzatılır. Türkiye'nin ilk yerli GEO uydusu için yerli güvence zorunludur.",
    saving: 400,
    savingNote: "Uzatılmış ömür dönemi ek operatör geliri tahmini (M$)",
  },
];

const trlItems = [
  { name: "Kriyojenik Depolama & MLI",      trl: 6, color: "var(--cyan)",   desc: "Sistem/alt sistem modeli demonstrasyon" },
  { name: "3D LIDAR + AI Navigasyon",        trl: 5, color: "var(--orange)", desc: "Alt sistem validasyonu (simülasyon ortamı)" },
  { name: "PMD Akışkan Yönetim Sistemi",     trl: 4, color: "var(--purple)", desc: "Laboratuvar ortamında bileşen doğrulama" },
  { name: "7-Eksenli Robotik Kol",           trl: 4, color: "var(--green)",  desc: "Laboratuvar ortamında bileşen doğrulama" },
  { name: "UPA — Evrensel Port Adaptörü",    trl: 3, color: "var(--cyan)",   desc: "Kritik fonksiyon analitik & deneysel kanıtı" },
  { name: "Radyasyon Dayanımlı SoC",         trl: 5, color: "var(--purple)", desc: "Alt sistem validasyonu" },
];

const trlLabels: Record<number, string> = {
  1: "Temel İlke", 2: "Teknoloji Konsepti", 3: "Kavram Kanıtı",
  4: "Lab Doğrulama", 5: "Geçerli Ortam", 6: "İlgili Ortam Demo",
  7: "Operasyonel Demo", 8: "Sistem Tamamlandı", 9: "Operasyonel",
};

const risks = [
  {
    cat: "Teknik", catColor: "var(--orange)",
    item: "PMD sıfır-g akışkan davranışı sapması",
    prob: "Orta", probColor: "var(--orange)",
    impact: "Yüksek", impactColor: "#EF4444",
    mitigation: "Kademeli mikro-yerçekimi test kampanyası; ISS uçuş fırsatları değerlendirmesi",
  },
  {
    cat: "Düzenleyici", catColor: "var(--purple)",
    item: "STM & UNOOSA lisans gecikmeleri",
    prob: "Düşük", probColor: "var(--green)",
    impact: "Yüksek", impactColor: "#EF4444",
    mitigation: "TUA koordinasyonuyla erken başvuru; Faz 3'te 2 yıllık operasyonel tampon",
  },
  {
    cat: "Jeopolitik", catColor: "var(--cyan)",
    item: "Somali liman güvenliği ve erişim sürekliliği",
    prob: "Orta", probColor: "var(--orange)",
    impact: "Orta", impactColor: "var(--orange)",
    mitigation: "Türk-Somali ikili savunma anlaşması; ikincil LEO erişim hub planı",
  },
  {
    cat: "Ticari", catColor: "var(--green)",
    item: "Faz 4'e kadar anchor müşteri güvencesi yokluğu",
    prob: "Düşük", probColor: "var(--green)",
    impact: "Yüksek", impactColor: "#EF4444",
    mitigation: "TÜRKSAT & TUA ile 2027 LOI hedefi; devlet garantili pilot görev paketi",
  },
];

const phases = [
  {
    phase: "Faz 1", period: "2026 – 2029", color: "var(--cyan)",
    title: "Ar-Ge & Yerleşke Hazırlığı",
    milestones: [
      { year: "2026–27", text: "KUTAY ve GEZGİN'in gövdeleri ve yazılım mimarilerinin TUSAŞ/UZAAY'da geliştirilmesi" },
      { year: "2028",    text: "Somali Türk Uzay Limanı'nda rampa montajları ve kriyojenik depolama inşası" },
      { year: "2029",    text: "Somali Türk Uzay Limanı Resmi Açılışı. İlk dikey iniş-kalkış testleri." },
    ],
  },
  {
    phase: "Faz 2", period: "2030 – 2035", color: "var(--purple)",
    title: "Fırlatma & Yörünge Testleri",
    milestones: [
      { year: "2030–31", text: "Somali'den L-Gök serisi ağır yük fırlatma testleri. LEO'ya ilk test yükleri." },
      { year: "2032",    text: "KUTAY'ın GEO transfer yörüngesine yerleştirilmesi ve sistem aktivasyonu." },
      { year: "2033",    text: "GEZGİN araçlarının fırlatılması. KUTAY-GEZGİN otonom kenetlenme testleri (12 ay)." },
      { year: "2034–35", text: "Periyodik yakıt tankeri seferleri ve sıfır yerçekimi sıvı transfer testleri." },
    ],
  },
  {
    phase: "Faz 3", period: "2036 – 2038", color: "var(--orange)",
    title: "Sertifikasyon & Pilot Görevler",
    milestones: [
      { year: "2036", text: "Uluslararası STM lisansları ve GEZGİN 'Güvenli Yakınsama' sertifikasyonu." },
      { year: "2037", text: "İlk devlet destekli hizmet denemesi. Milli uydunun yörünge düzeltme manevrası." },
      { year: "2038", text: "Marsh, AXA XL ile 'Gök-Güvence' protokollerinin imzalanması." },
    ],
  },
  {
    phase: "Faz 4", period: "2039 – 2040+", color: "var(--green)",
    title: "Ticari Patlama & Fatura Dönemi",
    milestones: [
      { year: "Oc. 2039",  text: "İlk ticari faturanın kesilmesi. Uluslararası operatöre yakıt ikmali ve Edge Computing modernizasyonu." },
      { year: "Haz. 2039", text: "'Gök-Güvence' abonelik modelinin başlatılması. 10+ operatörle SLA imzalanması." },
      { year: "2040+",     text: "KUTAY'ın 'Uzay Sanayi Bölgesi'ne dönüşmesi. GEZGİN filosunun 20+ araca çıkması." },
    ],
  },
];

const competitors = [
  { name: "Northrop Grumman (MEV)", origin: "ABD 🇺🇸", focus: "GEO Yakıt İkmali",   weak: "Çok pahalı; uydunun arkasına yapışıp kalıyor, tek kullanımlık gibi çalışıyor.", opp: "Geri alınabilir, çoklu görev modeli" },
  { name: "Astroscale",             origin: "Japonya 🇯🇵", focus: "Uzay Çöpü Temizleme", weak: "Niş odak: Sadece çöp topluyor, refueling ve donanım modernizasyonu kısıtlı.", opp: "Tam spektrum hizmet portföyü" },
  { name: "ClearSpace",             origin: "İsviçre 🇨🇭", focus: "De-orbiting",         weak: "Yüksek maliyet: Avrupa fırlatma maliyetleri nedeniyle servis bedelleri çok yüksek.", opp: "Somali avantajıyla %40 daha ucuz" },
  { name: "Orbit Fab",              origin: "ABD 🇺🇸", focus: "Yakıt Depolama",       weak: "Lojistik bağımlılık: Harici fırlatıcılara ve pahalı Amerikan üslerine muhtaç.", opp: "Dikey entegrasyon ile tam kontrol" },
];

const customers = [
  { icon: "📡", seg: "Ticari Operatörler",        ex: "TÜRKSAT, Starlink, OneWeb, Intelsat", why: "Gelir maksimizasyonu için" },
  { icon: "🏛️", seg: "Sigorta Şirketleri",        ex: "Marsh, AXA XL",                       why: "Hasar ödemesini azaltmak için 'tamirci' olarak kiralamak" },
  { icon: "🚀", seg: "Devletler & Uzay Ajansları", ex: "TUA, ESA, NASA",                      why: "Stratejik varlık koruması ve uzay trafiği yönetimi" },
];

const milestoneChips = [
  { label: "Liman Açılışı",   year: "2029", color: "var(--cyan)" },
  { label: "KUTAY Yörüngede", year: "2032", color: "var(--purple)" },
  { label: "GEZGİN Aktif",   year: "2033", color: "var(--orange)" },
  { label: "Pilot Görev",    year: "2037", color: "#F59E0B" },
  { label: "İlk Fatura",     year: "2039", color: "var(--green)" },
];

/* ─────────────────────────────────────────────────────────
   PAGE
───────────────────────────────────────────────────────── */
export default function VizyonPage() {
  const [activePhase, setActivePhase] = useState(0);
  const ph = phases[activePhase];

  return (
    <div className="page-wrapper">

      {/* ── HERO ── */}
      <section className="hero hero--sub" style={{ paddingBottom: "var(--space-3xl)" }}>
        <div className="glow-bg glow-bg--purple"
          style={{ width: 560, height: 560, top: "5%", left: "50%", transform: "translate(-50%,-20%)" }} />

        <div className="hero__content">
          <div className="hero__badge">
            <span className="badge badge--purple">
              <TrendingUp size={13} /> SPaaS — Space as a Service
            </span>
          </div>

          <motion.h1
            className="heading-hero"
            initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, delay: 0.1 }}
          >
            Vizyon &{" "}<span className="grad-mixed">Ekonomi</span>
          </motion.h1>

          <motion.p className="body-lg hero__subtitle"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
          >
            Tek seferlik büyük satışlar yerine sürekliliği olan, yüksek marjlı
            abonelik hizmet karması. 2039&apos;a kadar kurumsal uzay ekonomisinin
            altyapı sağlayıcısı olmak.
          </motion.p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          NEW §1 — TAM / SAM / SOM MARKET SIZING
      ══════════════════════════════════════════════════ */}
      <section className="section section--sm">
        <div className="container">
          <AnimatedSection className="section-header section-header--center">
            <span className="label c-cyan">Pazar Büyüklüğü</span>
            <h2 className="heading-xl">Yörünge İçi Servis Pazarı</h2>
            <p className="body-lg">
              2,800+ aktif uydu, ortalama 8.2 yıl yaş, 50+ kritik eşikte yakıt —
              pazar yapısal olarak büyüyor.
            </p>
          </AnimatedSection>

          <div className="grid-3">
            {markets.map((m, i) => {
              const Icon = m.icon;
              return (
                <AnimatedSection key={m.label} delay={i * 0.14}>
                  <motion.div
                    className="market-card"
                    whileHover={{ y: -6, borderColor: m.border }}
                    style={{ borderColor: "rgba(255,255,255,0.07)" }}
                  >
                    {/* Ambient glow */}
                    <div className="market-card__glow" style={{ background: `radial-gradient(ellipse at 50% 0%, ${m.glow} 0%, transparent 70%)` }} />

                    {/* Label pill */}
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: "var(--space-lg)" }}>
                      <div className="market-card__icon" style={{ borderColor: m.border, color: m.color, background: m.glow }}>
                        <Icon size={16} strokeWidth={1.5} />
                      </div>
                      <div>
                        <p className="market-card__label" style={{ color: m.color }}>{m.label}</p>
                        <p className="market-card__sublabel">{m.fullLabel}</p>
                      </div>
                    </div>

                    {/* Orbital ring + number */}
                    <div className="market-ring-wrap">
                      <motion.div
                        className="market-ring__outer"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20 + i * 4, repeat: Infinity, ease: "linear" }}
                        style={{ borderColor: m.border }}
                      />
                      <motion.div
                        className="market-ring__inner"
                        animate={{ rotate: -360 }}
                        transition={{ duration: 28 + i * 4, repeat: Infinity, ease: "linear" }}
                        style={{ borderColor: m.border }}
                      />
                      <div className="market-ring__core">
                        <p className="market-card__value" style={{ color: m.color }}>
                          <CountUp to={m.countTo} decimals={m.decimals} />
                        </p>
                        <p className="market-card__unit">{m.unit}</p>
                      </div>
                    </div>

                    <p className="market-card__year" style={{ color: m.color }}>{m.year}</p>
                    <p className="market-card__desc">{m.desc}</p>
                  </motion.div>
                </AnimatedSection>
              );
            })}
          </div>

          {/* Connector note */}
          <AnimatedSection delay={0.4}>
            <div className="market-note">
              <motion.div
                className="market-note__dot"
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <p>
                GökServis&apos;in <span style={{ color: "var(--cyan)", fontWeight: 700 }}>SOM/SAM oranı %11</span> — sektör ortalamasının
                (5–8%) üzerinde. Türkiye&apos;nin bölgesel konumu ve Somali hub avantajı bu farkı yaratır.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── REVENUE STREAMS ── */}
      <section className="section">
        <div className="container">
          <AnimatedSection className="section-header">
            <span className="label c-purple">Gelir Modeli</span>
            <h2 className="heading-xl">GökServis SPaaS Gelir Akışları</h2>
          </AnimatedSection>

          <div className="grid-2">
            {revenues.map((r, i) => {
              const Icon = r.icon;
              return (
                <AnimatedSection key={r.title} delay={i * 0.1}>
                  <div className="card card--neutral" style={{ borderColor: `color-mix(in srgb, ${r.color} 22%, transparent)`, height: "100%" }}>
                    <div style={{ display: "flex", alignItems: "flex-start", gap: 14, marginBottom: "var(--space-md)" }}>
                      <div className={`card__icon ${r.iconClass}`} style={{ flexShrink: 0, margin: 0 }}>
                        <Icon size={20} strokeWidth={1.5} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4, flexWrap: "wrap" }}>
                          <p className="card__title" style={{ margin: 0, color: r.color }}>{r.title}</p>
                          {r.winwin && <span className="badge badge--cyan" style={{ fontSize: "0.65rem", padding: "2px 8px" }}>WIN-WIN</span>}
                        </div>
                        <p style={{ fontSize: "0.75rem", color: "var(--text-3)" }}>{r.sub}</p>
                      </div>
                    </div>

                    <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)", marginBottom: "var(--space-md)", gap: 12 }}>
                      <div>
                        <p style={{ fontSize: "0.7rem", color: "var(--text-3)", marginBottom: 2 }}>Model</p>
                        <p style={{ fontSize: "0.78rem", color: "var(--text-2)" }}>{r.model}</p>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <p style={{ fontSize: "0.7rem", color: "var(--text-3)", marginBottom: 2 }}>Değer</p>
                        <p style={{ fontSize: "0.875rem", fontWeight: 700, color: r.color }}>{r.value}</p>
                      </div>
                    </div>

                    <p className="card__body">{r.desc}</p>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          NEW §2 — UNIT ECONOMICS (Tek Görev Anatomisi)
      ══════════════════════════════════════════════════ */}
      <section className="section section--sm">
        <div className="container">
          <AnimatedSection className="section-header section-header--center">
            <span className="label c-green">Birim Ekonomisi</span>
            <h2 className="heading-xl">Tek Görev Anatomisi</h2>
            <p className="body-lg">
              Bir GEZGİN yakıt ikmali görevinin gelir, maliyet ve marj yapısı.
            </p>
          </AnimatedSection>

          <div className="grid-2" style={{ alignItems: "center", gap: "var(--space-2xl)" }}>

            {/* Left — breakdown list */}
            <AnimatedSection direction="left">
              <div className="econ-card">
                <div className="econ-card__glow" />

                <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: "var(--space-xl)" }}>
                  <span className="heading-hero grad-cyan" style={{ fontSize: "clamp(2.2rem,5vw,3.8rem)" }}>18M$</span>
                  <span style={{ fontSize: "0.85rem", color: "var(--text-3)", fontWeight: 600 }}>/ Görev Geliri</span>
                </div>

                <div className="econ-breakdown">
                  {econSegs.map((seg, i) => (
                    <motion.div
                      key={seg.label}
                      className="econ-row"
                      initial={{ opacity: 0, x: -16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <div className="econ-row__dot" style={{ background: seg.color }} />
                      <span className="econ-row__label">{seg.label}</span>
                      <span className="econ-row__pct" style={{ color: seg.color }}>{seg.pct}%</span>
                      <span className="econ-row__val">{seg.value}</span>
                    </motion.div>
                  ))}
                </div>

                <div className="econ-margin">
                  <Activity size={14} color="var(--cyan)" />
                  <span>Brüt kâr marjı: </span>
                  <span style={{ color: "var(--cyan)", fontWeight: 700 }}>%62</span>
                  <span style={{ color: "var(--text-3)", fontSize: "0.78rem" }}> — SaaS seviyesi</span>
                </div>
              </div>
            </AnimatedSection>

            {/* Right — stacked bar chart */}
            <AnimatedSection direction="right">
              <div style={{ position: "relative" }}>
                <p style={{ fontSize: "0.72rem", color: "var(--text-3)", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 20 }}>Maliyet Dağılımı (18M$ = %100)</p>

                {/* Stacked horizontal bar */}
                <div className="econ-bar-track">
                  {econSegs.map((seg, i) => (
                    <motion.div
                      key={seg.label}
                      className="econ-bar-seg"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${seg.pct}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: 0.3 + i * 0.18, ease: "easeOut" }}
                      style={{ background: seg.color }}
                      title={`${seg.label}: ${seg.pct}%`}
                    />
                  ))}
                </div>

                {/* Legend */}
                <div className="econ-legend">
                  {econSegs.map((seg, i) => (
                    <motion.div
                      key={seg.label}
                      className="econ-legend-item"
                      initial={{ opacity: 0, y: 8 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.6 + i * 0.1 }}
                    >
                      <div className="econ-legend-dot" style={{ background: seg.color }} />
                      <span>{seg.label}</span>
                      <strong style={{ color: seg.color, marginLeft: "auto" }}>{seg.value}</strong>
                    </motion.div>
                  ))}
                </div>

                {/* Comparison callout */}
                <motion.div
                  className="econ-callout"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1, duration: 0.5 }}
                >
                  <p style={{ fontSize: "0.72rem", color: "var(--text-3)", marginBottom: 4 }}>Operatör Net Kazanımı</p>
                  <p style={{ fontSize: "1.6rem", fontWeight: 900, color: "var(--green)", fontFamily: "var(--font-heading)" }}>+30M$</p>
                  <p style={{ fontSize: "0.72rem", color: "var(--text-3)" }}>1 yıl ömür uzatımı başına</p>
                </motion.div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          NEW §3 — MİLLİ UYDU REFERANSLARI
      ══════════════════════════════════════════════════ */}
      <section className="section">
        <div className="container">
          <AnimatedSection className="section-header section-header--center">
            <span className="label c-cyan">Milli Uydu Referansları</span>
            <h2 className="heading-xl">Türkiye&apos;nin Uzaydaki Varlıkları</h2>
            <p className="body-lg">
              GökServis&apos;in en doğal ilk müşterileri. Her biri için somut görev ve tasarruf senaryosu.
            </p>
          </AnimatedSection>

          <div className="grid-2">
            {milliUydular.map((uydu, i) => (
              <AnimatedSection key={uydu.name} delay={i * 0.15}>
                <motion.div
                  className="milli-card"
                  whileHover={{ y: -6 }}
                  style={{ borderColor: "rgba(255,255,255,0.07)" }}
                >
                  <div className="milli-card__glow" style={{ background: `radial-gradient(ellipse at 80% 20%, ${uydu.border.replace("0.22", "0.05")} 0%, transparent 60%)` }} />
                  <div className="milli-card__top-line" style={{ background: `linear-gradient(90deg, transparent, ${uydu.color}, transparent)` }} />

                  {/* Header */}
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "var(--space-lg)" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                      {/* Orbiting satellite animation */}
                      <div className="milli-orbital" style={{ borderColor: uydu.border }}>
                        <motion.div
                          style={{ position: "absolute", inset: 0 }}
                          animate={{ rotate: 360 }}
                          transition={{ duration: 7 + i * 2, repeat: Infinity, ease: "linear" }}
                        >
                          <div className="milli-orbital__sat" style={{ color: uydu.color }}>{uydu.emoji}</div>
                        </motion.div>
                        <Satellite size={16} color={uydu.color} style={{ opacity: 0.5 }} />
                      </div>
                      <div>
                        <p className="heading-md" style={{ color: uydu.color }}>{uydu.name}</p>
                        <p style={{ fontSize: "0.75rem", color: "var(--text-3)" }}>{uydu.org}</p>
                      </div>
                    </div>
                    <span className="badge badge--cyan" style={{
                      borderColor: uydu.border,
                      color: uydu.color,
                      background: uydu.border.replace("0.22", "0.06"),
                      fontSize: "0.62rem",
                    }}>{uydu.type}</span>
                  </div>

                  {/* Specs */}
                  <div className="milli-specs">
                    {[
                      { k: "Fırlatma", v: uydu.launch },
                      { k: "Yörünge",  v: uydu.orbit },
                    ].map((s) => (
                      <div key={s.k} className="milli-spec-row">
                        <span className="milli-spec-row__key">{s.k}</span>
                        <span className="milli-spec-row__val" style={{ color: uydu.color }}>{s.v}</span>
                      </div>
                    ))}
                  </div>

                  {/* Scenario */}
                  <p className="card__body" style={{ margin: "var(--space-md) 0" }}>{uydu.scenario}</p>

                  {/* Savings counter */}
                  <div className="milli-saving" style={{ borderColor: uydu.border, background: uydu.border.replace("0.22", "0.04") }}>
                    <div>
                      <p style={{ fontSize: "0.68rem", color: "var(--text-3)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 4 }}>{uydu.savingNote}</p>
                      <p className="milli-saving__value" style={{ color: uydu.color }}>
                        <CountUp to={uydu.saving} decimals={0} suffix="M$" />
                      </p>
                    </div>
                    <motion.div
                      animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0.8, 0.4] }}
                      transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.8 }}
                      style={{ width: 48, height: 48, borderRadius: "50%", border: `1px solid ${uydu.color}`, opacity: 0.3 }}
                    />
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>

          {/* Turkish space flag strip */}
          <AnimatedSection delay={0.3}>
            <div className="milli-footer">
              <Lock size={14} color="var(--cyan)" />
              <p>
                Her iki uydu için yabancı servis sağlayıcı kullanımı{" "}
                <span style={{ color: "var(--orange)", fontWeight: 700 }}>veri egemenliği riski</span>{" "}
                taşır. GökServis, Türkiye&apos;nin uzay varlıklarını koruyan yerli ve milli güvencedir.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── INTERACTIVE TIMELINE ── */}
      <section id="yol-haritasi" className="section">
        <div className="container">
          <AnimatedSection className="section-header section-header--center">
            <span className="label c-cyan">Stratejik Yol Haritası</span>
            <h2 className="heading-xl">2026 – 2040 İnteraktif Zaman Çizelgesi</h2>
          </AnimatedSection>

          <div className="timeline-tabs">
            {phases.map((p, i) => (
              <motion.button
                key={p.phase} onClick={() => setActivePhase(i)}
                whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                className={`timeline-tab ${activePhase === i ? "timeline-tab--active" : ""}`}
                style={activePhase === i ? {
                  background: p.color,
                  borderColor: p.color,
                  boxShadow: `0 0 20px color-mix(in srgb, ${p.color} 40%, transparent)`,
                } : {}}
              >
                <p className="timeline-tab__phase" style={{ color: activePhase === i ? "var(--bg)" : p.color }}>
                  {p.phase}
                </p>
                <p className="timeline-tab__period" style={{ color: activePhase === i ? "rgba(10,10,11,0.7)" : undefined }}>
                  {p.period}
                </p>
              </motion.button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activePhase}
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.35 }}
              className="timeline-content"
              style={{ borderColor: `color-mix(in srgb, ${ph.color} 22%, transparent)` }}
            >
              <div className="timeline-content__header">
                <div className="timeline-content__bar" style={{ background: ph.color }} />
                <div>
                  <p className="timeline-content__phase-label" style={{ color: ph.color }}>
                    {ph.phase} — {ph.period}
                  </p>
                  <p className="timeline-content__title">{ph.title}</p>
                </div>
              </div>

              <div className="timeline-milestones">
                {ph.milestones.map((m, i) => (
                  <motion.div key={m.year}
                    className="timeline-milestone"
                    initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <span className="timeline-milestone__year" style={{ color: ph.color }}>{m.year}</span>
                    <div className="timeline-milestone__row">
                      <motion.div
                        className="timeline-milestone__dot"
                        animate={{ scale: [1, 1.4, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                        style={{ background: ph.color, color: ph.color }}
                      />
                      <p className="timeline-milestone__text">{m.text}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="milestone-summary" style={{ marginTop: "var(--space-lg)" }}>
            {milestoneChips.map((mc, i) => (
              <motion.div key={mc.label}
                className="milestone-chip"
                initial={{ opacity: 0, scale: 0.85 }} whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }} transition={{ delay: i * 0.09 }}
                style={{ borderColor: `color-mix(in srgb, ${mc.color} 24%, transparent)` }}
              >
                <p className="milestone-chip__year" style={{ color: mc.color }}>{mc.year}</p>
                <p className="milestone-chip__label">{mc.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          NEW §4 — TRL DASHBOARD
      ══════════════════════════════════════════════════ */}
      <section className="section">
        <div className="container">
          <AnimatedSection className="section-header">
            <span className="label c-purple">Teknoloji Olgunluğu</span>
            <h2 className="heading-xl">Teknoloji Hazırlık Seviyeleri (TRL)</h2>
            <p className="body-lg">
              Her kritik alt sistem NASA/ESA TRL skalasında bağımsız olarak değerlendirilmiştir.
              Hedef: 2032 fırlatma öncesinde tüm sistemler TRL 7+.
            </p>
          </AnimatedSection>

          <div className="trl-container">
            {/* Scale header */}
            <div className="trl-scale-header">
              {[1,2,3,4,5,6,7,8,9].map((n) => (
                <div key={n} className="trl-scale-tick">
                  <span className="trl-scale-num">{n}</span>
                </div>
              ))}
            </div>

            {/* TRL items */}
            {trlItems.map((item, i) => (
              <AnimatedSection key={item.name} delay={i * 0.08}>
                <div className="trl-item">
                  <div className="trl-item__meta">
                    <p className="trl-item__name">{item.name}</p>
                    <p className="trl-item__desc">{item.desc}</p>
                  </div>

                  <div className="trl-item__right">
                    {/* Badge */}
                    <motion.div
                      className="trl-badge"
                      style={{ color: item.color, borderColor: `color-mix(in srgb, ${item.color} 30%, transparent)`, background: `color-mix(in srgb, ${item.color} 6%, transparent)` }}
                      animate={{ boxShadow: [`0 0 0px ${item.color}`, `0 0 10px color-mix(in srgb, ${item.color} 30%, transparent)`, `0 0 0px ${item.color}`] }}
                      transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.4 }}
                    >
                      TRL {item.trl}
                    </motion.div>

                    {/* Progress track */}
                    <div className="trl-track">
                      {/* Target line at TRL 7 */}
                      <div className="trl-target-line" style={{ left: `${(7 / 9) * 100}%` }} />

                      <motion.div
                        className="trl-fill"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${(item.trl / 9) * 100}%` }}
                        viewport={{ once: true, margin: "-40px" }}
                        transition={{ duration: 1.4, delay: 0.2 + i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                        style={{ background: `linear-gradient(90deg, color-mix(in srgb, ${item.color} 40%, transparent), ${item.color})` }}
                      />

                      {/* Glow tip */}
                      <motion.div
                        className="trl-fill-tip"
                        initial={{ left: 0, opacity: 0 }}
                        whileInView={{ left: `${(item.trl / 9) * 100}%`, opacity: 1 }}
                        viewport={{ once: true, margin: "-40px" }}
                        transition={{ duration: 1.4, delay: 0.2 + i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                        style={{ background: item.color, boxShadow: `0 0 8px ${item.color}` }}
                      />
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}

            {/* Legend */}
            <AnimatedSection delay={0.5}>
              <div className="trl-legend">
                <div className="trl-legend__target">
                  <div className="trl-legend__target-line" />
                  <span>Fırlatma hedefi (TRL 7)</span>
                </div>
                <div className="trl-legend__scale">
                  {Object.entries(trlLabels).filter(([k]) => [1,3,5,7,9].includes(Number(k))).map(([k, v]) => (
                    <div key={k} className="trl-legend__item">
                      <span className="trl-legend__num">{k}</span>
                      <span className="trl-legend__text">{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── COMPETITION ── */}
      <section className="section">
        <div className="container">
          <AnimatedSection className="section-header">
            <span className="label c-orange">Küresel Rekabet Analizi</span>
            <h2 className="heading-xl">Rakip Oyuncular & Bizim Fırsatımız</h2>
          </AnimatedSection>
          <AnimatedSection>
            <div className="data-table-wrap data-table-wrap--orange">
              <table className="data-table data-table--orange">
                <thead>
                  <tr>
                    <th>Rakip Oyuncu</th><th>Menşei</th><th>Odak</th>
                    <th>Zayıf Nokta</th><th>GökServis Fırsatı</th>
                  </tr>
                </thead>
                <tbody>
                  {competitors.map((r, i) => (
                    <motion.tr key={r.name}
                      initial={{ opacity: 0, x: -14 }} whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }} transition={{ delay: i * 0.09 }}
                    >
                      <td className="cell-highlight">{r.name}</td>
                      <td>{r.origin}</td>
                      <td>{r.focus}</td>
                      <td className="cell-orange" style={{ fontSize: "0.78rem", maxWidth: 240 }}>{r.weak}</td>
                      <td><span className="cell-chip cell-chip--green">{r.opp}</span></td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── CUSTOMERS ── */}
      <section className="section">
        <div className="container">
          <AnimatedSection className="section-header section-header--center">
            <span className="label c-green">Müşteri Portföyü</span>
            <h2 className="heading-xl">Kimler Bize Para Öder?</h2>
          </AnimatedSection>

          <div className="grid-3">
            {customers.map((c, i) => (
              <AnimatedSection key={c.seg} delay={i * 0.14}>
                <div className="card" style={{ textAlign: "center", height: "100%" }}>
                  <div style={{ fontSize: "2.8rem", marginBottom: "var(--space-md)" }}>{c.icon}</div>
                  <p className="card__title">{c.seg}</p>
                  <p style={{ fontSize: "0.82rem", color: "var(--cyan)", margin: "6px 0 10px" }}>{c.ex}</p>
                  <p style={{ fontSize: "0.78rem", color: "var(--text-2)", fontStyle: "italic" }}>&ldquo;{c.why}&rdquo;</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          NEW §5 — RISK MATRIX
      ══════════════════════════════════════════════════ */}
      <section className="section">
        <div className="container">
          <AnimatedSection className="section-header">
            <span className="label c-orange">Risk & Azaltma</span>
            <h2 className="heading-xl">Stratejik Risk Matrisi</h2>
            <p className="body-lg">
              Yatırımcıların en sık sorduğu dört risk kategorisi ve GökServis&apos;in azaltma planları.
            </p>
          </AnimatedSection>

          <div className="risk-grid">
            {risks.map((r, i) => (
              <AnimatedSection key={r.cat} delay={i * 0.1}>
                <motion.div
                  className="risk-card"
                  whileHover={{ y: -4, borderColor: `color-mix(in srgb, ${r.catColor} 30%, transparent)` }}
                  style={{ borderColor: "rgba(255,255,255,0.07)" }}
                >
                  {/* Subtle scan line animation */}
                  <motion.div
                    className="risk-card__scan"
                    animate={{ y: ["-100%", "200%"] }}
                    transition={{ duration: 3.5 + i * 0.5, repeat: Infinity, ease: "linear", delay: i * 0.8 }}
                  />

                  {/* Category badge */}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "var(--space-md)" }}>
                    <span className="risk-cat-badge" style={{
                      color: r.catColor,
                      borderColor: `color-mix(in srgb, ${r.catColor} 28%, transparent)`,
                      background: `color-mix(in srgb, ${r.catColor} 6%, transparent)`,
                    }}>
                      <AlertTriangle size={11} />
                      {r.cat}
                    </span>

                    <div style={{ display: "flex", gap: 6 }}>
                      <span className="risk-level-badge" style={{ color: r.probColor, borderColor: `color-mix(in srgb, ${r.probColor} 28%, transparent)`, background: `color-mix(in srgb, ${r.probColor} 6%, transparent)` }}>
                        {r.prob}
                      </span>
                      <span className="risk-level-badge" style={{ color: r.impactColor, borderColor: `color-mix(in srgb, ${r.impactColor} 28%, transparent)`, background: `color-mix(in srgb, ${r.impactColor} 6%, transparent)` }}>
                        {r.impact}
                      </span>
                    </div>
                  </div>

                  {/* Risk item */}
                  <p className="risk-card__item">{r.item}</p>

                  {/* Divider */}
                  <div className="risk-card__divider" style={{ background: `linear-gradient(90deg, ${r.catColor}, transparent)` }} />

                  {/* Mitigation */}
                  <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                    <Radio size={13} color="var(--green)" style={{ flexShrink: 0, marginTop: 2 }} />
                    <p className="risk-card__mitigation">{r.mitigation}</p>
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>

          {/* Risk legend */}
          <AnimatedSection delay={0.4}>
            <div className="risk-legend">
              {[
                { label: "Olasılık", items: [{ text: "Düşük", color: "var(--green)" }, { text: "Orta", color: "var(--orange)" }, { text: "Yüksek", color: "#EF4444" }] },
                { label: "Etki",     items: [{ text: "Düşük", color: "var(--green)" }, { text: "Orta", color: "var(--orange)" }, { text: "Yüksek", color: "#EF4444" }] },
              ].map((grp) => (
                <div key={grp.label} className="risk-legend__group">
                  <span className="risk-legend__title">{grp.label}:</span>
                  {grp.items.map((item) => (
                    <span key={item.text} className="risk-legend__item" style={{ color: item.color }}>● {item.text}</span>
                  ))}
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── MANIFESTO ── */}
      <section className="section" style={{ paddingBottom: "var(--space-3xl)" }}>
        <div className="container">
          <AnimatedSection>
            <div className="manifesto glass--purple">
              <div className="manifesto__glow" style={{ background: "radial-gradient(ellipse at center, rgba(139,92,246,0.06) 0%, transparent 70%)" }} />
              <div className="manifesto__top-line" style={{ background: "linear-gradient(90deg,transparent,var(--purple),transparent)" }} />

              <span className="label c-purple">GökServis Manifestosu</span>

              <blockquote className="manifesto__quote">
                &ldquo;Biz sadece uyduları tamir etmiyoruz; biz insanlığın yörüngedeki
                ayak izini <span className="grad-cyan">sürdürülebilir</span> kılıyoruz.&rdquo;
              </blockquote>

              <p className="manifesto__sub">KUTAY ile uzayın kutlu ve sabit limanını kuruyoruz.</p>
              <p className="manifesto__sub">GEZGİN ile yörüngenin en çevik yol arkadaşını sunuyoruz.</p>
              <p className="manifesto__sub">Somali&apos;den yükselen milli güçle, uzay lojistiğinde dışa bağımlılığa son veriyoruz.</p>

              <div style={{ marginTop: "var(--space-xl)", paddingTop: "var(--space-lg)", borderTop: "1px solid rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                <Users size={16} color="var(--purple)" />
                <p style={{ fontSize: "0.85rem", color: "var(--text-2)" }}>
                  Milli uydu operatörleri, sigorta şirketleri ve devlet ajansları için &ldquo;Yörüngedeki Güvenceniz&rdquo;
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

    </div>
  );
}
