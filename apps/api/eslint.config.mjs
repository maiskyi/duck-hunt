import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import pluginImport from 'eslint-plugin-import';

export default tseslint.config(
  {
    ignores: ['eslint.config.mjs', '**/__generated__/**'],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  eslintPluginPrettierRecommended,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      sourceType: 'commonjs',
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    plugins: {
      import: pluginImport,
    },
  },
  {
    rules: {
      'object-property-newline': [
        'error',
        { allowMultiplePropertiesPerLine: false },
      ],
      '@typescript-eslint/explicit-member-accessibility': [
        'error',
        { accessibility: 'explicit' },
      ],
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          args: 'all',
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      'import/no-duplicates': [
        'warn',
        {
          considerQueryString: true,
        },
      ],
      'import/order': [
        'warn',
        {
          'newlines-between': 'always',
          pathGroupsExcludedImportTypes: ['react'],
          warnOnUnassignedImports: true,
          groups: [
            'builtin',
            'external',
            'parent',
            'index',
            'sibling',
            'object',
            'type',
            'internal',
          ],
        },
      ],
      'no-console': 'warn',
    },
  },
);
