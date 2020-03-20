---
title: Installing with NuGet
page_title: Installing with NuGet | Download and Installation | Kendo UI for jQuery
description: "Get started with Kendo UI for jQuery and install the Kendo UI Professional or Kendo UI Core NuGet packages."
slug: kendoui_nuget_packages
position: 6
---

# Installing with NuGet

Telerik maintains a NuGet Feed for registered users.

[NuGet](https://www.nuget.org) is a popular .NET package manager. Official releases and service packs of Kendo UI are available for registered users.

The NuGet Feed provides the following NuGet packages:
* `KendoUIProfessional`&mdash;Kendo UI for jQuery Commercial version.
* `KendoUIProfessional.Trial`&mdash;Kendo UI for jQuery Trial version.
* `KendoUICore`&mdash;Kendo UI Core (contains only the Core widgets).

## The Telerik Private NuGet Feed

To use the Telerik NuGet Feed as a Package Source, use the [NuGet CLI](http://docs.nuget.org/consume/Command-Line-Reference). As of now, Visual Studio does not provide a UI for configuring authenticated NuGet feeds.

### Setting Up the NuGet Package Source

1. Download the [latest NuGet executable](https://dist.nuget.org/win-x86-commandline/latest/nuget.exe).
1. Open a command prompt and change the path to where the `nuget.exe` is downloaded.
1. Depending on your scenario, execute the following commands respectively.

  * To store encrypted credentials, use the `NuGet Sources Add -Name "telerik.com" -Source "https://nuget.telerik.com/nuget" -UserName "your login email" -Password "your password"` command. As a result, a token is stored in the `%AppData%\NuGet\NuGet.config` file. Your original credentials cannot be obtained from this token.

    > If you are unable to connect to the feed by using encrypted credentials, try the alternative approach of storing credentials in clear text.

  * To store credentials in clear text, use the `NuGet Sources Add -Name "telerik.com" -Source "https://nuget.telerik.com/nuget" -UserName "your login email" -Password "your password" -StorePasswordInClearText` command. As a result, the password is stored in clear text in the `%AppData%\NuGet\NuGet.config` file. If you are unable to connect to the feed using encrypted credentials, use this alternative approach.

    If you have already stored a token instead of storing the credentials as clear text, update the definition in the `%AppData%\NuGet\NuGet.config` file by using the `NuGet Sources Update -Name "telerik.com" -Source "https://nuget.telerik.com/nuget" -UserName "your login email" -Password "your password" -StorePasswordInClearText` command.

### Installing the NuGet Packages

After setting up the source, install the packages either through the [Package Manager Dialog](#installing-with-package-manager-dialog) or through the [Package Manager Console](#installing-with-package-manager-console).

#### Installing with Package Manager Dialog

1. Right click on the Solution or specific project in a Solution and navigate to `Manage NuGet Packages`.

    ![Kendo UI resources](../../images/manage-nuget-packages.png)

1. Set the package source to `telerik.com` and install the `KendoUIProfessional` NuGet Package. 

    ![Kendo UI resources](../../images/kendo-ui-package.png) 

#### Installing with Package Manager Console

1. Open the project/solution in Visual Studio, and open the console using the **Tools > NuGet Package Manager > Package Manager Console** command.

1. Run the install command:

```
    Install-Package KendoUIProfessional -ProjectName WebApplication
```

> Substitute `WebApplication` with the name of your project.

#### Resources Location

After installing the packages, the content scripts and stylesheets are copied to your application as follows:
* `/Scripts/kendo/<version>/`&mdash;Contains the minified JavaScript files.
* `/Content/kendo/<version>/`&mdash;Contains the minified CSS files and theme images.

    ![Kendo UI resources](../../images/kendo-folder-structure.png)

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
* [Installing Kendo UI with Bower]({% slug kendoui_bower_packages_kendoui_installation %})
* [Installing Kendo UI by Using the CDN Services]({% slug kendoui_cdn_services_installation %})
* [Installing Kendo UI with NPM]({% slug kendoui_npm_packages_kendoui_installation %})
* [Getting Up and Running with Your Kendo UI Project (Guide)]({% slug getting_started_installation_kendoui %})
