"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useLayoutEffect, useMemo, useRef } from "react";
import * as THREE from "three";

// GPU material colors (shader values, not CSS tokens).
const C_DIM = new THREE.Color("#1b2c31");
const C_MINT = new THREE.Color("#7FD1B9");
const C_HOT = new THREE.Color("#B9EFDC");

const REVEAL_RADIUS = 1.7;
const AMBIENT = 0.1; // resting brightness floor
const K_NEIGHBORS = 3;

interface Graph {
  positions: THREE.Vector3[];
  edges: [number, number][];
}

// Fibonacci-sphere node placement, slightly flattened on Z, then each node is
// linked to its K nearest neighbors — a procedural "process network".
function buildGraph(count: number): Graph {
  const positions: THREE.Vector3[] = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  const radius = 2.6;
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = golden * i;
    positions.push(
      new THREE.Vector3(
        Math.cos(theta) * r * radius,
        y * radius,
        Math.sin(theta) * r * radius * 0.55
      )
    );
  }

  const edgeSet = new Set<string>();
  const edges: [number, number][] = [];
  for (let i = 0; i < count; i++) {
    const dists = positions
      .map((p, j) => ({ j, d: positions[i].distanceTo(p) }))
      .filter((o) => o.j !== i)
      .sort((a, b) => a.d - b.d)
      .slice(0, K_NEIGHBORS);
    for (const { j } of dists) {
      const key = i < j ? `${i}-${j}` : `${j}-${i}`;
      if (!edgeSet.has(key)) {
        edgeSet.add(key);
        edges.push([i, j]);
      }
    }
  }
  return { positions, edges };
}

export function HeroScene({
  nodeCount,
  scrollRef,
  frozen = false,
}: {
  nodeCount: number;
  scrollRef: React.MutableRefObject<number>;
  frozen?: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const { size } = useThree();

  const graph = useMemo(() => buildGraph(nodeCount), [nodeCount]);

  // Reused scratch objects (never allocate inside useFrame).
  const scratch = useMemo(
    () => ({
      dummy: new THREE.Object3D(),
      pointer: new THREE.Vector3(),
      local: new THREE.Vector3(),
      color: new THREE.Color(),
      nodeColors: graph.positions.map(() => new THREE.Color()),
    }),
    [graph]
  );

  // Line geometry: two vertices per edge, per-vertex color for path lighting.
  const lineGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(graph.edges.length * 6);
    graph.edges.forEach(([a, b], i) => {
      pos.set(
        [
          graph.positions[a].x, graph.positions[a].y, graph.positions[a].z,
          graph.positions[b].x, graph.positions[b].y, graph.positions[b].z,
        ],
        i * 6
      );
    });
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    geo.setAttribute(
      "color",
      new THREE.BufferAttribute(new Float32Array(graph.edges.length * 6), 3)
    );
    return geo;
  }, [graph]);

  // Place instances + seed instanceColor once.
  useLayoutEffect(() => {
    const mesh = meshRef.current;
    if (!mesh) return;
    graph.positions.forEach((p, i) => {
      scratch.dummy.position.copy(p);
      scratch.dummy.updateMatrix();
      mesh.setMatrixAt(i, scratch.dummy.matrix);
      mesh.setColorAt(i, C_DIM);
    });
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  }, [graph, scratch]);

  useFrame((state, delta) => {
    const group = groupRef.current;
    const mesh = meshRef.current;
    const lines = linesRef.current;
    if (!group || !mesh || !lines) return;

    const scroll = frozen ? 0 : THREE.MathUtils.clamp(scrollRef.current, 0, 1);
    const dim = 1 - scroll * 0.7; // resolve to a calmer state as user scrolls away

    if (!frozen) {
      group.rotation.y += delta * 0.08 * (1 - scroll);
      group.rotation.x = THREE.MathUtils.lerp(group.rotation.x, scroll * 0.25, 0.05);
      group.position.y = THREE.MathUtils.lerp(group.position.y, scroll * 0.6, 0.05);
    }

    // Pointer → world plane at z=0, then into the rotating group's local space.
    const cam = state.camera as THREE.PerspectiveCamera;
    const halfH = Math.tan(THREE.MathUtils.degToRad(cam.fov / 2)) * cam.position.z;
    const halfW = halfH * (size.width / size.height);
    scratch.pointer.set(state.pointer.x * halfW, state.pointer.y * halfH, 0);
    group.updateMatrixWorld();
    scratch.local.copy(scratch.pointer);
    group.worldToLocal(scratch.local);

    // Per-node illumination (the single effect: reveal, nothing stacked on top).
    graph.positions.forEach((p, i) => {
      const d = frozen ? REVEAL_RADIUS : p.distanceTo(scratch.local);
      const reveal = frozen ? 0 : THREE.MathUtils.clamp(1 - d / REVEAL_RADIUS, 0, 1);
      const intensity = Math.max(AMBIENT, reveal) * dim;
      const col = scratch.nodeColors[i];
      col.copy(C_DIM).lerp(C_MINT, intensity);
      if (reveal > 0.8) col.lerp(C_HOT, (reveal - 0.8) * 4 * dim);
      mesh.setColorAt(i, col);
    });
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;

    // Connections light along their path from each endpoint's node color.
    const colorAttr = lineGeometry.getAttribute("color") as THREE.BufferAttribute;
    graph.edges.forEach(([a, b], i) => {
      const ca = scratch.nodeColors[a];
      const cb = scratch.nodeColors[b];
      colorAttr.setXYZ(i * 2, ca.r, ca.g, ca.b);
      colorAttr.setXYZ(i * 2 + 1, cb.r, cb.g, cb.b);
    });
    colorAttr.needsUpdate = true;
  });

  return (
    <group ref={groupRef}>
      <instancedMesh
        ref={meshRef}
        args={[undefined, undefined, graph.positions.length]}
      >
        <sphereGeometry args={[0.05, 12, 12]} />
        <meshBasicMaterial toneMapped={false} />
      </instancedMesh>
      <lineSegments ref={linesRef} geometry={lineGeometry}>
        <lineBasicMaterial
          vertexColors
          transparent
          opacity={0.85}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </lineSegments>
    </group>
  );
}
