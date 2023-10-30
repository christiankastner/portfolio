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

  return (
    <div
      tw="fixed top-0 left-0 h-44 w-44 bg-black"
      css={tw`fixed top-0 left-0 h-44 w-44 bg-black z-[100]`}
    ></div>
  );
};
