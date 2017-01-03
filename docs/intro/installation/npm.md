---
title: NPM Packages
page_title: NPM Packages | Kendo UI Getting Started
description: "Install Kendo UI Core and Kendo UI Professional as NPM packages."
slug: kendoui_npm_packages_kendoui_installation
position: 3
---

# NPM Packages

The [Node Package Manager (NPM)](http://npmjs.com/) is a popular JavaScript package manager for Node.js which eventually got repurposed for the browser context.

The article assumes that you are familiar with the necessary steps to use browser-based libraries from NPM. Some of the tools that address this issue are Browserify, Webpack, and SystemJS.

For more information on possible setups, refer to the [sample repository on GitHub](https://github.com/telerik/kendo-ui-npm-example).

## Overview

Kendo UI maintains 2 NPM packages:
* Kendo UI Core.
* Kendo UI Professional.

All official releases, service packs, and internal builds are uploaded to both of them.

> **Important**
> * The Kendo UI Professional NPM package is available only for commercial license holders. For more information, refer to the [list of Kendo UI components and their bundle support]({% slug bundle_supportfor_kendoui_components %}).
> * The package is not accessible for trial user accounts.

## Installation

The Kendo UI Core NPM package is available as a public resource while the Kendo UI Professional NPM package&mdash;as a private one.

### Kendo UI Core

The Kendo UI Core NPM Package is published as [`kendo-ui-core`](https://www.npmjs.com/package/kendo-ui-core) on [http://npmjs.com/](http://npmjs.com/).

###### Example

```sh
npm install --save kendo-ui-core
```

### Kendo UI Professional

The Kendo UI Professional NPM Package, named `kendo`, is hosted on a private Git repository. To access the package, you need an active subscription for Kendo UI or DevCraft.

> **Important**
> * The Git repository as an NPM endpoint is a temporary solution. Kendo UI are working on a private NPM registry setup, which is expected to be available with the 2017 R1 release.
> * The credentials in the URL have to be encoded&mdash;for example, `@` becomes `%40`, `#` becomes `%23`, and so on.
> * Verify that you have a `package.json` file in the preferred directory for installation. For more information on how to install an NPM package from Git, refer to the [npm install](https://docs.npmjs.com/cli/install) documentation.

```sh
username: johndoe@example.com
password: johndoe#1

npm install --save git+https://johndoe%40example.com:johndoe%231@bower.telerik.com/npm-kendo-ui.git
```

Optionally, specify a version. The first available is the **2016.2.607 (2016 Q2 SP1)** one.

## Credentials

To avoid embedding the credentials in the URL, you can preserve them for a future reference.

### Choose Storage Options

**Option 1** Cache your credentials by storing them as plain text in a [.netrc file](http://www.mavetju.org/unix/netrc.php).

**Option 2** Store your credentials by using the Git credential helpers. For detailed information on how to do this, refer to Stack Overflow and follow the discussion on [skipping the password typing](http://stackoverflow.com/questions/5343068/is-there-a-way-to-skip-password-typing-when-using-https-github).

### Store on Windows

> **Important**
>
> Caching your credentials is required if you use the Kendo UI NPM Package in an ASP.NET vNext project.

**Step 1** Create a text file called `_netrc` in your home directory&mdash;for example, `c:\users\jane\_netrc`..

**Step 2** Declare a `HOME` environment variable.

###### Example

```
C:\> SETX HOME %USERPROFILE%
```

**Step 3** Add the credentials using the format demonstrated in the following example.

If your home directory contains spaces in its path, Git might have problems resolving it&mdash;for example, `c:\Documents and Settings\jane`. That is why you need to update your `%HOME%` environment variable to point to a directory and have no spaces in its name.

### Store on Linux, OS X, and Unix-Like Systems

**Step 1** In your home directory, create a file called `.netrc` (`~/.netrc`). Verify that you modify the file permissions to make it readable only to you.

###### Example

```sh
touch ~/.netrc
chmod 0600 ~/.netrc
```

**Step 2** Add your credentials to the `~/.netrc` file using the format demonstrated in the following example.

###### Example

```
machine bower.telerik.com
    login my-telerik.identity@example.com
    password mysecret
```

## Troubleshooting

This section provides solutions for common issues you might encounter while installing the Kendo UI NPM packages.

### SSL Issue Arises on Windows

Bower on Windows has troubles installing the repository and shows the following error message:

```
fatal: unable to access 'https://bower.telerik.com/npm-kendo-ui.git/': SSL certificate problem: unable to get local issuer certificate
```

The cause of this issue is that the underlying Git installation is missing the certificate bundle.

**Solution**

Follow the steps in [this help article](http://blogs.msdn.com/b/phkelley/archive/2014/01/20/adding-a-corporate-or-self-signed-certificate-authority-to-git-exe-s-store.aspx).

> **Important**  
> * The 1.9.5 Git build does not work with the Bower package.
> * If you need to use the `@` symbol in the URL for accessing the Kendo UI Bower repository because of network restrictions or admin rules, for example, make sure you encode it as `https://firstname.lasname**%40**domain.com@bower.telerik.com/bower-kendo-ui.git`.

### Restore Fails in ASP.NET Core MVC RC Projects in Visual Studio 2015

The Git client, bundled in Visual Studio, is unable to authenticate with the Kendo UI Bower repository and shows an error messages similar to `ECMDERR Failed to execute "git ls-remote --tags --heads https://bower.telerik.com/npm-kendo-ui.git", exit code of #-532462766`.

**Solution**

Use a Windows port of Git and your stored credentials instead of the built-in client.

1. Store your [credentials](#store-credentials-windows).
1. Install [Git for Windows](https://git-for-windows.github.io/).
1. Right-click the **NPM** folder under **Dependencies**.
1. Select **Configure external tools**.
1. Uncheck `$(DevEnvDir)\Extensions\Microsoft\Web Tools\External\git`.
1. Add a new entry `C:\Program Files\Git\bin` or your installation location.

**Figure 1. Add a new entry**

![External Tools](/images/vs2015-external-tools.png)

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
