/* 
  changes to functions used in tailwind.config.js require clean:
  
  `yarn clean && yarn develop`
*/

/**
 * Helper to enable bg & text opacity via RGBA color values
 * where TW injects the A value.
 *
 * CSS:
 * --brand-pink: 185, 66, 151;
 *
 * tw config color:
 * 'brand-hit': withOpacity('--brand-pink')
 *
 * From: https://github.com/adamwathan/tailwind-css-variable-text-opacity-demo/issues/1
 */
function withOpacity(cssVariable) {
  return ({ opacityVariable, opacityValue }) => {
    if (opacityValue !== undefined) {
      return `rgba(var(${cssVariable}), ${opacityValue})`;
    }
    if (opacityVariable !== undefined) {
      return `rgba(var(${cssVariable}), var(${opacityVariable}, 1))`;
    }
    return `rgb(var(${cssVariable}))`;
  };
}

module.exports = {
  withOpacity,
};
