/* eslint-disable react/forbid-prop-types */
import { animated } from '@react-spring/three';
import { useFrame } from '@react-three/fiber';
import React from 'react';
import PropTypes from 'prop-types';
import { button, useControls } from 'leva';
import { getDiceRefs } from '../utilities';

const Dice = function ({

  diceShape,
  material,
  environment,
  animation,
}) {
  const [velocityOn, ref, api, geometry, symbols, walls] = getDiceRefs(diceShape);
  useControls('Dice', {
    Reset: button(() => {
      api.position.set(0, 0, 0);
      api.rotation.set(0, 0, 0);
      if (velocityOn.current) velocityOn.current = !velocityOn.current;
      api.velocity.set(0, 0, 0);
      api.mass.set(0);
      api.angularVelocity.set(0, 0, 0);
    }),
  });

  useFrame(() => {
    if (!velocityOn.current && animation.rotate) {
      api.angularVelocity.set(
        animation.axis.x,
        animation.axis.y,
        animation.axis.z,
      );
    }
    if (!velocityOn.current && !animation.rotate) {
      api.angularVelocity.set(0, 0, 0);
    }

    // eslint-disable-next-line no-unused-expressions
    !velocityOn.current && api.velocity.set(0, 0, 0);

    return null;
  });

  return (
    <group
      ref={ref}
      dispose={null}
      castShadow
      onClick={(e) => {
        if (!velocityOn.current) velocityOn.current = !velocityOn.current;
        api.mass.set(1);
        const x = Math.random() * (150 - -150) + -150;
        const y = Math.random() * (150 - -150) + -150;
        const z = Math.random() * (150 - -150) + -150;
        api.applyImpulse([x, y, z], [0, 0, 0]);

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
  diceShape: PropTypes.string.isRequired,
  material: PropTypes.object.isRequired,
  environment: PropTypes.object.isRequired,
  animation: PropTypes.object.isRequired,
};

export default Dice;
