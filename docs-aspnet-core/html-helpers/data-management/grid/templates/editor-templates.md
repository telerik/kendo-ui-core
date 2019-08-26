---
title: Editor Templates
page_title: Editor Templates | Telerik UI Grid HtmlHelper for ASP.NET Core
description: "Create the editing Telerik UI Grid ASP.NET Core with the ASP.NET Core editor templates."
slug: editortemplates_grid_aspnetcore
position: 6
---

# Editor Templates

You can create an editing UI of a Telerik UI Grid for ASP.NET Core by defining editor templates.

For runnable examples, refer to the [demos on templates in the Grid](https://demos.telerik.com/aspnet-core/grid/toolbar-template).

## Getting Started

The Telerik UI Grid for ASP.NET Core relies on ASP.NET Core editor templates to create an editing UI. If the Grid is configured for in-line or in-cell editing, it uses the `Html.EditorFor` method to get the editor HTML for every property which is editable.

The configuration later in this article will be used to get the editor HTML for the `OrderDate` and `ShipCountry` properties.

        @(Html.Kendo().Grid<Order>()
            .Name("Grid")
            .Columns(columns =>
            {
                columns.Bound(o => o.OrderDate);
                columns.Bound(o => o.ShipCountry);
            })
            .Editable(editable => editable.Mode(GridEditMode.InLine))

The following example demonstrates the code that will be used to get the editor HTML for the `OrderDate` and `ShipCountry` properties.

        @(Html.EditorFor(o => o.OrderDate);
        @(Html.EditorFor(o => o.ShipCountry);

If the Grid is configured for popup editing, it will use the `Html.EditorForModel` to get the editor HTML for the whole model.

## Creating Custom Editors for Bound Properties

Your project may require you to create a custom editor for a specific property. For example, to show a DropDownList which contains all available values that a property can take. This is done by creating an editor template for the property.

1. Consider the following models which represent the `Order` and `Employee` entities from the **Northwind** database.

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

1. Create an editor template for the `Employee` property which will display a Kendo UI for jQuery DropDownList with all available employees. Add a new partial view to the `~/Views/Shared/EditorTemplates` folder&mdash;for example, `EmployeeEditor.cshtml`.
1. Add the DropDownList to that partial view. Set the `Name` of the DropDownList to the name of the property which will be edited&mdash;`"Employee"` in this case.

        @(Html.Kendo().DropDownList()
            .Name("Employee") // The name of the widget has to be the same as the name of the property.
            .DataValueField("EmployeeID") // The value of the drop-down is taken from the EmployeeID property.
            .DataTextField("EmployeeName") // The text of the items is taken from the EmployeeName property.
            .BindTo((System.Collections.IEnumerable)ViewData["employees"]) // A list of all employees which is populated in the controller.
        )

1. In the action method, which renders the view that contains the Grid, populate the `ViewData` with a list of all employees.

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

        public class Order
        {
            public int OrderID { get; set; }

            public string ShipCountry { get; set; }

            [UIHint("EmployeeEditor")]
            public Employee Employee { get; set; }
        }

## See Also

* [Templates by the Grid HtmlHelper for ASP.NET Core (Demos)](https://demos.telerik.com/aspnet-core/grid/toolbar-template)
* [Server-Side API](/api/grid)
