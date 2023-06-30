const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: {
        creatematch: '/src/CreateMatch/index.js',
        team: '/src/Team/index.js'
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
            template: "./src/CreateMatch/creatematch.html",
            inject: true,
            chunks: ['creatematch']
        }),
        new HtmlWebpackPlugin({
            filename: 'team.html',
            template: "./src/Team/team.html",
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