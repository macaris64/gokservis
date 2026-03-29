export interface SimStats {
  phase: number;
  phaseName: string;
  distance: string;
  velocity: string;
  fuelPct: number;
}

export interface SimControls {
  playing: boolean;
  speed: number;
  cinematic: boolean;
  onTogglePlay: () => void;
  onSpeed: (s: number) => void;
  onToggleCinematic: () => void;
}

export interface GezginStats {
  distance: number;
  speed: number;
  docked: boolean;
  yaw: number;
  pitch: number;
  roll: number;
}
