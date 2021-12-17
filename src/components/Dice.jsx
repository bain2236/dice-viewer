/* eslint-disable react/forbid-prop-types */
import { animated } from '@react-spring/three';
import { useConvexPolyhedron } from '@react-three/cannon';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import React, { useEffect, useMemo, useRef } from 'react';
import PropTypes from 'prop-types';
import { button, useControls } from 'leva';
import { EditOffRounded } from '@mui/icons-material';
import toConvexProps, { getDiceRefs } from '../utilities';

const Dice = function ({
  diceShape, material, environment, animation,
}) {
  const [doZeroVelocity, ref, api, geometry, symbols, walls] = getDiceRefs(diceShape);

  useControls('Dice', {
    Reset: button(() => {
      api.position.set(0, 0, 0);
      api.rotation.set(0, 0, 0);
      doZeroVelocity.current = true;
      api.velocity.set(0, 0, 0);
      api.mass.set(0);
    }),
  });

  useFrame(() => {
    if (doZeroVelocity && animation.rotate) {
      console.log(ref);
      api.rotation.set(
        animation.axis.x,
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

Dice.propTypes = {
  material: PropTypes.object.isRequired,
  environment: PropTypes.object.isRequired,
  animation: PropTypes.object.isRequired,
};

export default Dice;
