import Lenis from '@studio-freight/lenis';
import { useAnimationFrame } from 'framer-motion';
import React, { FC, useEffect, useRef } from 'react';

type SmoothScrollProps = {
  loaded: boolean;
};

/**
 *
 */
export const SmoothScroll: FC<SmoothScrollProps> = ({ loaded }) => {
  const lenis = useRef(new Lenis());

  useAnimationFrame((time) => {
    if (lenis.current) {
      lenis.current.raf(time);
    }
  });

  useEffect(() => {
    if (loaded) {
      lenis.current.start();
    } else {
      lenis.current.stop();
    }
  }, [loaded]);

  return <></>;
};
