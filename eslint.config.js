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
        IntersectionObserver: 'readonly',
        jQuery: 'readonly',
        module: 'readonly',
        __dirname: 'readonly',
        _: 'readonly',
        setTimeout: 'readonly'
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
      'no-multiple-empty-lines': 2,
      'space-before-function-paren': [
        2,
        'always'
      ],
      'space-in-parens': [ 'error', 'never' ]
    }
  },
  {
    files: [ 'eslint.config.js' ],
    languageOptions: {
      sourceType: 'commonjs'
    }
  }
]
