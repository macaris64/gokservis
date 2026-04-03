"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Satellite, MapPin, Mail, ExternalLink, Globe } from "lucide-react";

const cols = [
  {
    title: "Platform",
    links: [
      { label: "KUTAY Orbital Hub",     href: "/kutay" },
      { label: "GEZGİN Servis Aracı",   href: "/gezgin" },
      { label: "Hizmet Portföyü",       href: "/#hizmetler" },
    ],
  },
  {
    title: "Şirket",
    links: [
      { label: "Vizyon & Ekonomi",      href: "/vizyon" },
      { label: "Stratejik Yol Haritası",href: "/vizyon#yol-haritasi" },
      { label: "İletişim",              href: "/iletisim" },
    ],
  },
  {
    title: "Teknoloji",
    links: [
      { label: "PMD Teknolojisi",       href: "/kutay#pmd" },
      { label: "6-DOF Manevra",         href: "/gezgin#6dof" },
      { label: "Evrensel Port Adaptörü",href: "/gezgin#upa" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__glow-line" />
      <div className="footer__inner">
        <div className="footer__grid">
          {/* Brand */}
          <div>
            <Link href="/" className="footer__brand-logo">
              <div className="footer__brand-logo-icon">
                <Satellite size={20} strokeWidth={1.5} />
              </div>
              <span className="footer__brand-text">
                GÖK<span>SERVİS</span>
              </span>
            </Link>

            <p className="footer__desc">
              Türkiye&apos;nin ilk yörünge içi uzay servis şirketi. KUTAY ve GEZGİN
              ile uydularınızı tazeliyor, güncelliyor ve geleceğe taşıyoruz.
            </p>

            <ul className="footer__contact-list">
              <li className="footer__contact-item">
                <MapPin size={13} color="var(--cyan)" style={{ flexShrink: 0, marginTop: 2 }} />
                <span>Uşak, Türkiye (Ar-Ge)</span>
              </li>
              <li className="footer__contact-item">
                <MapPin size={13} color="var(--orange)" style={{ flexShrink: 0, marginTop: 2 }} />
                <span>Somali Türk Uzay Limanı, Mogadişu</span>
              </li>
            </ul>

            <div className="footer__socials">
              <a href="#" aria-label="LinkedIn" className="footer__social-btn">
                <ExternalLink size={15} />
              </a>
              <a href="#" aria-label="Web" className="footer__social-btn">
                <Globe size={15} />
              </a>
            </div>
          </div>

          {/* Link columns */}
          {cols.map((col) => (
            <div key={col.title}>
              <p className="footer__col-title">{col.title}</p>
              <ul className="footer__col-links">
                {col.links.map((lnk) => (
                  <li key={lnk.label}>
                    <Link href={lnk.href} className="footer__col-link">
                      {lnk.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* TUA Hackathon Disclaimer */}
        <div style={{
          borderTop: "1px solid rgba(255,255,255,0.07)",
          paddingTop: "var(--space-lg)",
          marginBottom: "var(--space-lg)",
          display: "flex",
          flexDirection: "column",
          gap: "var(--space-sm)",
          alignItems: "center",
          textAlign: "center",
        }}>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            background: "rgba(139,92,246,0.08)",
            border: "1px solid rgba(139,92,246,0.25)",
            borderRadius: 8,
            padding: "6px 16px",
            marginBottom: 4,
          }}>
            <span style={{ fontSize: "1.1rem" }}>🚀</span>
            <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--purple)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
              TUA Astro Hackathon Projesi
            </span>
            <span style={{
              background: "rgba(139,92,246,0.18)",
              border: "1px solid rgba(139,92,246,0.35)",
              borderRadius: 4,
              padding: "1px 7px",
              fontSize: "0.65rem",
              fontWeight: 800,
              color: "var(--purple)",
              letterSpacing: "0.12em",
            }}>TUA</span>
          </div>
          <p style={{ fontSize: "0.7rem", color: "var(--text-3)", maxWidth: 600, lineHeight: 1.6 }}>
            <strong style={{ color: "var(--text-2)" }}>Yasal Uyarı:</strong>{" "}
            Bu web sitesi, Türkiye Uzay Ajansı (TUA) Astro Hackathon kapsamında hazırlanmış
            bir hobi/kavramsal tasarım projesidir. GökServis gerçek bir şirket değildir;
            sunulan tüm veriler, projeksiyonlar ve görseller yalnızca yaratıcı konsept
            amacıyla üretilmiştir. Herhangi bir yatırım, sözleşme veya ticari taahhüt
            teşkil etmez.
          </p>
        </div>

        <div className="footer__bottom">
          <span className="footer__copy">
            © 2026 GökServis Teknoloji. Tüm hakları saklıdır.
          </span>
          <div className="footer__status">
            <span className="c-3">Sistem Durumu:</span>
            <motion.div
              className="footer__status-dot"
              animate={{ scale: [1, 1.4, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="c-cyan" style={{ fontSize: "0.78rem", fontWeight: 600 }}>
              Operasyonel
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
