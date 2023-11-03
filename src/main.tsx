import React, { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { GlobalStyles } from 'twin.macro';
import { CanvasApp } from './components/organisms/CanvasApp';
import { Slider } from './components/organisms/Slider';

const canvasRoot = document.querySelector('[data-react="canvas"]');
const sliderRoot = document.querySelector('[data-react="slider"');

if (canvasRoot) {
  const root = createRoot(canvasRoot);
  root.render(
    <React.StrictMode>
      <GlobalStyles />
      <CanvasApp />
    </React.StrictMode>,
  );
}

if (sliderRoot) {
  const root = createRoot(sliderRoot);
  root.render(
    <React.StrictMode>
      <Slider />
    </React.StrictMode>,
  );
}
