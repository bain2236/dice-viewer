/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { useGLTF } from '@react-three/drei';

import PropTypes from 'prop-types';

const Tray = function ({ material }) {
  const { nodes } = useGLTF('/tray.glb');

  return (
    <group
      scale={3}
      dispose={null}
      position={[0, -52, 0]}
      castShadow
      receiveShadow
      onClick={(e) => console.log('touch the tray')}
    >
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.dice_traybase.geometry}
      >
        <meshPhysicalMaterial
          color={material.base}
          wireframe={material.wireframe}
          metalness={material.trayMetal}
        />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.dice_trayinner.geometry}
      >
        <meshPhysicalMaterial
          color={material.inner}
          wireframe={material.wireframe}
          metalness={material.trayMetal}
        />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.dice_traytrim.geometry}
      >
        <meshPhysicalMaterial
          color={material.trim}
          wireframe={material.wireframe}
          metalness={material.trayMetal}
        />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.dice_trayouter.geometry}
      >
        <meshPhysicalMaterial
          color={material.outer}
          wireframe={material.wireframe}
          metalness={material.trayMetal}
        />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.dice_trayunder.geometry}
      >
        <meshPhysicalMaterial
          color={material.under}
          wireframe={material.wireframe}
          metalness={material.trayMetal}
        />
      </mesh>

    </group>
  );
};

useGLTF.preload('/tray.glb');

Tray.propTypes = {
  material: PropTypes.object.isRequired,
};

export default Tray;
