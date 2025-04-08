---
title: Expand the Selected Nodes of the TreeView Asynchronously
description: Learn how to asynchronously expand the selected node of the {{ site.product }} TreeView in ASP.NET MVC application.
type: how-to
page_title: Expand Selected Nodes Asynchronously
previous-url: /helpers/navigation/treeview/how-to/expand-node-async, /html-helpers/navigation/treeview/how-to/expand-node-async
slug: treeview-expand-node-async
tags: treeview, async, node, expand
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>TreeView for Progress® Telerik® UI for ASP.NET MVC</td>
 </tr>
 <tr>
  <td>Product Version</td>
  <td>Created with version 2024.4.1112</td>
 </tr>
</table>

## Description
How can I asynchronously expand the selected TreeView nodes when the child nodes are loaded on demand?

## Solution
The TreeView component supports AJAX data binding by using Entity Framework. To asynchronously expand the selected nodes of the TreeView, follow the steps below:

1. Create a new ASP.NET MVC application. If you have installed the [Telerik UI for ASP.NET MVC Visual Studio Extensions]({% slug overview_visualstudio_aspnetcore %}#installing-the-extensions), create a Telerik UI for ASP.NET MVC application.
1. If you decide not to use the Visual Studio extensions, follow the [Getting Started Guide](https://docs.telerik.com/aspnet-mvc/getting-started/first-steps) to add the Telerik UI for ASP.NET MVC library to an existing application.
1. In the Visual Studio solution explorer, right-click **Models**.
1. Select **Add** > **New Item**.
1. On the **Add New Item** dialog, select **Data** > **ADO.NET Data Model**.
1. Provide the `Northwind.edmx` name to the model and click **Next**. As a result, the **Entity Data Model Wizard** starts.
1. Select **Generate from database** and click **Next**.
1. Configure a connection to the `Northwind` database and click **Next**.

    ![{{ site.product_short }} A new entity data model](images/tree-entity-data-model.png)

1. Select all tables and click **Finish**.
1. Open `Controllers/HomeController.cs` and add a new action method that returns JSON. Each time the user expands a parent node, the TreeView makes an Ajax request to this action method. The action method returns only the child nodes of the expanded parent node. The TreeView provides the unique identifier of the respective parent node. During the initial request, the parent id is `null`.

        public JsonResult Employees_Read(int? id)
        {
            using (var northwind = new NORTHWNDEntities())
            {
                var employeesQuery = northwind.Employees.Select(c => new HierarchicalViewModel
                {
                    ID = c.EmployeeID,
                    Name = c.FirstName,
                    ParentID = null,
                    HasChildren = c.Orders.Any()
                })
                .Union(northwind.Orders.Select(c => new HierarchicalViewModel
                {
                    ID = c.OrderID,
                    Name = c.ShipAddress,
                    ParentID = c.EmployeeID,
                    HasChildren = c.Order_Details.Any()
                }))
                .Union(northwind.Order_Details.Select(c => new HierarchicalViewModel
                {
                    ID = c.OrderID,
                    Name = c.Product.ProductName,
                    ParentID = c.Order.OrderID,
                    HasChildren = false
                }));

                var result = employeesQuery.ToList()
                    .Where(x => id.HasValue ? x.ParentID == id : x.ParentID == null)
                    .Select(item => new {
                        id = item.ID,
                        Name = item.Name,
                        expanded = item.Expanded,
                        hasChildren = item.HasChildren

                    });

                return Json(result, JsonRequestBehavior.AllowGet);
            }
        }

1. Open `Views/Index.cshtml` and add a TreeView.

        @(Html.Kendo().TreeView()
            .Name("treeview")
            .DataTextField("Name")
            .DataSource(dataSource => dataSource
                .Read(read => read
                    .Action("Employees_Read", "Home")
                )
            )
        )

1. Add a button which will asynchronously load child nodes with the [`load()`](https://docs.telerik.com/kendo-ui/api/javascript/data/node/methods/load) method in the child data source and, therefore, asynchronously expand the currently selected node.

    ```C#
    @(Html.Kendo().Button()
        .Name("expandNode")
        .Content("Expand selected node")
        .Events(e => e.Click("onExpandClick"))
    )
    ```
    ```js
    <script>
        function onExpandClick(e) {
            var tree = $("#treeview").data("kendoTreeView"),
                selected = tree.select(),
                dataItem = tree.dataItem(selected);

            var load = function (item) {
                var that = this,
                    chain = $.Deferred().resolve();

                chain = chain.then(function () {
                    that.expand(that.findByUid(item.uid));
                    return item.load();
                }).then(function () {
                    if (item.hasChildren) {
                        var childrenChain = $.Deferred().resolve();

                        item.children.data().forEach(function (child) {
                            (function (child) {
                                childrenChain = childrenChain.then(function () {
                                    return load.bind(that)(child);
                                })
                            })(child)
                        })

                        return childrenChain;
                    }
                });

                return chain;
            }

            if (selected.length == 0) {
                alert("Select item first!");
                return;
            }

            load.bind(tree)(dataItem);
        }
    </script>
    ```

1. Press `CTRL`+`F5` to build and run the application. Select a node and click the **Expand selected node** button.

To see the complete implementation, refer to the [ASP.NET MVC project on asynchronously expanding the selected nodes of the TreeView](https://github.com/telerik/ui-for-aspnet-mvc-examples/tree/master/Telerik.Examples.Mvc/Telerik.Examples.Mvc/Areas/TreeViewExpandSelectedItemAsync).

## More {{ site.framework }} TreeView Resources

* [{{ site.framework }} TreeView Documentation]({%slug htmlhelpers_treeview_aspnetcore%})

* [{{ site.framework }} TreeView Demos](https://demos.telerik.com/{{ site.platform }}/treeview)

{% if site.core %}
* [{{ site.framework }} TreeView Product Page](https://www.telerik.com/aspnet-core-ui/treeview)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiforcore%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-core-ui)

{% else %}
* [{{ site.framework }} TreeView Product Page](https://www.telerik.com/aspnet-mvc/panelbar)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiformvc%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-mvc)
{% endif %}

## See Also

* [Client-Side API Reference of the TreeView for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/treeview)
* [Server-Side API Reference of the TreeView for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/treeview)
* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2024%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)