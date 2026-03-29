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
