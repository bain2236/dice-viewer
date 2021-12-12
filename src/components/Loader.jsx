import React from 'react';
import { Html, useProgress } from '@react-three/drei';
import Box from '@mui/material/Box';
import { LinearProgress } from '@mui/material';

const Loader = function () {
  const {
    active, progress, errors, item, loaded, total,
  } = useProgress();
  return (
    <Html center>
      <Box sx={{ width: 800 }}>
        <LinearProgress variant="determinate" value={progress} />
        {/* <span style={{ color: 'white' }}>
          Loading
        </span> */}
      </Box>
    </Html>
  );
};
export default Loader;
