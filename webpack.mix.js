const mix = require("laravel-mix");
const path = require("path");
require("laravel-mix-purgecss");

const VuetifyLoaderPlugin = require("vuetify-loader/lib/plugin");
const CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin");

var webpackConfig = {
    plugins: [new VuetifyLoaderPlugin(), new CaseSensitivePathsPlugin()]
};

mix.webpackConfig(webpackConfig);

mix.js("resources/js/app.ts", "public/js")
    .vue()
    .sass("resources/sass/app.scss", "public/css")
    .purgeCss()
    .webpackConfig({
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    loader: "ts-loader",
                    options: { appendTsSuffixTo: [/\.vue$/] },
                    exclude: /node_modules/
                }
            ]
        },
        resolve: {
            extensions: ["*", ".js", ".vue", ".ts"],
            alias: {
                "@": path.resolve(__dirname, "resources/js"),
                "@components": path.resolve(
                    __dirname,
                    "resources/js/components"
                ),
                "@modules": path.resolve(
                    __dirname,
                    "resources/js/store/modules"
                )
            }
        }
    });
