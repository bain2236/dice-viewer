/* eslint-disable react/forbid-prop-types */
import { animated } from '@react-spring/three';
import { useConvexPolyhedron } from '@react-three/cannon';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import React, { useEffect, useMemo, useRef } from 'react';
import PropTypes from 'prop-types';
import toConvexProps from '../utilities';

const D4 = function ({ material, environment, animation }) {
  const counter = React.useRef(0);
  console.log(counter.current++);
  const { nodes } = useGLTF('/d4.glb');
  console.log(nodes);
  const doZeroVelocity = useRef(true);
  const geo = useMemo(() => toConvexProps(nodes.D4.geometry), [nodes]);
  const r = useRef();
  const [ref, api] = useConvexPolyhedron(() => ({
    type: 'Dynamic', mass: 0, args: geo, rotation: [3, 3, 3],
  }));

  const { geometry } = nodes.D4;
  const symbols = nodes.D4symbols.geometry;
  const walls = nodes.D4walls.geometry;

  console.log('rendering D4');
  console.log(ref);

  useFrame(() => {
    if (animation.rotate) {
      api.rotation.set(
        ref.current.rotation.x + animation.axis.x,
        ref.current.rotation.y + animation.axis.y,
        ref.current.rotation.z + animation.axis.z,
      );
    //   ref.current.mass = 0;
    //   ref.current.rotation.x += animation.axis.x;
    //   ref.current.rotation.y += animation.axis.y;
    //   ref.current.rotation.z += animation.axis.z;
    //   ref.current.position.x = 0;
    //   ref.current.position.y = 0;
    //   ref.current.position.z = 0;
    }
    // eslint-disable-next-line no-unused-expressions
    doZeroVelocity.current && api.velocity.set(0, 0, 0);

    return null;
  });

  return (
    <group
      ref={ref}
      dispose={null}
      castShadow
      onClick={(e) => {
        doZeroVelocity.current = !doZeroVelocity.current;
        api.mass.set(50);

        e.stopPropagation();
      }}
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

D4.propTypes = {
  material: PropTypes.object.isRequired,
  environment: PropTypes.object.isRequired,
  animation: PropTypes.object.isRequired,
};

export default D4;
