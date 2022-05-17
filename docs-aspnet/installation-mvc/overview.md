---
title: Installation Options
page_title: Download and Installation
description: "Discover the various installation approaches that allow you to use Telerik UI for ASP.NET MVC in you next MVC project."
previous_url: getting-started/installation/overview
slug: overview_downloadinstallation_mvc
position: 2
---

# Download and Installation Options

To use the Telerik UI for ASP.NET MVC in a project, the first thing that you need are the binaries with the Telerik UI components. Additionally, you must also provide the required client-side resources like CSS and Kendo UI JavaScript files.

This article outlines the most common approaches for downloading and installing the binaries with the components and for providing the client-side resources.

## Prerequisites

Telerik UI for ASP.NET MVC requires the .NET Framework. [Download the current version of the .NET Framework from Microsoft's website.](https://dotnet.microsoft.com/download/dotnet-framework)

## Getting the Binaries

To download the Telerik UI for ASP.NET MVC binaries with the components, you can use either of the approaches listed below:

* Download and install the automated installer&mdash;you can find it in the downloads section of your [Telerik account](https://www.telerik.com/account). 
    
    The [automated MSI installer package]({% slug msi_install_mvc %}) comes with a standard setup wizard. The setup wizard installs the Telerik UI for ASP.NET MVC binaries and the required client-side resources in a folder on your machine.
    
    The MSI allows you to choose whether to install the [Telerik UI for ASP.NET MVC Visual Studio extensions]({% slug overview_visualstudio_aspnetmvc %}) and the offline version of the [Telerik UI for ASP.NET MVC Demos](https://demos.telerik.com/aspnet-mvc). Optionally, the installer can configure the Telerik NuGet feed for you.

* Use the Telerik [NuGet]({% slug aspnetmvc_nuget %}) server&mdash;it allows you to install only the packages that you need for your project. The Telerik NuGet feed is available only to registered users because it requires authentication.

* Download the archives with setup files&mdash;from the downloads section of your [Telerik account](https://www.telerik.com/account), you can get `.zip` and `.7z` files that include the Telerik UI for ASP.NET MVC binaries and the client-side JavaScript and CSS files. The [files included in the archive]({% slug msi_install_mvc %}#distribution-contents) are identical with those that you get when you use the automated installer, but you don't get the automatic NuGet configuration and the Visual Studio extensions.

## Providing the Client-Side Resources

Regardless of the method that you use to get the binaries with the Telerik UI components, you must always [provide your project with the Kendo UI client-side resources]({% slug copyclientresources_aspnetmvc %}) that include CSS and JavaScript files. The reason is that the Telerik UI for ASP.NET MVC components are server-side wrappers for the [Kendo UI for jQuery components](https://www.telerik.com/kendo-jquery-ui).

If you use the automated MSI installer or the archive with the setup files, you will have all needed client-side resources locally on your machine. Alternatively, you can provide them as online resources by using the Telerik CDN. For more information, see [Providing Client-Side Resources]({% slug copyclientresources_aspnetmvc %}).

## Next Steps

* [Install Telerik UI for ASP.NET MVC with the automated MSI installer]({% slug msi_install_mvc %})
* [Install Telerik UI for ASP.NET MVC with NuGet]({% slug aspnetmvc_nuget %})
* [Scaffold the Telerik UI for ASP.NET MVC project]({% slug scaffolding_aspnetmvc %})

## See Also

* [Starting a project with a template]({% slug gettingstarted_aspnetmvc %})
* [Adding Telerik UI through local files]({% slug manualsetup_aspnetmvc %})
