---
title: Installation Options
page_title: Download and Installation
description: "Get started with {{ site.product }} and learn about the available installation approaches."
previous_url: /getting-started/installation/overview-download, /getting-started/installation/overview, /installation-mvc/overview
slug: downloadinstall_aspnetcore
position: 1
---

# {{ site.product }} Download and Installation Options

This article outlines the approaches for downloading and installing the binaries with the {{ site.product }} components and for providing the client-side resources. This approach is applicable only for Windows users.

Installing the {{ site.product }} provides the opportuity to:

* Use the Telerik UI controls offline (no Internet connection required).
* Running the demos in offline mode.
* Implementing new features in the application by using wizards and templates.

The {{ site.product }} components are server-side wrappers for the [Kendo UI for jQuery components](https://www.telerik.com/kendo-jquery-ui). To configure a working application, you must provide both the binaries and the client-side resources:

{% if site.core %}
* [Binaries](#getting-the-binaries)&mdash;they are available as NuGet packages and you can get them by using one of the [automated installers](#getting-the-binaries) or directly from the [Telerik NuGet server]({% slug nuget_install_aspnetmvc6_aspnetmvc %}). The binaries allow you to utilize the Telerik UI [HtmlHelpers and TagHelpers]({% slug knownissues_aspnetmvc6_aspnetmvc %}).
{% else %}
* [Binaries](#getting-the-binaries)&mdash;they are available as `dll` files and you can get them by using the [automated installer](#getting-the-binaries) or directly from the [Telerik NuGet server]({% slug nuget_install_aspnetmvc6_aspnetmvc %}). The binaries allow you to utilize the Telerik UI [HtmlHelpers]({% slug knownissues_aspnetmvc6_aspnetmvc %}).
{% endif %}

* [Client-side resources](#providing-the-client-side-resources)&mdash;these are the JavaScript and CSS files that are required by the Telerik UI components.

## Requirements

{% if site.core %}
Telerik UI for ASP.NET Core requires .NET Core. To install .NET core, follow the instructions on <a href="https://docs.microsoft.com/en-us/dotnet/core/windows-prerequisites" target="_blank">Microsoft's .NET Core documentation site</a>.
{% else %}
Telerik UI for ASP.NET MVC requires the .NET Framework. To download the current version of the .NET Framework, [visit Microsoft's website](https://dotnet.microsoft.com/download/dotnet-framework).
{% endif %}

## Getting the Binaries

To download the {{ site.product }} binaries with the components, you can use either of the approaches listed below:

{% if site.core %}
* Automated installer&mdash;you can find it in the downloads section of your [Telerik account](https://www.telerik.com/account). Installers are available for the following operating systems:

    * Windows&mdash;download the `.msi` file. 
    
        The [Windows MSI installer package]({% slug msi_install_aspnetmvc6_aspnetmvc %}) comes with a standard setup wizard. The setup wizard installs the Telerik UI for ASP.NET Core binaries in the form of NuGet packages and the client-side JavaScript and CSS files in a folder on your machine. 
        
        The MSI allows you to chose whether to install the [Telerik UI for ASP.NET Core Visual Studio extensions]({% slug overview_visualstudio_aspnetcore %}) and the offline version of the [Telerik UI for ASP.NET Core Demos](https://demos.telerik.com/aspnet-core). Optionally, the installer can configure the Telerik NuGet feed for you.

    * MacOS&mdash;download the `.pkg` file.

    * Linux&mdash;download the `.sh` and the `.tar.gz` files.
    
        To install Telerik UI on Linux, pass `-s {path to the archive}` when running the script. Use the `-d` argument to provide the location where the `.tar.gz` archive will be extracted (defaults to `${HOME}/telerik-aspnetcore`) and `-SkipNETCoreInstall` to skip the installation of .NET Core (note that the framework is required).

{% else %}
* Download and install the automated installer&mdash;you can find it in the downloads section of your [Telerik account](https://www.telerik.com/account). 
    
    The [automated MSI installer package]({% slug msi_install_aspnetmvc6_aspnetmvc %}) comes with a standard setup wizard. The setup wizard installs the Telerik UI for ASP.NET MVC binaries and the required client-side resources in a folder on your machine.
    
    The MSI allows you to choose whether to install the [Telerik UI for ASP.NET MVC Visual Studio extensions]({% slug overview_visualstudio_aspnetcore %}) and the offline version of the [Telerik UI for ASP.NET MVC Demos](https://demos.telerik.com/aspnet-mvc). Optionally, the installer can configure the Telerik NuGet feed for you.
{% endif %}

* An alternative approach to installing the {{ site.product }} on your machine is to [use the Telerik NuGet server]({% slug nuget_install_aspnetmvc6_aspnetmvc %}) to add the required packages to your project.

{% if site.core %}
* Archives with setup files&mdash;from the downloads section of your [Telerik account](https://www.telerik.com/account), you can get `.zip` and `.7z` files that include the Telerik UI for ASP.NET Core binaries in the form of NuGet packages and the client-side JavaScript and CSS files. The [files included in the archive]({% slug msi_install_aspnetmvc6_aspnetmvc %}#distribution-contents) are identical with those that you get when you use the automated installer, but you don't get the automatic NuGet configuration and the Visual Studio extensions.
{% else %}
* Archives with setup files&mdash;from the downloads section of your [Telerik account](https://www.telerik.com/account), you can get `.zip` and `.7z` files that include the Telerik UI for ASP.NET MVC binaries and the client-side JavaScript and CSS files. The [files included in the archive]({% slug msi_install_aspnetmvc6_aspnetmvc %}#distribution-contents) are identical with those that you get when you use the automated installer, but you don't get the automatic NuGet configuration and the Visual Studio extensions.
{% endif %}

## Providing the Client-Side Resources

Regardless of the method that you use to download and install the {{ site.product }} binaries, you must always [include the client-side JavaScript and CSS files in your project]({% slug copyclientresources_aspnetmvc6_aspnetmvc %}). The reason is that the {{ site.product }} are server-side wrappers for the [Kendo UI for jQuery components](https://www.telerik.com/kendo-jquery-ui).

If you use the automated installer or the archive with the setup files, you will have all needed client-side resources locally on your machine. Alternatively, you can provide them as online resources by using the Telerik CDN. For more information, see [Providing Client-Side Resources]({% slug copyclientresources_aspnetmvc6_aspnetmvc %}).

## Next Steps

* [Install {{ site.product }} through the Windows MSI installer package]({% slug msi_install_aspnetmvc6_aspnetmvc %})
* [Install {{ site.product }} with NuGet]({% slug nuget_install_aspnetmvc6_aspnetmvc %})
* [Create a New Project through the Telerik Extensions]({% slug newprojectwizards_visualstudio_aspnetcore %})

## See Also
{% if site.core %}
* [First Steps on Visual Studio for Mac (Online Guide)]({% slug gettingstarted_firststeps_vsmac %})
* [First Steps with CLI (Online Guide)]({% slug gettingstartedcli_aspnetmvc6_aspnetmvc %})
* [Using the CDN Services]({% slug cdnservices_core %})
{% else %}
* [Starting a project with a template]({% slug gettingstarted_aspnetmvc %})
* [Adding Telerik UI through local files]({% slug manualsetup_aspnetmvc %})
{% endif %}
