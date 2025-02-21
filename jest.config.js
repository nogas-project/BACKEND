/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
    testEnvironment: "node",
    transform: {
        "^.+.tsx?$": ["ts-jest",{}],
    },
    forceExit: true,
    collectCoverage: true,
    coverageReporters: ["json", "html"],
};