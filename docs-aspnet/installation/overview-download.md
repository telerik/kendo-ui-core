---
title: Overview
page_title: Download and Installation Overview
description: "Get started with Telerik UI for ASP.NET Core and learn about the available installation approaches."
previous_url: /getting-started/installation/overview-download
slug: downloadinstall_aspnetcore
position: 1
---

# Download and Installation Overview
This article lists the different approaches for installing Progress® Telerik® UI for ASP.NET Core.

## Requirements

Telerik UI for ASP.NET Core requires .NET Core. To install .NET core, follow the instructions on [Microsoft's .NET Core documentation site](https://docs.microsoft.com/en-us/dotnet/core/windows-prerequisites).

## Download and Installation

To download and install Telerik UI for ASP.NET Core, you can use either of the following approaches:

* Automated installer: 
    * Windows (`.msi`). The [Windows MSI installer package]({% slug msi_install_aspnetmvc6_aspnetmvc %}) comes with a standard setup wizard. The setup wizard installs the Telerik UI for ASP.NET Core server-side packages and the client-side resources. The MSI allows you to chose whether to install the offline version of the [Telerik UI for ASP.NET Core Demos](https://demos.telerik.com/aspnet-core) and the [Telerik UI for ASP.NET Core Visual Studio extensions]({% slug overview_visualstudio_aspnetcore %}). There is also an option that configures the Telerik NuGet feed for you.
    * MacOS (`.pkg`) 
    * Linux (.sh + .tar.gz). Pass -s <path to the archive> when running the script. Other arguments are -d for the location where the archive will be extracted (defaults to ${HOME}/telerik-aspnetcore") and -SkipNETCoreInstall to skip the installation of .NET Core (note that the framework is required).
* [NuGet]({% slug nuget_install_aspnetmvc6_aspnetmvc %}) allows you to install only the packages that you need for your project. The Telerik Nuget feed is available only to registered users because it requires authentication.
* [NPM]({% slug npmpackages_core %}) offers another way to install the needed packages for your project. 
* [Bower]({% slug bowerpackage_core %}) was a popular package manager but starting with ASP.NET Core v2.1 it is no longer supported.

## Next Steps

* [First Steps on Visual Studio for Windows (Online Guide)]({% slug gettingstarted_aspnetmvc6_aspnetmvc %})
* [Install Telerik UI for ASP.NET Core through the Windows MSI installer package]({% slug msi_install_aspnetmvc6_aspnetmvc %})
* [Create a New Project through the Telerik Extensions]({% slug newprojectwizards_visualstudio_aspnetcore %})

## See Also

* [First Steps on Visual Studio for Mac (Online Guide)]({% slug gettingstarted_firststeps_vsmac %})
* [First Steps with CLI (Online Guide)]({% slug gettingstartedcli_aspnetmvc6_aspnetmvc %})
* [Installing Telerik UI for ASP.NET Core with NuGet]({% slug nuget_install_aspnetmvc6_aspnetmvc %})
* [CDN Services]({% slug cdnservices_core %})
* [Installing Telerik UI for ASP.NET Core with NPM]({% slug npmpackages_core %})



