const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
    // Set the mode to development for better debugging and unminified output
    mode: 'development',

    // Entry point of the application
    entry: './src/index.js',

    // Development server configuration
    devServer: {
        static: {
            // Serve static files from the dist directory
            directory: path.join(__dirname, '../dist'),
            serveIndex: false, // Do not serve directory listings
        },
        port: 3000, // Port for the dev server
        historyApiFallback: true, // Support for client-side routing
        hot: true, // Enable Hot Module Replacement
    },

    // Output configuration
    output: {
        publicPath: 'http://localhost:3000/', // Public URL for assets
        path: path.resolve(__dirname, '../dist'), // Output directory
        filename: 'bundle.js', // Output bundle file name
    },

    // Module rules for different file types
    module: {
        rules: [
            {
                // Transpile JS and JSX files using Babel
                test: /\.(js|jsx)$/i,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                        overrides: [
                            {
                                test: /\.(js|jsx)$/i,
                                compact: false, // Disable code compaction for easier debugging
                            },
                        ],
                    },
                },
            },
            {
                // Process CSS files
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                // Import SVGs as React components
                test: /\.svg$/i,
                issuer: /\.[jt]sx?$/,
                use: ['@svgr/webpack'],
            },
        ],
    },

    // Plugins used in the build process
    plugins: [
        // Generates an HTML file from a template
        new HtmlWebpackPlugin({
            template: './public/index.html',
        }),
        // Module Federation configuration for micro-frontends
        new ModuleFederationPlugin({
            name: 'onehub', // Name of the current app
            remotes: {
                // Remote apps to consume modules from
                remote1: 'subscription@http://localhost:3001/remoteEntry.js',
                remote2: 'ownership@http://localhost:3002/remoteEntry.js',
            },
            shared: {
                // Share React and ReactDOM as singletons to avoid version conflicts
                react: {
                    singleton: true,
                    requiredVersion: '^19.1.0',
                    eager: true,
                },
                'react-dom': {
                    singleton: true,
                    requiredVersion: '^19.1.0',
                    eager: true,
                },
            },
        }),
    ],

    // Module resolution options
    resolve: {
        extensions: ['.js', '.jsx'], // Resolve these extensions
        alias: {
            '@': path.resolve(__dirname, '../src/'), // Alias '@' to the src directory
        },
    },
};
