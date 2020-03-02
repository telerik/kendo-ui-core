---
title: Expand Selected Nodes Asynchronously
page_title: Expand Selected Nodes Asynchronously
description: "Learn how to asynchronously expand the selected node of the Kendo UI TreeView in ASP.NET MVC."
previous_url: /helpers/navigation/treeview/how-to/expand-node-async
slug: howto_expandselectednodeasync_treeviewaspnetmvc
---

# Expand Selected Nodes Asynchronously

The TreeView for ASP.NET MVC enables you to do Ajax binding by using Entity Framework and to asynchronously expand the selected nodes when `loadOnDemand` is set to `true`.

To see the complete implementation of the approach, refer to the GitHub project on [asynchronously expanding the selected nodes of the TreeView in ASP.NET MVC applications](https://github.com/telerik/ui-for-aspnet-mvc-examples/tree/master/treeview/ExpandSelectedItemAsync).

To asynchronously expand the selected nodes of the TreeView:

1. Create a new ASP.NET MVC application. If you have installed the [Telerik UI for ASP.NET MVC Visual Studio Extensions]({% slug overview_aspnetmvc6_aspnetmvc %}#kendo-ui-for-asp.net-mvc-visual-studio-extensions), create a Telerik UI for ASP.NET MVC application.
1. If you decide not to use the Visual Studio extensions, follow the procedure for adding Telerik UI for ASP.NET MVC to existing applications:

    * [ASP.NET MVC 4]({% slug aspnetmvc4_aspnetmvc %})
    * [ASP.NET MVC 5]({% slug gettingstarted_aspnetmvc %})

1. In the Visual Studio solution explorer, right-click **Models**.
1. Select **Add** > **New Item**.
1. On the **Add New Item** dialog, select **Data** > **ADO.NET Data Model**.
1. Provide the `Northwind.edmx` name to the model and click **Next**. As a result, the **Entity Data Model Wizard** starts.
1. Select **Generate from database** and click **Next**.
1. Configure a connection to the Northwind database and click **Next**.

    ![A new entity data model](../images/tree-entity-data-model.png)

1. Select all tables and click **Finish**.
1. Open `Controllers/HomeController.cs` and add a new action method which will return JSON. Each time the user expands a parent node, the TreeView makes an Ajax request to this action method. The action method returns only the child nodes of the expanded parent node. The TreeView provides the unique identifier of the parent node or, when it makes the initial request, `null`.

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

    ```cs
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

## See Also

* [Basic Usage of the TreeView HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/treeview/index)
* [TreeViewBuilder Server-Side API](https://docs.telerik.com/aspnet-mvc/api/Kendo.Mvc.UI.Fluent/TreeViewBuilder)
* [TreeView Server-Side API](/api/treeview)
