---
title: Bind Checked State to Custom Model Fields
page_title: Bind Checked State to Custom Model Fields | Kendo UI TreeView
description: "Learn how to bind the checked state of a Kendo UI TreeView to a custom model field in AngularJS applications."
slug: howto_bindcheckedstatecustommodelfields_angulartreeview
---

# Bind Checked State to Custom Model Fields

By design, the Kendo UI TreeView does not support custom checkbox binding. As a result, the AngularJS `$scope.treeData` (scope model field) is not updated.

However, the TreeView updates its own data source instance. To update the AngularJS scope model field, programmatically assign the checked state of the TreeView data source to the scope model field. Alternatively, use the TreeView data source.

> **Important**
>
> Binding the checked state to an AngularJS `$scope` model field may not be suitable for large data sets because of possible performance issues due to the recursion.

The TreeView is initialized as a Kendo UI component and loads its own data source. AngularJS bindings are applied consequently. Therefore, to update the `ng-model` within the template, assign `ng-model=dataItem.customField`.

The example below demonstrates how to bind the checked state of a Kendo UI TreeView to a custom model field in AngularJS applications.

###### Example

```html
  <link rel="stylesheet" href="http://demos.telerik.com/kendo-ui/content/shared/styles/examples-offline.css">
  <script src="http://demos.telerik.com/kendo-ui/content/shared/js/console.js"></script>

  <div id="example" ng-app="KendoDemos">
      <div class="demo-section k-content" ng-controller="MyCtrl">
        <div class="box-col">
          <h4>TreeView bind to a custom isChecked property</h4>
          <div kendo-tree-view="tree"
               k-data-source="treeData"
               k-options="options"
               k-on-change="selecteditem=dataItem">
          </div>
        </div>
      </div>
      <div class="box">
        <h4>Console log</h4>
        <div class="console"></div>
      </div>
    </div>

    <script>
      angular.module("KendoDemos", ["kendo.directives"])
        .controller("MyCtrl", function ($scope) {
        $scope.options = {
          loadOnDemand: false,
          checkboxes: {
            checkChildren: true,
            template: "<input id='checkbox_#:item.uid#' ng-model='dataItem.isChecked' type='checkbox' class='k-checkbox'/><label for='checkbox_#:item.uid#' class='k-checkbox-label'></label>"
          },
          check: function(e) {
            var currentItem = e.sender.dataItem(e.node),
                modelItem = findModelItem($scope.treeData, currentItem.id);
            updateChecked($scope.treeData, e.sender.dataSource.data());

            $(".console").append("<p>Check event triggered by: " + currentItem.label + "</p>");
            $(".console").append("<p>Data Source isChecked custom property: " + currentItem.isChecked + "</p>");
            $(".console").append("<p>Model isChecked custom property: " + modelItem.isChecked + "</p>");

          },
          template: "#: item.label #"
        };

        $scope.treeData = [
          {
            "label": "Alex's family tree",
            "isChecked":true,
            "id": null,
            "items": [
              {
                "id": 1,
                "label": "Reef",
                "isChecked": true
              },
              {
                "id": 2,
                "label": "Coraline",
                "isChecked": true
              }
            ]
          }
        ];

        // this is only to display the relevant model checked state for the demo
        function findModelItem(model, id) {
          for (var i = 0; i < model.length; i++) {
            var currentItem = model[i];
            if(currentItem.id === id){
              return currentItem;
            }
            if (currentItem.items) {
              var found = findModelItem(currentItem.items, id);
              if (found) {
                return found;
              }
            }
          }
        }

        // copy checked state from datasource to model
        function updateChecked(model, dataSource) {
          for (var i = 0; i < model.length; i++) {
            var dataItem = model[i];
            var node = dataSource[i];

            dataItem.isChecked = node.checked;

            if (dataItem.items) {
              updateChecked(dataItem.items, node.children.data());
            }
          }
        }

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
