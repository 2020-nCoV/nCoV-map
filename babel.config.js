module.exports = {
  presets: [
    ['@babel/preset-env', { modules: false }],
    '@vue/cli-plugin-babel/preset',
  ],
  plugins: [
    [
      'component',
      {
        libraryName: 'element-ui',
        styleLibraryName: 'theme-chalk',
      },
    ],
  ],
};
