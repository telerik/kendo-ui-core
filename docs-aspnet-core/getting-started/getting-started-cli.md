---
title: Getting Started with CLI
page_title: Getting Started with Progress<sup>®</sup> Telerik<sup>®</sup> UI for ASP.NET Core and Command Line Interface | Telerik UI for ASP.NET Core
description: "Learn the basics when working with Progress Telerik UI for ASP.NET Core (aka MVC 6 or ASP.NET Core MVC) and the command line interface."
previous_url: /aspnetmvc-apps/mvc-6/getting-started-linux, /mvc-6/getting-started-linux, /gettingstartedlinux_aspnetmvc6_aspnetmvc, /gettingstartedvscode_aspnetmvc6_aspnetmvc
slug: gettingstartedcli_aspnetmvc6_aspnetmvc
position: 2
---

# Getting Started with Progress<sup>®</sup> Telerik<sup>®</sup> UI for ASP.NET Core and the Command Line Interface

This article demonstrates how to configure an ASP.NET Core project to use Telerik UI for ASP.NET Core by using the command line interface.

The following approach is applicable when you work on .Net Core projects in [Visual Studio Code](https://code.visualstudio.com/) or any other code editor. It is also platform-agnostic which means that you can follow the same steps on MacOS, Linux, or Windows machines.

## Prerequisites

* Install the appropriate [.Net Core SDK 2.0 or later](https://www.microsoft.com/net/download/all) for your platform.

## Creating the Application

> **Important**
>
> If you are configuring an existing project, skip this step.

Below are listed the steps for you to follow when creating an ASP.NET Core web app.

1. Navigate to the folder of your choice by using the Terminal (cmd). Create a new folder and navigate in it.

    ```sh
    mkdir MyTelerikApp
    cd MyTelerikApp
    ```

2. Run [`dotnet new mvc`](https://docs.microsoft.com/en-us/dotnet/core/tools/dotnet-new) to create a .Net Core application by using the default web MVC template.

3. Run [`dotnet restore`](https://docs.microsoft.com/en-us/dotnet/core/tools/dotnet-restore) to restore the project template dependencies. As a result, the NuGet packages are downloaded.

    > **Important**
    >
    > For a list of current commands, refer to the [guide on getting started with .NET Core](https://docs.asp.net/en/latest/getting-started.html).

4. Run [`dotnet run`](https://docs.microsoft.com/en-us/dotnet/core/tools/dotnet-run) to start the application. The following example demonstrates a sample response that you are expected to receive.

    ```sh
    Hosting environment: Production
    Now listening on: http://localhost:5000
    Application started. Press Ctrl+C to shut down.
    ```

5. By using the browser, navigate to the above location and make sure the application is properly running. After you check the application in the browser, stop the server.

## Integrating Telerik UI for ASP.NET Core

1. Configure the private Telerik NuGet feed and use either of the following approaches:

    * Globally include the `telerik.com` credentials to the NuGet configuration of the user. To do that, modify (or create) the `NuGet.Config` file for the user. That file could be found in the `%appdata%\NuGet\` folder on Windows machines. Depending on the exact OS distribution, the file has to be available (created) in the `~/.config/NuGet/` or the `~/.nuget/NuGet/` folder on Mac/Linux machines.
    * Create a local `NuGet.Config` file in the project folder.

    In both cases, the NuGet.Config file has to include your `telerik.com` credentials.

    ```xml
    <?xml version="1.0" encoding="utf-8"?>
    <configuration>
        <packageSources>
        ...
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

2. Install Telerik UI for ASP.NET Core through the CLI.

    ```sh
    dotnet add package Telerik.UI.for.AspNet.Core
    ```

3. Register Kendo UI as a service in `Startup.cs`.

    3.1. Locate the `ConfigureServices method` and add the `JsonOptions` and the Kendo UI service.

        ```cs
        public void ConfigureServices(IServiceCollection services)
        {
            ...
            // Maintain property names during serialization. See:
            // https://github.com/aspnet/Announcements/issues/19
            services.AddMvc();
                    .AddJsonOptions(options =>
                        options.SerializerSettings.ContractResolver = new DefaultContractResolver());
            services.AddKendo();
        }
        ```

    3.2. Add the required `using` of the `Newtonsoft.Json.Serialization` namespace.

        ```cs
        using Newtonsoft.Json.Serialization;
        ```

    3.3. Locate the `configure` method and add a call to `app.UseKendo` at the end (required for versions prior to R2 2018).

        ```cs
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            ...
            app.UseKendo(env);
        }
        ```

4. Import the `Kendo.Mvc.UI` namespace. Open `~/Views/_ViewImports.cshtml` and add the following references.

    ```cs
    //...
    @addTagHelper *, Kendo.Mvc
    @using Kendo.Mvc.UI
    ```

5. Copy the Kendo UI client-side resources. Use either of the following approaches:

    - To manually install the resources, copy the `js` and `styles` folders from the `telerik.ui.for.aspnetmvc` archive to `wwwroot\lib\kendo-ui`. The archive is located in **Downloads** > **Telerik UI for ASP.NET Core** of your [www.telerik.com account](https://www.telerik.com/account/).

    - For more information on how to use the Bower package installation, refer to [the Kendo UI Professional Bower package installation](https://docs.telerik.com/kendo-ui/intro/installation/bower-install).

6. Register the Kendo UI styles and scripts in `~/Views/Shared/_Layout.cshtml`.

    > **Important**
    >
    > In the default .NET Core template, the jQuery scripts are included at the end of the `<body>` element. To properly load the Telerik UI for ASP.NET HtmlHelpers, move the jQuery scripts and the Kendo UI client-side scripts to the `<head>` element and make sure that the Kendo UI scripts are loaded after jQuery.

    ```html
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
                href="https://kendo.cdn.telerik.com/2018.1.221/styles/kendo.common-nova.min.css"
                asp-fallback-href="~/lib/kendo-ui/styles/kendo.common-nova.min.css"
                asp-fallback-test-class="k-common-test-class"
                asp-fallback-test-property="opacity" asp-fallback-test-value="0" />

            <link rel="stylesheet"
                href="https://kendo.cdn.telerik.com/2018.1.221/styles/kendo.nova.min.css"
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
            <script src="https://kendo.cdn.telerik.com/2018.1.221/js/kendo.all.min.js"
                    asp-fallback-src="~/lib/kendo-ui/js/kendo.all.min.js"
                    asp-fallback-test="window.kendo">
            </script>
            <script src="https://kendo.cdn.telerik.com/2018.1.221/js/kendo.aspnetmvc.min.js"
                    asp-fallback-src="~/lib/kendo-ui/js/kendo.aspnetmvc.min.js"
                    asp-fallback-test="kendo.data.transports['aspnetmvc-ajax']">
            </script>
        </environment>

        ...
    </head>
    ```

7. Create a Kendo UI widget by adding the snippet from the following example to `~/Views/Home/Index.cshtml`.

    ```cs
    <h2>Kendo UI DatePicker</h2>

    @(Html.Kendo().DatePicker()
        .Name("datepicker")
    )
    ```

8. Navigate to the project folder by using the Terminal (cmd) and run it by using the `dotnet run` command. The **Index** page will display a [Kendo UI DatePicker]({% slug htmlhelpers_datepicker_aspnetcore %}).

## See Also

* [Overview of Telerik UI for ASP.NET Core]({% slug overview_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET Core and VS 2017]({% slug gettingstarted_aspnetmvc6_aspnetmvc %})
* [Known Issues with Telerik UI for ASP.NET Core]({% slug knownissues_aspnetmvc6_aspnetmvc %})
* [Tag Helpers for ASP.NET Core]({% slug taghelpers_aspnetmvc6_aspnetmvc %})
