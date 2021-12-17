import React, { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls, softShadows } from '@react-three/drei';
import {
  useControls, buttonGroup, folder, button,
} from 'leva';
import {
  Physics, useBox, usePlane,
} from '@react-three/cannon';
import Loader from './components/Loader';
import Tray from './components/Tray';
import D4 from './components/D4';
import D6 from './components/D6';
import D8 from './components/D8';
import D10 from './components/D10';
import D12 from './components/D12';
import D20 from './components/D20';
import D100 from './components/D100';

softShadows();

const backgrounds = [
  {
    img: 'backgrounds/1_abandoned_greenhouse.hdr',
    title: 'Greenhouse',
    thumb: 'backgrounds/1_abandoned_greenhouse-min.jpg',
  },
  {
    img: 'backgrounds/2_christmas_studio_1.hdr',
    title: 'Christmas 1',
    thumb: 'backgrounds/2_christmas_studio_1-min.jpg',
  },
  {
    img: 'backgrounds/3_christmas_studio_2.hdr',
    title: 'Christmas 2',
    thumb: 'backgrounds/3_christmas_studio_2-min.jpg',
  },
  {
    img: 'backgrounds/4_circus_arena.hdr',
    title: 'Circus',
    thumb: 'backgrounds/4_circus_arena-min.jpg',
  },
  {
    img: 'backgrounds/5_colourful_studio.hdr',
    title: 'Colourful studio',
    thumb: 'backgrounds/5_colourful_studio-min.jpg',
  },
  {
    img: 'backgrounds/6_fireplace.hdr',
    title: 'fireplace',
    thumb: 'backgrounds/6_fireplace-min.jpg',
  },
  {
    img: 'backgrounds/7_moonless_golf.hdr',
    title: 'moonless golf',
    thumb: 'backgrounds/7_moonless_golf-min.jpg',
  },
  {
    img: 'backgrounds/8_shanghai_bund.hdr',
    title: 'Shanghai',
    thumb: 'backgrounds/8_shanghai_bund-min.jpg',
  },
  {
    img: 'backgrounds/9_snowy_cemetery.hdr',
    title: 'Snowy Cemetery',
    thumb: 'backgrounds/9_snowy_cemetery-min.jpg',
  },
  {
    img: 'backgrounds/10_solitude_night.hdr',
    title: 'solitude night',
    thumb: 'backgrounds/10_solitude_night-min.jpg',
  },
  {
    img: 'backgrounds/11_st_fagans_interior.hdr',
    title: 'st fagans',
    thumb: 'backgrounds/11_st_fagans_interior-min.jpg',
  },
  {
    img: 'backgrounds/12_epping_forest.hdr',
    title: 'Epping Forest',
    thumb: 'backgrounds/12_epping_forest-min.jpg',
  },
];

const Plane = function (props) {
  const [ref] = usePlane(() => ({ type: 'Static', ...props }));
  return (
    <mesh ref={ref} receiveShadow />
  );
};

const App = function () {
  const [diceShape, setDiceShape] = useState('D4');
  useControls('Dice', {
    ' ': buttonGroup({
      D4: () => { setDiceShape('D4'); },
      D6: () => { setDiceShape('D6'); },
      D8: () => { setDiceShape('D8'); },
      D10: () => { setDiceShape('D10'); },
      D12: () => { setDiceShape('D12'); },
      D20: () => { setDiceShape('D20'); },
      D100: () => { setDiceShape('D100'); },
    }),
    Reset: button(() => alert('click')),
  });

  const environment = useControls({
    enabled: { value: false, label: 'Environment' },
    environment: folder(
      {
        backgrounds: {
          options: {
            Greenhouse: 'backgrounds/1_abandoned_greenhouse.hdr',
            Christmas1: 'backgrounds/2_christmas_studio_1.hdr',
            Christmas2: 'backgrounds/3_christmas_studio_2.hdr',
            Circus: 'backgrounds/4_circus_arena.hdr',
            Colourful_studio: 'backgrounds/5_colourful_studio.hdr',
            Cozy_fireplace: 'backgrounds/6_fireplace.hdr',
            Moonless: 'backgrounds/7_moonless_golf.hdr',
            Shanghai: 'backgrounds/8_shanghai_bund.hdr',
            Snowy_Cemetery: 'backgrounds/9_snowy_cemetery.hdr',
            Solitude_night: 'backgrounds/10_solitude_night.hdr',
            St_Fagans: 'backgrounds/11_st_fagans_interior.hdr',
            Epping_forest: 'backgrounds/12_epping_forest.hdr',
          },
        },
        thickness: { value: 5, min: 0, max: 20 },
        roughness: {
          value: 1, min: 0, max: 1, step: 0.1,
        },
        clearcoat: {
          value: 1, min: 0, max: 1, step: 0.1,
        },
        clearcoatRoughness: {
          value: 0, min: 0, max: 1, step: 0.1,
        },
        transmission: {
          value: 1, min: 0.9, max: 1, step: 0.01,
        },
        ior: {
          value: 1.25, min: 1, max: 2.3, step: 0.05,
        },
        envMapIntensity: {
          value: 25, min: 0, max: 100, step: 1,
        },

        attenuationTint: '#ffe79e',
        attenuationDistance: { value: 0, min: 0, max: 1 },

      },
      { render: (get) => get('enabled') },
    ),
  });

  const tray = useControls({
    trayEnabled: { value: true, label: 'tray' },
    tray: folder(
      {
        base: '#07380c',
        inner: '#07380c',
        trim: '#a07e17',
        outer: '#000000',
        under: '#000000',
        trayMetal: {
          value: 0, min: 0, max: 1, step: 0.1,
        },
        wireframe: false,
      },
      { render: (get) => get('trayEnabled') },
    ),
  });

  const material = useControls('material', {
    color: '#ffffff',
    metal: {
      value: 0, min: 0, max: 1, step: 0.1,
    },
    numberColor: '#db0c0c',
    wallColor: '#10e8c8',
    wireframe: false,
  });

  const animation = useControls('animation', {
    rotate: true,
    axis: {
      x: 0,
      y: 0.01,
      z: 0.015,
    },
  });

  const diceRender = () => {
    switch (diceShape) {
      case 'D4':
        return (
          <D4
            diceShape={diceShape}
            material={material}
            environment={environment}
            animation={animation}
          />
        );
      case 'D6':
        return (
          <D6
            diceShape={diceShape}
            material={material}
            environment={environment}
            animation={animation}
          />
        );
      case 'D8':
        return (
          <D8
            diceShape={diceShape}
            material={material}
            environment={environment}
            animation={animation}
          />
        );
      case 'D10':
        return (
          <D10
            diceShape={diceShape}
            material={material}
            environment={environment}
            animation={animation}
          />
        );
      case 'D12':
        return (
          <D12
            diceShape={diceShape}
            material={material}
            environment={environment}
            animation={animation}
          />
        );
      case 'D20':
        return (
          <D20
            diceShape={diceShape}
            material={material}
            environment={environment}
            animation={animation}
          />
        );
      case 'D100':
        return (
          <D100
            diceShape={diceShape}
            material={material}
            environment={environment}
            animation={animation}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Canvas
      shadows
      colorManagement
      camera={{ position: [0, 40, 50], fov: 70 }}
    >
      <directionalLight
        intensity={0.5}
        castShadow
        shadow-mapSize-height={512}
        shadow-mapSize-width={512}
        position={[0, 50, 100]}
      />
      <Suspense fallback={<Loader />}>
        <Physics
          iterations={20}
          tolerance={0.0001}
          defaultContactMaterial={{
            friction: 0.9,
            restitution: 0.7,
            contactEquationStiffness: 1e7,
            contactEquationRelaxation: 1,
            frictionEquationStiffness: 1e7,
            frictionEquationRelaxation: 2,
          }}
          gravity={[0, -200, 0]}
          // allowSleep={false}
        >
          <Plane rotation={[-Math.PI / 2, 0, 0]} position={[0, -60, 0]} />
          {tray.trayEnabled ? <Tray material={tray} /> : null}
          {diceRender()}
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          {environment.enabled
            ? (
              <Environment
                files={environment.enabled ? environment.backgrounds : null}
                background={environment.enabled}
                thickness={environment.enabled ? environment.thickness : null}
                roughness={environment.enabled ? environment.roughness : null}
                clearcoat={environment.enabled ? environment.clearcoat : null}
                clearcoatRoughness={environment.enabled ? environment.clearcoatRoughness : null}
                transmission={environment.enabled ? environment.transmission : null}
                ior={environment.enabled ? environment.ior : null}
                attenuationTint={environment.enabled ? environment.attenuationTint : null}
                attenuationDistance={environment.enabled ? environment.attenuationDistance : null}
              />
            )
            : (
              <directionalLight
                intensity={0.5}
                castShadow
                shadow-mapSize-height={512}
                shadow-mapSize-width={512}
              />
            )}
        </Physics>
      </Suspense>
      <OrbitControls />

    </Canvas>
  );
};

export default App;
