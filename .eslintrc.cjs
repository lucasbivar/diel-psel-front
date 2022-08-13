module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'import/extensions': 'off',
    'import/no-unresolved': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/jsx-filename-extension': 'off',
    'react/react-in-jsx-scope': 'off',
    'import/prefer-default-export': 'off',
    'react/function-component-definition': 'off',
    'linebreak-style': 0,
    'react/no-array-index-key': 'off',
    'arrow-body-style': 'off',
    'react/jsx-no-constructed-context-values': 'off',
    'import/no-extraneous-dependencies': 'off',
    'no-unused-vars': 'off',
    'react/prop-types': 'off',

  },
};
