import React, { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { GlobalStyles } from 'twin.macro';
import { CanvasApp } from './components/organisms/CanvasApp';

const appRoot = document.querySelector('[data-react="canvas"]');

if (appRoot) {
  const root = createRoot(appRoot);
  root.render(
    <React.StrictMode>
      <GlobalStyles />
      <CanvasApp />
    </React.StrictMode>,
  );
}
