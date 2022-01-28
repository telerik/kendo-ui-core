---
title: Including Client-Side Resources
page_title: Copying Client-Side Resources
description: "Get started with Telerik UI for ASP.NET Core and learn about the different ways of copying the client-side resources into a Telerik UI for ASP.NET Core project."
previous_url: /aspnetmvc-apps/mvc-6/getting-started-vscode, /mvc-6/getting-started-vscode, /getting-started/getting-started-copy-client-resources, /getting-started/installation/getting-started-copy-client-resources
slug: copyclientresources_aspnetmvc6_aspnetmvc
position: 6
---

# Including Client-Side Resources

This article demonstrates how to include the client-side resources which are required by Telerik<sup>®</sup> UI for ASP.NET Core in Visual Studio 2017 projects.

As the UI for ASP.NET Core suite is a set of [server-side wrappers over the Kendo UI for jQuery client-side widgets](https://docs.telerik.com/aspnet-core/introduction#widgets-vs-helpers), to run the components, you have to provide the same set of web assets. For more information on the files you need, refer to the articles on:

* [Getting Started with Kendo UI for jQuery](https://docs.telerik.com/kendo-ui/intro/first-steps) - Add the required JavaScript and CSS files
* [Getting Started with Kendo UI Themes](https://docs.telerik.com/kendo-ui/styles-and-layout/appearance-styling#getting-started)

To include the client-side resources, use any of the following approaches:

* (Demonstrated in this guide) [Manual installation](#manual-installation)
* [Using Bower]({% slug bowerpackage_core %})
* [Using NPM and Webpack]({% slug npmpackages_core %})

## Manual Installation

1. Go to the [UI for ASP.NET Core download page](https://www.telerik.com/account/product-download?product=UIASPCORE) or to **Account Overview** > **Downloads** > **Progress<sup>®</sup> Telerik<sup>®</sup> UI for ASP.NET Core**.
1. Download the archive that matches the `Kendo.Mvc.UI` version:

    - `telerik.ui.for.aspnet.core.{{ site.mvcCoreVersion }}.commercial-source` includes non-minified scripts and styles.
    - `telerik.ui.for.aspnet.core.{{ site.mvcCoreVersion }}.commercial` includes minified scripts and styles.

1. Copy the `js` and `styles` folders from the archive to your project under `wwwroot\lib\kendo-ui`.

   ![Kendo UI resources](../getting-started-core/images/kendo-ui-wwwroot.png)

The culture and localization (the translation of component messages) scripts are included in the `js` folder. For more information on using localization, internationalization, and right-to-left (RTL) support with {{ site.product }} helpers, refer to the article on [globalization support by {{ site.product }}]({% slug overview_globalization_core %}).


1. Register the UI styles and scripts in `~/Views/Shared/_Layout.cshtml`.

    > * The CDN links and/or package versions have to point to the same UI for ASP.NET Core version which your project references.
    > * In the default .NET Core template, the jQuery scripts are included at the end of the `<body>` element. To properly load the Telerik UI for ASP.NET HTML Helpers, move the jQuery scripts and the Kendo UI client-side scripts to the `<head>` element and make sure that the Kendo UI scripts are loaded after the jQuery ones.

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

{% if site.core %}
## Using LibMan

[Library Manager (LibMan)](https://docs.microsoft.com/en-us/aspnet/core/client-side/libman/?view=aspnetcore-5.0) is a client-side library management tool. The supported CDNs include [CDNJS](https://cdnjs.com/), [jsDelivr](https://www.jsdelivr.com/), and [unpkg](https://unpkg.com/#/). The selected library files are fetched and placed in the specified location within the ASP.NET Core project.

The following guide shows how to include the client-side resources by using LibMan:

1. Add a `libman.json` file to your ASP.NET Core application following the [Microsoft guidelines](https://docs.microsoft.com/en-us/aspnet/core/client-side/libman/libman-vs?view=aspnetcore-5.0).
1. Add the following configuration to the `libman.json` file to fetch the library in the specified destination:

    ```libman.json
    {
    "version": "1.0",
    "defaultProvider": "cdnjs",
    "libraries": [
        {
        "provider": "unpkg",
        "library": "@progress/kendo-ui@2021.3.914",
        "destination": "wwwroot/lib/kendo-ui/2021.3.914"
        }
    ]
    }
    ```

    > This step uses unpkg to load the Kendo UI library distributed on NPM. [The scripts in the NPM package are not usable in the browser]({% slug npmpackages_core %}#kendo-ui-professional-on-npm). This requires you to use a bundler such as [WebPack](https://webpack.js.org/).

1. Add the following files, containing the configurations provided below:
    * `webpack.config.js` and `package.json` files to the **wwwroot** folder of the application.
    * `entry.js` file in the **wwwroot/js/** folder to specify the scripts that should be bundled.

    ```webpack.config.js
    const path = require('path');
    var webpack = require("webpack");

    module.exports = {
        plugins: [
            new webpack.ProvidePlugin({
                $: 'jquery',
            })
        ],
        entry: {
            site: './js/entry.js'
        },
        output: {
            filename: 'bundle.js',
            path: path.resolve(__dirname, 'dist')
        },
        resolve: {
            extensions: ["", ".js", "min.js"],
            alias: {
                'jquery': path.join(__dirname, 'node_modules/jquery')
            }

        },
        devtool: 'source-map',
    };
    ```
    ```package.json
    {
    "version": "1.0.0",
    "name": "asp.net",
    "private": true,
    "dependencies": {
        "jquery": "^3.6.0",
        "jquery-validation": "^1.19.3",
        "jquery-validation-unobtrusive": "^3.2.12",
        "bootstrap": "^4.6.0",
        "popper.js": "^1.16.1"
    },
    "devDependencies": {
        "css-loader": "^5.2.0",
        "source-map-loader": "^0.1.5",
        "file-loader": "^6.2.0",
        "style-loader": "^2.0.0",
        "url-loader": "^4.1.1",
        "webpack": "^5.52.1",
        "webpack-cli": "^4.6.0"
    },
    "scripts": {
        "build": "webpack"
    }
    }
    ```
    ```entry.js
        require("jquery")
        window.$ = window.jQuery = $

        require("../lib/kendo-ui/2021.3.914/js/kendo.all")
        require("../lib/kendo-ui/2021.3.914/js/kendo.aspnetmvc")
    ```

1. Once LibMan has fetched the Kendo UI client-side files, navigate to the **wwwroot** folder and execute the following commands:
    * `npm install` to install the dependencies in the local **node_modules** folder.
    * `npm run build` to bundle the scripts specified in the `entry.js` file.

    The result of the bundling will be a `bundle.js` file output in the **wwwroot/dist/** folder.

1. In the `_Layout.cshtml`, file add a reference to the desired theme and the bundled scripts:

    ```_Layout.cshtml
        <link rel="stylesheet" href="~/lib/kendo-ui/2021.3.914/css/web/kendo.default-v2.css" />
        <script src="~/dist/bundle.js"></script>
    ```

{% endif %}

## See Also

* [Introduction to Telerik UI for ASP.NET Core]({% slug overview_aspnetmvc6_aspnetmvc %})
* [First Steps on Visual Studio for Windows (Online Guide)]({% slug gettingstarted_aspnetmvc6_aspnetmvc %})
* [First Steps on Visual Studio for Mac (Online Guide)]({% slug gettingstarted_firststeps_vsmac %})
* [First Steps with CLI (Online Guide)]({% slug gettingstartedcli_aspnetmvc6_aspnetmvc %})
