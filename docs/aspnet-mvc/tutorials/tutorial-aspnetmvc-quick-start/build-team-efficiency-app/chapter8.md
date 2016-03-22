---
title: Kendo UI Charts
page_title: Kendo UI Charts | Team Efficiency Dashboard Tutorial
description: "Add the Kendo UI Chart control to the Team Efficiency Dashboard application by using Telerik UI for ASP.NET MVC."
slug: kendouicharts_timeefficiencyapp_aspnetmvc6
position: 9
---

# Kendo UI Charts

In this chapter you'll learn how to add Kendo UI Chart widgets to your application. The Telerik ASP.NET MVC Chart, powered by Kendo UI, is a powerful data visualization component, which allows you to graphically represent your data. It is useful when you want to utilize modern browser technologies such as SVG or Canvas (with a fallback to VML for older IE versions) for interactive data visualizations.

The component offers a variety of chart types such as area, bar, line, scatter, polar, radar, pie and donut, stock (OHLC) and many more.

## Chart API

The Chart HtmlHelper extension is a server-side wrapper for the Kendo UI Chart widget.

###### Example

    @(Html.Kendo().Chart(Model) // The chart will be bound to the Model which is the InternetUsers list
        .Name("internetUsersChart") // The name of the chart is mandatory. It specifies the "id" attribute of the widget.
        .Title("Internet Users")
        .Series(series => {
            series.Bar(model => model.Value) // Create a bar chart series bound to the "Value" property
                    .Name("United States");
        })
        .CategoryAxis(axis => axis
            .Categories(model => model.Year)
        )
    )

## Bullet Series Chart

### Overview

Begin by adding a Bullet chart, a variation of a bar chart. Bullet charts make great dashboard gauges or meters. The bullet graph compares a given quantitative measure against qualitative ranges and a symbol marker.

### Exercise: Add a Bullet Series Chart

**Step 1** Since changes to the controller are necessary, stop the application if it is running.

**Step 2** Use partials to keep the markup tidy. Under `Views/Home/`, add a new empty partial view `_QuarterToDateSales.cshtml`.

**Step 3** In the new partial `_QuarterToDateSales.cshtml` view, add a new Kendo UI Chart helper of type `QuarterToDateSalesViewModel`. The `QuarterToDateSalesViewModel` is part of the quick start boilerplate.

###### Example

	@(Html.Kendo().Chart<KendoQsBoilerplate.QuarterToDateSalesViewModel>()

    )

**Step 4** Set the `Name` property to `EmployeeAverageSales`.

###### Example

    .Name("EmployeeQuarterSales")

**Step 5** Using the `.HtmlAttributes` property, set the controls height to `30px`.

###### Example

    .HtmlAttributes(new { style = "height:30px;" })

**Step 6** Next, add and define a `Bullet` chart with the following properties:

- Set the current value to the `Current` property on the model.
- Set the target value to the `Target` property on the model.

###### Example

    .Series(series =>
    {
        series.Bullet(model => model.Current, model => m.Target);
    })

**Step 7** Next, add and configure the `CategoryAxis`. Since the chart will be a spark line visualization, set the `Visible` and `MajorGridLines` properties to `false`.

###### Example


     .CategoryAxis(ca => ca.Labels(lab => lab.Visible(false))
         .MajorGridLines(m => m.Visible(false)).Visible(false)
     )

**Step 8** Next, add and configure the `ValueAxis` with a Numeric configuration. Since the chart will be a spark line visualization, set the `Labels`, `MajorGridLines`, and `MajorTicks` `Visible` properties to `false` to disable them.

###### Example

     .ValueAxis(va => va.Numeric()
         .Labels(lab => lab.Visible(false))
         .MajorGridLines(m => m.Visible(false))
         .MajorTicks(mT => mT.Visible(false))
     )

**Step 9** Also set the `Legend` to `false`.

###### Example

    .Legend(leg => leg.Visible(false))

**Step 10** Configure the `DataSource` by setting `Read` to the action `EmployeeQuarterSales` on the `Home` controller.

**Step 11** Using the `Data` property, set the value to `getEmployeeFilter` sending filter data back to the `Read` action.

**Step 12** Since the DataSource will be invoked manually, set `AutoBind` to `false`.

###### Example

    .AutoBind(false)

The resulting code should be like the one shown in the example below.

###### Example

    @(Html.Kendo().Chart<KendoQsBoilerplate.QuarterToDateSalesViewModel>()
        .Name("EmployeeQuarterSales")
        .HtmlAttributes(new { style = "height:30px;" })
        .Series(series =>
        {
            series.Bullet(m => m.Current, m => m.Target);
        })
        .CategoryAxis(ca => ca.Labels(lab => lab.Visible(false))
            .MajorGridLines(m => m.Visible(false)).Visible(false)
        )
        .ValueAxis(va => va.Numeric()
            .Labels(lab => lab.Visible(false))
            .MajorGridLines(m => m.Visible(false))
        )
        .Legend(leg => leg.Visible(false))
        .DataSource(ds => ds
            .Read(read => read.Action("EmployeeQuarterSales", "Home")
            .Data("getEmployeeFilter"))
        )
        .AutoBind(false)
    )

**Step 13** Open `controllers/HomeController.cs` and create a controller action named `EmployeeAverageSales` on the `Home` controller. This action will supply the Chart with data.

**Step 14** The boilerplate installed in the **Getting Up and Running** chapter has a function named `EmployeeQuarterSales`. This query will select the data required for the chart. Return the results of `EmployeeQuarterSalesQuery` as JSON.

###### Example

	public ActionResult EmployeeQuarterSales(int employeeId, DateTime statsTo)
    {
        DateTime startDate = statsTo.AddMonths(-3);

        var result = EmployeeQuarterSalesQuery(employeeId, statsTo, startDate);

        return Json(result, JsonRequestBehavior.AllowGet);
    }

**Step 15** Add the partial view to the main application page.

**Step 16** In `Views/Home/Index.cshtm`, find the `<!-- QTD Sales Chart -->` placeholder.

###### Example

	<!-- QTD Sales Chart -->
	@Html.Placehold(430, 120, "Chart")

**Step 17** Replace the placeholder with the `_QuarterToDateSales` partial.

###### Example

	<!-- QTD Sales Chart -->
    @Html.Partial("_QuarterToDateSales")

<!--_-->
**Step 18** Find the scripts section. Add a new function named `refreshEmployeeQuarterSales`, this function will invoke `read` on the chart's DataSource.

###### Example

	<script>
		...
	</script>

The resulting code should be like the one shown in the example below.

###### Example

    function refreshEmployeeQuarterSales() {
        var employeeQuarterSales = $("#EmployeeQuarterSales").data("kendoChart");
        employeeQuarterSales.dataSource.read();
    }

**Step 19** Find and modify the `onCriteriaChanged` function so it calls `refreshGrid` updating the entire dashboard when a filter is changed.

###### Example

    function onCriteriaChange() {
        updateEmployeeAvatar();
        refreshGrid();
        refreshEmployeeQuarterSales();
    }

**Step 20** Run the application to see the chart render on the dashboard. Change the filter criteria to see the chart update along with other UI elements.

![Bullet Chart](../images/chapter8/bullet-chart.jpg)

## Line Chart

### Overview

Next, add a Line chart, a Line chart shows data as continuous lines that pass through points defined by their items' values. It can be useful for showing a trend over time and comparing several sets of similar data. For this example, you'll use a Line chart to show trend data.

### Exercise: Trigger the Grid DataSource from a DatePicker Event

**Step 1** Since changes to the controller are necessary, stop the application if it is running.

**Step 2** Use partials to keep the markup tidy. Under `Views/Home`, add a new empty partial view `_MonthlySalesByEmployee.cshtml`.

**Step 3** In the new partial `_MonthlySalesByEmployee.cshtml` view, add a new Kendo UI Chart helper.

###### Example

	@(Html.Kendo().Chart<KendoQsBoilerplate.MonthlySalesByEmployeeViewModel>()

    )

**Step 4** Set the `Name` property to `EmployeeAverageSales`.

###### Example

    .Name("EmployeeAverageSales")

**Step 5** Set the controls height to `30px`.

###### Example

    .HtmlAttributes(new { style = "height:30px;" })

**Step 6** Next, add and define a Series chart with the following properties:

 - Set `Line` to the `EmployeeSales` property on the model.
 - Set the `Width` to `1.5`.
 - Disable markers by setting the `Markers` visible property to `false`.
 - Set the tooltip using an inline Kendo UI Template `#=kendo.toString(value, 'c2')#`.

###### Example

    .Series(series =>
    {
        series.Line(model => model.EmployeeSales)
        .Width(1.5)
        .Markers(m => m.Visible(false))
        .Tooltip(t => t.Template("#=kendo.toString(value, 'c2')#"));
    })

**Step 7** Next, add and configure the `CategoryAxis` with a `Date` configuration. Set the Category to the `Date` field of the view model.

**Step 8** Since the chart will be a formatted like a [sparkline](https://en.wikipedia.org/wiki/Sparkline), set the `Axis` and `MajorGridLines` `Visible` properties to `false` to disable them.

###### Example

     .CategoryAxis(ca => ca
         .Date()
         .Categories(model => model.Date)
         .Visible(false)
         .MajorGridLines(m => m.Visible(false))
     )

**Step 9** Next, add and configure the `ValueAxis` with a Numeric configuration.

**Step 10** Set the `Axis`, `Visible`, and `MajorGridLines` properties to `false` to disable them.

###### Example

     .ValueAxis(va => va.Numeric()
         .Visible(false)
         .Labels(lab => lab.Visible(false))
         .MajorGridLines(m => m.Visible(false))
      )

**Step 11** Also set the `Legend` to `false`.

###### Example    

    .Legend(leg => leg.Visible(false))

**Step 12** Configure the `DataSource` by setting `Read` to the action `EmployeeAverageSales` on the `Home` controller.

**Step 13** Using the `Data` property, set the value to `getEmployeeFilter` sending filter data back to the `Read` action.

**Step 14** Add an `Aggregates` on the DataSource to `Average` the `EmployeeSales`.  

###### Example    

    .DataSource(ds => ds
        .Read(read => read.Action("EmployeeAverageSales", "Home")
        .Data("getEmployeeFilter"))
        .Aggregates(a => a.Add(model => model.EmployeeSales).Average())
     )

**Step 15** Since the DataSource will be invoked manually, set `AutoBind` to `false`.

###### Example

    .AutoBind(false)

The resulting code should be like the one shown in the example below.

###### Example

    @(Html.Kendo().Chart<KendoQsBoilerplate.MonthlySalesByEmployeeViewModel>()
        .Name("EmployeeAverageSales")
        .HtmlAttributes(new { style = "height:30px;" })
        .Series(series =>
        {
            series.Line(model => model.EmployeeSales)
            .Width(1.5)
            .Markers(m => m.Visible(false))
            .Tooltip(t => t.Template("#=kendo.toString(value,'c2')#"));
        })

        .CategoryAxis(ca => ca
            .Date()
            .Categories(model => model.Date)
            .Visible(false)
            .MajorGridLines(m => m.Visible(false))
        )

        .ValueAxis(va => va.Numeric()
            .Visible(false)
            .Labels(lab => lab.Visible(false))
            .MajorGridLines(m => m.Visible(false))
        )
        .Legend(leg => leg.Visible(false))
        .DataSource(ds => ds
            .Read(read => read.Action("EmployeeAverageSales", "Home")
            .Data("getEmployeeFilter"))
            .Aggregates(a => a.Add(model => model.EmployeeSales).Average())
            )
        .AutoBind(false)
    )

**Step 16** Open `controllers/HomeController.cs` and create a controller action named `EmployeeAverageSales` on the `Home` controller. This action will supply the Chart with data.

**Step 17** The boilerplate installed in the **Getting Up and Running** chapter has a function named `EmployeeAverageSalesQuery`. This query will select the data required for the chart. Return the results of `EmployeeAverageSalesQuery` as JSON.

###### Example

	public ActionResult EmployeeAverageSales(
        int employeeId,
        DateTime statsFrom,
        DateTime statsTo)
    {
        var result = EmployeeAverageSalesQuery(employeeId, statsFrom, statsTo);

        return Json(result, JsonRequestBehavior.AllowGet);
    }

**Step 18** Add the partial view to the main application page. In `Views/Home/Index.cshtm` find the `<!-- Montly Sales Chart -->` placeholder.

###### Example

	<!-- Montly Sales Chart -->
	@Html.Placehold(430, 120, "Chart")

**Step 19** Replace the placeholder with the `_MonthlySalesByEmployee` partial.

###### Example

	<!-- Montly Sales Chart -->
	@Html.Partial("_MonthlySalesByEmployee")
<!--_-->

**Step 20** Find the scripts section and add a new function named `refreshEmployeeAverageSales`. This function will invoke `read` on the chart's data source.

###### Example

	<script>
		...
	</script>

The resulting code should be like the one shown in the example below.

###### Example

	function refreshEmployeeAverageSales() {
        var employeeAverageSales = $("#EmployeeAverageSales").data("kendoChart");
        employeeAverageSales.dataSource.read();
    }

**Step 21** Find and modify the `onCriteriaChanged` function so it calls `refreshGrid` updating the entire dashboard when a filter is changed.

###### Example

	function onCriteriaChange() {
        updateEmployeeAvatar();
        refreshGrid();
        refreshEmployeeQuarterSales();
        refreshEmployeeAverageSales();
    }

**Step 22** Run the application to see the chart render on the dashboard. Change the filter criteria to see the chart update along with other UI elements.

![Spark Line Chart](../images/chapter8/spark-line-chart.jpg)

## Client-Side API

### Overview

Charts, like other Kendo UI widgets are easy to interact with on the client side. By handling the chart's events additional functionality can be added to the application. Use the `DataBound` event and the `DataSource` to populate values on labels within the Team Efficiency Dashboard.

### Exercise: Display Chart Values Using Client APIs

**Step 1** In `Views/Home/Index.cshtm`, find the scripts section.

###### Example

	<script>
		...
	</script>

Add a function named `onQuarterSalesDataBound`, find the first element of the datasource and displays the Current value in `EmployeeQuarterSalesLabel`.

###### Example

    function onQuarterSalesDataBound(e) {
        var data = this.dataSource.at(0);
        $("#EmployeeQuarterSalesLabel").text(kendo.toString(data.Current, "c2"));
    }

**Step 2** Add a function named `onAverageSalesDataBound` find the `dataSource` aggregates and display the average of `EmployeeSales` in the `EmployeeAverageSalesLabel`.

###### Example

	function onAverageSalesDataBound(e) {
        var label = $("#EmployeeAverageSalesLabel"),
            data = this.dataSource.aggregates()

        if (data.EmployeeSales) {
            label.text(kendo.toString(data.EmployeeSales.average, "c2"));
        } else {
            label.text(kendo.toString(0, "c2"));
        }
    }

**Step 3** Open the partial view `_MonthlySalesByEmployee.cshtml` and add a `DataBound` event handler to the chart, set the event handler to `onQuarterSalesDataBound`.

###### Example

    @(Html.Kendo().Chart<KendoQsBoilerplate.MonthlySalesByEmployeeViewModel>()
        ...
	    .AutoBind(false)
        .Events(e => e.DataBound("onAverageSalesDataBound"))
	)

**Step 4** Open the partial view `_QuarterToDateSales.cshtml` and add a `DataBound` event handler to the chart. Set the event handler to `onQuarterSalesDataBound`.

###### Example

    @(Html.Kendo().Chart<KendoQsBoilerplate.QuarterToDateSalesViewModel>()
        ...
        .AutoBind(false)
        .Events(e => e.DataBound("onQuarterSalesDataBound"))       
    )

![Chart Client API](../images/chapter8/chart-client-api.jpg)

The Team Efficiency Dashboard is starting to look complete, but it hasn't been tested for devices like mobile phones or tablets yet. In the next chapter you'll use responsive web design techniques to support devices beyond the desktop.

## See Also

Other UI for ASP.NET MVC Quick Start Guide chapters on how to build the Team Efficiency Dashboard application:

* [Getting Up and Running]({% slug gettingupandrunning_timeefficiencyapp_aspnetmvc6 %})
* [Input Controls]({% slug inputcontrols_timeefficiencyapp_aspnetmvc6 %})
* [Scaffolding]({% slug scaffolding_timeefficiencyapp_aspnetmvc6 %})
* [Add and Configure the Kendo UI Grid]({% slug kendouigrid_timeefficiencyapp_aspnetmvc6 %})
* [Add and Configure the Kendo UI ListView]({% slug kendouilistview_timeefficiencyapp_aspnetmvc6 %})
* [Manage the Client Side]({% slug clientside_timeefficiencyapp_aspnetmvc6 %})
* [Handle the Kendo UI Datasource]({% slug kendouidatasource_timeefficiencyapp_aspnetmvc6 %})
* [Make the Application Responsive]({% slug goresponsive_timeefficiencyapp_aspnetmvc6 %})
* [Add and Configure the Kendo UI Themes]({% slug kendouithemes_timeefficiencyapp_aspnetmvc6 %})
