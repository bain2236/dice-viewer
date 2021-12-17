import { animated } from '@react-spring/three';
import { useConvexPolyhedron } from '@react-three/cannon';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import toConvexProps from '../utilities';

const D10 = function ({ material, environment, animation }) {
  const { nodes } = useGLTF('/D10.glb');
  console.log(nodes);
  const geo = useMemo(() => toConvexProps(nodes.D10.geometry), [nodes]);
  const [ref] = useConvexPolyhedron(() => ({
    mass: 50, args: geo, rotation: [3, 3, 3],
  }));
  const { geometry } = nodes.D10;
  const symbols = nodes.D10symbols.geometry;
  const walls = nodes.D10walls.geometry;

  useFrame(() => {
    if (animation.rotate) {
      ref.current.rotation.x += animation.axis.x;
      ref.current.rotation.y += animation.axis.y;
      ref.current.rotation.z += animation.axis.z;
    }
    return null;
  });

  return (
    <group
      ref={ref}
      dispose={null}
      castShadow
    >
      <animated.mesh
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
      </animated.mesh>
      <animated.mesh
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
      </animated.mesh>
      <animated.mesh
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
      </animated.mesh>
    </group>
  );
};

D10.propTypes = {
  material: PropTypes.object.isRequired,
  environment: PropTypes.object.isRequired,
  animation: PropTypes.object.isRequired,
};

export default D10;
