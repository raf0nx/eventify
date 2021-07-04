const { pathsToModuleNameMapper } = require("ts-jest/utils");
const { compilerOptions } = require("./tsconfig");

module.exports = {
    testRegex: "resources/js/tests/.*.spec.ts$",
    moduleFileExtensions: ["js", "json", "vue", "ts"],
    transform: {
        "^.+\\.js$": "<rootDir>/node_modules/babel-jest",
        ".*\\.(vue)$": "<rootDir>/node_modules/vue-jest",
        "^.+\\.tsx?$": "ts-jest"
    },
    testEnvironment: "jsdom",
    testURL: "http://localhost/",
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
        prefix: "<rootDir>/"
    }),
    setupFiles: ["<rootDir>/resources/js/tests/setup.js"]
};
