module.exports = {
  extends: ['airbnb', 'plugin:flowtype/recommended'],
  plugins: ['flowtype'],
  rules: {
    'max-len': [2, 100],
    'flowtype/require-valid-file-annotation': [2, 'always'],
    'no-restricted-syntax': 0,
    'no-continue': 0,
    'react/jsx-filename-extension': 0,
    'space-before-function-paren': [2, { anonymous: 'never', named: 'never' }],
    'generator-star-spacing': 0,
    'arrow-parens': 0,
    'arrow-body-style': 0,
    'wrap-iife': 0,
    'no-mixed-operators': 0,
  },
};
