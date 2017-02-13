---
title: Bower Packages
page_title: Bower Packages | Kendo UI Getting Started
description: "Install the Kendo UI Professional or Kendo UI Core Bower package."
previous_url: /install/bower
slug: kendoui_bower_packages_kendoui_installation
position: 3
---

# Bower Packages

[Bower](https://bower.io/) is a popular package manager for the web that handles frameworks, libraries, assets, and utilities.

## Overview

Kendo UI maintains 2 Bower packages:
* Kendo UI Core.
* Kendo UI Professional.

All official releases, service packs, and internal builds are uploaded to both of them.

> **Important**
>
> The Kendo UI Professional Bower package is available only for commercial license holders. For more information, refer to the [list of the Kendo UI components and their bundle support]({% slug bundle_supportfor_kendoui_components %}).

## Installation

The Kendo UI Core Bower package is available as a public Git repository while the Kendo UI Professional Bower package&mdash;as a private one.

### Kendo UI Core

The Kendo UI Core Bower package is hosted on a [public Git repository](https://github.com/kendo-labs/bower-kendo-ui) and is also registered as `kendo-ui-core` in the Bower registry.

To install the Kendo UI Core Bower package, run the following command.

###### Example

```sh
bower install kendo-ui-core
```

### Kendo UI Professional

The Kendo UI Professional Bower package is hosted on a private Git repository. To access the package, you need an active subscription for Kendo UI or DevCraft. Bower prompts you to enter your username and password during the installation and update processes.

To install the Kendo UI Professional Bower package, run the following command.

###### Example

```sh
bower install https://bower.telerik.com/bower-kendo-ui.git
```

You can also add the package to the `bower.json` file, as the following example demonstrates.

###### Example

```json
"dependencies": {
"kendo-ui": "https://bower.telerik.com/bower-kendo-ui.git#~{{ site.cdnVersion }}"
}
```

> **Important**
>
> During the installation of the Bower package, you might be requested to confirm your credentials more than once. For further information on how to store your username and password, refer to the following [section on credentials](#credentials).

## Credentials

To avoid being asked multiple times to provide your credentials while installing the Kendo UI Bower packages, you can preserve them for a future reference.

### Choose Storage Options

**Option 1** Cache your credentials by storing them as plain text in a [.netrc file](http://www.mavetju.org/unix/netrc.php).

**Option 2** Store your credentials by using the Git credential helpers. For detailed information on how to do this, refer to Stack Overflow and follow the discussion on [skipping the password typing](http://stackoverflow.com/questions/5343068/is-there-a-way-to-skip-password-typing-when-using-https-github).

### Store on Windows

> **Important**
>
> Caching your credentials is required if you use the Kendo UI Bower package in an ASP.NET vNext project.

**Step 1** Create a text file called `_netrc` in your home directory&mdash;for example, `c:\users\jane\_netrc`.

**Step 2** Declare a `HOME` environment variable.

###### Example

```
C:\> SETX HOME %USERPROFILE%
```

**Step 3** Add the credentials using the format demonstrated in the following example.

###### Example

```
machine bower.telerik.com
    login my-telerik.identity@example.com
    password mysecret
```

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

This section provides solutions for common issues you might encounter while installing the Kendo UI Bower packages.

### SSL Issue Arises on Windows

Bower on Windows has troubles installing the repository and shows the following error message:

```
fatal: unable to access 'https://bower.telerik.com/bower-kendo-ui.git/': SSL certificate problem: unable to get local issuer certificate
```

The cause of this issue is that the underlying Git installation is missing the certificate bundle.

**Solution**

Follow the steps in [this help article](http://blogs.msdn.com/b/phkelley/archive/2014/01/20/adding-a-corporate-or-self-signed-certificate-authority-to-git-exe-s-store.aspx).

> **Important**
> * The 1.9.5 Git build does not work with the Bower package.
> * If you need to use the `@` symbol in the URL for accessing the Kendo UI Bower repository because of network restrictions or admin rules, for example, make sure you encode it as `https://firstname.lasname**%40**domain.com@bower.telerik.com/bower-kendo-ui.git`.

### Restore Fails in ASP.NET Core MVC RC Projects in Visual Studio 2015

The Git client, bundled in Visual Studio, is unable to authenticate with the Kendo UI Bower repository and throws an error messages similar to `ECMDERR Failed to execute "git ls-remote --tags --heads https://bower.telerik.com/bower-kendo-ui.git", exit code of #-532462766`.

**Solution**

Use a Windows port of Git and your stored credentials instead of the built-in client:

1. Store your [credentials](#store-on-windows).
1. Install [Git for Windows](https://git-for-windows.github.io/).
1. Right-click the **Bower** folder under **Dependencies**.
1. Select **Configure external tools**.
1. Uncheck `$(DevEnvDir)\Extensions\Microsoft\Web Tools\External\git` and/or `$(VSINSTALLDIR)\Web\External\git`.
1. Add a new entry `C:\Program Files\Git\bin` or your installation location.

**Figure 1. Add a new entry**

![Chart in IE](/images/vs2015-external-tools.png)

## See Also

Other articles on getting started with Kendo UI:

* [Get Started with Kendo UI]({% slug getting_started_installation_kendoui %})
* [Kendo UI CDN Services]({% slug kendoui_cdn_services_installation %})
* [Kendo UI NPM Packages]({% slug kendoui_npm_packages_kendoui_installation %})
* [NuGet Packages]({% slug kendoui_nuget_packages %})
