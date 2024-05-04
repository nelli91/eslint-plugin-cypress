const globals = require('globals')
const pkgApp = require('./package.json')

const recommendedRules = {
  'cypress/no-assigning-return-values': 'error',
  'cypress/no-unnecessary-waiting': 'error',
  'cypress/no-async-tests': 'error',
  'cypress/unsafe-to-chain-command': 'error'
}

const allRules = {
  ...recommendedRules,
  'cypress/no-async-before': 'error',
  'cypress/assertion-before-screenshot': 'error',
  'cypress/require-data-selectors': 'error',
  'cypress/no-force': 'error',
  'cypress/no-pause': 'error'
}

const customGlobals = Object.assign({
  cy: false,
  Cypress: false,
  expect: false,
  assert: false,
  chai: false,
}, globals.browser, globals.mocha)

const plugin = {
  meta: {
    name: "cypress",
    version: pkgApp.version
  },
  rules: {
    'no-assigning-return-values': require('./lib/rules/no-assigning-return-values'),
    'unsafe-to-chain-command': require('./lib/rules/unsafe-to-chain-command'),
    'no-unnecessary-waiting': require('./lib/rules/no-unnecessary-waiting'),
    'no-async-before': require('./lib/rules/no-async-before'),
    'no-async-tests': require('./lib/rules/no-async-tests'),
    'assertion-before-screenshot': require('./lib/rules/assertion-before-screenshot'),
    'require-data-selectors': require('./lib/rules/require-data-selectors'),
    'no-force': require('./lib/rules/no-force'),
    'no-pause': require('./lib/rules/no-pause')
  },
  configs: {
    'recommended-legacy': {
      plugins: ['cypress'],
      env: {
        'cypress/globals': true,
      },
      rules: recommendedRules
    },
    'all-legacy': {
      plugins: ['cypress'],
      rules: allRules
    },
    'recommended': {
      get cypress() {
        return plugin
      },
      rules: recommendedRules,
      languageOptions: {
        globals: {
          'cypress/globals': true
        }
      }
    },
    'all': {
      get cypress() {
        return plugin
      },
      rules: allRules
    },
    languageOptions: {
      globals: customGlobals,
      ecmaVersion: 2019,
      sourceType: 'module'
    }
  },
  // For backwards compatibility
  environments: {
    globals: {
      globals: customGlobals,
      parserOptions: {
        ecmaVersion: 2019,
        sourceType: 'module',
      },
    },
  },
}

module.exports = plugin
