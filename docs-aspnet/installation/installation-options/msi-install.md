---
title: Installing with the MSI Installer
page_title: Installing with the MSI Installer for Windows
description: "Get started with {{ site.product }} and install the components with the Windows MSI Installer Package."
components: ["general"]
previous_url: /getting-started/installation/msi-install, /installation-mvc/msi-install, /installation/msi-install
slug: msi_install_aspnetmvc6_aspnetmvc
position: 3
---

# Installing {{ site.product }} with the MSI Installer for Windows

This article describes how to download and install {{ site.product }} on a Windows machine by using the automated MSI installer file.

Using the MSI Installer gives you the following advantages:

* It allows you to install the [Telerik UI extensions for Visual Studio]({% slug overview_visualstudio_aspnetcore %})&mdash;the extensions provide project templates and automate the project configuration.

* It automatically downloads the license key and saves it to the home directory of the user.

* It can automatically add the Telerik NuGet server to the package manager in Visual Studio.

* It allows you to install the {{ site.product }} [Sample Application](#sample-application)&mdash;you can use this demo app to see how to tackle some common scenarios by using the Telerik UI components.

* You get local copies of all Telerik UI files that you will need for the project configuration, for example, the binaries with the Telerik components, CSS files, Kendo UI scripts, and packages required for document processing, export, and spreadsheet manipulation.

An alternative approach is to use [NuGet]({% slug nuget_install_aspnetmvc6_aspnetmvc %}) and to install only the packages that you need for your project.

## Prerequisites

{% if site.core %}
* Telerik UI for ASP.NET Core requires .NET Core. To install .NET core, follow the instructions on [Microsoft's .NET Core documentation site](https://docs.microsoft.com/en-us/dotnet/core/windows-prerequisites).

* The Telerik UI for ASP.NET Core **Sample Application** distributed with the same package requires:

  * [.NET Core](https://dotnet.microsoft.com/learn/dotnet/hello-world-tutorial/install)

  * [Visual Studio](https://www.visualstudio.com/downloads/) with completely installed `.NET Core cross-platform development` workload.

{% else %}
* Telerik UI for ASP.NET MVC requires the .NET Framework. [Download the current version of the .NET Framework from Microsoft's website.](https://dotnet.microsoft.com/download/dotnet-framework)

* The Telerik UI for ASP.NET MVC **Sample Application** that is distributed with the same package requires:

   * [A current .NET Framework version](https://dotnet.microsoft.com/download/dotnet-framework)
   
   * [Visual Studio](https://www.visualstudio.com/downloads/) 2012 or later
   
   * Microsoft SQL Server Express LocalDB
{% endif %}

## Downloading and Installing

To download the {{ site.product }} MSI installer:

1. Log into your [Telerik account](https://www.telerik.com/login/).

1. Click **Downloads** in the top navigation bar.

{% if site.core %}
1. Click **Progress<sup>®</sup> Telerik<sup>®</sup> UI for ASP.NET Core**.
{% else %}
1. Click **Progress<sup>®</sup> Telerik<sup>®</sup> UI for ASP.NET MVC**.
{% endif %}

1. In the **Installation**  section, select the `msi` installer file.

1. Run the {{ site.product }} installer. The automatic setup will guide you through the rest of the installation. The default installation directory is `C:\Program Files (x86)\Progress\{{ site.product }} <version>`.

To configure the NuGet package source, follow the steps in the [Installing with NuGet]({% slug nuget_install_aspnetmvc6_aspnetmvc %}) article.

## Distribution Contents

You will find the following in the {{ site.product }} installation directory:

* `js`&mdash;These are the minified JavaScript files.
* `styles`&mdash;The non-minified CSS files used by the themes.
* `src`&mdash;Contains an informational `README` saying that you must visit [your Telerik account](https://www.telerik.com/login/) to download the `source.zip` package with the JavaScript, CSS, and C# source code. This directory is not available, if you are using a trial license.
* `VSExtensions`&mdash;The extensions for Visual Studio.
* `typescript`&mdash;The TypeScript definitions for the Kendo combined scripts (`kendo.all`, `kendo.dataviz`, `kendo.web`, and `kendo.mobile`).
* `vsdoc`&mdash;The intellisense definitions for the Kendo combined scripts.
* `pdfviewer`&mdash;The `Telerik.Web.PDF` assembly from the Telerik Document Processing library and its dependencies.
* `dpl`&mdash;The NuGet packages for the Telerik Document Processing library. 
* `export`&mdash;The `Telerik.Core.Export` NuGet package that allows exporting `IEnumerable` sources to XLSX and CSV formats.
* `license-agreements`&mdash;End-user license agreements files.
* `spreadsheet`&mdash;The `Telerik.Web.Spreadsheet` assembly from the Telerik Document Processing library and its dependencies.
{% if site.core %}
* `wrappers\aspnetcore\Binaries\AspNet.Core`&mdash;Containing the .nupkg NuGet package file.
* `wrappers\aspnetcore\EditorTemplates\razor`&mdash;The ready-to-use editor templates based on the Kendo UI widgets.
{% else %}
* `Scaffolding`&mdash;The Kendo UI Scaffolder Visual Studio extension. It enables the generation of the Kendo UI MVC wrapper widget declarations inside Visual Studio projects.
* `wrappers\aspnetmvc\Binaries\MVC5`&mdash;The assemblies for the ASP.NET MVC 5 applications.
* `wrappers\aspnetmvc\EditorTemplates`&mdash;The ready-to-use editor templates based on the Kendo UI widgets.
* `wrappers\aspnetmvc\Examples\MVC5`&mdash;The ASP.NET MVC 5 sample application.
{% endif %}

## Sample Application

{{ site.product }} comes with a [Sample Demos Application]({% slug sample_application %}), in which you can explore and run locally the demos of the components. 

## Next Steps

* [Integrating {{ site.product }} with Visual Studio]({% slug overview_visualstudio_aspnetcore %})
* [Helpers Overview]({% slug knownissues_aspnetmvc6_aspnetmvc %})
* [Helper Methods and Events]({% slug methodevents_core %})

## See Also

{% if site.core %}
* [First Steps on Visual Studio for Windows (Online Guide)]({% slug gettingstarted_aspnetmvc6_aspnetmvc %})
* [First Steps with CLI (Online Guide)]({% slug gettingstartedcli_aspnetmvc6_aspnetmvc %})
{% else %}
* [Collected Examples on ASP.NET MVC](https://github.com/telerik/kendo-examples-asp-net-mvc)
* [Collected Examples on ASP.NET Web Technologies](https://github.com/telerik/kendo-examples-asp-net)
* [Collected Examples on Telerik UI for ASP.NET MVC](https://github.com/telerik/ui-for-aspnet-mvc-examples)
{% endif %}
