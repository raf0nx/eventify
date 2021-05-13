const mix = require("laravel-mix");
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
    .purgeCss();
