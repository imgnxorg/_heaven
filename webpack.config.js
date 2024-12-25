// webpack.config.js
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import CopyWebpackPlugin from "copy-webpack-plugin";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * @import {Options} from '@mdx-js/loader'
 * @import {Configuration} from 'webpack'
 */

/** @type {Configuration} */
export default {
  entry: "./src/index.js", // Your application's entry point
  output: {
    path: path.resolve(__dirname, "dist"), // Output directory
    filename: "bundle.js", // Output file name
    publicPath: "./cdn/", // Updated to relative path
  },
  module: {
    rules: [
      {
        test: /\.(?:js|mjs|cjs)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env", { targets: "defaults" }]],
            plugins: ["@babel/plugin-proposal-class-properties"],
          },
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
    ],
  },
  plugins: [
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
    fallback: {
      fs: false,
      path: false,
    },
  },
  stats: {
    colors: true,
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 9000,
  },
};
