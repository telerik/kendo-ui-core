---
title: Getting Started on Linux and MacOS
page_title: Getting Started on Linux and MacOS | Progress Telerik UI for ASP.NET Core
description: "Learn the basics when working with Progress Telerik UI for ASP.NET Core (aka MVC 6 or ASP.NET Core MVC) on Linux."
previous_url: /aspnetmvc-apps/mvc-6/getting-started-linux, /mvc-6/getting-started-linux
slug: gettingstartedlinux_aspnetmvc6_aspnetmvc
position: 3
---

# Getting Started on Linux and MacOS

This article demonstrates how to configure an ASP.NET Core project that enables you to use Telerik UI for ASP.NET Core on Linux / MacOS.

> **Important**
>
> The following steps are tested on Ubuntu 14.04 and 16.04. and on MacOS X High Siearra 10.13.

## Prerequisites

* Install [Microsoft ASP.NET](http://docs.asp.net/en/latest/getting-started/installing-on-linux.html)

## Configuration

To configure an ASP.NET Core project that enables you to use Telerik UI for ASP.NET Core on Linux:

1. Create an [ASP.NET Core web application](#configuration-Create).
2. Add the Kendo UI [NuGet package](#configuration-Add).

### Create ASP.NET Core Web Application

> **Important**
>
> If you are configuring an existing project, skip this step.

Below are listed the steps for you to follow when creating an ASP.NET Core web site.

1. By using the Terminal, navigate to the folder where you want to create the project folder.

    ###### Example

		kendo@kendo-docker:~$ mkdir Projects
		kendo@kendo-docker:~$ cd Projects/
		kendo@kendo-docker:~/Projects$

2. Run [`dotnet new razor`](https://docs.microsoft.com/en-us/dotnet/core/tools/dotnet-new) to create a .Net Core application using the default web template with Razor Pages.

3. Run [`dotnet restore`](https://docs.microsoft.com/en-us/dotnet/core/tools/dotnet-restore) to restore the project template dependencies.

    > **Important**
    >
    > For up-to-date commands, refer to the [guide on getting started with .NET Core](https://docs.asp.net/en/latest/getting-started.html).

    As a result, the NuGet packages are downloaded. The following example demonstrates a result that is similar to the end of the response you are expected to receive.

    ###### Example

		Restore complete, 10070ms elapsed

		kendo@kendo-docker:~/Projects/WebApplicationBasic$

8. Start the application by running [`dotnet run`](https://docs.microsoft.com/en-us/dotnet/core/tools/dotnet-run). The following example demonstrates the response you are expected to receive.

    ###### Example

		Hosting environment: Production
		Now listening on: http://localhost:5000
		Application started. Press Ctrl+C to shut down.

9. Use your favorite browser to navigate to the above location and make sure the application is working in the way shown below. After you check the application in the browser, stop the server.

    **Figure 1. The web application in the browser**

    ![Web application in browser](images/website.png)

### Add the Telerik.UI.for.AspNet.Core NuGet Package

1. Open the `project.json` file by using a text editor, add the `Telerik.UI.for.AspNet.Core` dependency, and replace `productVersion` with an actual **Telerik UI for ASP.NET Core** version&mdash;for example, `{{site.cdnVersion}}`.

    ###### Example

		"dependencies": {
			...
			"Telerik.UI.for.AspNet.Core": "{{site.cdnVersion}}"
		}

2. Add the private Telerik NuGet feed. You could either:

	* Create the following two configuration files containing your `telerik.com` credentials on your machine: `~/.config/NuGet/NuGet.Config` and `~/.nuget/NuGet/NuGet.Config`; or
	* Create a `NuGet.Config` file in the project folder.
	
	Each of the above files should contain the following XML:
	
	###### Example

        ```
        <?xml version="1.0" encoding="utf-8"?>
        <configuration>
          <packageSources>
            <add key="nuget.org" value="https://api.nuget.org/v3/index.json" protocolVersion="3" />
            <add key="telerik.com" value="https://nuget.telerik.com/nuget" />
          </packageSources>
          <packageSourceCredentials>
            <telerik.com>
              <add key="Username" value="[ your.telerik.com@email.login ]" />
              <add key="ClearTextPassword" value="[ your.telerik.com.password.in.clear.text ]" />
            </telerik.com>
          </packageSourceCredentials>
        </configuration>
        ```

3. Open `Startup.cs` by using a text editor (IDE) and update it in the way demonstrated in the following examples.

    * Locate the `ConfigureServices` method and add a call to `services.AddKendo` at the end.

		###### Example

			...
			using Newtonsoft.Json.Serialization;
			...
			public void ConfigureServices(IServiceCollection services)
			{
				...
				// Maintain property names during serialization. See:
				// https://github.com/aspnet/Announcements/issues/194
				services
					.AddMvc()
					.AddJsonOptions(options => options.SerializerSettings.ContractResolver = new DefaultContractResolver());

				// Add Kendo UI services to the services container
				services.AddKendo();
			}

    * Locate the `Configure` method and add a call to `app.UseKendo` at the end.

		###### Example

			public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
			{
				...

				// Configure Kendo UI
				app.UseKendo(env);
			}

4. Import the `Kendo.Mvc.UI` namespace in `~/Pages/_ViewImports.cshtml` through `@using Kendo.Mvc.UI`.

5. Copy the Kendo UI client-side resources.

    * Manual installation&mdash;To manually install the resources, copy the `js` and `styles` folders from the `telerik.ui.for.aspnetmvc` archive to `wwwroot\lib\kendo-ui`.

        **Figure 2. Kendo UI resources**

        ![Kendo UI resources](images/resources.png)

    * Bower package installation&mdash;For more information on how to achieve this, refer to the [Kendo UI Professional Bower package installation](../../kendo-ui/intro/installation/bower-install).

6. Register the Kendo UI styles and scripts in `~/Pages/Shared/_Layout.cshtml`.

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

7. Use a Kendo UI widget by adding the snippet from the following example to `~/Pages/Home/Index.cshtml`.

    ###### Example

		<h2>Kendo UI DatePicker</h2>

		@(Html.Kendo().DatePicker()
			.Name("datepicker")
			.Deferred()
		)

		@section scripts {
			@Html.Kendo().DeferredScripts()
		}

8. Navigate to the project folder by using the Terminal and run it using the `dotnet run` command. Now that all is done, you can see the sample page.

    **Figure 3. The end result&mdash;a sample page**

    ![Sample page](images/sample-page.png)

## See Also

* [Overview of Telerik UI for ASP.NET Core]({% slug overview_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET Core and VS 2017]({% slug gettingstarted_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET Core and VS Code]({% slug gettingstartedvscode_aspnetmvc6_aspnetmvc %})
* [Known Issues with Telerik UI for ASP.NET Core]({% slug knownissues_aspnetmvc6_aspnetmvc %})
* [Tag Helpers for ASP.NET Core]({% slug taghelpers_aspnetmvc6_aspnetmvc %})
