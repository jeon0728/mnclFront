// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'
import eslintPluginVue from 'eslint-plugin-vue'

export default withNuxt(
  {
    ignores: [ 'node_modules', 'dist' ], // 제외할 디렉터리
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        },
        ecmaVersion: 'latest',
        sourceType: 'module'
      }
    },
    plugins: {
      vue: eslintPluginVue
    },
    rules: {
      // General rules
      semi: [ 'error', 'never' ],
      indent: [ 'error', 2, { SwitchCase: 1, ignoredNodes: [ 'TemplateLiteral' ] } ],
      'no-empty-function': 'off',
      'no-extra-boolean-cast': 'off',
      'template-curly-spacing': 'off',
      'no-unused-vars': 'off',
      'space-in-parens': 'off',
      'prefer-const': 'warn',
      quotes: [ 'error', 'single', { allowTemplateLiterals: true } ],
      eqeqeq: [ 'error', 'always' ],

      // Vue-specific rules
      'vue/no-use-v-if-with-v-for': 'off',
      'vue/attributes-order': 'off',
      'vue/multiline-html-element-content-newline': 'off',
      'vue/attribute-hyphenation': [ 'off', 'always', { ignore: [] } ],
      'vue/v-on-event-hyphenation': [ 'off', 'always', { ignore: [] } ],
      'vue/html-closing-bracket-spacing': [
        'error',
        { startTag: 'never', endTag: 'never', selfClosingTag: 'always' }
      ],
      'vue/html-closing-bracket-newline': [
        'error',
        { singleline: 'never', multiline: 'always' }
      ],
      'vue/mustache-interpolation-spacing': [ 'error', 'always' ],
      'vue/no-spaces-around-equal-signs-in-attribute': [ 'error' ],
      'vue/require-default-prop': 'off',
      'vue/max-attributes-per-line': 'off',
      'vue/singleline-html-element-content-newline': 'off',
      'vue/component-definition-name-casing': [ 'off' ],
      'vue/html-quotes': [ 'error', 'double', { avoidEscape: false } ],
      'vue/no-multi-spaces': [ 'error', { ignoreProperties: false } ],
      'vue/no-unused-components': [
        'error',
        { ignoreWhenBindingPresent: false }
      ],
      'vue/no-multiple-template-root': 'off',
      'vue/html-self-closing': [
        'error',
        { html: { void: 'any', normal: 'any', component: 'any' } }
      ],
      'vue/order-in-components': 'off',
      'vue/multi-word-component-names': [ 'off' ],
      'vue/v-bind-style': [ 'error', 'shorthand' ],
      'vue/v-on-style': [ 'error', 'shorthand' ],
      'vue/v-slot-style': [
        'error',
        {
          atComponent: 'shorthand',
          default: 'shorthand',
          named: 'shorthand'
        }
      ],
      'vue/block-order': ['error', { order: ['template', 'script', 'style'] }],
      'vue/this-in-template': [ 'error', 'never' ],
      'vue/no-restricted-static-attribute': [ 'error', 'id' ],
      'vue/html-indent': [
        'error',
        2,
        {
          attribute: 1,
          baseIndent: 1,
          closeBracket: 0,
          alignAttributesVertically: false,
          ignores: []
        }
      ],

      // TypeScript-specific rules
      '@typescript-eslint/no-extraneous-class': 'off',
      '@typescript-eslint/no-unused-expressions': 'off',
      '@typescript-eslint/no-dynamic-delete': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/no-empty-interface': 'off',
      '@typescript-eslint/ban-types': 'off',
      '@typescript-eslint/no-useless-constructor': 'off',
      '@typescript-eslint/consistent-type-imports': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/no-implicit-any-catch': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/no-inferrable-types': 'off',
      '@typescript-eslint/unified-signatures': 'off'
    }
  },
  {
    files: [ '**/*.vue' ],
    rules: {
      indent: 'off',
      'vue/script-indent': [
        'error',
        2,
        { baseIndent: 1, switchCase: 1 }
      ]
    }
  },
  {
    files: [ '**/shared/assets/templetes/bookingCard.vue' ],
    rules: {
      'vue/valid-v-slot': 'off'
    }
  }
) 