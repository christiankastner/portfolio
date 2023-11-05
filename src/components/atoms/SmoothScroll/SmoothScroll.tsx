import { PerspectiveCamera } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import Lenis from '@studio-freight/lenis';
import { useAnimationFrame, useMotionValue, useScroll } from 'framer-motion';
import React, { FC, useEffect, useRef } from 'react';
import * as THREE from "three"

type SmoothScrollProps = {
  loaded: boolean;
};

const SCROLL_MAPPING = [0, -10]
/**
 *
 */
export const SmoothScroll: FC<SmoothScrollProps> = ({ loaded }) => {
  const cameraY = useMotionValue(0)
  const {camera} = useThree()
  const { scrollYProgress } = useScroll();
  const lenis = useRef(new Lenis({
    smoothTouch: true,
    syncTouch: true,
    touchMultiplier: 1,
    touchInertiaMultiplier: 17.5,
  }));

  useAnimationFrame((time) => {
    if (lenis.current) {
      lenis.current.raf(time);
    }
  });

  useEffect(() => {
    scrollYProgress.onChange((val) => {
      const {x,z} = camera.position
      const yPosition = THREE.MathUtils.mapLinear(val, 0, 1, SCROLL_MAPPING[0], SCROLL_MAPPING[1])

      camera.position.set(x, yPosition, z)
    })
  }, [])

  useEffect(() => {
    if (loaded) {
      lenis.current.start();
    } else {
      lenis.current.stop();
    }
  }, [loaded]);

  return <>
  {/* <PerspectiveCamera /> */}
  </>;
};
