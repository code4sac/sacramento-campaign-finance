# Code Style

Sacramento Campaign Finance follows the following coding style guidelines.

-   Semi-colons at the end of Javascript statements.
-   4 space width tabs.
-   Spaces around Javascript objects and imports.

When **ESLint** and **Prettier** configuration files are added to the project base directory,
they automatically take effect.
They can then be invoked with the `npm run lint` and `npm run format` commands.

> **Note:** Code style is optional. If we included these tools by default, it could generate too many squiggly warning lines.

## Linting

Use [ESLint](https://eslint.org/) to check for errors and warnings.

#### .eslintrc.cjs

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

## Formatting

Use [Prettier](https://prettier.io/) to automatically reformat code.
Start by adding a `.prettierignore` file and then add options to a `.prettierrc` file.

> **Note:** Prettier does not recognize .svelte files. You can try to format it with other tools provided by your editor.

#### .prettierignore

```gitignore
data/
prisma/
tmp/
node_modules/
src/lib/data.json
package.json
package-lock.json

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

#### .prettierrc

```json
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
