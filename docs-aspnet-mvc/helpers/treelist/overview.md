---
title: Overview
page_title: Overview | Kendo UI TreeList HtmlHelper
description: "Get started with the server-side wrapper for the Kendo UI TreeList widget for ASP.NET MVC."
slug: overview_treelisthelper_aspnetmvc
position: 1
---

# TreeList HtmlHelper Overview

The TreeList HtmlHelper extension is a server-side wrapper for the [Kendo UI TreeList](https://demos.telerik.com/kendo-ui/treelist/index) widget. It allows you to configure the Kendo UI TreeList from server-side code and helps you bind it to data and edit it.

## Getting Started

### Configuration

Below are listed the steps for you to follow when configuring the Kendo UI TreeList to do server binding to the Northwind database, the **Employees** table.

**Step 1** Create a new ASP.NET MVC 4 application. If you have installed the [Telerik UI for ASP.NET MVC Visual Studio Extensions]({% slug overview_aspnetmvc %}#requirements), create a Telerik UI for ASP.NET MVC application. Name the application `KendoGridServerBinding`. If you decided not to use the Telerik UI for ASP.NET MVC Visual Studio Extensions, follow the steps from the [introductory article]({% slug overview_aspnetmvc %}) to add Telerik UI for ASP.NET MVC to the application.

**Step 2** Add a new `Entity Framework Data Model`. Right-click the `~/Models` folder in the solution explorer and pick **Add new item**. Choose **Data** > **ADO.NET Entity Data Model** in the **Add New Item** dialog. Name the model `Northwind.edmx` and click **Next**. This starts the **Entity Data Model Wizard**.

**Figure 1. A new entity model**

![New entity data model](/aspnet-mvc/helpers/treelist/images/treelist-new-entity-data-model.png)

**Step 3**  Pick the **Generate from database** option and click **Next**. Configure a connection to the Northwind database. Click **Next**.

**Figure 2. Choose the connection**

![Choose the connection](/aspnet-mvc/helpers/treelist/images/treelist-entity-data-model.png)

**Step 4** Choose the **Employees** table from the `Which database objects do you want to include in your model?`. Leave all other options as they are set by default. Click **Finish**.

**Figure 3. Choose the Employees table**

![Choose the Employees table](/aspnet-mvc/helpers/treelist/images/treelist-database-objects.png)

**Step 5** Right-click the `~/Models` folder in the solution explorer and add a new `EmployeeViewModel` class.

###### Example

          public class EmployeeViewModel
          {
              public int? EmployeeID { get; set; }

              public string FirstName { get; set; }

              public string LastName { get; set; }

              public int? ReportsTo { get; set; }

              public string Address { get; set; }

              public bool hasChildren { get; set; }
          }

**Step 6** Open `HomeController.cs` and create new `TreeList_Read` action method.

###### Example

        public JsonResult TreeList_Read([DataSourceRequest] DataSourceRequest request)
        {
            var northwind = new NortwindEntities();

            var result = northwind.Employees.ToTreeDataSourceResult(request,
                employee => employee.EmployeeID,
                employee => employee.ReportsTo,
                employee => new EmployeeViewModel
                {
                    EmployeeID = employee.EmployeeID,
                    ReportsTo = employee.ReportsTo,
                    FirstName = employee.FirstName,
                    LastName = employee.LastName,
                    Address = employee.Address,
                    hasChildren = employee.Employees1.Any()
                }
            );

            return Json(result, JsonRequestBehavior.AllowGet);
        }

**Step 7** Add a Kendo UI TreeList to the `Index` view.

###### Example

```tab-ASPX

        <%:Html.Kendo().TreeList<KendoTreeListBinding.Models.EmployeeViewModel>()
            .Name("treelist")
            .Columns(columns =>
                {
                columns.Add().Field(e => e.FirstName).Width(220);
                columns.Add().Field(e => e.LastName).Width(160);
                columns.Add().Field(e => e.Address);
                })
            .Sortable()
            .DataSource(dataSource => dataSource
                .Read(read => read.Action("TreeList_Read", "Home"))
                .Model(m => {
                    m.Id(f => f.EmployeeID);
                    m.ParentId(f => f.ReportsTo);
                    })
                )
            .Height(540)
        %>
```
```tab-Razor

        @(Html.Kendo().TreeList<KendoTreeListBinding.Models.EmployeeViewModel>()
            .Name("treelist")
            .Columns(columns =>
                {
                columns.Add().Field(e => e.FirstName).Width(220);
                columns.Add().Field(e => e.LastName).Width(160);
                columns.Add().Field(e => e.Address);
                })
            .Sortable()
            .DataSource(dataSource => dataSource
                .Read(read => read.Action("TreeList_Read", "Home"))
                .Model(m => {
                    m.Id(f => f.EmployeeID);
                    m.ParentId(f => f.ReportsTo);
                    })
                )
            .Height(540)
        )
```

**Step 8** Build and run the application.

**Figure 4. The final result**

![Final result](/aspnet-mvc/helpers/treelist/images/treelist-bound.png)

## Event Handling

You can subscribe to all TreeList [events](/api/javascript/ui/treelist#events).

### By Handler Name

The examples below demonstrates how to subscribe to events by a handler name.

###### Example

```tab-ASPX

        <%:Html.Kendo().TreeList<KendoTreeListBinding.Models.EmployeeViewModel>()
            .Name("treelist")
            .Columns(columns =>
                {
                columns.Add().Field(e => e.FirstName).Width(220);
                columns.Add().Field(e => e.LastName).Width(160);
                columns.Add().Field(e => e.Address);
                })
            .Sortable()
            .DataSource(dataSource => dataSource
                .Read(read => read.Action("TreeList_Read", "Home"))
                .Model(m => {
                    m.Id(f => f.EmployeeID);
                    m.ParentId(f => f.ReportsTo);
                    })
                )
            .Height(540)
            .Events(e => e
                .DataBound("treelist_dataBound")
                .Change("treelist_change")
            )
        %>
        <script>
        function treelist_dataBound() {
            //Handle the dataBound event.
        }

        function treelist_change() {
            //Handle the change event.
        }
        </script>
```
```tab-Razor

        @(Html.Kendo().TreeList<KendoTreeListBinding.Models.EmployeeViewModel>()
            .Name("treelist")
            .Columns(columns =>
                {
                columns.Add().Field(e => e.FirstName).Width(220);
                columns.Add().Field(e => e.LastName).Width(160);
                columns.Add().Field(e => e.Address);
                })
            .Sortable()
            .DataSource(dataSource => dataSource
                .Read(read => read.Action("TreeList_Read", "Home"))
                .Model(m => {
                    m.Id(f => f.EmployeeID);
                    m.ParentId(f => f.ReportsTo);
                    })
                )
            .Height(540)
            .Events(e => e
                .DataBound("treelist_dataBound")
                .Change("treelist_change")
            )
        )
        <script>
        function treelist_dataBound() {
            //Handle the dataBound event.
        }

        function treelist_change() {
            //Handle the change event.
        }
        </script>
```

### By Template Delegate

The example below demonstrates how to subscribe to events by a template delegate.

###### Example

```tab-Razor

        @(Html.Kendo().TreeList<KendoTreeListBinding.Models.EmployeeViewModel>()
            .Name("treelist")
            .Columns(columns =>
                {
                columns.Add().Field(e => e.FirstName).Width(220);
                columns.Add().Field(e => e.LastName).Width(160);
                columns.Add().Field(e => e.Address);
                })
            .Sortable()
            .DataSource(dataSource => dataSource
                .Read(read => read.Action("TreeList_Read", "Home"))
                .Model(m => {
                    m.Id(f => f.EmployeeID);
                    m.ParentId(f => f.ReportsTo);
                    })
                )
              .Events(e => e
                  .DataBound(@<text>
                      function() {
                          //Handle the dataBound event inline.
                      }
                  </text>)
                  .Change(@<text>
                      function() {
                          //Handle the change event inline.
                      }
                    </text>)
                )
              .Height(540)
          )
```

## Reference

### Existing Instances

You can reference an existing Kendo UI TreeList instance via [`jQuery.data()`](http://api.jquery.com/jQuery.data/). Once a reference is established, use the [TreeList API](/api/javascript/ui/treelist#methods) to control its behavior.

###### Example

      @(Html.Kendo().TreeList<KendoTreeListBinding.Models.EmployeeViewModel>()
          .Name("treelist")
          .Columns(columns =>
              {
              columns.Add().Field(e => e.FirstName).Width(220);
              columns.Add().Field(e => e.LastName).Width(160);
              columns.Add().Field(e => e.Address);
              })
          .Sortable()
          .DataSource(dataSource => dataSource
              .Read(read => read.Action("TreeList_Read", "Home"))
              .Model(m => {
                  m.Id(f => f.EmployeeID);
                  m.ParentId(f => f.ReportsTo);
                  })
              )
          .Height(540)
      )
      <script>
      $(function() {
          //Notice that the Name() of the TreeList is used to get its client-side instance.
          var treelist = $("#treelist").data("kendoTreeList");
      });
      </script>

## See Also

Other articles on Telerik UI for ASP.NET MVC and on the TreeList:

* [ASP.NET MVC API Reference: TreeListBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/TreeListBuilder)
* [How to Export Multiple TreeLists to Excel]({% slug howto_exportmultipletoexcel_treelistaspnetmvc %})
* [Overview of the Kendo UI TreeList Widget]({% slug overview_kendoui_treelist_widget %})
* [Overview of Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %})
* [Fundamentals of Telerik UI for ASP.NET MVC]({% slug fundamentals_aspnetmvc %})
* [Scaffolding in Telerik UI for ASP.NET MVC]({% slug scaffolding_aspnetmvc %})
* [Telerik UI for ASP.NET MVC API Reference Folder](/api/aspnet-mvc/Kendo.Mvc/AggregateFunction)
* [Telerik UI for ASP.NET MVC HtmlHelpers Folder]({% slug overview_barcodehelper_aspnetmvc %})
* [Tutorials on Telerik UI for ASP.NET MVC]({% slug overview_timeefficiencyapp_aspnetmvc6 %})
* [Telerik UI for ASP.NET MVC Troubleshooting]({% slug troubleshooting_aspnetmvc %})
