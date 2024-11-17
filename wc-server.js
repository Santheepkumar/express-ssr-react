const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
    // Entry point of your Node.js app
    entry: './app.js',

    // Output file
    output: {
        path: path.resolve(__dirname, 'server-build'),
        filename: 'app.js',
    },

    // Target environment (Node.js in this case)
    target: 'node',

    // Exclude node_modules from the bundle
    externals: [nodeExternals()],

    // Enable source maps for easier debugging
    devtool: 'source-map',

    // Configure Babel loader for transpiling
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/, // Ignore node_modules
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'], // Transpile modern JS to ES5
                    },
                },
            },
        ],
    },

    // Resolve extensions for imports
    resolve: {
        extensions: ['.js', '.json', '.jsx'],
    },
    mode: process.env.NODE_ENV || 'development',
};
