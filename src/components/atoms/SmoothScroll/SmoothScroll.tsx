import Lenis from '@studio-freight/lenis';
import { useAnimationFrame } from 'framer-motion';
import React, { FC, useRef } from 'react';
import tw from 'twin.macro';

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
