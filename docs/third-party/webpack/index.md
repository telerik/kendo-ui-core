---
title: Webpack
page_title: Webpack | Kendo UI Third-Party Tools
description: "Package Kendo UI with Webpack"
slug: webpacksupport_integration_kendoui
position: 3
---

# Webpack Support

The Kendo UI packaged scripts are in AMD-compatible format, which means that they can be used by [Webpack](http://webpack.github.io).
This help article illustrates the necessary webpack configuration for such setup.

## Obtain the packaged Kendo UI Script Files (Kendo UI Complete)

The commercial Kendo UI distribution zip file, available for download for the active customer subscriptions has the packaged scripts available in the `js` directory.

## Build the AMD formatted scripts for (Kendo UI Core)

The instructions for obtaining and building the Kendo UI Core scripts are listed in the [README](https://github.com/telerik/kendo-ui-core#how-to-build-kendo-ui-core).

Once the scripts are available and present in your project directory, the following webpack configuration will pick and bundle them in your project:

### index.html

```html
<!DOCTYPE html>
<html>
<head>
  <title>Kendo UI with webpack</title>
  <!-- the styles may also be loaded with webpack -->
  <link rel="stylesheet" href="http://kendo.cdn.telerik.com/2016.1.112/styles/kendo.common.min.css">
  <link rel="stylesheet" href="http://kendo.cdn.telerik.com/2016.1.112/styles/kendo.default.min.css">
  <meta charset="utf-8" />
  <script src="bundle.js" type="text/javascript" charset="utf-8"></script>
</head>
<body>
  <input id="ddl" />
</body>
</html>
```

### main.js

```javascript
require('jquery')

require('kendo.dropdownlist')

$("#dropdownlist").kendoDropDownList({
    dataTextField: "text",
    dataValueField: "value",
    dataSource: [
      { text: "Item1", value: "1" },
      { text: "Item2", value: "2" }
    ]
});
```

### webpack.config.js

```javascript
var path = require('path')
module.exports = {
    resolve: {
        extensions: [ '', '.js', 'min.js' ],
        root: [
            path.resolve('.'),
            path.resolve('../kendo/dist/js/') // the path to the minified scripts
        ]
    },
    entry: './main',
    output: {
        filename: 'bundle.js'
    }
}
```

You may test the configuration above by running the `webpack-dev-server` executable in the directory.
