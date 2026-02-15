import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-plugin-prettier';
import importPlugin from 'eslint-plugin-import';

export default [
  // --------------------------------------------------
  // Global ignores (replaces ignorePatterns / .eslintignore)
  // --------------------------------------------------
  {
    ignores: ['.eslintrc.js', 'dist/**', 'node_modules/**'],
  },

  // --------------------------------------------------
  // Base environment
  // --------------------------------------------------
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.node,
        ...globals.jest,
      },
    },
  },

  // --------------------------------------------------
  // TypeScript files
  // --------------------------------------------------
  {
    files: ['**/*.ts'],

    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: process.cwd(),
        sourceType: 'module',
      },
    },

    plugins: {
      '@typescript-eslint': tseslint.plugin,
      prettier,
      import: importPlugin,
    },

    settings: {
      'import/resolver': {
        typescript: {
          project: './tsconfig.json',
          alwaysTryTypes: true,
        },
      },
    },

    rules: {
      // --------------------------------------------------
      // Recommended rules (converted from extends)
      // --------------------------------------------------
      ...js.configs.recommended.rules,
      ...tseslint.configs.recommended.rules,
      ...importPlugin.configs.recommended.rules,
      ...importPlugin.configs.typescript.rules,

      // --------------------------------------------------
      // Prettier (plugin:prettier/recommended)
      // --------------------------------------------------
      'prettier/prettier': 'warn',

      // --------------------------------------------------
      // Custom rules (ported exactly)
      // --------------------------------------------------
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off',

      'sort-imports': [
        'error',
        {
          ignoreCase: false,
          ignoreDeclarationSort: true,
          ignoreMemberSort: false,
          memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
          allowSeparatedGroups: true,
        },
      ],

      'import/no-unresolved': 'error',

      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            ['sibling', 'parent'],
            'index',
            'unknown',
          ],
          pathGroups: [
            {
              pattern: '@apps/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '@libs/**',
              group: 'internal',
              position: 'after',
            },
          ],

          pathGroupsExcludedImportTypes: ['builtin'],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],

      'padding-line-between-statements': [
        'error',
        {
          blankLine: 'always',
          prev: '*',
          next: [
            'block',
            'block-like',
            'cjs-export',
            'class',
            'const',
            'export',
            'import',
            'let',
            'var',
            'return',
            'throw',
          ],
        },
        {
          blankLine: 'always',
          prev: [
            'block',
            'block-like',
            'cjs-export',
            'class',
            'const',
            'export',
            'import',
            'let',
            'var',
          ],
          next: '*',
        },
        {
          blankLine: 'never',
          prev: ['const', 'let', 'var'],
          next: ['const', 'let', 'var'],
        },
        {
          blankLine: 'any',
          prev: ['export', 'import'],
          next: ['export', 'import'],
        },
      ],

      'sort-keys': 'error',
      'prefer-const': 'error',
      'no-console': 'warn',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],

      'no-restricted-imports': [
        'error',
        {
          patterns: ['../*', './*'],
        },
      ],
    },
  },
];
