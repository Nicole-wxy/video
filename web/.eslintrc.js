module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs',
    'prettier',
    'prettier/vue',
    'plugin:prettier/recommended',
    'plugin:nuxt/recommended'
  ],
  plugins: [
    'prettier'
  ],
  // add your custom rules here
  rules: {
    'vue/multi-word-component-names':'off',
    'no-unused-vars':'off',
    'vue/no-v-html': 'off', //markdown后端渲染
    'no-console': 'off',
    'vue/comment-directive':'off' //加这行就行
  }
}
