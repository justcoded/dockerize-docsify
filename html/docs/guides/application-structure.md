# Application Structure

---

<!-- TOC -->

-   [Application Structure](#application-structure)
    -   [WebAPP Starter Structure](#webapp-starter-structure)
        -   [Root level](#root-level)
        -   [Application level](#application-level)
        -   [Main Source Level](#main-source-level)
    -   [Module Structure](#module-structure)
        -   [Core Module Structure](#core-module-structure)
        -   [Custom Module Structure](#custom-module-structure)

<!-- TOC -->

---

## WebAPP Starter Structure

There are 2 terms in this document: [Root level](#root-level) and
[Application level](#application-level). Please take your attention on the scheme below:

### Root level

The organization of the application folders is following:

```
.
├── app/                         # Application root level
├── bin/                         # Project setup helper scripts and Makefile includes
├── build/                       # Development Docker and CI configuration
├── configs/                     # Nginx and SSL configurations
├── docker/                      # Docker image configuration for alternative setup via Docker container registry
├── docs/                        # Detailed documentation
├── runtime/                     # Temporary files and Docker container storage volumes
├── .dockerignore                # List of files/directories to exclude when building a Docker image
├── .editorconfig                # Coding styles and settings for code editors
├── .env.example                 # Example root-level environment configuration
├── .gitignore                   # Specifies intentionally untracked files that Git should ignore
├── .npmrc                       # Overrides the default NPM settings
├── .prettierrc.json             # Configuration file for Prettier
├── CHANGELOG.md                 # Changelog file
├── Makefile                     # Root-level Make helper
├── README.md                    # Guide on how to start your project
├── docker-compose.example.yml   # Example Docker Compose container configuration files
└── package.json                 # Configuration file for NPM

```

### Application level

```
app/
├── build/                       # Project installation helper scripts
├── dist/                        # Folder for compiled files
├── public/                      # Contains static resources
│   └── {assets}                 # Assets for WebAPP Starter. Includes fonts, images, sitemap styles, etc.
│   └── modules/                 # List of folders for module assets
│       └── {module-name}        # Assets from the module's public folder
├── src/                         # Root folder for source files
├── storage/                     # Storage folder
├── .browserslistrc              # Configuration file for sharing target browser versions between front-end tools
├── .env.example                 # Example app-level environment configuration
├── .gitignore                   # Specifies intentionally untracked files that Git should ignore
├── .npmrc                       # Overrides the default NPM settings
├── .prettierignore              # Specifies files/folders to ignore for Prettier
├── CHANGELOG.md                 # Changelog file
├── Makefile                     # App-level Make helper
├── babel.config.json            # Configuration file for Babel
├── example.tsconfig.json        # Specifies the root files and compiler options required to compile the project
├── module-replacement-list.js   # List of file paths for replacement
├── package.json                 # Metadata relevant to the project
├── package-lock.json            # Information on the installed dependencies or packages
├── webpack.common.js            # Webpack base configuration file
├── webpack.dev.js               # Webpack configuration file for development mode
└── webpack.prod.js              # Webpack configuration file for production mode

```

### Main Source Level

The `app/src/` folder is the main folder, which contains all code. It has the following structure:

```
src/                           # Root folder for source files
├── config/                    # Contains configuration files and interfaces for all global components
│   └── modules.config.js      # List of names of all active custom modules to import for WebAPP
│   └── index.ts               # File with predefined configurations for WebAPP
├── custom-modules/            # Root directory for custom module files and configurations
│   └── {module-name}/         # Folder for custom module files
│   └── index.ts               # List of names of custom modules to import for WebAPP
├── types/                     # TypeScript type declarations. Manually created for each third-party plugin that lacks its own type declaration
├── modules/                   # Contains folders for new modules
│   └── {module-name}/         # Folder for new custom module
├── workers/                   # Folder with service worker registration files
│   └── sw.ts                  # File with scope for InjectManifest Workbox Plugin
└── main.ts                    # Register aliases for custom modules on WebAPP

```

> :memo: **Note:** It is highly recommended to follow the structure of
> [Module Structure](#module-structure) in `src/` folder.

## Module Structure

LenderKit WebAPP based on module structure and provides Core module and other modules for
development. Also you can develop [Custom Module](#custom-module-structure)

### Core Module Structure

Core module provides all basic platform features (Models, Resources, Services, API classes, Styles,
UI Components),

Core module structure is a bit different from other modules, because of it's size.

```
├── api/                        # Contains classes for working with the API and a file listing the endpoints
│   └── {resource-name}.ts      # Contains the API {resource-name} class
├── app/                        # Contains root application components
│   ├── auth/                   # Authentication providers
│   ├── bootstrappers/          # List of core bootstrappers
│   ├── step-flows/             # List of step flows for registration, offering creation, etc.
│   ├── App.ts                  # App initialization file
│   ├── DashboardMenu.ts        # Class for managing the dashboard menu
│   ├── Kernel.ts               # Main entry point of the WebAPP
│   ├── PreviewMode.ts          # Class for preview mode from the backoffice theme view
│   └── ThemeResolver.ts        # Resolver for importing theme styles of different themes
├── assets/                     # Contains asset files for the WebAPP
│   └── sass/                   # Contains SCSS style files for the WebAPP
├── components/                 # Contains global reusable components with business logic
│   └── {section|component}/    # Folder for Vue {section|component}
├── config/                     # Contains configuration files and interfaces for all global components
├── constants/                  # Contains constants for the WebAPP
│   └── {entity-name}.ts        # Constants for the {entity} resource
├── docs/                       # Detailed documentation for the module
├── helpers/                    # Contains reusable helpers
├── i18n/                       # Translation files for the WebAPP
│   ├── {group-name}/           # Folder for {group-name} translation files
│   ├── en.json                 # The file contains common translations used throughout the Lenderkit web application
│   └── index.ts                # File combines multiple language files into a single bundle
├── public/                     # Optional folder. Contains assets for the module (images, fonts, etc.) [Optional Folder]
│   └── workers/                # Service worker files for the WebAPP
│       └── sw.js               # File with service worker registration
├── mixins/                     # Contains Vue mixins for quick access to frequently used data
│   └── x{MixinName}.vue        # Vue mixin file for {MixinName}
├── models/                     # Contains interfaces, getters, and setters for all models in the application
├── plugins/                    # Contains custom solutions for the WebAPP
│   ├── decorators/             # Folder with custom decorators
│   ├── directives/             # Folder with custom Vue directives
│   └── forms/                  # Folder with custom components for Vue Formulate
├── router/                     # Contains VueRouter configuration files
│   ├── middlewares/            # Middlewares for the router
│   └── routes/                 # Routes for Vue Router
│       └── {group-name}.ts     # File contains routes for {group-name} views
├── services/                   # Contains common services for the WebAPP
│   └── {service-name}/         # Folder for {service-name} files
├── store/                      # Contains Vuex store modules
│   ├── /modules                # Folder for Vuex store modules in the WebAPP
│   │   └── {module-name}/      # Vuex module folder with actions, getters, states, and mutations
│   └── index.ts                # Index file for Vuex store
├── ui/                         # Contains global reusable components without business logic
│   ├── {component-name}/       # Folder for {component-name}
│   └── {component-name}.vue    # Vue file for {component-name}
├── views/                      # Views for web app pages
│   └── {view-name}/            # Folder with a group of views for {view-name} area
├── .editorconfig               # Coding styles and settings for the code editor
├── .gitignore                  # Specifies intentionally untracked files that Git should ignore
├── .prettierrc.json            # Configuration file for Prettier
├── CHANGELOG.md                # Changelog file
├── README.md                   # Project setup guide
└── package.json                # File with dependencies and metadata for NPM

```

### Custom Module Structure

For any of LK Module the structure should be the same as for
[Core Module Structure](#core-module-structure). It is not necessary to add empty folder in your
custom module structure.

More information you can find in [Custom Modules](custom-modules.md)
