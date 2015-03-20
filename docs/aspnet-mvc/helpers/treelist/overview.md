---
title: Overview
page_title: How to use the Kendo UI TreeList HtmlHelper extension, server-side ASP.NET MVC wrapper for Kendo UI TreeList widget
description: Learn how to bind Kendo UI TreeList for ASP.NET MVC, handle Kendo UI TreeList Events, access an existing treelist with TreeList HtmlHelper extension documentation.
position: 1
---

# TreeList

The TreeList HtmlHelper extension is a server-side wrapper for the [Kendo UI TreeList](/api/web/treelist) widget. It allows you to configure the Kendo UI treelist
from server-side code, helps with data binding and editing.

## Getting started

The following tutorial shows how to configure Kendo UI TreeList for ASP.NET MVC to do server binding to the Northwind database (the Products table).

1.  Create a new ASP.NET MVC 4 application (or Telerik UI for ASP.NET MVC application if you have installed the [Telerik UI for ASP.NET MVC Visual Studio Extensions](/aspnet-mvc/introduction#kendo-ui-for-asp.net-mvc-visual-studio-extensions)). Name the application "KendoGridServerBinding".
If you decided not to use the Telerik UI for ASP.NET MVC Visual Studio Extensions followe the steps from the [introduction](/aspnet-mvc/introduction) help topic in order
to add Telerik UI for ASP.NET MVC to the application.
1.  Add a new "Entity Framework Data Model". Right click the `~/Models` folder in the solution explorer and pick "Add new item". Choose "Data->ADO.NET Entity Data Model" in the "Add New Item" dialog.
Name the model "Northwind.edmx" and click "Next". This will start the "Entity Data Model Wizard".
![New entity data model](/aspnet-mvc/helpers/treelist/images/treelist-new-entity-data-model.png)
1.  Pick the "Generate from database" option and click "Next". Configure a connection to the Northwind database. Click "Next".
![Choose the connection](/aspnet-mvc/helpers/treelist/images/treelist-entity-data-model.png)
1.  Choose the "Employees" table from the "Which database objects do you want to include in your model?". Leave all other options as they are set by default. Click "Finish".
![Choose the Employees table](/aspnet-mvc/helpers/treelist/images/treelist-database-objects.png)
1.  Right click the `~/Models` folder in the solution explorer and add new class `EmployeeViewModel`.

        public class EmployeeViewModel
        {
            public int? EmployeeID { get; set; }

            public string FirstName { get; set; }

            public string LastName { get; set; }

            public int? ReportsTo { get; set; }

            public string Address { get; set; }

            public bool hasChildren { get; set; }
        }
1.  Open "HomeController.cs" and create mew action method `TreeList_Read`:

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
1.  Add a Kendo UI TreeList to the Index view
    - Index.aspx (ASPX)

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
    - Index.cshtml (Razor)

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
1. Build and run the application
![Final result](/aspnet-mvc/helpers/treelist/images/treelist-bound.png)

## Getting reference to the Kendo UI TreeList widget

To get a reference to a treelist instance use the [jQuery.data()](http://api.jquery.com/jQuery.data/) method and the value specified via the `Name()` method.
Then you can use you can use the JavaScript [API](/api/web/treelist#methods) of the treelist.

### Example - get reference to a Kendo UI TreeList instance

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
        // Notice that the Name() of the treelist is used to get its client-side instance
        var treelist = $("#treelist").data("kendoTreeList");
    });
    </script>


## Handling Kendo UI TreeList events

You can subscribe to all [events](/api/web/treelist#events) exposed by the widget:

### Example - subscribe to event by handler name (ASPX)

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
        //Handle the dataBound event
    }

    function treelist_change() {
        //Handle the change event
    }
    </script>


### Example - subscribe to event by handler name (Razor)

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
        //Handle the dataBound event
    }

    function treelist_change() {
        //Handle the change event
    }
    </script>


### Example - subscribe to event via Razor delegate

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
                      //Handle the dataBound event inline
                  }
              </text>)
              .Change(@<text>
                  function() {
                      //Handle the change event inline
                  }
              </text>)
          )
        .Height(540)
    )
