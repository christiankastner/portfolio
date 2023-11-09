import { PerspectiveCamera } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import Lenis from '@studio-freight/lenis';
import { useAnimationFrame, useMotionValue, useScroll } from 'framer-motion';
import React, { FC, useCallback, useEffect, useRef } from 'react';
import * as THREE from "three"

type SmoothScrollProps = {
  loaded: boolean;
};


/**
 *
 */
export const SmoothScroll: FC<SmoothScrollProps> = ({ loaded }) => {
  const cameraY = useMotionValue(0) 
const camera = useRef(null)
  const { scrollY } = useScroll();
  const lenis = useRef<Lenis>();
  useEffect(() => {
    if (typeof lenis.current === 'undefined') {
      lenis.current = new Lenis({
        smoothTouch: true,
        syncTouch: true,
        touchMultiplier: 1,
        touchInertiaMultiplier: 17.5,
      });
    }

    return () => {
      lenis.current?.stop();
      lenis.current?.destroy();
    };
  }, []);

  useAnimationFrame((time) => {
    if (lenis.current) {
      lenis.current.raf(time);
    }
  });

  useEffect(() => {
    scrollY.onChange((val) => {
      if (camera.current) {

        const {x,z} = camera.current.position
        const yPosition = -val
        // const yPosition = THREE.MathUtils.mapLinear(val, 0, 1, SCROLL_MAPPING[0], SCROLL_MAPPING[1])
  
        camera.current.position.set(x, yPosition, z)
      }
    })
  }, [])

  useEffect(() => {
    if (typeof lenis.current !== 'undefined') {
      if (loaded) {
        lenis.current.start();
      } else {
        lenis.current.stop();
      }
    }
  }, [loaded, lenis] );

  const handleResize = () => {
    if (camera.current) {
      camera.current.fov = 2*Math.atan((window.innerHeight/2)/600) * (180/Math.PI)
    }
  }
  
  useEffect(() => {
    window.addEventListener("resize", handleResize)
    handleResize()

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return <>
  <PerspectiveCamera makeDefault position={[0,0,600]} ref={camera} />
  </>;
};
