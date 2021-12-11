import React from 'react';
import { Environment } from '@react-three/drei';
import { useStoreContext } from 'leva';

const Env = function () {
  const store = useStoreContext();
  const d = store.getData();

  return (

    <Environment
      files={d['environment.backgrounds'].value}
      background={d['environment.background'].value}
      thickness={d['environment.thickness'].value}
      roughness={d['environment.roughness'].value}
      clearcoat={d['environment.clearcoat'].value}
      clearcoatRoughness={d['environment.clearcoatRoughness'].value}
      transmission={d['environment.transmission'].value}
      ior={d['environment.ior'].value}
      attenuationTint={d['environment.attenuationTint'].value}
      attenuationDistance={d['environment.attenuationDistance'].value}
    />
  );
};
export default Env;
