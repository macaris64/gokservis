"use client";

import { useRef, useEffect, MutableRefObject } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Stars, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import type { SimStats } from "./types";

// ─── CONSTANTS ────────────────────────────────────────────────────────────────

/** Duration of each phase in seconds (at speed=1) */
const PHASE_DURATIONS = [3, 8, 6, 4, 6];
const PHASE_NAMES = ["Hazırlık", "İntikal", "Yanaşma", "Kenetlenme", "Yakıt Transferi"];

/**
 * GEZGİN Z position at start of each phase.
 * Index i = start of phase i; index 5 = end of phase 4.
 * KUTAY front dock port is at z = 7.2.
 * GEZGİN is considered "docked" when center z = 10.2 (UPA tip reaches 7.2).
 */
const GZ_WP = [65, 65, 22, 13, 10.2, 10.2];

/** Camera positions [x,y,z] per phase, looking at world origin */
const CAM_POS: Array<[number, number, number]> = [
  [30, 12, 56],
  [22, 8, 42],
  [14, 5, 26],
  [8, 3, 22],
  [18, 6, 14],
];

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function easeInOut(t: number) {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

function lerpN(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

interface SimRef {
  phase: number;
  t: number;
  gezginZ: number;
}

// ─── KUTAY STATION ────────────────────────────────────────────────────────────

function KutayStation() {
  const ref = useRef<THREE.Group>(null!);

  useFrame((_, dt) => {
    ref.current.rotation.z += dt * 0.018; // spin around long axis — dock port stays facing +Z
  });

  return (
    <group ref={ref}>
      {/* Main hub body */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[6, 6, 12]} />
        <meshStandardMaterial
          color="#11112a"
          metalness={0.85}
          roughness={0.2}
          emissive="#00F5FF"
          emissiveIntensity={0.06}
        />
      </mesh>

      {/* Solar panel left strut */}
      <mesh position={[-7, 0, -1]}>
        <boxGeometry args={[8, 0.25, 0.25]} />
        <meshStandardMaterial color="#2a2a44" metalness={0.9} roughness={0.1} />
      </mesh>
      {/* Solar panel right strut */}
      <mesh position={[7, 0, -1]}>
        <boxGeometry args={[8, 0.25, 0.25]} />
        <meshStandardMaterial color="#2a2a44" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Solar panels */}
      {([-9, 9] as number[]).map((x) => (
        <mesh key={x} position={[x, 0, -1]}>
          <boxGeometry args={[6, 0.08, 3.5]} />
          <meshStandardMaterial
            color="#0a1530"
            emissive="#004488"
            emissiveIntensity={0.4}
            metalness={0.6}
            roughness={0.35}
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

      {/* Front docking port (toward +Z) */}
      <mesh position={[0, 0, 6.6]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.6, 0.6, 1.2, 24]} />
        <meshStandardMaterial
          color="#002a2a"
          metalness={0.95}
          roughness={0.05}
          emissive="#00F5FF"
          emissiveIntensity={0.8}
        />
      </mesh>

      {/* Dock port alignment ring */}
      <mesh position={[0, 0, 7.25]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.78, 0.07, 12, 36]} />
        <meshStandardMaterial color="#00F5FF" emissive="#00F5FF" emissiveIntensity={2.5} />
      </mesh>

      {/* Secondary dock ports (sides) */}
      {[
        { p: [0, 3.6, 1] as [number, number, number], r: [0, 0, 0] as [number, number, number] },
        { p: [0, -3.6, 1] as [number, number, number], r: [Math.PI, 0, 0] as [number, number, number] },
        { p: [3.6, 0, 1] as [number, number, number], r: [0, 0, Math.PI / 2] as [number, number, number] },
        { p: [-3.6, 0, 1] as [number, number, number], r: [0, 0, -Math.PI / 2] as [number, number, number] },
      ].map(({ p, r }, i) => (
        <mesh key={i} position={p} rotation={r}>
          <cylinderGeometry args={[0.35, 0.35, 0.8, 12]} />
          <meshStandardMaterial
            color="#002020"
            emissive="#00F5FF"
            emissiveIntensity={0.3}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
      ))}

      {/* Ameliyathane module (bump on one side) */}
      <mesh position={[0, -3.5, -1.5]}>
        <boxGeometry args={[3, 1, 4]} />
        <meshStandardMaterial color="#0e0e22" metalness={0.7} roughness={0.4} emissive="#8B5CF6" emissiveIntensity={0.08} />
      </mesh>

      {/* Station ambient glow */}
      <pointLight color="#00F5FF" intensity={3.5} distance={22} decay={2} />
    </group>
  );
}

// ─── GEZGİN TUG ──────────────────────────────────────────────────────────────

function GezginTug({ simRef }: { simRef: MutableRefObject<SimRef> }) {
  const group = useRef<THREE.Group>(null!);
  const upa = useRef<THREE.Mesh>(null!);
  const chemLight = useRef<THREE.PointLight>(null!);
  const rcsLight = useRef<THREE.PointLight>(null!);

  useFrame((state) => {
    group.current.position.z = simRef.current.gezginZ;

    const phase = simRef.current.phase;
    const t = simRef.current.t;
    const elapsed = state.clock.elapsedTime;

    // UPA extension starts in phase 3
    if (upa.current) {
      const target = phase >= 3 ? 1.55 : 1;
      upa.current.scale.z = THREE.MathUtils.lerp(upa.current.scale.z, target, 0.04);
    }

    // Chemical thruster — phase 1
    if (chemLight.current) {
      const target = phase === 1 ? 14 + Math.sin(elapsed * 22) * 4 : 0;
      chemLight.current.intensity = THREE.MathUtils.lerp(chemLight.current.intensity, target, 0.12);
    }

    // RCS cold gas — phases 2 & 3
    if (rcsLight.current) {
      const active = phase === 2 || phase === 3;
      const target = active ? 4 + Math.sin(elapsed * 9 + t * 6) * 2 : 0;
      rcsLight.current.intensity = THREE.MathUtils.lerp(rcsLight.current.intensity, target, 0.1);
    }
  });

  return (
    <group ref={group} position={[0, 0, 65]}>
      {/* Main body */}
      <mesh castShadow>
        <boxGeometry args={[2, 2, 3]} />
        <meshStandardMaterial
          color="#1a0a04"
          metalness={0.75}
          roughness={0.25}
          emissive="#FF4500"
          emissiveIntensity={0.1}
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

      {/* UPA docking head (front = -Z direction toward KUTAY) */}
      <mesh ref={upa} position={[0, 0, -2.25]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.2, 0.32, 1.5, 16]} />
        <meshStandardMaterial
          color="#200a00"
          metalness={0.95}
          roughness={0.05}
          emissive="#FF4500"
          emissiveIntensity={0.65}
        />
      </mesh>

      {/* UPA tip ring */}
      <mesh position={[0, 0, -3.02]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.24, 0.045, 8, 18]} />
        <meshStandardMaterial color="#FF4500" emissive="#FF4500" emissiveIntensity={2} />
      </mesh>

      {/* RCS thruster nozzles — 8 corners */}
      {[
        [-0.85, 0.85, -1.2], [0.85, 0.85, -1.2],
        [-0.85, -0.85, -1.2], [0.85, -0.85, -1.2],
        [-0.85, 0.85, 1.2], [0.85, 0.85, 1.2],
        [-0.85, -0.85, 1.2], [0.85, -0.85, 1.2],
      ].map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]}>
          <cylinderGeometry args={[0.065, 0.1, 0.2, 8]} />
          <meshStandardMaterial color="#333" metalness={1} roughness={0.1} />
        </mesh>
      ))}

      {/* Chemical thruster cone (rear = +Z face) */}
      <mesh position={[0, 0, 1.75]} rotation={[Math.PI / 2, 0, 0]}>
        <coneGeometry args={[0.42, 0.65, 16]} />
        <meshStandardMaterial color="#1a0800" emissive="#FF5511" emissiveIntensity={0.5} metalness={0.8} roughness={0.15} />
      </mesh>

      {/* Chemical thruster glow light (rear) */}
      <pointLight ref={chemLight} position={[0, 0, 2.6]} color="#FF5500" intensity={0} distance={22} decay={2} />
      {/* RCS glow light */}
      <pointLight ref={rcsLight} position={[0, 0, 0]} color="#88CCFF" intensity={0} distance={12} decay={2} />
      {/* Body ambient glow */}
      <pointLight color="#FF4500" intensity={1.2} distance={9} decay={2} />
    </group>
  );
}

// ─── FUEL PARTICLES ───────────────────────────────────────────────────────────

const PARTICLE_COUNT = 80;

function FuelParticles({ simRef }: { simRef: MutableRefObject<SimRef> }) {
  const pointsRef = useRef<THREE.Points>(null!);
  const geomRef = useRef<THREE.BufferGeometry>(null!);
  const posArr = useRef(new Float32Array(PARTICLE_COUNT * 3));
  const lifetimes = useRef(
    Array.from({ length: PARTICLE_COUNT }, (_, i) => i / PARTICLE_COUNT)
  );

  useEffect(() => {
    const attr = new THREE.BufferAttribute(posArr.current, 3);
    geomRef.current.setAttribute("position", attr);
  }, []);

  useFrame((_, dt) => {
    if (!pointsRef.current || !geomRef.current) return;
    const phase = simRef.current.phase;
    pointsRef.current.visible = phase === 4;
    if (phase !== 4) return;

    const gz = simRef.current.gezginZ;
    const attr = geomRef.current.getAttribute("position") as THREE.BufferAttribute;
    if (!attr) return;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      lifetimes.current[i] += dt * 0.28;
      if (lifetimes.current[i] > 1) lifetimes.current[i] = 0;
      const t = lifetimes.current[i];
      // Stream from KUTAY dock (0,0,7.2) to GEZGİN fuel port (~gz - 1)
      attr.array[i * 3] = lerpN(0, 0, t) + (Math.random() - 0.5) * 0.35;
      attr.array[i * 3 + 1] = lerpN(0, 0, t) + (Math.random() - 0.5) * 0.35;
      attr.array[i * 3 + 2] = lerpN(7.2, gz - 1, t);
    }
    attr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef} visible={false}>
      <bufferGeometry ref={geomRef} />
      <pointsMaterial
        color="#00F5FF"
        size={0.18}
        transparent
        opacity={0.85}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

// ─── DOCKING FLASH ────────────────────────────────────────────────────────────

function DockingFlash({ simRef }: { simRef: MutableRefObject<SimRef> }) {
  const lightRef = useRef<THREE.PointLight>(null!);

  useFrame(() => {
    const phase = simRef.current.phase;
    const t = simRef.current.t;
    let intensity = 0;
    // Flash as phase 3 completes (t > 0.88) and phase 4 starts (t < 0.12)
    if (phase === 3 && t > 0.88) intensity = ((t - 0.88) / 0.12) * 28;
    if (phase === 4 && t < 0.12) intensity = ((0.12 - t) / 0.12) * 28;
    lightRef.current.intensity = THREE.MathUtils.lerp(lightRef.current.intensity, intensity, 0.18);
  });

  return (
    <pointLight ref={lightRef} position={[0, 0, 7.2]} color="#00F5FF" intensity={0} distance={18} decay={2} />
  );
}

// ─── SCENE CONTROLLER ─────────────────────────────────────────────────────────

interface ControllerProps {
  playing: boolean;
  speed: number;
  simRef: MutableRefObject<SimRef>;
  onUpdate: (stats: SimStats) => void;
}

function SceneController({ playing, speed, simRef, onUpdate }: ControllerProps) {
  const uiThrottle = useRef(0);

  useFrame((_, dt) => {
    if (!playing) return;

    const phase = simRef.current.phase;
    simRef.current.t += (dt * speed) / PHASE_DURATIONS[phase];

    if (simRef.current.t >= 1) {
      simRef.current.t = 0;
      simRef.current.phase = (phase + 1) % PHASE_DURATIONS.length;
    }

    const p = simRef.current.phase;
    const t = simRef.current.t;
    const et = easeInOut(t);

    // Update GEZGİN position
    const startZ = GZ_WP[p];
    const endZ = GZ_WP[p + 1] ?? startZ;
    simRef.current.gezginZ = lerpN(startZ, endZ, et);

    // Throttle React state updates to ~12 fps
    uiThrottle.current += dt;
    if (uiThrottle.current < 0.083) return;
    uiThrottle.current = 0;

    const dist = Math.max(0, simRef.current.gezginZ - 7.2);
    let vel = 0;
    if (p === 1) vel = t < 0.55 ? lerpN(0, 185, t / 0.55) : lerpN(185, 32, (t - 0.55) / 0.45);
    else if (p === 2) vel = lerpN(32, 6, t);
    else if (p === 3) vel = lerpN(6, 0.3, t);

    onUpdate({
      phase: p,
      phaseName: PHASE_NAMES[p],
      distance: dist.toFixed(1),
      velocity: vel.toFixed(1),
      fuelPct: p === 4 ? Math.min(100, Math.round(t * 100)) : p > 4 ? 100 : 0,
    });
  });

  return null;
}

// ─── CINEMATIC CAMERA ─────────────────────────────────────────────────────────

function CinematicCamera({ simRef }: { simRef: MutableRefObject<SimRef> }) {
  const { camera } = useThree();

  useFrame(() => {
    const phase = simRef.current.phase;
    const t = simRef.current.t;
    const [tx, ty, tz] = CAM_POS[phase];

    // Blend into next phase camera over last 25% of current phase
    const nextPhase = (phase + 1) % CAM_POS.length;
    const [nx, ny, nz] = CAM_POS[nextPhase];
    const blend = t > 0.75 ? ((t - 0.75) / 0.25) * 0.04 : 0;

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, tx + (nx - tx) * blend * 6, 0.022);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, ty + (ny - ty) * blend * 6, 0.022);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, tz + (nz - tz) * blend * 6, 0.022);
    camera.lookAt(0, 0, simRef.current.gezginZ * 0.25); // look between origin and GEZGİN
  });

  return null;
}

// ─── EARTH ────────────────────────────────────────────────────────────────────

function Earth() {
  return (
    <mesh position={[-65, -45, -130]}>
      <sphereGeometry args={[60, 40, 40]} />
      <meshStandardMaterial
        color="#1a3a5c"
        emissive="#0a1a2e"
        emissiveIntensity={0.45}
        metalness={0}
        roughness={0.85}
      />
    </mesh>
  );
}

// ─── MAIN EXPORT ─────────────────────────────────────────────────────────────

export interface DockingSceneProps {
  playing: boolean;
  speed: number;
  cinematic: boolean;
  onUpdate: (stats: SimStats) => void;
}

export default function DockingScene({ playing, speed, cinematic, onUpdate }: DockingSceneProps) {
  const simRef = useRef<SimRef>({ phase: 0, t: 0, gezginZ: 65 });

  return (
    <Canvas
      camera={{ position: [30, 12, 56], fov: 55, near: 0.1, far: 600 }}
      style={{ width: "100%", height: "100%" }}
      shadows
    >
      <color attach="background" args={["#0A0A0B"]} />

      {/* Lighting */}
      <ambientLight intensity={0.38} />
      <directionalLight
        position={[55, 45, 30]}
        intensity={2.2}
        color="#fff8e8"
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      {/* Earth-reflected fill */}
      <pointLight position={[-80, -50, -150]} color="#1a4a8c" intensity={4} distance={280} />

      {/* Background */}
      <Stars radius={220} depth={55} count={6500} factor={4} saturation={0} fade speed={0.4} />
      <Earth />

      {/* Spacecraft */}
      <KutayStation />
      <GezginTug simRef={simRef} />

      {/* Effects */}
      <FuelParticles simRef={simRef} />
      <DockingFlash simRef={simRef} />

      {/* Animation brain */}
      <SceneController playing={playing} speed={speed} simRef={simRef} onUpdate={onUpdate} />

      {/* Camera */}
      {cinematic ? (
        <CinematicCamera simRef={simRef} />
      ) : (
        <OrbitControls
          enableDamping
          dampingFactor={0.06}
          target={[0, 0, 8]}
          minDistance={5}
          maxDistance={120}
        />
      )}
    </Canvas>
  );
}
