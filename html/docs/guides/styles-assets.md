# Styles & Assets Usage

---

<!-- TOC -->

-   [Styles & Assets Usage](#styles--assets-usage)
    -   [Styles Common Information](#styles-common-information)
        -   [Replace the Style File](#replace-the-style-file)
        -   [Add New Style File](#add-new-style-file)
    -   [Assets](#assets)

<!-- TOC -->

---

## Styles Common Information

WebAPP has various themes that could be imported in APP. Import for basic and vendors styles is
declared inside the load-settings bootstrapper `core/app/bootstrappers/load-settings.ts`

More information about bootstrappers you can find in
[Bootstrappers Documentation](/code-guides/basics/bootstrappers.md).

```js
  async beforeBoot(App: any): Promise<void> {
    await import('@lk-core/assets/sass/vendors/vendors.scss');
    await import('@lk-core/assets/sass/main.scss');
```

Also, unique theme styles import via `core/app/ThemeResolver.ts`

```javascript
export default class ThemeResolver {
  public static async resolveStyles(themeName: string): Promise<void> {
    switch (themeName) {
      case 'business': {
        await import('@lk-core/assets/sass/themes/business/app.scss');
        break;
      }
      case 'millennial': {
        await import('@lk-core/assets/sass/themes/millennial/app.scss');
        break;
      }
      case 'startup': {
        await import('@lk-core/assets/sass/themes/startup/app.scss');
        break;
      }
      default: {
        break;
      }
    }
  }
}
```

### Replace the Style File

Using [File Replacer](guides/file-replacer.md) you can replace any of the style files. For example,
the main entry point for styles `@lk-core/assets/sass/main.scss` just put the file path in the
Module replacement list - `./app/module-replacement-list.js`

```js
[['@lk-core/assets/sass/main.scss', '@/assets/sass/main.scss']];
```

### Add New Style File

Using [File Replacer](file-replacer.md) you can replace the bootstraper file or theme resolver.

In case of replacing bootstrapper file `core/app/bootstrappers/load-settings.ts` you can just add
the path to your new style file:

```js
async beforeBoot(App: any): Promise<void> {
await import('@lk-core/assets/sass/vendors/vendors.scss');
await import('@lk-core/assets/sass/main.scss');

await import('@/assets/sass/main.scss'); // Your additonal style file
```

:memo: **Note:** Also, you can remove all imports for styles in Bootstrapper but be careful, it
would remove all default styles for WebAPP Core.

---

In case of replacing theme resolver file `core/app/ThemeResolver.ts` you can just add the path to
your new style file:

```js
export default class ThemeResolver {
    public static async resolveStyles(): Promise<void> {
        await import('@lk-core/assets/sass/themes/business/app.scss');

        await import('@/assets/sass/main.scss'); // Your additonal style file
    }
}
```

:memo: **Note:** WebAPP receives themes configuration and variables from Settings via API. Themes
customizer provides functionality to customize through backoffice.

## Assets

Any static assets must be placed in the `public` folder at the root of the module, they will simply
be copied and not go through compilers. You need to reference them using absolute paths.

If assets placed:

-   in the project `starter`, absolute paths will be formed like this - `/images/sample-image.jpg`
-   in any module, absolute paths will be formed like this -
    `/modules/{module-alias}/images/sample-image.jpg`

The public directory is provided as an escape hatch, and when you reference it via the absolute
path, you need to take into account where your app will be deployed.

When to use the public assets folder:

-   You have images and need to dynamically reference their paths.
-   Some libraries may be incompatible with SDK and you have no other option but to include it as a
    `<script>` tag.
-   Something like the previous one

**_Example_**

File placing in repo: `/public/images/coins.svg`

File placing by an absolute path from browser:

```pug
img(src="/modules/example/images/coins.svg" alt="coins")
```
