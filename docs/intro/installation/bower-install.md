---
title: Installing with Bower
page_title: Installing with Bower | Download and Installation | Kendo UI for jQuery
description: "Get started with Kendo UI for jQuery and install the Kendo UI Professional or Kendo UI Core distributions by using the Bower package manager."
previous_url: /install/bower
slug: kendoui_bower_packages_kendoui_installation
position: 3
---

# Installing with Bower

[Bower](https://bower.io/) is a popular package manager for the web that handles frameworks, libraries, assets, and utilities.

Kendo UI maintains the [Kendo UI Core](#kendo-ui-core-on-bower) and the [Kendo UI Professional](#kendo-ui-professional-on-bower) Bower packages. All Kendo UI official releases, service packs, and internal builds are uploaded to both of them.

> The Kendo UI Professional Bower package is available only for commercial license holders. For more information, refer to the [list of the Kendo UI components and their bundle support]({% slug welcometo_kendoui %}#list-of-widgets).

## Kendo UI Core on Bower

The Kendo UI Core Bower package is available as a [public GitHub repository](https://github.com/kendo-labs/bower-kendo-ui) and is also registered as `kendo-ui-core` in the Bower registry. To install the Kendo UI Core Bower package, run the `bower install kendo-ui-core` command. To check the available versions of Kendo UI Core Bower package, run the `bower info kendo-ui-core --verbose` command.

## Kendo UI Professional on Bower

The Kendo UI Professional Bower package is available as a private GitHub repository. To access the package, active your subscription for Kendo UI or DevCraft. Bower prompts you to enter your username and password during the installation and update processes. To install the Kendo UI Professional Bower package, run the `bower install https://bower.telerik.com/bower-kendo-ui.git` command. To check the available versions of Kendo UI Professional Bower package, run the `bower info kendo-ui --verbose` command.

You can also add the package to the `bower.json` file.

```json
"dependencies": {
"kendo-ui": "https://bower.telerik.com/bower-kendo-ui.git#~{{ site.cdnVersion }}"
}
```

> During the installation of the Bower package, you might be requested to confirm your credentials more than once. For further information on how to store your username and password, refer to the following [section on credentials](#storing-your-credentials).

## Storing Your Credentials

To avoid being asked multiple times to provide your credentials while installing the Kendo UI Bower packages, use either of the following approaches to preserve them for a future reference:

* Cache your credentials by storing them as plain text in a [.netrc file](http://www.mavetju.org/unix/netrc.php).
* Store your credentials by using the Git credential helpers. For detailed information on how to do this, refer to Stack Overflow and follow the discussion on [skipping the password typing](http://stackoverflow.com/questions/5343068/is-there-a-way-to-skip-password-typing-when-using-https-github).

### Storing on Windows

> * Caching your credentials is required if you use the Kendo UI Bower package in an ASP.NET vNext project.
> * If your home directory contains spaces in its path (for example, `c:\Documents and Settings\jane`), Git might have problems resolving it. That is why you need to update your `%HOME%` environment variable to point to a directory and exclude any spaces in its name.

1. Create a text file called `_netrc` in your home directory&mdash;for example, `c:\users\jane\_netrc`.
1. Declare a `HOME` environment variable.

      ```
      C:\> SETX HOME %USERPROFILE%
      ```

1. Add the credentials using the format.

      ```
      machine bower.telerik.com
          login my-telerik.identity@example.com
          password mysecret
      ```

### Storing on Unix-Like Systems

1. In your home directory, create a file called `.netrc` (`~/.netrc`). Verify that you modify the file permissions to make it readable only to you.

      ```sh
      touch ~/.netrc
      chmod 0600 ~/.netrc
      ```

1. Add your credentials to the `~/.netrc` file using the format demonstrated in the following example.

      ```
      machine bower.telerik.com
          login my-telerik.identity@example.com
          password mysecret
      ```

## Troubleshooting

This section provides solutions for common issues you might encounter while installing the Kendo UI Bower packages.

### An SSL issue occurs on Windows

**Description** Bower on Windows has troubles installing the repository and shows the `fatal: unable to access 'https://bower.telerik.com/bower-kendo-ui.git/': SSL certificate problem: unable to get local issuer certificate` error message.

**Cause** The underlying Git installation is missing the certificate bundle.

**Solution** Follow the steps in [this article](https://docs.microsoft.com/en-us/archive/blogs/phkelley/adding-a-corporate-or-self-signed-certificate-authority-to-git-exes-store).

> * The 1.9.5 Git build does not work with the Bower package.
> * To use the `@` symbol in the URL for accessing the Kendo UI Bower repository (because of network restrictions or admin rules, for example), encode it as `https://firstname.lasname%40domain.com@bower.telerik.com/bower-kendo-ui.git`.

### Restore fails in ASP.NET Core MVC RC projects in Visual Studio 2015

**Description** A Git client that is bundled in Visual Studio is unable to authenticate with the Kendo UI Bower repository and throws an error messages similar to `ECMDERR Failed to execute "git ls-remote --tags --heads https://bower.telerik.com/bower-kendo-ui.git", exit code of #-532462766`.

**Solution** Use a Windows port of Git and your stored credentials instead of the built-in client:

1. Store your [credentials](#store-on-windows).
1. Install [Git for Windows](https://gitforwindows.org/).
1. Right-click the **Bower** folder under **Dependencies**.
1. Select **Configure external tools**.
1. Uncheck `$(DevEnvDir)\Extensions\Microsoft\Web Tools\External\git` and/or `$(VSINSTALLDIR)\Web\External\git`.
1. Add a new entry `C:\Program Files\Git\bin` or your installation location.

**Figure 1: Adding a new entry**

![Chart in IE](../../images/vs2015-external-tools.png)

## Next Steps

* [Create your own custom bundles]({% slug include_only_what_you_need_kendoui_installation %})
* [Learn about the widget DOM element structure]({% slug widgetwrapperandelement_references_gettingstarted %})
* [Initialize widgets as jQuery plugins]({% slug initialize_widgets_using_jquery_plugins_installation %})
* [Initialize widgets with MVVM]({% slug mvvm_initialization_kendoui %})
* [Check out the jQuery version support]({% slug jquerysupport_kendoui %})
* [Check out the web browser support]({% slug wbe_browserand_operating_system_support %})
* [Check out the operation system support]({% slug ossupport_kendo %})
* [Check out the PDF and Excel export support]({% slug export_support_kendoui %})
* [Explore the widget script dependencies]({% slug script_filesfor_barcodes_widgets %})
* [Create your own custom widgets]({% slug createcustomkendouiwidgets_gettingstarted %})

## See Also

* [Hosting Kendo UI in Your Project]({% slug hosting_kendoui %})
* [Installing Kendo UI by Using the CDN Services]({% slug kendoui_cdn_services_installation %})
* [Installing Kendo UI with NPM]({% slug kendoui_npm_packages_kendoui_installation %})
* [Installing Kendo UI with NuGet]({% slug kendoui_nuget_packages %})
* [Getting Up and Running with Your Kendo UI Project (Guide)]({% slug getting_started_installation_kendoui %})
