# Code Style

Sacramento Campaign Finance follows the following coding style guidelines.

-   Semi-colons at the end of Javascript statements.
-   4 space width tabs.
-   Spaces around Javascript objects and imports.

The project should be flexible and developer friendly. Therefor, lint and format
files are not included by default in this project. The reduces files and shows a
less squiggly warning lines in your IDE.

## ESLint

### .eslintrc.cjs

```javascript
module.exports = {
    env: {
        browser: true,
        es2021: true
    },
    extends: 'eslint:recommended',
    overrides: [
        {
            env: {
                node: true
            },
            files: ['.eslintrc.{js,cjs}'],
            parserOptions: {
                sourceType: 'script'
            }
        }
    ],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
    },
    rules: {
        indent: ['error', 4],
        'object-curly-spacing': ['error', 'always'],
        'linebreak-style': ['error', 'unix'],
        quotes: ['error', 'single'],
        semi: ['error', 'never']
    }
};
```

## Prettier

### .prettierignore

```gitignore
data/
prisma/
tmp/
node_modules/
src/lib/data.json

# Ignore artifacts:
build
coverage

# Ignore all HTML files:
**/*.html

# Default options
**/.git
**/.svn
**/.hg
**/node_modules
**/.git
**/.svn
**/.hg
```

### .prettierrc

```javascript
// prettier.config.js, .prettierrc.js, prettier.config.cjs, or .prettierrc.cjs
{
    "semi": true,
    "singleQuote": true,
    "trailingComma": "none",
    "proseWrap": "always",
    "useTabs": false,
    "bracketSpacing": true,
    "tabWidth": 4,
    "plugins": ["prettier-plugin-organize-imports"]
}


module.exports = config;
```

### Run Prettier from the command line

You can specify the path to format and add the `-w` flag to write the file
in-place.

> Be careful when using the -w flag. It will overwrite files.

```sh
prettier . --write
```

A more complicated example.

```sh
prettier docs package.json "{app,__{tests,mocks}__}/**/*.js" --write --single-quote --trailing-comma all
```
