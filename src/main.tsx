import React from 'react';
import { createRoot } from 'react-dom/client';
import { Scene } from './components/organisms/Scene/Scene';

const appRoot = document.querySelector('[data-react="lattice-man"]');

if (appRoot) {
  const root = createRoot(appRoot); // createRoot(container!) if you use TypeScript
  root.render(
    <React.StrictMode>
      <Scene />
    </React.StrictMode>,
  );
}
