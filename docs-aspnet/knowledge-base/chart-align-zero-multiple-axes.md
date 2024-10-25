---
title: Aligning Zero with Multiple Axes in the Chart
page_title: Aligning Zero with Multiple Axes in the Chart
description: An example on how to align the zero value for multiple value axes in the {{ site.product }} Chart.
type: how-to
slug: chart-align-zero-multiple-axes
tags: telerik, chart, align, zero, multiple, axes, value
component: chart
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
  <td>Created with the 2022.3.1109 version</td>
 </tr>
</table>

## Description

I have a {{ site.product }} Chart with multiple axes. One has negative values and the other does not. How can I configure the zero on the two axes to be aligned and how can I show the negative values on one axis as well?

## Solution

{% if site.core %}
1. Update both the [`.Min()`](https://docs.telerik.com/aspnet-core/api/kendo.mvc.ui.fluent/chartvalueaxisbuilder?#minsystemdouble) and [`.Max()`](https://docs.telerik.com/aspnet-core/api/kendo.mvc.ui.fluent/chartvalueaxisbuilder?#maxsystemdouble) configuration methods for the value axes so they include both positive and negative values.
1. To handle the zero values within a particular value axis, pass a function along with the current value as an argument through the [`.Template()`](https://docs.telerik.com/aspnet-core/api/kendo.mvc.ui.fluent/chartvalueaxislabelssettingsbuilder?#templatesystemstring) configuration option for its labels.
1. Within the function, make an assertion for any negative values with the help of the function's argument. Based on the evaluation, either return an empty result or that of the value.
{% else %}
1. Update both the [`.Min()`](https://docs.telerik.com/aspnet-mvc/api/kendo.mvc.ui.fluent/chartnumericaxisbuilder#minsystemdouble) and [`.Max()`](https://docs.telerik.com/aspnet-mvc/api/kendo.mvc.ui.fluent/chartnumericaxisbuilder#maxsystemdouble) configuration methods for the value axes so they include both positive and negative values.
1. To handle the zero values within a particular value axis, pass a function along with the current value as an argument through the [`.Template()`](https://docs.telerik.com/aspnet-mvc/api/kendo.mvc.ui.fluent/chartaxislabelsbuilder#templatesystemstring) configuration option for its labels.
1. Within the function, make an assertion for any negative values with the help of the function's argument. Based on the evaluation, either return an empty result or that of the value.
{% endif %}


```Index.cshtml   
    @(Html.Kendo().Chart(Model)
        .Name("chart")
        .Title("Hybrid car mileage report")
        .Legend(legend => legend
            .Position(ChartLegendPosition.Top)
        )
        .Series(series =>
        {
              series
                .Column(model => model.Value, categoryExpression: model => model.Date)
                .Labels(l => l.Visible(true));

              series
                .Line(new double[] { -7.8, 6.2, 5.9, 7.4, 5.6})
                .Name("l/100 km")
                .Color("#4e4141")
                .Axis("l100km"); 
        })
        .CategoryAxis(axis => axis
            .Date()
            .BaseUnit(ChartAxisBaseUnit.Days)
            // Align the first two value axes to the left
            // and the last two to the right.
            //
            // Right alignment is done by specifying a
            // crossing value greater than or equal to
            // the number of categories.
            .AxisCrossingValue(0, 0, 15,15)
        )
         .ValueAxis(axis => axis
            .Numeric()
            .Max(3)
            .Min(-3)
            .Labels(l => l.Template("#=onlyPositive(data)#"))
            .Line(line => line.Visible(true))
        )
        .ValueAxis(axis => axis
          .Numeric()
          .Min(-10)
          .Max(10)
          .MajorUnit(1)
          .Labels(l => l.Template("#=onlyPositive(data)#"))
          .Line(line => line.Visible(true))
        )
          .ValueAxis(axis => axis
          .Numeric()
          .Min(-60)
          .Max(60)
          .Labels(l => l.Template("#=onlyPositive(data)#"))
          .Line(line => line.Visible(true))
        )
         .ValueAxis(axis => axis
          .Numeric("l100km")
          .Line(line => line.Visible(true))
        )
    )
```
```Script.js
    <script>
        function onlyPositive(e) {
            console.log(e.value);
            if (e.value < 0) {
                return '';
            }

            return e.value;
        }
    </script>
```

For the complete implementation of the suggested approach, refer to the [Telerik REPL example on aligning zero values with multiple axes within the {{ site.framework }} Chart](https://netcorerepl.telerik.com/QcvbQlbq50VLHjf500).

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

* [Telerik REPL: Align Zero with Multiple Axes in the Chart](https://netcorerepl.telerik.com/QcvbQlbq50VLHjf500)
* [Client-Side API Reference of the Chart for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/chart)
* [Server-Side API Reference of the Chart for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/chart)
* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2023%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)
