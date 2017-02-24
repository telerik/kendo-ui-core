---
title: Overview
page_title: Overview | Telerik UI for ASP.NET MVC
description: "Download and install Telerik UI for ASP.NET MVC, and run a sample application."
slug: overview_aspnetmvc
position: 1
---

# Telerik<sup>®</sup> UI for ASP.NET MVC by Progress

[Telerik UI for ASP.NET MVC](http://www.telerik.com/aspnet-mvc) is a set of server-side wrappers that allows using the [Kendo UI widgets](../kendo-ui/introduction) from C# or VB.NET code.

This article demonstrates how to download Telerik UI for ASP.NET MVC, install it, and run a sample ASP.NET MVC application.

## Requirements

Telerik UI for ASP.NET MVC requires ASP.NET MVC.

The offline sample application requires:

* [.NET 4.5](https://www.microsoft.com/en-us/download/details.aspx?id=30653)
* [ASP.NET MVC 4](http://www.asp.net/mvc/mvc4) or [ASP.NET MVC 5](http://www.asp.net/mvc/mvc5)
* [Visual Studio 2012](https://www.microsoft.com/en-us/download/details.aspx?id=34673) or [Visual Studio 2013](https://www.visualstudio.com/downloads/download-visual-studio-vs)
* LocalDB

## Environments

Telerik UI for ASP.NET MVC supports:

* [.NET Framework 3.5](https://www.microsoft.com/en-us/download/details.aspx?id=21) and later
* [ASP.NET MVC 3](http://www.asp.net/mvc/mvc3) and later
* [Visual Studio 2010](https://www.microsoft.com/en-us/download/details.aspx?id=23507) and later
* [IIS 5](https://www.microsoft.com/en-us/download/details.aspx?id=24843) and later
* [C#](https://msdn.microsoft.com/en-us/library/aa288436(v=vs.71).aspx) / [VB.NET](http://www.tutorialspoint.com/vb.net/)
* [SharePoint 2010](https://msdn.microsoft.com/en-us/library/office/dd776256(v=office.12).aspx) and later

Telerik UI for ASP.NET MVC Visual Studio Extensions support Visual Studio 2010 and later.

## Download

To download Telerik UI for ASP.NET MVC:

1. Log in to your [Telerik account](https://www.telerik.com/login/v2/telerik?ReturnUrl=https://www.telerik.com/v2/oauth/telerik/authorize%3Fclient_id%3Dhttp://www.lean.telerik.com%26redirect_uri%3Dhttp://www.telerik.com/account/default.aspx%26response_type%3Dcode%26state%3DBC61727E88E19B88D8471959A1CD745B15A7E71498002F0383A966A0200E7FDA).

1. Click **Downloads** in the top navigation.

1. Click **UI for ASP.NET MVC**. If this option is not available, click one of the following: **DevCraft UI Edition**, **DevCraft Complete**  or **DevCraft Ultimate**.

1. Click **Download Installer and other resources**.

1. Find the **UI for ASP.NET MVC**  item, click **Browse all product files**, and select to download the Telerik online installer (`exe` file), the `MSI` installer file directly, or the `.zip` file.

## Installation

Run Telerik UI for ASP.NET MVC installer. The automatic setup will guide you through the rest of the installation. If you chose to download the `.zip` file, extract it to a location of your preference.

### Location

The setup installs Telerik UI for ASP.NET MVC in `C:\Program Files (x86)\Telerik\UI for ASP.NET MVC<version>`.

### Distribution Contents

Telerik UI for ASP.NET MVC contains the following directories:

* `js`&mdash;These are the minified JavaScript files.
* `styles`&mdash;The minified CSS files and images used by the themes.
* `src`&mdash;The complete JavaScript, CSS, and C# source code. Note that this directory is not available in the trial version.
* `spreadsheet`&mdash;[`Telerik.Web.Spreadsheet`](../kendo-ui/controls/data-management/spreadsheet/import-and-export-data/server-side-processing) assembly and its dependencies from Telerik Document Processing library.
* `wrappers\aspnetmvc\Binaries\MVC3`&mdash;The assemblies for the ASP.NET MVC 3 applications.
* `wrappers\aspnetmvc\Binaries\MVC4`&mdash;The assemblies for the ASP.NET MVC 4 applications.
* `wrappers\aspnetmvc\Binaries\MVC5`&mdash;The assemblies for the ASP.NET MVC 5 applications.
* `wrappers\aspnetmvc\Examples\VS2012`&mdash;The ASP.NET MVC 4 sample application built with Visual Studio 2012.
* `wrappers\aspnetmvc\Examples\VS2013`&mdash;The ASP.NET MVC 5 sample application built with Visual Studio 2013.
* `wrappers\aspnetmvc\Examples\VS2015`&mdash;The ASP.NET MVC 5 sample application built with Visual Studio 2015.
* `wrappers\aspnetmvc\Examples\AspNet.Core`&mdash;The ASP.NET Core sample application built with Visual Studio 2015.
* `wrappers\aspnetmvc\EditorTemplates`&mdash;The ready-to-use editor templates based on the Kendo UI widgets.
* `wrappers\aspnetmvc\Scaffolding`&mdash;The Kendo UI Scaffolder Visual Studio extension. It enables generating the Kendo UI MVC wrapper widgets declarations inside Visual Studio projects and is added in the Kendo UI Q1 2015 release.

## Sample Application

Telerik UI for ASP.NET MVC comes with a sample ASP.NET MVC application available in 2 versions:

* The ASP.NET MVC 4 application built with Visual Studio 2012.
* The ASP.NET MVC 5 application built with Visual Studio 2013.

### Running the Sample Application

To run the sample application:

1. Navigate to the installation directory of Telerik UI for ASP.NET MVC.

1. Open the sample Visual Studio Solution:

* To run the ASP.NET MVC 4 version, open `wrappers\aspnetmvc\Examples\VS2012\Kendo.Mvc.Examples.sln` with Visual Studio 2012.
* To run the ASP.NET MVC 5 version, open `wrappers\aspnetmvc\Examples\VS2013\Kendo.Mvc.Examples.sln` with Visual Studio 2013.

1. Press `CTRL+F5` to build and run the application.

1. A browser loads the start page of the sample application. Use the links to explore the available demos.

    **Figure 1 The start-up screen of the sample application**

    ![Telerik UI for ASP.NET MVC Sample Application](/images/demos.png)

### Distribution Contents

The sample application Visual Studio solution contains the following items:

* `Areas/aspx/Views`&mdash;WebForm views.
* `Areas/razor/Views`&mdash;Razor views.
* `Controllers`&mdash;Controller classes.
* `Models`&mdash;Model classes.
* `App_Data`&mdash;LocalDB sample database.

## Upgrade

You can upgrade the version of the Telerik UI for ASP.NET MVC wrappers and also switch from a trial to a developer license.

### Upgrade to Newer Versions

To update Telerik UI for ASP.NET MVC to a new version, either:
* Use the [Upgrade Project Wizard]({% slug projectwizardupgrade_visualstudio_aspnetmvc %}), or
* Manually replace the scripts and the style files.

#### Automatic Upgrade

To utilize the Upgrade Project Wizard, refer to the articles on:

1. [Downloading new versions]({% slug latestversionretrieval_visualstudio_aspnetmvc %})
1. [Upgrading the Project Wizard]({% slug projectwizardupgrade_visualstudio_aspnetmvc %})

#### Manual Upgrade

To manually upgrade to a newer Telerik UI for ASP.NET MVC version:

1. Replace all [scripts, styles, and images](#distribution-contents) related to Telerik UI for ASP.NET MVC with the desired version of the framework. [Download](#download) the desired version from the **Download** section of your account.
1. Change the reference to the new [Kendo.MVC dll]({% slug aspnetmvc5_aspnetmvc %}#add-kendomvcdll-reference). Verify that the dll refers to the correct ASP.NET MVC version.

### Upgrade From Trial to Licensed Versions

1. Before upgrading to a licensed version, delete (uninstall) the trial version from your machine. This eliminates the possibility for trial assemblies to end up in the project references or in production.
1. [Install](#installation) the licensed Kendo UI version and follow the steps for updating the Telerik UI for ASP.NET MVC version.

### Troubleshooting

#### I Am Still Getting the Old Version

Sometimes the .NET Framework caches the old Kendo.MVC dll. As a result, the upgrade may seem to have failed.

**Solution**

1. From the Windows **Task Manager**, terminate the IIS process and close Visual Studio.
1. Clean up the Temporary ASP.NET files from `<sysdrive>:\Windows\Microsoft.NET\Framework[64] <vernum>\Temporary ASP.NET Files`.
1. Delete your browser cache. For Internet Explorer, select **Tools** > **Internet Options** > **Delete Files**.
1. Clean up the Windows WebSite Cache from `\Users<UserName>\AppData\Local\Microsoft\WebsiteCache`. The location of this cache may vary from one operating system to another.
1. Clean up the Visual Studio Backup from `<sysdrive>:\Users\<UserName>\Documents\Visual Studio <vsVersion>\Backup Files`. The exact location depends on your Visual Studio settings and installation.

#### The Icons Are Missing after the Upgrade

As of the [Kendo UI R1 2017 release](http://docs.telerik.com/kendo-ui/backwards-compatibility/2017-backward-compatibility#kendo-ui-2017-r1), the Telerik UI for ASP.NET MVC uses [font icons](http://docs.telerik.com/kendo-ui/styles-and-layout/icons-web), which might lead to compatibility issues.

**Solution**

If you upgrade your project from a prior version to the R1 2017 version (2017.1.118) or later, you have to change the [classes of the custom CSS rules that you use accordingly](http://docs.telerik.com/kendo-ui/backwards-compatibility/2017-backward-compatibility#kendo-ui-2017-r1).

If the icons are still missing after you change the classes, verify that the version is fully [updated](#upgrade-to-newer-versions).

## Next Steps

After you run the sample application, read through the following articles, related to Telerik UI for ASP.NET MVC:

* [Telerik UI for ASP.NET MVC Fundamentals]({% slug fundamentals_aspnetmvc %})
* [Telerik UI for ASP.NET MVC NuGet Packages]({% slug aspnetmvc_nuget %})
* [Scaffolding with Telerik UI for ASP.NET MVC]({% slug scaffolding_aspnetmvc %})
* [Use Telerik UI for ASP.NET MVC in MVC 3 Applications]({% slug aspnetmvc3_aspnetmvc %})
* [Use Telerik UI for ASP.NET MVC in MVC 4 Applications]({% slug aspnetmvc4_aspnetmvc %})
* [Use Telerik UI for ASP.NET MVC in MVC 5 Applications]({% slug aspnetmvc5_aspnetmvc %})
* [Use Telerik UI for ASP.NET Core](../aspnet-core/introduction)
* [Use Telerik UI for ASP.NET MVC Visual Studio Extensions]({% slug overview_visualstudio_aspnetmvc %})
* [Telerik UI for ASP.NET MVC Troubleshooting]({% slug troubleshooting_aspnetmvc %})

## See Also

* [Collected ASP.NET MVC Examples](https://github.com/telerik/kendo-examples-asp-net-mvc)
* [Collected Examples on ASP.NET Web Technologies](https://github.com/telerik/kendo-examples-asp-net)
* [Collected Examples on Telerik UI for ASP.NET MVC](https://github.com/telerik/ui-for-aspnet-mvc-examples)
* [Telerik UI for ASP.NET MVC Custom DataSource]({% slug customdatasource_aspnetmvc %})
* [Validation with Telerik UI for ASP.NET MVC]({% slug validation_aspnetmvc %})
* [Globalization with Telerik UI for ASP.NET MVC]({% slug globalization_aspnetmvc %})
* [Localization with Telerik UI for ASP.NET MVC]({% slug localization_aspnetmvc %})
* [Visual Basic Syntax]({% slug visualbasic_aspnetmvc %})
* [Telerik UI for ASP.NET MVC Wrappers vs Kendo UI Widgets]({% slug wrappersvswidgets_aspnetmvc %})
* [Telerik UI for ASP.NET MVC Visual Studio Integration]({% slug overview_visualstudio_aspnetmvc %})
* [Migration from Telerik Extensions]({% slug overview_migrationextensions_aspnetmvc %})
* [Telerik UI for ASP.NET MVC HtmlHelpers]({% slug overview_autocompletehelper_aspnetmvc %})
* [Tutorials on Telerik UI for ASP.NET MVC]({% slug overview_timeefficiencyapp_aspnetmvc6 %})
