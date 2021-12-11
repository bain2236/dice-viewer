import React from 'react';
import {
  useControls, useStoreContext, useCreateStore, LevaPanel, LevaStoreProvider,
} from 'leva';

const MyComponent = function () {
  const store = useStoreContext();
  const Dice = store.get('Dice', null);
  const g = store.getData();
  console.log(store);
  console.log(Dice);
  console.log(g);
  return null;
};

export default MyComponent;
