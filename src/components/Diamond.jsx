import { useConvexPolyhedron } from '@react-three/cannon';
import { useGLTF } from '@react-three/drei';
import React, { useMemo } from 'react';
import { Geometry } from 'three-stdlib';

/**
 * Returns legacy geometry vertices, faces for ConvP
 * @param {THREE.BufferGeometry} bufferGeometry
 */
function toConvexProps(bufferGeometry) {
  const geo = new Geometry().fromBufferGeometry(bufferGeometry);
  // Merge duplicate vertices resulting from glTF export.
  // Cannon assumes contiguous, closed meshes to work
  geo.mergeVertices();
  return [geo.vertices.map((v) => [v.x, v.y, v.z]),
    geo.faces.map((f) => [f.a, f.b, f.c]), []]; // prettier-ignore
}

const Diamond = function (props) {
  const { nodes } = useGLTF('/diamond.glb');
  const geo = useMemo(() => toConvexProps(nodes.Cylinder.geometry), [nodes]);
  const [ref, api] = useConvexPolyhedron(() => ({ mass: 1, ...props, args: geo }));
  return (
    <mesh
      castShadow
      receiveShadow
      ref={ref}
      geometry={nodes.Cylinder.geometry}
      onClick={(e) => {
        console.log('touch the dice');
        // api.applyImpulse([0, 20, 0], [0, 0, 0]);
        api.mass = -1;
        e.stopPropagation();
      }}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      <meshStandardMaterial color="white" />
    </mesh>
  );
};

export default Diamond;
