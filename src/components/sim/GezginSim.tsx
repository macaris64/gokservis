"use client";

import { useRef, useEffect, useMemo, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Stars, Text } from "@react-three/drei";
import * as THREE from "three";
import type { GezginStats } from "./types";

// ─── CONSTANTS ────────────────────────────────────────────────────────────────

const THRUST        = 0.055;
const ANGULAR_RATE  = 0.016;
const LINEAR_DAMP   = 0.965;
const MAX_SPEED     = 0.70;

/** Body center of GEZGİN when perfectly docked (UPA tip reaches KUTAY port at z=7.2) */
const DOCK_POS  = new THREE.Vector3(0, 0, 10.2);
/** KUTAY forward dock port position in world space */
const DOCK_PORT = new THREE.Vector3(0, 0, 7.2);
const DOCK_DIST_THRESH  = 2.6;
const DOCK_ALIGN_THRESH = 0.85; // ≈ cos(32°)

const START_POS = new THREE.Vector3(0, 2, 36);

// Reusable math buffers — never allocate inside useFrame
const _thrustVec = new THREE.Vector3();
const _camOff    = new THREE.Vector3();
const _camDest   = new THREE.Vector3();
const _lookAt    = new THREE.Vector3();
const _fwd       = new THREE.Vector3();
const _identQ    = new THREE.Quaternion();
const _axisY     = new THREE.Vector3(0, 1, 0);
const _axisX     = new THREE.Vector3(1, 0, 0);
const _axisZ     = new THREE.Vector3(0, 0, -1);
const _deltaQ    = new THREE.Quaternion();

// Orbital / spin speeds (radians per second)
const EARTH_ROT_SPEED = 0.018; // Earth spin around Y
const KUTAY_SPIN_SPEED = EARTH_ROT_SPEED; // KUTAY spins in same direction
const KUTAY_ORBIT_SPEED = 0.004; // small revolution around origin
const KUTAY_ORBIT_RADIUS = 0.9;

// ─── PROPS ────────────────────────────────────────────────────────────────────

export interface GezginSimProps {
  onStats?:      (s: GezginStats) => void;
  onDocked?:     (v: boolean) => void;
  resetSignal?:  number;
}

// ─── KEYBOARD LISTENER ────────────────────────────────────────────────────────

const HANDLED_KEYS = new Set([
  "w","W","s","S","a","A","d","D","q","Q","e","E",
  "z","Z","x","X","r","R",
  "ArrowLeft","ArrowRight","ArrowUp","ArrowDown",
]);

function KeyListener({ keysRef }: { keysRef: React.MutableRefObject<Set<string>> }) {
  useEffect(() => {
    const dn = (e: KeyboardEvent) => {
      if (HANDLED_KEYS.has(e.key)) e.preventDefault();
      keysRef.current.add(e.key);
    };
    const up = (e: KeyboardEvent) => keysRef.current.delete(e.key);
    document.addEventListener("keydown", dn);
    document.addEventListener("keyup",   up);
    return () => {
      document.removeEventListener("keydown", dn);
      document.removeEventListener("keyup",   up);
    };
  }, [keysRef]);
  return null;
}

// ─── TURKISH FLAG ─────────────────────────────────────────────────────────────

function TurkishFlag({ side }: { side: 1 | -1 }) {
  const crescentGeo = useMemo(() => {
    const outer = new THREE.Shape();
    outer.absarc(0, 0, 0.30, 0, Math.PI * 2, false);
    const hole = new THREE.Path();
    hole.absarc(0.115, 0, 0.245, 0, Math.PI * 2, true);
    outer.holes.push(hole);
    return new THREE.ShapeGeometry(outer, 48);
  }, []);

  const starGeo = useMemo(() => {
    const s = new THREE.Shape();
    const outerR = 0.125, innerR = 0.05, n = 5;
    for (let i = 0; i < n * 2; i++) {
      const a   = (i * Math.PI) / n - Math.PI / 2;
      const r   = i % 2 === 0 ? outerR : innerR;
      const x   = Math.cos(a) * r;
      const y   = Math.sin(a) * r;
      i === 0 ? s.moveTo(x, y) : s.lineTo(x, y);
    }
    s.closePath();
    return new THREE.ShapeGeometry(s, 1);
  }, []);

  // side=+1 → +X face (rotation Y=+π/2), side=-1 → -X face (rotation Y=-π/2)
  const rotY = side * (Math.PI / 2);

  return (
    <group position={[side * 1.016, 0.06, -0.18]} rotation={[0, rotY, 0]}>
      {/* Red background */}
      <mesh>
        <planeGeometry args={[1.55, 1.0]} />
        <meshStandardMaterial
          color="#E30A17" emissive="#E30A17" emissiveIntensity={0.28}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* White crescent */}
      <mesh geometry={crescentGeo} position={[-0.19, 0, 0.004]}>
        <meshStandardMaterial
          color="#ffffff" emissive="#ffffff" emissiveIntensity={0.55}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* White star (slight tilt matches Turkish flag) */}
      <mesh geometry={starGeo} position={[0.27, 0.02, 0.004]} rotation={[0, 0, Math.PI / 10]}>
        <meshStandardMaterial
          color="#ffffff" emissive="#ffffff" emissiveIntensity={0.55}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

// ─── KUTAY STATION ────────────────────────────────────────────────────────────

function KutayStation() {
  const ref = useRef<THREE.Group>(null!);
  const angleRef = useRef(0);

  useFrame((_, dt) => {
    if (!ref.current) return;
    angleRef.current += dt * KUTAY_ORBIT_SPEED;
    const a = angleRef.current;
    ref.current.position.x = Math.cos(a) * KUTAY_ORBIT_RADIUS;
    ref.current.position.z = Math.sin(a) * KUTAY_ORBIT_RADIUS;
    // spin around Y in same direction as Earth
    ref.current.rotation.y += dt * KUTAY_SPIN_SPEED;
  });

  return (
    <group ref={ref}>
      {/* Main hub body */}
      <mesh>
        <boxGeometry args={[6, 6, 12]} />
        <meshStandardMaterial
          color="#11112a" metalness={0.85} roughness={0.2}
          emissive="#00F5FF" emissiveIntensity={0.06}
        />
      </mesh>

      {/* Solar panel struts */}
      {([-7, 7] as number[]).map((x) => (
        <mesh key={x} position={[x, 0, -1]}>
          <boxGeometry args={[8, 0.25, 0.25]} />
          <meshStandardMaterial color="#2a2a44" metalness={0.9} roughness={0.1} />
        </mesh>
      ))}

      {/* Solar panels */}
      {([-9, 9] as number[]).map((x) => (
        <mesh key={x} position={[x, 0, -1]}>
          <boxGeometry args={[6, 0.08, 3.5]} />
          <meshStandardMaterial
            color="#0a1530" emissive="#004488" emissiveIntensity={0.4}
            metalness={0.6} roughness={0.35}
          />
        </mesh>
      ))}

      {/* MLI insulation bands */}
      {([-3.5, -1.2, 1.2, 3.5] as number[]).map((z) => (
        <mesh key={z} position={[0, 3.05, z]}>
          <boxGeometry args={[6.12, 0.12, 0.45]} />
          <meshStandardMaterial color="#C8B090" metalness={0.25} roughness={0.85} />
        </mesh>
      ))}

      {/* Forward docking port collar */}
      <mesh position={[0, 0, 6.6]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.6, 0.6, 1.2, 24]} />
        <meshStandardMaterial
          color="#002a2a" metalness={0.95} roughness={0.05}
          emissive="#00F5FF" emissiveIntensity={0.8}
        />
      </mesh>

      {/* Dock alignment ring */}
      <mesh position={[0, 0, 7.25]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.78, 0.07, 12, 36]} />
        <meshStandardMaterial color="#00F5FF" emissive="#00F5FF" emissiveIntensity={2.5} />
      </mesh>

      {/* Secondary dock ports */}
      {[
        { p: [0,  3.6, 1] as [number,number,number], r: [0, 0, 0]            as [number,number,number] },
        { p: [0, -3.6, 1] as [number,number,number], r: [Math.PI, 0, 0]      as [number,number,number] },
        { p: [ 3.6, 0, 1] as [number,number,number], r: [0, 0,  Math.PI / 2] as [number,number,number] },
        { p: [-3.6, 0, 1] as [number,number,number], r: [0, 0, -Math.PI / 2] as [number,number,number] },
      ].map(({ p, r }, i) => (
        <mesh key={i} position={p} rotation={r}>
          <cylinderGeometry args={[0.35, 0.35, 0.8, 12]} />
          <meshStandardMaterial
            color="#002020" emissive="#00F5FF" emissiveIntensity={0.3}
            metalness={0.9} roughness={0.1}
          />
        </mesh>
      ))}

      {/* Ameliyathane surgical module */}
      <mesh position={[0, -3.5, -1.5]}>
        <boxGeometry args={[3, 1, 4]} />
        <meshStandardMaterial
          color="#0e0e22" metalness={0.7} roughness={0.4}
          emissive="#8B5CF6" emissiveIntensity={0.08}
        />
      </mesh>

      {/* KUTAY label — faces +Z (toward approaching GEZGİN) */}
      <Text
        position={[0, 3.4, 6.15]}
        fontSize={0.72}
        color="#00F5FF"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.18}
      >
        KUTAY
      </Text>
      <Text
        position={[0, 2.68, 6.15]}
        fontSize={0.28}
        color="#3ecfcf"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.12}
      >
        ORBITAL HUB
      </Text>

      <pointLight color="#00F5FF" intensity={3.5} distance={22} decay={2} />
    </group>
  );
}

// ─── GEZGIN BODY ──────────────────────────────────────────────────────────────

function GezginBody({
  posRef,
  quatRef,
}: {
  posRef:  React.MutableRefObject<THREE.Vector3>;
  quatRef: React.MutableRefObject<THREE.Quaternion>;
}) {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame(() => {
    if (!groupRef.current) return;
    groupRef.current.position.copy(posRef.current);
    groupRef.current.quaternion.copy(quatRef.current);
  });

  return (
    <group ref={groupRef}>
      {/* Main body */}
      <mesh>
        <boxGeometry args={[2, 2, 3]} />
        <meshStandardMaterial
          color="#1a0a04" metalness={0.75} roughness={0.25}
          emissive="#FF4500" emissiveIntensity={0.1}
        />
      </mesh>

      {/* Solar panels */}
      <mesh position={[-2.4, 0, 0]}>
        <boxGeometry args={[2.8, 0.07, 1.4]} />
        <meshStandardMaterial color="#0a1525" emissive="#002244" emissiveIntensity={0.4} />
      </mesh>
      <mesh position={[2.4, 0, 0]}>
        <boxGeometry args={[2.8, 0.07, 1.4]} />
        <meshStandardMaterial color="#0a1525" emissive="#002244" emissiveIntensity={0.4} />
      </mesh>

      {/* UPA docking head (faces body -Z = toward KUTAY) */}
      <mesh position={[0, 0, -2.25]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.2, 0.32, 1.5, 16]} />
        <meshStandardMaterial
          color="#200a00" metalness={0.95} roughness={0.05}
          emissive="#FF4500" emissiveIntensity={0.65}
        />
      </mesh>

      {/* UPA tip ring */}
      <mesh position={[0, 0, -3.02]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.24, 0.045, 8, 18]} />
        <meshStandardMaterial color="#FF4500" emissive="#FF4500" emissiveIntensity={2} />
      </mesh>

      {/* RCS thruster nozzles (8 corners) */}
      {([
        [-0.85,  0.85, -1.2], [ 0.85,  0.85, -1.2],
        [-0.85, -0.85, -1.2], [ 0.85, -0.85, -1.2],
        [-0.85,  0.85,  1.2], [ 0.85,  0.85,  1.2],
        [-0.85, -0.85,  1.2], [ 0.85, -0.85,  1.2],
      ] as [number, number, number][]).map((pos, i) => (
        <mesh key={i} position={pos}>
          <cylinderGeometry args={[0.065, 0.1, 0.2, 8]} />
          <meshStandardMaterial color="#333" metalness={1} roughness={0.1} />
        </mesh>
      ))}

      {/* Chemical thruster cone (rear = +Z face) */}
      <mesh position={[0, 0, 1.75]} rotation={[Math.PI / 2, 0, 0]}>
        <coneGeometry args={[0.42, 0.65, 16]} />
        <meshStandardMaterial
          color="#1a0800" metalness={0.8} roughness={0.15}
          emissive="#FF5511" emissiveIntensity={0.5}
        />
      </mesh>

      {/* Turkish flags on both sides */}
      <TurkishFlag side={1}  />
      <TurkishFlag side={-1} />

      {/* GEZGİN label on top face */}
      <Text
        position={[0, 1.07, -0.12]}
        rotation={[-Math.PI / 2, 0, 0]}
        fontSize={0.34}
        color="#FF4500"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.14}
      >
        GEZGİN
      </Text>

      <pointLight color="#FF4500" intensity={1.2} distance={9} decay={2} />
    </group>
  );
}

// ─── EARTH ────────────────────────────────────────────────────────────────────

function Earth() {
  const ref = useRef<THREE.Mesh>(null!);

  useFrame((_, dt) => {
    if (!ref.current) return;
    ref.current.rotation.y += dt * EARTH_ROT_SPEED;
  });

  return (
    <mesh ref={ref} position={[-65, -45, -130]}>
      {/* lower-poly Earth to reduce GPU overhead during dev */}
      <sphereGeometry args={[60, 18, 18]} />
      <meshStandardMaterial
        color="#1a3a5c" emissive="#0a1a2e" emissiveIntensity={0.45}
        metalness={0} roughness={0.85}
      />
    </mesh>
  );
}

// ─── CONTROLLER ───────────────────────────────────────────────────────────────

interface ControllerProps {
  keysRef:      React.MutableRefObject<Set<string>>;
  posRef:       React.MutableRefObject<THREE.Vector3>;
  quatRef:      React.MutableRefObject<THREE.Quaternion>;
  velRef:       React.MutableRefObject<THREE.Vector3>;
  onStats?:     (s: GezginStats) => void;
  onDocked?:    (v: boolean) => void;
  resetSignal?: number;
}

function Controller({
  keysRef, posRef, quatRef, velRef, onStats, onDocked, resetSignal,
}: ControllerProps) {
  const { camera } = useThree();
  const dockedRef       = useRef(false);
  const snapRef         = useRef(0);
  const dockedFiredRef  = useRef(false);
  const statsThrottle   = useRef(0);
  const prevResetRef    = useRef(resetSignal ?? 0);

  // External reset (parent reset button)
  useEffect(() => {
    const cur = resetSignal ?? 0;
    if (cur === prevResetRef.current) return;
    prevResetRef.current = cur;
    posRef.current.copy(START_POS);
    quatRef.current.identity();
    velRef.current.set(0, 0, 0);
    dockedRef.current      = false;
    snapRef.current        = 0;
    dockedFiredRef.current = false;
    onDocked?.(false);
  }, [resetSignal, posRef, quatRef, velRef, onDocked]);

  useFrame((_, dt) => {
    const keys = keysRef.current;
    const pos  = posRef.current;
    const quat = quatRef.current;
    const vel  = velRef.current;

    // R key — internal reset
    if (keys.has("r") || keys.has("R")) {
      keys.delete("r"); keys.delete("R");
      pos.copy(START_POS);
      quat.identity();
      vel.set(0, 0, 0);
      dockedRef.current      = false;
      snapRef.current        = 0;
      dockedFiredRef.current = false;
      onDocked?.(false);
      return;
    }

    // ── PHYSICS (only when not fully snapped) ───────────────────────────────
    if (!dockedRef.current) {
      // Thrust in body frame (W=forward=-Z, S=back, A=left=-X, D=right, Q=up, E=down)
      _thrustVec.set(
        (keys.has("d") || keys.has("D") ? 1 : 0) - (keys.has("a") || keys.has("A") ? 1 : 0),
        (keys.has("q") || keys.has("Q") ? 1 : 0) - (keys.has("e") || keys.has("E") ? 1 : 0),
        (keys.has("s") || keys.has("S") ? 1 : 0) - (keys.has("w") || keys.has("W") ? 1 : 0),
      ).multiplyScalar(THRUST).applyQuaternion(quat);
      vel.add(_thrustVec);

      // Speed cap
      const spd = vel.length();
      if (spd > MAX_SPEED) vel.multiplyScalar(MAX_SPEED / spd);

      // Rotations in body frame (multiply on right = local axis)
      const yaw   = (keys.has("ArrowLeft")  ? 1 : 0) - (keys.has("ArrowRight") ? 1 : 0);
      const pitch = (keys.has("ArrowUp")    ? 1 : 0) - (keys.has("ArrowDown")  ? 1 : 0);
      const roll  = (keys.has("z") || keys.has("Z") ? 1 : 0)
                  - (keys.has("x") || keys.has("X") ? 1 : 0);

      if (yaw !== 0) {
        _deltaQ.setFromAxisAngle(_axisY, yaw * ANGULAR_RATE);
        quat.multiply(_deltaQ);
      }
      if (pitch !== 0) {
        _deltaQ.setFromAxisAngle(_axisX, pitch * ANGULAR_RATE);
        quat.multiply(_deltaQ);
      }
      if (roll !== 0) {
        _deltaQ.setFromAxisAngle(_axisZ, roll * ANGULAR_RATE);
        quat.multiply(_deltaQ);
      }
      quat.normalize();

      // Linear damping + integrate
      vel.multiplyScalar(LINEAR_DAMP);
      pos.addScaledVector(vel, 1);

      // Docking check
      const distToDock = pos.distanceTo(DOCK_POS);
      _fwd.set(0, 0, -1).applyQuaternion(quat);
      const alignment = _fwd.dot(new THREE.Vector3(0, 0, -1));

      if (distToDock < DOCK_DIST_THRESH && alignment > DOCK_ALIGN_THRESH) {
        dockedRef.current = true;
        if (!dockedFiredRef.current) {
          dockedFiredRef.current = true;
          onDocked?.(true);
        }
      }
    }

    // ── DOCKING SNAP ────────────────────────────────────────────────────────
    if (dockedRef.current && snapRef.current < 1) {
      snapRef.current = Math.min(1, snapRef.current + dt * 1.6);
      const t = snapRef.current;
      pos.lerp(DOCK_POS, t * 0.14);
      quat.slerp(_identQ, t * 0.1);
      vel.set(0, 0, 0);
    }

    // ── CHASE CAMERA ────────────────────────────────────────────────────────
    _camOff.set(0, 5, 14).applyQuaternion(quat);
    _camDest.copy(pos).add(_camOff);
    _lookAt.set(0, 0, -8).applyQuaternion(quat).add(pos);
    camera.position.lerp(_camDest, 0.06);
    camera.lookAt(_lookAt);

    // ── STATS (throttled to ~12 fps) ────────────────────────────────────────
    statsThrottle.current += dt;
    if (statsThrottle.current >= 0.083) {
      statsThrottle.current = 0;
      const euler  = new THREE.Euler().setFromQuaternion(quat, "YXZ");
      const toDeg  = (r: number) => Math.round((r * 180) / Math.PI);
      onStats?.({
        distance: Math.max(0, pos.distanceTo(DOCK_PORT)),
        speed:    vel.length(),
        docked:   dockedRef.current,
        yaw:      toDeg(euler.y),
        pitch:    toDeg(euler.x),
        roll:     toDeg(euler.z),
      });
    }
  });

  return null;
}

// ─── MAIN EXPORT ─────────────────────────────────────────────────────────────

export default function GezginSim({ onStats, onDocked, resetSignal }: GezginSimProps) {
  const posRef  = useRef(START_POS.clone());
  const quatRef = useRef(new THREE.Quaternion());
  const velRef  = useRef(new THREE.Vector3());
  const keysRef = useRef(new Set<string>());
  const [webglOk, setWebglOk] = useState(true);
  const [canvasKey, setCanvasKey] = useState(0);

  if (!webglOk) {
    return (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#060606" }}>
        <div style={{ textAlign: "center", color: "#fff" }}>
          <div style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: 8 }}>WebGL context lost</div>
          <div style={{ color: "rgba(255,255,255,0.65)", marginBottom: 12 }}>The browser lost the WebGL context. You can retry rendering the simulator.</div>
          <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
            <button
              onClick={() => {
                setWebglOk(true);
                setCanvasKey((k) => k + 1);
              }}
              style={{ padding: "8px 12px", borderRadius: 6, background: "#0ea5a4", color: "#021", border: "none", cursor: "pointer" }}
            >
              Retry Canvas
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Canvas
      key={canvasKey}
      camera={{ position: [0, 7, 50], fov: 55, near: 0.1, far: 600 }}
      style={{ width: "100%", height: "100%" }}
      gl={{ antialias: false, powerPreference: "default" }}
      onCreated={({ gl }) => {
        try {
          const canvasEl = (gl as any).domElement ?? (gl as any).canvas;
          if (canvasEl && canvasEl.addEventListener) {
            const FLAG = '__gezgin_listeners_installed_v1';
            if (!(canvasEl as any)[FLAG]) {
              const onLost = (ev: Event) => {
                // eslint-disable-next-line no-console
                console.warn('[GezginSim] webglcontextlost', ev);
                try { ev.preventDefault(); } catch (_) {}
                // update state to show fallback UI
                try { setWebglOk(false); } catch (_) {}
              };
              const onRestore = (ev: Event) => {
                // eslint-disable-next-line no-console
                console.info('[GezginSim] webglcontextrestored', ev);
                try { setWebglOk(true); } catch (_) {}
              };
              canvasEl.addEventListener('webglcontextlost', onLost, false);
              canvasEl.addEventListener('webglcontextrestored', onRestore, false);
              (canvasEl as any)[FLAG] = true;
            }
          }
        } catch (err) {
          // eslint-disable-next-line no-console
          console.error('[GezginSim] onCreated handler error', err);
        }
      }}
    >
      <color attach="background" args={["#0A0A0B"]} />

      <ambientLight intensity={0.38} />
      <directionalLight position={[55, 45, 30]} intensity={1.2} color="#fff8e8" />
      {/* Earth-reflected fill (lower intensity) */}
      <pointLight position={[-80, -50, -150]} color="#1a4a8c" intensity={1.5} distance={280} />

      {/* Stars disabled to reduce GPU usage in development; set count>0 to re-enable. */}
      <Stars radius={220} depth={55} count={0} factor={2} saturation={0} fade speed={0.3} />
      <Earth />
      <KutayStation />
      <GezginBody posRef={posRef} quatRef={quatRef} />

      <KeyListener keysRef={keysRef} />
      <Controller
        keysRef={keysRef}
        posRef={posRef}
        quatRef={quatRef}
        velRef={velRef}
        onStats={onStats}
        onDocked={onDocked}
        resetSignal={resetSignal}
      />
    </Canvas>
  );
}
