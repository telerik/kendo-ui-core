---
title: Using a Vertical Scrollbar to Pan a Chart
description: Learn how to enable a vertical scrollbar for panning the Telerik UI for {{ site.framework }} Chart.
type: how-to
page_title: Using a Vertical Scrollbar to Pan a Chart
slug: chart-vertical-scrollbar-for-panning
tags: chart, vertical, scrollbar, panning
res_type: kb
---
## Environment
<table>
 <tr>
  <td>Product</td>
  <td>{{ site.product }} Chart</td>
 </tr>
 <tr>
  <td>Progress {{ site.product }} version</td>
  <td>Created with the 2023.1.425 version</td>
 </tr>
</table>

## Description
The pan feature of the Chart requires the user to drag the mouse over the X or Y axis. How can I enable Chart panning through a vertical scrollbar rather than dragging through the axes?

## Solution
Follow the steps below to define a [Slider component]({% slug overview_sliderhelper_aspnetcore %}) that will serve as a vertical scrollbar for panning a Bar Chart:

1. Create a Bar Chart component that binds to remote data and set the `PageSize()` option (series per page).
2. Define a vertical Slider next to the Chart and set its `Min()` and `Max()` options.
3. Handle the `Zoom` event of the Chart and call the [`page()`](https://docs.telerik.com/kendo-ui/api/javascript/data/datasource/methods/page) method of the Chart's DataSource to change the current page when the user zooms the Chart through the mouse wheel. Get a reference to the Slider and update its value based on the index of the new page.
4. Handle the `Change` event of the Slider and update the Chart's DataSource page when the Slider value changes. Each time the Slider is scrolled, the Chart's DataSource will send a read request to the remote endpoint to request the next or previous page.

```HtmlHelper
<div class="row">
    <div class="col-12">
    @(Html.Kendo().Chart<OrderViewModel>()
        .Name("chart")
        .Theme("sass")
        .Legend(legend => legend.Position(ChartLegendPosition.Top))
        .ChartArea(chartArea => chartArea.Background("transparent"))
        .DataSource(source =>
        {
            source.Custom()
            .Type("aspnetmvc-ajax")
            .PageSize(10)
            .ServerPaging(true)
            .Transport(transport =>
            {
                transport.Read("GetData", "Home");
            })
            .Schema(schema =>
            {
                schema.Data("Data").Total("Total");
            });
        })
        .Series(series =>
        {
              series.Bar(model => model.Freight).Name("Orders").CategoryField("OrderID");
        })
        .CategoryAxis(axis => axis
            .MajorGridLines(lines => lines.Visible(false))
        )
        .ValueAxis(axis => axis.Numeric())
        .Transitions(false)
        .Events(ev => ev.Zoom("onZoom"))
    )
    @(Html.Kendo().Slider()
            .Name("slider")
            .Orientation(SliderOrientation.Vertical)
            .Min(1)
            .Max(10)
            .Value(0)
            .TickPlacement(SliderTickPlacement.None)
            .Tooltip(tt => tt.Format("{0:#,#.####}"))
            .Events(events => events.Change("sliderChange"))
            .HtmlAttributes(new { style = "height:400px" })
    )
    </div>
</div>
```
{% if site.core %}
```TagHelper
  @addTagHelper *, Kendo.Mvc

  <div class="row">
    <div class="col-12">
      <kendo-chart name="chart" theme="sass" transitions="false" on-zoom="onZoom">
        <category-axis>
            <category-axis-item>
                <major-grid-lines visible="false" />
            </category-axis-item>
        </category-axis>
        <series>
            <series-item type="ChartSeriesType.Bar" field="Freight" name="Orders" category-field="OrderID">
            </series-item>
        </series>
        <value-axis>
            <value-axis-item type="numeric">
            </value-axis-item>
        </value-axis>
        <chart-area background="transparent">
        </chart-area>
        <chart-legend visible="true" position="ChartLegendPosition.Top">
        </chart-legend>
        <datasource type="DataSourceTagHelperType.Custom" page-size="10" server-paging="true">
            <schema data="Data" total="Total" errors="Errors">
            </schema>
            <transport>
                <read url="@Url.Action("GetData","Home")"/>
            </transport>
        </datasource>
      </kendo-chart>

        <kendo-slider name="slider" on-change="sliderChange" style="height:400px"
          orientation="SliderOrientation.Vertical"
          max="10"
          min="1"
          value="0"
          tick-placement="SliderTickPlacement.None">
             <slider-tooltip format="{0:#,#.####}"/>
        </kendo-slider>
    </div>
  </div>
```
{% endif %}
```JS scripts
<script>
    var viewSize = 0;

    // Chart Zoom event handler.
    function onZoom(e) {
        var chart = e.sender;
        var ds = chart.dataSource;
        viewSize = Math.min(Math.max(viewSize + e.delta, 0), 100); // Calculate the next page index.
        ds.page(viewSize); // Change the current DataSource page.
        $("#slider").getKendoSlider().value(viewSize); // Update the Slider value based on the new page index.
        // Prevent document scrolling
        e.originalEvent.preventDefault();
    }

    // Slider Change event handler.
    function sliderChange(e) {
        var ds = $("#chart").getKendoChart().dataSource;
        viewSize = this.value();
        ds.page(viewSize); // Update the Chart's DataSource page when the Slider value changes.
    }
</script>
```
```CSS Styles
  <style>
    #chart{
        float: left;
        width:90%;
    }
    .k-slider{
        float: right;
    }
  </style>
```

{% if site.core %}
For a runnable example based on the code above, refer to the following REPL samples:

* [Sample code with the Bar Chart HtmlHelper](https://netcorerepl.telerik.com/meOFcklM31pPnfk913)
* [Sample code with the Bar Chart TagHelper](https://netcorerepl.telerik.com/cIYFGEls35rRF3Id59)
{% else %}
For a runnable example based on the code above, refer to the [REPL example on enabling a vertical scrollbar for panning a Bar Chart](https://netcorerepl.telerik.com/meOFcklM31pPnfk913).
{% endif %}

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

* [Client-Side API Reference of the Chart for {{ site.framework }}](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/dataviz/ui/chart)
* [Server-Side API Reference of the Chart for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/chart)
{% if site.core %}
* [Server-Side TagHelper API Reference of the Chart for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/taghelpers/chart)
{% endif %}
* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2023%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)
