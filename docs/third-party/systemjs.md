---
title: SystemJS
page_title: SystemJS | Kendo UI Third-Party Tools
description: "Include Kendo UI with SystemJS."
slug: systemjs_integration_kendoui
position: 8
---

# SystemJS

The Kendo UI packaged scripts are in an AMD-compatible format, which means that they can be used by [SystemJS](https://github.com/systemjs/systemjs). This article illustrates the necessary SystemJS configuration for this setup.

## Obtain Packaged Kendo UI Script Files

This section is intended for holders of the commercial Kendo UI Complete license.

The commercial Kendo UI distribution `zip` file, available for download for the active customer subscriptions, has the packaged scripts stored in the `js` directory.

## Build AMD-Formatted Scripts

This section is intended for users of the Kendo UI Core open-source distribution.

The instructions for obtaining and building the Kendo UI Core scripts are listed in the [README](https://github.com/telerik/kendo-ui-core#how-to-build-kendo-ui-core) article.

Once the scripts are available and present in your project directory, the SystemJS configuration demonstrated in the sections below will pick and bundle them in your project.

### index.html

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="http://kendo.cdn.telerik.com/2016.1.112/styles/kendo.common.min.css">
  <link rel="stylesheet" href="http://kendo.cdn.telerik.com/2016.1.112/styles/kendo.rtl.min.css">
  <link rel="stylesheet" href="http://kendo.cdn.telerik.com/2016.1.112/styles/kendo.default.min.css">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/systemjs/0.19.16/system.js" type="text/javascript" charset="utf-8"></script>
</head>
<body>
  <input id="ddl" />

  <script type="text/javascript" charset="utf-8">
    System.config({
      map: {
        traceur: "https://google.github.io/traceur-compiler/bin/traceur.js",
        jquery: '//code.jquery.com/jquery-2.1.4.min.js'
      },

      paths: {
        'kendo.*': "../kendo/dist/js/kendo.*.js"
      }
    })

    System.import('./main.js');
  </script>
</body>
</html>
```

### main.js

```javascript
import $ from 'jquery'
import 'kendo.dropdownlist'

$("#ddl").kendoDropDownList({
    dataTextField: "text",
    dataValueField: "value",
    dataSource: [
      { text: "Item1", value: "1" },
      { text: "Item2", value: "2" }
    ]
});
```

## See Also

Other articles on Kendo UI integration with third-party tools and frameworks:

* [Angular 2.0]({% slug angular2support_integration_kendoui %})
* [Twitter Bootstrap]({% slug twitterbootstrapintegration_integration_kendoui %})
* [Web Components]({% slug webcomponents_integration_kendoui %})
* [RequireJS]({% slug requirejs_integration_kendoui %})
* [TypeScript]({% slug typescript_integration_kendoui %})
* [Visual Studio IntelliSense]({% slug visualstudiointellisense_integration_kendoui %})
* [Telerik Data Access]({% slug bindtotelerikdataaccesstool_integration_kendoui %})
* [Webpack Support]({% slug webpacksupport_integration_kendoui %})
* [Aurelia]({% slug aurelia_integration_kendoui %})
