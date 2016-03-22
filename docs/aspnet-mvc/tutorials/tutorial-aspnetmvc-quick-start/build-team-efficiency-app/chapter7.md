---
title: Kendo UI Datasource
page_title: Kendo UI Datasource | Team Efficiency Dashboard Tutorial
description: "Master working with the Kendo UI DataSource while building the Team Efficiency Dashboard application by using Telerik UI for ASP.NET MVC."
slug: kendouidatasource_timeefficiencyapp_aspnetmvc6
position: 8
---

# Kendo UI Datasource

In this chapter you'll learn how to work with Kendo UI datasources.

## Working with the Kendo UI Datasource

### Overview

The [Kendo UI DataSource component](http://demos.telerik.com/kendo-ui/datasource/index) plays a central role in practically all web applications built with Kendo UI. It is an abstraction for using local data arrays of JavaScript objects or remote data web services returning JSON, JSONP, [OData](http://www.odata.org/) or XML.

The Kendo UI DataSource has many abilities and responsibilities, among which to:

- [Retrieve data from a remote endpoint]({% slug corsdatafetching_anotherdomain_datasourcecomponent %}).
- Maintain the [structure and type of the data (schema)]({% slug cruddataoperations_kendoui_datasourcecomponent%}#schema).
- Process serialization formats to and from a remote endpoint.
- [Synchronize updates, create, update, delete]({% slug cruddataoperations_kendoui_datasourcecomponent%}) to and from a remote endpoint.
- [Maintain an in-memory cache of data, including changes]({% slug offlinesupport_kendoui_datasourcecomponent %}) for updating to a remote endpoint.
- Calculate and maintain [aggregates](/api/javascript/data/datasource#methods-aggregate), [sorting order](http://demos.telerik.com/kendo-ui/api/javascript/data/datasource#methods-sort) and [paging](/api/javascript/data/datasource#methods-page).
- Provide a query mechanism via [filter expressions](/api/javascript/data/datasource#methods-filter).

For detailed information on the capabilities of the [DataSource]({% slug overview_kendoui_datasourcecomponent %}), refer to its [configuration API methods, and events](http://demos.telerik.com/kendo-ui/api/javascript/data/datasource), and [demos](http://demos.telerik.com/kendo-ui/datasource/index).

At this point the dashboard is showing all invoice data. Let's use the `EmployeeList` list view and `StatsFrom`/`StatsTo` date pickers to filter the invoice grid by invoking the grid's datasource.

### Exercise: Create a Filter

**Step 1** In the `/Views/Home/Index.cshtml` view, find the scripts section.

###### Example

	<script>
		...
    </script>

**Step 2** Add a function named `getEmployeeFilter` that gets the `employeeId`, `salesPerson`, `statsFrom` and `statsTo` values and returns a JSON object.

The resulting code should be like the one shown in the example below.

###### Example

    function getEmployeeFilter() {
        var employee = getSelectedEmployee(),
            statsFrom = $("#StatsFrom").data("kendoDatePicker"),
            statsTo = $("#StatsTo").data("kendoDatePicker");

        var filter = {
            employeeId: employee.EmployeeId,
            salesPerson: employee.FullName,
            statsFrom: statsFrom.value(),
            statsTo: statsTo.value()
        }
        return filter;
    }

**Step 3** In the `/Views/Invoice/Index.cshtml` view, find the `EmployeeSales` grid.   

###### Example

	@(Html.Kendo().Grid<KendoQsBoilerplate.Invoice>()
	      .Name("EmployeeSales")
		  ...
	      .Scrollable(scrollable => scrollable.Enabled(false))
	      .DataSource(dataSource => dataSource
	          .Ajax()
	          .Read(read => read.Action("Invoices_Read", "Invoice"))
	      )
	)

**Step 4** On the grid's `DataSource` property, set the `Data` property to `getEmployeeFilter`. The `Data` property supplies additional data to the server. In this case the data is our filter parameters.

###### Example

    .DataSource(dataSource => dataSource
                .Ajax()
                .Read(read => read.Action("Invoices_Read", "Invoice")
                .Data("getEmployeeFilter"))
    )

**Step 5** Add the property `AutoBind` to the end of the property chain and set the value to `false`. Setting `AutoBind` to `false` tells the UI for MVC that the datasource's `Read` action is invoked manually on the client.

The resulting code should be like the one shown in the example below.

###### Example

	@(Html.Kendo().Grid<KendoQsBoilerplate.Invoice>()
	      .Name("EmployeeSales")
	      ...
	      .Scrollable(scrollable => scrollable.Enabled(false))
	      .DataSource(dataSource => dataSource
	          .Ajax()
	          .Read(read => read.Action("Invoices_Read", "Invoice")
	          .Data("getEmployeeFilter"))
	      )
		  .AutoBind(false)
	)

**Step 6** In the `/Views/Home/Index.cshtml` view, add a function named `refreshGrid`. This function will invoke the grid's `Read` action.

###### Example

	function refreshGrid() {
        var employeeSales = $("#EmployeeSales").data("kendoGrid");
        employeeSales.dataSource.read();
    }

**Step 7** Find the `onCriteriaChange` function and add a call to the `refreshGrid` function. This will cause the Grid's data to refresh whenever the employee selection changes.

###### Example

	function onCriteriaChange() {
        updateEmployeeAvatar();
        refreshGrid();
	}

Next, we'll need to update the grid's `Read` action to apply the filter using Entity Framework.

**Step 8** Open `Controllers/InvoiceController.cs` and find the `Invoices_Read` action.

###### Example

    public ActionResult Invoices_Read([DataSourceRequest]DataSourceRequest request)
    {
        IQueryable<Invoice> invoices = db.Invoices;
        DataSourceResult result = invoices.ToDataSourceResult(request, invoice => new {
            OrderID = invoice.OrderID,
            CustomerName = invoice.CustomerName,
            OrderDate = invoice.OrderDate,
            ProductName = invoice.ProductName,
            UnitPrice = invoice.UnitPrice,
            Quantity = invoice.Quantity,
            Salesperson = invoice.Salesperson
        });

        return Json(result);
    }

**Step 9** Add the `salesPerson`, `statsFrom` and `statsTo` parameters to the action.

###### Example

    public ActionResult Invoices_Read([DataSourceRequest]DataSourceRequest request,
        string salesPerson,
        DateTime statsFrom,
        DateTime statsTo)

**Step 10** Using the parameter values, filter the invoices using a `Where` LINQ query.

The resulting code should be like the one shown in the example below.

###### Example

    public ActionResult Invoices_Read([DataSourceRequest]DataSourceRequest request,
        string salesPerson,
        DateTime statsFrom,
        DateTime statsTo)
    {
        var invoices = db.Invoices.Where(inv => inv.Salesperson == salesPerson)
            .Where(inv => inv.OrderDate >= statsFrom && inv.OrderDate <= statsTo);
        DataSourceResult result = invoices.ToDataSourceResult(request, invoice => new {
            OrderID = invoice.OrderID,
            CustomerName = invoice.CustomerName,
            OrderDate = invoice.OrderDate,
            ProductName = invoice.ProductName,
            UnitPrice = invoice.UnitPrice,
            Quantity = invoice.Quantity,
            Salesperson = invoice.Salesperson
        });

        return Json(result);
    }

**Step 11** Run the project to see the behavior. Now the `EmployeeList` and `EmployeeSales` grid are in sync. When an employee is selected, only that employee's data will show in the grid.

![](../images/chapter7/datasource-filter.jpg)

At this point, the `EmployeeList` is acting as a filter for the `EmployeeSales`. However, the data shown does not reflect the `StatsFrom`/`StatsTo` date range. With the filtering code in place, additional controls are wired up with relative ease. Let's wire up the `StatsFrom`/`StatsTo` DatePickers to `EmployeeSales`.

### Exercise: Trigger the Grid DataSource from a DatePicker Event

**Step 1** In the `/Views/Home/Index.cshtml` view, find the StatsFrom DatePicker.

###### Example

    @(Html.Kendo().DatePicker()
                    .Name("StatsFrom")
                    .Value(new DateTime(1996, 1, 1))
	)

**Step 2** Add the `Events` property and set the `Change` event to `onCriteriaChange`.

###### Example

    @(Html.Kendo().DatePicker()
                    .Name("StatsFrom")
                    .Value(new DateTime(1996, 1, 1))
                    .Events(e => e.Change("onCriteriaChange"))
	)

**Step 3** Find the `StatsTo` DatePicker, set the `Events` property, and set the `Change` event to `onCriteriaChange`.

###### Example

    @(Html.Kendo().DatePicker()
			        .Name("StatsTo")
			        .Value(new DateTime(1998, 8, 1))
			        .Events(e => e.Change("onCriteriaChange"))
	)

**Step 4** Save the changes and refresh the browser. `StatsFrom`/`StatsTo` and `EmployeeList` will update `EmployeeSales` with data based on the selected dates and employee.

![](../images/chapter7/datasource-filter2.jpg)

Your Team Efficiency Dashboard is now interactive. Users can filter data using dates and employees. Next, you'll enhance the application by adding some data visualizations.

## See Also

Other UI for ASP.NET MVC Quick Start Guide chapters on how to build the Team Efficiency Dashboard application:

* [Getting Up and Running]({% slug gettingupandrunning_timeefficiencyapp_aspnetmvc6 %})
* [Input Controls]({% slug inputcontrols_timeefficiencyapp_aspnetmvc6 %})
* [Scaffolding]({% slug scaffolding_timeefficiencyapp_aspnetmvc6 %})
* [Add and Configure the Kendo UI Grid]({% slug kendouigrid_timeefficiencyapp_aspnetmvc6 %})
* [Add and Configure the Kendo UI ListView]({% slug kendouilistview_timeefficiencyapp_aspnetmvc6 %})
* [Manage the Client Side]({% slug clientside_timeefficiencyapp_aspnetmvc6 %})
* [Add and Configure the Kendo UI Charts]({% slug kendouicharts_timeefficiencyapp_aspnetmvc6 %})
* [Make the Application Responsive]({% slug goresponsive_timeefficiencyapp_aspnetmvc6 %})
* [Add and Configure the Kendo UI Themes]({% slug kendouithemes_timeefficiencyapp_aspnetmvc6 %})
