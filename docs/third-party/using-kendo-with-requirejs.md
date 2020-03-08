---
title: RequireJS
page_title: RequireJS | Kendo UI Third-Party Tools
description: "Learn how to work with Kendo UI and RequireJS compatible loader."
previous_url: /using-kendo-with-requirejs
slug: requirejs_integration_kendoui
---

# RequireJS

The minified Kendo UI JavaScript files are [AMD modules](https://en.wikipedia.org/wiki/Asynchronous_module_definition) and work with compatible loaders, such as [RequireJS](http://requirejs.org/), which load only the needed Kendo UI JavaScript files instead of `kendo.all.min.js`.

> * As of 2016, the RequireJS project is mostly superseded by solutions such as [Webpack](http://webpack.github.io/), [Browserify](http://browserify.org/) and [SystemJS](https://github.com/systemjs/systemjs), which provide much more extensible API.
> * You may check the help articles on their integration too&mdash;[Webpack support]({% slug webpacksupport_integration_kendoui %}) and [SystemJS support]({% slug systemjs_integration_kendoui %}).
> * Due to a bug, the examples below do not work with the official Kendo UI Q1 2016 release. They should work as expected with the versions 2016.1.118 and later.
> * It is not possible to load packages produced by the [Download Builder]({% slug include_only_what_you_need_kendoui_installation %}#employ-download-builder) using RequireJS.

## Loading from Local Directories

The following example demonstrates how to load the Kendo UI JavaScript files from a local directory&mdash;for example, `js/my-kendo-scripts`. It is assumed that all Kendo UI scripts files are available there.

```pseudo
<!DOCTYPE HTML>
<html>
    <head>
        <link rel="stylesheet" href="/styles/my-kendo-styles/kendo.common.core.min.css" />
        <link rel="stylesheet" href="/styles/my-kendo-styles/kendo.default.min.css" />
        <!-- Include RequireJS -->
        <script src="https://cdnjs.cloudflare.com/ajax/libs/require.js/2.1.1/require.js"></script>
    </head>
    <body>
        <select id="dropdownlist"></select>
        <script>
        require.config({
          baseUrl: "js/my-kendo-scripts/", // the path where the kendo scripts are present
          paths: {
            "jquery": "https://code.jquery.com/jquery-1.9.1.min",
          }
        });

        require([ "jquery", "kendo.dropdownlist.min" ], function($, kendo) {
          console.log(kendo)

          $("#dropdownlist").kendoDropDownList({
            dataSource: {
              data: [{name:"Jane Doe", value: 1}, {name:"John Doe", value: 2}]
            },
            dataTextField: "name",
            dataValueField: "value"
          });
        });
        </script>
    </body>
</html>
```

## Using Bundle Scripts

The following example demonstrates how to use a bundle script with RequireJS.

```pseudo
<!DOCTYPE HTML>
<html>
  <head>
  <link rel="stylesheet" href="https://kendo.cdn.telerik.com/2018.1.221/styles/kendo.common.min.css">
  <link rel="stylesheet" href="https://kendo.cdn.telerik.com/2018.1.221/styles/kendo.default.min.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/require.js/2.1.1/require.js"></script>
  </head>
  <body>
    <div id="grid"></div>
    <script>

      require.config({
        paths: {
          "jquery": "https://code.jquery.com/jquery-1.9.1.min",
          "jszip": "https://kendo.cdn.telerik.com/2018.1.221/js/jszip.min",
          "kendo.all.min": "https://kendo.cdn.telerik.com/2018.1.221/js/kendo.all.min",
        }
      });

      require([ "jquery", "jszip", "kendo.all.min" ], function($, JSZip, kendo) {
        window.JSZip = JSZip;
        $("#grid").kendoGrid({
          toolbar:["excel"],
          dataSource: {
            data: [{name:"Jane Doe"}, {name:"John Doe"}]
          }
        });
      });
    </script>
  </body>
</html>
```

## Using AngularJS and Kendo UI

The following example demonstrates how to load AngularJS and initialize it with [`angular.bootsrap`](https://docs.angularjs.org/api/ng/function/angular.bootstrap) when all `.js` files are loaded.

```pseudo
<!DOCTYPE HTML>
<html>
  <head>
    <link rel="stylesheet" href="https://kendo.cdn.telerik.com/2016.1.406/styles/kendo.common.min.css">
    <link rel="stylesheet" href="https://kendo.cdn.telerik.com/2016.1.406/styles/kendo.rtl.min.css">
    <link rel="stylesheet" href="https://kendo.cdn.telerik.com/2016.1.406/styles/kendo.default.min.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/require.js/2.1.1/require.js"></script>
  </head>
  <body>
    <div ng-controller="controller">
      <select kendo-drop-down-list k-options="options"></select>
    </div>

    <script>
      require.config({
        paths: {
          "angular": "https://ajax.googleapis.com/ajax/libs/angularjs/1.3.12/angular.min",
          "jquery": "https://code.jquery.com/jquery-1.9.1.min",
          "kendo.all.min": "https://kendo.cdn.telerik.com/2016.1.406/js/kendo.all.min"
        },
        shim: {
          "angular": { deps: ["jquery"] },
          "kendo.all.min": { deps: ["angular"] }
        }
      });

      require([ "angular", "kendo.all.min" ], function() {
        var app = angular.module("app", ["kendo.directives"]);

        app.controller("controller", ["$scope", function($scope) {
          $scope.options = {
            dataSource: {
              data: [{name:"Jane Doe", value: 1}, {name:"John Doe", value: 2}]
            },
            dataTextField: "name",
            dataValueField: "value"
          };
        }]);

        angular.bootstrap(document, ["app"]);
      });
    </script>
  </body>
</html>
```

## Using Custom Kendo Scripts in AngularJS

The following example demonstrates how to use a [custom Kendo script created with `gulp`]({% slug include_only_what_you_need_kendoui_installation %}#use-gulp) with RequireJS and AngularJS. The script for the below example has been created with the following command: `gulp custom dropdownlist,angular`.

```pseudo
<!DOCTYPE HTML>
<html>
  <head>
  <link rel="stylesheet" href="https://kendo.cdn.telerik.com/2019.2.514/styles/kendo.common.min.css">
  <link rel="stylesheet" href="https://kendo.cdn.telerik.com/2019.2.514/styles/kendo.default.min.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/require.js/2.1.1/require.js"></script>
  </head>
  <body>
    <div ng-controller="controller">
      <select kendo-drop-down-list k-options="options"></select>
    </div>

    <script>
      require.config({
        paths: {
          "angular": "https://ajax.googleapis.com/ajax/libs/angularjs/1.6.8/angular.min",
          "jquery": "https://code.jquery.com/jquery-3.1.1.min",
          "kendo.angular.min": "dist/js/kendo.custom.min",
          "kendo.dropdownlist.min": "dist/js/kendo.custom.min"
        },
        shim: {
          "angular": { deps: ["jquery"] },
          "kendo.angular.min": { deps: ["angular"] },
          "kendo.dropdownlist.min": { deps: ["kendo.angular.min"] },
        }
      });

      require([ "jquery", "angular", "kendo.angular.min", "kendo.dropdownlist.min" ], function() {
        var app = angular.module("app", ["kendo.directives"]);

        app.controller("controller", ["$scope", function($scope) {
          $scope.options = {
            dataSource: {
              data: [{name:"Jane Doe", value: 1}, {name:"John Doe", value: 2}]
            },
            dataTextField: "name",
            dataValueField: "value"
          };
        }]);

        angular.bootstrap(document, ["app"]);
      });
    </script>
  </body>
</html>
```

## See Also

* [SharePoint Add-Ins]({% slug sharepoint_tutorials %})
* [Twitter Bootstrap]({% slug twitterbootstrapintegration_integration_kendoui %})
* [Angular 2.0]({% slug angular2support_integration_kendoui %})
* [TypeScript]({% slug typescript_integration_kendoui %})
* [Visual Studio IntelliSense]({% slug visualstudiointellisense_integration_kendoui %})
* [Telerik Data Access]({% slug bindtotelerikdataaccesstool_integration_kendoui %})
* [SystemJS Support]({% slug systemjs_integration_kendoui %})
* [Webpack Support]({% slug webpacksupport_integration_kendoui %})
* [Aurelia]({% slug aurelia_integration_kendoui %})
