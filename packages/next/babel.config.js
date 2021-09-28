module.exports = {
  presets: ['next/babel'],
  plugins: [
    ['react-native-web', { commonjs: true }],
    ['transform-define', {
      '__DEV__': process.env.NODE_ENV,
      '__SUBPLATFORM__': 'next',
    }]
  ],
}