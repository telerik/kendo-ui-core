---
title: SystemJS
page_title: SystemJS | Kendo UI Third-Party Tools
description: "Include Kendo UI with SystemJS"
slug: systemjs_integration_kendoui
position: 1000
---

# SystemJS Support

The Kendo UI packaged scripts are in AMD-compatible format, which means that they can be used by [SystemJS](https://github.com/systemjs/systemjs).
This help article illustrates the necessary SystemJS configuration for such setup.

## Obtain the packaged Kendo UI Script Files (Kendo UI Complete)

The commercial Kendo UI distribution zip file, available for download for the active customer subscriptions has the packaged scripts available in the `js` directory.

## Build the AMD formatted scripts for (Kendo UI Core)

The instructions for obtaining and building the Kendo UI Core scripts are listed in the [README](https://github.com/telerik/kendo-ui-core#how-to-build-kendo-ui-core).

Once the scripts are available and present in your project directory, the following SystemJS configuration will pick and bundle them in your project:

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
