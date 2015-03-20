---
title: Use with RequireJS
position: 210
---

# Using Kendo UI with RequireJS

The production (minified) builds of Kendo UI are designed to work with [RequireJS](http://requirejs.org/).  Therefore if you need to use only a few components instead of loading the full `kendo.all.js`, you may now declare only the components you need and RequireJS will take care to load any needed dependencies.

For example, supposing you need to use a grid and a dropdownlist, your code could look like this:

    <div id="grid"></div>
    <br>
    <select id="ddl"></select>

    <!-- Load the jQuery and RequireJS files from CDN -->

    <script data-main="http://cdn.kendostatic.com/2014.2.903/js/jquery.min.js"
            src="http://cdnjs.cloudflare.com/ajax/libs/require.js/2.1.1/require.min.js"></script>

    <script>
      require([ "kendo.dropdownlist.min", "kendo.grid.min" ], initApp); //include the needed Kendo UI widgets scripts

      function initApp() {
        //you can initialzie the Kendo UI components here
        $('#grid').kendoGrid({
          dataSource:{
            data: [{name: "John Doe"}]
          }
        })

        $('#ddl').kendoDropDownList({
          dataSource: {
            data: [{name:"Jane Doe", value: 1}, {name:"John Doe", value: 2}]
          },
          dataTextField: "name",
          dataValueField: "value"
        })
      }
    </script>

and you don't need to worry about which other files are necessary for the grid and dropdownlist widgets.

## Configuring RequireJS

Above we load RequireJS from a CDN, and configure it to load Kendo UI files from the Kendo CDN by using the `data-main` attribute (which also loads jQuery).

In practice, if you use RequireJS you will probably have some files of your own that need to be loaded and those will reside in a different location than Kendo files.  Here is a more complete example of how you could organize things:

    <!-- first, load RequireJS -->
    <script src="require.js"></script>

    <!-- configure RequireJS with two logical paths:
         - "app/" will be used for your files
         - "k/" will be for Kendo UI modules -->

    <script>
      requirejs.config({
          paths: {
              app: "/path/to/your/files",
              k: "http://cdn.kendostatic.com/VERSION/js"
          }
      });

      require([
          "http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js",
          "app/foo",
          "app/bar",
          "k/kendo.menu.min",
          "k/kendo.grid.min"
      ], initApp);

      function initApp() {
         // main entry point of your application
      }
    </script>

For more information about RequireJS please [visit the website](http://requirejs.org/).

## Using Kendo UI Custom Download with AngularJS and Require

In this scenario a custom schim configuration is needed. The app will be initialized using `angular.bootstrap`, after all the scripts are loaded

    <div id="example" ng-controller="MyCtrl">
        <br>
        <select kendo-drop-down-list k-options="myOptions"></select>
      </div>
      <script src="http://cdnjs.cloudflare.com/ajax/libs/require.js/2.1.1/require.min.js"></script>
      <script>
        require.config({
          paths: {
            'jquery' : 'http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min',
            'angular': 'https://ajax.googleapis.com/ajax/libs/angularjs/1.3.12/angular.min',
            'kendo': 'path-to-your-kendo-custom.min.js file'
          },
          shim: {
            'kendo': ['jquery'],
            'angular' : ['jquery'],
            'app': {
              deps: ['angular', 'kendo'] //set dependencies
            }
          }
        });

        require([
          'angular',
          'kendo'
        ], initApp);

        function initApp() {
          var app = angular.module("app", ['kendo.directives']);
          app.controller("MyCtrl", function($scope){
            $scope.myOptions = {
              dataSource: {
                data: [{name:"Jane Doe", value: 1}, {name:"John Doe", value: 2}]
              },
              dataTextField: "name",
              dataValueField: "value"
            }
          })
          angular.bootstrap(document, ['app']); //initialize application
        }
      </script>
