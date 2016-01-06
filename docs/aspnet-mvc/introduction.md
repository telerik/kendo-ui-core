---
title: Introduction
page_title: Introduction to Telerik UI for ASP.NET MVC
description: How to download, install Telerik UI for ASP.NET MVC and run the sample application.
position: -2
---

# Telerik UI for ASP.NET MVC
Telerik UI for ASP.NET MVC is a set of server-side wrappers that allow using the [Kendo UI](http://docs.telerik.com/kendo-ui/introduction) widgets from C# or VB.NET code.
This article shows how to download Telerik UI for ASP.NET MVC, install it and then run the sample ASP.NET MVC application.

## Requirements and Supported Environments
Telerik UI for ASP.NET MVC requires ASP.NET MVC. It supports:

* .NET Framework 3.5+
* ASP.NET MVC 3+
* Visual Studio 2010+
* IIS 5+
* C# / VB.NET
* SharePoint 2010+

The offline sample application requires:

* .NET 4.5
* ASP.NET MVC 4 or ASP.NET MVC 5
* Visual Studio 2012 or Visual Studio 2013
* LocalDB

The Telerik UI for ASP.NET MVC Visual Studio Extensions support Visual Studio 2010+.

## Download

To download Telerik UI for ASP.NET MVC follow these steps.

1. Log in to your [Telerik account](https://www.telerik.com/login/v2/telerik?ReturnUrl=https://www.telerik.com/v2/oauth/telerik/authorize%3Fclient_id%3Dhttp://www.lean.telerik.com%26redirect_uri%3Dhttp://www.telerik.com/account/default.aspx%26response_type%3Dcode%26state%3DBC61727E88E19B88D8471959A1CD745B15A7E71498002F0383A966A0200E7FDA).
2. Click **Products & Subscriptions**  in the top navigation.
3. Click **UI for ASP.NET MVC**. If this option is not available click one of the following: **DevCraft UI Edition**, **DevCraft Complete**  or **DevCraft Ultimate**.
4. Click **Download Installer and other resources**.
5. Find the **UI for ASP.NET MVC**  item, click **Browse all product files** and select to download the Telerik online installer (exe file), the msi installer file directly, or the zip file.

## Installation

Run the Telerik UI for ASP.NET MVC installer. The automatic setup will guide you through the rest of the installation. If you chose to download the zip file - extract it to a location of your preference.

### Install Location

The setup will install Telerik UI for ASP.NET MVC** in **C:\Program Files (x86)\Telerik\Telerik UI for ASP.NET MVC<version>.

### Distribution contents

The Telerik UI for ASP.NET MVC contains the following directories.

* **js** - minified JavaScript files.
* **styles** - minified CSS files and images used by the themes.
* **src** - complete JavaScript, CSS and C# source code. **N/A** in the trial version.
* **spreadsheet** - [Telerik.Web.Spreadsheet](/web/spreadsheet/import-and-export-data/server-side-processing) assembly and its dependencies from the Telerik Document Processing library
* **wrappers\aspnetmvc\Binaries\MVC3** - assemblies for ASP.NET MVC 3 applications.
* **wrappers\aspnetmvc\Binaries\MVC4**- assemblies for ASP.NET MVC 4 applications.
* **wrappers\aspnetmvc\Binaries\MVC5**- assemblies for ASP.NET MVC 5 applications.
* **wrappers\aspnetmvc\Examples\VS2012**- ASP.NET MVC 4 sample application built with Visual Studio 2012.
* **wrappers\aspnetmvc\Examples\VS2013**- ASP.NET MVC 5 sample application built with Visual Studio 2013.
* **wrappers\aspnetmvc\Examples\VS2015**- ASP.NET MVC 5 sample application built with Visual Studio 2015.
* **wrappers\aspnetmvc\Examples\MVC6**- ASP.NET MVC 6 Beta sample application built with Visual Studio 2015.
* **wrappers\aspnetmvc\EditorTemplates**- ready-to-use editor templates based on the Kendo UI widgets.
* **wrappers\aspnetmvc\LegacyThemes** - themes ported from Telerik Extensions for ASP.NET MVC (discontinued product superseded by Telerik UI for ASP.NET MVC).
* **wrappers\aspnetmvc\Scaffolding** - Kendo UI Scaffolder Visual Studio extension. Enables generating Kendo UI MVC wrapper widgets declarations inside Visual Studio projects. Added in Q1 2015 release.

## Sample application

Telerik UI for ASP.NET MVC comes with a sample ASP.NET MVC application available in two versions.

* ASP.NET MVC 4 application built with Visual Studio 2012
* ASP.NET MVC 5 application built with Visual Studio 2013

### Running the sample application

To run the sample application follow these steps.

1. Navigate to the installation directory of Telerik UI for ASP.NET MVC.
2. Open the sample Visual Studio Solution
    - to run the ASP.NET MVC 4 version open **wrappers\aspnetmvc\Examples\VS2012\Kendo.Mvc.Examples.sln** with **Visual Studio 2012**.
    - to run the ASP.NET MVC 5 version open **wrappers\aspnetmvc\Examples\VS2013\Kendo.Mvc.Examples.sln** with **Visual Studio 2013**.
3. Press **CTRL+F5** to build and run the application.
4. A browser will load the start page of the sample application. Use the links to explore the available demos.
![Telerik UI for ASP.NET MVC Sample Application](/aspnet-mvc/images/demos.png)

### Contents

The sample application Visual Studio solution contains the following.

* **Areas/aspx/Views** - WebForm views.
* **Areas/razor/Views**- Razor views.
* **Controllers** - Controller classes.
* **Models** - Model classes.
* **App_Data**- LocalDB sample database.

## Next Steps

After you run the sample application, continue with the following articles:

* [Fundamentals](/aspnet-mvc/fundamentals)
* [Scaffolding](/aspnet-mvc/scaffolding)
* [Using Telerik UI for ASP.NET MVC in MVC 3 application](/aspnet-mvc/asp-net-mvc-3)
* [Using Telerik UI for ASP.NET MVC in MVC 4 application](/aspnet-mvc/asp-net-mvc-4)
* [Using Telerik UI for ASP.NET MVC in MVC 5 application](/aspnet-mvc/asp-net-mvc-5)
* [Using Telerik UI for ASP.NET MVC Visual Studio Extensions](/aspnet-mvc/vs-integration/introduction)
* [Troubleshooting](/aspnet-mvc/troubleshooting)

For more examples on how to use Kendo UI with ASP.NET MVC, visit the following repositories on GitHub:

* [Collected Kendo UI Examples on Using ASP.NET MVC](https://github.com/telerik/kendo-examples-asp-net-mvc)
* [Collected Kendo UI Examples on Using ASP.NET Web Technologies](https://github.com/telerik/kendo-examples-asp-net)
* [Collected Examples on Telerik UI for ASP.NET MVC](https://github.com/telerik/ui-for-aspnet-mvc-examples)
