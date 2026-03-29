"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Satellite } from "lucide-react";

const links = [
  { href: "/",           label: "Anasayfa" },
  { href: "/kutay",      label: "KUTAY" },
  { href: "/gezgin",     label: "GEZGİN" },
  { href: "/simulasyon", label: "Görev Simülatörü" },
  { href: "/vizyon",     label: "Vizyon & Ekonomi" },
  { href: "/iletisim",   label: "İletişim" },
];

export default function Navbar() {
  const [open, setOpen]         = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname                = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = useCallback(() => setOpen(false), []);


  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}
    >
      {/* Skip-to-content link for keyboard / screen-reader users */}
      <a href="#main-content" className="skip-link">
        İçeriğe geç
      </a>
      <div className="navbar__inner">
        {/* Logo */}
        <Link href="/" className="navbar__logo">
          <div className="navbar__logo-icon">
            <Satellite size={18} strokeWidth={1.5} />
          </div>
          <span className="navbar__logo-text">
            GÖK<span>SERVİS</span>
          </span>
        </Link>

        {/* Desktop links */}
        <nav className="navbar__links" aria-label="Ana navigasyon">
          {links.map(({ href, label }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`navbar__link ${active ? "navbar__link--active" : ""}`}
                aria-current={active ? "page" : undefined}
              >
                {active && (
                  <motion.span
                    layoutId="nav-pill"
                    className="nav-pill"
                    style={{
                      position: "absolute",
                      inset: 0,
                      borderRadius: "var(--radius-md)",
                      background: "rgba(0,245,255,0.07)",
                      border: "1px solid rgba(0,245,255,0.18)",
                      zIndex: -1,
                    }}
                    transition={{ type: "spring", bounce: 0.18, duration: 0.5 }}
                  />
                )}
                {label}
              </Link>
            );
          })}

          <Link href="/iletisim" className="navbar__cta desktop-only" style={{ marginLeft: 14 }}>
            İletişime Geç
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          className="navbar__toggle"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menüyü aç/kapat"
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.nav
            key="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: "easeInOut" }}
            className="navbar__mobile"
            aria-label="Mobil navigasyon"
          >
            <div className="navbar__mobile-inner">
              {links.map(({ href, label }, i) => {
                const active = pathname === href;
                return (
                  <motion.div
                    key={href}
                    initial={{ x: -14, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.06 }}
                  >
                    <Link
                      href={href}
                      className={`navbar__mobile-link ${active ? "navbar__mobile-link--active" : ""}`}
                      aria-current={active ? "page" : undefined}
                      onClick={closeMenu}
                    >
                      {label}
                    </Link>
                  </motion.div>
                );
              })}
              <motion.div
                initial={{ x: -14, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: links.length * 0.06 }}
              >
                <Link href="/iletisim" className="navbar__mobile-cta" onClick={closeMenu}>
                  İletişime Geç
                </Link>
              </motion.div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
