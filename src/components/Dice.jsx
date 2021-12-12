/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import {
  useGLTF,
} from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

const Dice = function ({
  diceShape, material, environment, animation,
}) {
  let geometry;
  let symbols;
  let walls;
  // const [group] = useBox(() => ({ mass: 1, position: [0, 5, 0] }));
  const position = [0, 0, 0];
  const group = useRef();

  switch (diceShape) {
    case 'D4': {
      const { nodes } = useGLTF('/d4.glb');
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
      group.current.rotation.x += animation.axis.x;
      group.current.rotation.y += animation.axis.y;
      group.current.rotation.z += animation.axis.z;
    }
    return null;
  });

  return (
    <group ref={group} dispose={null}>
      <mesh
        castShadow
        geometry={geometry}
        position={position}
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
        />
      </mesh>
      <mesh
        castShadow
        geometry={symbols}
        position={position}
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
        />
      </mesh>
      <mesh
        castShadow
        geometry={walls}
        position={position}
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
