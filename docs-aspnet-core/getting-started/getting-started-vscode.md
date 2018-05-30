---
title: Getting Started with VS Code
page_title: Getting Started with Progress<sup>®</sup> Telerik<sup>®</sup> UI for ASP.NET Core and Visual Studio Code | Telerik UI for ASP.NET Core
description: "Learn the basics when working with Progress Telerik UI for ASP.NET Core (aka MVC 6 or ASP.NET Core MVC) and VS Code."
previous_url: /aspnetmvc-apps/mvc-6/getting-started-vscode, /mvc-6/getting-started-vscode
slug: gettingstartedvscode_aspnetmvc6_aspnetmvc
position: 2
---

# Getting Started with Progress<sup>®</sup> Telerik<sup>®</sup> UI for ASP.NET Core and Visual Studio Code

This article demonstrates how to configure an ASP.NET Core project to use Telerik UI for ASP.NET Core in Visual Studio Code.

## Prerequisites

* Install [.NET Core 2.0 SDK](https://www.microsoft.com/net/learn/get-started/windows) or later.
* Install [Visual Studio Code](https://code.visualstudio.com/).
* Install the [VS Code C# Extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode.csharp).

## Creating the Application

1. Create a new project from the cli:

    ```sh
    mkdir MyTelerikApp
    cd MyTelerikApp
    dotnet new mvc
    ```

1. Load the newly created project in VS Code.
    - Select **Yes** to the `"Required assets to build and debug are missing from 'MvcMovie'. Add them?"` warn message.
    - Select **Restore** to the `"There are unresolved dependencies"` info message.

1. Build and run the application by pressing `F5`.

## Integrating Telerik UI for ASP.NET Core

1. [Set up the Telerik Private NuGet Feed](https://docs.telerik.com/aspnet-mvc/getting-started/nuget-install#set-up-nuget-package-source).

2. Install Kendo UI through the cli:

    ```sh
    dotnet add package Telerik.UI.for.AspNet.Core
    ```

3. Register Kendo UI as a service in `Startup.cs`:

    * Locate the `ConfigureServices method` and add the Kendo UI service.

        ```cs
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc();
                    .AddJsonOptions(options =>
                        options.SerializerSettings.ContractResolver = new DefaultContractResolver());
            services.AddKendo();
        }
        ```

    * Add the required information by using `Newtonsoft.Json.Serialization` line.

        ```cs
        using Newtonsoft.Json.Serialization;
        ```

    * Locate the `configure` method and add a call to `app.UseKendo` at the end (required for versions prior to R2 2018).

        ```cs
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            // ...

            app.UseKendo(env);
        }
        ```

4. Import the `Kendo.Mvc.UI` namespace. Open `~/Views/_ViewImports.cshtml` and add the following references.

    ```cs
    @using MyTelerikApp
    @using MyTelerikApp.Models
    @addTagHelper *, Microsoft.AspNetCore.Mvc.TagHelpers
    @addTagHelper *, Kendo.Mvc
    @using Kendo.Mvc.UI
    ```

5. Copy the Kendo UI client-side resources and reference them in the application layout. Use either of the following approaches:

    - To manually install the resources, copy the `js` and `styles` folders from the `telerik.ui.for.aspnetmvc` archive to `wwwroot\lib\kendo-ui`. The archive is located in **Downloads** > **Telerik UI for ASP.NET Core** of your [www.telerik.com account](https://www.telerik.com/account/).

    - For more information on how to use the Bower package installation, refer to [the Kendo UI Professional Bower package installation](https://docs.telerik.com/kendo-ui/intro/installation/bower-install).

6. Register the Kendo UI styles and scripts in `~/Views/Shared/_Layout.cshtml`.

    > **Important**
    >
    > In the default .NET Core template, the jQuery scripts are included at the end of the `<body>` element. To properly load the Telerik UI for ASP.NET HtmlHelpers, move the jQuery scripts and the Kendo UI client-side scripts to the `<head>` element and make sure that the Kendo UI scripts are loaded after the jQuery ones.

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

7. Use a Kendo UI widget by adding the snippet from the following example to `~/Views/Home/Index.cshtml`.

    ```cs
    <h2>Kendo UI DatePicker</h2>

    @(Html.Kendo().DatePicker()
        .Name("datepicker")
    )
    ```

## See Also

* [Overview of Telerik UI for ASP.NET Core]({% slug overview_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET Core and VS 2017]({% slug gettingstarted_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET Core on Linux / MacOS]({% slug gettingstartedlinux_aspnetmvc6_aspnetmvc %})
* [Known Issues with Telerik UI for ASP.NET Core]({% slug knownissues_aspnetmvc6_aspnetmvc %})
* [Tag Helpers for ASP.NET Core]({% slug taghelpers_aspnetmvc6_aspnetmvc %})
