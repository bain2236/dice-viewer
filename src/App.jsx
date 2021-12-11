import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Loader, OrbitControls } from '@react-three/drei';
import {
  LevaPanel,
  LevaStoreProvider, useControls, useCreateStore, folder, useStoreContext,
} from 'leva';
import {
  AppBar, Box, CssBaseline, Drawer,
} from '@mui/material';
import Dice from './components/Dice';
import Env from './components/Env';

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
  const [ref] = usePlane(() => (
    {
      rotation: [-Math.PI / 2, 0, 0],
      position: [0, -20, 0],

      ...props,
    }));
  return (
    <mesh ref={ref} receiveShadow>
      <planeGeometry args={[100, 100]} />
      <meshStandardMaterial attach="material" color="#ffffff" />
    </mesh>
  );
};

const App = function () {
  const store = useCreateStore();

  useControls({
    dice: folder({
      rotate: true,
      type: {
        value: 'D4',
        options: {
          D4: 'D4',
          D6: 'D6',
          D8: 'D8',
          D10: 'D10',
          D12: 'D12',
          D20: 'D20',
          D100: 'D100',
        },
      },
    }),
  }, { store });

  useControls({
    environment: folder({
      background: true,
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
    }),
  }, { store });

  useControls({
    material: folder({
      color: '#ffffff',
      numberColor: '#db0c0c',
    }),
  }, { store });

  const drawerWidth = 300;

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
        />
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
          variant="permanent"
          anchor="left"
        >
          <LevaPanel store={store} fill flat titleBar={false} />
          {/* <LevaPanel store={materialStore} fill flat titleBar={false} /> */}
        </Drawer>

      </Box>

      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 40, 50] }}
        gl={{ alpha: false }}
        shadowMap
      >
        <directionalLight
          intensity={0.5}
          castShadow
          shadow-mapSize-height={512}
          shadow-mapSize-width={512}
        />
        {/* <color attach="background" args={['#151518']} /> */}
        <Suspense fallback={null}>

          {/* <Plane /> */}
          <LevaStoreProvider store={store}>
            <Dice />

            {/* eslint-disable-next-line react/jsx-props-no-spreading */}
            <Env />
          </LevaStoreProvider>
        </Suspense>
        <OrbitControls />

      </Canvas>

      {/* <Loader /> */}

    </>
  );
};

export default App;
