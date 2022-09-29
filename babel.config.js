module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module:react-native-dotenv',
      {
        moduleName: '@env',
        path: '.env',
      },
    ],
    ['@babel/plugin-transform-flow-strip-types'],
  ],
  env: {
    production: {
      plugins: ['react-native-paper/babel'],
    },
  },
};
