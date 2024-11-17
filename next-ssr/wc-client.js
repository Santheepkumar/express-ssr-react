const path = require("path");

// const nodeExternals = require("webpack-node-externals");
module.exports = {
    entry: "./next-ssr/client.js", // Entry file
    output: {
        filename: "client.js", // Output filename
        path: path.resolve(__dirname, "build"), // Output directory
    },
    target: 'web', // Ensure Webpack bundles for the browser
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
    resolve: {
        extensions: [".js", ".jsx"], // Resolve .js and .jsx extensions
        fallback: {},
    },
    externals: {
        // express: 'commonjs express',
    },
    mode: "development", // Set mode (use 'production' for optimized builds)
};
