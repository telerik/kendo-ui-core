---
title: Getting Started with VS 2017
page_title: Getting Started with Progress<sup>®</sup> Telerik<sup>®</sup> UI for ASP.NET Core and Visual Studio | Telerik UI for ASP.NET Core
description: "Learn the basics when working with Progress Telerik UI for ASP.NET Core (aka MVC 6 or ASP.NET Core MVC) and Visual Studio."
previous_url: /aspnetmvc-apps/mvc-6/getting-started, /mvc-6/getting-started
slug: gettingstarted_aspnetmvc6_aspnetmvc
position: 1
---

# Getting Started with Progress<sup>®</sup> Telerik<sup>®</sup> UI for ASP.NET Core

This article demonstrates how to configure an ASP.NET Core project to use Telerik UI for ASP.NET Core in Visual Studio (VS) 2017.

## Prerequisites

The prerequisites for creating and running an ASP.NET Core on Windows with VS 2017 are described on the [.NET Core documentation site](https://docs.microsoft.com/en-us/dotnet/core/windows-prerequisites).

> **Important**
>
> You can use Visual Studio 2015 only for .NET Core 1.x development. However, this approach is not recommended because:
> * The .NET Core tooling is in a preview version which is not officially supported.
> * The projects are `project.json`-based which is deprecated.
>
> If you use Visual Studio 2015, to ensure the matching of the ASP.NET Core version which is distributed with the Telerik UI for ASP.NET Core, manually change the `Microsoft.AspNetCore.Routing` and `Microsoft.AspNetCore.Mvc` versions to `1.1.0` in `project.json`.

## Configuration

Configure an ASP.NET Core Web Application to use Telerik UI for ASP.NET Core:

1. Create an [ASP.NET Core Web Application](#configuration-Create).
2. Add the [Kendo UI NuGet package](#configuration-Add).

### Create ASP.NET Core Project

1. Select **File** > **New Project**.
2. Select **Installed** > **Visual C#** > **Web** > **ASP.NET Core Web Application**.
3. Set a name and location for the project and click **OK**.
4. Select **Web Application** from the **ASP.NET Core Templates** dialog.
5. Click **OK** to create the project.

### Add the Telerik UI for ASP.NET Core NuGet Package

1. Before you continue, set up the [`Telerik NuGet Private Feed`](../../aspnet-mvc/getting-started/nuget-install#set-up-nuget-package-source) with your `Telerik account credentials`. Store the password in `clear text` because the .NET Core tooling does not support encryption.

2. Open the NuGet Package Manager.

  **Figure 1. The NuGet package manager**

  ![NuGet package manager](images/manage-nuget-packages.png)

3. Click the **Browse** tab, select the Telerik package source and search for `Telerik.UI.for.AspNet.Core`.

4. Install the `Telerik.UI.for.AspNet.Core` package. It adds a line to your `.csproj` file similar to the following example.

    ###### Example

		<PackageReference Include="Telerik.UI.for.AspNet.Core" Version="{{ site.mvcCoreVersion }}" />

5. Open `Startup.cs` and update it in the following way:

	* Locate the `ConfigureServices` method and add the calls.

		###### Example

			public void ConfigureServices(IServiceCollection services)
			{
				...
				// Maintain property names during serialization. See:
				// https://github.com/aspnet/Announcements/issues/194
				services
					.AddMvc()
					.AddJsonOptions(options =>
						options.SerializerSettings.ContractResolver = new DefaultContractResolver());

				// Add Kendo UI services to the services container
				services.AddKendo();
			}

	* Add the required `using Newtonsoft.Json.Serialization` line.

		###### Example

			...
			using Newtonsoft.Json.Serialization;
			...

	* Locate the `Configure` method and add a call to `app.UseKendo` at the end.

		###### Example

			public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
			{
				...

				// Configure Kendo UI
				app.UseKendo(env);
			}

6. Import the `Kendo.Mvc.UI` namespace in `~/Views/_ViewImports.cshtml` through `@using Kendo.Mvc.UI`.

    ###### Example

            @using MyASPNETCoreProject
            @addTagHelper *, Microsoft.AspNetCore.Mvc.TagHelpers
            @addTagHelper *, Kendo.Mvc
            @using Kendo.Mvc.UI

7. Copy the Kendo UI client-side resources. You can use either of the following approaches:

    * Manual installation&mdash;To manually install the resources, copy the `js` and `styles` folders from the `telerik.ui.for.aspnetmvc` archive to `wwwroot\lib\kendo-ui`. The archive is located in **Downloads** > **Telerik UI for ASP.NET Core** of your [www.telerik.com](http://www.telerik.com/) account.

        **Figure 2. Kendo UI resources**

        ![Kendo UI resources](images/kendo-ui-wwwroot.png)

    * Bower package installation&mdash;For more information on how to achieve this, refer to the [Kendo UI Professional Bower package installation](../../kendo-ui/intro/installation/bower-install).

8. Register the Kendo UI styles and scripts in `~/Views/Shared/_Layout.cshtml`.

	  > **Important**
    >
    > In the default .NET Core template, the jQuery scripts are included at the end of the `<body>` element. To properly load the Telerik UI for ASP.NET HtmlHelpers, move the jQuery scripts and the Kendo UI client-side scripts to the `<head>` element and make sure that the Kendo UI scripts are loaded after the jQuery ones.

    ###### Example

        <head>
            ...

            <environment include="Development">
                ...

                <link rel="stylesheet" href="~/lib/kendo-ui/styles/kendo.common-nova.min.css" />
                <link rel="stylesheet" href="~/lib/kendo-ui/styles/kendo.nova.min.css" />
            </environment>
            <environment exclude="Development">
                ...

				<link rel="stylesheet"
                    href="https://kendo.cdn.telerik.com/{{ site.cdnVersion }}/styles/kendo.common-nova.min.css"
                    asp-fallback-href="~/lib/kendo-ui/styles/kendo.common-nova.min.css"
                    asp-fallback-test-class="k-common-test-class"
                    asp-fallback-test-property="opacity" asp-fallback-test-value="0" />

				<link rel="stylesheet"
                    href="https://kendo.cdn.telerik.com/{{ site.cdnVersion }}/styles/kendo.nova.min.css"
                    asp-fallback-href="~/lib/kendo-ui/styles/kendo.nova.min.css"
                    asp-fallback-test-class="k-theme-test-class"
                    asp-fallback-test-property="opacity" asp-fallback-test-value="0" />
            </environment>

            <environment include="Development">
                ...

                <script src="~/lib/jquery/dist/jquery.js"></script>

                @* Place Kendo UI scripts after jQuery *@
                <script src="~/lib/kendo-ui/js/kendo.all.min.js"></script>
                <script src="~/lib/kendo-ui/js/kendo.aspnetmvc.min.js"></script>
            </environment>
            <environment exclude="Development">
                ...

                <script src="https://ajax.aspnetcdn.com/ajax/jquery/jquery-2.2.0.min.js"
                        asp-fallback-src="~/lib/jquery/dist/jquery.min.js"
                        asp-fallback-test="window.jQuery"
                        crossorigin="anonymous"
                        integrity="sha384-K+ctZQ+LL8q6tP7I94W+qzQsfRV2a+AfHIi9k8z8l9ggpc8X+Ytst4yBo/hH+8Fk">
                </script>

                @*  Place Kendo UI scripts after jQuery *@
                <script src="https://kendo.cdn.telerik.com/{{ site.cdnVersion }}/js/kendo.all.min.js"
                        asp-fallback-src="~/lib/kendo-ui/js/kendo.all.min.js"
                        asp-fallback-test="window.kendo">
                </script>
                <script src="https://kendo.cdn.telerik.com/{{ site.cdnVersion }}/js/kendo.aspnetmvc.min.js"
                        asp-fallback-src="~/lib/kendo-ui/js/kendo.aspnetmvc.min.js"
                        asp-fallback-test="kendo.data.transports['aspnetmvc-ajax']">
                </script>
            </environment>

            ...
        </head>

9. Use a Kendo UI widget by adding the snippet from the following example to `~/Views/Home/Index.cshtml`.

    ###### Example

		<h2>Kendo UI DatePicker</h2>

		@(Html.Kendo().DatePicker()
				.Name("datepicker")
		)

	Now that all is done, you can see the sample page.

    **Figure 3. The end result&mdash;a sample page**

    ![Sample page](images/sample-page.png)

## See Also

* [Overview of Telerik UI for ASP.NET Core]({% slug overview_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET Core and VS Code]({% slug gettingstartedvscode_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET Core on Linux / MacOS]({% slug gettingstartedlinux_aspnetmvc6_aspnetmvc %})
* [Known Issues with Telerik UI for ASP.NET Core]({% slug knownissues_aspnetmvc6_aspnetmvc %})
* [Tag Helpers for ASP.NET Core]({% slug taghelpers_aspnetmvc6_aspnetmvc %})
