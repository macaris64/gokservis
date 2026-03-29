"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, Camera, RotateCcw } from "lucide-react";
import type { SimStats, SimControls } from "./types";

const PHASES = [
  { id: 0, short: "HAZIRLIK", color: "#00F5FF" },
  { id: 1, short: "İNTİKAL",  color: "#FF4500" },
  { id: 2, short: "YANAŞMA",  color: "#FF4500" },
  { id: 3, short: "KENET.",   color: "#00F5FF" },
  { id: 4, short: "TRANSFER", color: "#10B981" },
];

interface SimUIProps extends SimStats, SimControls {}

export default function SimUI({
  phase,
  phaseName,
  distance,
  velocity,
  fuelPct,
  playing,
  speed,
  cinematic,
  onTogglePlay,
  onSpeed,
  onToggleCinematic,
}: SimUIProps) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        fontFamily: "var(--font-heading), monospace",
      }}
    >
      {/* ── TOP BAR ── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "14px 20px 12px",
          background: "linear-gradient(to bottom, rgba(10,10,11,0.92) 0%, transparent 100%)",
          pointerEvents: "auto",
          gap: 16,
        }}
      >
        {/* Title */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
          <span style={{ fontSize: "0.65rem", letterSpacing: "0.14em", color: "var(--cyan)", textTransform: "uppercase" }}>
            GökServis
          </span>
          <span style={{ color: "rgba(255,255,255,0.2)", fontSize: "0.7rem" }}>/</span>
          <span style={{ fontSize: "0.65rem", letterSpacing: "0.1em", color: "var(--text-2)", textTransform: "uppercase" }}>
            Görev Simülatörü
          </span>
        </div>

        {/* ── PHASE TIMELINE (top-right of title) ── */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            background: "rgba(10,10,11,0.72)",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: 999,
            padding: "7px 14px",
            backdropFilter: "blur(10px)",
            gap: 2,
            flex: 1,
            justifyContent: "center",
            maxWidth: 420,
          }}
        >
          {PHASES.map((p, i) => {
            const active = phase === p.id;
            const done = phase > p.id;
            return (
              <div key={p.id} style={{ display: "flex", alignItems: "center" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
                  <motion.div
                    animate={{
                      scale: active ? [1, 1.25, 1] : 1,
                      boxShadow: active ? `0 0 10px ${p.color}` : "none",
                    }}
                    transition={{ duration: 1.1, repeat: active ? Infinity : 0 }}
                    style={{
                      width: 9,
                      height: 9,
                      borderRadius: "50%",
                      background: done ? p.color : active ? p.color : "rgba(255,255,255,0.15)",
                      border: active || done ? `2px solid ${p.color}` : "2px solid rgba(255,255,255,0.18)",
                    }}
                  />
                  <span
                    style={{
                      fontSize: "0.5rem",
                      letterSpacing: "0.06em",
                      color: active ? p.color : done ? "rgba(255,255,255,0.45)" : "rgba(255,255,255,0.22)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {p.short}
                  </span>
                </div>

                {i < PHASES.length - 1 && (
                  <div
                    style={{
                      width: 22,
                      height: 1,
                      background: done
                        ? `linear-gradient(90deg, ${PHASES[i].color}, ${PHASES[i + 1].color})`
                        : "rgba(255,255,255,0.09)",
                      margin: "0 4px",
                      marginBottom: 14,
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Camera toggle */}
        <button
          onClick={onToggleCinematic}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 7,
            padding: "6px 14px",
            background: cinematic ? "rgba(0,245,255,0.1)" : "rgba(255,255,255,0.06)",
            border: cinematic ? "1px solid rgba(0,245,255,0.3)" : "1px solid rgba(255,255,255,0.12)",
            borderRadius: 999,
            color: cinematic ? "var(--cyan)" : "var(--text-2)",
            fontSize: "0.7rem",
            letterSpacing: "0.08em",
            cursor: "pointer",
            transition: "all 0.2s",
            flexShrink: 0,
          }}
        >
          <Camera size={12} />
          {cinematic ? "SİNEMATİK" : "SERBEST"}
        </button>
      </div>

      {/* ── BOTTOM BAR ── */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          padding: "10px 20px 16px",
          background: "linear-gradient(to top, rgba(10,10,11,0.92) 0%, transparent 100%)",
          pointerEvents: "auto",
          gap: 12,
          flexWrap: "wrap",
        }}
      >
        {/* Stats */}
        <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
          <StatItem label="MESAFE" value={`${distance} B`} color="#00F5FF" />
          <StatItem label="HIZLANMA" value={`${velocity} m/s`} color="#FF4500" />
          <StatItem label="FAZ" value={phaseName} color="var(--text-1)" small />
          {phase === 4 && (
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <StatItem label="YAKIT DOLULUĞU" value={`${fuelPct}%`} color="#10B981" />
              </motion.div>
            </AnimatePresence>
          )}
        </div>

        {/* Controls */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {/* Speed */}
          <div
            style={{
              display: "flex",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 999,
              overflow: "hidden",
            }}
          >
            {([0.5, 1, 2] as const).map((s) => (
              <button
                key={s}
                onClick={() => onSpeed(s)}
                style={{
                  padding: "6px 12px",
                  fontSize: "0.65rem",
                  letterSpacing: "0.06em",
                  background: speed === s ? "rgba(0,245,255,0.12)" : "transparent",
                  color: speed === s ? "var(--cyan)" : "var(--text-3)",
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.18s",
                  borderRight: s !== 2 ? "1px solid rgba(255,255,255,0.08)" : "none",
                }}
              >
                {s}×
              </button>
            ))}
          </div>

          {/* Play / Pause */}
          <button
            onClick={onTogglePlay}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "8px 18px",
              background: playing ? "rgba(255,69,0,0.12)" : "rgba(0,245,255,0.12)",
              border: playing ? "1px solid rgba(255,69,0,0.3)" : "1px solid rgba(0,245,255,0.3)",
              borderRadius: 999,
              color: playing ? "#FF4500" : "var(--cyan)",
              fontSize: "0.7rem",
              letterSpacing: "0.08em",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
          >
            {playing ? <Pause size={13} /> : <Play size={13} />}
            {playing ? "DURAKLAT" : "OYNAT"}
          </button>
        </div>
      </div>

      {/* ── LIVE PHASE BADGE (center right) ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={phase}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          transition={{ duration: 0.4 }}
          style={{
            position: "absolute",
            right: 20,
            top: "50%",
            transform: "translateY(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            gap: 4,
            pointerEvents: "none",
          }}
        >
          <span
            style={{
              fontSize: "0.6rem",
              letterSpacing: "0.14em",
              color: PHASES[phase]?.color ?? "var(--cyan)",
              textTransform: "uppercase",
            }}
          >
            FAZ {String(phase + 1).padStart(2, "0")}
          </span>
          <span
            style={{
              fontSize: "1.05rem",
              fontWeight: 700,
              color: "var(--text-1)",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            {phaseName}
          </span>
          {/* Progress bar */}
          <div
            style={{
              width: 90,
              height: 2,
              background: "rgba(255,255,255,0.1)",
              borderRadius: 2,
              overflow: "hidden",
            }}
          >
            <motion.div
              style={{
                height: "100%",
                background: PHASES[phase]?.color ?? "var(--cyan)",
                borderRadius: 2,
              }}
            />
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function StatItem({
  label,
  value,
  color,
  small,
}: {
  label: string;
  value: string;
  color: string;
  small?: boolean;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <span
        style={{
          fontSize: "0.52rem",
          letterSpacing: "0.12em",
          color: "var(--text-3)",
          textTransform: "uppercase",
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontSize: small ? "0.75rem" : "0.9rem",
          fontWeight: 700,
          color,
          letterSpacing: "0.06em",
          fontFamily: "var(--font-heading), monospace",
        }}
      >
        {value}
      </span>
    </div>
  );
}
