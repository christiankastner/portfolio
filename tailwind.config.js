const { withOpacity } = require('./src/styles/withOpacity');

/*
  Dev server must be restarted after changes to this file.
*/

module.exports = {
  content: ['./src/**/*.tsx'],
  theme: {
    extend: {
      fontFamily: {
        sans: 'var(--font-primary)',
        serif: 'var(--font-serif)',
        // custom fields, e.g. `tw="font-primary"` or theme`fontFamily.primary`
        primary: 'var(--font-primary)',
        secondary: 'var(--font-secondary)',
      },
      colors: {
        current: 'currentColor',
        /* Add colors in r, g, b format in root.css */
        'brand-cyan': withOpacity('--brand-cyan'),
        'brand-red': withOpacity('--brand-red'),
      },
      transitionTimingFunction: {
        'ease-in-sine': 'var(--ease-in-sine)',
        'ease-out-sine': 'var(--ease-out-sine)',
        'ease-in-out-sine': 'var(--ease-in-out-sine)',
        'ease-in-quad': 'var(--ease-in-quad)',
        'ease-out-quad': 'var(--ease-out-quad)',
        'ease-in-out-quad': 'var(--ease-in-out-quad)',
        'ease-in-cubic': 'var(--ease-in-cubic)',
        'ease-out-cubic': 'var(--ease-out-cubic)',
        'ease-in-quart': 'var(--ease-in-quart)',
        'ease-out-quart': 'var(--ease-out-quart)',
        'ease-in-out-quart': 'var(--ease-in-out-quart)',
        'ease-in-quint': 'var(--ease-in-quint)',
        'ease-out-quint': 'var(--ease-out-quint)',
        'ease-in-out-quint': 'var(--ease-in-out-quint)',
        'ease-in-expo': 'var(--ease-in-expo)',
        'ease-out-expo': 'var(--ease-out-expo)',
        'ease-in-out-expo': 'var(--ease-in-out-expo)',
        'ease-in-circ': 'var(--ease-in-circ)',
        'ease-out-circ': 'var(--ease-out-circ)',
        'ease-in-out-circ': 'var(--ease-in-out-circ)',
        'ease-in-back': 'var(--ease-in-back)',
        'ease-out-back': 'var(--ease-out-back)',
        'ease-in-out-back': 'var(--ease-in-out-back)',
        'ease-in-out-cubic': 'var(--ease-in-out-cubic)',
      },
    },
  },

  plugins: [],
};
