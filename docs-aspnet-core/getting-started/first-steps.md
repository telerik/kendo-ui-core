---
title: First Steps on VS for Windows
page_title: Getting Started on Visual Studio for Windows | Telerik UI for ASP.NET Core
description: "Create a sample project on Visual Studio for Windows with Progress Telerik UI for ASP.NET Core (aka MVC 6 or ASP.NET Core MVC)."
previous_url: /aspnetmvc-apps/mvc-6/getting-started, /mvc-6/getting-started, /getting-started/getting-started
slug: gettingstarted_aspnetmvc6_aspnetmvc
position: 1
---

# First Steps on VS for Windows

Welcome to the First Steps on Windows guide on getting started with Progress<sup>®</sup> Telerik<sup>®</sup> UI for ASP.NET Core with Visual Studio!

The guide creates a use-case scenario which demonstrates how to start working with the suite and implements the Kendo UI DatePicker for ASP.NET Core in your project by using the Telerik UI DatePicker HtmlHelper or TagHelper. For its purposes, the guide uses Visual Studio for Windows 2019.

To configure an ASP.NET Core web application to use UI for ASP.NET Core you can use either of the following approaches:
* (Demonstrated in this guide) Create the application from scratch and add the necessary setup manually.
* [Use the Telerik UI for ASP.NET Core Visual Studio extensions]({% slug overview_visualstudio_aspnetcore %}) and create an application that has all necessary scripts, styles, and editor templates.

This First Steps on Windows guide includes the following steps:

1. [Create the ASP.NET Core application](#creating-the-application)
1. [Add the UI for ASP.NET Core NuGet package](#adding-the-nuget-package)

## Prerequisites

Follow the instructions from the [official .NET Core documentation site](https://docs.microsoft.com/en-us/dotnet/core/windows-prerequisites).

## Creating the Application

1. Open Visual Studio for Windows 2019 and select **Create a New Project**.
1. Select **ASP.NET Core Web Application** and click **Next**.
1. Set a name and location for the project and click **Create**.
1. Select **Web Application (Model-View-Controller)** and click **Create**.

## Adding the NuGet Package

1. Open the NuGet Package Manager.

	![Locating and opening the NuGet package manager menu](images/manage-nuget.png)

2. Add a new [package source](https://docs.microsoft.com/en-us/nuget/tools/package-manager-ui#package-sources) to https://nuget.telerik.com/nuget.

	![Adding the new NuGet source dialog](images/add-nuget-source.png)

3. From the package source drop-down, select **Telerik Source** and add your credentials (telerik.com email and password) as prompted.

	![Adding the credentials and authenticating for NuGet](images/nuget-authenticate.png)

4. Click the **Browse** tab and search for `Telerik.UI.for.AspNet.Core` to install it. As a result, a line similar to `<PackageReference Include="Telerik.UI.for.AspNet.Core" Version="{{ site.mvcCoreVersion }}" />` is added to your `.csproj` file.

	![Selecting and installing the NuGet package](images/nuget-install.png)

5. Open the `Startup.cs` file and register the Kendo UI services in the `ConfigureServices` method.

		public void ConfigureServices(IServiceCollection services)
		{
			// Add the Kendo UI services to the services container.
			services.AddKendo();
		}

6. Import the `Kendo.Mvc.UI` namespace in `~/Views/_ViewImports.cshtml` through `@using Kendo.Mvc.UI`. If you intend to use the Telerik UI ASP.NET Core Tag Helpers, add them with `@addTagHelper *, Kendo.Mvc`.

        @using MyASPNETCoreProject
	    @using MyASPNETCoreProject.Models
        @addTagHelper *, Microsoft.AspNetCore.Mvc.TagHelpers
        @addTagHelper *, Kendo.Mvc
        @using Kendo.Mvc.UI


7. Include the client-side resources.

	> * The CDN links and/or package versions have to point to the same UI for ASP.NET Core version which your project references.
	> * The Kendo UI scripts have to be placed after `jQuery`.

	7.1 Go to `~\Views\Shared\_Layout.cshtml` and add the theme of your choice to the `<head>` of the document. Since the Microsoft project uses Bootstrap, you can use the Kendo UI SASS Bootstrap v4 theme to match it.

	7.2 The Microsoft template comes with a jQuery script reference in the body. Find it and move it to the head.

	7.3 After `jQuery`, copy and paste the scripts from this snippet. Make sure that the versions match `Kendo.Mvc.dll`. For more information, refer to the article on [including client-side resources]({% slug copyclientresources_aspnetmvc6_aspnetmvc %}).

		<link rel="stylesheet" href="https://kendo.cdn.telerik.com/{{ site.mvcCoreVersion }}/styles/kendo.bootstrap-v4.min.css" />
		<script src="https://kendo.cdn.telerik.com/{{ site.mvcCoreVersion }}/js/kendo.all.min.js"></script>   
		<script src="https://kendo.cdn.telerik.com/{{ site.mvcCoreVersion }}/js/kendo.aspnetmvc.min.js"></script>   			

8. Use a Kendo UI widget by adding the snippet from the following example to `~/Views/Home/Index.cshtml`.

	```tab-HtmlHelper
		<div class="text-center">
    		<h2>Kendo UI DatePicker</h2>
    		@(Html.Kendo().DatePicker()
       			.Name("my-picker")
    		)
		</div>
	```
	```tab-TagHelper
		<div class="text-center">
    		<h2>Kendo UI DatePicker</h2>
			<kendo-datepicker name="my-picker"/>
		</div>
	```

	As a result, the following sample page is created.

    ![Sample page](images/sample-page.png)

## Video Guide

<iframe width="853" height="480" src="https://www.youtube.com/embed/AIFNeWrZCdM?list=PLvmaC-XMqeBaHWzU1zyFgaNi2pcuix6Ps" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Next Steps

* [Use data-bound widgets]({% slug environmentsupport_core %}#json-serialization)
* [Ways to download and install UI for ASP.NET Core (overview)]({% slug downloadinstall_aspnetcore %})
* [Create your own custom bundles]({% slug custombundles_core %})
* [Explore the helper script dependencies]({% slug script_filesfor_barcodes_widgets %})

## See Also

* [Installing UI for ASP.NET Core with Bower]({% slug bowerpackage_core %})
* [Installing UI for ASP.NET Core by Using the CDN Services]({% slug cdnservices_core %})
* [Installing UI for ASP.NET Core with NPM]({% slug npmpackages_core %})
* [Installing UI for ASP.NET Core with NuGet]({% slug nuget_install_aspnetmvc6_aspnetmvc %})
