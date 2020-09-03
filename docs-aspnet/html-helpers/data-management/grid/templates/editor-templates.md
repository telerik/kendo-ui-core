---
title: Editor Templates
page_title: Editor Templates
description: "Create the editing Telerik UI Grid {{ site.framework }} with the {{ site.framework }} editor templates."
previous_url: /helpers/data-management/grid/templating/editor-templates
slug: editortemplates_grid_aspnetcore
position: 6
---

# Editor Templates

You can create an editing UI of a Telerik UI Grid for {{ site.framework }} by defining editor templates.

For runnable examples, refer to the [demos on templates in the Grid](https://demos.telerik.com/{{ site.platform }}/grid/toolbar-template).

## Getting Started

The Telerik UI Grid for {{ site.framework }} relies on {{ site.framework }} editor templates to create an editing UI. If the Grid is configured for in-line or in-cell editing, it uses the [`Html.EditorForModel`]({% if site.mvc %}https://msdn.microsoft.com/en-us/library/system.web.mvc.html.editorextensions.editorfor.aspx{% else %}https://docs.microsoft.com/en-us/dotnet/api/microsoft.aspnetcore.mvc.viewfeatures.htmlhelper-1.editorfor?view=aspnetcore-3.1{% endif %}) method to get the editor HTML for every property which is editable.

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

If the Grid is configured for popup editing, it will use the [`Html.EditorForModel`]({% if site.mvc %}https://msdn.microsoft.com/en-us/library/system.web.mvc.html.editorextensions.editorfor.aspx{% else %}https://docs.microsoft.com/en-us/dotnet/api/microsoft.aspnetcore.mvc.viewfeatures.htmlhelper-1.editorfor?view=aspnetcore-3.1{% endif %}) to get the editor HTML for the whole model.

{% if site.mvc %}For more information on ASP.NET MVC editor templates, refer to [this blog post series on {{ site.framework }} 2 templates](http://bradwilson.typepad.com/blog/2009/10/aspnet-mvc-2-templates-part-1-introduction.html). For a runnable example on using custom popup templates, refer to [this demo](https://github.com/telerik/ui-for-aspnet-mvc-examples/tree/master/grid/custom-popup-editor).{% endif %}

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

1. Create an editor template for the `Employee` property. The template will display a Kendo UI for jQuery DropDownList with all available employees. Add a new partial view to the `~/Views/Shared/EditorTemplates` folder&mdash;for example, `EmployeeEditor.cshtml`. In case the Editor Templates folder does not exist, you must add it manually.
1. Add the DropDownList to that partial view. Set the `Name` of the DropDownList to the name of the property which will be edited&mdash;`"Employee"` in this case.

        @(Html.Kendo().DropDownList()
            .Name("Employee") // The name of the widget has to be the same as the name of the property.
            .DataValueField("EmployeeID") // The value of the drop-down is taken from the EmployeeID property.
            .DataTextField("EmployeeName") // The text of the items is taken from the EmployeeName property.
            .BindTo((System.Collections.IEnumerable)ViewData["employees"]) // A list of all employees which is populated in the controller.
        )

1. In the main view, bind a column of the Grid to the `Employee` property.

        .Editable(editable => editable.Mode(GridEditMode.InCell))
        .Columns(columns =>
        {
            columns.Bound(p => p.Employee).ClientTemplate("#=Employee.EmployeeName#").Sortable(false).Width(180);
        })

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

* [Templates by the Grid HtmlHelper for {{ site.framework }} (Demos)](https://demos.telerik.com/{{ site.platform }}/grid/toolbar-template)
* [Server-Side API](/api/grid)
