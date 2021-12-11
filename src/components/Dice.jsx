/* eslint-disable react/jsx-props-no-spreading */
import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import {
  useGLTF,
} from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useStoreContext } from 'leva';

const Dice = function () {
  let geometry;
  let symbols;
  // const [group] = useBox(() => ({ mass: 1, position: [0, 5, 0] }));
  let position = [0, 0, 0];
  const group = useRef();
  const store = useStoreContext();
  const d = store.getData();
  console.log(store);
  console.log(d);
  const dice = d['dice.type'];

  switch (dice.value) {
    case 'D4': {
      const { nodes } = useGLTF('/d4.glb');
      geometry = nodes[dice.value].geometry;
      symbols = nodes[`${dice.value}symbols`].geometry;
    }
      break;
    case 'D6': {
      const { nodes } = useGLTF('/d6.glb');
      geometry = nodes[dice.value].geometry;
      symbols = nodes[`${dice.value}symbols`].geometry;
    }
      break;
    case 'D8': {
      const { nodes } = useGLTF('/d8.glb');
      geometry = nodes[dice.value].geometry;
      symbols = nodes[`${dice.value}symbols`].geometry;
    }
      break;
    case 'D10': {
      const { nodes } = useGLTF('/d10.glb');
      geometry = nodes[dice.value].geometry;
      symbols = nodes[`${dice.value}symbols`].geometry;
      position = [2.52, -1.15, -24.46];
    }
      break;
    case 'D12': {
      const { nodes } = useGLTF('/d12.glb');
      geometry = nodes[dice.value].geometry;
      symbols = nodes[`${dice.value}symbols`].geometry;
    }
      break;
    case 'D20': {
      const { nodes } = useGLTF('/d20.glb');
      geometry = nodes[dice.value].geometry;
      symbols = nodes[`${dice.value}symbols`].geometry;
    }
      break;
    case 'D100': {
      const { nodes } = useGLTF('/d100.glb');
      geometry = nodes[dice.value].geometry;
      symbols = nodes[`${dice.value}symbols`].geometry;
    }
      break;

    default:
      break;
  }

  useFrame(() => {
    if (d['dice.rotate'].value) {
      // group.current.rotation.x += 0.02;
      group.current.rotation.y += 0.01;
      // group.current.rotation.z += 0.01;
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
          background={d['environment.background'].value}
          thickness={d['environment.thickness'].value}
          roughness={d['environment.roughness'].value}
          clearcoat={d['environment.clearcoat'].value}
          clearcoatRoughness={d['environment.clearcoatRoughness'].value}
          transmission={d['environment.transmission'].value}
          ior={d['environment.ior'].value}
          color={d['material.color'].value}
          attenuationTint={d['environment.attenuationTint'].value}
          attenuationDistance={d['environment.attenuationDistance'].value}
        />
      </mesh>
      <mesh
        castShadow
        geometry={symbols}
        position={position}
      >
        <meshPhysicalMaterial
          background={d['environment.background'].value}
          thickness={d['environment.thickness'].value}
          roughness={d['environment.roughness'].value}
          clearcoat={d['environment.clearcoat'].value}
          clearcoatRoughness={d['environment.clearcoatRoughness'].value}
          transmission={d['environment.transmission'].value}
          ior={d['environment.ior'].value}
          color={d['material.numberColor'].value}
          attenuationTint={d['environment.attenuationTint'].value}
          attenuationDistance={d['environment.attenuationDistance'].value}
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
  type: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  material: PropTypes.object,
};

Dice.defaultProps = {
  material: {},
};

export default Dice;
