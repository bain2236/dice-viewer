import { useConvexPolyhedron } from '@react-three/cannon';
import { useGLTF } from '@react-three/drei';
import { buttonGroup, folder, useControls } from 'leva';
import { useEffect, useMemo, useRef } from 'react';
import { Geometry } from 'three-stdlib';

/**
 * Returns legacy geometry vertices, faces for ConvP
 * @param {THREE.BufferGeometry} bufferGeometry
 */
const toConvexProps = (bufferGeometry) => {
  const geo = new Geometry().fromBufferGeometry(bufferGeometry);
  // Merge duplicate vertices resulting from glTF export.
  // Cannon assumes contiguous, closed meshes to work
  geo.mergeVertices();
  return [geo.vertices.map((v) => [v.x, v.y, v.z]),
    geo.faces.map((f) => [f.a, f.b, f.c]), []]; // prettier-ignore
};

const getDiceRefs = (diceShape) => {
  const { nodes } = useGLTF(`/${diceShape.toLowerCase()}.glb`);

  const velocityOn = useRef(false);
  const geo = useMemo(() => toConvexProps(nodes[diceShape].geometry), [nodes]);

  const [ref, api] = useConvexPolyhedron(() => ({
    type: 'Dynamic', mass: 0, args: geo,
  }));

  const { geometry } = nodes[diceShape];
  const symbols = nodes[`${diceShape}symbols`].geometry;
  const walls = nodes[`${diceShape}walls`].geometry;

  return [velocityOn, ref, api, geometry, symbols, walls];
};

const getControls = (setDiceShape) => {
  const dice = useControls('Dice', {
    ' ': buttonGroup({
      D4: () => { setDiceShape('D4'); },
      D6: () => { setDiceShape('D6'); },
      D8: () => { setDiceShape('D8'); },
      D10: () => { setDiceShape('D10'); },
      D12: () => { setDiceShape('D12'); },
      D20: () => { setDiceShape('D20'); },
      D100: () => { setDiceShape('D100'); },
    }),
  });

  const environment = useControls({
    enabled: { value: false, label: 'Environment' },
    environment: folder(
      {
        backgrounds: {
          value: 'backgrounds/1_abandoned_greenhouse.hdr',
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
          // onChange: () => console.log('did a thing'),
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
          value: 25, min: 0, max: 100, step: 1, onChange: () => console.log('did a thing'),
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
  return [dice, environment, tray, material, animation];
};
export { toConvexProps, getDiceRefs, getControls };
