"use strict"

const js = require("@eslint/js")
const globals = require('globals')
const eslintPlugin = require('eslint-plugin-eslint-plugin');
const nodePlugin = require("eslint-plugin-n")
const mochaPlugin = require('eslint-plugin-mocha')

module.exports = [
    {
        languageOptions: {
            globals: {
                ...globals.es2015,
                ...globals.node,
            },
            ecmaVersion: 2020
        }
    },
    {
        ignores: [
            '!**/*',
            'node_modules'
        ]
    },
    js.configs.recommended,
    eslintPlugin.configs['flat/recommended'],
    nodePlugin.configs["flat/recommended-script"],
    mochaPlugin.configs.flat.recommended,
    {
        rules: {
            "eslint-plugin/require-meta-docs-url": [
                "error", { 
                    "pattern": "https://github.com/cypress-io/eslint-plugin-cypress/blob/master/docs/rules/{{name}}.md" 
                }
            ],
            "eslint-plugin/require-meta-docs-description": "error",
            "n/no-extraneous-require": [
                "error", { 
                    "allowModules": ["jest-config"] 
                }
            ],
            "n/no-unpublished-require": "off",
            "no-redeclare": "off",
            "mocha/no-mocha-arrows": "off",
            "mocha/no-setup-in-describe": "off"
        }
    }
]