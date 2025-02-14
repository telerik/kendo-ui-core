---
title: Displaying Chart in a Column of a Grid
description: Learn how to display a Telerik UI for {{ site.framework }} Chart in a column cell of a Telerik UI for {{ site.framework }} Grid.
type: how-to
page_title: Displaying Chart in a Column of a Grid
previous_url: /helpers/charts/how-to/use-chart-in-ajax-grid-column, /html-helpers/charts/how-to/use-chart-in-ajax-grid-column
slug: chart-in-grid-column
tags: chart, grid, column, template
res_type: kb
---

## Environment
	
<table>
    <tr>
    <td>Product</td>
    <td>{{ site.product }} Chart</td>
    </tr>
    <tr>
    <td>Product Version</td>
    <td>Created with version 2024.4.1112</td>
    </tr>
</table>

## Description
How can I initialize a Chart into a specified [Grid]({% slug htmlhelpers_grid_aspnetcore_overview %}) column?

## Solution

1. Declare the Grid component.
1. Use the [`Template()`](/api/kendo.mvc.ui.fluent/gridcolumnfactory#templatesystemstring) option of the Grid column to define the Charts.
1. Handle the [`DataBinding`](/api/kendo.mvc.ui.fluent/grideventbuilder#databindingsystemstring) and [`DataBound`](/api/kendo.mvc.ui.fluent/grideventbuilder#databoundsystemstring) events of the Grid.
1. Within the event handlers, call the [`destroy`](https://docs.telerik.com/kendo-ui/api/javascript/kendo/methods/destroy) method and the jQuery [`eval`](https://www.w3schools.com/jsref/jsref_eval.asp#:~:text=The%20eval()%20method%20evaluates,eval()%20executes%20the%20statements.) method to render the Charts. By design, the script tags are not automatically evaluated inside the Grid column template, so the scripts must be evaluated manually in the `DataBound` event of the Grid..


```HtmlHelper
    @model IEnumerable<ViewModel>

    @(Html.Kendo().Grid<ViewModel>(Model)
        .Name("grid")
        .Columns(columns =>
        {
            columns.Bound(v => v.ID);
            columns.Template(@<text>
                @(Html.Kendo().Chart<ChartItem>()
                    .Name("chart_#=ID#") 
                    .SeriesDefaults(defaults => defaults.Column().Stack(true))
                    .DataSource(dataSource => dataSource
                        .Read(read => read.Action("ReadChartData", "Home").Data("function() { return { id: #=ID# }; }"))
                    )
                    .Series(series =>
                    {
                        series.Column(s => s.Value).CategoryField("Category");
                        series.Column(s => s.Value1).CategoryField("Category");
                    })
                    .Tooltip(tooltip => tooltip.Template("\\#: category \\# - \\#: value \\#").Visible(true))
                    .ToClientTemplate())
            </text>).Title("Chart Remote Data");
            columns.Template(@<text>
                @(Html.Kendo().Chart<ChartItem>()
                    .Name("local_#=ID#") 
                    .HtmlAttributes(new { @class = "chart-local" })
                    .SeriesDefaults(defaults => defaults.Column().Stack(true))
                    .Series(series =>
                    {
                        series.Column(s => s.Value).CategoryField("Category");
                        series.Column(s => s.Value1).CategoryField("Category");
                    })
                    .ToClientTemplate())
            </text>).Title("Chart Local Data");
        })
        .Events(e => e.DataBinding("onDataBinding").DataBound("onDataBound"))
        .DataSource(dataSource => dataSource
            .Ajax()
        )
    )
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc

    @model IEnumerable<TelerikAspNetCoreApp26.Models.ViewModel>
    
    <kendo-grid name="grid" on-data-binding="onDataBinding" on-data-bound="onDataBound">
        <columns>
            <column field="ID" title="ID"></column>
    
            <column title="Chart Remote Data">
                <column-template>
                    <kendo-chart name="remote${data.ID}">
                        <series-defaults type="ChartSeriesType.Column">
                            <stack enabled="true" />
                        </series-defaults>
                        <datasource>
                            <transport>
                                <read type="post" url="@Url.Action("ReadChartData", "Home", new {id = "${data.ID}"})" />
                            </transport>
                        </datasource>
                        <series>
                            <series-item type="ChartSeriesType.Column" field="Value" category-field="Category" name="Value Series"></series-item>
                            <series-item type="ChartSeriesType.Column" field="Value1" category-field="Category" name="Value1 Series"></series-item>
                        </series>
                        <tooltip template="#:category# - #: value #" visible="true"></tooltip>
                    </kendo-chart>
                </column-template>
            </column>
    
            <column title="Chart Local Data">
                <column-template>
                    <kendo-chart name="local${data.ID}" class="chart-local">
                        <series-defaults type="ChartSeriesType.Column">
                            <stack enabled="true" />
                        </series-defaults>
                        <series>
                            <series-item type="ChartSeriesType.Column" field="Value" category-field="Category" name="Value Series"></series-item>
                            <series-item type="ChartSeriesType.Column" field="Value1" category-field="Category" name="Value1 Series"></series-item>
                        </series>
                    </kendo-chart>
                </column-template>
            </column>
        </columns>
        <datasource type="DataSourceTagHelperType.Ajax" page-size="20" server-operation="false" data="@Model">
            <schema>
                <model id="ID">
                </model>
            </schema>
        </datasource>
    </kendo-grid>
```
{% endif %}
```JavaScript
<script>
    function onDataBinding() {
        kendo.destroy(this.tbody);
    }

    function onDataBound() {
        var grid = this;
        grid.tbody.find("script").each(function () {
            eval($(this).html());
        });
        $(function () {
            grid.tbody.children().each(function () {
                var item = grid.dataItem(this);
                $(this).find(".chart-local").data("kendoChart").dataSource.data(item.ChartData);
            });
        });
    }
</script>
```
```Styles
  <style>
        #grid .k-chart {
        height: 150px;
    }
  </style>
```

For the complete implementation of the suggested approach, refer to [the project on how to use a Chart in the ClientTemplate of a Grid column and bind the Chart based on the row data](https://github.com/telerik/ui-for-aspnet-mvc-examples/tree/master/Telerik.Examples.Mvc/Telerik.Examples.Mvc/Areas/ChartInGrid). {% if site.core %}You can use this as a starting point to configure the same setup in an ASP.NET Core project.{% endif %}

## More {{ site.framework }} Chart Resources

* [{{ site.framework }} Chart Documentation]({%slug htmlhelpers_charts_aspnetcore%})

* [{{ site.framework }} Chart Demos](https://demos.telerik.com/{{ site.platform }}/charts/index)

{% if site.core %}
* [{{ site.framework }} Chart Product Page](https://www.telerik.com/aspnet-core-ui/charts)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiforcore%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-core-ui)

{% else %}
* [{{ site.framework }} Chart Product Page](https://www.telerik.com/aspnet-mvc/charts)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiformvc%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-mvc)
{% endif %}

## See Also

* [Client-Side API Reference of the Chart for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/chart)
* [Telerik UI for {{ site.framework }} Grid Templates](https://docs.telerik.com/aspnet-core/html-helpers/data-management/grid/templates/overview)
* [Server-Side API Reference of the Chart for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/chart)
{% if site.core %}
* [Server-Side TagHelper API Reference of the Chart for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/taghelpers/chart)
{% endif %}
* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2023%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)
