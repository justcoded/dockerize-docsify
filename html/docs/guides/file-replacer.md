# Replacing Files

This tool allows you to replace modules (files) from `lenderkit-webapp-*` packages. It's something
similar to [monkeypatching](https://en.wikipedia.org/wiki/Monkey_patch), but for modules (files).

---

<!-- TOC -->

-   [Replacing Files](#replacing-files)
    -   [Aliases](#aliases)
    -   [Replacer Usage](#replacer-usage)
        -   [Replace the Whole File](#replace-the-whole-file)
        -   [Replace File With Inheritance](#replace-file-with-inheritance)
            -   [Override Component Lifecycle Hooks](#override-component-lifecycle-hooks)

<!-- TOC -->

---

## Aliases

WebAPP uses aliases system for paths. Not following aliases' names cause issues with type checking,
replacing files etc.

WebAPP uses next aliases:

-   `@lk-{module name}` for files from {module name} files
-   `@lk-core` for files from the core module
-   `@` for source files inside `./src/` folder

## Replacer Usage

You can replace files that:

-   file extension can be `.ts`, `.js`, `.vue`,`.json`, `.scss`
-   file import placed is in `.ts`, `.js`, `.vue` files
-   file import is static or dynamic
-   file path is written as a full static string

Your files:

-   path must be absolute

Module replacement list - `./app/module-replacement-list.js`

```js
[
    ['@lk-core/config', '@/config'],
    ['@lk-core/config/modules.config', '@/config/modules.config'],
    ['@lk-core/views/partials/Header.vue', '@/views/partials/Header.vue'],
    ['@lk-core/i18n/lang/en.json', '@/lang/common/en.json'],
    ['@lk-core/assets/sass/main.scss', '@/assets/sass/main.scss'],
];
```

### Replace the Whole File

Please, follow next steps for replacing the file:

1. Find import of components that are needed to be replaced. For example, `Header.vue` and take it
   path to import `@lk-core/views/partials/Header.vue` and put copy of file in `./src/` folder
2. Open file with path for replacer `./app/module-replacement-list.js`
3. Add a new array with two elements. The first element is the original path
   `@lk-core/views/partials/Header.vue` The second one is a path to your file
   `@/views/partials/Header.vue`. The final array would be
   `['@lk-core/views/partials/Header.vue', '@/views/partials/Header.vue'],`
4. Re-build WebAPP via the command `make npm-build` and check your changes

:rotating_light: **Warning:** Changes will affect only after WebApp would be re-built

### Replace File With Inheritance

In the project starter project you need to use alternative aliases. The next steps would be the same
as for [Example of usage](#replace-the-whole-file)

You need to use next aliases:

-   `lenderkit-webapp` instead of `@lk-core`
-   `lenderkit-webapp-module-{module name}` instead of `@lk-{module name}`

For example, `Header.vue`

```js
import vendorHeader from 'lenderkit-webapp/views/partials/Header.vue';

@Component
export default class Header extends vendorHeader {}
```

#### Override Component Lifecycle Hooks

WebAPP based on [Vue.js](https://vuejs.org/) framework using
[Vue Class Component](https://class-component.vuejs.org/).

To override component lifecycle hooks in the component's prototype nesting tree you should use
[Vue Class Component](/code-guides/advanced/plugins/decorators?id=override) custom decorator.
