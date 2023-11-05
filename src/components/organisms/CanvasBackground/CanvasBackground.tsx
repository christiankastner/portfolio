import React, { FC } from 'react';
import Raymarch from '../../atoms/Raymarch/Raymarch';
import { Canvas } from '@react-three/fiber';
import { Stats } from '@react-three/drei';

export type CanvasBackgroundProps = {
  //
};

/**
 *
 */
const CanvasBackground: FC<CanvasBackgroundProps> = () => {
  return <>
  <Raymarch />
<Stats />
  </>;
};

export default CanvasBackground;
