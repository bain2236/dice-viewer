import React, { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls, softShadows } from '@react-three/drei';

import {
  Physics, usePlane,
} from '@react-three/cannon';
import Loader from './components/Loader';
import Tray from './components/Tray';
import { getControls } from './utilities';
import Dice from './components/Dice';

softShadows();

// const backgrounds = [
//   {
//     img: 'backgrounds/1_abandoned_greenhouse.hdr',
//     title: 'Greenhouse',
//     thumb: 'backgrounds/1_abandoned_greenhouse-min.jpg',
//   },
//   {
//     img: 'backgrounds/2_christmas_studio_1.hdr',
//     title: 'Christmas 1',
//     thumb: 'backgrounds/2_christmas_studio_1-min.jpg',
//   },
//   {
//     img: 'backgrounds/3_christmas_studio_2.hdr',
//     title: 'Christmas 2',
//     thumb: 'backgrounds/3_christmas_studio_2-min.jpg',
//   },
//   {
//     img: 'backgrounds/4_circus_arena.hdr',
//     title: 'Circus',
//     thumb: 'backgrounds/4_circus_arena-min.jpg',
//   },
//   {
//     img: 'backgrounds/5_colourful_studio.hdr',
//     title: 'Colourful studio',
//     thumb: 'backgrounds/5_colourful_studio-min.jpg',
//   },
//   {
//     img: 'backgrounds/6_fireplace.hdr',
//     title: 'fireplace',
//     thumb: 'backgrounds/6_fireplace-min.jpg',
//   },
//   {
//     img: 'backgrounds/7_moonless_golf.hdr',
//     title: 'moonless golf',
//     thumb: 'backgrounds/7_moonless_golf-min.jpg',
//   },
//   {
//     img: 'backgrounds/8_shanghai_bund.hdr',
//     title: 'Shanghai',
//     thumb: 'backgrounds/8_shanghai_bund-min.jpg',
//   },
//   {
//     img: 'backgrounds/9_snowy_cemetery.hdr',
//     title: 'Snowy Cemetery',
//     thumb: 'backgrounds/9_snowy_cemetery-min.jpg',
//   },
//   {
//     img: 'backgrounds/10_solitude_night.hdr',
//     title: 'solitude night',
//     thumb: 'backgrounds/10_solitude_night-min.jpg',
//   },
//   {
//     img: 'backgrounds/11_st_fagans_interior.hdr',
//     title: 'st fagans',
//     thumb: 'backgrounds/11_st_fagans_interior-min.jpg',
//   },
//   {
//     img: 'backgrounds/12_epping_forest.hdr',
//     title: 'Epping Forest',
//     thumb: 'backgrounds/12_epping_forest-min.jpg',
//   },
// ];

// const Plane = function (props) {
//   const [ref] = usePlane(() => ({ type: 'Static', ...props }));
//   return (
//     <mesh ref={ref} receiveShadow />
//   );
// };

const App = function () {
  const [diceShape, setDiceShape] = useState('D4');
  const [dice, environment, tray, material, animation] = getControls(setDiceShape);

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
          {/* <Plane rotation={[-Math.PI / 2, 0, 0]} position={[0, -60, 0]} /> */}
          {tray.trayEnabled ? <Tray material={tray} /> : null}
          <Dice
            diceShape={diceShape}
            environment={environment}
            tray={tray}
            material={material}
            animation={animation}
          />
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
