---
title: Ajax Binding
page_title: Ajax Binding | Kendo UI TreeView HtmlHelper
description: "Populate the TreeView with nodes in ASP.NET MVC applications by using Ajax requests."
slug: ajaxbinding_treeviewhelper_aspnetmvc
position: 2
---

# Ajax Binding

Below are listed the steps for you to follow when configuring the Kendo UI TreeView for ASP.NET MVC to do Ajax binding using Entity Framework and the Northwind database.

## Configuration

### Create the Application

**Step 1** Create a new ASP.NET MVC application. If you have installed the [Telerik UI for ASP.NET MVC Visual Studio Extensions]({% slug overview_aspnetmvc %}#kendo-ui-for-asp.net-mvc-visual-studio-extensions), create a Telerik UI for ASP.NET MVC application.

**Step 2** Name the application `KendoTreeViewAjaxBinding`. If you decide not to use the Visual Studio extensions, follow the procedure for adding Telerik UI for ASP.NET MVC to existing applications:

* [ASP.NET MVC 4]({% slug aspnetmvc4_aspnetmvc %})
* [ASP.NET MVC 5]({% slug aspnetmvc5_aspnetmvc %})

### Add the New Item

**Step 1** Add a new `Entity Framework DataM Model`. Right-click the **Models** folder in Visual Studio solution explorer. Select **Add** > **New Item**. Choose **Data** > **ADO.NET Data Model** from the **Add New Item** dialog.

**Step 2** Name the model `Northwind.edmx`. Click **Next**. This starts the **Entity Data Model Wizard**.

### Set the Entity Data Model

**Step 1** Select **Generate from database**. Click **Next**. Configure a connection to the Northwind database and click **Next**.

**Figure 1. A new entity model**

![New entity data model](/aspnet-mvc/helpers/treeview/images/tree-entity-data-model.png)

**Step 2** Select the **Employees** table and click **Finish**.

**Figure 2. Choose the Employees table**

![Choose the Employees table](/aspnet-mvc/helpers/treeview/images/tree-employees-table.png)

### Configure the New Action Method

**Step 1** Open `Controllers/HomeController.cs` and add a new action method which will return JSON. The TreeView makes an Ajax request to this action method any time the user expands a parent node. The action method returns only the child nodes of the expanded parent node. The TreeView provides the unique identifier of the parent node or `null` when it makes the initial request.

###### Example

        public JsonResult Employees_Read(int? employeeId)
        {
            using (var norhtwind = new NorthwindEntities())
            {
                // Get employees who report to employeeId (null for root nodes)
                var employees = norhtwind.Employees
                                         // Workaround for the EF null comparison bug: http://stackoverflow.com/a/2541042/10141
                                         .Where(employee => employeeId.HasValue ? employee.ReportsTo == employeeId : employee.ReportsTo == null);
                // Project the results to avoid JSON serialization errors
                var result = employees.Select(employee => new
                                      {
                                          EmployeeID = employee.EmployeeID,
                                          Name = employee.FirstName + " " + employee.LastName,
                                          HasChildren = employee.Employees1.Any()
                                      })
                                      .ToList();
                return Json(result, JsonRequestBehavior.AllowGet);
            }
        }

**Step 2** Open `Views/Index.cshtml`, or `Views/Index.aspx`, and add a TreeView.

###### Example

```tab-ASPX

        <%: Html.Kendo().TreeView()
            .Name("treeview")
            // The property that specifies the text of the node
            .DataTextField("Name")
            .DataSource(dataSource => dataSource
                .Model(model => model
                    // The property that uniquely identieis a node.
                    // The value of this property is the argument of the action method
                    .Id("EmployeeID")
                    // the boolean property that tells whether a node has children
                    .HasChildren("HasChildren")
                )
                .Read(read => read
                    // The action method which will return JSON
                    .Action("Employees_Read", "Home")
                )
            )
        %>
```
```tab-Razor

        @(Html.Kendo().TreeView()
            .Name("treeview")
            // The property that specifies the text of the node
            .DataTextField("Name")
            .DataSource(dataSource => dataSource
                .Model(model => model
                    // The property that uniquely identieis a node.
                    // The value of this property is the argument of the action method
                    .Id("EmployeeID")
                    // the boolean property that tells whether a node has children
                    .HasChildren("HasChildren")
                )
                .Read(read => read
                    // The action method which will return JSON
                    .Action("Employees_Read", "Home")
                )
            )
        )
```

**Step 3** Press `CTRL`+`F5` to build and run the application. Expand the **Andrew Fuller** node and the TreeView loads its children.

**Figure 3. The final result**

![Final result](/aspnet-mvc/helpers/treeview/images/tree-employees.png)

## See Also

Other articles on Telerik UI for ASP.NET MVC and on the TreeView:

* [Overview of the TreeView HtmlHelper]({% slug overview_treeviewhelper_aspnetmvc %})
* [How to Bind TreeViews to XML]({% slug howto_bindtoaml_treeviewaspnetmvc %})
* [How to Integrate with Sharepoint]({% slug howto_integratewithsharepoint_treeviewaspnetmvc %})
* [How to Save the State of TreeView Items]({% slug howto_savetreeviewitemsstate_treeviewaspnetmvc %})
* [Overview of the Kendo UI TreeView Widget]({% slug overview_kendoui_treeview_widget %})
* [Overview of Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %})
* [Fundamentals of Telerik UI for ASP.NET MVC]({% slug fundamentals_aspnetmvc %})
* [Scaffolding in Telerik UI for ASP.NET MVC]({% slug scaffolding_aspnetmvc %})
* [Telerik UI for ASP.NET MVC API Reference Folder](/api/aspnet-mvc/Kendo.Mvc/AggregateFunction)
* [Telerik UI for ASP.NET MVC HtmlHelpers Folder]({% slug overview_barcodehelper_aspnetmvc %})
* [Tutorials on Telerik UI for ASP.NET MVC]({% slug overview_timeefficiencyapp_aspnetmvc6 %})
* [Telerik UI for ASP.NET MVC Troubleshooting]({% slug troubleshooting_aspnetmvc %})
