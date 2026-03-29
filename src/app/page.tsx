"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { Fuel, Wrench, Zap, Truck, ChevronRight, ArrowRight, Shield, Globe, TrendingUp } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";

/* ── data ── */
const services = [
  {
    icon: Fuel,
    title: "Yakıt İkmali",
    tag: "Refueling",
    colorClass: "card__icon--cyan",
    desc: "GEO ve LEO uydularına kimyasal (Hidrazin) veya elektrikli (Xenon/Kripton) yakıt transferi. Görev ömrünü 5+ yıl uzatın.",
    href: "/kutay#yakit",
  },
  {
    icon: Wrench,
    title: "Bakım & Modernizasyon",
    tag: "Servicing",
    colorClass: "card__icon--cyan",
    desc: "Fiziksel denetim, açılmayan panellerin aktif edilmesi ve Edge Computing modülü entegrasyonu ile uyduyu geleceğe taşıyın.",
    href: "/gezgin#robotic",
  },
  {
    icon: Zap,
    title: "Tamir & Kurtarma",
    tag: "Repair",
    colorClass: "card__icon--orange",
    cardClass: "card--orange",
    desc: "Beklenmedik arızalara GEZGİN'in hassas robotik kollarıyla acil müdahale. Total Loss riskini sıfıra indirin.",
    href: "/gezgin#tamir",
  },
  {
    icon: Truck,
    title: "Çekici & Lojistik",
    tag: "Towing",
    colorClass: "card__icon--orange",
    cardClass: "card--orange",
    desc: "Bırakma noktasından hedef yörüngeye Last Mile teslimat ve kontrollü de-orbit hizmeti.",
    href: "/gezgin#towing",
  },
];

const stats = [
  { value: "200–500M$", label: "Ortalama Uydu Maliyeti" },
  { value: "5+ Yıl",    label: "Ömür Uzatımı Kapasitesi" },
  { value: "%40",       label: "Daha Ucuz Fırlatma" },
  { value: "24/7",      label: "Yörünge Müdahale Hazırlığı" },
];

const flowNodes = [
  { icon: "🚀", label: "Somali Uzay Limanı", sub: "Fırlatma Üssü",  color: "var(--orange)", desc: "Ekvatoral avantajla %30 daha fazla faydalı yük" },
  { icon: "🛸", label: "KUTAY",              sub: "Orbital Hub",    color: "var(--cyan)",   desc: "Yörüngedeki yakıt deposu ve ameliyathane" },
  { icon: "🛰️", label: "GEZGİN",             sub: "Servis Aracı",  color: "var(--purple)", desc: "Çevik mobil servis birimi" },
  { icon: "📡", label: "Müşteri Uydusu",     sub: "Hedef Platform", color: "var(--green)",  desc: "Yenilenen, modernize edilen uydu" },
];

const advantages = [
  { icon: TrendingUp, color: "var(--orange)", iconClass: "card__icon--orange", title: "Somali Avantajı",  desc: "Ekvatoral fırlatma üssü ile rakiplerimizden %40 daha ucuz yörünge lojistiği." },
  { icon: Globe,      color: "var(--cyan)",   iconClass: "card__icon--cyan",   title: "Shuttle Modeli",  desc: "KUTAY sabit depoyken GEZGİN sürekli mekik yapar. Görev başı maliyet minimuma iner." },
  { icon: Zap,        color: "var(--purple)", iconClass: "card__icon--purple", title: "Edge Computing",  desc: "10 yıllık uydulara yapay zeka beyin nakli yapıyoruz. Sadece yakıt değil, gelecek satıyoruz." },
  { icon: Shield,     color: "var(--green)",  iconClass: "card__icon--green",  title: "Milli Güvenlik", desc: "TÜRKSAT ve İMECE gibi stratejik uydularımızın yerli güvencesi. Dışa bağımlılık yok." },
];

/* ── component ── */
export default function HomePage() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY   = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const heroOp  = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <div className="page-wrapper">

      {/* ── HERO ── */}
      <section ref={heroRef} className="hero">
        {/* ambient glows */}
        <div className="glow-bg glow-bg--cyan"
          style={{ width: 640, height: 640, top: "15%", left: "50%", transform: "translate(-50%,-50%)" }} />
        <div className="glow-bg glow-bg--orange"
          style={{ width: 420, height: 420, bottom: "10%", right: "15%" }} />

        <motion.div style={{ y: heroY, opacity: heroOp }} className="hero__content">
          <div className="hero__badge">
            <span className="badge badge--cyan">
              <span className="dot" />
              Türkiye&apos;nin İlk Yörünge İçi Uzay Servis Şirketi
            </span>
          </div>

          <h1 className="heading-hero hero__title">
            <span className="grad-cyan" style={{ display: "block" }}>Uzayda</span>
            <span>Sürdürülebilirlik,</span>
            <br />
            <span className="grad-orange">Yörüngede</span>
            {" "}<span>Verimlilik.</span>
          </h1>

          <p className="body-lg hero__subtitle">
            KUTAY orbital hub ve GEZGİN servis aracıyla uydularınızı tamir ediyor,
            yakıt veriyor ve modernize ediyoruz.
          </p>

          <div className="hero__actions">
            <Link href="/vizyon" className="btn btn-primary">
              Vizyonu Keşfet <ChevronRight size={16} />
            </Link>
            <Link href="/kutay" className="btn btn-outline">
              KUTAY&apos;ı İncele <ArrowRight size={16} />
            </Link>
          </div>

          <div className="hero__scroll-hint">
            <span>Aşağı Kaydır</span>
            <motion.div
              className="hero__scroll-line"
              animate={{ scaleY: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 1.8, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      {/* ── FLOW ── */}
      <section className="section section--sm">
        <div className="container">
          <AnimatedSection className="section-header section-header--center">
            <span className="label c-cyan">Operasyonel Döngü</span>
            <h2 className="heading-xl">Yörünge İçi Lojistik Zinciri</h2>
            <p className="body-lg">
              Somali&apos;den yükselen yakıttan müşteri uydusuna kesintisiz servis
              zinciri. Her adım otomatik, her bağlantı güvenli.
            </p>
          </AnimatedSection>

          <div className="flow">
            {flowNodes.map((node, i) => (
              <div key={node.label} style={{ display: "flex", alignItems: "center" }}>
                <AnimatedSection delay={i * 0.12} direction="none">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="flow__node"
                    style={{
                      background: `color-mix(in srgb, ${node.color} 6%, transparent)`,
                      borderColor: `color-mix(in srgb, ${node.color} 28%, transparent)`,
                    }}
                  >
                    <motion.div
                      className="flow__icon"
                      animate={{ scale: [1, 1.08, 1] }}
                      transition={{ duration: 2.5 + i * 0.4, repeat: Infinity }}
                    >
                      {node.icon}
                    </motion.div>
                    <p className="flow__name" style={{ color: node.color }}>{node.label}</p>
                    <p className="flow__sub">{node.sub}</p>
                    <p className="flow__desc">{node.desc}</p>

                    {/* pulse ring */}
                    <motion.div
                      animate={{ scale: [1, 1.5], opacity: [0.35, 0] }}
                      transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.45 }}
                      style={{
                        position: "absolute", inset: 0,
                        borderRadius: "var(--radius-lg)",
                        border: `1px solid ${node.color}`,
                        pointerEvents: "none",
                      }}
                    />
                  </motion.div>
                </AnimatedSection>

                {i < flowNodes.length - 1 && (
                  <div className="flow__arrow">
                    <motion.svg
                      width="52" height="18" viewBox="0 0 52 18"
                      animate={{ opacity: [0.25, 1, 0.25] }}
                      transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.3 }}
                    >
                      <line x1="0" y1="9" x2="40" y2="9"
                        stroke={node.color} strokeWidth="1.5" strokeDasharray="4 3" />
                      <polygon points="40,4 52,9 40,14" fill={flowNodes[i + 1].color} opacity="0.75" />
                    </motion.svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="section section--sm">
        <div className="container">
          <AnimatedSection>
            <div className="stat-strip">
              <div className="stat-strip__grid">
                {stats.map((s, i) => (
                  <motion.div
                    key={s.label}
                    initial={{ opacity: 0, scale: 0.85 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <p className="stat-strip__value">{s.value}</p>
                    <p className="stat-strip__label">{s.label}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="hizmetler" className="section">
        <div className="container">
          <AnimatedSection className="section-header section-header--center">
            <span className="label c-cyan">Hizmet Portföyü</span>
            <h2 className="heading-xl">GökServis Modüler Hizmet Paketi</h2>
            <p className="body-lg">
              Tek seferlik satışlar yerine sürekliliği olan, yüksek marjlı hizmet
              karması. Uzayı yaşayan bir ekosistem olarak yönetiyoruz.
            </p>
          </AnimatedSection>

          <div className="grid-2">
            {services.map((svc, i) => {
              const Icon = svc.icon;
              return (
                <AnimatedSection key={svc.title} delay={i * 0.1}>
                  <Link href={svc.href} style={{ display: "block", height: "100%" }}>
                    <div className={`card card--hrow ${svc.cardClass ?? ""}`} style={{ height: "100%" }}>
                      <div className={`card__icon ${svc.colorClass}`}>
                        <Icon size={22} strokeWidth={1.5} />
                      </div>
                      <div className="card__content">
                        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                          <p className="card__title" style={{ margin: 0 }}>{svc.title}</p>
                          <span className={`tag ${svc.cardClass ? "tag--orange" : ""}`}>{svc.tag}</span>
                        </div>
                        <p className="card__body">{svc.desc}</p>
                        <p style={{ marginTop: 12, fontSize: "0.8rem", fontWeight: 700, color: svc.cardClass ? "var(--orange)" : "var(--cyan)", display: "flex", alignItems: "center", gap: 4 }}>
                          Detaylı İncele <ArrowRight size={12} />
                        </p>
                      </div>
                    </div>
                  </Link>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── WHY ── */}
      <section className="section">
        <div className="container">
          <AnimatedSection className="section-header section-header--center">
            <span className="label c-orange">Rekabet Avantajı</span>
            <h2 className="heading-xl">Neden GökServis?</h2>
          </AnimatedSection>

          <div className="grid-4">
            {advantages.map((adv, i) => {
              const Icon = adv.icon;
              return (
                <AnimatedSection key={adv.title} delay={i * 0.1}>
                  <div className="card card--neutral" style={{ height: "100%" }}>
                    <div className={`card__icon ${adv.iconClass}`}>
                      <Icon size={20} strokeWidth={1.5} />
                    </div>
                    <p className="card__title">{adv.title}</p>
                    <p className="card__body">{adv.desc}</p>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── MANIFESTO ── */}
      <section className="section">
        <div className="container">
          <AnimatedSection>
            <div className="manifesto">
              <div className="manifesto__glow" />
              <div className="manifesto__top-line" />
              <div className="manifesto__bottom-line" />

              {/* decorative spinning ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
                style={{
                  position: "absolute", top: 24, right: 24,
                  width: 72, height: 72, borderRadius: "50%",
                  border: "1px dashed rgba(0,245,255,0.14)",
                  pointerEvents: "none",
                }}
              />

              <span className="label c-cyan">GökServis Manifestosu</span>

              <blockquote className="manifesto__quote">
                &ldquo;Rakiplerimiz uzayı{" "}
                <span className="c-2">mezarlık</span> olarak görürken; biz uzayı{" "}
                <span className="grad-cyan">yaşayan bir ekosistem</span>{" "}
                olarak onarıyor, besliyor ve güncelliyoruz.&rdquo;
              </blockquote>

              <p className="manifesto__sub">
                Gelin, Türkiye&apos;nin uzaydaki ilk akıllı lojistik üssünü birlikte
                hayata geçirelim.
              </p>

              <div className="manifesto__actions">
                <Link href="/iletisim" className="btn btn-primary">
                  İletişime Geç <ChevronRight size={16} />
                </Link>
                <Link href="/vizyon" className="btn btn-outline btn-outline--orange">
                  Yatırımcı Sunumu <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

    </div>
  );
}
