---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI Filter TagHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: taghelpers_filter_aspnetcore
position: 1
---

# Filter TagHelper Overview

The Telerik UI Filter TagHelper for ASP.NET Core is a server-side wrapper for the Kendo UI Filter widget.

The Filter is a unified control for filtering data-bound components that have a [data source]({% slug taghelpers_datasource_aspnetcore %}). The user interface of the Filter is useful for data-bound components that do not have a built-in UI for filtering but are required to provide filter options&mdash;for example, the ListView, Chart, and Scheduler.

You can add or remove the fields by which the data will be filtered and select the global logic of the filters (`AND` or `OR`) and the filter operator for each field (`contains` or `equals`). You can apply the filtering through a built-in button or through an API call. You can also select the name by which the fields will be displayed to the user and [localize]({% slug htmlhelpers_filter_aspnetcore_localization %}) the filter operators and messages.

* [Demo page for the Filter](https://demos.telerik.com/aspnet-core/filter/tag-helper)

## Initializing the Filter

To use the Filter, you have to define a standalone data source and pass it by name to the filter and to the data-bound control that will use it.

The following example demonstrates how to:
* Tie a filter to a data source.
* Display the filtered data in a grid.
* Use human-readable names for the fields.
* Set an initial filter expression.

```View
<kendo-datasource type="DataSourceTagHelperType.Ajax" name="dataSource1" server-operation="false">
    <transport>
        <read url="@Url.Action("GetPeople", "Filter")" />
    </transport>
</kendo-datasource>

@{
    @using Kendo.Mvc
    var InitialExpression = new CompositeFilterDescriptor
    {
        LogicalOperator = FilterCompositionLogicalOperator.And
    };
    InitialExpression.FilterDescriptors.Add(new FilterDescriptor { Member = "Age", Value = 30, Operator = FilterOperator.IsGreaterThanOrEqualTo });
    InitialExpression.FilterDescriptors.Add(new FilterDescriptor { Member = "Name", Value = "Doe", Operator = FilterOperator.Contains });
}

<kendo-filter name="filter" apply-button="true" expression-preview="true" datasource-id="dataSource1" expression="@InitialExpression">
    <fields>
        <filter-field name="Name" type="string" label="Name"></filter-field>
        <filter-field name="Age" type="number" label="Age"></filter-field>
        <filter-field name="IsOnLeave" type="boolean" label="On Vacation"></filter-field>
    </fields>
</kendo-filter>

<kendo-grid name="grid" datasource-id="dataSource1">
    <columns>
        <column field="Name" title="Employee Name" />
        <column field="Age" title="Employee Age" />
        <column field="IsOnLeave" title="On Vacation" />
    </columns>
</kendo-grid>

<script>
    $(document).ready(function () {
        // Apply filtering immediately after the widget initialization because an initial filter is set.
        $("#filter").getKendoFilter().applyFilter();
    });
</script>
```
```Controller
using Kendo.Mvc.Extensions;
using Kendo.Mvc.UI;

public class FilterController : BaseController
{

    public IActionResult GetPeople([DataSourceRequest]DataSourceRequest request)
    {
        var people = new List<SampleData>() {
            new SampleData()  { Name = "Jane Doe", Age = 25, IsOnLeave = false },
             new SampleData() { Name = "John Doe", Age = 33, IsOnLeave = true },
             new SampleData() { Name = "John Smith", Age = 37, IsOnLeave = true },
             new SampleData() { Name = "Nathan Doe", Age = 42, IsOnLeave = false }
        };
        return Json(people.ToDataSourceResult(request));
    }

    public IActionResult Index()
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

## See Also

* [Basic Usage of the Filter TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/filter/tag-helper)
* [Server-Side API](/api/filter)
