---
title: Grid ToolBar template with AngularJS
page_title: Grid ToolBar template with AngularJS
description: Kendo Grid example that demontrates how to create custom Grid ToolBar template in AngularJS application.
---

The example below demonstrates how to create custom Grid ToolBar template in AngularJS application.

```html
<div id="example" ng-app="KendoDemos">
  <div ng-controller="MyCtrl">

      <script id="template" type="text/x-kendo-template">
          {{ gridName }}
          <a class="k-button" href="\#" ng-click="toolbarClick()">Command</a>
      </script>

      <div kendo-grid
         k-toolbar="toolbarTemplate"
         k-columns="[{ title: 'foo' , field: 'foo' },
                    { title: 'bar' , field: 'bar' }]"
         k-data-source="data">
      </div>
  </div>
</div>

<script>
    angular.module("KendoDemos", ["kendo.directives"]);
    function MyCtrl($scope) {

        $scope.data = new kendo.data.DataSource({ data: [{foo: "foo", bar: "bar"}] });
        $scope.gridName = "My Grid";
        $scope.toolbarTemplate = $("#template").html();
        $scope.toolbarClick = function() { console.log("click"); }

    }
</script>
```
