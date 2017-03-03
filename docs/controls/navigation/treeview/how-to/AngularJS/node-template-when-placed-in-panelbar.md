---
title: Define Node Template when TreeView is within PanelBar
page_title: Define Node Template when TreeView is within PanelBar | Kendo UI TreeView
description: "Learn how to define a Kendo UI TreeView node template, when the widget is placed within Kendo UI PanelBar in an AngularJS application."
slug: howto_nodetemplatewhenplacedinpanelbar_angularjs_treeview
---

# Define Node Template when TreeView is Placed in a PanelBar

The Kendo UI framework offers Template support for both the TreeView and the PanelBar widgets in an AngularJS application. Therefore, a template defined using the k-template Kendo Angular directive cannot be mapped correctly to the TreeView. In such case, the template should be defined in a &lt;script type="text/x-kendo-template"$gth; element and it should be assigned to the TreeView programatically.

###### Example

```html

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

Other articles on the Kendo UI TreeView:

* [TreeView JavaScript API Reference](/api/javascript/ui/treeview)
* [How to Customize Checkbox Templates]({% slug howto_customizecheckboxtemplate_angulartreeview %})
* [How to Render Multiple TreeViews Using HTML Source Binding]({% slug howto_rendermultipleusing_htmlsourcebinding_mvvm_treeview %})
* [How to Edit Nodes via Form]({% slug howto_editnodesviaform_treeview %})
* [How to Filter Out Search Results]({% slug howto_filetroutserachresults_treeview %})
* [How to Hide Checkboxes for Root Level]({% slug howto_hidecheckboxesforrootlevel_treeview %})
* [How to Persist Expanded State]({% slug howto_persistexpandedstate_treeview %})

For more runnable examples on the Kendo UI TreeView, browse its [**How To** documentation folder]({% slug howto_editnodesviaform_angularjs_treeview %}).
