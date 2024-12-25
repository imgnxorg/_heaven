// webpack.config.js
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

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
    publicPath: "/cdn/", // CDN path or public directory
    // Specify the location of the index.html file
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
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"],
    fallback: {
      fs: false,
      path: false,
    },
  },
};
