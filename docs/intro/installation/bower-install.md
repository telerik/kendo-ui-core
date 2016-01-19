---
title: Bower Packages
page_title: Bower Packages | Kendo UI Getting Started
description: "Get HTML5 UI frameworks and widgets by installing Kendo UI Professional or Kendo UI Core bower package."
previous_url: /install/bower
slug: kendoui_bower_packages_kendoui_installation
position: 2
---

# Bower Packages

[Bower](http://bower.io/) is a popular package manager for the web.

Kendo UI maintains 2 bower packages, namely Kendo UI Core and Kendo UI Professional. Official releases, service packs and internal builds are uploaded to both of them.

> **Important**
>  
> Kendo UI Professional bower package is available only for **commercial license holders**. Check out the [list of Kendo UI components and their bundle support]({% slug bundle_supportfor_kendoui_components %}).

## Install Bower Packages

### Kendo UI Core

The Kendo UI Core Bower package is available as a [public Git repository](https://github.com/kendo-labs/bower-kendo-ui) and is also registered as `kendo-ui-core` in the bower registry.

###### Example

```sh
bower install kendo-ui-core
```

### Kendo UI Professional

The Kendo UI Professional Bower Package is hosted as a private Git repository. To access it, you need an active subscription for Kendo UI or DevCraft.
Bower will prompt for your username and password during the installation and update processes.

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
> During the installation of the Bower package, you may be requested to confirm your credentials more than once. For further information on hoe to store your credentials, refer to the section below.

## Credentials

### Store Your Credentials

**Option 1** In order to avoid retyping your credentials, you may cache them. The easiest way to do that is to store them as plain text in a [.netrc file](http://www.mavetju.org/unix/netrc.php).
**Option 2** A secure alternative to do the same is to use the Git credential helpers. Refer to [Stack Overflow](http://stackoverflow.com/questions/5343068/is-there-a-way-to-skip-password-typing-when-using-https-github) to follow the discussion on the topic.

### Store Credentials: Windows

> **Important**  
>
> Caching your credentials is required if you use the Kendo UI Bower Package in an ASP.NET vNext project.

**Step 1** Create a text file called `_netrc` in your home directory (e.g. `c:\users\jane\_netrc`).  
**Step 2** Declare a `HOME` environment variable.

###### Example

```
C:\> SETX HOME %USERPROFILE%
```

**Step 3** Add the credentials using the format listed above.

Git might have problems resolving your home directory if it contains spaces in its path (e.g. `c:\Documents and Settings\jane`). Therefore, update your `%HOME%` environment variable to point to a directory having no spaces in its name.

### Store Credentials: Linux, OS X and Unix-Like Systems

**Step 1** Create a file called `.netrc` in your home directory (`~/.netrc`). Make sure you modify the file permissions to make it readable only to you.

###### Example

```sh
touch ~/.netrc
chmod 0600 ~/.netrc
```

**Step 2** Add your credentials to the `~/.netrc` file using the format listed in the example below.

###### Example

```
machine bower.telerik.com
    login my-telerik.identity@example.com
    password mysecret
```

## Troubleshooting

### SSL Problem on Windows

Bower on Windows has troubles installing the repository showing the error message:

```
fatal: unable to access 'https://bower.telerik.com/bower-kendo-ui.git/': SSL certificate problem: unable to get local issuer certificate
```

The cause of this issue is the underlying Git installation is missing the certificate bundle.

**Solution** To resolve the issue, follow the steps in this [help article](http://blogs.msdn.com/b/phkelley/archive/2014/01/20/adding-a-corporate-or-self-signed-certificate-authority-to-git-exe-s-store.aspx).

> **Important**  
> * 1.9.5 Git build will not work with the Bower package.
> * When using @ symbol in the url for accessing the Kendo UI Bower repository (due to network restrictions or admin rules, for instance), make sure you encode it as follows: `https://firstname.lasname**%40**domain.com@bower.telerik.com/bower-kendo-ui.git`.

### Restore Packages in Visual Studio 2015

The Git client bundled in Visual Studio is unable to authenticate with our Bower repository. You can get an error message such as:

```
ECMDERR Failed to execute "git ls-remote --tags --heads https://bower.telerik.com/bower-kendo-ui.git", exit code of #-532462766
```

**Solution** Use a Windows port of Git and stored credentials instead of the built-in client.

1. Setup [stored credentials](#store-credentials-windows)
1. Install [Git for Windows](https://git-for-windows.github.io/)
1. Right click on Bower folder under Dependencies
1. Select `Configure external tools`
1. Uncheck `$(DevEnvDir)\Extensions\Microsoft\Web Tools\External\git`
1. Add a new entry `C:\Program Files\Git\bin` (or your installation location)

**Figure 1. Add a new entry**

![Chart in IE](/images/vs2015-external-tools.png)

## See Also

Other articles on getting started with Kendo UI:

* [Get Started with Kendo UI]({% slug getting_started_installation_kendoui %})
* [Kendo UI CDN Services]({% slug kendoui_cdn_services_installation %})
* [Include Only What You Need]({% slug include_only_what_you_need_kendoui_installation %})
* [JavaScript Prerequisites]({% slug javascript_prerequisites_kendoui_installation %})
* [Initialize Widgets Using jQuery Plug-Ins]({% slug initialize_widgets_using_jquery_plugins_installation %})
* [Initialize Widgets Using Markup]({% slug initialize_widgets_using_markup_installation %})
* [Access Widget DOM Elements: wrapper and element]({% slug widgetwrapperandelement_references_gettingstarted %})
* [Set Data Attributes]({% slug dataattributes_configuration_installation %})
* [Widget Methods and Events]({% slug widget_methodsand_events_kendoui_installation %})
* [Destroy Widgets]({% slug destroywidgets_kendoui_gettingstarted %})
* [Create Custom Widgets]({% slug createcustomkendouiwidgets_gettingstarted %})
