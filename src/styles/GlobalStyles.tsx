import { css, Global } from '@emotion/react';
import 'focus-visible/dist/focus-visible.min';
import React from 'react'; // seem to need React import in this file (?)
import tw, { GlobalStyles as BaseStyles, theme } from 'twin.macro';
import './root.css';

const customStyles = css`
  html {
    ${tw`antialiased`}
  }

  body {
    /* Super important for iframeable Labs demos, to avoid selection during interaction!
       To override you can add 'select-text' (user-select: text) on a specific element. */
    user-select: none;

    font-family: ${theme`fontFamily.primary`};

    h1 {
      ${tw`text-5xl`}
    }

    h2 {
      ${tw`text-3xl`}
    }

    h3 {
      ${tw`text-2xl`}
    }

    p {
      ${tw`text-base`}
    }
  }

  /* Focus visible & polyfill */
  .js-focus-visible :focus:not(.focus-visible) {
    outline: none;
  }

  /* Tab focus style */
  button:focus,
  input:focus,
  a:focus {
    outline: gray dashed 1px;
    outline-offset: 3px; /* recommended by Deque */
  }
`;

const GlobalStyles: React.FC = () => (
  <>
    <BaseStyles />
    <Global styles={customStyles} />
  </>
);

export default GlobalStyles;
