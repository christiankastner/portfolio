import React from 'react';
import { createRoot } from 'react-dom/client';
import { SmoothScroll } from './components/atoms/SmoothScroll';

const appRoot = document.querySelector('[data-react="canvas"]');

if (appRoot) {
  const root = createRoot(appRoot);
  root.render(
    <React.StrictMode>
      <SmoothScroll />
    </React.StrictMode>,
  );
}
