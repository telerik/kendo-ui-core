---
title: Including Client-Side Resources
page_title: Copying Client-Side Resources in Telerik<sup>®</sup> UI for ASP.NET Core Projects | Telerik UI for ASP.NET Core
description: "Learn about different ways of copying the client-side resources into Telerik UI for ASP.NET Core project."
previous_url: /aspnetmvc-apps/mvc-6/getting-started-vscode, /mvc-6/getting-started-vscode
slug: copyclientresources_aspnetmvc6_aspnetmvc
position: 3
---

# Including Client-Side Resources in ASP.NET Core Projects

This article demonstrates how to include the client-side resources that are required by UI for ASP.NET Core in an ASP.NET Core project and use Visual Studio 2017.

To include the Kendo UI client-side resources you can use either of the following approaches:

* [Manual installation](#manual-installation)
* [Bower package installation](#bower-package-installation)
* [Copy Kendo UI client resources through NPM and Webpack](#copying-kendo-ui-client-resources-through-npm-and-webpack)

The UI for ASP.NET Core suite is a set of [server-side wrappers over the Kendo UI for jQuery client-side widgets](https://docs.telerik.com/aspnet-mvc/getting-started/kendo-ui-vs-mvc-wrappers). This means that to run the widgets, you are required to provide the same set of web assets. For more details on the files you need, refer to:

* [Getting Started with Progress&reg; Kendo UI&reg;](https://docs.telerik.com/kendo-ui/intro/installation/getting-started)
* [Getting Starged with Kendo Themes](http://docs.telerik.com/kendo-ui/styles-and-layout/appearance-styling#getting-started)

> **Important**
>
> The CDN links and/or package versions have to point to the same UI for ASP.NET Core version which your project references.

## Manual Installation

To manually install the resources:

1. Go to your [www.telerik.com](http://www.telerik.com/) account and navigate to **Downloads** > **Telerik UI for ASP.NET Core**.
1. Download the `telerik.ui.for.aspnetmvc` archive.
1. Copy the `js` and `styles` folders from the archive to your project under `wwwroot\lib\kendo-ui`.

   **Figure 1. Kendo UI resources**

   ![Kendo UI resources](images/kendo-ui-wwwroot.png)

1. Register the Kendo UI styles and scripts in `~/Views/Shared/_Layout.cshtml`.

    > **Important**
    >
    > In the default .NET Core template, the jQuery scripts are included at the end of the `<body>` element. To properly load the Telerik UI for ASP.NET HtmlHelpers, move the jQuery scripts and the Kendo UI client-side scripts to the `<head>` element and make sure that the Kendo UI scripts are loaded after the jQuery ones.


    ###### Example

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

                @* Place Kendo UI scripts after jQuery *@
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

## Bower Package Installation

Refer to the article on [Bower package installation](../../kendo-ui/intro/installation/bower-install).

> **Important**
>
> ASP.NET Core v2.1 no longer supports Bower. For more information on the alternative approach for copying Kendo UI scripts, refer to the section on [copying client resources through NPM and Webpack](#copying-kendo-ui-client-resources-through-npm-and-webpack).

## Copying Kendo UI Client Resources through NPM and Webpack

1. If the project is created through **Create New Project Wizard**, remove the `bower.json` file. Otherwise, skip this step.
1. Add `package.json` in the following way:

    ###### Example

        {
            "name": "ApplicationName",
            "version": "1.0.0",
            "description": "",
            "main": "main.js",
            "scripts": {
                "build": "webpack"
            },
            "keywords": [],
            "author": "",
            "license": "ISC",
            "dependencies": {
                "css-loader": "^1.0.0",
                "jquery": "^3.2.1",
                "popper.js": "^1.12.6",
                "style-loader": "^0.21.0",
                "@progress/kendo-theme-default": "^2.54.1",
                "@progress/kendo-ui": "{{ site.cdnVersion }}"
            },
            "devDependencies": {
                "webpack": "^4.12.0",
                "webpack-cli": "^3.0.8"
            }
        }

1. Add `webpack.config.js` in the following way:

    ###### Example

        const path = require('path');
        const webpack = require('webpack');

        module.exports = {
            entry: './main.js',
            output: {
                filename: 'bundle.js',
                path: path.resolve(__dirname, 'wwwroot')
            },
            module: {
                rules: [
                    {
                        test: /\.css$/,
                        use: [{ loader: 'style-loader' }, { loader: 'css-loader' }]
                    }
                ]
            },
            plugins: [
                new webpack.ProvidePlugin({
                    $: 'jquery',
                    jQuery: 'jquery'
                }),
            ],
        }

1. Create a `main.js` file with the following content.

    > **Important**
    >
    > As both `jQuery` and `$` are used throughout the application, in the global scope jQuery is assigned to both variables.

    ###### Example

        import $ from 'jquery';
        window.jQuery = $; window.$ = $;

        import "@progress/kendo-ui";
        import "@progress/kendo-ui/js/kendo.aspnetmvc";
        import "@progress/kendo-theme-default/dist/all.css";


1. Open the Command prompt and navigate to the folder of the project.
1. Run the following commands:

    ###### Example

        npm install
        npm run build

1. In `~/Views/Shared/_Layout.cshtml`, replace the Kendo UI CDN scripts with the script that references `bundle.js`.

    ###### Example

        <script src="~/bundle.js"></script>

## See Also

* [Overview of Telerik UI for ASP.NET Core]({% slug overview_aspnetmvc6_aspnetmvc %})
* [Get Started with GUI]({% slug gettingstarted_aspnetmvc6_aspnetmvc %})
* [Get Started with CLI]({% slug gettingstartedcli_aspnetmvc6_aspnetmvc %})
* [Known Issues with Telerik UI for ASP.NET Core]({% slug knownissues_aspnetmvc6_aspnetmvc %})
* [Tag Helpers for ASP.NET Core]({% slug taghelpers_aspnetmvc6_aspnetmvc %})
