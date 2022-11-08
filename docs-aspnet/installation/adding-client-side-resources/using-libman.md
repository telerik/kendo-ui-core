---
title: Using LibMan
page_title: Using LibMan
description: "Learn how to add the Kendo client-side web assets in a Telerik UI for ASP.NET Core project by using LibMan and WebPack."
slug: using_libman
position: 4
---

# Adding Client-Side Resources through LibMan

To ensure that the Telerik UI components in your application render correctly, you must provide the required client-side JavaScript and CSS files. This guide shows how to import these client-side assets in your project by using LibMan and WebPack.

[Library Manager (LibMan)](https://docs.microsoft.com/en-us/aspnet/core/client-side/libman/?view=aspnetcore-5.0) is a client-side library management tool. The supported CDNs include [CDNJS](https://cdnjs.com/), [jsDelivr](https://www.jsdelivr.com/), and [unpkg](https://unpkg.com/#/). The selected library files are fetched and placed in the specified location within the ASP.NET Core project.

To provide the client-side web assets by using LibMan:

1. Add a `libman.json` file to your ASP.NET Core application following the [Microsoft guidelines](https://docs.microsoft.com/en-us/aspnet/core/client-side/libman/libman-vs?view=aspnetcore-5.0).

1. Add the following configuration to the `libman.json` file to fetch the library in the specified destination:

    ```libman.json
    {
    "version": "1.0",
    "defaultProvider": "cdnjs",
    "libraries": [
        {
        "provider": "unpkg",
        "library": "@progress/kendo-ui@{{ site.cdnVersion }}",
        "destination": "wwwroot/lib/kendo-ui/{{ site.cdnVersion }}"
        }
    ]
    }
    ```

    > This step uses unpkg to load the Kendo UI library distributed on NPM. The scripts in the NPM package are not usable in the browser. This requires you to use a bundler such as [WebPack](https://webpack.js.org/).

1. Generate a license file by following the instructions in the [Using Script License File article]({% slug using_license_code %}).

    > As of the R2 2022 release, the `@progress/kendo-ui` NPM package requires a [script license activation]({% slug using_license_code %}).

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

        require("../lib/kendo-ui/{{ site.cdnVersion }}/js/kendo.all")
        require("../lib/kendo-ui/{{ site.cdnVersion }}/js/kendo.aspnetmvc")
    ```

   Since version 2022.3.1109 the Kendo UI scripts can be acquired as ECMAScript. In this case, you will replace the `js/kendo.all` part with:
     ```javascript
        require("../lib/kendo-ui/{{ site.cdnVersion }}/mjs/kendo.-componentName-")
      ```

   Additional information you can find in the dedicated [ECMAScript Modules article]({% slug core_ecmascript_overview %})


1. Once LibMan has fetched the Kendo UI client-side files, navigate to the **wwwroot** folder and execute the following commands:
    * `npm install` to install the dependencies in the local **node_modules** folder.
    * `npm run build` to bundle the scripts specified in the `entry.js` file.

    The result of the bundling will be a `bundle.js` file output in the **wwwroot/dist/** folder.

1. In the `_Layout.cshtml`, file add a reference to the desired theme, the bundled scripts, and the license file `kendo-ui-license.js`:

    ```_Layout.cshtml
        <link rel="stylesheet" href="~/lib/kendo-ui/{{ site.cdnVersion }}/css/web/kendo.default-v2.css" />
        <script src="~/dist/bundle.js"></script>
        <script src="./kendo-ui-license.js"></script>
    ```

## See Also

* [Using Local Files to Add Client-Side Resources]({% slug using_local_client_side_resources %})
* [Using CDN to Add Client-Side Resources]({% slug cdnservices_core %})
* [Creating Your Own Custom Script Bundles with Client-Side Resources]({% slug custombundles_core %})
