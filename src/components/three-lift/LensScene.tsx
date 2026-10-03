"use client";

import { forwardRef, useEffect, useImperativeHandle, useMemo, useRef, useState } from "react";
import { Canvas, useThree, invalidate } from "@react-three/fiber";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { createLensGeometry, createRimGeometry } from "./lensGeometry";
import { createSharpIconTexture, createBlurredIconTexture } from "./iconTexture";
import { ACCENT, INK } from "./colors";

// Every field is the live ref object itself (not a `.current` snapshot) —
// IconPlane remounts its mesh when a texture finishes loading (see below),
// so a snapshot taken once via onReady would end up pointing at a detached,
// pre-texture mesh. Reading `.current` at the moment of use always reflects
// whichever mesh instance is actually on screen.
export type LensSceneObjects = {
  stage: React.RefObject<THREE.Group | null>;
  lens: React.RefObject<THREE.Mesh | null>;
  rim: React.RefObject<THREE.Mesh | null>;
  highlight: React.RefObject<THREE.Mesh | null>;
  sharpIcon: React.RefObject<THREE.Mesh | null>;
  blurredIcon: React.RefObject<THREE.Mesh | null>;
  floorGlow: React.RefObject<THREE.Mesh | null>;
};

function EnvironmentSetup() {
  const { gl, scene } = useThree();
  useEffect(() => {
    const pmrem = new THREE.PMREMGenerator(gl);
    const envScene = new RoomEnvironment();
    const renderTarget = pmrem.fromScene(envScene, 0.04);
    // Mutating the THREE.Scene instance (not React state) is the standard
    // R3F pattern for setting an environment map.
    // eslint-disable-next-line react-hooks/immutability
    scene.environment = renderTarget.texture;
    invalidate();
    return () => {
      renderTarget.dispose();
      pmrem.dispose();
      scene.environment = null;
    };
  }, [gl, scene]);
  return null;
}

function IconPlane({
  loader,
  size,
  meshRef,
  circular,
  opacity = 1,
  position,
}: {
  loader: () => Promise<THREE.CanvasTexture>;
  size: number;
  meshRef: React.Ref<THREE.Mesh>;
  circular?: boolean;
  opacity?: number;
  position?: [number, number, number];
}) {
  const [texture, setTexture] = useState<THREE.CanvasTexture | null>(null);

  useEffect(() => {
    let cancelled = false;
    loader().then((t) => {
      if (!cancelled) setTexture(t);
    });
    return () => {
      cancelled = true;
    };
  }, [loader]);

  useEffect(() => {
    if (texture) invalidate();
  }, [texture]);

  // A texture assigned after the mesh's first mount (the normal case here,
  // since it loads asynchronously) does not reliably reach the GPU just by
  // updating the material's `map` prop in place — confirmed by isolating
  // this down to a minimal repro outside this app. Remounting the mesh once
  // the real texture is ready (key flips "pending" -> "loaded") forces a
  // fresh material/texture binding and reliably shows the content.
  return (
    <mesh ref={meshRef} position={position} key={texture ? "loaded" : "pending"}>
      {circular ? <circleGeometry args={[size / 2, 48]} /> : <planeGeometry args={[size, size]} />}
      <meshBasicMaterial map={texture} transparent toneMapped={false} opacity={texture ? opacity : 0} />
    </mesh>
  );
}

const Scene = forwardRef<
  LensSceneObjects,
  { tier: "mobile" | "tablet" | "desktop"; onReady?: (objects: LensSceneObjects) => void }
>(function Scene({ tier, onReady }, ref) {
  const stageRef = useRef<THREE.Group>(null);
  const lensRef = useRef<THREE.Mesh>(null);
  const rimRef = useRef<THREE.Mesh>(null);
  const highlightRef = useRef<THREE.Mesh>(null);
  const sharpIconRef = useRef<THREE.Mesh>(null);
  const blurredIconRef = useRef<THREE.Mesh>(null);
  const floorGlowRef = useRef<THREE.Mesh>(null);

  const objects: LensSceneObjects = {
    stage: stageRef,
    lens: lensRef,
    rim: rimRef,
    highlight: highlightRef,
    sharpIcon: sharpIconRef,
    blurredIcon: blurredIconRef,
    floorGlow: floorGlowRef,
  };

  useImperativeHandle(ref, () => objects);

  // Runs inside the R3F reconciler's own commit, once the meshes below have
  // really mounted — an effect outside <Canvas> can fire before R3F
  // finishes its (asynchronous) first mount, missing the refs entirely.
  useEffect(() => {
    onReady?.(objects);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const lensGeometry = useMemo(() => createLensGeometry(tier === "mobile" ? 32 : 56), [tier]);
  const rimGeometry = useMemo(() => createRimGeometry(tier === "mobile" ? 32 : 56), [tier]);

  useEffect(
    () => () => {
      lensGeometry.dispose();
      rimGeometry.dispose();
    },
    [lensGeometry, rimGeometry]
  );

  return (
    <>
      <EnvironmentSetup />
      <ambientLight intensity={0.55} />
      <directionalLight position={[2.2, 3, 2.4]} intensity={1.1} color="#fff8ef" />
      <directionalLight position={[-2, 0.6, -1.4]} intensity={0.3} color={ACCENT} />

      {/* Floor: soft grounding shadow + restrained cobalt light impression —
          an authored gradient texture, not live caustics. */}
      <mesh ref={floorGlowRef} position={[0, -1.15, -0.1]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.6, 48]} />
        <meshBasicMaterial color={ACCENT} transparent opacity={0.1} />
      </mesh>
      <mesh position={[0, -1.16, -0.05]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.9, 48]} />
        <meshBasicMaterial color={INK} transparent opacity={0.16} />
      </mesh>

      {/* Oversized, softly blurred icon sitting behind the lens. */}
      <IconPlane
        loader={createBlurredIconTexture}
        size={2.6}
        meshRef={blurredIconRef}
        opacity={0.8}
      />

      {/* The lens group — pointer tilt and the settle entrance act on this
          as a whole; its children never fight that transform. */}
      <group ref={stageRef} position={[0, 0, 0.55]}>
        {/* Sharp icon, sized to the lens footprint, sitting just behind the
            glass so it reads through it — this is what "brings the icon
            into focus" through the lens. The lens solid spans local z
            [-0.22, 0.22]; this sits just past its back surface, not
            embedded inside the glass volume. */}
        <IconPlane
          loader={createSharpIconTexture}
          size={1.5}
          meshRef={sharpIconRef}
          circular
          position={[0, 0, -0.3]}
        />

        <mesh ref={lensRef} geometry={lensGeometry}>
          {/* Real `transmission` samples a separate background render that,
              against this scene's bright authored lighting, blew out to
              solid white and erased whatever's behind it — simple alpha
              blending reads as convincing glass here without that risk.
              `depthWrite={false}` is required: a transparent material still
              writes depth by default, which silently occludes anything
              positioned behind it regardless of its alpha. */}
          <meshPhysicalMaterial
            color="#eef3ff"
            roughness={0.15}
            metalness={0}
            transmission={0}
            opacity={0.22}
            transparent
            depthWrite={false}
            thickness={0.5}
            ior={1.45}
            clearcoat={0.15}
            clearcoatRoughness={0.2}
            attenuationColor={ACCENT}
            attenuationDistance={1.4}
          />
        </mesh>

        <mesh ref={rimRef} geometry={rimGeometry}>
          <meshPhysicalMaterial
            color={ACCENT}
            roughness={0.2}
            metalness={0.1}
            clearcoat={0.5}
            clearcoatRoughness={0.15}
            depthWrite={false}
          />
        </mesh>

        {/* Restrained highlight — settles in as part of the entrance. */}
        <mesh ref={highlightRef} position={[-0.32, 0.38, 0.18]} rotation={[0, 0, 0.6]}>
          <planeGeometry args={[0.1, 0.42]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0} toneMapped={false} depthWrite={false} />
        </mesh>
      </group>
    </>
  );
});

type LensCanvasProps = {
  tier: "mobile" | "tablet" | "desktop";
  onReady?: (objects: LensSceneObjects) => void;
};

// Demand-only: never free-runs. Every frame is requested explicitly by the
// settle timeline, pointer handlers or scroll-exit tween calling
// `invalidate()`; it sits fully idle once nothing is animating.
export default function LensCanvas({ tier, onReady }: LensCanvasProps) {
  const dpr: [number, number] = tier === "desktop" ? [1, 1.5] : [1, 1];

  return (
    <Canvas
      dpr={dpr}
      gl={{ antialias: tier !== "mobile", alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, 3.6], fov: 30 }}
      frameloop="demand"
      style={{ width: "100%", height: "100%" }}
    >
      <Scene tier={tier} onReady={onReady} />
    </Canvas>
  );
}
