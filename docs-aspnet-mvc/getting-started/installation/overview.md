---
title: Overview
page_title: Download and Installation Overview | Download and Installation | Telerik UI for ASP.NET MVC
description: "Get started with Telerik UI for ASP.NET MVC and learn how to download the library and initialize its HTML helpers."
previous_url: /getting-started/kendo-ui-vs-mvc-wrappers
slug: overview_downloadinstallation_mvc
position: 1
---

# Download and Installation Overview

To set up and install Telerik UI for ASP.NET MVC, you first need to add the prerequisites.

## Prerequisites

Telerik UI for ASP.NET MVC requires .NET MVC.

The offline sample application requires:

* [.NET 4.6.2](https://www.microsoft.com/en-us/download/details.aspx?id=53321)
* [ASP.NET MVC 4](http://www.asp.net/mvc/mvc4) or [ASP.NET MVC 5](http://www.asp.net/mvc/mvc5)
* [Visual Studio](https://www.visualstudio.com/downloads/)
* LocalDB

## Download

To download Telerik UI for ASP.NET MVC:

1. Log in to your [Telerik account](https://www.telerik.com/login/v2/telerik?ReturnUrl=https://www.telerik.com/v2/oauth/telerik/authorize%3Fclient_id%3Dhttp://www.lean.telerik.com%26redirect_uri%3Dhttp://www.telerik.com/account/default.aspx%26response_type%3Dcode%26state%3DBC61727E88E19B88D8471959A1CD745B15A7E71498002F0383A966A0200E7FDA).
1. Click **Downloads** in the top navigation.
1. Click **UI for ASP.NET MVC**. If this option is not available, click **DevCraft UI Edition**, **DevCraft Complete**, or **DevCraft Ultimate**.
1. Click **Download Installer and other resources**.
1. Navigate to the **UI for ASP.NET MVC**  item. Click **Browse all product files** and select to download the Telerik online installer (`exe` file), the `MSI` installer file directly, or the `.zip` file.

## Installation

Run the Telerik UI for ASP.NET MVC installer. The automatic setup will guide you through the rest of the installation. If you chose to download the `.zip` file, extract it to a location of your preference.

The setup installs Telerik UI for ASP.NET MVC in `C:\Program Files (x86)\Progress\UI for ASP.NET MVC<version>`. For versions prior to R3 2017, the default installation folder for Telerik UI for ASP.NET MVC is `C:\Program Files (x86)\Telerik\UI for ASP.NET MVC<version>`.

## Distribution Contents

Telerik UI for ASP.NET MVC contains the following directories:

* `js`&mdash;These are the minified JavaScript files.
* `styles`&mdash;The minified CSS files and images used by the themes.
* `src`&mdash;A `README` file which states that as of R2 2016 the source code is distributed in separate `.source.zip` packages that are located in your account.
* `Scaffolding`&mdash;The Kendo UI Scaffolder Visual Studio extension. It enables the generation of the Kendo UI MVC wrapper widget declarations inside Visual Studio projects and is added to the Kendo UI Q1 2015 release.
* `spreadsheet`&mdash;The [`Telerik.Web.Spreadsheet`](https://docs.telerik.com/kendo-ui/controls/data-management/spreadsheet/import-and-export-data/server-side-processing) assembly and its dependencies from Telerik Document Processing library.
* `pdfviewer`&mdash;The `Telerik.Web.PDF` assembly and its dependencies from Telerik Document Processing library.
* `wrappers\aspnetmvc\Binaries\MVC3`&mdash;The assemblies for the ASP.NET MVC 3 applications.
* `wrappers\aspnetmvc\Binaries\MVC4`&mdash;The assemblies for the ASP.NET MVC 4 applications.
* `wrappers\aspnetmvc\Binaries\MVC5`&mdash;The assemblies for the ASP.NET MVC 5 applications.
* `wrappers\aspnetmvc\Examples\VS2012`&mdash;The ASP.NET MVC 4 sample application built with Visual Studio 2012.
* `wrappers\aspnetmvc\Examples\VS2013`&mdash;The ASP.NET MVC 5 sample application built with Visual Studio 2013.
* `wrappers\aspnetmvc\Examples\VS2015`&mdash;The ASP.NET MVC 5 sample application built with Visual Studio 2015.
* `wrappers\aspnetmvc\Examples\VS2017`&mdash;The ASP.NET MVC 5 sample application built with Visual Studio 2017.
* `wrappers\aspnetmvc\EditorTemplates`&mdash;The ready-to-use editor templates based on the Kendo UI widgets.

## Sample Application

Telerik UI for ASP.NET MVC comes with a sample ASP.NET MVC application which is available in the following versions:

* The ASP.NET MVC 4 application built with Visual Studio 2012.
* The ASP.NET MVC 5 application built with Visual Studio 2013.
* The ASP.NET MVC 5 application built with Visual Studio 2015.
* The ASP.NET MVC 5 application built with Visual Studio 2017.

To run the sample application:

1. Navigate to the installation directory of Telerik UI for ASP.NET MVC.
1. Open the sample Visual Studio Solution:

    * To run the ASP.NET MVC 4 version, open `wrappers\aspnetmvc\Examples\VS2012\Kendo.Mvc.Examples.sln` with Visual Studio 2012.
    * To run the ASP.NET MVC 5 version, open `wrappers\aspnetmvc\Examples\VS2013\Kendo.Mvc.Examples.sln` with Visual Studio 2013, 2015, and 2017.

1. Install Microsoft .NET 4.6.2 Framework Developer Pack.
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
* [Upgrade Telerik UI for ASP.NET MVC]({% slug upgrade_aspnetmvc %})

## See Also

* [Collected Examples on ASP.NET MVC](https://github.com/telerik/kendo-examples-asp-net-mvc)
* [Collected Examples on ASP.NET Web Technologies](https://github.com/telerik/kendo-examples-asp-net)
* [Collected Examples on Telerik UI for ASP.NET MVC](https://github.com/telerik/ui-for-aspnet-mvc-examples)
