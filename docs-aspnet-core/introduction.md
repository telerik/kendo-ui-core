---
title: Overview
page_title: Overview | Progress Telerik UI for ASP.NET Core
description: "Download and install Progress Telerik UI for ASP.NET Core (aka MVC 6 or ASP.NET Core MVC), and run the sample application."
previous_url: /aspnetmvc-apps/mvc-6/introduction, /mvc-6/introduction
slug: overview_aspnetmvc6_aspnetmvc
position: 1
---

# Overview of Progress<sup>®</sup> Telerik<sup>®</sup> UI for ASP.NET Core

[Telerik UI for ASP.NET Core](http://www.telerik.com/aspnet-core-ui) is a set of server-side wrappers that allows using the [Kendo UI widgets](../kendo-ui/introduction) in .NET Core.

This article demonstrates how to use Telerik UI for ASP.NET Core in ASP.NET Core applications.

## The Basics

### Supported Environments

Telerik UI for ASP.NET Core targets the stable releases of the ASP.NET Core framework.

The target runtime is [CoreCLR](https://github.com/dotnet/coreclr). The full desktop CLR is also supported.

### Resources

To get started, refer to the [ASP.NET Core Documentation](http://docs.asp.net/en/latest/index.html).

The repositories below contain source code, instructions, and issue trackers for the ASP.NET project. These are immensely useful when you need to track down particular issues or behaviors.

- [ASP.NET Home](https://github.com/aspnet/home) on GitHub.
- [ASP.NET MVC](https://github.com/aspnet/Mvc) main repository.
- [ASP.NET MVC Announcements](https://github.com/aspnet/announcements/) for important changes.
- [Telerik UI for ASP.NET Core Demos and Sample Applications](http://demos.telerik.com/aspnet-core).

## Requirements

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

## Installation

Run Telerik UI for ASP.NET Core installer. The automatic setup will guide you through the rest of the installation.

### Location

The setup installs Telerik UI for ASP.NET Core in `C:\Program Files (x86)\Progress\Telerik UI for ASP.NET Core <version>`.

### Distribution Contents

Telerik UI for ASP.NET Core contains the following directories:

* `js`&mdash;These are the minified JavaScript files.
* `styles`&mdash;The minified CSS files and images used by the themes.
* `src`&mdash;The complete JavaScript, CSS, and C# source code. Note that this directory is not available in the trial version.
* `typescript`&mdash;The TypeScript definitions for the Kendo combined scripts (*kendo.all*, *kendo.dataviz*, *kendo.web* and *kendo.mobile*).
* `vsdoc`&mdash;The intellisense definitions for the Kendo combined scripts (as the above).
* `VSExtensions`&mdash;The extensions for Visual Studio 2015 and 2017.
* `wrappers\aspnetcore\Binaries\AspNet.Core`&mdash;Containing the .nupkg NuGet package file.
* `wrappers\aspnetcore\Examples\AspNet.Core\VS2015`&mdash;The ASP.NET Core sample application built with Visual Studio 2015.
* `wrappers\aspnetcore\Examples\AspNet.Core\VS2017`&mdash;The ASP.NET Core sample application built with Visual Studio 2017.
* `wrappers\aspnetcore\EditorTemplates\razor`&mdash;The ready-to-use editor templates based on the Kendo UI widgets.

## Sample Application

Telerik UI for ASP.NET Core comes with a sample .NET Core application available in 2 versions:

* The .NET Core application built with Visual Studio 2015.
* The .NET Core application built with Visual Studio 2017.

### Running the Sample Application

To run the sample application:

1. Navigate to the installation directory of Telerik UI for ASP.NET Core.

1. Open the sample Visual Studio Solution:

* Open `wrappers\aspnetcore\Examples\AspNet.Core\VS2015\Kendo.Mvc.Examples\Kendo.Mvc.Examples.xproj` with Visual Studio 2015; or
* Open `wrappers\aspnetcore\Examples\AspNet.Core\VS2017\Kendo.Mvc.Examples\Kendo.Mvc.Examples.xproj` with Visual Studio 2017.

1. Press `CTRL+F5` to build and run the application.

### Distribution Contents

The sample application Visual Studio solution contains the following items:

* `Views`&mdash;the Razor views.
* `Controllers`&mdash;Controller classes.
* `Models`&mdash;Model classes.
* `wwwroot`&mdash;the web app root, containing the LocalDB sample database (in the *App_Data* folder) and the other client resources (libraries, scripts, styles and others).

## Upgrade

### Upgrade to Newer Versions

You can upgrade the version of the Telerik UI for ASP.NET Core wrappers manually to a newer version:

1. Replace all [scripts, styles, and images](#distribution-contents) related to Telerik UI for ASP.NET Core with the desired version of the framework. [Download](#download) the desired version from the **Download** section of your account.
1. Change the reference to the new [Kendo.MVC dll]({% slug gettingstarted_aspnetmvc6_aspnetmvc %}#configuration-Add). Verify that the dll refers to the correct ASP.NET Core version.

### Upgrade From Trial to Licensed Versions

1. Before upgrading to a licensed version, delete (uninstall) the trial version from your machine. This eliminates the possibility for trial assemblies to end up in the project references or in production.
1. [Install](#installation) the licensed Kendo UI version and follow the steps for updating the Telerik UI for ASP.NET Core version.

## See Also

* [Get Started with Telerik UI for ASP.NET Core in ASP.NET Core Projects]({% slug gettingstarted_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET Core in ASP.NET Core Projects on Linux]({% slug gettingstartedlinux_aspnetmvc6_aspnetmvc %})
* [Known Issues with Telerik UI for ASP.NET Core]({% slug knownissues_aspnetmvc6_aspnetmvc %})
* [Tag Helpers for ASP.NET Core]({% slug taghelpers_aspnetmvc6_aspnetmvc %})
