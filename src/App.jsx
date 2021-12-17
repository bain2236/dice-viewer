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

const Plane = function (props) {
  const [ref] = usePlane(() => ({ type: 'Static', ...props }));
  return (
    <mesh
      ref={ref}
      receiveShadow
    >
      {/* <planeBufferGeometry attach="geometry" args={[30, 30]} />
      <meshStandardMaterial attach="material" color="white" /> */}
    </mesh>

  );
};

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
        >
          {/** back plane */}
          <Plane rotation={[-Math.PI / 1, 0, 0]} position={[0, 0, 183]} />
          {/** back left plane */}
          <Plane rotation={[Math.PI / 1, 1.06, 0]} position={[-135, 0, 135]} />
          {/** back right plane */}
          <Plane rotation={[Math.PI / 1, 5.23, 0]} position={[135, 0, 135]} />
          {/** front right plane */}
          <Plane rotation={[Math.PI / 1, 4.19, 0]} position={[135, 0, -132]} />
          {/** front plane */}
          <Plane rotation={[Math.PI / 1, 3.13, 0]} position={[135, 0, -184]} />
          {/** front left plane */}
          <Plane rotation={[Math.PI / 1, 2.1, 0]} position={[-105, 0, -184]} />
          {/* <Plane rotation={[Math.PI / 1, 0, 0]} position={[-183, 0, -183]} /> */}
          {/** bottom plane */}
          <Plane rotation={[-Math.PI / 2, 0, 0]} position={[0, -77, 0]} />
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
