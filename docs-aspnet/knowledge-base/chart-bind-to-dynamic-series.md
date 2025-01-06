---
title: Bind Chart to Dynamic Series
description: Learn how to bind a Telerik UI for {{ site.framework }} Chart to dynamic series.
type: how-to
page_title: Binding a Chart to dynamic series
previous_url: /html-helpers/charts/how-to/create-dynamic-series, /helpers/charts/how-to/create-dynamic-series
slug: chart-bind-to-dynamic-series
tags: chart, databound, dynamic, series
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
How can I bind the Chart to dynamic series?

## Example
```HtmlHelper
    @model TelerikAspNetCoreApp4.Models.MyViewModel
 
    @(Html.Kendo().Chart()
          .Name("Chart")
          .Series(series => {
              foreach (var def in Model.Series) {
                  series.Column(def.Data).Name(def.Name).Stack(def.Stack);
              }
          })
          .CategoryAxis(axis => axis
             .Categories(new string[] { "A", "B", "C" })
          )
    )
```

{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc
    @{ 
        var categories = new string[] { "A", "B", "C" };
    }

    @model TelerikAspNetCoreApp4.Models.MyViewModel
    
    <kendo-chart name="chart">
        <category-axis>
                <category-axis-item name="series-axis">
                    <line visible="false" />
                </category-axis-item>
                <category-axis-item name="label-axis" categories="categories">
                </category-axis-item>
            </category-axis>
        <series>
            @foreach (var def in Model.Series)
            {
                <series-item type="ChartSeriesType.Column"
                             name="@def.Name"
                             stack="@def.Stack"
                             data="@def.Data">
                    <labels background="transparent" visible="true">
                    </labels>
                </series-item>
            }
        </series>
    </kendo-chart>

```
{% endif %}

```Controller
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            var model = new MyViewModel();
            model.Categories.AddRange(new string[] { "A", "B", "C" });
    
            model.Series.Add(new MySeriesData()
            {
                Name = "Foo",
                Stack = "A",
                Data = new decimal[] { 1, 2, 3 }
            });
    
            model.Series.Add(new MySeriesData()
            {
                Name = "Bar",
                Stack = "A",
                Data = new decimal[] { 2, 3, 4 }
            });
    
            model.Series.Add(new MySeriesData()
            {
                Name = "Baz",
                Stack = "B",
                Data = new decimal[] { 10, 20, 30 }
            });
    
            return View(model);
        }
    }
```

To see the complete example, refer to the [ASP.NET MVC application](https://github.com/telerik/ui-for-aspnet-mvc-examples/tree/master/Telerik.Examples.Mvc/Telerik.Examples.Mvc/Areas/ChartDynamicSeries) in the [UI for ASP.NET MVC Examples repository](https://github.com/telerik/ui-for-aspnet-mvc-examples/tree/master). {% if site.core %}You can use this as a starting point to configure the same setup in an ASP.NET Core project.{% endif %}

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
* [Server-Side API Reference of the Chart for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/chart)
{% if site.core %}
* [Server-Side TagHelper API Reference of the Chart for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/taghelpers/chart)
{% endif %}
* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2023%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)
