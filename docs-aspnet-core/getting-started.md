---
title: Getting Started
page_title: Getting Started | Telerik UI for ASP.NET Core
description: "Learn the basics when working with Telerik UI for ASP.NET Core (aka MVC 6 or ASP.NET Core MVC)."
previous_url: /aspnetmvc-apps/mvc-6/getting-started, /mvc-6/getting-started
slug: gettingstarted_aspnetmvc6_aspnetmvc
position: 2
---

# Getting Started

This article demonstrates how to configure an ASP.NET Core project to use Telerik UI for ASP.NET MVC.

## Prerequisites

1. Download [Visual Studio 2015](https://www.visualstudio.com/en-us/downloads/download-visual-studio-vs.aspx).
2. Download [Visual Studio 2015 Update 3](https://www.visualstudio.com/en-us/news/releasenotes/vs2015-update3-vs).
3. Download [NET Core 1.0.0 - VS 2015 Tooling Preview 2](https://www.microsoft.com/net/core#windows).
4. Optional Download [.NET SDK Core for Windows](https://www.microsoft.com/net/core#windows).

## Configuration

To configure an ASP.NET Core project to use Telerik UI for ASP.NET MVC, do the following:

1. Create an ASP.NET MVC web site.
2. Add the Kendo UI NuGet package.

### Create ASP.NET Core Web Sites

Below are listed the steps for you to follow when creating an ASP.NET Core web site.

> **Important**
>
> Skip this step if you are configuring an existing project.

**Step 1** Select **File** > **New Project**.

**Step 2** Choose **Templates** > **Visual C#** > **Web** > **ASP.NET Core Web Application (.NET Core)**.

**Step 3** Set a name and location for the project.

**Step 4** Select **ASP.NET Core Templates** > **Web Application** from the project templates.

**Step 5** Click **OK** to create the project.

### Add NuGet Packages

Set up the [Telerik NuGet Private Feed](../aspnet-mvc/getting-started/nuget-install#set-up-nuget-package-source) before continuing.

**Step 1** Open the NuGet Package Manager.

**Figure 1. The NuGet package manager**

![NuGet package manager](images/manage-nuget-packages.png)

**Step 2** Choose the [Telerik package source](../aspnet-mvc/getting-started/nuget-install#set-up-nuget-package-source) and search for `Telerik.UI.for.AspNet.Core`.

**Step 3** Install the `Telerik.UI.for.AspNet.Core` package. This should add a line to you `project.json` similar to the one shown below.

###### Example

        "dependencies": {
            ...
            "Telerik.UI.for.AspNet.Core": "{{ site.mvcCoreVersion }}"
        }

**Step 4** Open `Startup.cs`, using a text editor (IDE) and update it as described below.

Locate the `ConfigureServices` method and add a call to `services.AddKendo` at the end.

###### Example

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

Locate the `Configure` method and add a call to `app.UseKendo` at the end.

###### Example

        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            ...

            // Configure Kendo UI
            app.UseKendo(env);
        }

**Step 5** Import the `Kendo.Mvc.UI` namespace in `~/Views/_ViewImports.cshtml`.

###### Example

        @using Kendo.Mvc.UI

**Step 6** Copy the Kendo UI client-side resources.

* **Manual installation**

Copy the `js` and `styles` folders from the `telerik.ui.for.aspnetmvc` archive to `wwwroot\lib\kendo-ui`.

**Figure 2. Kendo UI resources**

![Kendo UI resources](images/kendo-ui-wwwroot.png)

* **[Kendo UI Professional Bower package installation](../kendo-ui/intro/installation/bower-install)**

**Step 7** Register the Kendo UI styles and scripts in `~/Views/Shared/Layout.cshtml`.

###### Example

        <head>
        ...

        <environment names="Development">
            ...

            <link rel="stylesheet" href="~/lib/kendo-ui/styles/kendo.common-nova.min.css" />
            <link rel="stylesheet" href="~/lib/kendo-ui/styles/kendo.nova.min.css" />
        </environment>
        <environment names="Staging,Production">
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
        </head>
        <body>

        ...

        <environment names="Development">
            ...

            @* Place Kendo UI scripts after jQuery *@
            <script src="~/lib/kendo-ui/js/kendo.all.min.js"></script>
            <script src="~/lib/kendo-ui/js/kendo.aspnetmvc.min.js"></script>
        </environment>
        <environment names="Staging,Production">
            ...

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

        @RenderSection("scripts", required: false)
        </body>

<!--*-->
**Step 8** Use a Kendo UI widget.

The example below demonstrates how to use HTML helpers. Add the snippet to `~/Views/Home/Index.cshtml`.

###### Example

            <h2>Kendo UI DatePicker</h2>

            @(Html.Kendo().DatePicker()
                    .Name("datepicker")
                    .Deferred()
            )

            @* All initialization scripts are rendered to the bottom of the page, see Layout.cshtml *@
            @section scripts {
                @Html.Kendo().DeferredScripts()
            }

<!--*-->
Now that all is done, you can see the sample page.

**Figure 3. The end result&mdash;a sample page**

![Sample page](images/sample-page.png)

## See Also

Other articles on Telerik UI for ASP.NET MVC in ASP.NET Core applications:

* [Overview of Telerik UI for ASP.NET Core]({% slug overview_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET MVC in ASP.NET Core Projects on Linux]({% slug gettingstartedlinux_aspnetmvc6_aspnetmvc %})
* [Known Issues with Telerik UI for ASP.NET Core]({% slug knownissues_aspnetmvc6_aspnetmvc %})
* [Tag Helpers for ASP.NET Core]({% slug taghelpers_aspnetmvc6_aspnetmvc %})
