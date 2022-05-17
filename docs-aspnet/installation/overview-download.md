---
title: Installation Options
page_title: Download and Installation
description: "Get started with Telerik UI for ASP.NET Core and learn about the available installation approaches."
previous_url: /getting-started/installation/overview-download
slug: downloadinstall_aspnetcore
position: 1
---

# Download and Installation Options

This article lists the different approaches for installing Telerik UI for ASP.NET Core.

The Telerik UI for ASP.NET Core components are server-side wrappers for the [Kendo UI for jQuery components](https://www.telerik.com/kendo-jquery-ui). To configure a working application, you must provide both the binaries and the client-side resources:

* [Binaries](#getting-the-binaries)&mdash;they are available as NuGet packages and you can get them by using one of the [automated installers](#getting-the-binaries) or directly from the [Telerik NuGet server]({% slug nuget_install_aspnetmvc6_aspnetmvc %}). The binaries allow you to utilize the Telerik UI [HtmlHelpers and TagHelpers]({% slug knownissues_aspnetmvc6_aspnetmvc %}).
* [Client-side resources](#providing-the-client-side-resources)&mdash;these are the JavaScript and CSS files that are required by the Telerik UI components.

## Requirements

Telerik UI for ASP.NET Core requires .NET Core. To install .NET core, follow the instructions on <a href="https://docs.microsoft.com/en-us/dotnet/core/windows-prerequisites" target="_blank">Microsoft's .NET Core documentation site</a>.

## Getting the Binaries

To download the NuGet packages that contain the Telerik UI for ASP.NET Core binaries, you can use either of the approaches listed below:

* Automated installer&mdash;you can find it in the downloads section of your [Telerik account](https://www.telerik.com/account). Installers are available for the following operating systems:

    * Windows&mdash;download the `.msi` file. 
    
        The [Windows MSI installer package]({% slug msi_install_aspnetmvc6_aspnetmvc %}) comes with a standard setup wizard. The setup wizard installs the Telerik UI for ASP.NET Core binaries in the form of NuGet packages and the client-side JavaScript and CSS files in a folder on your machine. 
        
        The MSI allows you to chose whether to install the [Telerik UI for ASP.NET Core Visual Studio extensions]({% slug overview_visualstudio_aspnetcore %}) and the offline version of the [Telerik UI for ASP.NET Core Demos](https://demos.telerik.com/aspnet-core). Optionally, the installer can configure the Telerik NuGet feed for you.

    * MacOS&mdash;download the `.pkg` file.

    * Linux&mdash;download the `.sh` and the `.tar.gz` files.
    
        To install Telerik UI on Linux, pass `-s {path to the archive}` when running the script. Use the `-d` argument to provide the location where the `.tar.gz` archive will be extracted (defaults to ${HOME}/telerik-aspnetcore") and `-SkipNETCoreInstall` to skip the installation of .NET Core (note that the framework is required).

* [NuGet]({% slug nuget_install_aspnetmvc6_aspnetmvc %}) allows you to install only the packages that you need for your project. The Telerik NuGet feed is available only to registered users because it requires authentication.

* Archives with setup files&mdash;from the downloads section of your [Telerik account](https://www.telerik.com/account), you can get `.zip` and `.7z` files that include the Telerik UI for ASP.NET Core binaries in the form of NuGet packages and the client-side JavaScript and CSS files.

## Providing the Client-Side Resources

Most of the download and installation approaches in the [Getting the Binaries](#getting-the-binaries) section also provide the required client-side assets. Regardless of the method that you use to download and install the Telerik UI for ASP.NET Core binaries, you must always [include the client-side JavaScript and CSS files in your project]({% slug copyclientresources_aspnetmvc6_aspnetmvc %}).

## Next Steps

* [First Steps on Visual Studio for Windows (Online Guide)]({% slug gettingstarted_aspnetmvc6_aspnetmvc %})
* [Install Telerik UI for ASP.NET Core through the Windows MSI installer package]({% slug msi_install_aspnetmvc6_aspnetmvc %})
* [Create a New Project through the Telerik Extensions]({% slug newprojectwizards_visualstudio_aspnetcore %})

## See Also

* [First Steps on Visual Studio for Mac (Online Guide)]({% slug gettingstarted_firststeps_vsmac %})
* [First Steps with CLI (Online Guide)]({% slug gettingstartedcli_aspnetmvc6_aspnetmvc %})
* [Installing Telerik UI for ASP.NET Core with NuGet]({% slug nuget_install_aspnetmvc6_aspnetmvc %})
* [CDN Services]({% slug cdnservices_core %})
