---
title: Download & Installation
page_title: Download & Installation | Progress Telerik UI for ASP.NET Core
description: "Download and install Progress Telerik UI for ASP.NET Core (aka MVC 6 or ASP.NET Core MVC), and run the sample application."
slug: downloadinstall_aspnetcore
position: 2
---

# Download & Installation

To set up and install Telerik UI for ASP.NET Core, you first need to add the prerequisites.

## Prerequisites

Telerik UI for ASP.NET Core requires .NET Core.

The offline sample application requires:

* [.NET Core](https://www.microsoft.com/net/learn/get-started)
* [Visual Studio](https://www.visualstudio.com/downloads/)

## Download

To download Telerik UI for ASP.NET Core:

1. Log in to your [Telerik account](https://www.telerik.com/login/).
1. Click **Downloads** in the top navigation.
1. Click **Progress<sup>®</sup> Telerik<sup>®</sup> UI for ASP.NET Core**.
1. In the **Installation**  section select to download the Telerik online installer (`exe` file), the `MSI` installer file directly.

The Telerik UI for ASP.NET Core suite can be included in a project via NuGet without locally installing the suite on the machine. Further information on how to configure such application could be found in the [Getting Started article]({% slug gettingstarted_aspnetmvc6_aspnetmvc %}#configuration-Add).

## Installation

Run the Telerik UI for ASP.NET Core installer. The automatic setup will guide you through the rest of the installation. The setup installs Telerik UI for ASP.NET Core in `C:\Program Files (x86)\Progress\Telerik UI for ASP.NET Core <version>`.

## Distribution Contents

Telerik UI for ASP.NET Core contains the following directories:

* `js`&mdash;These are the minified JavaScript files.
* `styles`&mdash;The minified CSS files and images used by the themes.
* `src`&mdash;The complete JavaScript, CSS, and C# source code. Note that this directory is not available in the trial version.
* `typescript`&mdash;The TypeScript definitions for the Kendo combined scripts (*kendo.all*, *kendo.dataviz*, *kendo.web* and *kendo.mobile*).
* `vsdoc`&mdash;The intellisense definitions for the Kendo combined scripts (as the above).
* `VSExtensions`&mdash;The extensions for Visual Studio 2017.
* `wrappers\aspnetcore\Binaries\AspNet.Core`&mdash;Containing the .nupkg NuGet package file.
* `wrappers\aspnetcore\Examples\AspNet.Core\VS2017`&mdash;The ASP.NET Core sample application built with Visual Studio 2017.
* `wrappers\aspnetcore\EditorTemplates\razor`&mdash;The ready-to-use editor templates based on the Kendo UI widgets.

## Sample Application

Telerik UI for ASP.NET Core comes with a sample .NET Core application, built with Visual Studio 2017, which is an offline version of the [Telerik UI for ASP.NET Core Demos](https://demos.telerik.com/aspnet-core).

> As of the Kendo UI R2 2018 release, the Visual Studio 2015 version of the sample application is no longer distributed because of its deprecated format and limited tooling support.

To run the sample application:

1. Navigate to the installation directory of Telerik UI for ASP.NET Core.
1. Open the Visual Studio 2017 sample project `wrappers\aspnetcore\Examples\AspNet.Core\VS2017\Kendo.Mvc.Examples\Kendo.Mvc.Examples.csproj`.
1. Press `CTRL+F5` to build and run the application.

The sample application Visual Studio Project contains the following items:

* `Views`&mdash;The Razor views.
* `Controllers`&mdash;The Controller classes.
* `Models`&mdash;The Model classes.
* `wwwroot`&mdash;The web application root which, in the **App_Data** folder, contains the LocalDB sample database and the other client resources such as libraries, scripts, styles, and others.

## See Also

* [Get Started with Telerik UI for ASP.NET Core in ASP.NET Core Projects]({% slug gettingstarted_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET Core in ASP.NET Core Projects with the CLI]({% slug gettingstartedcli_aspnetmvc6_aspnetmvc %})
* [Known Issues with Telerik UI for ASP.NET Core]({% slug knownissues_aspnetmvc6_aspnetmvc %})
* [Tag Helpers for ASP.NET Core]({% slug taghelpers_aspnetmvc6_aspnetmvc %})
