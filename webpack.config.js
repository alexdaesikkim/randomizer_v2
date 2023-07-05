const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: {
        creatematch: '/frontend/src/CreateMatch/index.js',
        team: '/frontend/src/Team/index.js'
    },
    output: {
        path: path.join(__dirname, "/dist"),
        filename: "[name].bundle.js",
    },
    optimization: {
        splitChunks: {
            chunks: "all",
        },
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'creatematch.html',
            template: "./frontend/src/CreateMatch/creatematch.html",
            inject: true,
            chunks: ['creatematch']
        }),
        new HtmlWebpackPlugin({
            filename: 'team.html',
            template: "./frontend/src/Team/team.html",
            inject: true,
            chunks: ['team']
        }),
    ],
    devServer: {
        port: 3001, // you can change the port
    },
    module: {
        rules: [
        {
            test: /\.(js|jsx)$/, // .js and .jsx files
            exclude: /node_modules/, // excluding the node_modules folder
            use: {
                loader: "babel-loader",
                options: { presets: ['@babel/env', '@babel/preset-react'] },
            },
        },
        {
            test: /\.(sa|sc|c)ss$/, // styles files
            use: ["style-loader", "css-loader", "sass-loader"],
        },
        {
            test: /\.(png|woff|woff2|eot|ttf|svg)$/, // to import images and fonts
            loader: "url-loader",
            options: { limit: false },
        },],
    },
};