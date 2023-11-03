# Code Style

Sacramento Campaign Finance follows the following coding style guidelines.

-   Semi-colons at the end of Javascript statements.
-   4 space width tabs.
-   Spaces around Javascript objects and imports.
-   Single quotes over double quotes.
-   Javascript imports divided into sections, with a new line speperating each.
-   Multiple CSS selectors on new lines.
-   Newline between CSS rules.

### Structuring Svelte files

(TBD) I think Svelte files should be flexible, and we should be lax on styling rules.
Prettier does not support .svelte files out of the box.

### Structuring CSS .css file imports

CSS should include a newline between each rule.

Multiple selectors in the same rule should be placed on their own line (Prettier default; TBD).

```css
html,
body,
div.content {
    width: 100%;
}

my-class {
    display: flex;
}
```

### Structuring Javascript .js file styling and import format

Javascript .js files, not javascript in .svelte, should follow the following format with importing libraries. They
should include a new line between each of the three import sections, defined below.

```javascript
// First, add core and third-party libraries
import {error} from '@sveltejs/kit';
import {rollup, sum} from 'd3-array';

// Second, add local files
import config from '$lib/../../config.js';
import createContributorId from '$lib/contributorId.js';
import {data, generated} from '$lib/data.json';

// Third, add global varialbes
const config = { thing: "thing" }

// Add functions. Always including parenthesis around function parameters, even if it's only one.
const get = () => { get('thing', (response) => { console.log(response) })}
```

When **ESLint** and **Prettier** configuration files are added to the project base directory,
they automatically take effect.
They can then be invoked with the `npm run lint` and `npm run format` commands.

> **Note:** Code linting and foratting are optional. If we included these tools by default, it could generate too many squiggly warning lines.

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
        semi: ['error', 'always']
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
