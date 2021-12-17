/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useMemo, useRef } from 'react';
import PropTypes from 'prop-types';
import {
  useGLTF,
} from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useBox, useConvexPolyhedron, useSphere } from '@react-three/cannon';
import { Geometry } from 'three-stdlib';

const Dice = function ({
  diceShape, material, environment, animation,
}) {
  let geometry;
  let symbols;
  let walls;
  let diceGroupRef;
  // const [group] = useBox(() => ({ mass: 1, position: [0, 5, 0] }));
  // const position = [0, 20, 0];
  // const diceGroupRef = useRef();
  // const [diceGroupRef] = useBox(() => ({
  //   mass: 5, position: [0, 40, 0], rotation: [0, 0, 0], args: [8, 8, 8],
  // }));

  /**
 * Returns legacy geometry vertices, faces for ConvP
 * @param {THREE.BufferGeometry} bufferGeometry
 */
  function toConvexProps(bufferGeometry) {
    const geo = new Geometry().fromBufferGeometry(bufferGeometry);
    // Merge duplicate vertices resulting from glTF export.
    // Cannon assumes contiguous, closed meshes to work
    geo.mergeVertices();
    return [geo.vertices.map((v) => [v.x, v.y, v.z]),
      geo.faces.map((f) => [f.a, f.b, f.c]), []]; // prettier-ignore
  }

  switch (diceShape) {
    case 'D4': {
      const { nodes } = useGLTF('/d4.glb');
      const geo = useMemo(() => toConvexProps(nodes[diceShape].geometry), [nodes]);
      [diceGroupRef] = useConvexPolyhedron(() => ({ mass: 5, args: geo }));

      geometry = nodes[diceShape].geometry;
      symbols = nodes[`${diceShape}symbols`].geometry;
      walls = nodes[`${diceShape}walls`].geometry;
    }
      break;
    case 'D6': {
      const { nodes } = useGLTF('/d6.glb');
      geometry = nodes[diceShape].geometry;
      symbols = nodes[`${diceShape}symbols`].geometry;
      walls = nodes[`${diceShape}walls`].geometry;
    }
      break;
    case 'D8': {
      const { nodes } = useGLTF('/d8.glb');
      geometry = nodes[diceShape].geometry;
      symbols = nodes[`${diceShape}symbols`].geometry;
      walls = nodes[`${diceShape}walls`].geometry;
    }
      break;
    case 'D10': {
      const { nodes } = useGLTF('/d10.glb');
      geometry = nodes[diceShape].geometry;
      symbols = nodes[`${diceShape}symbols`].geometry;
      walls = nodes[`${diceShape}walls`].geometry;
    }
      break;
    case 'D12': {
      const { nodes } = useGLTF('/d12.glb');
      geometry = nodes[diceShape].geometry;
      symbols = nodes[`${diceShape}symbols`].geometry;
      walls = nodes[`${diceShape}walls`].geometry;
    }
      break;
    case 'D20': {
      const { nodes } = useGLTF('/d20.glb');
      geometry = nodes[diceShape].geometry;
      symbols = nodes[`${diceShape}symbols`].geometry;
      walls = nodes[`${diceShape}walls`].geometry;
    }
      break;
    case 'D100': {
      const { nodes } = useGLTF('/d100.glb');
      geometry = nodes[diceShape].geometry;
      symbols = nodes[`${diceShape}symbols`].geometry;
      walls = nodes[`${diceShape}walls`].geometry;
    }
      break;

    default:
      break;
  }

  useFrame(() => {
    if (animation.rotate) {
      diceGroupRef.current.rotation.x += animation.axis.x;
      diceGroupRef.current.rotation.y += animation.axis.y;
      diceGroupRef.current.rotation.z += animation.axis.z;
    }
    return null;
  });

  return (
    <group
      ref={diceGroupRef}
      dispose={null}
      castShadow
      onClick={(e) => {
        console.log('touch the dice');
        e.stopPropagation();
      }}
    >
      <mesh
        castShadow
        geometry={geometry}
      >
        <meshPhysicalMaterial
          background={environment.enabled}
          thickness={environment.enabled ? environment.thickness : null}
          roughness={environment.enabled ? environment.roughness : null}
          clearcoat={environment.enabled ? environment.clearcoat : null}
          clearcoatRoughness={environment.enabled ? environment.clearcoatRoughness : null}
          transmission={environment.enabled ? environment.transmission : null}
          ior={environment.enabled ? environment.ior : null}
          attenuationTint={environment.enabled ? environment.attenuationTint : null}
          attenuationDistance={environment.enabled ? environment.attenuationDistance : null}
          color={material.color}
          wireframe={material.wireframe}
          metalness={material.metal}
        />
      </mesh>
      <mesh
        castShadow
        geometry={symbols}
      >
        <meshPhysicalMaterial
          wireframe={material.wireframe}
          background={environment.enabled}
          thickness={environment.enabled ? environment.thickness : null}
          roughness={environment.enabled ? environment.roughness : null}
          clearcoat={environment.enabled ? environment.clearcoat : null}
          clearcoatRoughness={environment.enabled ? environment.clearcoatRoughness : null}
          transmission={environment.enabled ? environment.transmission : null}
          ior={environment.enabled ? environment.ior : null}
          attenuationTint={environment.enabled ? environment.attenuationTint : null}
          attenuationDistance={environment.enabled ? environment.attenuationDistance : null}
          color={material.numberColor}
          metalness={material.metal}
        />
      </mesh>
      <mesh
        castShadow
        geometry={walls}
      >
        <meshPhysicalMaterial
          wireframe={material.wireframe}
          background={environment.enabled}
          thickness={environment.enabled ? environment.thickness : null}
          roughness={environment.enabled ? environment.roughness : null}
          clearcoat={environment.enabled ? environment.clearcoat : null}
          clearcoatRoughness={environment.enabled ? environment.clearcoatRoughness : null}
          transmission={environment.enabled ? environment.transmission : null}
          ior={environment.enabled ? environment.ior : null}
          attenuationTint={environment.enabled ? environment.attenuationTint : null}
          attenuationDistance={environment.enabled ? environment.attenuationDistance : null}
          color={material.wallColor}
          metalness={material.metal}
        />
      </mesh>
    </group>
  );
};

useGLTF.preload('/d4.glb');
useGLTF.preload('/d6.glb');
useGLTF.preload('/d10.glb');
useGLTF.preload('/d8.glb');
useGLTF.preload('/d12.glb');
useGLTF.preload('/d20.glb');
useGLTF.preload('/d100.glb');

Dice.propTypes = {
  diceShape: PropTypes.object.isRequired,
  material: PropTypes.object.isRequired,
  environment: PropTypes.object.isRequired,
  animation: PropTypes.object.isRequired,
};

export default Dice;
