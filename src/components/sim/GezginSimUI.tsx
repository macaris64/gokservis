"use client";

import { motion, AnimatePresence } from "framer-motion";
import { RotateCcw, CheckCircle2 } from "lucide-react";
import type { GezginStats } from "./types";

interface GezginSimUIProps extends GezginStats {
  onReset: () => void;
}

const CONTROLS = [
  { key: "W / S",       label: "İleri / Geri",    color: "var(--orange)" },
  { key: "A / D",       label: "Sol / Sağ",        color: "var(--orange)" },
  { key: "Q / E",       label: "Yukarı / Aşağı",   color: "var(--orange)" },
  { key: "← →",         label: "Yaw (Sapma)",      color: "var(--cyan)"   },
  { key: "↑ ↓",         label: "Pitch",            color: "var(--cyan)"   },
  { key: "Z / X",       label: "Roll (Yalpa)",     color: "var(--cyan)"   },
  { key: "R",           label: "Sıfırla",          color: "rgba(255,255,255,0.45)" },
];

function Stat({ label, value, unit, color = "var(--cyan)" }: {
  label: string; value: string; unit?: string; color?: string;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <span style={{ fontSize: "0.58rem", letterSpacing: "0.12em", color: "rgba(255,255,255,0.4)", textTransform: "uppercase" }}>
        {label}
      </span>
      <span style={{ fontSize: "0.82rem", fontWeight: 700, color, fontVariantNumeric: "tabular-nums" }}>
        {value}
        {unit && <span style={{ fontSize: "0.6rem", marginLeft: 3, color: "rgba(255,255,255,0.35)" }}>{unit}</span>}
      </span>
    </div>
  );
}

export default function GezginSimUI({ distance, speed, docked, yaw, pitch, roll, onReset }: GezginSimUIProps) {
  const distColor = distance < 5 ? "#10B981" : distance < 15 ? "#FF4500" : "var(--cyan)";
  const approaching = distance < 20 && !docked;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        fontFamily: "var(--font-heading), monospace",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {/* ── TOP BAR ─────────────────────────────────────────── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "13px 18px 11px",
          background: "linear-gradient(to bottom, rgba(10,10,11,0.9) 0%, transparent 100%)",
          pointerEvents: "auto",
          gap: 12,
        }}
      >
        {/* Title */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: "0.6rem", letterSpacing: "0.16em", color: "var(--orange)", textTransform: "uppercase" }}>
            GEZGİN
          </span>
          <span style={{ color: "rgba(255,255,255,0.2)" }}>/</span>
          <span style={{ fontSize: "0.6rem", letterSpacing: "0.12em", color: "var(--text-3)", textTransform: "uppercase" }}>
            6-DOF Simülatör
          </span>
        </div>

        {/* Telemetry row */}
        <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
          <Stat label="Mesafe" value={distance.toFixed(1)} unit="m" color={distColor} />
          <Stat label="Hız" value={(speed * 100).toFixed(1)} unit="m/s" />
          <Stat label="Yaw"   value={`${yaw > 0 ? "+" : ""}${yaw}°`}   />
          <Stat label="Pitch" value={`${pitch > 0 ? "+" : ""}${pitch}°`} />
          <Stat label="Roll"  value={`${roll > 0 ? "+" : ""}${roll}°`}  />
        </div>

        {/* Reset button */}
        <button
          onClick={onReset}
          title="Sıfırla (R)"
          style={{
            pointerEvents: "auto",
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "6px 12px",
            background: "rgba(255,69,0,0.12)",
            border: "1px solid rgba(255,69,0,0.3)",
            borderRadius: 6,
            color: "var(--orange)",
            fontSize: "0.68rem",
            letterSpacing: "0.1em",
            cursor: "pointer",
            fontFamily: "inherit",
          }}
        >
          <RotateCcw size={11} />
          SIFIRLA
        </button>
      </div>

      {/* ── APPROACH PROXIMITY ALERT ─────────────────────────── */}
      <AnimatePresence>
        {approaching && (
          <motion.div
            key="approach"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              pointerEvents: "none",
              textAlign: "center",
            }}
          >
            {distance < 5 && (
              <motion.p
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                style={{
                  fontSize: "0.65rem",
                  letterSpacing: "0.18em",
                  color: "#10B981",
                  textTransform: "uppercase",
                  textShadow: "0 0 14px rgba(16,185,129,0.7)",
                }}
              >
                Kenetlenme Hazır — Hizalanıyor…
              </motion.p>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── DOCKING SUCCESS OVERLAY ──────────────────────────── */}
      <AnimatePresence>
        {docked && (
          <motion.div
            key="docked"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              pointerEvents: "none",
              background: "radial-gradient(ellipse at center, rgba(16,185,129,0.18) 0%, transparent 70%)",
            }}
          >
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 220, damping: 18 }}
              style={{ textAlign: "center" }}
            >
              <CheckCircle2 size={48} color="#10B981" style={{ marginBottom: 12 }} />
              <p style={{
                fontSize: "1.5rem",
                fontWeight: 800,
                letterSpacing: "0.2em",
                color: "#10B981",
                textShadow: "0 0 28px rgba(16,185,129,0.6)",
                marginBottom: 8,
              }}>
                KENETLENME BAŞARILI
              </p>
              <p style={{
                fontSize: "0.7rem",
                letterSpacing: "0.14em",
                color: "rgba(255,255,255,0.45)",
              }}>
                UPA kilitlendi — Gök-Dock bağlantısı kuruldu
              </p>
              <p style={{
                fontSize: "0.62rem",
                letterSpacing: "0.1em",
                color: "rgba(255,255,255,0.28)",
                marginTop: 16,
              }}>
                R tuşu veya SIFIRLA ile yeniden başlat
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── BOTTOM: CONTROLS LEGEND ──────────────────────────── */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          padding: "10px 18px 14px",
          background: "linear-gradient(to top, rgba(10,10,11,0.88) 0%, transparent 100%)",
        }}
      >
        {/* Control grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, auto)",
            gap: "4px 18px",
            alignItems: "center",
          }}
        >
          {CONTROLS.map(({ key, label, color }) => (
            <div key={key} style={{ display: "flex", alignItems: "center", gap: 7 }}>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  padding: "2px 7px",
                  background: "rgba(255,255,255,0.07)",
                  border: "1px solid rgba(255,255,255,0.14)",
                  borderRadius: 4,
                  fontSize: "0.62rem",
                  letterSpacing: "0.05em",
                  color: "rgba(255,255,255,0.75)",
                  whiteSpace: "nowrap",
                  minWidth: 44,
                  justifyContent: "center",
                }}
              >
                {key}
              </span>
              <span style={{ fontSize: "0.62rem", color, letterSpacing: "0.06em", whiteSpace: "nowrap" }}>
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* Keyboard active indicator */}
        <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
          <motion.div
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--orange)" }}
          />
          <span style={{ fontSize: "0.58rem", letterSpacing: "0.1em", color: "rgba(255,255,255,0.3)" }}>
            KLAVYE AKTİF
          </span>
        </div>
      </div>
    </div>
  );
}
