# Custom modules

---

<!-- TOC -->

-   [Custom modules](#custom-modules)
    -   [Creating](#creating)
    -   [Usage](#usage)

<!-- TOC -->

---

We recommend separating code into modules. You can put all files, styles, and UI components into a
custom module folder and import the module in WebAPP. Also, you can manage the import of your module
assets via the `app/src/config/modules.config.js` file.

## Creating

To create a custom module, please follow the guidelines outlined in the
[Module Structure](application-structure.md#module-structure) documentation.

## Usage

Working with custom modules:

-   add a new folder to `@/custom-modules` folder
-   add the custom module name to the list in `app/src/custom-modules/index.ts` file

```javascript
const customModules: string[] = ['module-name'];

export default customModules;
```

-   add the custom module name to the list in `app/src/config/modules.config.js` file, for the
    module initialization in `WebApp` (if your module not switching from API - `lenderkit-server`)

```javascript
export default [
    //module-name-lines-begin
    'module-name',
    //module-name-lines-end
];
```
