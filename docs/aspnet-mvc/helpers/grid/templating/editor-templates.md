---
title: Editor Templates
page_title: Editor Templates | Kendo UI Grid HtmlHelper
description: "Create the editing UI of a Kendo Grid ASP.NET MVC with the ASP.NET MVC editor templates."
previous_url: /aspnet-mvc/helpers/grid/editor-templates
slug: editortemplates_grid_aspnetmvc
position: 2
---

# Editor Templates

This article demonstrates how to create the editing UI of a Kendo UI Grid for ASP.NET MVC editor templates.

## Configuration

The Kendo UI Grid for ASP.NET MVC relies on ASP.NET MVC editor templates to create the editing UI. If the Grid is configured for in-line or in-cell editing, the [`Html.EditorFor`](https://msdn.microsoft.com/en-us/library/system.web.mvc.html.editorextensions.editorfor.aspx) method is used to get the editor HTML for every property which is editable.

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

The example below demonstrates the code that will be used to get the editor HTML for the `OrderDate` and `ShipCountry` properties.

###### Example

      Html.EditorFor(o => o.OrderDate);
      Html.EditorFor(o => o.ShipCountry);

If the Grid is configured for pop-up editing, the [`Html.EditorForModel`](https://msdn.microsoft.com/en-us/library/system.web.mvc.html.editorextensions.editorformodel.aspx) is used to get the editor HTML for the whole model.

Fro more information on ASP.NET MVC editor templates, refer to [this blog post series on ASP.NET MVC 2 templates](http://bradwilson.typepad.com/blog/2009/10/aspnet-mvc-2-templates-part-1-introduction.html).

### Create Custom Editors for Bound Properties

Often there is need to create a custom editor for a specific property. For example, to show a DropDownList which contains all available values a property can take. This is done by creating an editor template for the property.

**Step 1** Consider the following models which represent the **Order** and **Employee** entities from the **Northwind** database.

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

**Step 2** Create an editor template for the `Employee` property which will display a Kendo UI DropDownList with all available employees. Add a new partial view
to the `~/Views/Shared/EditorTemplates` folder&mdash;for example, `EmployeeEditor.ascx` or `EmployeeEditor.cshtml` (if using the Razor view engine).

**Step 3** Add a Kendo UI DropDownList to that partial view. Set the `Name` of the DropDownList to the name of the property which will be edited&mdash;`"Employee"` in this case.

###### Example

```tab-ASPX

        <%: Html.Kendo().DropDownList()
            .Name("Employee") // The name of the widget should be the same as the name of the property.
            .DataValueField("EmployeeID") // The value of the dropdown is taken from the EmployeeID property.
            .DataTextField("EmployeeName") // The text of the items is taken from the EmployeeName property.
            .BindTo((System.Collections.IEnumerable)ViewData["employees"]) // A list of all employees which is populated in the controller.
        %>
```
```tab-Razor

        @(Html.Kendo().DropDownList()
            .Name("Employee") // The name of the widget should be the same as the name of the property.
            .DataValueField("EmployeeID") // The value of the dropdown is taken from the EmployeeID property.
            .DataTextField("EmployeeName") // The text of the items is taken from the EmployeeName property.
            .BindTo((System.Collections.IEnumerable)ViewData["employees"]) // A list of all employees which is populated in the controller.
        )
```

**Step 4** In the action method, which renders the view that contains the Grid, populate the `ViewData` with a list of all employees.

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

**Step 5** Decorate the `Employee` property with the [`UIHint`](https://msdn.microsoft.com/en-us/library/cc679268) attribute. It needs the name of the editor template created in **Step 3** without the extension `"EmployeeEditor"`.

###### Example

        public class Order
        {
            public int OrderID { get; set; }

            public string ShipCountry { get; set; }

            [UIHint("EmployeeEditor")]
            public Employee Employee { get; set; }
        }

## See Also

Other articles on the Kendo UI Grid for ASP.NET MVC:

* [Overview of the Grid HtmlHelper]({% slug overview_gridhelper_aspnetmvc %})
* [Configuration of the Grid HtmlHelper]({% slug configuration_gridhelper_aspnetmvc %})
* [Scaffolding]({% slug scaffoldinggrid_aspnetmvc %})
* [Excel Export]({% slug excelexport_gridhelper_aspnetmvc %})
* [Frequently Asked Questions]({% slug freqaskedquestions_gridhelper_aspnetmvc %})
* [Binding of the Grid HtmlHelper]({% slug ajaxbinding_grid_aspnetmvc %})
* [Editing of the Grid HtmlHelper]({% slug ajaxediting_grid_aspnetmvc %})
* [Troubleshooting of the Grid HtmlHelper]({% slug troubleshoot_gridhelper_aspnetmvc %})
* [API Reference of the Grid HtmlHelper](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/GridBuilder)
* [Overview of the Kendo UI Grid Widget]({% slug overview_kendoui_grid_widget %})

Articles on Telerik UI for ASP.NET MVC:

* [Overview of Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %})
* [Fundamentals of Telerik UI for ASP.NET MVC]({% slug fundamentals_aspnetmvc %})
* [Scaffolding in Telerik UI for ASP.NET MVC]({% slug scaffolding_aspnetmvc %})
* [Telerik UI for ASP.NET MVC API Reference Folder](/api/aspnet-mvc/Kendo.Mvc/AggregateFunction)
* [Telerik UI for ASP.NET MVC HtmlHelpers Folder]({% slug overview_barcodehelper_aspnetmvc %})
* [Tutorials on Telerik UI for ASP.NET MVC]({% slug overview_timeefficiencyapp_aspnetmvc6 %})
* [Telerik UI for ASP.NET MVC Troubleshooting]({% slug troubleshooting_aspnetmvc %})
