---
title: Customize Checkbox Templates
page_title: Customize Checkbox Templates | Kendo UI TreeView
description: "Learn how to customize the checkbox template of a Kendo UI TreeView in AngularJS applications."
previous_url: /controls/navigation/treeview/how-to/AngularJS/use-checkbox-template-show-nested-items-under-elements
slug: howto_customizecheckboxtemplate_angulartreeview
---

# Customize Checkbox Templates

To add checkbox templates to a Kendo UI TreeView in AngularJS applications, choose either of the following approaches:

* Add the template to the `k-options` if the `k-options` are already declared in `$scope`:

    ```
      $scope.options = {
        checkboxes: {
         checkChildren: true,
         template: $("#template").html()
      }
    ```

* Add the template declaratively as part of the HTML element and assign a scope variable to access it:

    ```
      <div kendo-tree-view="tree"
        k-checkboxes="{'checkChildren': true, 'template': checkboxTemplate }">
      </div>
      <script>
      $scope.checkboxTemplate = $("#template").html();
      </script>
    ```

When using the Kendo UI checkboxes, make sure the [`input` element is immediately followed by a `label` element]({% slug themesandappearnce_kendoui_desktopwidgets %}#customize-checkboxes-and-radio-buttons). Otherwise, without a `label`, the `k-checkbox` class will apply a `display : none` style.

The example below demonstrates how to:

1. Add checkbox templates to a Kendo UI TreeView in AngularJS applications.
2. Add the [Bootstrap feel to the checkboxes]({% slug themesandappearnce_kendoui_desktopwidgets %}#common-css-files).
3. Show nested items under elements of a Kendo UI TreeView.

###### Example

```html
  <link rel="stylesheet" href="http://kendo.cdn.telerik.com/2016.2.714/styles/kendo.bootstrap.min.css">

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
          template: "# if (!item.isLegend) { # <input id='checkbox_#:item.uid#' type='checkbox' class='k-checkbox' /><label for='checkbox_#:item.uid#' class='k-checkbox-label'></label># } #"
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
                    "http://demos.telerik.com/kendo-ui/content/web/foods/2.jpg",
                    "http://demos.telerik.com/kendo-ui/content/web/foods/1.jpg"
                  ]
                }]
            },
            {
              "label": "My Daddy's Saloon",
              "items": [
                {
                  "isLegend": true,
                  "images": [
                    "http://demos.telerik.com/kendo-ui/content/web/foods/35.jpg",
                    "http://demos.telerik.com/kendo-ui/content/web/foods/75.jpg"
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

Other articles on the Kendo UI TreeView:

* [TreeView JavaScript API Reference](/api/javascript/ui/treeview)
* [How to Check Nodes Programmatically]({% slug howto_checknodeprogramatically_treeview %})
* [How to Edit Nodes via Form]({% slug howto_editnodesviaform_treeview %})
* [How to Filter Out Search Results]({% slug howto_filetroutserachresults_treeview %})
* [How to Hide Checkboxes for Root Level]({% slug howto_hidecheckboxesforrootlevel_treeview %})
* [How to Persist Expanded State]({% slug howto_persistexpandedstate_treeview %})
* [How to Render Multiple TreeViews Using HTML Source Binding]({% slug howto_rendermultipleusing_htmlsourcebinding_mvvm_treeview %})
* [How to Scroll to Selected Item]({% slug howto_scrolltoselecteditem_treeview %})
* [How to Use FontAwesome Icons]({% slug howto_usefontawesomeicons_treeview %})

For more runnable examples on the Kendo UI TreeView, browse its [**How To** documentation folder]({% slug howto_editnodesviaform_angularjs_treeview %}).
