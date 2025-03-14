const js = require('@eslint/js')

module.exports = [
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      globals: {
        es6: true,
        node: true,
        browser: true,
        document: 'readonly',
        window: 'readonly',
        console: 'readonly',
        require: 'readonly',
        exports: 'readonly',
        MutationObserver: 'readonly',
        jQuery: 'readonly',
        module: 'readonly',
        __dirname: 'readonly'
      }
    },
    rules: {
      semi: [ 'error', 'never' ],
      'comma-dangle': [ 'error', 'never' ],
      quotes: [ 'error', 'single' ],
      indent: [ 'error', 2 ],
      'object-curly-spacing': [ 'error', 'always' ],
      'array-bracket-spacing': [ 'error', 'always' ],
      'no-var': 'error',
      'prefer-const': 'error',
      'prefer-arrow-callback': 'error',
      'arrow-body-style': [ 'error', 'as-needed' ],
      'no-multiple-empty-lines': 2
    }
  },
  {
    files: [ 'eslint.config.js' ],
    languageOptions: {
      sourceType: 'commonjs'
    }
  }
]
