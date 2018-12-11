---
title: Editor Templates
page_title: Editor Templates | Kendo UI Grid HtmlHelper for ASP.NET Core
description: "Create the editing UI of a Kendo Grid ASP.NET Core with the ASP.NET Core editor templates."
slug: editortemplates_grid_aspnetcore
position: 2
---

# Editor Templates

This article demonstrates how to create the editing UI of a Kendo UI Grid for ASP.NET Core editor templates.

## Configuration

The Kendo UI Grid for ASP.NET Core relies on ASP.NET Core editor templates to create the editing UI. If the Grid is configured for in-line or in-cell editing, the `Html.EditorFor` method is used to get the editor HTML for every property which is editable.

### Overview

For the configuration demonstrated in the example below, the configuration shown later on will be used to get the editor HTML for the `OrderDate` and `ShipCountry` properties.

###### Example

    Html.Kendo().Grid<Order>()
        .Name("Grid")
        .Columns(columns =>
        {
            columns.Bound(o => o.OrderDate);
            columns.Bound(o => o.ShipCountry);
        })
        .Editable(editable => editable.Mode(GridEditMode.InLine))

The following example demonstrates the code that will be used to get the editor HTML for the `OrderDate` and `ShipCountry` properties.

###### Example

    Html.EditorFor(o => o.OrderDate);
    Html.EditorFor(o => o.ShipCountry);

If the Grid is configured for pop-up editing, the `Html.EditorForModel` is used to get the editor HTML for the whole model.

### Create Custom Editors for Bound Properties

Often there is need to create a custom editor for a specific property. For example, to show a DropDownList which contains all available values a property can take. This is done by creating an editor template for the property.

1. Consider the following models which represent the **Order** and **Employee** entities from the **Northwind** database.

    ###### Example

        public class Order
        {
            public int OrderID { get; set; }

            public string ShipCountry { get; set; }

            public Employee Employee { get; set; }
        }

        public class Employee
        {
            public int EmployeeID { get; set; }

            public string EmployeeName { get; set; }
        }

1. Create an editor template for the `Employee` property which will display a Kendo UI DropDownList with all available employees. Add a new partial view
to the `~/Views/Shared/EditorTemplates` folder&mdash;for example, `EmployeeEditor.cshtml`.
1. Add a Kendo UI DropDownList to that partial view. Set the `Name` of the DropDownList to the name of the property which will be edited&mdash;`"Employee"` in this case.

    ###### Example

        @(Html.Kendo().DropDownList()
            .Name("Employee") // The name of the widget should be the same as the name of the property.
            .DataValueField("EmployeeID") // The value of the dropdown is taken from the EmployeeID property.
            .DataTextField("EmployeeName") // The text of the items is taken from the EmployeeName property.
            .BindTo((System.Collections.IEnumerable)ViewData["employees"]) // A list of all employees which is populated in the controller.
        )

1. In the action method, which renders the view that contains the Grid, populate the `ViewData` with a list of all employees.

    ###### Example

        public ActionResult Index()
        {
            ViewData["employees"] = new NorthwindDataContext()
                            .Employees
                            .Select(e => new Employee
                            {
                                EmployeeID = e.EmployeeID,
                                EmployeeName = e.FirstName + " " + e.LastName
                            })
                            .OrderBy(e => e.EmployeeName);

            return View();
        }

1. Decorate the `Employee` property with the [`UIHint`](https://msdn.microsoft.com/en-us/library/cc679268) attribute. It needs the name of the editor template created in **Step 3** without the extension `"EmployeeEditor"`.

    ###### Example

        public class Order
        {
            public int OrderID { get; set; }

            public string ShipCountry { get; set; }

            [UIHint("EmployeeEditor")]
            public Employee Employee { get; set; }
        }

## See Also

* [JavaScript API Reference of the Grid](http://docs.telerik.com/kendo-ui/api/javascript/ui/grid)
* [Grid HtmlHelper for ASP.NET MVC](http://docs.telerik.com/aspnet-mvc/helpers/grid/overview)
* [Grid Official Demos](http://demos.telerik.com/aspnet-core/grid/index)
* [Overview of Telerik UI for ASP.NET Core]({% slug overview_aspnetmvc6_aspnetmvc %})
