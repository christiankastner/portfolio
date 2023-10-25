import Lenis from '@studio-freight/lenis';
import { useAnimationFrame } from 'framer-motion';
import { FC, useRef } from 'react';

type SmoothScrollProps = {
  //
};

/**
 *
 */
export const SmoothScroll: FC<SmoothScrollProps> = (props) => {
  const lenis = useRef(new Lenis());

  useAnimationFrame((time) => {
    if (lenis.current) {
      lenis.current.raf(time);
    }
  });
  return <></>;
};
