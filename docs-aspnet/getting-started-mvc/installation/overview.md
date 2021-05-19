---
title: Overview
page_title: Download and Installation Overview
description: "Get started with Telerik UI for ASP.NET MVC and learn how to download the library and initialize its HTML helpers."
slug: overview_downloadinstallation_mvc
position: 1
permalink: /getting-started/installation/overview
---

# Download and Installation Overview

This article describes how to install UI for ASP.NET MVC by using the installer file. This installation method offers the following advantages:

* It allows you to install the Telerik UI [extensions for Visual Studio]({% slug overview_visualstudio_aspnetmvc %}).

* You can configure the Telerik NuGet feed during the setup.

* It allows you to install the Telerik UI for ASP.NET MVC [Sample Application](#sample-application).

An alternative approach is to use [NuGet]({% slug aspnetmvc_nuget %}) and to install only the packages that you need for your application.

## Prerequisites

* Telerik UI for ASP.NET MVC requires the .NET Framework. [Download the current version of the .NET Framework from Microsoft's website.](https://dotnet.microsoft.com/download/dotnet-framework)

* The Telerik UI for ASP.NET MVC **Sample Application** that is distributed with the same package requires:

   * [A current .NET Framework version](https://dotnet.microsoft.com/download/dotnet-framework)
   
   * [Visual Studio](https://www.visualstudio.com/downloads/)
   
   * Microsoft SQL Server Express LocalDB

## Download

Follow these steps to download Telerik UI for ASP.NET MVC installer:

1. Log into your [Telerik account](https://www.telerik.com/login/v2/telerik).

1. Click **Downloads** in the top navigation bar.

1. Click **UI for ASP.NET MVC**.

1. In the **Installation** section, select the msi installer file.

>**Tip**
>
> If you don't want to install Telerik UI for ASP.NET MVC on your machine, you can include Telerik UI controls in your project via NuGet. See [Installing with NuGet]({% slug aspnetmvc_nuget %})

## Installation

Run the Telerik UI for ASP.NET MVC installer. The automatic setup will guide you through the rest of the installation.

The default installation directory is `C:\Program Files (x86)\Progress\Telerik UI for ASP.NET MVC<version>`. For versions prior to R3 2017, the default installation folder for Telerik UI for ASP.NET MVC is `C:\Program Files (x86)\Telerik\UI for ASP.NET MVC<version>`.

## Distribution Contents

You will find the following in the Telerik UI for ASP.NET MVC installation directory:

* `js`&mdash;These are the minified JavaScript files.
* `styles`&mdash;The minified CSS files and images used by the themes.
* `src`&mdash;A `README` file which states that as of R2 2016 the source code is distributed in separate `.source.zip` packages that are located in your account.
* `license-agreements`&mdash;End-user license agreements files.
* `Scaffolding`&mdash;The Kendo UI Scaffolder Visual Studio extension. It enables the generation of the Kendo UI MVC wrapper widget declarations inside Visual Studio projects.
* `dpl`&mdash;Telerik Document Processing library NuGet packages.
* `export`&mdash;The Kendo.Mvc.Export assembly that allows exporting IEnumerable sources to XLSX and CSV formats.
* `spreadsheet`&mdash;The [`Telerik.Web.Spreadsheet`](https://docs.telerik.com/kendo-ui/controls/data-management/spreadsheet/import-and-export-data/server-side-processing) assembly and its dependencies from Telerik Document Processing library.
* `pdfviewer`&mdash;The `Telerik.Web.PDF` assembly and its dependencies from Telerik Document Processing library.
* `typescript`&mdash;Kendo UI typescript definitions.
* `vsdoc`&mdash;Client-side intellisense files.
* `VSExtensions`&mdash;Visual Studio extensions files.
* `wrappers\aspnetmvc\Binaries\MVC3`&mdash;The assemblies for the ASP.NET MVC 3 applications.
* `wrappers\aspnetmvc\Binaries\MVC4`&mdash;The assemblies for the ASP.NET MVC 4 applications.
* `wrappers\aspnetmvc\Binaries\MVC5`&mdash;The assemblies for the ASP.NET MVC 5 applications.
* `wrappers\aspnetmvc\EditorTemplates`&mdash;The ready-to-use editor templates based on the Kendo UI widgets.
* `wrappers\aspnetmvc\Examples\MVC4`&mdash;The ASP.NET MVC 4 sample application.
* `wrappers\aspnetmvc\Examples\MVC5`&mdash;The ASP.NET MVC 5 sample application.


## Sample Application

Telerik UI for ASP.NET MVC comes with a sample ASP.NET MVC application, which is available in the following versions:

* The ASP.NET MVC 4 application.
* The ASP.NET MVC 5 application.

To run the sample application:

1. Navigate to the installation directory of Telerik UI for ASP.NET MVC.
1. Open the sample Visual Studio Solution:

    * To run the ASP.NET MVC 4 version, open `wrappers\aspnetmvc\Examples\MVC4\Kendo.Mvc.Examples.sln`.
    * To run the ASP.NET MVC 5 version, open `wrappers\aspnetmvc\Examples\MVC5\Kendo.Mvc.Examples.sln`.

1. Install Microsoft .NET Framework version 4.6.2 or later.
1. Press `CTRL+F5` to build and run the application.
1. A browser loads the start page of the sample application.

The sample application Visual Studio Project contains the following items:

* `Views`&mdash;The Razor views.
* `Controllers`&mdash;The Controller classes.
* `Models`&mdash;The Model classes.
* `App_Data`&mdash;The LocalDB sample database.

## Next Steps

* [Explore the Telerik UI for ASP.NET MVC fundamentals]({% slug fundamentals_aspnetmvc %})
* [Install Telerik UI for ASP.NET MVC with NuGet]({% slug aspnetmvc_nuget %})
* [Scaffold the Telerik UI for ASP.NET MVC project]({% slug scaffolding_aspnetmvc %})
* [Integrate Telerik UI for ASP.NET MVC in Visual Studio]({% slug overview_visualstudio_aspnetmvc %})
* [Upgrade Telerik UI for ASP.NET MVC]({% slug upgrade_aspnetcore %})

## See Also

* [Collected Examples on ASP.NET MVC](https://github.com/telerik/kendo-examples-asp-net-mvc)
* [Collected Examples on ASP.NET Web Technologies](https://github.com/telerik/kendo-examples-asp-net)
* [Collected Examples on Telerik UI for ASP.NET MVC](https://github.com/telerik/ui-for-aspnet-mvc-examples)
