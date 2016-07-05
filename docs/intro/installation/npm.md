---
title: NPM Packages
page_title: NPM Packages | Kendo UI Getting Started
description: "Install Kendo UI Core and Kendo UI Professional as NPM packages."
slug: kendoui_npm_packages_kendoui_installation
position: 3
---

# NPM Packages

[NPM](http://npmjs.com/) (Node Package Manager) is a popular JavaScript package manager for Node.js which eventually got repurposed for the browser context.

The article assumes that you are familiar with the necessary steps to use browser-based libraries from NPM. Browserify, Webpack and SystemJS are few of the tools that address this. A [sample repository that showcases few possible setups is available in GitHub](https://github.com/telerik/kendo-ui-npm-example).

Kendo UI maintains two NPM packages&mdash;Kendo UI Core and Kendo UI Professional. Official releases, service packs, and internal builds are uploaded to both of them.

> **Important**
> * The Kendo UI Professional NPM package is available only for _commercial license holders_. Check out the [list of Kendo UI components and their bundle support]({% slug bundle_supportfor_kendoui_components %}).
> * The package is not accessible for _trial user accounts_.

## Install NPM Packages

### Kendo UI Core

The Kendo UI Core Package is published as [`kendo-ui-core`](https://www.npmjs.com/package/kendo-ui-core) in [http://npmjs.com/](http://npmjs.com/).

###### Example

```sh
npm install --save kendo-ui-core
```

### Kendo UI Professional

> **Important**
>
> The Git repository as an NPM endpoint is a _temporary solution_. Kendo UI are working on a private NPM registry setup, which is expected to be available by the end of 2016.

The Kendo UI Professional NPM Package, named `kendo`, is hosted on a private Git repository. To access the package, you need an _active subscription_ for Kendo UI or DevCraft.

```sh
npm install --save \
'git+https://my.telerik.identity%40example.com:mypassword@bower.telerik.com/npm-kendo-ui.git'
```

> **Important**
>
> The credentials in the URL must be encoded&mdash;for example, `@` becomes `%40`.

Optionally, specify a version. The first available is _2016.2.607_ (2016 Q2 SP1).

```sh
npm install --save \
'git+https://my.telerik.identity%40example.com:mypassword@bower.telerik.com/npm-kendo-ui.git#2016.2.607'
```

For more information on how to install an NPM package from Git, refer to the [npm install](https://docs.npmjs.com/cli/install) documentation.

## Credentials

### Storage Options

**Option 1** To avoid embedding the credentials in the URL, cache them. The easiest way to do that is to store them as plain text in a [.netrc file](http://www.mavetju.org/unix/netrc.php).

**Option 2** Store your credentials by using the Git credential helpers. For detailed information on how to do this, refer to Stack Overflow and [follow the discussion](http://stackoverflow.com/questions/5343068/is-there-a-way-to-skip-password-typing-when-using-https-github).

### Store on Windows

> **Important**  
>
> Caching your credentials is required if you use the Kendo UI NPM Package in an ASP.NET vNext project.

**Step 1** Create a text file called `_netrc` in your home directory (e.g. `c:\users\jane\_netrc`).  

**Step 2** Declare a `HOME` environment variable.

###### Example

```
C:\> SETX HOME %USERPROFILE%
```

**Step 3** Add the credentials using the format in the example above.

Git might have problems resolving your home directory if it contains spaces in its path&mdash;for example, `c:\Documents and Settings\jane`). Therefore, update your `%HOME%` environment variable to point to a directory having no spaces in its name.

### Store on Linux, OS X, and Unix-Like Systems

**Step 1** Create a file called `.netrc` in your home directory (`~/.netrc`). Make sure you modify the file permissions to make it readable only to you.

###### Example

```sh
touch ~/.netrc
chmod 0600 ~/.netrc
```

**Step 2** Add your credentials to the `~/.netrc` file using the format from the example below.

###### Example

```
machine bower.telerik.com
    login my-telerik.identity@example.com
    password mysecret
```

## Troubleshooting

### SSL Problem on Windows

Bower on Windows has troubles installing the repository and shows the following error message:

```
fatal: unable to access 'https://bower.telerik.com/npm-kendo-ui.git/': SSL certificate problem: unable to get local issuer certificate
```

The cause of this issue is that the underlying Git installation is missing the certificate bundle.

**Solution**

To resolve the issue, follow the steps in this [help article](http://blogs.msdn.com/b/phkelley/archive/2014/01/20/adding-a-corporate-or-self-signed-certificate-authority-to-git-exe-s-store.aspx).

> **Important**  
> * The 1.9.5 Git build does not work with the Bower package.
> * When using the `@` symbol in the URL for accessing the Kendo UI Bower repository&mdash;because of network restrictions or admin rules, for example&mdash;make sure you encode it as `https://firstname.lasname%40domain.com@bower.telerik.com/npm-kendo-ui.git`.

### Restore Fails in ASP.NET Core MVC RC Projects in Visual Studio 2015

The Git client, bundled in Visual Studio, is unable to authenticate with the Kendo UI Bower repository and shows an error messages similar to `ECMDERR Failed to execute "git ls-remote --tags --heads https://bower.telerik.com/npm-kendo-ui.git", exit code of #-532462766`.

**Solution**

Use a Windows port of Git and your stored credentials instead of the built-in client.

1. Set up [stored credentials](#store-credentials-windows).
1. Install [Git for Windows](https://git-for-windows.github.io/).
1. Right-click the **NPM** folder under **Dependencies**.
1. Select **Configure external tools**.
1. Uncheck `$(DevEnvDir)\Extensions\Microsoft\Web Tools\External\git`.
1. Add a new entry `C:\Program Files\Git\bin`, or your installation location.

**Figure 1. Add a new entry**

![External Tools](/images/vs2015-external-tools.png)

## See Also

Other articles on getting started with Kendo UI:

* [Get Started with Kendo UI]({% slug getting_started_installation_kendoui %})
* [Kendo UI CDN Services]({% slug kendoui_cdn_services_installation %})
* [Kendo UI Bower Packages]({% slug kendoui_bower_packages_kendoui_installation %})
* [NuGet Packages]({% slug kendoui_nuget_packages %})
