---
title: Customize Checkbox Templates
page_title: Customize Checkbox Templates | Kendo UI TreeView
description: "Learn how to customize the checkbox template of a Kendo UI TreeView in AngularJS applications."
previous_url: /controls/navigation/treeview/how-to/AngularJS/use-checkbox-template-show-nested-items-under-elements
slug: howto_customizecheckboxtemplate_angulartreeview
---

# Customize Checkbox Templates

Your project might require you to add checkbox templates to a Kendo UI TreeView in AngularJS applications.

To achieve this behavior, apply either of the following approaches:

* If the `k-options` are already declared in `$scope`, add the template to the `k-options`:

    ```
      $scope.options = {
        checkboxes: {
         checkChildren: true,
         template: $("#template").html()
      }
    ```

* Declaratively add the template part of the HTML element and assign a `scope` variable to access it:

    ```
      <div kendo-tree-view="tree"
        k-checkboxes="{'checkChildren': true, 'template': checkboxTemplate }">
      </div>
      <script>
      $scope.checkboxTemplate = $("#template").html();
      </script>
    ```

The following example demonstrates how to:

1. Add checkbox templates to a TreeView in AngularJS applications.
2. Add the [Bootstrap feel to the checkboxes]({% slug themesandappearnce_kendoui_desktopwidgets %}#common-css-files).
3. Show nested items under the TreeView elements.

```dojo
  <link rel="stylesheet" href="https://kendo.cdn.telerik.com/2020.3.1021/styles/kendo.bootstrap.min.css">

  <div id="example" ng-app="KendoDemos">
      <div class="demo-section k-content" ng-controller="MyCtrl">
        <div class="box-col">
          <h4>TreeView</h4>
          <div kendo-tree-view="tree"
               k-data-source="treeData"
               k-options="options"
               k-on-change="selecteditem=dataItem">
          </div>
        </div>
      </div>
  </div>
  <script id="item-template" type="text/x-kendo-template">
    # if (item.isLegend) { #
      # for (var i = 0; i < item.images.length; i++) { #
        <img src="#= item.images[i] #" width="100px" height="100px"/>
      # } #
    # } #

     #: item.label || '' #
  </script>
  <script>
    angular.module("KendoDemos", ["kendo.directives"])
      .controller("MyCtrl", function ($scope) {
      $scope.options = {
        dragAndDrop: true,
        loadOnDemand: false,
        checkboxes: {
          checkChildren: true,
          template: "# if (!item.isLegend) { # <input id='checkbox_#:item.uid#' type='checkbox' class='k-checkbox' /># } #"
        },
        template: $("#item-template").html()
      };

      $scope.treeData = [
        {
          "label": "Drinks",
          "items": [
            {
              "label": "My Indian Granny's Bar",
              "items": [
                {
                  "isLegend": true,
                  "images": [
                    "https://demos.telerik.com/kendo-ui/content/web/foods/2.jpg",
                    "https://demos.telerik.com/kendo-ui/content/web/foods/1.jpg"
                  ]
                }]
            },
            {
              "label": "My Daddy's Saloon",
              "items": [
                {
                  "isLegend": true,
                  "images": [
                    "https://demos.telerik.com/kendo-ui/content/web/foods/35.jpg",
                    "https://demos.telerik.com/kendo-ui/content/web/foods/75.jpg"
                  ]
                }
              ]
            }
          ]
        }
      ];
    })
  </script>

  <style>
    body {
      font: 12px 1.5 Arial,sans-serif;
    }
    .demo-section:not(.wide), #example .box:not(.wide) {
      max-width: 700px !important;
    }
    .k-treeview .k-in {
      padding: 5px;
    }
  </style>
```

## See Also

* [Basic Usage of the TreeView (Demo)](https://demos.telerik.com/kendo-ui/treeview/index)
* [Using the API of the TreeView (Demo)](https://demos.telerik.com/kendo-ui/treeview/api)
* [JavaScript API Reference of the TreeView](/api/javascript/ui/treeview)
