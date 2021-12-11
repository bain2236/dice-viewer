/* eslint-disable react/jsx-props-no-spreading */
import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import {
  useGLTF,
} from '@react-three/drei';
import { animated } from '@react-spring/three';
import { useFrame } from '@react-three/fiber';

const Dice = function ({ type, material }) {
  let geometry;
  let symbols;
  let position;
  const ref = useRef();
  const group = useRef();
  // const [ref] = useBox(() => ({
  //   mass: 1, position: [0, 10, 0], rotation: [1, 3, 5], scale: 2,
  // }));
  switch (type) {
    case 'D4': {
      const { nodes } = useGLTF('/d4.glb');
      geometry = nodes[type].geometry;
      symbols = nodes[`${type}symbols`].geometry;
      position = [0, 0, 0];
    }
      break;
    case 'D6': {
      const { nodes } = useGLTF('/d6.glb');
      geometry = nodes[type].geometry;
      symbols = nodes[`${type}symbols`].geometry;
      position = [0, 0, 0];
    }
      break;
    case 'D8': {
      const { nodes } = useGLTF('/d8.glb');
      geometry = nodes[type].geometry;
      symbols = nodes[`${type}symbols`].geometry;
      position = [0, 0, 0];
    }
      break;
    case 'D10': {
      const { nodes } = useGLTF('/d10.glb');
      geometry = nodes[type].geometry;
      symbols = nodes[`${type}symbols`].geometry;
      position = [2.52, -1.15, -24.46];
    }
      break;
    case 'D12': {
      const { nodes } = useGLTF('/d12.glb');
      geometry = nodes[type].geometry;
      symbols = nodes[`${type}symbols`].geometry;
      position = [0, 0, 0];
    }
      break;
    case 'D20': {
      const { nodes } = useGLTF('/d20.glb');
      geometry = nodes[type].geometry;
      symbols = nodes[`${type}symbols`].geometry;
      position = [0, 0, 0];
    }
      break;
    case 'D100': {
      const { nodes } = useGLTF('/d100.glb');
      geometry = nodes[type].geometry;
      symbols = nodes[`${type}symbols`].geometry;
      position = [0, 0, 0];
    }
      break;

    default:
      break;
  }

  useFrame(() => {
    if (material.rotate) {
      // group.current.rotation.x += 0.02;
      group.current.rotation.y += 0.01;
      // group.current.rotation.z += 0.01;
      group.current.mass += 10;
      return null;
    }
  });

  return (
    <group ref={group} dispose={null}>
      <animated.mesh castShadow geometry={geometry} ref={ref} position={position}>
        <meshPhysicalMaterial {...material} />
      </animated.mesh>
      <animated.mesh castShadow geometry={symbols} ref={ref} position={position}>
        <meshPhysicalMaterial {...material} color={material.numberColor} />
      </animated.mesh>
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
  type: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  material: PropTypes.object,
};

Dice.defaultProps = {
  material: {},
};

export default Dice;
