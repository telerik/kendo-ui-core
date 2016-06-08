---
title: Bower Packages
page_title: Bower Packages | Kendo UI Getting Started
description: "Install the Kendo UI Professional or Kendo UI Core Bower package."
previous_url: /install/bower
slug: kendoui_bower_packages_kendoui_installation
position: 2
---

# Bower Packages

[Bower](http://bower.io/) is a popular package manager for the web.

Kendo UI maintains two bower packages, namely Kendo UI Core and Kendo UI Professional. Official releases, service packs and internal builds are uploaded to both of them.

> **Important**
>  
> The Kendo UI Professional Bower package is available only for _commercial license holders_. Check out the [list of the Kendo UI components and their bundle support]({% slug bundle_supportfor_kendoui_components %}).

## Install Bower Packages

### Kendo UI Core

The Kendo UI Core Bower package is available as a [public Git repository](https://github.com/kendo-labs/bower-kendo-ui) and is also registered as `kendo-ui-core` in the Bower registry.

###### Example

```sh
bower install kendo-ui-core
```

### Kendo UI Professional

The Kendo UI Professional Bower Package is hosted on a private Git repository. To access the package, you need an active your subscription for Kendo UI or DevCraft. Bower prompts you to enter your username and password during the installation and update processes.

###### Example

```sh
bower install https://bower.telerik.com/bower-kendo-ui.git
```

You can also add the package to the `bower.json` file.

###### Example

```json
"dependencies": {
"kendo-ui": "https://bower.telerik.com/bower-kendo-ui.git#~{{ site.cdnVersion }}"
}
```

> **Important**  
>
> During the installation of the Bower package, you might be requested to confirm your credentials more than once. For further information on how to store your username and password, see the next section.

## Credentials

### Storage Options

**Option 1** To avoid retyping your credentials, cache them. The easiest way to do that is to store them as plain text in a [.netrc file](http://www.mavetju.org/unix/netrc.php).

**Option 2** Store your credentials by using the Git credential helpers. For detailed information on how to do this, refer to Stack Overflow and [follow the discussion](http://stackoverflow.com/questions/5343068/is-there-a-way-to-skip-password-typing-when-using-https-github).

### Store on Windows

> **Important**  
>
> Caching your credentials is required if you use the Kendo UI Bower package in an ASP.NET vNext project.

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
fatal: unable to access 'https://bower.telerik.com/bower-kendo-ui.git/': SSL certificate problem: unable to get local issuer certificate
```

The cause of this issue is that the underlying Git installation is missing the certificate bundle.

**Solution**

To resolve the issue, follow the steps in this [help article](http://blogs.msdn.com/b/phkelley/archive/2014/01/20/adding-a-corporate-or-self-signed-certificate-authority-to-git-exe-s-store.aspx).

> **Important**  
> * The 1.9.5 Git build does not work with the Bower package.
> * When using the `@` symbol in the URL for accessing the Kendo UI Bower repository&mdash;because of network restrictions or admin rules, for example&mdash;make sure you encode it as `https://firstname.lasname**%40**domain.com@bower.telerik.com/bower-kendo-ui.git`.

### Restore Fails in ASP.NET Core MVC RC Projects in Visual Studio 2015

The Git client, bundled in Visual Studio, is unable to authenticate with the Kendo UI Bower repository and shows an error messages similar to `ECMDERR Failed to execute "git ls-remote --tags --heads https://bower.telerik.com/bower-kendo-ui.git", exit code of #-532462766`.

**Solution**

Use a Windows port of Git and your stored credentials instead of the built-in client.

1. Set up [stored credentials](#store-credentials-windows).
1. Install [Git for Windows](https://git-for-windows.github.io/).
1. Right-click the **Bower** folder under **Dependencies**.
1. Select **Configure external tools**.
1. Uncheck `$(DevEnvDir)\Extensions\Microsoft\Web Tools\External\git`.
1. Add a new entry `C:\Program Files\Git\bin`, or your installation location.

**Figure 1. Add a new entry**

![Chart in IE](/images/vs2015-external-tools.png)

## See Also

Other articles on getting started with Kendo UI:

Other articles on getting started with Kendo UI:

* [Get Started with Kendo UI]({% slug getting_started_installation_kendoui %})
* [Kendo UI CDN Services]({% slug kendoui_cdn_services_installation %})
* [Kendo UI NPM Packages]({% slug kendoui_npm_packages_kendoui_installation %})
* [NuGet Packages]({% slug kendoui_nuget_packages %})
