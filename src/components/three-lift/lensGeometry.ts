import * as THREE from "three";

// A biconvex lens profile revolved into a disc, then reoriented so its
// optical axis faces the camera (+Z) instead of three.js's default +Y —
// a "thick, upright, gently convex glass disc," not a flat circle.
export function createLensGeometry(segments = 64): THREE.LatheGeometry {
  const rimRadius = 1;
  const halfThickness = 0.22;

  const profile = [
    new THREE.Vector2(0, -halfThickness),
    new THREE.Vector2(rimRadius * 0.45, -halfThickness * 0.82),
    new THREE.Vector2(rimRadius * 0.78, -halfThickness * 0.45),
    new THREE.Vector2(rimRadius * 0.95, -halfThickness * 0.12),
    new THREE.Vector2(rimRadius, 0),
    new THREE.Vector2(rimRadius * 0.95, halfThickness * 0.12),
    new THREE.Vector2(rimRadius * 0.78, halfThickness * 0.45),
    new THREE.Vector2(rimRadius * 0.45, halfThickness * 0.82),
    new THREE.Vector2(0, halfThickness),
  ];

  const geometry = new THREE.LatheGeometry(profile, segments);
  geometry.rotateX(Math.PI / 2);
  return geometry;
}

// A thin torus sitting exactly at the lens equator — the restrained cobalt
// edge treatment that reads as a beveled rim rather than a flat badge.
export function createRimGeometry(segments = 64): THREE.TorusGeometry {
  return new THREE.TorusGeometry(1, 0.035, 10, segments);
}
