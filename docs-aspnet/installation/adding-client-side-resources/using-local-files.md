---
title: Using Local Files
page_title: Using Local Files
description: "Learn how to add the Kendo client-side resources in a Telerik UI for ASP.NET Core project by using local JavaScript and CSS files."
slug: using_local_client_side_resources
position: 2
---

# Adding Client-Side Resources through Local Files

To render correctly, the Telerik UI components need the corresponding client-side JavaScript and CSS files. This guide demonstrates how to import these client-side assets in your project by using local files that you will download from the Telerik website.

To provide the client-side web assets:

1. Go to the [UI for ASP.NET Core download page](https://www.telerik.com/account/product-download?product=UIASPCORE) or to **Account Overview** > **Downloads** > **Progress<sup>®</sup> Telerik<sup>®</sup> UI for ASP.NET Core**.

1. Download the archive that matches the `Kendo.Mvc.UI` version:

    - `telerik.ui.for.aspnet.core.{{ site.mvcCoreVersion }}.commercial-source` includes non-minified scripts and styles.
    - `telerik.ui.for.aspnet.core.{{ site.mvcCoreVersion }}.commercial` includes minified scripts and styles.

1. Copy the `js` and `styles` folders from the archive to your project under `wwwroot\lib\kendo-ui`.

   ![Kendo UI resources](/getting-started-core/images/kendo-ui-wwwroot.png)

The culture and localization (the translation of component messages) scripts are included in the `js` folder. For more information on using localization, internationalization, and right-to-left (RTL) support with {{ site.product }} helpers, refer to the article on [globalization support by {{ site.product }}]({% slug overview_globalization_core %}).


1. Register the UI styles and scripts in `~/Views/Shared/_Layout.cshtml`.

    > * The CDN links and/or package versions have to point to the same UI for ASP.NET Core version which your project references.
    > * In the default .NET Core template, the jQuery scripts are included at the end of the `<body>` element. To properly load the Telerik UI for ASP.NET HTML Helpers, move the jQuery scripts and the Kendo UI client-side scripts to the `<head>` element and make sure that the Kendo UI scripts are loaded after the jQuery ones.

        <head>
            ...

            <environment include="Development">
                ...

                <link rel="stylesheet" href="~/lib/kendo-ui/styles/kendo.default-main.min.css" />
            </environment>
            <environment exclude="Development">
                ...

                <link rel="stylesheet"
                    href="https://kendo.cdn.telerik.com/{{ site.cdnVersion }}/styles/kendo.default-main.min.css"
                    asp-fallback-href="~/lib/kendo-ui/styles/kendo.default-main.min.css"
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

## See Also

* [Using LibMan to Add Client-Side Resources]({% slug using_libman %})
* [Using CDN to Add Client-Side Resources]({% slug cdnservices_core %})
* [Creating Your Own Custom Script Bundles with Client-Side Resources]({% slug custombundles_core %})