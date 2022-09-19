module.exports = {
  plugins: {
    // postcss-pxtorem >= 5.0.0
    'postcss-pxtorem': {
      rootValue: 16, // the html font size, for rem layout
      propList: ['*']
    }
  }
}
