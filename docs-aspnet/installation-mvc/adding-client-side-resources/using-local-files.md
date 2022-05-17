---
title: Using Local Files
page_title: Using Local Files
description: "Learn how to add the Kendo client-side resources in a Telerik UI for ASP.NET MVC project by using JavaScript and CSS files available on your local machine."
slug: using_local_client_side_resources_mvc
position: 2
---

# Using Local Files

You can add the Kendo UI client-side resources like JavaScript files and CSS files by using files that are available on your machine. Including these client-side resources in your project is essential because the Telerik UI helpers are wrappers over the [Kendo UI widgets](https://docs.telerik.com/kendo-ui/intro/first-steps).

>tip If you used the [automated MSI installer]({% slug msi_install_mvc %}) to install Telerik UI for ASP.NET MVC, all required files are already available on your machine and you can skip the downloading instructions and jump to Step 4 below. By default, these js and CSS files are located in the Telerik UI installation folder under `C:\Program Files (x86)\Progress\Telerik UI for ASP.NET MVC<version>`.

To add the client-side resources to your project:

1. Go to the [UI for ASP.NET MVC download page](https://www.telerik.com/account/product-download?product=KENDOUIMVC) or to **Account Overview** > **Downloads** > **Progress<sup>®</sup> Telerik<sup>®</sup> UI for ASP.NET MVC**.

1. Download the archive with the Telerik UI version that matches the `Kendo.Mvc.UI` version used in your project. For example, if your project references `Kendo.Mvc.UI` version `{{ site.mvcCoreVersion }}`, then download the `telerik.ui.for.aspnetmvc.{{ site.mvcCoreVersion }}.commercial` zip or 7z archive.

1. Extract the files from the archive.

1. Drag the `js` directory from the archive and drop it in Visual Studio over the `Scripts` folder of the application.

1. Drag the `styles` directory from the archive and drop it in Visual Studio over the `Content` folder of the application.

1. Rename the `Scripts/js` directory to `Scripts/kendo`. Rename `Content/styles` to `Content/kendo`. After the needed JavaScript and CSS files are added to the application, you can include them.

    ![The Kendo UI directories in the Solution Explorer](../../images/mvc5-solution.png)

1. Open `App_Start/BundleConfig.cs` to add bundles for Telerik UI for ASP.NET MVC.

1. Add a script bundle for Telerik UI for ASP.NET MVC.

        bundles.Add(new ScriptBundle("~/bundles/kendo").Include(
            "~/Scripts/kendo/kendo.all.min.js",
            // Uncomment below if you use the Scheduler.
            // "~/Scripts/kendo/kendo.timezones.min.js",
            "~/Scripts/kendo/kendo.aspnetmvc.min.js"));

1. Add a style bundle for Telerik UI for ASP.NET MVC.

    > Make sure you are familiar with the [Telerik UI for ASP.NET MVC fundamentals and CSS bundling]({% slug fundamentals_aspnetmvc %}).

        bundles.Add(new StyleBundle("~/Content/kendo/css").Include(
            "~/Content/kendo/kendo.common-bootstrap.min.css",
            "~/Content/kendo/kendo.bootstrap.min.css"));

1. Set the ASP.NET bundles to allow minified files in debug mode.

        bundles.IgnoreList.Clear();

1. Open the layout of the application. By default, if using ASPX, it is `Views/Shared/_Layout.cshtml`, or `Site.master`.

1. Render the Telerik UI for ASP.NET MVC style bundle.

    ```ASPX
        <%: Styles.Render("~/Content/kendo/css") %>
    ```
    ```Razor
        @Styles.Render("~/Content/kendo/css")
    ```

1. Move the jQuery bundle to the `head` tag of the page. By default, it is located at the end of the page.

1. Render the Telerik UI for ASP.NET MVC script bundle after jQuery. Make sure that the jQuery version you load is [supported]({% slug jquerysupport_aspnetmvc %})

    ```ASPX
        <%: Scripts.Render("~/bundles/jquery") %>
        <%: Scripts.Render("~/bundles/kendo") %>
    ```
    ```Razor
        @Scripts.Render("~/bundles/jquery")
        @Scripts.Render("~/bundles/kendo")
    ```

1. Register the UI styles and scripts in `~/Views/Shared/_Layout.cshtml`.

    > * The CDN links and/or package versions have to point to the same UI for ASP.NET MVC version which your project references.
    > * In the default .NET MVC template, the jQuery scripts are included at the end of the `<body>` element. To properly load the Telerik UI for ASP.NET HTML Helpers, move the jQuery scripts and the Kendo UI client-side scripts to the `<head>` element and make sure that the Kendo UI scripts are loaded after the jQuery ones.

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
                    href="https://kendo.cdn.telerik.com/{{ site.mvcCoreVersion }}/styles/kendo.common-nova.min.css"
                    asp-fallback-href="~/lib/kendo-ui/styles/kendo.common-nova.min.css"
                    asp-fallback-test-class="k-common-test-class"
                    asp-fallback-test-property="opacity" asp-fallback-test-value="0" />

                <link rel="stylesheet"
                    href="https://kendo.cdn.telerik.com/{{ site.mvcCoreVersion }}/styles/kendo.nova.min.css"
                    asp-fallback-href="~/lib/kendo-ui/styles/kendo.nova.min.css"
                    asp-fallback-test-class="k-theme-test-class"
                    asp-fallback-test-property="opacity" asp-fallback-test-value="0" />
            </environment>

            <environment include="Development">
                ...

                <script src="~/lib/jquery/dist/jquery.js"></script>

                @* Place the Kendo UI scripts after jQuery. *@
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

                @* Place the Kendo UI scripts after jQuery. *@
                <script src="https://kendo.cdn.telerik.com/{{ site.mvcCoreVersion }}/js/kendo.all.min.js"
                        asp-fallback-src="~/lib/kendo-ui/js/kendo.all.min.js"
                        asp-fallback-test="window.kendo">
                </script>
                <script src="https://kendo.cdn.telerik.com/{{ site.mvcCoreVersion }}/js/kendo.aspnetmvc.min.js"
                        asp-fallback-src="~/lib/kendo-ui/js/kendo.aspnetmvc.min.js"
                        asp-fallback-test="kendo.data.transports['aspnetmvc-ajax']">
                </script>
            </environment>

            ...
        </head>

## See Also

* [Using CDN to Add Client-Side Resources]({% slug cdnservices_aspnetmvc %})
* [Telerik UI for ASP.NET MVC Fundamentals]({% slug fundamentals_aspnetmvc %})
* [Telerik UI for ASP.NET MVC Download and Installation]({% slug overview_downloadinstallation_mvc %})
* [Telerik UI for ASP.NET MVC Troubleshooting]({% slug troubleshooting_aspnetmvc %})
