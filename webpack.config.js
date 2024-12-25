// webpack.config.js
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import CopyWebpackPlugin from "copy-webpack-plugin";
import CompressionPlugin from "compression-webpack-plugin";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * @import {Options} from '@mdx-js/loader'
 * @import {Configuration} from 'webpack'
 */

/** @type {Configuration} */
export default {
  mode: "production",
  entry: "./src/index.js", // Your application's entry point
  output: {
    path: path.resolve(__dirname, "dist"), // Output directory
    filename: "[name].[contenthash].js", // Use unique names for output files
    publicPath: "/", // Updated to relative path
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.mdx?$/,
        use: [
          { loader: "babel-loader", options: {} },
          {
            loader: "@mdx-js/loader",
            /** @type {Options} */
            options: {
              /* jsxImportSource: …, otherOptions… */
            },
          },
        ],
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: {
              minimize: true,
            },
          },
        ],
      },
      {
        test: /\.mmd$/,
        use: [
          {
            loader: "raw-loader",
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "css-loader",
          },
        ],
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        type: "asset/resource",
        generator: {
          filename: "images/[hash][ext][query]",
        },
      },
      {
        test: /\.js$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              plugins: ["@babel/plugin-syntax-dynamic-import"],
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CompressionPlugin(),
    new HtmlWebpackPlugin({
      template: "./src/index.html", // Path to your template file
      filename: "index.html", // Output file name
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: "cdn", to: "cdn" }, // Copy contents of /cdn to /dist/cdn
      ],
    }),
  ],

  resolve: {
    extensions: [".js", ".jsx"],
    alias: {
      "react-dom": path.resolve("./node_modules/react-dom"),
    },
    fallback: {
      fs: false,
      path: false,
      http: "stream-http",
    },
  },
  stats: {
    colors: true,
    errorDetails: true,
    children: true,
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    compress: true,
    port: 3000,
    historyApiFallback: true,
  },
  optimization: {
    usedExports: true,
    minimize: true,
    splitChunks: {
      chunks: "all",
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            const packageName = module.context.match(
              /[\\/]node_modules[\\/](.*?)([\\/]|$)/,
            )[1];
            return `vendor.${packageName.replace("@", "")}`;
          },
        },
      },
    },
    runtimeChunk: "single", // Add this line to avoid conflicts
  },
};
