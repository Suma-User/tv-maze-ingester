module.exports = {
  settings: {
    react: {
      version: '999.999.999',
    },
  },
  extends: ['airbnb', 'prettier', 'plugin:prettier/recommended'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': ['off'],
    'no-underscore-dangle': 0,
    'max-len': [1, 180, 4],
    'arrow-body-style': [0],
    'linebreak-style': 0,
    'max-lines': [1, { max: 300, skipBlankLines: true, skipComments: true }],
    'no-useless-catch': 'off',
    'react/function-component-definition': 'off',
    'no-console' : 'off'
  },
  env: {
    es6: true,
    browser: true,
    node: true,
    mocha: true,
  },
  overrides: [
    {
      files: '*.test.js',
      rules: {
        'prefer-arrow-callback': 'off',
        'no-unused-expressions': 'off',
        'func-names': 'off',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
};
