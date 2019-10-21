---
title: Define Node Template When TreeView Is within PanelBar
page_title: Define Node Template When TreeView Is within PanelBar | Kendo UI TreeView
description: "Learn how to define a Kendo UI TreeView node template when the widget is placed within a Kendo UI PanelBar in an AngularJS application."
slug: howto_nodetemplatewhenplacedinpanelbar_angularjs_treeview
---

# Define Node Template When TreeView Is within PanelBar

Kendo UI offers template support in AngularJS applications for both its TreeView and the PanelBar widgets.

If you define a template through the `k-template` directive, it will not be mapped correctly to the TreeView. To work around this issue, define the template in a `<script type="text/x-kendo-template">` element. As a result, it will be programmatically assigned to the TreeView.

```dojo

    <script id="treeview-template" type="text/x-kendo-template">
        <span>
            {{dataItem.FullName}}
            <button class='k-button' ng-click='click(dataItem)'>Select</button>
        </span>
    </script>

    <div id="example" ng-app="KendoDemos">
        <div ng-controller="MyCtrl">
            <ul kendo-panel-bar>
                <li>Home</li>
                <li>Devices</li>
                <li class="k-state-active">Folders
                    <div kendo-tree-view="tree"
                        k-on-change="selectedItem = dataItem"
                        k-options="options">
                    </div>
                </li>
            </ul>
            <div ng-show="selectedItem">
                <h4>Selected: {{selectedItem.FullName}}</h4>
            </div>
        </div>
    </div>

    <script>
        angular.module("KendoDemos", ["kendo.directives"])
            .controller("MyCtrl", function ($scope) {
                var serviceRoot = "https://demos.telerik.com/kendo-ui/service";

                var homogeneous = new kendo.data.HierarchicalDataSource({
                    transport: {
                        read: {
                            url: serviceRoot + "/Employees",
                            dataType: "jsonp"
                        }
                    },
                    schema: {
                        model: {
                            id: "EmployeeId",
                            hasChildren: "HasEmployees"
                        }
                    }
                });

                $scope.options = {
                    dataSource: homogeneous,
                    template: kendo.template($('#treeview-template').html())
                }

                $scope.click = function (dataItem) {
                    alert(dataItem.FullName);
                };
            });
    </script>
```

## See Also

* [Basic Usage of the TreeView (Demo)](https://demos.telerik.com/kendo-ui/treeview/index)
* [Using the API of the TreeView (Demo)](https://demos.telerik.com/kendo-ui/treeview/api)
* [JavaScript API Reference of the TreeView](/api/javascript/ui/treeview)
