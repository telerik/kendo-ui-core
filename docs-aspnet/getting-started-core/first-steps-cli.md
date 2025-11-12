---
title: First Steps with CLI
page_title: Getting Started with CLI
description: "Create a sample project with the command-line interface on any platform with Progress Telerik UI for ASP.NET Core."
previous_url: /aspnetmvc-apps/mvc-6/getting-started-linux, /mvc-6/getting-started-linux, /getting-started/getting-started-linux, /getting-started/getting-started-vscode, /getting-started/getting-started-cli
slug: gettingstartedcli_aspnetmvc6_aspnetmvc
position: 3
permalink: /getting-started/first-steps-cli
---

# First Steps in Telerik UI for ASP.NET Core with CLI

This tutorial shows how to create an ASP.NET Core web application that uses Telerik UI for ASP.NET Core components using the [.NET command-line interface (CLI)](https://docs.microsoft.com/en-us/dotnet/core/tools/?tabs=netcore2x)

You will learn how to create a sample application and add a {{ site.product }} DatePicker component using either HtmlHelper or TagHelper syntax.

The suggested approach is platform-agnostic&mdash;you can apply it for macOS, Linux, and Windows. The steps are applicable for .NET Core projects in [Visual Studio Code](https://code.visualstudio.com/).

Follow these steps to create and configure your ASP.NET Core application with Telerik UI components:

1. [Check the prerequisites](#prerequisites)
1. [Install a license key](#installing-a-license-key)
1. [Create the ASP.NET Core application](#creating-the-application)
1. [Integrate UI for ASP.NET Core in the project](#integrating-ui-for-aspnet-core)
1. [Add a component](#adding-a-telerik-ui-component).

## Prerequisites

* [.NET Core SDK](https://dotnet.microsoft.com/download/dotnet)
* [Telerik account](https://www.telerik.com/account)&mdash;if you don't have an account yet, you can [create one for free](https://www.telerik.com/account).

## Installing a License Key

@[template](/_contentTemplates/licensing-templates.md#license-key-version)

@[template](/_contentTemplates/licensing-templates.md#license-key-manual-steps)

@[template](/_contentTemplates/licensing-templates.md#license-key-know-more-link)

## Creating the Application

> * If you are configuring an existing project, skip this step.
> * For the full list of current commands, refer to the [Microsoft guide on getting started with .NET Core](https://docs.asp.net/en/latest/getting-started.html).

1. Navigate to the folder of your choice by using the Terminal (cmd). Create a new folder and navigate in it.

      ```batch
      mkdir MyASPNETCoreProject
      cd MyASPNETCoreProject
      ```

2. Create a .NET Core application with the default web MVC template by running [`dotnet new mvc`](https://docs.microsoft.com/en-us/dotnet/core/tools/dotnet-new). The following example demonstrates a sample response that you are expected to receive.

      ```batch
      dotnet new mvc

      Getting ready...
      The template "ASP.NET Core Web App (Model-View-Controller)" was created successfully.
      --
      Restore succeeded.
      ```

3. Start the application by running [`dotnet run`](https://docs.microsoft.com/en-us/dotnet/core/tools/dotnet-run). The following example demonstrates a sample response that you are expected to receive.

      ```batch
      dotnet run

      Now listening on: http://localhost:5000
      Application started. Press Ctrl+C to shut down.
      ```

4. By using the browser, navigate to the above location and make sure that the application is properly running. After you check the application in the browser, stop the server with `Ctrl`+`C`.



## Integrating UI for ASP.NET Core

1. Configure the [private Telerik NuGet feed]({% slug nuget_install_aspnetmvc6_aspnetmvc %}) in the `NuGet.Config` file:

      * Ensure you are editing the [correct and desired config file](https://learn.microsoft.com/en-us/nuget/consume-packages/configuring-nuget-behavior#config-file-locations-and-uses). You can also create a new one with the [`dotnet new nugetconfig` command](https://docs.microsoft.com/en-us/dotnet/core/tools/dotnet-new).

      * Add the Telerik package source to the config file. For the authentication, use your [NuGet API key]({% slug nuget_install_aspnetmvc6_aspnetmvc %}#generate-a-nuget-api-key) as a password and `api-key` as a username. Add the API key in plain text, because the NuGet tooling does not fully support encrypted credentials. Here is an example of how your `NuGet.Config` file can look like:

      ```XML
      <?xml version="1.0" encoding="utf-8"?>
      <configuration>
            <packageSources>
                  <!--To inherit the global NuGet package sources remove the <clear/> line below -->
                  <clear />
                  <add key="nuget.org" value="https://api.nuget.org/v3/index.json" />
                  <add key="telerik.com" value="https://nuget.telerik.com/v3/index.json" />
            </packageSources>
            <packageSourceCredentials>
                  <telerik.com>
                        <add key="Username" value="api-key>" />
                        <add key="ClearTextPassword" value="YOUR-NUGET-API-KEY" />
                  </telerik.com>
            </packageSourceCredentials>
      </configuration>
      ```

2. Install Telerik UI for ASP.NET Core through the CLI by running `dotnet add package Telerik.UI.for.AspNet.Core`.
3. Register the Kendo UI service in the services container.

      * For applications using .NET 6 and the [minimal hosting model](https://docs.microsoft.com/en-us/aspnet/core/migration/50-to-60?view=aspnetcore-6.0&tabs=visual-studio#new-hosting-model), open the `Program.cs` file and register the Kendo UI service.

	```C#
	var builder = WebApplication.CreateBuilder(args);

	// Add Kendo UI services to the services container.
	builder.Services.AddKendo();
	```

      * For applications using .NET 5 or earlier, open the `Startup.cs` file and register the Kendo UI services in the `ConfigureServices` method.

	```C#
	public void ConfigureServices(IServiceCollection services)
	{
		// Add the Kendo UI services to the services container.
		services.AddKendo();
	}
	```

4. Import the `Kendo.Mvc.UI` namespace in `~/Views/_ViewImports.cshtml` through `@using Kendo.Mvc.UI`. If you intend to use the Telerik UI ASP.NET Core Tag Helpers, add them with `@addTagHelper *, Kendo.Mvc`.

	```C#
        @using MyTelerikProject
	    @using MyTelerikProject.Models
        @addTagHelper *, Microsoft.AspNetCore.Mvc.TagHelpers
        @addTagHelper *, Kendo.Mvc
        @using Kendo.Mvc.UI
	```

5. Include the [required client-side resources]({% slug copyclientresources_aspnetmvc6_aspnetmvc %}).

      5.1 Go to `~\Views\Shared\_Layout.cshtml` and add the theme of your choice to the `<head>` of the document. Since the Microsoft project uses Bootstrap, you can use the [Telerik UI Bootstrap theme]({% slug sassbasedthemes_overview%}#built-in-themes) to match it:

	```HTML
      <head>
            ...
            <link rel="stylesheet" href="~/lib/bootstrap/dist/css/bootstrap.min.css" />
            <link rel="stylesheet" href="~/css/site.css" />

            @* Add the Kendo Bootstrap theme: *@
            <link rel="stylesheet" href="https://kendo.cdn.telerik.com/themes/{{ site.themesCdnVersion }}/bootstrap/bootstrap-main.css" />
            ...
      </head>
	```

      5.2 The ASP.NET Core Web App template template comes with a jQuery script reference at the end of `_Layout.cshtml` file. Find the `jquery.min.js` script line in the `<body>` of the document and move it to the `<head>`. Alterantively, use the `jQuery` script hosted on the jQuery CDN.

	```HTML
      <head>
            ...
            <link rel="stylesheet" href="~/lib/bootstrap/dist/css/bootstrap.min.css" />
            <link rel="stylesheet" href="~/css/site.css" />
            <link rel="stylesheet" href="https://kendo.cdn.telerik.com/themes/{{ site.themesCdnVersion }}/bootstrap/bootstrap-main.css" />

            <script src="~/lib/jquery/dist/jquery.js"></script>
            @* Add the jQuery script from the jQuery CDN: *@
            <!--<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>-->
            ...
      </head>
	```

      5.3 Add the required Kendo UI script files in the `<head>` tag after the `jQuery` script reference:

	```HTML
      <head>
            ...
            <link rel="stylesheet" href="~/lib/bootstrap/dist/css/bootstrap.min.css" />
            <link rel="stylesheet" href="~/css/site.css" />
            <link rel="stylesheet" href="https://kendo.cdn.telerik.com/themes/{{ site.themesCdnVersion }}/bootstrap/bootstrap-main.css" />

            <script src="~/lib/jquery/dist/jquery.js"></script>
            @* Add the jQuery script from the jQuery CDN: *@
            <!--<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>-->

            <script src="https://kendo.cdn.telerik.com/{{ site.mvcCoreVersion }}/js/kendo.all.min.js"></script>
            <script src="https://kendo.cdn.telerik.com/{{ site.mvcCoreVersion }}/js/kendo.aspnetmvc.min.js"></script>
      </head>
	```

@[template](/_contentTemplates/general-info.md#scripts-references-notes)

If you prefer to include the client-side resources from a local source instead of CDNs, refer to the [Local Client-Side Resources]({% slug using_local_client_side_resources %}) article.

## Adding a Telerik UI Component

@[template](/_contentTemplates/core/json-serialization-note.md#json-serialization-note)

1. Define the Telerik UI DatePicker component by adding the snippet from the following example to `~/Views/Home/Index.cshtml`.

      ```HtmlHelper
      <div class="text-center">
            <h2>Kendo UI DatePicker</h2>
            @(Html.Kendo().DatePicker()
                  .Name("my-picker")
            )
      </div>
      ```
      ```TagHelper
      @addTagHelper *, Kendo.Mvc

      <div class="text-center">
            <h2>Kendo UI DatePicker</h2>
            <kendo-datepicker name="my-picker"/>
      </div>
      ```

1. Navigate to the project folder by using the terminal (cmd) and run the project through the `dotnet run` command. The **Index** page will display a [DatePicker]({% slug htmlhelpers_datepicker_aspnetcore %}).

    ![{{ site.product_short }} The created sample page](../getting-started-core/images/sample-page.png)

## Next Steps

* [Use data-bound components]({% slug jsonserialization_core %})
* [Download and install UI for ASP.NET Core (overview)]({% slug downloadinstall_aspnetcore %})
* [Create your own custom bundles]({% slug creating-custom-bundles %})
* [How to update UI for ASP.NET Core to a new version]({% slug upgrade_aspnetcore %}#upgrading-to-new-versions)
* [Switch from Trial to Commercial License]({% slug upgrade_aspnetcore %}#switching-to-a-developer-license)

## See Also

* [Installing UI for ASP.NET Core by Using the CDN Services]({% slug cdnservices_core %})
* [Installing UI for ASP.NET Core with NuGet]({% slug nuget_install_aspnetmvc6_aspnetmvc %})
* [Migrating from MVC to Core MVC](https://docs.telerik.com/aspnet-core/installation/migrating)
* [MS - Upgrade from ASP.NET Framework to ASP.NET Core](https://learn.microsoft.com/en-us/aspnet/core/migration/proper-to-2x/?view=aspnetcore-7.0)
