import eslint from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import typescript from '@typescript-eslint/parser';
import prettier from 'eslint-plugin-prettier';

export default [
  {
    ignores: ['dist/**', 'coverage/**'],
  },
  eslint.configs.recommended,
  {
    files: ['**/*.ts'],
    plugins: {
      '@typescript-eslint': tseslint,
      'prettier': prettier,
    },
    languageOptions: {
      parser: typescript,
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
      },
      globals: {
        process: 'readonly',
        console: 'readonly',
        module: 'readonly',
        jest: 'readonly',
        describe: 'readonly',
        beforeEach: 'readonly',
        it: 'readonly',
        expect: 'readonly',
      },
    },
    rules: {
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': ['error', { 'argsIgnorePattern': '^_' }],
      'no-console': 'error',
      'prettier/prettier': 'error',
    },
  },
];
