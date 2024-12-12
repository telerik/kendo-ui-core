---
title: Using Chart in column of a Grid
description: Learn how to use a Telerik UI for {{ site.framework }} Chart in a column of a Grid.
type: how-to
page_title: Using a Chart in a column of a Grid
previous_url: /helpers/charts/how-to/use-chart-in-ajax-grid-column, html-helpers/charts/how-to/howto_createchartinajaxgridcolumn_chartaspnetmvc
slug: chart-in-grid-column
tags: chart, grid, column, template
res_type: kb
---

# Description
How can I use a Telerik UI for {{ site.framework }} Chart in a column of a Grid?

# Solution

1. Declare the Telerik UI for {{ site.framework }} Grid.
1. Use column [`Templates`](https://docs.telerik.com/aspnet-core/html-helpers/data-management/grid/templates/overview) for the columns of the Grid.
1. Add the declarations for the Charts in the Templates.
1. Use the [`DataBinding`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/events/databinding) and [`DataBound`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/events/databound) Events of the Grid.
1. In the Event handlers, use the [`destroy`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/methods/destroy) and [`eval`](https://www.w3schools.com/jsref/jsref_eval.asp#:~:text=The%20eval()%20method%20evaluates,eval()%20executes%20the%20statements.) methods to render the Charts.


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
    @{ 
        var categories = new string[] { "2000", "2001", "2002", "2003" };
    }

    <kendo-grid name="grid2" data-binding="onDataBinding" data-bound="onDataBound" >
        <datasource type="DataSourceTagHelperType.Ajax" page-size="20" server-operation="false" data="@Model">
            <schema>
                <model id="ID">
                </model>
            </schema>
        </datasource>
    
        <columns>
            <column field="ID" title="ID"></column>
    
            <column title="Chart Remote Data">
                <column-template>
                    <kendo-chart name="ID">
                        <category-axis>
                            <category-axis-item categories="categories">
                            </category-axis-item>
                        </category-axis>
                        <series>
                            <series-item type="ChartSeriesType.Bar"
                                         name="Example Series"
                                         data="new double[] { 200, 450, 300, 125 }">
                            </series-item>
                        </series>
                        <chart-legend position="ChartLegendPosition.Bottom">
                        </chart-legend>
                        <chart-title text="Kendo Chart Example">
                        </chart-title>
                    </kendo-chart>
                </column-template>
            </column>
        </columns>
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

For the complete implementation of the suggested approach [refer to the project on how to use a Chart in the ClientTemplate of a Grid column and bind the Chart based on the row data](https://github.com/telerik/ui-for-aspnet-mvc-examples/tree/master/Telerik.Examples.Mvc/Telerik.Examples.Mvc/Areas/ChartInGrid).

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
