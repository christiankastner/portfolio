import React, { FC, Suspense, lazy, useEffect, useState } from 'react';
import { SmoothScroll } from '../../atoms/SmoothScroll';
import { Canvas } from '@react-three/fiber';
import CanvasBackground from '../CanvasBackground/CanvasBackground';

export type CanvasAppProps = {
  //
};

/**
 *
 */
const CanvasApp: FC<CanvasAppProps> = () => {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 2000);
  }, []);

  return (
    <Canvas dpr={1} gl={{antialias: false}}>
      <SmoothScroll loaded={loaded} />
      {/* <Loader loaded={loaded} /> */}

        <CanvasBackground />
    </Canvas>
  );
};


export default CanvasApp
