---
title: Persisting the State
page_title: Persisting the State
description: "Get started with the Telerik UI Filter HtmlHelper for {{ site.framework }} and learn how to save and restore its state, options, and filter expression."
previous_url: /helpers/data-management/filter/state
slug: htmlhelpers_filter_aspnetcore_store_settings
position: 3
---

# Persisting the State

The Filter enables you to store its filter expression and restore its state for the user.

## Restoring the State on Load

You can store only the filter expression and enable the Filter to apply it the next time the user visits the page, for example.

The following example demonstrates how to use the `change` event to automatically apply filtering and to maintain an up-to-date state of the Filter. Upon a page reload, the stored settings will be provided to the Filter configuration and will be applied.

```View
<ol>
    <li>Change the filter.</li>
    <li>Reload the page: <button type="button" onclick="reloadPage();">Reload</button></li>
    <li>The widget will be initialized with the settings that were stored.</li>
    <li>Clear the stored information to start fresh: <button onclick="clearData();">Clear</button></li>
</ol>

<script type="text/x-kendo-template" id="itemTemplate">
    <li>
        <strong>#= Name #</strong>, aged #= Age #, is on vacation: #= IsOnLeave #
    </li>
</script>

@(Html.Kendo().DataSource<Kendo.Mvc.Examples.Models.SampleData>()
    .Name("dataSource1")
    .Ajax(d => d.Read(r => r.Action("GetPeople", "Filter")))
)

@(Html.Kendo().Filter<Kendo.Mvc.Examples.Models.SampleData>()
    .Name("filter")

    .Events(ev => ev.Change("applyAndStoreFilterExpression"))

    .MainLogic(FilterCompositionLogicalOperator.And)
    .ExpressionPreview()
    .Fields(f =>
    {
        f.Add(p => p.Name).Label("Name");
        f.Add(p => p.Age).Label("Age");
        f.Add(p => p.IsOnLeave).Label("On Vacation");
    })
    .DataSource("dataSource1")
)

@(Html.Kendo().ListView<Kendo.Mvc.Examples.Models.SampleData>()
    .Name("listView")
    .TagName("ul")
    .DataSource("dataSource1")
    .ClientTemplateId("itemTemplate")
)

<script>
    $(document).ready(function () {
        if (getInitialExpression()) { // Apply the filter if a stored expression exists.
            var filter = $("#filter").data("kendoFilter");
            var opts = filter.getOptions();
            opts.expression = getInitialExpression();
            filter.setOptions(opts);
            $("#filter").data("kendoFilter").applyFilter();
        }
    });

    function applyAndStoreFilterExpression(e) {
        e.sender.applyFilter(); // Apply filtering on every change.
        localStorage["myInitialFilterExpression"] = JSON.stringify(e.expression); // Store the filter expression for future use.
    }

    function getInitialExpression() {
        if (localStorage["myInitialFilterExpression"]) {
            return JSON.parse(localStorage["myInitialFilterExpression"]);
        }
    }

    function reloadPage() {
        window.location.reload();
    }

    function clearData() {
        delete localStorage["myInitialFilterExpression"];
        reloadPage();
    }
</script>
```
```Controller
using Kendo.Mvc.Extensions;
using Kendo.Mvc.UI;

public class FilterController : BaseController
{
    public ActionResult GetPeople([DataSourceRequest]DataSourceRequest request)
    {
        var people = new List<SampleData>() {
             new SampleData()  { Name = "Jane Doe", Age = 25, IsOnLeave = false },
             new SampleData() { Name = "John Doe", Age = 33, IsOnLeave = true },
             new SampleData() { Name = "John Smith", Age = 37, IsOnLeave = true },
             new SampleData() { Name = "Nathan Doe", Age = 42, IsOnLeave = false }
        };
        return Json(people.ToDataSourceResult(request));
    }

    public ActionResult Index()
    {
        return View();
    }
}
```
```Model
public class SampleData
{
    public int Age { get; set; }
    public string Name { get; set; }
    public bool IsOnLeave { get; set; }
}
```

## Loading Settings on Demand

You can also save and load a previous specific state of the Filter upon an application logic event.

The following example demonstrates how to obtain the current filter expression and any other settings and apply them when needed.

```View
<ol>
    <li>Change the state of the filter.</li>
    <li>Save the state <button onclick="saveState();">Save</button></li>
    <li>Change the state of the filter again.</li>
    <li>Load the state: <button onclick="loadState();">Load</button></li>
    <li>Clear the state: <button onclick="clearState();">Clear</button></li>
</ol>

<script type="text/x-kendo-template" id="itemTemplate">
    <li>
        <strong>#= Name #</strong>, aged #= Age #, is on vacation: #= IsOnLeave #
    </li>
</script>

@(Html.Kendo().DataSource<SampleChartData>()
    .Name("dataSource1")
    .Ajax(d => d.Read(r => r.Action("GetData", "Filter")))
)

@(Html.Kendo().Filter<SampleChartData>()
    .Name("filter")
    .MainLogic(FilterCompositionLogicalOperator.And)
    .ExpressionPreview()
    .ApplyButton()
    .Fields(f =>
    {
        f.Add(p => p.Price).Label("Cost");
        f.Add(p => p.Year).Label("Year");
    })
    .DataSource("dataSource1")
)

@(Html.Kendo().Chart<SampleChartData>()
        .Name("chart")
        .DataSource("dataSource1")
        .Series(series =>
        {
            series.Column(model => model.Price).CategoryField("Year");
        })
)

<script>
    function saveState(e) {
        localStorage["myFilterSettings"] = JSON.stringify(getFilter().getOptions().expression);
        // You can store and restore all options not just the expression.
    }

    function loadState() {
        if (localStorage["myFilterSettings"]) {
            var filter = getFilter();
            var opts = filter.getOptions();
            opts.expression = JSON.parse(localStorage["myFilterSettings"]);
            filter.setOptions(opts);
            // If you will restore all options, you need only filter.setOptions(myOptionsLiteral).

            filter.applyFilter(); // Apply the new filter expression.
        }
    }

    function clearState() {
        delete localStorage["myFilterSettings"];
    }

    function getFilter() {
        return $("#filter").data("kendoFilter");
    }
</script>
```
```Controller
using Kendo.Mvc.Extensions;
using Kendo.Mvc.UI;

public class FilterController : BaseController
{
    public ActionResult GetData([DataSourceRequest]DataSourceRequest request)
    {
        var data = new List<SampleChartData>() {
             new SampleChartData() { Price = 25, Year = 2017 },
             new SampleChartData() { Price = 29, Year = 2018 },
             new SampleChartData() { Price = 33, Year = 2019 }
        };
        return Json(data.ToDataSourceResult(request));
    }

    public ActionResult Index()
    {
        return View();
    }
}
```
```Model
public class SampleChartData
{
    public int Price { get; set; }
    public int Year { get; set; }
}
```

## See Also

* [Basic Usage of the Filter HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/filter/index)
* [Persisting the State of the Filter HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/filter/persist-state)
* [Server-Side API](/api/filter)
