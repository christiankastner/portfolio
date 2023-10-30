import React, { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { GlobalStyles } from 'twin.macro';
import { SmoothScroll } from './components/atoms/SmoothScroll';
import { Loader } from './components/organisms/Loader';

const appRoot = document.querySelector('[data-react="canvas"]');

if (appRoot) {
  const root = createRoot(appRoot);
  root.render(
    <React.StrictMode>
      <GlobalStyles />
      <Suspense fallback={null}>
        <SmoothScroll />
        <Loader />
      </Suspense>
    </React.StrictMode>,
  );
}
