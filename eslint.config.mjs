import pluginJs from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import nextPlugin from '@next/eslint-plugin-next'

export default [
  {
    ignores: ['src/graphql/index.tsx'],
  },
  {languageOptions: {globals: {...globals.browser, ...globals.node}}},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: {
      '@next/next': nextPlugin
    },
    rules: {
      '@typescript-eslint/ban-ts-comment': 0,
      '@typescript-eslint/no-empty-function': 0,
      '@typescript-eslint/no-parameter-properties': 0,
      '@typescript-eslint/ban-types': 0,
      '@next/next/no-html-link-for-pages': 'error',
      '@next/next/no-img-element': 'error',
      '@next/next/no-unwanted-polyfillio': 'warn',
      '@next/next/no-sync-scripts': 'error',
      '@next/next/no-script-component-in-head': 'error',
      
      'no-undef': 2,
      'prefer-const': 1,
      'no-unused-vars': 1,
      'max-len': [
        1,
        {
          code: 250,
          ignoreStrings: true,
          ignoreTemplateLiterals: true,
          ignoreTrailingComments: true,
        },
      ],
    },
  },
]
