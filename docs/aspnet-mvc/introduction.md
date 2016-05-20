---
title: Overview
page_title: Overview | Telerik UI for ASP.NET MVC
description: "Download and install Telerik UI for ASP.NET MVC, and run a sample application."
slug: overview_aspnetmvc
position: 1
---

# Telerik<sup>®</sup> UI for ASP.NET MVC by Progress

[Telerik UI for ASP.NET MVC](http://www.telerik.com/aspnet-mvc) is a set of server-side wrappers that allows using the [Kendo UI widgets](http://docs.telerik.com/kendo-ui/introduction) from C# or VB.NET code.

This article shows how to download Telerik UI for ASP.NET MVC, install it and then run a sample ASP.NET MVC application.

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

Below are the basic steps for you to follow when downloading Telerik UI for ASP.NET MVC.

**Step 1** Log in to your [Telerik account](https://www.telerik.com/login/v2/telerik?ReturnUrl=https://www.telerik.com/v2/oauth/telerik/authorize%3Fclient_id%3Dhttp://www.lean.telerik.com%26redirect_uri%3Dhttp://www.telerik.com/account/default.aspx%26response_type%3Dcode%26state%3DBC61727E88E19B88D8471959A1CD745B15A7E71498002F0383A966A0200E7FDA).

**Step 2** Click **Products & Subscriptions** in the top navigation.

**Step 3** Click **UI for ASP.NET MVC**. If this option is not available, click one of the following: **DevCraft UI Edition**, **DevCraft Complete**  or **DevCraft Ultimate**.

**Step 4** Click **Download Installer and other resources**.

**Step 5** Find the **UI for ASP.NET MVC**  item, click **Browse all product files**, and select to download the Telerik online installer (`exe` file), the `MSI` installer file directly, or the `.zip` file.

## Installation

Run Telerik UI for ASP.NET MVC installer. The automatic setup will guide you through the rest of the installation. If you chose to download the `.zip` file, extract it to a location of your preference.

### Location

The setup installs Telerik UI for ASP.NET MVC in `C:\Program Files (x86)\Telerik\Telerik UI for ASP.NET MVC<version>`.

### Distribution Contents

Telerik UI for ASP.NET MVC contains the following directories:

* `js`&mdash;These are the minified JavaScript files.
* `styles`&mdash;The minified CSS files and images used by the themes.
* `src`&mdash;The complete JavaScript, CSS, and C# source code. Note that this directory is not available in the trial version.
* `spreadsheet`&mdashl;[`Telerik.Web.Spreadsheet`]({% slug serverside_processing_spreadsheet_widget %}) assembly and its dependencies from Telerik Document Processing library.
* `wrappers\aspnetmvc\Binaries\MVC3`&mdash;The assemblies for the ASP.NET MVC 3 applications.
* `wrappers\aspnetmvc\Binaries\MVC4`&mdash;The assemblies for the ASP.NET MVC 4 applications.
* `wrappers\aspnetmvc\Binaries\MVC5`&mdash;The assemblies for the ASP.NET MVC 5 applications.
* `wrappers\aspnetmvc\Examples\VS2012`&mdash;The ASP.NET MVC 4 sample application built with Visual Studio 2012.
* `wrappers\aspnetmvc\Examples\VS2013`&mdash;The ASP.NET MVC 5 sample application built with Visual Studio 2013.
* `wrappers\aspnetmvc\Examples\VS2015`&mdash;The ASP.NET MVC 5 sample application built with Visual Studio 2015.
* `wrappers\aspnetmvc\Examples\MVC6`&mdash;The ASP.NET Core MVC Beta sample application built with Visual Studio 2015.
* `wrappers\aspnetmvc\EditorTemplates`&mdash;The ready-to-use editor templates based on the Kendo UI widgets.
* `wrappers\aspnetmvc\LegacyThemes`&mdash;The themes ported from Telerik Extensions for ASP.NET MVC. Note that this is a discontinued product, superseded by Telerik UI for ASP.NET MVC.
* `wrappers\aspnetmvc\Scaffolding`&mdash;The Kendo UI Scaffolder Visual Studio extension. It enables generating the Kendo UI MVC wrapper widgets declarations inside Visual Studio projects and is added in the Kendo UI Q1 2015 release.

## Sample Application

Telerik UI for ASP.NET MVC comes with a sample ASP.NET MVC application available in two versions:

* The ASP.NET MVC 4 application built with Visual Studio 2012.
* The ASP.NET MVC 5 application built with Visual Studio 2013.

### Run the Sample Application

Below are the steps for you to follow when running the sample application.

**Step 1** Navigate to the installation directory of Telerik UI for ASP.NET MVC.

**Step 2** Open the sample Visual Studio Solution:
* To run the ASP.NET MVC 4 version, open `wrappers\aspnetmvc\Examples\VS2012\Kendo.Mvc.Examples.sln` with Visual Studio 2012.
* To run the ASP.NET MVC 5 version, open `wrappers\aspnetmvc\Examples\VS2013\Kendo.Mvc.Examples.sln` with Visual Studio 2013.

**Step 3** Press `CTRL+F5` to build and run the application.

**Step 4** A browser loads the start page of the sample application. Use the links to explore the available demos.

**Figure 1 The start-up screen of the sample application**

![Telerik UI for ASP.NET MVC Sample Application](/aspnet-mvc/images/demos.png)

### Contents

The sample application Visual Studio solution contains the following:

* `Areas/aspx/Views`&mdash;WebForm views.
* `Areas/razor/Views`&mdash;Razor views.
* `Controllers`&mdash;Controller classes.
* `Models`&mdash;Model classes.
* `App_Data`&mdash;LocalDB sample database.

## Next Steps

After you run the sample application, read through the following articles, related to Telerik UI for ASP.NET MVC:

* [Telerik UI for ASP.NET MVC Fundamentals]({% slug fundamentals_aspnetmvc %})
* [Telerik UI for ASP.NET MVC NuGet Packages]({% slug aspnetmvc_nuget %})
* [Scaffolding with Telerik UI for ASP.NET MVC]({% slug scaffolding_aspnetmvc %})
* [Use Telerik UI for ASP.NET MVC in MVC 3 Applications]({% slug aspnetmvc3_aspnetmvc %})
* [Use Telerik UI for ASP.NET MVC in MVC 4 Applications]({% slug aspnetmvc4_aspnetmvc %})
* [Use Telerik UI for ASP.NET MVC in MVC 5 Applications]({% slug aspnetmvc5_aspnetmvc %})
* [Use Telerik UI for ASP.NET Core MVC]({% slug overview_aspnetmvc6_aspnetmvc %})
* [Use Telerik UI for ASP.NET MVC Visual Studio Extensions]({% slug overview_visualstudio_aspnetmvc %})
* [Telerik UI for ASP.NET MVC Troubleshooting]({% slug troubleshooting_aspnetmvc %})

## See Also

Other articles and examples on Telerik UI for ASP.NET MVC:

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
