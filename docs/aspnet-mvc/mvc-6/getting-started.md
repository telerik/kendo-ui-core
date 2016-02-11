---
title: Getting Started
page_title: Getting started with Telerik UI for ASP.NET MVC 6
description: How to configure a project to use Telerik UI for ASP.NET MVC 6.
position: 1
---

# Using Telerik UI for ASP.NET MVC in MVC 6 applications

This tutorial shows how to configure an ASP.NET MVC6 project to use Telerik UI for ASP.NET MVC.

### Prerequisites
1. [Visual Studio 2015](https://www.visualstudio.com/en-us/downloads/download-visual-studio-vs.aspx)
1. [Microsoft ASP.NET and Web Tools 2015 (RC1)](https://www.microsoft.com/en-us/download/details.aspx?id=49959)

### 1. Create an ASP.NET MVC 6 Web Site
Please skip this step if you're configuring an existing project.

1. Select `File -> New Project`
1. Choose `Templates / Visual C# / Web / ASP.NET Web Application`
1. Set a name and location for the project
1. From the project templates select `ASP.NET 5 Preview Templates / Web Site`
1. Hit OK to create the project.

### 2. Add NuGet package

1. Open the NuGet Package Manager

    ![NuGet package manager](images/manage-nuget-packages.png)
1. Choose `api.nuget.org` as a package source and search for `Kendo.Mvc`
1. Install the `Kendo.Mvc` package version 2015.2.909 or later.
This should add a similar line in your `project.json`:

        "dependencies": {
            ...
            "Kendo.Mvc": "2016.1.112"
        }

1. Open `Startup.cs` and locate the `ConfigureServices` method. Add the following snippet:

        // Register UI for ASP.NET MVC helpers
        services.AddKendo();

1. Import the `Kendo.Mvc.UI` namespace in `~/Views/_ViewImports.cshtml`

        @using Kendo.Mvc.UI

1. Copy the Kendo UI client-side resources
    1. Manual installation

        Copy the `js` and `styles` folders from the `telerik.ui.for.aspnetmvc` archive to `wwwroot\lib\kendo-ui`

        ![Kendo UI resources](images/kendo-ui-wwwroot.png)

    1. [Install Kendo UI Professional as a Bower package](/intro/installation/bower-install#restoring-packages-in-visual-studio-2015)

1. Register the Kendo UI styles and scripts in `~/Views/Shared/Layout.cshtml`

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

1. Use a Kendo UI Widget

    Add the following snippet to `~/Views/Home/Index.cshtml`

            <h2>Kendo UI DatePicker</h2>

            @(Html.Kendo().DatePicker()
                    .Name("datepicker")
                    .Deferred()
            )

            @* All initialization scripts are rendered to the bottom of the page, see Layout.cshtml *@
            @section scripts {
                @Html.Kendo().DeferredScripts()
            }

1. All done

    ![Sample page](images/sample-page.png)
