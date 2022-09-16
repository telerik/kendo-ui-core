---
title: Installing with NuGet
page_title: Installing with NuGet | Download and Installation 
description: "Get started with Kendo UI for jQuery and install the Kendo UI Professional or Kendo UI Core NuGet packages."
slug: kendoui_nuget_packages
position: 60
---

# Installing with NuGet

[NuGet](https://www.nuget.org) is a popular .NET package manager. 

Progress maintains the Telerik NuGet Feed for registered users and all Kendo UI for jQuery official releases and service packs are published there as well.

>The legacy https://nuget.telerik.com/nuget server is now deprecated. Make sure to switch to the new https://nuget.telerik.com/v3/index.json server, which is faster, lighter, and reduces the number of requests from your NuGet client.

## 1. Choose the Required Package

The Telerik NuGet Feed provides the following Kendo UI for jQuery packages:

* `KendoUIProfessional`&mdash;The commercial Kendo UI for jQuery version.
* `KendoUIProfessional.Trial`&mdash;The trial Kendo UI for jQuery version.
* `KendoUICore`&mdash;The open-source Kendo UI distribution which contains only the open-sourced widgets.

## 2. Register the Feed on Your System

To add the Telerik NuGet feed as a package source on your machine and access the packages, use either of the following approaches:

* [Use the NuGet CLI](#add-the-feed-with-the-nuget-cli).
* [Use the UI provided from Visual Studio for configuring authenticated NuGet feeds](#add-the-feed-with-the-nuget-package-manager).

The following video summarizes the steps for adding the Telerik NuGet feed to your NuGet sources.

<iframe width="560" height="315" src="https://www.youtube.com/embed/c3m_BLMXNDk" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### Add the Feed with the NuGet CLI

To register the Telerik NuGet Feed on your system by using the [NuGet CLI](http://docs.nuget.org/consume/Command-Line-Reference):

1. Download the [latest NuGet executable](https://dist.nuget.org/win-x86-commandline/latest/nuget.exe).
1. Open a command prompt and change the path to where the `nuget.exe` is downloaded.
1. The command from the following example stores a token in the `%AppData%\NuGet\NuGet.config` file. Your original credentials cannot be obtained from this token.

    ```
        NuGet Sources Add -Name "telerik.com" -Source "https://nuget.telerik.com/v3/index.json" -UserName "your login email" -Password "your password"
    ```

    If you are unable to connect to the feed by using encrypted credentials, try the alternative approach of storing credentials in clear text.

    ```
        NuGet Sources Add -Name "telerik.com" -Source "https://nuget.telerik.com/v3/index.json" -UserName "your login email" -Password "your password" -StorePasswordInClearText
    ```

    If you have already stored a token instead of storing the credentials as clear text, you can update the definition in the `%AppData%\NuGet\NuGet.config` file by using the following command:

    ```
        NuGet Sources Update -Name "telerik.com" -Source "https://nuget.telerik.com/v3/index.json" -UserName "your login email" -Password "your password" -StorePasswordInClearText
    ```

### Add the Feed with the NuGet Package Manager

To register the Telerik NuGet Feed on your system by using the NuGet package manager: 

1. Open Visual Studio.
1. Go to **Tools** > **NuGet Package Manager** > **Package Manager Settings**, select **Package Manager Sources** and then click the **+** button.
1. Select the feed **Name**, set the feed URL to https://nuget.telerik.com/v3/index.json, and click **OK**.

    ![Kendo UI for jQuery resources](../../images/add-nuget-package-source.png)

1. Select the **Browse** list of packages.
1. Enter your Telerik credentials in the Windows Authentication dialog. As a result, all of the packages that are licensed to the user account are now available in Visual Studio Package Manager.

## 3. Install the Packages

After setting up the Telerik NuGet Feed package source on your computer, install the Kendo UI for jQuery packages by using either of the following utilities:

* [The Package Manager Dialog](#install-with-the-package-manager-dialog)
* [The Package Manager Console](#install-with-the-package-manager-console)

Regardless of the package installation approach you choose, after the installation, the content scripts and stylesheets will be copied to your application as follows:

* `/Scripts/kendo/<version>/`&mdash;Contains the minified JavaScript files.
* `/Content/kendo/<version>/`&mdash;Contains the minified CSS files and theme images.

![Kendo UI for jQuery resources](../../images/kendo-folder-structure.png)

### Install with the Package Manager Dialog

To install the Kendo UI for jQuery packages by using the **Package Manager** dialog:  

1. Right-click **Solution** or a specific project in **Solution**, and navigate to **Manage NuGet Packages**.

    ![Kendo UI for jQuery resources](../../images/manage-nuget-packages.png)

1. Set the package source to `telerik.com` and install the `KendoUIProfessional` NuGet package.

    ![Kendo UI for jQuery resources](../../images/kendo-ui-package.png)

### Install with the Package Manager Console

To install the Kendo UI for jQuery packages by using the **Package Manager** console:

1. Open the project or solution in Visual Studio, and open the console by selecting **Tools** > **NuGet Package Manager** > **Package Manager Console**.
1. To install the package, substitute `WebApplication` with the name of your project from the following command and run it.

    ```
        Install-Package KendoUIProfessional -ProjectName WebApplication
    ```

## Next Steps

* [Create Your Own Custom Bundles]({% slug include_only_what_you_need_kendoui_scripts %})
* [Create Your Own Custom Widgets]({% slug createcustomkendouiwidgets_gettingstarted %})
* [Initialize Widgets as jQuery Plugins]({% slug initialize_widgets_using_jquery_plugins_installation %})
* [Initialize Widgets with MVVM]({% slug mvvm_initialization_kendoui %})
* [Widget Script Dependencies]({% slug script_filesfor_barcodes_widgets %})

## See Also

* [Hosting Kendo UI for jQuery in Your Project]({% slug hosting_kendoui %})
* [Installing Kendo UI for jQuery with Bower]({% slug kendoui_bower_packages_kendoui_installation %})
* [Installing Kendo UI for jQuery by Using the CDN Services]({% slug kendoui_cdn_services_installation %})
* [Installing Kendo UI for jQuery with NPM]({% slug kendoui_npm_packages_kendoui_installation %})
* [Getting Up and Running with Your Kendo UI for jQuery Project (Guide)]({% slug getting_started_installation_kendoui %})
* [Using Script License Code]({% slug using-license-code %})
