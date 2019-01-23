---
title: Introduction
page_title: Introduction | Progress Telerik UI for ASP.NET Core
description: "Download and install Progress Telerik UI for ASP.NET Core (aka MVC 6 or ASP.NET Core MVC), and run the sample application."
previous_url: /aspnetmvc-apps/mvc-6/introduction, /mvc-6/introduction
slug: overview_aspnetmvc6_aspnetmvc
position: 1
---

# Progress<sup>®</sup> Telerik<sup>®</sup> UI for ASP.NET Core

[Telerik UI for ASP.NET Core](https://www.telerik.com/aspnet-core-ui) is a set of server-side wrappers that allows you to use the [Kendo UI widgets](../kendo-ui/introduction) in .NET Core.

This article demonstrates how to use Telerik UI for ASP.NET Core in ASP.NET Core applications.

## Supported Environments

Telerik UI for ASP.NET Core targets the stable releases of the ASP.NET Core framework. The target runtime is [CoreCLR](https://github.com/dotnet/coreclr). The UI for ASP.NET Core suite also supports the full desktop CLR.

## Resources

To get started, refer to the [ASP.NET Core Documentation](https://docs.asp.net/en/latest/index.html).

To facilitate the process of tracking down particular issues or behaviors, use the following repositories which contain source code, instructions, and issue trackers for the ASP.NET project.

- [ASP.NET Core](https://github.com/aspnet/AspNetCore) (on GitHub)
- [ASP.NET Core Announcements](https://github.com/aspnet/announcements/) (for important changes)
- [Telerik UI for ASP.NET Core Demos and Sample Applications](https://demos.telerik.com/aspnet-core)

## Setup

To set up and install Telerik UI for ASP.NET Core, refer to the following sections:

* [Prerequisites](#prerequisites)
* [Download](#download)
* [Installation](#installation)
* [Distribution Contents](#distribution-contents)

### Prerequisites

Telerik UI for ASP.NET Core requires .NET Core.

The offline sample application requires:

* [.NET Core](https://www.microsoft.com/net/learn/get-started)
* [Visual Studio](https://www.visualstudio.com/downloads/)

### Download

To download Telerik UI for ASP.NET Core:

1. Log in to your [Telerik account](https://www.telerik.com/login/).

1. Click **Downloads** in the top navigation.

1. Click **Progress<sup>®</sup> Telerik<sup>®</sup> UI for ASP.NET Core**.

1. In the **Installation**  section select to download the Telerik online installer (`exe` file), the `MSI` installer file directly.

The Telerik UI for ASP.NET Core suite can be included in a project via NuGet without locally installing the suite on the machine. Further information on how to configure such application could be found in the [Getting Started article]({% slug gettingstarted_aspnetmvc6_aspnetmvc %}#configuration-Add).

### Installation

Run the Telerik UI for ASP.NET Core installer. The automatic setup will guide you through the rest of the installation. The setup installs Telerik UI for ASP.NET Core in `C:\Program Files (x86)\Progress\Telerik UI for ASP.NET Core <version>`.

### Distribution Contents

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

> **Important**
>
> As of the Kendo UI R2 2018 release, the Visual Studio 2015 version of the sample application is no longer distributed because of its deprecated format and limited tooling support.

### Running the Sample Application

To run the sample application:

1. Navigate to the installation directory of Telerik UI for ASP.NET Core.

1. Open the Visual Studio 2017 sample project `wrappers\aspnetcore\Examples\AspNet.Core\VS2017\Kendo.Mvc.Examples\Kendo.Mvc.Examples.csproj`.

1. Press `CTRL+F5` to build and run the application.

### Distribution Contents

The sample application Visual Studio Project contains the following items:

* `Views`&mdash;The Razor views.
* `Controllers`&mdash;The Controller classes.
* `Models`&mdash;The Model classes.
* `wwwroot`&mdash;The web application root which, in the **App_Data** folder, contains the LocalDB sample database and the other client resources such as libraries, scripts, styles, and others.

## Upgrade

You can upgrade the version of the Telerik UI for ASP.NET Core wrappers and also switch from a trial to a developer license.

### Upgrade to Newer Versions

To update Telerik UI for ASP.NET Core to a new version, either:

* Upgrade with NuGet and Bower, or
* Manually replace the references and files.

#### Upgrade with NuGet and Bower

To upgrade the version with NuGet and Bower:

1. In Visual Studio, open the NuGet Package Manager on the **Installed** tab and click **Update** for the **Telerik.UI.for.AspNet.Core** package.
1. In Visual Studio, open the Bower Package Manager on the **Installed** tab and click **Update** for the **kendo-ui** package.
1. In the application, manually replace any references which point to the old Kendo UI resource files such as scripts and styles.

> **Important**
>
> To properly load the Telerik and Kendo UI packages, both [NuGet](https://docs.telerik.com/aspnet-mvc/getting-started/nuget-install#set-up-nuget-package-source) and [Bower](https://docs.telerik.com/kendo-ui/intro/installation/bower-install#kendo-ui-professional) require authentication.

#### Manual Upgrade

1. [Download](#download) the desired version from the **Download** section of your account.
1. Replace all [scripts, styles, and images](#distribution-contents) that are related to Telerik UI for ASP.NET Core with the desired version of the framework.
1. Change the reference to the new `Kendo.MVC` dll and verify that the dll refers to the correct ASP.NET Core version.
1. In the application, manually replace any references which point to the old Kendo UI resource files such as scripts and styles.

### Upgrade from Trial to Licensed Versions

1. Before you upgrade to a licensed version, delete (uninstall) the trial version from your machine. This deletion eliminates the possibility for trial assemblies to end up in the project references or in production.
1. [Install](#installation) the licensed Kendo UI version and follow the steps for updating the Telerik UI for ASP.NET Core version.

## See Also

* [Get Started with Telerik UI for ASP.NET Core in ASP.NET Core Projects]({% slug gettingstarted_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET Core in ASP.NET Core Projects with the CLI]({% slug gettingstartedcli_aspnetmvc6_aspnetmvc %})
* [Known Issues with Telerik UI for ASP.NET Core]({% slug knownissues_aspnetmvc6_aspnetmvc %})
* [Tag Helpers for ASP.NET Core]({% slug taghelpers_aspnetmvc6_aspnetmvc %})
