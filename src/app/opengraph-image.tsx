import { ImageResponse } from "next/og";

export const alt = "GökServis — Yörüngedeki Güvenceniz";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0A0A0B 0%, #0d1117 40%, #0f1520 100%)",
          position: "relative",
          overflow: "hidden",
          fontFamily: "system-ui, -apple-system, Arial, sans-serif",
        }}
      >
        {/* Grid overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            backgroundImage:
              "linear-gradient(rgba(0,245,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,245,255,0.04) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Top glow */}
        <div
          style={{
            position: "absolute",
            top: -120,
            left: "50%",
            marginLeft: -300,
            width: 600,
            height: 400,
            borderRadius: "50%",
            background: "radial-gradient(ellipse, rgba(0,245,255,0.14) 0%, transparent 70%)",
            display: "flex",
          }}
        />

        {/* Bottom-right glow */}
        <div
          style={{
            position: "absolute",
            bottom: -80,
            right: -80,
            width: 350,
            height: 350,
            borderRadius: "50%",
            background: "radial-gradient(ellipse, rgba(255,69,0,0.10) 0%, transparent 70%)",
            display: "flex",
          }}
        />

        {/* Orbital ring 1 */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            marginTop: -260,
            marginLeft: -260,
            width: 520,
            height: 520,
            border: "1px solid rgba(0,245,255,0.08)",
            borderRadius: "50%",
            display: "flex",
          }}
        />

        {/* Orbital ring 2 */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            marginTop: -340,
            marginLeft: -340,
            width: 680,
            height: 680,
            border: "1px solid rgba(0,245,255,0.04)",
            borderRadius: "50%",
            display: "flex",
          }}
        />

        {/* Main content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 24,
            textAlign: "center",
            padding: "0 80px",
          }}
        >
          {/* Badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "6px 18px",
              border: "1px solid rgba(0,245,255,0.3)",
              borderRadius: 9999,
              background: "rgba(0,245,255,0.07)",
              color: "#00F5FF",
              fontSize: 14,
              fontWeight: 600,
              letterSpacing: "0.12em",
            }}
          >
            Türkiye&apos;nin İlk Yörünge Servis Şirketi
          </div>

          {/* Brand */}
          <div
            style={{
              display: "flex",
              fontSize: 76,
              fontWeight: 900,
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
            }}
          >
            <span style={{ color: "#E2E8F0" }}>GÖK</span>
            <span style={{ color: "#00F5FF" }}>SERVİS</span>
          </div>

          {/* Tagline */}
          <div
            style={{
              display: "flex",
              fontSize: 26,
              fontWeight: 400,
              color: "#94A3B8",
              lineHeight: 1.4,
              maxWidth: 700,
            }}
          >
            Uzayda Sürdürülebilirlik, Yörüngede Verimlilik.
          </div>

          {/* Pills */}
          <div
            style={{
              display: "flex",
              gap: 16,
              marginTop: 8,
            }}
          >
            {["KUTAY Orbital Hub", "GEZGİN Servis Aracı", "SPaaS"].map((label) => (
              <div
                key={label}
                style={{
                  display: "flex",
                  padding: "8px 20px",
                  borderRadius: 8,
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.10)",
                  color: "#94A3B8",
                  fontSize: 16,
                  fontWeight: 500,
                }}
              >
                {label}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom accent bar */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 3,
            background: "linear-gradient(90deg, transparent, #00F5FF 30%, #00F5FF 70%, transparent)",
            display: "flex",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
