import React, { FC, Suspense, lazy, useEffect, useState } from 'react';
import { SmoothScroll } from '../../atoms/SmoothScroll';
import { Canvas } from '@react-three/fiber';
const CanvasBackground = lazy(
  () => import('../CanvasBackground/CanvasBackground'),
);

export type CanvasAppProps = {
  //
};

/**
 *
 */
export const CanvasApp: FC<CanvasAppProps> = () => {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 2000);
  }, []);

  return (
    <Canvas>
      <SmoothScroll loaded={loaded} />
      {/* <Loader loaded={loaded} /> */}
      <Suspense fallback={null}>
        <CanvasBackground />
      </Suspense>
    </Canvas>
  );
};
