---
title: Getting Started with Telerik UI for ASP.NET Core
page_title: Getting Started with Telerik UI for ASP.NET Core | Telerik UI for ASP.NET Core
description: "Learn the basics when working with Telerik UI for ASP.NET Core (aka MVC 6 or ASP.NET Core MVC)."
previous_url: /aspnetmvc-apps/mvc-6/getting-started, /mvc-6/getting-started
slug: gettingstarted_aspnetmvc6_aspnetmvc
position: 1
---

# Getting Started with Telerik UI for ASP.NET Core

This article demonstrates how to configure an ASP.NET Core project to use Telerik UI for ASP.NET Core.

## Prerequisites

1. Download [Visual Studio 2015](https://www.visualstudio.com/en-us/downloads/download-visual-studio-vs.aspx).
2. Download [Visual Studio 2015 Update 3](https://www.visualstudio.com/en-us/news/releasenotes/vs2015-update3-vs).
3. Download [NET Core 1.0.0 - VS 2015 Tooling Preview 2](https://www.microsoft.com/net/core#windows).
4. (Optional) Download [.NET SDK Core for Windows](https://www.microsoft.com/net/core#windows).

## Configuration

To configure an ASP.NET Core project to use Telerik UI for ASP.NET MVC:

1. Create an [ASP.NET MVC web site](#configuration-Create).
2. Add the [Kendo UI NuGet package](#configuration-Add).

### Create ASP.NET Core Web Sites

> **Important**
>
> If you are configuring an existing project, skip this step.

Below are listed the steps for you to follow when creating an ASP.NET Core web site.

1. Select **File** > **New Project**.

2. Choose **Templates** > **Visual C#** > **Web** > **ASP.NET Core Web Application (.NET Core)**.

3. Set a name and location for the project.

4. Select **ASP.NET Core Templates** > **Web Application** from the project templates.

5. Click **OK** to create the project.

### Add NuGet Packages

> **Important**
>
> Before you continue, set up the [Telerik NuGet Private Feed](../../aspnet-mvc/getting-started/nuget-install#set-up-nuget-package-source). Store the password in clear text because the .NET Core tooling does not support encryption.

1. Open the NuGet Package Manager.

  **Figure 1. The NuGet package manager**

  ![NuGet package manager](images/manage-nuget-packages.png)

2. Choose the [Telerik package source](../../aspnet-mvc/getting-started/nuget-install#set-up-nuget-package-source) and search for `Telerik.UI.for.AspNet.Core`.

3. Install the `Telerik.UI.for.AspNet.Core` package. This should add a line to you `project.json` similar to the one shown below.

    ###### Example

            "dependencies": {
                ...
                "Telerik.UI.for.AspNet.Core": "{{ site.mvcCoreVersion }}"
            }

4. Open `Startup.cs` by using a text editor (IDE) and update it in the way demonstrated in the following examples.

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

5. Import the `Kendo.Mvc.UI` namespace in `~/Views/_ViewImports.cshtml` through `@using Kendo.Mvc.UI`.

6. Copy the Kendo UI client-side resources. You can use either of the following approaches:

    * Manual installation&mdash;To manually install the resources, copy the `js` and `styles` folders from the `telerik.ui.for.aspnetmvc` archive to `wwwroot\lib\kendo-ui`. The archive is located in **Downloads** > **UI for ASP.NET MVC** of your [www.telerik.com](http://www.telerik.com/) account.

        **Figure 2. Kendo UI resources**

        ![Kendo UI resources](images/kendo-ui-wwwroot.png)

    * Bower package installation&mdash;For more information on how to achieve this, refer to the [Kendo UI Professional Bower package installation](../../kendo-ui/intro/installation/bower-install).

7. Register the Kendo UI styles and scripts in `~/Views/Shared/_Layout.cshtml`.

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
8. Use a Kendo UI widget by adding the snippet from the following example to `~/Views/Home/Index.cshtml`.

    ###### Example

                <h2>Kendo UI DatePicker</h2>

                @(Html.Kendo().DatePicker()
                        .Name("datepicker")
                        .Deferred()
                )

                @* All initialization scripts are rendered to the bottom of the page, see _Layout.cshtml *@
                @section scripts {
                    @Html.Kendo().DeferredScripts()
                }

                <!--_-->
    Now that all is done, you can see the sample page.

    **Figure 3. The end result&mdash;a sample page**

    ![Sample page](images/sample-page.png)

## See Also

* [Overview of Telerik UI for ASP.NET Core]({% slug overview_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET MVC in ASP.NET Core Projects on Linux]({% slug gettingstartedlinux_aspnetmvc6_aspnetmvc %})
* [Known Issues with Telerik UI for ASP.NET Core]({% slug knownissues_aspnetmvc6_aspnetmvc %})
* [Tag Helpers for ASP.NET Core]({% slug taghelpers_aspnetmvc6_aspnetmvc %})
