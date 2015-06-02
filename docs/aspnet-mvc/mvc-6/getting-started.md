---
title: Getting Started
page_title: Getting started with Telerik UI for ASP.NET MVC 6
description: How to configure a project to use Telerik UI for ASP.NET MVC 6.
position: 1
---

# Using Telerik UI for ASP.NET MVC in MVC 6 applications

This tutorial shows how to configure an ASP.NET MVC6 project to use Telerik UI for ASP.NET MVC.

The tutorial uses Visual Studio 2015 RC.

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
1. Choose `nuget.org` as a package source and search for `Kendo.Mvc`
1. Install the `Kendo.Mvc` package version 2015.2.602 or later.
This should add a similar line in your `project.json`:

        "dependencies": {
            ...
            "Kendo.Mvc": "2015.2.602"
        }

1. Open `Startup.cs` and locate the `ConfigureServices` method. Add the following snippet:

        // Register UI for ASP.NET MVC helpers
        services.AddKendo();

1. Import the `Kendo.Mvc.UI` namespace in `~/Views/_GlobalImport.cshtml`

        @using Kendo.Mvc.UI

1. Copy the Kendo UI client-side resources
    1. Manual installation

        Copy the `js` and `styles` folders from the `telerik.ui.for.aspnetmvc` archive to `wwwroot\kendo-ui`

        ![Kendo UI resources](images/kendo-ui-wwwroot.png)

    1. [Install Kendo UI as a Bower package](/install/bower)

         After installing the Bower package edit the `gulpfile.js`
         to copy the resources to `wwwroot\lib` on build.

            gulp.task("copy", ["clean"], function () {
                var bower = {
                    ...
                    "kendo-ui": "kendo-ui/{styles,js}/**/*"
                };

                ...
            });

1. Register the Kendo UI styles and scripts in `~/Views/Shared/Layout.cshtml`

        ...

        <link rel="stylesheet" href="~/lib/kendo-ui/styles/kendo.common-bootstrap.min.css" />
        <link rel="stylesheet" href="~/lib/kendo-ui/styles/kendo.bootstrap.min.css" />
        <link rel="stylesheet" href="~/lib/kendo-ui/styles/kendo.dataviz.bootstrap.min.css" />

        ...

        <script src="~/lib/kendo-ui/js/kendo.all.min.js"></script>
        <script src="~/lib/kendo-ui/js/kendo.aspnetmvc.min.js"></script>

        @RenderSection("scripts", required: false)

1. Use a Kendo UI Widget

    Add the following snippet to `~/Views/Home/Index.cshtml`

            <h2>Kendo UI DatePicker</h2>

            @(Html.Kendo().DatePicker()
                    .Name("datepicker")
                    .Deferred()
            )

            @section scripts {
                @Html.Kendo().DeferredScripts()
            }

1. All done

    ![Sample page](images/sample-page.png)
