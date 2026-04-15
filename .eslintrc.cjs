const { configure, presets } = require('eslint-kit')

module.exports = configure({
  presets: [
    presets.node(),
    presets.typescript(),
    presets.react(),
    presets.prettier(),
    presets.imports({
      sort: {
        newline: true,
      },
    }),
  ],
  extend: {
    rules: {
      'import-x/no-default-export': 'off',
      '@typescript-eslint/no-namespace': 'off',
      'import-x/no-anonymous-default-export': 'off',
      'import-x/no-unresolved': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      'react/no-array-index-key': 'off'
    },
  },
})
