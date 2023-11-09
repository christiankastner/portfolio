import React, { Suspense, lazy } from 'react';
import { createRoot } from 'react-dom/client';
import { GlobalStyles } from 'twin.macro';
import { Work } from './components/organisms/Work';

const CanvasApp = lazy(() => import('./components/organisms/CanvasApp/CanvasApp'));
const canvasRoot = document.querySelector('[data-react="canvas"]');
const sliderRoot = document.querySelector('[data-react="slider"');

if (canvasRoot) {
  const root = createRoot(canvasRoot);
  root.render(
    <React.StrictMode>
      <GlobalStyles />
      <Suspense>
      <CanvasApp />
      </Suspense>
    </React.StrictMode>,
  );
}

if (sliderRoot) {
  const root = createRoot(sliderRoot);
  root.render(
    <React.StrictMode>
      <Work />
    </React.StrictMode>,
  );
}
