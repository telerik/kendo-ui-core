---
title: NPM Packages
page_title: NPM Packages | Kendo UI Getting Started
description: "Install Kendo UI Core and Kendo UI Professional as NPM packages."
slug: kendoui_npm_packages_kendoui_installation
position: 3
---

# NPM Packages

The [Node Package Manager (NPM)](http://npmjs.com/) is a popular JavaScript package manager.

The article assumes that you are familiar with the necessary steps to use browser-based libraries from NPM. Some of the tools that address this issue are Browserify, Webpack, and SystemJS.

For more information on possible setups, refer to the [sample repository on GitHub](https://github.com/telerik/kendo-ui-npm-example).

## Overview

Kendo UI maintains 2 NPM packages:
* [Kendo UI Core](#kendo-ui-core)
* [Kendo UI Professional](#kendo-ui-professional)

Official releases, service packs, and internal builds are published for each package.

> **Important**
> * The Kendo UI Professional NPM package is available only for commercial license holders. For more information, refer to the [list of Kendo UI components and their bundle support]({% slug bundle_supportfor_kendoui_components %}).
> * The package is not accessible for trial user accounts.

## Kendo UI Core

The Kendo UI Core NPM Package is published as [`kendo-ui-core`](https://www.npmjs.com/package/kendo-ui-core) on [http://npmjs.com/](http://npmjs.com/).

The package is accessible without credentials.

###### Example

```sh
npm install --save kendo-ui-core
```

## Kendo UI Professional

The Kendo UI Professional NPM Package, named `@progress/kendo-ui` is available at the Progress NPM registry.

### Installation

1. Access the Progress NPM registry. To do so, you need an *Telerik account with active commercial license*.

    > * Check the [scoped packages section](https://docs.npmjs.com/misc/scope) in the NPM documentation for more information about npm scopes and how they work.
    > * Note that the Progress NPM registry is designed to work as a scoped registry. This means that if you set it as a main registry by mistake, the access to the official registry (https://registry.npmjs.org/) will be blocked.

2. Enable the Progress NPM registry on your machine by associating the `@progress` scope with the registry URL. Run the following command in your terminal:

    <pre><code class="language-sh">npm login --registry={{site.registry_url}} --scope=@progress</code></pre>

3. Enter the username (if the username is an email address, use everything before the `@`) and password you use to log in your Telerik account as NPM will ask you for your Telerik account credentials and an email. The login name will be ignored.

4. Verify that the code works. If the command has passed successfully, you should be able to install the Kendo UI NPM packages. Verify this by querying the versions of the package:

    ```sh
    npm view @progress/kendo-ui versions
    ```

    The output should be something like this (json):

    ```js
    [ '2017.1.118' ]
    ```

    ###### Example

    ```sh
    npm install --save @progress/kendo-ui
    ```

> **Important**
>
> The scripts in the NPM package are not usable in the browser. To work around this issue, use a bundler such as [WebPack]({% slug webpacksupport_integration_kendoui %}).

### Legacy Package (Git Repo)

The legacy `kendo` package, accessible through **git+https://bower.telerik.com/npm-kendo-ui/npm-kendo.git**, will not be updated after May 2017. The repository itself will remain active.

### Authenticating Build Agents

Your credentials can be used to authenticate build agents running on Travis CI, Visual Studio Team Services, and others.

After logging in, the `~/.npmrc` (on Windows - `%HOMEDRIVE%%HOMEPATH%\.npmrc`) will be populated with an authentication token that can be copied to build agents.

> The token will remain valid until you execute `npm logout --scope=@progress` or until your license expires.

#### Travis CI

You can add the following `.travis.yml` configuration to populate your `.npmrc` file:

```yaml
before_install:
  - echo "@progress:registry=https://registry.npm.telerik.com/" > .npmrc
  - echo "//registry.npm.telerik.com/:_authToken=\"$PROGRESS_REGISTRY_TOKEN\"" >> .npmrc
```

Here `PROGRESS_REGISTRY_TOKEN` is an environment variable set in the [project configuration](https://docs.travis-ci.com/user/environment-variables/#Defining-Variables-in-Repository-Settings) or [as an encrypted variable](https://docs.travis-ci.com/user/environment-variables/#Defining-encrypted-variables-in-.travis.yml).

#### Visual Studio Team Services

You can authenticate directly on the build machine or [store the `npmrc` file per-project](https://www.visualstudio.com/en-us/docs/package/npm/npmrc#project-vs-user-configuration).

## Troubleshooting

This section provides solutions for common issues you might encounter while installing the Kendo UI NPM packages.

### The jQuery Module Is Not Found

It is possible during the installation process to see the following error:

```
Error: Cannot find module 'jquery' from '/Users/bernhard/Documents/JavaScriptDevelopment/kendo-ui-npm-example/javascript-browserify'
```

The most probable cause of this issue is the usage of an old NPM version.

**Solution**

Use an NPM ^3.0.0 version.

## See Also

Other articles on getting started with Kendo UI:

* [Get Started with Kendo UI]({% slug getting_started_installation_kendoui %})
* [Kendo UI CDN Services]({% slug kendoui_cdn_services_installation %})
* [Kendo UI Bower Packages]({% slug kendoui_bower_packages_kendoui_installation %})
* [NuGet Packages]({% slug kendoui_nuget_packages %})
