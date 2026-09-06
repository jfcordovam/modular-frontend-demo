# Modular frontend demo

A React + TypeScript + Vite shell that integrates two independently published libraries at build time. The result is one application deployment, without Module Federation or remote module servers.

All project code, UI copy, comments, sample data, and documentation are maintained in English. Dates and numbers use British English formatting; monetary values remain in euros.

## Getting started

Requires Node >=22.12.0 (tested with Node 24) and permission to read the packages from GitHub Packages.

~~~sh
npm ci
npm run dev
~~~

The shell installs exact module versions from GitHub Packages. The package lock records the resolved artifacts and integrity hashes, so npm ci reproduces the selected combination.

## Features

- Overview: displays the actual versions exported by the installed packages.
- Products: sample catalog with search and category filtering.
- Transactions: list, filter, record income or expenses, and calculate the balance in integer cents.
- Hash navigation: supports direct links and browser back/forward without server rewrite rules.
- Modules remain mounted during navigation. New transactions remain available until the page is reloaded. All data is in memory, with no API, authentication, or persistence.

## Structure

~~~text
modular-frontend-demo/
  src/modules.ts       # Explicit module registry and package imports
  src/App.tsx          # Navigation, composition, and error boundary
mfe-demo-products/     # Independent source repository and npm package
mfe-demo-transactions/ # Independent source repository and npm package
~~~

The projects do not use workspaces, local package archives, or aliases to module source code. React and ReactDOM are peerDependencies in the libraries and are excluded from their bundles. Each library exports a component, moduleInfo, and style.css. Module styles use distinct prefixes to prevent collisions. The shell controls which module is visible.

## Installed modules

~~~json
{
  "@jfcordovam/mfe-demo-products": "1.0.1",
  "@jfcordovam/mfe-demo-transactions": "1.0.1"
}
~~~

The project-level .npmrc maps the @jfcordovam scope to https://npm.pkg.github.com. Authentication belongs in the developer or CI environment. Never commit tokens or expose them through VITE_* variables.

## Updating a module

Publish a new version from the module repository first. For example:

~~~sh
cd ../mfe-demo-products
npm version patch --no-git-tag-version
npm publish
~~~

Then explicitly select that version in the shell:

~~~sh
cd ../modular-frontend-demo
npm install --save-exact @jfcordovam/mfe-demo-products@1.0.2
npm run versions:modules
npm run build
~~~

Products will be 1.0.2 while transactions remains at 1.0.1. Publishing a library does not update the application automatically. The package.json and package-lock.json changes should be reviewed and committed together. Never overwrite a published version; increment it. Use SemVer: patch for compatible fixes, minor for compatible features, and major for incompatible public API changes.

To restore the previous products version:

~~~sh
npm install --save-exact @jfcordovam/mfe-demo-products@1.0.1
npm run build
~~~

## Verification

~~~sh
npm ci
npm run build
npm run lint
npm run versions:modules
~~~

Manual checks: search for a missing product and clear the filters; record income and an expense, verify the balance, navigate away and back, then reload to restore the sample data.

References: [Vite library mode](https://vite.dev/guide/build#library-mode), [npm package.json](https://docs.npmjs.com/cli/v11/configuring-npm/package-json/), [GitHub npm registry](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-npm-registry).
