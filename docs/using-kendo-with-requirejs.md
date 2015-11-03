---
title: Use with RequireJS
position: 210
---

# Using Kendo UI with RequireJS

The minified Kendo UI JavaScript files are [AMD](https://en.wikipedia.org/wiki/Asynchronous_module_definition) modules and work with compatible loaders such as [RequireJS](http://requirejs.org/).
You can use this feature to load only the needed Kendo UI JavaScript files instead of `kendo.all.min.js`.

> Only the minified Kendo UI JS files (.min.js) are AMD modules. The source files (.js) and combined files (kendo.all.min.js) are not AMD modules and require [additional configuration](#using-kendoallminjs-with-requirejs) in order to work with RequireJS.

## Using RequireJS to load Kendo UI from CDN

This example shows how to load the Kendo UI JavaScript files via [CDN](/intro/installation/getting-started#use-the-kendo-ui-cdn-service).

```html
<!doctype html>
<html>
    <head>
        <link rel="stylesheet" href="http://kendo.cdn.telerik.com/2015.2.805/styles/kendo.common-material.min.css">
        <link rel="stylesheet" href="http://kendo.cdn.telerik.com/2015.2.805/styles/kendo.material.min.css">
        <!-- Include RequireJS and use the data-main attribute to specify the default JS file location -->
        <script data-main="http://kendo.cdn.telerik.com/2015.2.805/js/" src="http://cdnjs.cloudflare.com/ajax/libs/require.js/2.1.1/require.min.js"></script>
    </head>
    <body>
        <div id="grid"></div>
        <select id="dropdownlist"></select>
        <script>
        require.config({
           paths: {
               // Specify the location of the jQuery JS file since it is loaded from the jQuery CDN
              "jquery": "http://code.jquery.com/jquery-1.9.1.min"
           }
        });

        require([ "jquery", "kendo.dropdownlist.min", "kendo.grid.min" ], function($) {
          // Initialize the Kendo UI widgets here
          $("#grid").kendoGrid({
            dataSource:{
              data: [{name: "John Doe"}]
            }
          });

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

## Using RequireJS to load Kendo UI from local directory

This example shows how to load the Kendo UI JavaScript files from a local directory e.g. `/js/kendo`.

```
<!doctype html>
<html>
    <head>
        <link rel="stylesheet" href="http://kendo.cdn.telerik.com/2015.2.805/styles/kendo.common-material.min.css">
        <link rel="stylesheet" href="http://kendo.cdn.telerik.com/2015.2.805/styles/kendo.material.min.css">
        <!-- Include RequireJS -->
        <script src="http://cdnjs.cloudflare.com/ajax/libs/require.js/2.1.1/require.min.js"></script>
    </head>
    <body>
        <div id="grid"></div>
        <select id="dropdownlist"></select>
        <script>
        require.config({
           paths: {
              // Specify the location of the jQuery JS file
              "jquery": "http://code.jquery.com/jquery-1.9.1.min",
              // Specify the directory which contains the minified Kendo UI JS files. It should be used when requiring the Kendo UI JS files.
              "kendo": "/js/kendo"
           }
        });
        // Require jquery and the Kendo UI JS files. Note that the "kendo" path is prepended (configured above)
        require([ "jquery", "kendo/kendo.dropdownlist.min", "kendo/kendo.grid.min" ], function($) {
          // Initialize the Kendo UI widgets here
          $("#grid").kendoGrid({
            dataSource:{
              data: [{name: "John Doe"}]
            }
          });

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

## Creating AMD modules which depend on Kendo UI

This example shows how to create your own AMD module which depends on Kendo UI. The example assumes the following:

* The AMD module is called `main.js` and resides in the `/js/app` local directory.
* The minified Kendo UI JavaScript files are located in the `/js/app` local directory.
* The page that uses the AMD module is `index.html`

### main.js

    define(["jquery", "kendo/kendo.dropdownlist.min", "kendo/kendo.grid.min"], function($) {
        $("#grid").kendoGrid({
            dataSource:{
                data: [{name: "John Doe"}]
            }
        });

        $("#dropdownlist").kendoDropDownList({
          dataSource: {
            data: [{name:"Jane Doe", value: 1}, {name:"John Doe", value: 2}]
          },
          dataTextField: "name",
          dataValueField: "value"
        });
    });

### index.html

    <!doctype html>
    <html>
        <head>
            <title>AMD module that uses Kendo UI</title>
            <!-- Include RequireJS -->
            <script src="http://cdnjs.cloudflare.com/ajax/libs/require.js/2.1.1/require.min.js"></script>
        </head>
        <body>
            <div id="grid"></div>
            <select id="dropdownlist"></select>
            <script>
            require.config({
               paths: {
                  // Specify the location of the jQuery JS file
                  "jquery": "http://code.jquery.com/jquery-1.9.1.min",
                  // Specify the directory which contains the minified Kendo UI JS files. It should be used when requiring the Kendo UI JS files.
                  "kendo": "/js/kendo",
                  // Specify the directory which contains the AMD module. It should be used when requiring that file.
                  "app": "/js/app"
               }
            });

            // Require the main.js AMD module. RequireJS will load its dependencies - jQuery and the Kendo UI Grid and DropDownList.
            require(["app/main" ], function() {
            });
            </script>
        </body>
    </html>

## Using kendo.all.min.js with RequireJS

The combined kendo.all.min.js file is not an AMD module and requires a [shim](http://requirejs.org/docs/api.html#config-shim). This example shows how to do this.

```html
<!doctype html>
<html>
    <head>
        <link rel="stylesheet" href="http://kendo.cdn.telerik.com/2015.2.805/styles/kendo.common-material.min.css">
        <link rel="stylesheet" href="http://kendo.cdn.telerik.com/2015.2.805/styles/kendo.material.min.css">
        <!-- Include RequireJS -->
        <script src="http://cdnjs.cloudflare.com/ajax/libs/require.js/2.1.1/require.min.js"></script>
    </head>
    <body>
        <div id="grid"></div>
        <select id="dropdownlist"></select>
        <script>
        require.config({
           paths: {
              "jquery": "http://code.jquery.com/jquery-1.9.1.min",
              "kendo.all.min": "http://kendo.cdn.telerik.com/2015.2.902/js/kendo.all.min"
           },
           shims: {
              "kendo.all.min": {
                 deps: [ "jquery" ]
              }
           }
        });

        require([ "jquery", "kendo.all.min" ], function($) {
          $("#grid").kendoGrid({
            dataSource:{
              data: [{name: "John Doe"}]
            }
          });

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

## Using AngularJS And Kendo UI with RequireJS

This example shows how to load AngularJS and initialize it with [angular.bootsrap](https://docs.angularjs.org/api/ng/function/angular.bootstrap) when all JS files are loaded.

```html
<!doctype html>
<html>
    <head>
        <link rel="stylesheet" href="http://kendo.cdn.telerik.com/2015.2.805/styles/kendo.common-material.min.css">
        <link rel="stylesheet" href="http://kendo.cdn.telerik.com/2015.2.805/styles/kendo.material.min.css">
        <!-- Include RequireJS -->
        <script src="http://cdnjs.cloudflare.com/ajax/libs/require.js/2.1.1/require.min.js"></script>
    </head>
    <body>
        <div ng-controller="controller">
          <select kendo-drop-down-list k-options="options"></select>
        </div>
        <script>
          require.config({
            paths: {
              "jquery": "http://code.jquery.com/jquery-1.9.1.min",
              "angular": "https://ajax.googleapis.com/ajax/libs/angularjs/1.3.12/angular.min",
              "kendo": "http://kendo.cdn.telerik.com/2015.2.902/js/"
            },
            shim: {
              "angular": { deps: ["jquery"] },
              "kendo/kendo.angular.min": { deps: ["angular"] },
              "app": {
                 "deps": ["angular"]
              }
            }
          });

          require([ "angular", "kendo/kendo.dropdownlist.min", "kendo/kendo.angular.min" ], function() {
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

## Using JSZip with RequireJS

JSZip is required by the Excel export feature of Kendo UI. However it doesn"t come in AMD format and needs a shim similar to using `kendo.all.min.js`. The following example shows
how to use JSZip with RequireJS.

```html
<!doctype html>
<html>
    <head>
        <link rel="stylesheet" href="http://kendo.cdn.telerik.com/2015.2.805/styles/kendo.common-material.min.css">
        <link rel="stylesheet" href="http://kendo.cdn.telerik.com/2015.2.805/styles/kendo.material.min.css">
        <!-- Include RequireJS and use the data-main attribute to specify the default JS file location -->
        <script data-main="http://kendo.cdn.telerik.com/2015.2.805/js/" src="http://cdnjs.cloudflare.com/ajax/libs/require.js/2.1.1/require.min.js"></script>
    </head>
    <body>
        <div id="grid"></div>
        <script>
        require.config({
           paths: {
               // Specify the location of the jQuery JS file since it is loaded from the jQuery CDN
              "jquery": "http://code.jquery.com/jquery-1.9.1.min",
              "jszip" : "http://cdnjs.cloudflare.com/ajax/libs/jszip/2.4.0/jszip"
           },
        });

        require([ "jquery", "jszip", "kendo.grid.min" ], function($, JSZip) {
          // Expose JSZip as a global
          window.JSZip = JSZip;
          // Initialize the Kendo UI widgets
          $("#grid").kendoGrid({
            toolbar: ["excel"],
            excel: {
              fileName: "Kendo UI Grid Export.xlsx",
              proxyURL: "http://demos.telerik.com/kendo-ui/service/export"
            },
            dataSource: {
              type: "odata",
              transport: {
                read: "http://demos.telerik.com/kendo-ui/service/Northwind.svc/Products"
              },
              schema:{
                model: {
                  fields: {
                    ProductName: { type: "string" },
                    UnitPrice: { type: "number" }
                  }
                }
              },
              pageSize: 7,
            },
            columns: [
              { width: 300, field: "ProductName", title: "Product Name"},
              { width: 300, field: "UnitPrice", title: "Unit Price"}
            ]
          });
        });
        </script>
    </body>
</html>
```

## Using Kendo UI Custom Download with AngularJS and RequireJS

In this scenario a custom schim configuration is needed. The app will be initialized using `angular.bootstrap`, after all the scripts are loaded

    <div id="example" ng-controller="MyCtrl">
        <br>
        <select kendo-drop-down-list k-options="myOptions"></select>
      </div>
      <script src="http://cdnjs.cloudflare.com/ajax/libs/require.js/2.1.1/require.min.js"></script>
      <script>
        require.config({
          paths: {
            "jquery" : "http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min",
            "angular": "https://ajax.googleapis.com/ajax/libs/angularjs/1.3.12/angular.min",
            "kendo": "path-to-your-kendo-custom.min.js file"
          },
          shim: {
            "kendo": ["jquery"],
            "angular" : ["jquery"],
            "app": {
              deps: ["angular", "kendo"] //set dependencies
            }
          }
        });

        require([
          "angular",
          "kendo"
        ], initApp);

        function initApp() {
          var app = angular.module("app", ["kendo.directives"]);
          app.controller("MyCtrl", function($scope){
            $scope.myOptions = {
              dataSource: {
                data: [{name:"Jane Doe", value: 1}, {name:"John Doe", value: 2}]
              },
              dataTextField: "name",
              dataValueField: "value"
            }
          })
          angular.bootstrap(document, ["app"]); //initialize application
        }
      </script>
