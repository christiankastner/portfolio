import React, { FC, Suspense, lazy, useEffect, useState } from 'react';
import { SmoothScroll } from '../../atoms/SmoothScroll';
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
    <>
      <SmoothScroll loaded={loaded} />
      {/* <Loader loaded={loaded} /> */}
      <Suspense fallback={null}>
        <CanvasBackground />
      </Suspense>
    </>
  );
};
