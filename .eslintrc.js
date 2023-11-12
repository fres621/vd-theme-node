module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    extends: "eslint:recommended",
    overrides: [
        {
            env: {
                node: true,
            },
            files: [".eslintrc.{js,cjs}"],
            parserOptions: {
                sourceType: "script",
            },
        },
    ],
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
    },
    plugins: [
        "import", // Add this line to enable the import plugin
    ],
    rules: {
        "import/named": "warn", // Add this line to enable the import/named rule with a warning level
        // Other rules can be added or modified as needed
    },
};
