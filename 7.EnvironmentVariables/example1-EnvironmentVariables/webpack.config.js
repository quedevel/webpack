const path = require('path');

module.exports = (env) => {
    // 여기에서 env.<변수> 를 사용하세요.
    console.log('Goal: ', env.goal); // 'local'
    console.log('Production: ', env.production); // true
  
    return {
        mode: 'development',
        entry: './src/index.js',
        output: {
            filename: '[name].js',
            path: path.resolve(__dirname, 'dist'),
            clean: true,
        },
    };
  };
  